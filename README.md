
## Page Sections

1. **Header** — navigation + CTA
2. **Hero** — main screen with photo and buttons
3. **USP** — three value propositions
4. **Services** — services and prices
5. **Team** — stylists
6. **Process** — what a visit looks like
7. **Reviews** — client testimonials
8. **FAQ** — frequently asked questions
9. **Booking** — appointment form
10. **Footer** — contacts and navigation

## Implemented Animations

- **Page transition** — fade and blur when navigating via anchor links
- **Custom smooth scroll** — with `easeInOutQuint` curve instead of default `smooth`
- **Section arrival** — target section gently appears after scroll
- **Ripple** — wave from click point on buttons
- **Button pulse** — springy compression on click
- **CTA pulse** — pulsing shadow on the main CTA button
- **Reveal on scroll** — cards appear in cascade via `IntersectionObserver`
- **Counter animation** — trust block numbers count up from 0
- **FAQ animation** — smooth expansion of answers
- **Hover effects** — image zoom, card lift, nav underline
- **Reduced motion** — all animations disabled under `prefers-reduced-motion`

## Responsiveness

- Desktop — 1160px+ (full grid)
- Tablet — 900px (single column, sticky CTA)
- Mobile — 600px (simplified grid, larger spacing)

## Running

Just open `index.html` in a browser. No server required.

Or via a local server:

bash
python -m http.server 8000
Known Limitations
Booking form does not send data (visual imitation only)

Social media links point to #

All photos are stock (Unsplash), not real stylist work

Prices, names, reviews, and address are fictional

No backend integration (YCLIENTS, Booksy, etc.)

License
Code — free for educational and personal use. Photos belong to Unsplash and are used under their license. Fonts — Google Fonts (OFL). Icons — Font Awesome Free (CC BY 4.0).

Once again: this is a demo mockup. Do not try to book an appointment at this salon — it does not exist.
