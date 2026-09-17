# Baanward website

Directly editable English HTML, with shared CSS and JavaScript. No build step or framework is required. The public site lives directly in the repository root, matching the other website projects. Edit the HTML pages directly; shared navigation and footer markup are intentionally present in every page and must be kept consistent. Styles: `css/style.css`. Behaviour: `js/main.js`.

Serve the repository root with a local static web server to preview. For conventional static hosting, use no build command and the repository root as the public directory. Configure the host to exclude repository metadata and documentation from public delivery.

## Folder layout

- `index.html` and other root HTML files: directly editable English pages.
- `css/style.css`: shared styles.
- `js/main.js`: navigation and inquiry-form behaviour.
- `images/`: final optimised images.
- `fonts/`: self-hosted Inter and its license.
- `_headers`, `robots.txt`, `404.html`: hosting and search settings.

## Private Sites review packaging

`.openai/hosting.json` retains the existing private Site identity. Its `static.directory: "dist"` describes the temporary delivery package, not the source layout. Do not keep a second copy of the website in a repository `dist/` directory.

The external helper at `/Users/nc/Documents/Projects/3- Files/Baanward/Tools/package-preview.py` copies only public website files into a temporary `dist/`, copies the hosting manifest and invokes the Sites packager. It accepts the repository path and an external output archive path. No framework, dependency installation or website compilation is needed. This helper packages only; it never commits, pushes or deploys.

Preserve the existing GitHub `origin`. The user handles all staging, commits and pushes manually. Publication is a separate step after the exact source revision is committed and pushed; do not automatically publish local edits.

## Inquiry delivery and launch

The form currently validates locally only. Its empty `data-endpoint` intentionally prevents delivery. No entries are persisted. Before enabling collection, confirm the responsible business entity, privacy contact, authorised destination, retention and processing arrangements. Update the privacy notice, preview labels and button copy together. Implement server-side validation, abuse protection, size limits, secure storage/delivery and an explicit durable receipt contract: `{ "accepted": true, "reference": "..." }`. HTTP success alone is not accepted as confirmation. Errors retain entered details. Never fetch submitted listing URLs automatically. Do not add credentials to frontend code.

The current content security policy allows same-origin connections only and prevents native form posts; JavaScript uses the configured same-origin endpoint. Adjust deliberately if an approved external delivery provider is used. Verify the chosen host applies `_headers`; these headers are not automatically applied by a basic local development server.

The review is intentionally excluded from indexing through page metadata and robots.txt. After public launch approval, replace those directives, confirm the domain, then add correct canonical URLs and a sitemap. No domain, DNS or contact destination is assumed. Prices remain scoped quotes.

## Assets and maintenance

Original AI-generated residential imagery is illustrative. Optimised WebP desktop and mobile assets are in `images/`. Inter is hosted locally in `fonts/` with its SIL Open Font License. There are no analytics, tracking integrations, external fonts, uploads, payments or client portal.

Keep research, rules, draft images, screenshots and QA evidence outside this repository under the user's corresponding project folders. Include only site source, final assets and necessary repository/hosting configuration here. Do not commit private inquiry material or secrets.
