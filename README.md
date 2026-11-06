# jumping2000 — GitHub Pages portfolio

Sito statico in HTML, CSS e JavaScript, pronto per GitHub Pages. Non richiede Node.js, build, framework o dipendenze lato server.

## Pubblicazione consigliata

Per ottenere l'indirizzo `https://jumping2000.github.io/`:

1. Crea su GitHub un repository pubblico chiamato **`jumping2000.github.io`**.
2. Carica il contenuto di questa cartella nella **root** del branch `main` (non la cartella contenitore `jumping2000-github-pages`).
3. Apri **Settings → Pages** del repository.
4. In **Build and deployment**, scegli **Deploy from a branch**, branch `main`, cartella `/(root)`, quindi salva.
5. Attendi il completamento della pubblicazione indicata nella sezione Pages.

Se preferisci pubblicare dentro un repository di progetto già esistente, Pages userà un URL del tipo `https://jumping2000.github.io/NOME-REPOSITORY/` e potrebbe essere necessario correggere i percorsi degli asset in base alla posizione scelta.

## Personalizzazione

- `index.html`: testi, progetti, link e contenuti.
- `assets/site.css`: stile Matrix, colori, layout e responsive design.
- `assets/site.js`: filtri, effetto Matrix e aggiornamento delle statistiche pubbliche via GitHub REST API.
- `assets/favicon.svg`: icona del sito.

Le stelle dei repository `universal_notifier`, `ha-packages` e `ha-templates` e il numero dei repository pubblici vengono aggiornati via API GitHub. In caso di indisponibilità o rate limit, la pagina mostra i valori statici di fallback presenti nell'HTML.

## Progetti in evidenza

- `sdd-playbook` — workflow spec-driven per Claude Code, Codex e GitHub Copilot.
- `picobot` — assistente personale multi-agente basato su Agno 3.
- `universal_notifier` — integrazione di notifiche unificate per Home Assistant.
- `ha-packages` — pacchetti e automazioni Home Assistant.
- `ha-templates` — template Jinja, blueprint e AppDaemon per Home Assistant.
