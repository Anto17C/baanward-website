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

The contact form uses the supplied public Web3Forms access key, with `https://api.web3forms.com/submit` as its endpoint. Configuration is in `contact.html`; submission behaviour is in `js/main.js`. The `email` field supplies the reply-to address; other property fields accompany the message. The key is a public form identifier, not a private server credential.

The form validates required fields and URL schemes, includes a honeypot, prevents duplicate in-flight submissions, and requires both a successful HTTP response and `success: true`. Failed, malformed or timed-out responses retain details. The submit button stays disabled without JavaScript. No listing URLs are fetched and no uploads are collected.

The content security policy permits connections to Web3Forms. Verify the chosen host applies `_headers`; a basic local server does not apply it automatically. The user confirmed receipt of a real inquiry email on 17 September 2026. Delivery-testing labels have been removed; the form now uses customer-facing confirmation text. The reply-to address was not separately confirmed. The operator, privacy contact, team access and default inquiry-retention policy are confirmed in privacy.html. The website remains noindex.

The user handles all commits and pushes manually; this integration does not update the hosted preview automatically.

The review is intentionally excluded from indexing through page metadata and robots.txt. After public launch approval, replace those directives, confirm the domain, then add correct canonical URLs and a sitemap. No domain, DNS or contact destination is assumed. Prices remain scoped quotes.

## Assets and maintenance

Original AI-generated residential imagery is illustrative. Optimised WebP desktop and mobile assets are in `images/`. Inter is hosted locally in `fonts/` with its SIL Open Font License. There are no analytics, tracking integrations, external fonts, uploads, payments or client portal.

Keep research, rules, draft images, screenshots and QA evidence outside this repository under the user's corresponding project folders. Include only site source, final assets and necessary repository/hosting configuration here. Do not commit private inquiry material or secrets.


## Business contacts

Operator: Baanward Co.LTD. Public inquiry and privacy email: contact@baanward.com. English pages use WhatsApp +66 90 324 7862 (https://wa.me/66903247862), confirmed from Haven Siam at the user's request. The shared floating WhatsApp link does not load a third-party widget. Back-to-top appears after scrolling 500 pixels and respects reduced-motion preferences. LINE is reserved for the future Thai version; do not display it on the English site. Up to three authorised team members may read inquiries. The default is to retain correspondence unless deletion is requested, subject to applicable legal retention/deletion requirements. Domain ownership and public indexing remain separate confirmations.

Legal referrals are described publicly as “our Thai legal counsel or legal partner”, with permission, conflict checks and separate engagement preserved. Do not name a particular law firm in public website copy.


## Page organisation

The main menu includes Home, Services, How we work, About and FAQs. FAQs live in `faqs.html`; maintain answers there. The homepage focuses on the service overview, customer situations and practical deliverables. Detailed process steps, the sample report and specialist responsibilities remain on `how-we-work.html`, with legal/technical responsibilities also explained on About. Keep shared navigation and footer links consistent across all ten HTML pages.
