# iPhone Service Tanzania

A premium, responsive repair-service website for iPhone, iPad, Android, Apple Watch, and MacBook customers in Dar es Salaam. The interface helps customers explore supported repairs and submit an appointment request through a streamlined three-step booking flow.

## Features

- Searchable repair catalogue with iPhone, iPad, Android, and other Apple-device filters
- Detailed repair summaries, common symptoms, checks, and supported-device badges
- Three-step appointment flow for device, repair, and customer details
- Touch-friendly before-and-after repair comparison
- Responsive liquid-glass navigation and accessible mobile menu
- Warranty, repair process, testimonials, FAQs, and contact sections
- WebP imagery with Next.js image optimization
- Booking API integration seam ready for a database, CRM, or messaging provider

## Technology

- Next.js 16 with the App Router
- React and TypeScript
- Custom responsive CSS
- `@samasante/liquid-glass`
- Phosphor Icons
- Geist Sans

## Getting Started

Requirements: Node.js 20 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run preview` | Build and serve locally on port 3000 |
| `npm run lint` | Run ESLint |

## Project Structure

```text
app/                 Pages, styles, metadata, icons, and booking API route
components/          Navigation, service explorer, booking, slider, and UI components
data/services.ts     Repair catalogue and supported device types
public/images/       Optimized WebP repair imagery
```

## Booking Integration

`POST /api/bookings` currently validates the booking payload and returns HTTP `202`. Replace the integration seam in `app/api/bookings/route.ts` with your database, CRM, email, or WhatsApp workflow before production launch.

Expected fields:

```json
{
  "name": "Customer name",
  "phone": "07XX XXX XXX",
  "date": "2026-07-01",
  "model": "Samsung Galaxy S24",
  "device": "Android",
  "service": "screen-repair"
}
```

## Deployment

The project can be deployed to Vercel or any Node.js host that supports Next.js. Run `npm run build` as the build command and `npm run start` as the production command.

## Business Details

- Location: Mwenge, near Nakiete Pharmacy, Dar es Salaam
- Phone: `0744 710 046`
- Instagram: `@iphone_service_tz`

## Trademark Notice

This is an independent repair service. Apple, iPhone, iPad, MacBook, Android, and related product names are trademarks of their respective owners.
