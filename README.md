# Baanward website

Directly editable English, French, German and Thai HTML, with shared CSS and JavaScript. No build step or framework is required. The public site lives directly in the repository root, matching the other website projects. Edit the HTML pages directly; shared navigation and footer markup are intentionally present in every page and must be kept consistent. Styles: `css/style.css`. Behaviour: `js/main.js`.

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

The content security policy permits connections to Web3Forms. Verify the chosen host applies `_headers`; a basic local server does not apply it automatically. The user confirmed receipt of a real inquiry email on 17 September 2026. Delivery-testing labels have been removed; the form now uses customer-facing confirmation text. The reply-to address was not separately confirmed. The operator, privacy contact, team access and default inquiry-retention policy are confirmed in privacy.html. The public website is indexable; only the four 404 pages retain noindex.

The user handles all commits and pushes manually; this integration does not update the hosted preview automatically.

The public domain is https://baanward.com. Sitemap and canonical/hreflang links use Cloudflare’s extensionless URLs. Keep the 84 indexable URLs and language alternates in sync when adding pages.

## Assets and maintenance

Original AI-generated residential imagery is illustrative. Optimised WebP desktop and mobile assets are in `images/`. Inter is hosted locally in `fonts/` with its SIL Open Font License. Google Analytics 4 (G-FSNP6YPYZH) is installed through GTM-TNX8TL47. The existing GTM head and noscript snippets are present on all 84 pages and load without an added website consent gate. There are no external fonts, uploads, payments or client portal.

Keep research, rules, draft images, screenshots and QA evidence outside this repository under the user's corresponding project folders. Include only site source, final assets and necessary repository/hosting configuration here. Do not commit private inquiry material or secrets.


## Business contacts

Operator: Baanward Co.LTD. Public inquiry and privacy email: contact@baanward.com. English pages use WhatsApp +66 90 324 7862 (https://wa.me/66903247862), confirmed from Haven Siam at the user's request. The floating contact link uses WhatsApp on EN/FR/DE and LINE on TH; these links do not load a third-party chat widget. Back-to-top appears after scrolling 500 pixels and respects reduced-motion preferences. EN/FR use WhatsApp +66 90 324 7862 and LINE https://line.me/ti/p/ZmLjFAgyNh. DE/TH use WhatsApp +66 84 388 2857 and LINE https://line.me/ti/p/gId0k4nzQ_. These different partner destinations are intentional. Up to three authorised team members may read inquiries. The default is to retain correspondence unless deletion is requested, subject to applicable legal retention/deletion requirements. The domain is registered with Cloudflare and the site is public.

Legal referrals are described publicly as “our Thai legal counsel or legal partner”, with permission, conflict checks and separate engagement preserved. Do not name a particular law firm in public website copy.


## Page organisation

The main menu is Home, About, Services, Coverage Areas, How we work, FAQs. Services and Coverage Areas have linked landing pages and separate accessible submenu buttons. FAQs live in `faqs.html`; maintain answers there. The homepage focuses on the service overview, customer situations and practical deliverables. Detailed process steps, the sample report and specialist responsibilities remain on `how-we-work.html`, with legal/technical responsibilities also explained on About. Keep shared navigation and footer links consistent across all 84 HTML pages (21 per language, including one 404 per language). There are nine city pages per language: five core coverage areas (Pattaya, Rayong, Chonburi, Bangkok, Nonthaburi) and four nationwide coordination areas (Phuket, Hua Hin, Chiang Mai, Koh Samui).


## Current content direction — 28 September 2026

Baanward is an independent Thailand property partner for international buyers and owners, before purchase, during purchase and throughout ownership. The user confirmed independence from sellers, developers and selling agents, no seller-side commissions, and availability of developer/project research, translation support, practical contractor supervision and emergency support until 11pm Thailand time. Do not infer a start time or a guaranteed response/attendance time.

All four languages are implemented. The five service offers appear in navigation, footer, homepage, Services and city pages: Property Checks (`/buyer-support#property-checks`), Due Diligence Coordination (`/buyer-support#due-diligence`), Purchase Support (`/buyer-support#purchase-coordination`), Property Oversight (`/remote-property-oversight`), and Property Care (`/owner-care`). Due diligence has equal standing alongside the other services; the broad property-partner homepage positioning is intentional. Oversight includes construction, renovation and checks on work completed so far. The due-diligence section has its own workflow and image.

The user confirmed that bundled specialist pricing and “the lawyer we assign” are deliberate business decisions. One total quote includes Baanward’s fee and the agreed specialist costs. Legal interpretation, legal opinions, title and contract verification remain the appointed legal professional’s work; separate engagement, acceptance, permission and conflict checks remain required. Technical assessments, engineering supervision and certification remain specialist work. Emergency property support is distinct from public emergency services; attendance, access and costs are confirmed for the situation. The sample report remains fictional.

“Start Your Consultation” intentionally starts an inquiry through the contact form. It is not a booking flow and does not need a free/paid consultation claim. The current city page supplies the inquiry location, which is carried through service and language links. The location remains editable on the form; the currently viewed city overrides an older city query. Service pages also supply the service selection.

The 27 September baseline is commit `e66ed74`. The 28 September review checked all 84 HTML files, all 80 indexable live routes, and selected mobile/desktop layouts. Local links, anchors, IDs, sitemap and language alternates passed. Blank-form validation passed in all four languages; no inquiry was sent during that review. This was not a full native-language editorial review.

The current follow-up updates shared city-context behaviour and the English privacy text to include LINE. Non-English privacy wording still needs the corresponding translation update by Claude, following the user's English-only content scope. Shared JavaScript cache versions are updated across all languages. The mobile shrink-to-fit script has been removed: eyebrows use 12px across all languages and screen sizes, matching Walailak Law Firm, and wrap below the 900px breakpoint. The English homepage introduction names all five service areas with equal standing and removes repeated wording; translated introductions remain for Claude.

Previous September 24 content drafts and translation handoffs are historical and must not override the current source or these confirmed decisions. The user handles commits, pushes and publication manually.

## Analytics and search handoff — 28 September 2026

Source: Claude's `analytics-search-handoff-2026-09-28.html`, stored outside the repository in `/Users/nc/Documents/Projects/3- Files/Baanward/Quality checks/`. Dashboard claims below are reported by that handoff, not independently verified account settings.

- GA4 measurement ID: `G-FSNP6YPYZH`; GTM container: `GTM-TNX8TL47`. Claude reports observing GTM and the GA4 script loading on the live site on 28 September, with GA4 delivered through GTM. Script loading alone does not establish successful event receipt or key-event configuration in GA4.
- Source reconciliation confirms GTM head and noscript snippets on all 84 HTML pages. There are no custom analytics event calls in the shared JavaScript. Full tags, triggers, variables, published container version, key events and internal-traffic filter status remain unverified in the dashboards; do not describe these as completed or absent.
- Claude reports one GA4 web stream and default automatic/enhanced measurement. Claude also observed Cloudflare Web Analytics on the live site. No site consent gate or consent-mode signals are implemented in the source; cross-domain tracking was not part of the reported work.
- GSC is reported as the `baanward.com` DNS-verified domain property. The 25 September coverage export reportedly showed zero indexed pages, 56 redirect entries and 78 crawled/currently-not-indexed entries. These are historical report counts, not the current indexing status.
- Claude reports changing 4,684 internal links to extensionless canonical paths, resubmitting the sitemap and requesting validation on 25 September. The current sitemap contains 80 URLs, all with lastmod values. The previous audit confirmed local references and canonical/language alternate consistency. Removing unnecessary redirects improves the URL setup, but the report does not establish that redirects were the sole cause of non-indexing or that indexing has since recovered.
- The root text file `057aafa1d13d2aa1ed8d3341df773dba.txt` is an IndexNow key file, not evidence of GSC DNS verification. Claude reports two accepted IndexNow submissions (HTTP 200) on 25–26 September; acceptance does not confirm indexing. The submission helper is outside the repo in the project's `Tools/indexnow.sh`.

Outstanding dashboard verification: current GSC Page Indexing/validation and sitemap status; GTM published version and tag/trigger/variable inventory; GA4 event receipt, key events and internal-traffic filter configuration. Confirm whether inquiry and contact-link tracking already exists before adding anything. No Google account settings were changed during this reconciliation.

## Focused English service pages — 30 September 2026

Four English-only pages extend the existing services: `/pattaya-house-construction-inspection`, `/rayong-house-purchase-checks`, `/pattaya-condo-purchase-support` and `/phuket-villa-construction-oversight`. They are linked from Services and their relevant service/city pages. Phuket delivery remains subject to confirmed local availability. Technical and legal conclusions remain the appointed specialists’ responsibility; bundled scope pricing is preserved.

There are now 88 HTML pages (25 EN, 21 each FR/DE/TH) and 84 indexable sitemap URLs. The four new pages have self-canonicals and no invented translated hreflang counterparts. Their language menus open the translated parent service, as explained on each page. Contact links prefill city and service. Translation of these pages remains with Claude. Existing four-language page families retain their reciprocal alternates. Inquiry source material is not copied into the public pages.

Focused-service discovery: the English Pattaya, Rayong and Phuket pages feature descriptive local service cards immediately after their introductions, with a hero jump link. Services, Buyer Support and Property Oversight also carry relevant cards. The location sections describe focused services without making unverified popularity claims. Other city pages remain general coverage pages until distinct services are developed.

### Phuket villa purchase support — 30 September 2026
Added the English `/phuket-villa-purchase-checks` page, covering pre-purchase checks and due diligence coordination for villas in Phuket, with a dedicated Rawai section. The new inquiry supplied in chat is a qualitative service-gap signal, not evidence of search volume or repeated Rawai demand. A separate Rawai-only page is deferred. The wording was not found in the saved inquiry files at implementation time. Legal findings remain assigned to separately engaged counsel; local availability is confirmed. Linked from the Phuket location, Services, Buyer Support and Phuket construction oversight pages, and added to the sitemap. Other languages are pending Claude; language switches go to existing translated Buyer Support pages without declaring untranslated equivalents.
