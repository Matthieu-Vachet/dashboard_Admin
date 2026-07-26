import { Button } from "@/components/ui/button";

export function LoginCard({ password, error, loading, onPasswordChange, onSubmit }) {
  return (
    <section className="w-full max-w-xl rounded-surface border border-line bg-zinc-950/85 p-5 shadow-raised backdrop-blur md:p-8">
      <span className="type-overline text-sky-300">
        Accès administrateur
      </span>
      <h2 className="mt-2 type-title-page">Connexion sécurisée</h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Le dashboard admin débloque les audits, la lecture source, les patches et
        les outils de contrôle avancés.
      </p>
      <form
        className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <input
          id="form-a11y-pokemon-admin-password"
          aria-label="Mot de passe admin"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "form-a11y-pokemon-admin-password-error" : undefined}
          className="min-h-11 rounded-lg border border-line bg-surface-control px-3 text-foreground outline-none transition placeholder:text-disabled focus:border-sky-300"
          type="password"
          value={password}
          placeholder="Mot de passe admin"
          onChange={(event) => onPasswordChange(event.target.value)}
        />
        <Button className="min-h-11" variant="primary" type="submit" loading={loading} loadingText="Connexion…">Se connecter</Button>
      </form>
      {error ? <p id="form-a11y-pokemon-admin-password-error" className="mt-3 text-sm font-bold text-rose-300">{error}</p> : null}
    </section>
  );
}
