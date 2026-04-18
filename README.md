## 🚀 Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** NextAuth.js (Auth.js) – Credentials Provider
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Deployment:** Vercel

---

## 🛠️ Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/samybit/iti-ecommerce-admin.git
cd iti-ecommerce-admin
```
### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

MONGODB_URI=mongodb_connection_string  
NEXTAUTH_SECRET=generated_secret_key  
NEXTAUTH_URL=http://localhost:3000  

### 4. Run the development server
```bash
npm run dev
```
Open: http://localhost:3000

---

## 📁 Project Structure

```plaintext
src/
├── app/                          # Next.js App Router pages and API routes
│   ├── (dashboard)/              # Protected dashboard route group
│   │   ├── account/              # Account settings page
│   │   ├── categories/           # Categories CRUD pages
│   │   │   ├── add/
│   │   │   └── edit/[id]/
│   │   ├── products/             # Products CRUD pages
│   │   │   ├── add/
│   │   │   └── edit/[id]/
│   │   ├── layout.tsx            # Dashboard layout (sidebar, breadcrumbs)
│   │   ├── loading.tsx           # Dashboard loading state
│   │   └── page.tsx              # Main dashboard overview
│   ├── api/                      # API route handlers
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   ├── account/              # Profile & password update endpoints
│   │   ├── categories/           # Categories REST endpoints
│   │   ├── dashboard/            # Dashboard stats endpoint
│   │   └── products/             # Products REST endpoints
│   ├── login/                    # Public login page
│   ├── globals.css
│   └── layout.tsx                # Root layout
├── components/                   # Reusable UI components
│   ├── account/                  # Profile & security tab components
│   ├── categories/               # Category form & table
│   ├── products/                 # Product form, table & skeleton
│   ├── common/                   # Shared components (Sidebar, Providers)
│   └── ui/                       # shadcn/ui primitives
├── hooks/                        # Custom React hooks
│   ├── useAccountSettings.ts
│   ├── useCategories.ts
│   ├── useDashboard.ts
│   └── useProducts.ts
├── lib/                          # Utility functions
│   ├── mongodb.js                # Database connection cache
│   └── utils.ts                  # General utilities
├── models/                       # Mongoose schemas
│   ├── Category.ts
│   ├── Product.ts
│   └── User.ts                   # Admin user schema
├── types/                        # TypeScript type definitions
│   ├── account.ts
│   ├── category.ts
│   ├── product.ts
│   └── next-auth.d.ts
└── proxy.js                      # Route protection middleware
```
## The Team

<div align="center">
<table>
  <tr>
    <td align="center" width="120">
      <img src="https://github.com/Safeya-Yasien.png" width="72" style="border-radius:50%;" /><br/>
      <strong>Safeya</strong><br/>
      <sub></sub>
    </td>
    <td align="center" width="120">
      <img src="https://github.com/samybit.png" width="72" style="border-radius:50%;" /><br/>
      <strong>Samy</strong><br/>
      <sub></sub>
    </td>
    <td align="center" width="120">
      <img src="https://github.com/Shimaa-Mohammad.png" width="72" style="border-radius:50%;" /><br/>
      <strong>Shimaa</strong><br/>
      <sub></sub>
    </td>
    <td align="center" width="120">
      <img src="https://github.com/tasneem123-UI.png" width="72" style="border-radius:50%;" /><br/>
      <strong>Tasneem</strong><br/>
      <sub></sub>
    </td>
    <td align="center" width="120">
      <img src="https://github.com/Zain5689.png" width="72" style="border-radius:50%;" /><br/>
      <strong>Zainab</strong><br/>
      <sub></sub>
    </td>
  </tr>
</table>
</div>
