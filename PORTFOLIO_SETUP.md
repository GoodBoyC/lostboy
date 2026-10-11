# Lost Boy Portfolio

A responsive portfolio for Lost Boy, focused on KOL growth, Web3 community acquisition, and memecoin marketing.

## What Is Included

- Custom editorial hero artwork, ivory and lime visual identity, and responsive layouts.
- Three expandable service descriptions with service-specific inquiry actions.
- About section, an animated four-metric impact grid, a screenshot-driven proof-of-work gallery, and a keyboard-accessible, three-stage growth playbook.
- Project brief dialog with form validation, local draft persistence, editing, reset, clipboard copy, and a text-file download.
- Native dialog focus management, reduced-motion support, mobile navigation, and basic search/social metadata.

## Contact Behavior

The current form creates a project brief. It does not transmit information to a server or pretend that an inquiry has been delivered. Drafts remain in the visitor's browser until cleared. Visitors can then open Lost Boy's Telegram or X profile and share the copied brief. Opening a social profile does not submit or send the form.

The current social links are stored as `profile.xUrl` and `profile.telegramUrl` in `src/data/portfolio.ts`. Add a verified email to `profile.email` to enable an email-client handoff after generating a brief. This opens a prepared email; the visitor still needs to send it. A hosted form service or backend is needed for direct website-to-inbox delivery.

## Details to Personalize the Site

1. **Identity:** preferred name or anon handle, pronouns if desired, a short bio, location/time zone, and profile photo or PFP.
2. **Contact:** public email, X profile, Telegram handle, LinkedIn, and a booking link if you use one. Specify your preferred way to receive inquiries.
3. **Proof of work:** two to five projects, public project links, your exact role, campaign dates, the starting point, what you did, and the measurable outcome. Screenshots and analytics help substantiate results. Anonymized projects are welcome.
4. **Permissions:** which client names, logos, results, and testimonials can be published. Include testimonial attribution and approval.
5. **Offers:** priority services, actual deliverables, engagement lengths, pricing or minimum budget if public, and current availability.
6. **Audience:** ideal client, target ecosystems/chains, project stages, languages, and the kinds of work you do not take on.
7. **Brand:** logo, preferred colors, tone of voice, two or three reference sites, and whether you want a more personal, anonymous, or studio-style identity.
8. **Launch:** preferred domain, hosting choice, contact delivery requirements, and any analytics/privacy preferences. Do not send passwords or wallet keys.

The metrics currently displayed (500K+ members onboarded, 12M+ impressions, 350+ KOL relationships, and 100+ campaigns) are transcribed from the reference image supplied with the request. Confirm these are accurate and can be published before launch; replace them in `impactStats` in `src/data/portfolio.ts` if they were illustrative placeholders. No other clients, performance figures, years of experience, testimonials, or partnership credentials have been invented.

## File Guide

- `src/App.tsx`: page structure, navigation, services, about, playbook, and calls to action.
- `src/data/portfolio.ts`: Lost Boy's profile, X and Telegram links, portrait path, impact metrics, service descriptions, and process content.
- `public/images/proof-of-work/`: add screenshots as `01.png` through `06.png`; files appear automatically in the proof-of-work gallery, where visitors can enlarge them.
- `src/components/ProofOfWork.tsx`: screenshot detection, responsive portfolio gallery, and full-size image viewer.
- `src/components/ProjectDialog.tsx`: local inquiry/brief flow.
- `src/index.css`: responsive visual system and motion styles.
- `public/images/avatar.jpg`: add Lost Boy's portrait here. The About section reserves a circular space for the photo and automatically replaces its upload instructions once the file is added.
- `public/images/growth-studio.jpg`: generated editorial hero artwork, not a personal workspace photograph.
- `index.html`: page title, description, favicon reference, and social metadata. Use a full production URL for the social image when the domain is known.