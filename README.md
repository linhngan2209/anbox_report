
# Furniture Dashboard (Skeleton)

This is a minimal **React + TailwindCSS** dashboard skeleton for managing furniture (products, orders, inventory, customers, reports).
It includes a simple login page, basic routes and a mock JSON server for demo data.

## Quick start

1. Extract the ZIP.
2. Install dependencies:
```bash
npm install
```

3. Start mock API server (in a separate terminal):
```bash
npm run mock:server
```

4. Run dev server:
```bash
npm run dev
```

Open http://localhost:5173

## Project structure (important files)

- `src/` - React source code
  - `main.jsx` - app entry
  - `App.jsx` - routes + layout
  - `pages/` - Login, Dashboard, Products, Orders, Inventory, Customers, Reports
- `mock/db.json` - mock data for `json-server`
- `tailwind.config.js`, `postcss.config.js` - Tailwind setup

## Notes
- This is a skeleton to get you started. You'll need to implement full CRUD, image upload, authentication, and styling to match your needs.
- If you prefer CRA instead of Vite, adjust scripts accordingly.


## Added features
- Full product CRUD (create/edit/delete) with image upload (base64)
- Product tags support
- Search, pagination, CSV import/export for products
- Reports using Chart.js (line & bar)


## Added more features
- Confirm modal for destructive actions (delete)
- Toast notifications system (pushToast)
- Advanced search & filters: category, tag, price range
- Server-side pagination using json-server query params (_page, _limit)

Note: json-server supports query params like _page & _limit and returns X-Total-Count header used to compute total pages.
