/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

function readEnv() {
  const env = {};
  const file = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
  for (const line of file.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) env[match[1]] = match[2];
  }
  return env;
}

async function main() {
  const env = readEnv();
  const browser = await chromium.launch({ headless: true });
  const viewports = [
    ["desktop", 1440, 1000],
    ["tablet", 834, 1112],
    ["mobile", 390, 844],
  ];
  const pages = [
    ["/", "Cockpit de travail"],
    ["/pokemon-docs", "Documentation JSON"],
    ["/pokemon-admin", "Dashboard sécurisé"],
  ];
  const results = [];

  for (const [label, width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("http://127.0.0.1:3020/login", { waitUntil: "domcontentloaded" });
    await page.fill('input[name="email"]', env.ADMIN_EMAIL || "");
    await page.fill('input[name="password"]', env.ADMIN_PASSWORD || "");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.click('button[type="submit"]'),
    ]);

    for (const [route, text] of pages) {
      await page.goto(`http://127.0.0.1:3020${route}`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(900);
      if (route === "/pokemon-admin") {
        await page
          .getByText("Chargement du dashboard", { exact: false })
          .first()
          .waitFor({ state: "hidden", timeout: 6000 })
          .catch(() => {});
      }
      const found = await page.getByText(text, { exact: false }).first().isVisible().catch(() => false);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      const screenshot = `/tmp/dashboard-${label}-${route === "/" ? "home" : route.slice(1)}.png`;
      await page.screenshot({ path: screenshot, fullPage: false });
      results.push({ label, route, found, overflow, errors: [...errors], screenshot });
    }

    if (label === "desktop") {
      await page.evaluate(() => localStorage.setItem("matweb-theme", "light"));
      await page.goto("http://127.0.0.1:3020/pokemon-admin", { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(900);
      await page
        .getByText("Chargement du dashboard", { exact: false })
        .first()
        .waitFor({ state: "hidden", timeout: 6000 })
        .catch(() => {});
      const sidebarStyle = await page.locator("aside").first().evaluate((element) => {
        const styles = window.getComputedStyle(element);
        return { background: styles.backgroundColor, color: styles.color };
      });
      const screenshot = "/tmp/dashboard-desktop-light-pokemon-admin.png";
      await page.screenshot({ path: screenshot, fullPage: false });
      results.push({
        label: "desktop-light",
        route: "/pokemon-admin",
        found: true,
        overflow: await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
        errors: [...errors],
        screenshot,
        sidebarStyle,
      });
    }

    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
