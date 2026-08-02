import { FetchLoadingState } from "@/components/admin/shared/state-system";

export default function DiscordBotLoading() {
  return (
    <FetchLoadingState
      title="Connexion au service opérationnel du bot…"
      detail="Lecture de l’état Discord, du runtime et du registre de commandes."
    />
  );
}
