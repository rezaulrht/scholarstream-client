# ScholarStream — Client

> **Your gateway to global scholarships.** ScholarStream helps students discover, apply for, and track scholarship opportunities — while giving administrators and moderators the tools to manage the entire lifecycle.

**Backend Repository:** [scholarstream-server](https://github.com/rezaulrht/scholarstream-server)

---

## What is ScholarStream?

ScholarStream is a full-stack scholarship management platform. Students browse scholarships from universities worldwide, submit applications with supporting documents, and pay application fees — all in one place. Behind the scenes, moderators review and action applications while admins manage the platform and users.

---

## Core Features

### For Students

- **Browse & Search Scholarships** — Filter by country, category, degree, and deadline across all listed opportunities
- **Scholarship Details** — Rich detail pages with university info, stipend, deadline, world ranking, and peer reviews
- **Apply Online** — Multi-step application form with document uploads (via AWS S3 presigned URLs)
- **Pay Application Fees** — Secure Stripe checkout integrated into the application flow
- **Track Applications** — Dashboard view of all submitted applications with live status updates (`pending → processing → accepted / rejected`)
- **Leave Reviews** — Rate and review scholarships after applying; edit or delete your own reviews
- **My Profile** — Update personal info and profile photo

### For Moderators

- **Manage Applications** — View all applications, update statuses, leave feedback, and request revisions
- **All Reviews** — Oversight of every scholarship review on the platform

### For Admins

- **Add & Manage Scholarships** — Full CRUD on scholarship listings
- **User Management** — Promote users to moderator or admin, or remove users
- **Analytics Dashboard** — Charts for total users, applications, fees collected, applications by university and category, and monthly trends

### Platform-Wide

- **Dark / Light Theme** — Persisted theme toggle throughout the app
- **Blog** — Static blog with scholarship tips and news
- **Newsletter** — Subscribe for updates
- **Responsive Design** — Mobile-first layouts including a dedicated mobile view for the applications table

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 + Vite 7 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Server State | TanStack React Query v5 |
| Forms | React Hook Form |
| Auth | Firebase Authentication |
| HTTP | Axios |
| Animations | Framer Motion, Lottie |
| Charts | Recharts |
| Payments | Stripe (via backend) |
| Image Uploads | ImgBB API (client-side) |
| Notifications | React Hot Toast, SweetAlert2 |

---

## Project Structure

```text
src/
├── components/          # Shared UI components (Navbar, Footer, Loading, etc.)
├── contexts/            # React Contexts — Auth and Theme
├── hooks/               # Custom hooks (useAuth, useRole, useAxios, useAxiosSecure)
├── layouts/             # Route layouts (HomeLayout, DashboardLayout, AuthLayout)
├── pages/
│   ├── Home/            # Landing page + all home sections
│   ├── AllScholarships/ # Browse/filter page
│   ├── ScholarshipDetails/
│   ├── ApplicationForm/ # Multi-step apply form
│   ├── Checkout/        # Stripe checkout page
│   ├── Auth/            # Login, Register, ForgotPassword
│   ├── Blog/
│   └── Dashboard/
│       ├── Admin/       # AddScholarship, ManageScholarship, UserManagement, Analytics
│       ├── Moderator/   # ManageApplications, AllReviews
│       └── Student/     # MyApplications, MyReviews
├── router/              # Route definitions and guards (ProtectedRoute, AdminRoute, ModeratorRoute)
└── firebase/            # Firebase config
```

---

## Architecture

### Auth Flow

Firebase Authentication issues JWTs. On login, the token is stored and attached to every secured request via the `useAxiosSecure` hook as a `Bearer` token in the `Authorization` header.

### Route Guards

Three guards protect dashboard routes:

- `ProtectedRoute` — any authenticated user
- `AdminRoute` — admin role only
- `ModeratorRoute` — moderator or admin

Roles are fetched from the backend (`GET /user/:email/role`) and cached via React Query.

### Custom Hooks

| Hook | Purpose |
| --- | --- |
| `useAuth` | Firebase auth state — current user + loading |
| `useRole` | User's role from backend, cached |
| `useAxios` | Unauthenticated Axios instance |
| `useAxiosSecure` | Axios with auto-attached Firebase Bearer token |
| `useTheme` | Current theme and toggle function |

### Application Payment Flow

1. Student submits application form → application record created with `paymentStatus: "pending"`
2. Redirected to `/dashboard/checkout/:applicationId`
3. Stripe Checkout Session created via backend
4. On success → backend verifies session with Stripe, marks `paymentStatus: "paid"`, stores `transactionId`

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project (for auth)
- The [ScholarStream backend](https://github.com/rezaulrht/scholarstream-server) running

### Environment Variables

Create `.env` in this directory:

```env
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_IMGBB_API_KEY=
VITE_BACKEND_URL=http://localhost:5000
```

### Running Locally

```bash
npm install
npm run dev       # http://localhost:5173
```

### Other Commands

```bash
npm run build     # Production build to dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

---

## Deployment

Frontend is deployed to **Firebase Hosting**. The `firebase.json` config rewrites all routes to `/index.html` to support client-side routing.
