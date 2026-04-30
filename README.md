# 🏢 CompaniesDB — Frontend Developer Assessment

A production-grade **React + Vite + Tailwind CSS** Companies Directory with full filtering,
sorting, pagination, and dual-view modes.

**Live Demo →** `[Your Vercel/Netlify URL here]`

---

## ✨ Features

| Feature | Details |
|---|---|
| **Search** | Full-text across name, tagline, description, sub-industry, and tech tags |
| **Industry filter** | Dropdown + clickable quick-filter strip (10 industries) |
| **Location filter** | Filter by city / country |
| **Company size filter** | Startup → Enterprise buckets |
| **Status filter** | Public · Private · Startup |
| **Sorting** | Name A→Z / Z→A · Founded · Employee count (6 sort modes) |
| **Grid / Table view** | Toggle between card grid and data table |
| **Pagination** | 12 per page, windowed page buttons |
| **Loading state** | Shimmer skeleton on initial mount (simulates API fetch) |
| **Empty state** | Friendly empty state with one-click filter clear |
| **Active filter chips** | Visual chips with individual remove buttons |
| **Responsive** | Mobile-first, works on all screen sizes |

---

## 🏗️ Project Structure

```
src/
├── data/
│   └── companies.js        # 50 mock companies (simulates REST API response)
│
├── hooks/
│   └── useCompanyFilters.js # ALL filter/sort/pagination logic in one custom hook
│
├── components/
│   ├── Header.jsx           # Sticky top bar with live count
│   ├── StatsBar.jsx         # Industry quick-filter pill strip
│   ├── FilterBar.jsx        # Search + dropdowns + sort + view toggle + chips
│   ├── CompanyCard.jsx      # Grid card (avatar, tags, meta, revenue)
│   ├── CompanyTable.jsx     # Responsive table view
│   ├── Pagination.jsx       # Windowed page buttons
│   └── LoadingState.jsx     # Shimmer skeleton + empty state
│
├── App.jsx                  # Root — wires all components together
├── main.jsx                 # React DOM entry
└── index.css                # Tailwind + global CSS variables + animations
```

---

## 🧠 Architecture Decisions

### Custom Hook: `useCompanyFilters`
All business logic lives in one custom hook. Components are pure presentation —
they receive data and callbacks via props, with zero filter logic of their own.
This makes every component independently testable.

### Memoisation
`useMemo` is used for the filtered + sorted dataset, so recomputation only happens
when relevant filter state changes. `useCallback` wraps all setter functions to
maintain stable references across renders.

### Mock Data as "API Contract"
`companies.js` is shaped exactly like a REST API response. Swapping to a real
`fetch()` call requires changing only one file — the rest of the app is unaffected.

### Deterministic Avatar Colors
Company logo avatars use a hash of the company name to pick from 8 color pairs —
so each company always gets the same color, with no two adjacent companies sharing one.

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/companies-directory.git
cd companies-directory

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build
```

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
Push to GitHub → Connect repo in Netlify dashboard →  
Build command: `npm run build` · Publish directory: `dist`

Both config files (`vercel.json`, `netlify.toml`) are included.

---

## 🛠️ Tech Stack

- **React 18** — functional components, hooks
- **Vite** — lightning-fast dev server + build
- **Tailwind CSS** — utility-first styling with custom design tokens
- **Lucide React** — consistent icon set
- **Google Fonts** — Syne (display) + DM Sans (body) + DM Mono (monospace)

---

## 📊 Data Model

Each company object:
```js
{
  id, name, tagline, industry, subIndustry,
  location,           // "City, Country"
  founded,            // year (number, for sorting)
  employeesCount,     // number (for size filtering)
  employees,          // formatted string (for display)
  revenue,            // "$XM" string
  website,
  description,
  tags,               // string[] — tech stack / keywords
  status              // "Public" | "Private" | "Startup"
}
```
