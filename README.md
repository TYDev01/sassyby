# Sassaby

An Off-ramping platform that bridges Stacks (STX) cryptocurrency to local bank accounts. Users can off-ramp STX, USDCx and BTC to fiat currency and transfer funds directly to their local bank — no lengthy signup required for transfers up to $10,000.

---

## Tech Stack

- **Next.js 16** — App Router, server components, static generation
- **TypeScript** — strict type safety across all components
- **Tailwind CSS v4** — utility-first styling with a dark theme
- **shadcn/ui** — accessible, composable UI primitives
- **Framer Motion** — declarative animations and transitions
- **Lucide React** — icon library

---

## Project Structure

```
Sassaby/
├── Backend/          # Backend services (in progress)
└── frontend/         # Next.js application
    └── src/
        ├── app/
        │   ├── layout.tsx      # Root layout with dark theme
        │   ├── page.tsx        # Entry point, renders TransferPage
        │   └── globals.css     # Global styles and CSS variables
        └── components/
            ├── Navbar.tsx                # Top navigation with animated active tab
            ├── TransferCard.tsx          # STX send amount input with USD equivalent
            ├── ReceiveCard.tsx           # Receive amount display with currency selector
            ├── BankSelector.tsx          # Searchable bank dropdown and account number input
            ├── PaymentMethodSelector.tsx # Payment method picker with fee and time info
            └── TransferPage.tsx          # Full page assembly with state and derived amounts
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm start
```

---

## Features

- Real-time STX to NGN conversion as the user types
- Fee-adjusted receive amount based on the selected payment method
- Searchable bank list with account number validation
- Three payment tiers: Instant (1.5% fee), Same Day (0.8%), Standard (0.3%)
- Multi-currency receive support: NGN, KES, GHS
- Fully animated UI with spring transitions and enter/exit states
- Submit button is disabled until all required fields are complete

---

## Branch Strategy

Each component is developed on its own feature branch and merged into `main` after review.

| Branch | Component |
|---|---|
| `feature/navbar` | Navbar |
| `feature/transfer-card` | TransferCard |
| `feature/receive-card` | ReceiveCard |
| `feature/bank-selector` | BankSelector |
| `feature/payment-method` | PaymentMethodSelector |
| `feature/transfer-page` | TransferPage |

---

## License

MIT
