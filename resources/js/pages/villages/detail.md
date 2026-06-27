## Overview

The Village Tourism Portal detail page is a bright, editorial tourism directory surface built around **large scenic village photography**, compact data cards, and a warm official-directory visual system. The page presents a single tourism village as a complete destination profile: hero identity, location, category badges, profile narrative, facilities, attractions, homestays, tour packages, souvenirs, nearby villages, QR code, statistics, map, contact, share actions, and footer navigation.

The system is not a minimal SaaS dashboard and not a generic travel landing page. It combines a **government-tourism portal structure** with a softer community-tourism aesthetic: white cards, teal navigation accents, emerald pricing, amber achievement badges, subtle shadows, rounded thumbnails, and dense but readable content grids.

The page voice is practical and trustworthy. The top navigation feels official and functional, the hero photography creates emotional destination appeal, and the main content cards let users quickly scan tourism products and village metadata. Teal is the core interaction color, green signals sustainability and price/value, and amber is reserved for awards or ADWI-style achievement badges.

**Key Characteristics:**
- Bright white and near-white page canvas (`{colors.canvas}` / `{colors.surface-page}`) with teal identity accents and dark slate text.
- A full-width scenic hero image with a dark green gradient overlay, large destination title, location row, award badge, and category pills.
- A sticky-feeling horizontal section tab bar directly below the hero, using icons, compact labels, and a teal active underline.
- Two-column desktop structure: content-heavy 8-column main area and data-heavy 4-column right sidebar.
- Dense tourism product grids with rounded image thumbnails, category badges, short descriptions, and green Rupiah price labels.
- Right sidebar cards hold operational metadata: QR code, village ID, ADWI history, category, statistics, location, map preview, contact, and share buttons.
- Soft elevation and hairline borders define cards. The interface uses depth gently, never heavy shadows.
- Photography is central but contained: hero is cinematic and full-width, while content images live inside rounded product cards.
- The footer closes the page with a calm tourism-directory layout, multi-column links, social icons, and a deep teal copyright bar.

## Colors

### Brand & Accent
- **Primary Teal** (`{colors.primary}` — #006A73): Main brand color for active tabs, section icons, footer headers, and primary interaction states.
- **Primary Dark** (`{colors.primary-dark}` — #004F5A): Used for the login button, deep footer strip, and high-contrast brand moments.
- **Primary Soft** (`{colors.primary-soft}` — #E8F7F8): Soft teal background for active pills, subtle highlights, and low-emphasis icon surfaces.
- **Emerald** (`{colors.emerald}` — #0E8A4A): Used for prices, positive statistics, rural/nature badges, and sustainable-tourism cues.
- **Emerald Soft** (`{colors.emerald-soft}` — #EAF8EF): Light green backgrounds for village category chips and eco labels.
- **Amber** (`{colors.amber}` — #F8D75A): Award badge background, especially "Top 500 ADWI 2024".
- **Amber Ink** (`{colors.amber-ink}` — #4A3600): Text color on amber badges.
- **Sky Blue** (`{colors.sky}` — #1BA6C9): Secondary icon accent for map, visitor count, and information states.
- **Rose / Critical** (`{colors.rose}` — #E64848): Used sparingly for map pins, alert-like markers, or negative states.
- **Social Blue** (`{colors.social-blue}` — #1877F2): Social sharing icon color when using brand-aware social buttons.

### Surface
- **Canvas** (`{colors.canvas}` — #FFFFFF): Main card and navigation surface.
- **Page Background** (`{colors.surface-page}` — #F7FAFA): The overall page floor behind cards.
- **Surface Soft** (`{colors.surface-soft}` — #F2F7F7): Facility chips, subtle card panels, inactive icon backgrounds.
- **Surface Muted** (`{colors.surface-muted}` — #EDF3F3): Footer top background and low-emphasis panels.
- **Surface Elevated** (`{colors.surface-elevated}` — #FFFFFF): All cards, navigation, content blocks, and sidebar panels.
- **Hero Scrim** (`{colors.hero-scrim}` — rgba(0, 38, 30, 0.62)): Dark green overlay over scenic hero photography.
- **Hero Scrim Strong** (`{colors.hero-scrim-strong}` — rgba(0, 20, 14, 0.74)): Stronger left-side gradient behind hero title and location text.

### Borders & Dividers
- **Border** (`{colors.border}` — #DDE7E7): Default card border and tab divider.
- **Border Soft** (`{colors.border-soft}` — #EAF0F0): Inner dividers, statistic rows, footer column separation.
- **Border Strong** (`{colors.border-strong}` — #C8D8D8): Focused surfaces, selected filters, and active states.
- **Hairline** (`{colors.hairline}` — #EEF3F3): 1px separators between rows and dense metadata groups.

### Text
- **Ink** (`{colors.ink}` — #0F172A): Primary text for titles, card headings, and navigation.
- **Ink Soft** (`{colors.ink-soft}` — #263238): Secondary strong text and descriptions.
- **Body** (`{colors.body}` — #3F4F56): Default paragraph and card description color.
- **Muted** (`{colors.muted}` — #6B7C83): Metadata, helper text, card footnotes, and row labels.
- **Muted Light** (`{colors.muted-light}` — #94A3A8): Captions, distance labels, disabled nav text.
- **On Dark** (`{colors.on-dark}` — #FFFFFF): Hero title, hero location, and footer text on dark teal surfaces.
- **On Dark Muted** (`{colors.on-dark-muted}` — #D7E6E6): Footer supporting copy and secondary hero text.

### Category Badge Colors
- **Nature Badge** (`{colors.badge-nature}` — #0D8F55): Nature attraction labels.
- **Creative Badge** (`{colors.badge-creative}` — #B96B1C): Creative attraction labels.
- **Showcase Badge** (`{colors.badge-showcase}` — #047C8F): Village showcase labels.
- **Rural Badge** (`{colors.badge-rural}` — #117A5D): Rural experience hero pill.
- **Craft Badge** (`{colors.badge-craft}` — #0B7A67): Wood craft hero pill.
- **Culture Badge** (`{colors.badge-culture}` — #33845A): Cultural village hero pill.

## Typography

### Font Family

The interface should use **Plus Jakarta Sans** as the primary typeface. It gives the portal a modern Indonesian digital-service feel while remaining friendly enough for tourism and community content. The fallback stack is `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

Typography is functional and compact. Headlines are bold but not aggressive. Body copy stays readable at small sizes because the page contains many cards, statistic rows, and metadata blocks.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---:|---:|---:|---:|---|
| `{typography.hero-title}` | 40px | 800 | 1.1 | -0.5px | Hero destination title |
| `{typography.hero-location}` | 15px | 600 | 1.45 | 0 | Location row over hero |
| `{typography.display-lg}` | 32px | 800 | 1.15 | -0.3px | Rare page-level headings |
| `{typography.display-md}` | 26px | 800 | 1.2 | -0.2px | Section group headings on landing surfaces |
| `{typography.section-title}` | 18px | 800 | 1.3 | 0 | Profile, Facilities, Attractions, sidebar card titles |
| `{typography.title-lg}` | 16px | 800 | 1.35 | 0 | Product card title, footer brand name |
| `{typography.title-md}` | 14px | 700 | 1.35 | 0 | Sidebar row labels, package titles |
| `{typography.title-sm}` | 13px | 700 | 1.35 | 0 | Facility chip label, tab label |
| `{typography.body-md}` | 14px | 500 | 1.65 | 0 | Profile paragraphs and long descriptions |
| `{typography.body-sm}` | 12px | 500 | 1.55 | 0 | Product descriptions, sidebar helper copy |
| `{typography.caption}` | 11px | 500 | 1.4 | 0 | Card metadata, small distance labels |
| `{typography.badge}` | 12px | 800 | 1.1 | 0 | Hero pills, category badges |
| `{typography.nav-link}` | 13px | 700 | 1.2 | 0 | Top navigation labels |
| `{typography.button}` | 13px | 800 | 1 | 0 | Login and compact action buttons |
| `{typography.price}` | 14px | 800 | 1.2 | 0 | Rupiah pricing |
| `{typography.stat-value}` | 13px | 800 | 1.2 | 0 | Sidebar statistics values |

### Principles

The design uses a dense but friendly hierarchy. Section titles combine a teal icon and bold text, creating predictable scan anchors throughout the page. Product titles are compact and bold; descriptions are small but generously line-heighted. Prices always use a strong emerald weight to create quick commercial scanning.

Hero typography is the only place where type becomes large and emotional. All other page typography prioritizes utility, scannability, and information density.

### Text Treatment
- Hero title uses white text with subtle shadow against the dark green photo scrim.
- Navigation labels use title case, not all caps.
- Section titles use sentence case and are paired with leading icons.
- Prices use "Rp" followed by a spaced amount, e.g. `Rp 200.000`.
- Metadata rows use label/value alignment, with values right-aligned in desktop sidebar cards.
- Avoid long uppercase strings except for short badges or acronyms such as ADWI.

### Note on Font Substitutes
If Plus Jakarta Sans is unavailable, use **Inter**. If the page needs a more rounded community look, use **Nunito Sans** for body and **Plus Jakarta Sans** for headings. Do not use overly decorative travel fonts; this is a trustworthy portal interface, not a brochure poster.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 64px.
- **Top nav height:** 64px desktop.
- **Hero height:** 220–260px desktop for profile pages; 320px for promotional landing pages.
- **Tab bar height:** 56px.
- **Main page padding:** 24px horizontal desktop, 16px tablet, 12px mobile.
- **Card padding:** 16–20px for sidebar cards, 12–16px for product cards.
- **Grid gutter:** 16px between product cards and 24px between main content and sidebar.
- **Section gap:** 32px between major content blocks in the main column.

### Grid & Container
- **Max page width:** 1320–1360px centered.
- **Desktop content grid:** 12 columns.
  - Main column: 8 columns.
  - Sidebar: 4 columns.
- **Product grids:**
  - Attractions: 4-up desktop, 2-up tablet, 1-up mobile.
  - Homestays: 4-up desktop, 2-up tablet, 1-up mobile.
  - Tour packages: 3-up desktop, 2-up tablet, 1-up mobile.
  - Souvenirs: 4-up desktop, 2-up tablet, 1-up mobile.
  - Nearby villages: 4-up desktop, 2-up tablet, 1-up mobile.
- **Sidebar:** Stacks multiple cards vertically with 24px gaps. It should align to the top of the profile content and remain visually independent.

### Page Structure

1. `{component.top-nav}`
2. `{component.hero-village-band}`
3. `{component.section-tabs}`
4. `{component.page-shell}`
   - `{component.main-content-column}`
     - Profile
     - Facilities
     - Tourist Attractions
     - Homestay Rooms
     - Tour Packages
     - Souvenirs
     - Nearby Tourism Villages
   - `{component.sidebar-column}`
     - Village QR Code
     - Village Statistics
     - Location Address
     - Contact Person
     - Share This Village
5. `{component.footer}`
6. `{component.copyright-bar}`

### Whitespace Philosophy

Whitespace is compact and practical. The page contains many tourism entities, so the design uses consistent gutters, short cards, and tight section rhythm. Empty space should support scanning, not create luxury-brand minimalism. The interface should feel complete and content-rich without becoming cluttered.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, white background | Top navigation, tab bar, footer columns |
| Hairline Card | 1px `{colors.border}` border, no visible shadow | Facility chips, statistic rows, map frames |
| Soft Card | White background, 1px border, subtle shadow | Product cards, sidebar cards, profile image card |
| Elevated Hero | Full-width photography with dark scrim and overlay text | Village hero band |
| Footer Depth | Soft teal-tinted footer background plus deep teal bottom bar | Page closing system |

### Shadow Tokens
- **Card Shadow** (`{shadow.card}`): `0 8px 24px rgba(15, 23, 42, 0.05)`
- **Card Shadow Hover** (`{shadow.card-hover}`): `0 12px 32px rgba(15, 23, 42, 0.08)`
- **Nav Shadow** (`{shadow.nav}`): `0 1px 0 rgba(15, 23, 42, 0.08)`
- **Hero Text Shadow** (`{shadow.hero-text}`): `0 2px 12px rgba(0, 0, 0, 0.35)`

The system avoids dramatic shadows. Depth should be perceived through separation, clean borders, and the contrast between image content and structured cards.

### Decorative Depth
- **Hero photo scrim:** A left-heavy dark gradient makes the destination title readable while preserving the scenic photo.
- **Soft card shadows:** Used only to lift cards from the near-white page floor.
- **Map and QR panels:** Use low-contrast inner surfaces to visually separate utility elements from metadata.
- **Footer wave of depth:** The footer top uses a pale teal background, while the copyright strip uses deep teal for closure.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---:|---|
| `{rounded.none}` | 0px | Full-width bands and structural separators |
| `{rounded.xs}` | 4px | Tiny badges and status markers |
| `{rounded.sm}` | 8px | Small chips, category badges, social buttons |
| `{rounded.md}` | 10px | Product card images, map frame, QR panel |
| `{rounded.lg}` | 14px | Product cards, facility chips, content cards |
| `{rounded.xl}` | 18px | Sidebar cards and larger panels |
| `{rounded.full}` | 9999px | Icon circles, social buttons, user avatar placeholder |

The visual language is rounded but not playful. Cards use medium radii to feel modern and friendly, while hero and footer bands remain rectangular to preserve structure.

### Image Geometry
- Hero image: full-width 21:6 to 16:5 cinematic crop.
- Profile image: 16:9 rounded rectangle.
- Product images: 16:9 thumbnails.
- Homestay and nearby village cards: 16:9 landscape thumbnails.
- Souvenir cards: 16:9 product close-up thumbnails.
- Contact avatar: circular placeholder.
- Map preview: rounded rectangular utility panel.

## Components

### Top Navigation

**`top-nav`** — White, 64px high navigation bar. Left side contains a colorful village-tourism logo mark and a two-line brand lockup: "Village Tourism Portal" and "Explore Authentic Villages". Center/right contains icon + label menu items: Home, Map Distribution, Category, Tourism Products, Information, Forum. Far right contains a filled teal login button with user icon.

**`nav-logo-lockup`** — A compact brand area with an illustrated mountain/wave/sun mark. The brand name uses `{typography.title-lg}` and the tagline uses `{typography.caption}` in muted text.

**`nav-link`** — Icon-leading navigation item. Uses `{typography.nav-link}` and `{colors.ink}`. Items have generous horizontal spacing and no background by default.

**`nav-link-dropdown`** — Same as `nav-link` with a small chevron icon. Used for Category, Tourism Products, and Information.

**`login-button`** — Filled primary dark teal button, `{rounded.sm}`, 40px height, horizontal padding 16px. Text and icon are white. This is the only filled action in the top nav.

### Hero

**`hero-village-band`** — Full-width scenic photography band showing rural Indonesian landscape, rice terraces, village houses, hills, palm trees, and warm sunrise. The band uses `{colors.hero-scrim}` and `{colors.hero-scrim-strong}` overlays so text remains readable.

**`hero-title-group`** — Left-aligned content block inside the hero with:
- Large white village name
- Amber award badge
- Location row with pin icon
- Category pill row

**`hero-award-badge`** — Amber rounded badge with star icon and label such as "Top 500 ADWI 2024". Uses `{colors.amber}` background and `{colors.amber-ink}` text.

**`hero-category-pill`** — Small rounded pill with icon and white/green translucent background. Used for Wood Craft, Rural Experience, Cultural Village. Text is bold and compact.

**`hero-location-row`** — White location pin icon plus village address. Uses `{typography.hero-location}` and subtle hero text shadow.

### Section Tabs

**`section-tabs`** — White horizontal tab bar under the hero. Contains icon-leading tabs: Profile, Facilities, Video, Attractions, Homestay, Tour Packages, Souvenirs. Uses a bottom border and centered max-width content.

**`section-tab`** — Compact text + icon tab with 16px horizontal padding and 56px height. Default text uses `{colors.ink-soft}`.

**`section-tab-active`** — Active tab uses `{colors.primary}` text and icon with a 3px teal underline. No filled background.

### Main Content

**`page-shell`** — Max-width centered container using 12-column grid. Adds 24px top margin after tab bar and consistent bottom spacing before footer.

**`main-content-column`** — Left column containing all tourism content sections. Each section begins with an icon + title row.

**`section-heading`** — Icon-leading heading. Icon uses teal; title uses `{typography.section-title}`. Common heading labels: Profile, Facilities, Tourist Attractions, Homestay Rooms, Tour Packages, Souvenirs, Nearby Tourism Villages.

**`profile-section`** — A two-column content block inside the main column. Left side is a rounded 16:9 image of wood craft or village activity; right side is descriptive paragraph text. On tablet and mobile it stacks.

**`profile-image-card`** — Rounded image container with subtle shadow. Image should show community craft activity, local culture, or rural daily life.

**`profile-copy`** — Two to three medium-length paragraphs explaining location, culture, village value, hospitality, local craft, culinary activity, and harvest/cultural experiences.

### Facility Components

**`facility-grid`** — 8-up compact icon-card grid at desktop. Cards are equal height with icon above label.

**`facility-chip-card`** — Small rounded card with pale surface, 1px soft border, centered colored icon, and compact label. Examples: Parking Area, Meeting Hall, Public Toilet, Culinary, Photo Spot, Dining Area, Wi-Fi Area.

### Product Cards

**`product-card`** — Base card for attractions, homestays, packages, souvenirs, and nearby villages. White background, 1px border, `{rounded.lg}`, image at top, compact body below.

**`product-card-image`** — 16:9 rounded top thumbnail. Images should feel warm and destination-specific: rice fields, wood crafts, village performances, homestay buildings, local products.

**`product-card-badge`** — Small overlay badge at top-left of image. Used for Nature Attraction, Creative Attraction, Village Showcase. Background changes by category.

**`attraction-card`** — Product card variant with badge, title, short experience description, and green price row. Example titles: Sedekah Bumi Experience, Rice Field Introduction Tour, Wood Craft Workshop, UMKM Product Exhibition.

**`homestay-card`** — Product card variant with image, homestay name, short room description, and nightly price. Example labels: ANIA Homestay, Rihlah Homestay, Ngubalan Homestay, Kartasari Homestay.

**`tour-package-card`** — Wider card variant for 3-up package grid. Uses a horizontal layout at desktop: small thumbnail left, package text right. Includes metadata row such as duration and minimum participants, followed by green price.

**`souvenir-card`** — Product-focused card with larger product image, centered title, and green price. Souvenirs should use wood craft imagery: decorative table ornament, teak wall decor, mini wood sculpture, teak wooden box.

**`nearby-village-card`** — Compact destination recommendation card. Contains landscape image, village title, short description, and distance row with location pin icon.

### Sidebar

**`sidebar-column`** — Right-side vertical stack of information cards. Cards align to the main content top and use consistent width. On desktop, the sidebar may be sticky beneath the tab bar.

**`sidebar-card`** — White panel with 1px border, subtle shadow, `{rounded.xl}`, and 20px padding. Used for all right-column modules.

**`qr-card`** — Top sidebar card containing "Village QR Code", QR code panel, scan helper text, and a metadata table for Village ID, ADWI History, and Tourism Village Category.

**`qr-panel`** — White inset panel with QR code centered, rounded corners, and light gray background. Must be high contrast and scannable.

**`metadata-row`** — Icon, label, and right-aligned value. Used throughout QR and statistics cards.

**`statistics-card`** — Sidebar card showing Visitor Statistics, MSME Count, Workforce Count, and Revenue Summary. Values are emerald and right-aligned.

**`location-card`** — Address block plus embedded map preview. Includes pin icon heading, address copy, and a rounded map preview with a red map marker.

**`map-preview`** — Static map placeholder using pale map colors and a clear red marker. It should look like a Google Maps-style preview without needing exact map fidelity.

**`contact-card`** — Contact person panel with circular avatar placeholder, organization/group name, phone row, email row, and Instagram row.

**`share-card`** — Social sharing card with short helper text and a row of circular share buttons: Facebook, WhatsApp, Instagram, TikTok, copy link.

### Footer

**`footer`** — Pale teal-tinted footer surface with rounded top corners on the main container. Contains brand column, social icons, and multiple link columns.

**`footer-brand-column`** — Repeats the tourism portal logo and a short mission statement: explore authentic villages, empower local communities, preserve Indonesian cultural heritage.

**`footer-link-column`** — Column with title and link list. Example columns: Explore, Categories, Information, Help & Support, Contact Us.

**`footer-social-row`** — Row of circular social buttons using brand colors or simple icon colors.

**`copyright-bar`** — Deep teal bottom strip. Left shows copyright text, center shows mission phrase, right shows "Made with ♥ in Indonesia".

## Component Content Rules

### Naming & Labels
Use clear English labels in the UI unless the product is localized. Suggested primary labels:
- Village Tourism Portal
- Explore Authentic Villages
- Dewi Ngubalan Tourism Village
- Top 500 ADWI 2024
- Profile
- Facilities
- Tourist Attractions
- Homestay Rooms
- Tour Packages
- Souvenirs
- Nearby Tourism Villages
- Village QR Code
- Village Statistics
- Location Address
- Contact Person
- Share This Village

### Data Presentation
- Village ID should be displayed as a short code, e.g. `#126049`.
- ADWI history should use compact year + achievement format.
- Statistics should use strong numbers and concise units, e.g. `12.450 Visitors`, `96 MSMEs`, `312 People`, `Rp 1,48 M`.
- Prices should be green and placed at the bottom of cards.
- Distances should use a map pin icon and compact unit labels, e.g. `6.5 km`.

### Imagery Rules
- Hero: scenic Indonesian rural landscape with warm golden-hour lighting.
- Profile: people doing wood craft or local community activity.
- Attractions: village rituals, rice field activities, craft workshops, UMKM exhibitions.
- Homestays: clean rural homestay interiors and traditional house exteriors.
- Souvenirs: teak wood products and handmade craft items.
- Nearby villages: landscape thumbnails with hills, fields, and traditional buildings.

## Buttons & Interactions

**`button-primary`** — Filled teal/dark teal action. Used for Login and important CTAs. Rounded `{rounded.sm}`, bold compact type.

**`button-soft`** — Pale teal button with primary text. Used for secondary actions inside cards.

**`button-icon-circle`** — Circular icon button. Used in share rows and compact controls.

**`text-link`** — Inline teal link, usually without underline. Used in footer and optional card detail links.

**`tab-active-state`** — Teal text + teal icon + bottom underline. Never use a filled background for active tabs on this page.

**`card-pressed-state`** — Product cards may lift slightly and intensify border color. Do not add large shadows or scale aggressively.

## Inputs & Utility UI

**`search-input`** — Optional future component for tourism search pages. White surface, rounded `{rounded.md}`, 1px border, leading search icon, 44px height.

**`filter-chip`** — Optional compact chip for category filtering. Default white with border; active state pale teal with primary text and border.

**`select-dropdown`** — Used for category or region selection. Rounded `{rounded.md}`, 44px height, border, chevron icon.

Although the detail page screenshot does not show form-heavy interactions, these utility components should match the same rounded, teal-accented system.

## Do's and Don'ts

### Do
- Use scenic, warm Indonesian rural photography as the emotional anchor.
- Keep the hero text left-aligned and readable with a dark green gradient overlay.
- Use teal consistently for navigation, section icons, active states, and official portal identity.
- Use emerald for prices and positive numerical values.
- Use amber only for awards or important achievement badges.
- Keep cards compact and information-rich; this is a directory detail page.
- Use icon-leading headings and rows to make dense information easier to scan.
- Keep product card image crops consistent across each grid.
- Use soft borders and subtle shadows instead of heavy elevation.
- Preserve the two-column desktop rhythm: content exploration on the left, operational data on the right.

### Don't
- Don't make the page look like a luxury hotel website with excessive whitespace.
- Don't use dark mode as the main surface; this system is bright and official.
- Don't use random bright colors outside the tourism palette.
- Don't over-round cards into playful bubbles; the radius should remain modern and controlled.
- Don't use large CTA banners inside every section; the page is informational and directory-like.
- Don't make the sidebar visually heavier than the main content.
- Don't use text over busy images without a scrim or gradient.
- Don't stretch product thumbnails to inconsistent ratios.
- Don't hide prices or key metadata; fast scanning is central to the experience.
- Don't copy real government logos, third-party map assets, or copyrighted imagery directly.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---:|---|
| Mobile | < 768px | Nav collapses; hero becomes taller with stacked text; tabs become horizontally scrollable; main/sidebar stack; all grids become 1-up |
| Tablet | 768–1024px | Top nav may collapse secondary links; main/sidebar stack or use 7/5 split; product grids become 2-up |
| Desktop | 1024–1440px | Full top nav; 8/4 content/sidebar split; product grids 3–4 columns |
| Wide | > 1440px | Max-width container remains centered; hero image can breathe wider but content stays controlled |

### Mobile Strategy
- Top navigation collapses into a hamburger menu with logo and login action.
- Hero content remains left-aligned but uses smaller typography.
- Hero category pills wrap into two rows.
- Section tabs become a horizontal scroll area with visible active underline.
- Sidebar cards move below the main content, preserving their original card order.
- Product cards stack one per row with full-width images.
- Tour package horizontal cards become vertical cards.
- Footer columns stack into an accordion or single-column link list.

### Tablet Strategy
- Navigation spacing tightens; dropdown labels may remain but reduce gaps.
- Profile section stacks image above text if the main column is too narrow.
- Facility grid becomes 4-up or 2-up.
- Sidebar can stack below content if there is insufficient width.
- Footer becomes 2-column link layout.

### Touch Targets
- Top nav and tab items should have at least 44px height.
- Product cards should have full-card click targets.
- Share buttons should be 40–44px circles.
- Facility chips should remain at least 72px wide on mobile to avoid cramped labels.

### Image Behavior
- Hero crops from a wide landscape into a more vertical scenic composition on mobile.
- Product thumbnails retain 16:9 ratio across breakpoints.
- Map preview should keep a minimum height of 180px on mobile.
- QR code should never shrink below a scannable size of 96px.

## Accessibility

- Maintain strong contrast for hero text using a dark scrim.
- Active tabs should not rely only on color; use underline and icon color together.
- Price text should have sufficient contrast against white cards.
- Use semantic headings for each section.
- Each image card needs descriptive alt text, e.g. "Local wood craft workshop in Dewi Ngubalan".
- Social share buttons need accessible labels.
- QR code card needs a text fallback link or "Scan to view..." helper.
- Avoid placing small muted text over images.
- Use focus rings in teal for keyboard navigation.

## Iteration Guide

1. Start with the page shell and 12-column layout before designing individual cards.
2. Define tokens first: `{colors.primary}`, `{colors.emerald}`, `{colors.amber}`, `{colors.border}`, `{rounded.lg}`, `{shadow.card}`.
3. Build `{component.top-nav}`, `{component.hero-village-band}`, and `{component.section-tabs}` as the fixed identity stack.
4. Build one reusable `{component.product-card}` and derive attraction, homestay, souvenir, and nearby village variants from it.
5. Build `{component.sidebar-card}` once, then create QR, statistics, location, contact, and share variants.
6. Keep section heading treatment consistent: teal icon + bold title.
7. Use consistent image ratios before tuning typography.
8. Add content density carefully; cards should feel complete but never cramped.
9. Validate mobile behavior early because the desktop sidebar becomes a long content sequence on small screens.
10. Avoid adding new accent colors unless they map to an explicit semantic role.

## Known Gaps

- The source screenshot appears to be an AI-generated or mockup-style tourism portal page, so exact production measurements may differ from a real browser implementation.
- The exact font family cannot be confirmed from the image alone; Plus Jakarta Sans is recommended because it matches the modern Indonesian digital-service feel.
- Exact hex values were inferred from visual sampling and should be treated as design-token approximations, not canonical brand values.
- The QR code and map preview are treated as placeholder components; production versions require real generated QR data and an actual map provider.
- The footer logo and social icons are described generically; do not reproduce copyrighted or official logos unless the project has permission.
- Interactive states such as dropdown menus, card hover transitions, login dialog, video modal, and tab content switching are not visible in the screenshot and are therefore documented only at a system level.
- Form components are included as future-compatible utility patterns, even though this specific detail page does not show search or input forms.
