import { execFile } from "child_process";
import { promisify } from "util";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { listWorkspaceScripts } from "@/lib/workspace-scripts";
import { assertSameOrigin, rateLimit } from "@/lib/security";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "workspace-scripts-read", 120, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });

    return json({ data: { scripts: listWorkspaceScripts() } });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Scripts workspace indisponibles." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "workspace-scripts-run", 20, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as { id?: string };
    const script = listWorkspaceScripts().find((item) => item.id === body.id);
    if (!script) return json({ error: "Script introuvable ou non autorise." }, { status: 404 });

    const args = script.kind === "npm" ? ["run", script.name] : [script.scriptPath || ""];
    const bin = script.kind === "npm" ? "npm" : "node";
    const result = await execFileAsync(bin, args, {
      cwd: script.cwd,
      timeout: 120_000,
      maxBuffer: 1024 * 1024,
      env: { ...process.env, FORCE_COLOR: "0" },
    });

    return json({
      data: {
        script,
        stdout: result.stdout,
        stderr: result.stderr,
      },
    });
  } catch (error) {
    const execError = error as Error & { stdout?: string; stderr?: string; killed?: boolean };
    return json(
      {
        error: execError.killed ? "Execution interrompue apres 120 secondes." : execError.message,
        stdout: execError.stdout || "",
        stderr: execError.stderr || "",
      },
      { status: 500 },
    );
  }
}

