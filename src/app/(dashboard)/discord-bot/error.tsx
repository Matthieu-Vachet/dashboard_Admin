"use client";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/admin/shared/state-system";

export default function DiscordBotError({ reset }: { reset: () => void }) {
  return (
    <ErrorState
      title="Le centre de contrôle a rencontré une erreur"
      message="Aucun secret ni détail technique n’a été exposé. Tu peux relancer la lecture."
      action={
        <Button type="button" onClick={reset}>
          Réessayer
        </Button>
      }
    />
  );
}
