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

All four languages are implemented. The five service offers appear in navigation, footer, homepage, Services and city pages: Property Checks (`/buyer-support#property-checks`), Property Due Diligence (`/buyer-support#due-diligence`), Purchase Support (`/buyer-support#purchase-coordination`), Property Oversight (`/property-oversight`), and Property Care (`/property-care`). Due diligence has equal standing alongside the other services; the broad property-partner homepage positioning is intentional. Oversight includes construction, renovation and checks on work completed so far. The due-diligence section has its own workflow and image.

The user confirmed that bundled specialist pricing and “the lawyer we assign” are deliberate business decisions. One total quote includes Baanward’s fee and the agreed specialist costs. Legal interpretation, legal opinions, title and contract verification remain the appointed legal professional’s work; separate engagement, acceptance, permission and conflict checks remain required. Technical assessments, engineering supervision and certification remain specialist work. Emergency property support is distinct from public emergency services; attendance, access and costs are confirmed for the situation. The sample report remains fictional.

“Start Your Consultation” intentionally starts an inquiry through the contact form. It is not a booking flow and does not need a free/paid consultation claim. The current city page supplies the inquiry location only on contact links; general service navigation stays clean. The location remains editable on the form; the currently viewed city overrides an older city query when building enquiry context. Service pages also supply the service selection.

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

Focused-service discovery: the English Pattaya, Rayong and Phuket pages feature descriptive local service cards immediately after their introductions, with a hero jump link. Services, Buyer Support and Property Oversight also carry relevant cards. The location sections describe focused services without making unverified popularity claims. All nine English city pages now have focused service cards; the rollout matrix below distinguishes dedicated pages from links into shared service detail.

### Phuket villa purchase support — 30 September 2026
Added the English `/phuket-villa-purchase-checks` page, covering pre-purchase checks and due diligence coordination for villas in Phuket, with a dedicated Rawai section. The new inquiry supplied in chat is a qualitative service-gap signal, not evidence of search volume or repeated Rawai demand. A separate Rawai-only page is deferred. The wording was not found in the saved inquiry files at implementation time. Legal findings remain assigned to separately engaged counsel; local availability is confirmed. Linked from the Phuket location, Services, Buyer Support and Phuket construction oversight pages, and added to the sitemap. Other languages are pending Claude; language switches go to existing translated Buyer Support pages without declaring untranslated equivalents.

### Location service rollout — 30 September 2026

Use a city-level service page as the durable home for a useful service brief. Add neighbourhood questions and practical details to it as enquiries develop; a single area mention is not grounds for another URL. Do not publish enquiry quotations, personal details, invented local experience, offices, demand figures or guaranteed attendance. A standalone page needs a distinct buyer task, useful preparation and deliverables, accurate coverage and a clear route from its city and parent service. Shared service links with city context are appropriate until there is enough material for a dedicated page. This follows Google’s doorway guidance: https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse

| English location | Dedicated focused pages | Other prominent service routes |
| --- | --- | --- |
| Pattaya | Condo purchase; house/villa purchase (new); construction inspections | Existing five-service overview retained |
| Rayong | House purchase checks | Property care |
| Phuket | Villa purchase (Rawai section); construction/handover | Local availability confirmed |
| Bangkok | Condo purchase checks (new) | Handover/contractor follow-up |
| Chonburi / Si Racha | House/condo purchase checks | Purchase checks; construction progress |
| Nonthaburi | House/condo purchase checks | House/condo checks; condition visits |
| Hua Hin | House/villa purchase checks | Purchase checks; care between stays |
| Chiang Mai | House/condo purchase checks | Purchase checks; ongoing care |
| Koh Samui | Villa purchase checks | Purchase checks; construction/handover |

New URLs: `/bangkok-condo-purchase-support` and `/pattaya-house-villa-purchase-checks`. These are service-fit additions based on existing coverage, not new enquiry counts or proven search demand. Both are linked from the city, Services and Buyer Support pages and included in the sitemap. Pattaya purchase and construction pages distinguish their scopes and link to each other. The new pages are English only; translations remain for Claude and language switches currently lead to existing translated Buyer Support pages. Do not declare untranslated hreflang equivalents. Hua Hin, Chiang Mai, Koh Samui and Phuket remain subject to confirmed local availability. Each city page retains all five main services alongside its focused entry points.

### Five further English purchase pages — 30 September 2026

Added dedicated purchase-check pages for Chonburi/Si Racha, Nonthaburi, Hua Hin, Chiang Mai and Koh Samui, using the existing service scope. These are coverage-based service pages, not claims of new enquiries, measured demand or local offices. Each has its own preparation guidance and purchase scenario, links from its city and the Services/Buyer Support directories, a self-canonical and a sitemap entry. Hua Hin, Chiang Mai and Koh Samui retain explicit local-availability, access and travel conditions. Legal review remains with separately engaged counsel and the quote includes agreed specialist costs. English only; language switches use existing translated Buyer Support pages pending Claude translations.

New URLs:
- `/chonburi-property-purchase-checks`
- `/nonthaburi-property-purchase-checks`
- `/hua-hin-house-villa-purchase-checks`
- `/chiang-mai-property-purchase-checks`
- `/koh-samui-villa-purchase-checks`

### Due diligence visibility — 1 October 2026

All ten English purchase pages across the nine locations now explicitly name Purchase Checks & Due Diligence Coordination in their titles and H1s. Each includes a labelled `#due-diligence-scope` section: lawyer-assigned legal review, separately scoped technical inspection, Baanward coordination, attributable findings, missing documents and unresolved questions. Legal/technical examples are adapted for houses, condos or mixed properties. Bundled pricing and separate legal engagement remain intact; existing availability conditions remain. English focused cards and metadata were aligned, URLs/canonicals preserved, and sitemap modification dates updated. Existing translated page families are untouched; Claude should align their wording.

### Translated canonical correction — 1 October 2026

Corrected the 36 translated focused-service pages (12 per FR/DE/TH) that declared their English counterpart as canonical. All 128 local sitemap URLs now declare self-canonicals; reciprocal hreflang verified for affected families. Existing translation edits were preserved. This correction is local and requires publication before live revalidation. Google/Bing stored-index inspection is still pending: access to the signed-in Chrome application was not approved during this check. Performance exports are not index inventories.

### October 1, 2026 — clean English service routes
English Property Oversight and Property Care now use `/property-oversight` and `/property-care`. `_redirects` permanently redirects the former clean, `.html` and trailing-slash routes. English internal links, canonical/social URLs, sitemap and translated English hreflang/language-switch references are aligned. Translated service routes and content remain unchanged. General service links no longer inherit location/service query parameters; contact links receive context without overwriting explicit selections. Existing form service values remain compatible across languages.

### October 1, 2026 — translated service routes renamed to match
Renamed the FR/DE/TH Property Oversight and Property Care pages to `/{lang}/property-oversight` and `/{lang}/property-care`, matching the English slugs. `_redirects` now carries permanent 301s from the old `/fr/`, `/de/`, `/th/` `remote-property-oversight` and `owner-care` routes (bare, `.html` and trailing-slash variants). Internal links, language switchers, canonical tags and reciprocal hreflang were updated across all four languages (102 files), sitemap.xml carries the renamed `<loc>`/hreflang entries, and a full `bw_i18n.py sync` reconciled unrelated drift left by the direct edits in the two prior entries (0 of 99 pages diverge). Translated page content was not rewritten — titles/H1s were already fully localized, with no literal "Remote Property Oversight" or "Owner Care" labels. The internal `service=remote-property-oversight` / `service=owner-care` query values are untouched by design (js/main.js's `serviceAliases` map keeps the new slugs compatible with the existing form/CRM values). Also fixed a real regression found while testing the enquiry prefill: `js/main.js` and `css/style.css` cache-busting version strings had gone out of sync (only 33/132 pages referenced the current main.js, 44/132 the current style.css) after the two prior entries' edits, so returning visitors with an old cached asset under the stale query string would silently keep the pre-fix script/styles on most pages. Unified every page to `?v=20261001-service-rename` for both assets.

User reports all pages have passed Google availability/live checks or had indexing requested, except the five general service links being corrected here. This is eligibility/submission evidence, not confirmation that every page is indexed. Google previously confirmed the homepage and French Phuket villa checks page indexed. Sitemap resubmission on October 1 succeeded with 128 discovered URLs. This route migration still needs publishing; inspect the two new English URLs after deployment.

### October 1, 2026 — complete agreed service positioning (English)
Reviewed all 33 English HTML pages, including navigation, service listings, purchase/oversight/care pages, location pages, FAQs, About, How We Work and privacy wording. Present Baanward as the main point of contact managing the complete agreed service. Use “Property Due Diligence” in navigation and “Due Diligence Services” in service titles, and “our lawyer and technical specialists” for the team delivering professional work. One total quote includes Baanward and all specialist fees for the agreed scope; additional work requires approval. The lawyer’s separate legal engagement defines professional responsibilities and does not add a fee for the same work. Preserve scope, availability, professional responsibility, consent and inspection limits; do not promise every possible service or a guaranteed outcome. URLs and section anchors remain unchanged.

Translation handoff: Claude should align FR/DE/TH wording with this English positioning, including menu labels, titles/descriptions, service cards, footer role statement, pricing and the separate-fees FAQ. No translated page content was edited in this pass.

### October 3, 2026 — off-plan, handover and amendment-follow-up content (EN/FR/DE/TH)
Prompted by a real client file from a lawyer's limited-scope SPA review (confidential; none of its specifics, names or the firm are used on the site). It showed buyer concerns the site did not yet address. Added to `/buyer-support`: an `#off-plan` section (questions to settle before each payment: milestone evidence, escrow/security, approvals, completion extension; how Baanward helps; explicit "we cannot guarantee a developer will perform or repay"), a `#handover` section (missed-inspection-as-acceptance, authorised representative, written snagging list, itemised transfer fees/taxes, sinking fund and common fees, payment order, remittance records; a snagging list is not a structural survey), a new Purchase Support bullet (relaying client-approved amendment requests, tracking replies, returning the revised contract to our lawyer), and three FAQs (refund clause vs due diligence; who follows up amendments; handover inspection when abroad). The same three FAQs are on `/faqs`, and the Bangkok and Pattaya condo pages carry a short off-plan callout linking to `#off-plan`. Guardrails kept: our lawyer advises on contract wording and remedies, negotiation or representation needs a specifically agreed mandate, no outcome or refund guarantees. 42 new strings translated; `bw_i18n.py` shows 0 drift and sitemap `lastmod` was refreshed. No CSS/JS change, so no cache-bust bump was needed.

### October 2, 2026 — WhatsApp/LINE/phone/email click tracking
Adapted a pattern from the Walailak Law Firm project (shared cross-session) to Baanward's own markup and added it to `js/main.js`: a delegated `click` listener on `document` detects `wa.me`/`api.whatsapp.com`, `line.me`, `tel:` and `mailto:` links and pushes `{event: '<method>_click', link_location, link_url}` to `dataLayer`. `link_location` is read from the actual DOM structure rather than guessed from class-name regexes: every real contact link on the site sits inside a `.contact-channels` wrapper carrying `header-channels`, `closing-channels` or `footer-channels`, or is one of the two floating buttons (`sticky-whatsapp` on EN/FR/DE, `sticky-line` on TH) — surveyed all 4 languages first (1,450 contact-method links checked) to confirm that covers everything; the only other contact.html/privacy.html inline links fall back to `location: 'body'`, matching the Walailak convention. Verified live in the browser on EN (header/footer/closing/sticky) and TH (sticky-line, header LINE) — all four methods and all five locations fire with the correct `link_url`. No GA4 Measurement ID exists in this codebase (GA4 is configured entirely inside GTM, per the project's standing setup), so GTM-side configuration — Data Layer Variables for `link_location`/`link_url`, one Custom Event trigger + one GA4 Event tag per method (`whatsapp_click`, `line_click`, `phone_click`, `email_click`) — is still the user's own task in the GTM UI; Claude cannot do this part. Bumped the shared `js/main.js?v=` cache-busting string across all 132 pages for this change (checked: still uniform beforehand), learning directly from the cross-session heads-up about exactly this kind of stale-cache bug.

### October 1, 2026 — FR/DE/TH aligned to the complete-agreed-service positioning
Translated the 168 unique strings the English positioning update introduced or changed, then ran a full `bw_i18n.py sync` (0 of 99 pages diverge). Natural, non-literal equivalents throughout, not word-for-word: "Property Due Diligence" in menus and "Property Due Diligence Services" in headings (FR: Due Diligence Immobilière / Services de Due Diligence Immobilière, keeping "due diligence" as the established loanword; DE: Immobilien-Due-Diligence / Due-Diligence-Leistungen für Immobilien, same loanword convention; TH: การตรวจสอบสถานะทรัพย์สิน / บริการตรวจสอบสถานะทรัพย์สิน). "Our lawyer and technical specialists" rendered personally in each language (FR notre avocat et nos spécialistes techniques; DE unser Rechtsanwalt und unsere technischen Fachleute; TH ทนายความและผู้เชี่ยวชาญด้านเทคนิคของเรา) and reused consistently everywhere it recurs — nav, service cards, FAQs, footer, the 10 purchase-page titles/H1s/meta descriptions, the 9 location meta descriptions, and the "main point of contact" / one-total-quote / separate-legal-engagement-doesn't-mean-an-extra-fee language. Preserved the existing legal-advice-vs-technical-assessment distinction, scope/availability/consent/inspection limits, and did not add any guaranteed-outcome or unlimited-service language. URLs, anchors, canonical tags, hreflang and form behaviour untouched — this pass only changed translated prose. Refreshed `memory.json` and sitemap `lastmod` dates. Browser-verified FR (buyer-support), DE (buyer-support) and TH (Bangkok condo page) render correctly with the new terminology and no leftover English.
