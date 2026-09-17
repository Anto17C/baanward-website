# Baanward website

Directly editable English HTML, with shared CSS and JavaScript. No build step or framework is required. The public site lives in `dist/` (the Sites static delivery directory). Edit the HTML pages directly; shared navigation and footer markup are intentionally present in every page and must be kept consistent. Styles: `dist/css/site.css`. Behaviour: `dist/js/site.js`.

Serve `dist/` with a static web server to preview. Publish that directory as the web root. `.openai/hosting.json` binds the private Sites review deployment. Preserve the existing GitHub `origin`; Sites publication uses a separate per-command destination.

## Inquiry delivery and launch

The form currently validates locally only. Its empty `data-endpoint` intentionally prevents delivery. No entries are persisted. Before enabling collection, confirm the responsible business entity, privacy contact, authorised destination, retention and processing arrangements. Update the privacy notice, preview labels and button copy together. Implement server-side validation, abuse protection, size limits, secure storage/delivery and an explicit durable receipt contract: `{ "accepted": true, "reference": "..." }`. HTTP success alone is not accepted as confirmation. Errors retain entered details. Never fetch submitted listing URLs automatically. Do not add credentials to frontend code.

The current content security policy allows same-origin connections only and prevents native form posts; JavaScript uses the configured same-origin endpoint. Adjust deliberately if an approved external delivery provider is used. Verify the chosen host applies `dist/_headers`; these headers are not automatically applied by a basic local development server.

The review is intentionally excluded from indexing through page metadata and robots.txt. After public launch approval, replace those directives, confirm the domain, then add correct canonical URLs and a sitemap. No domain, DNS or contact destination is assumed. Prices remain scoped quotes.

## Assets and maintenance

Original AI-generated residential imagery is illustrative. Optimised WebP desktop and mobile assets are in `dist/images/`. Inter is hosted locally in `dist/fonts/` with its SIL Open Font License. There are no analytics, tracking integrations, external fonts, uploads, payments or client portal.

Keep research, rules, draft images, screenshots and QA evidence outside this repository under the user's corresponding project folders. Include only site source, final assets and necessary repository/hosting configuration here. Do not commit private inquiry material or secrets.
