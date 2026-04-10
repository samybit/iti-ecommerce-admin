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
├── app/                  # Next.js App Router pages and API routes
│   ├── api/auth/         # NextAuth configuration
│   ├── login/            # Public login page
│   ├── page.js           # Protected main dashboard
│   └── layout.js         # Root layout
├── lib/                  # Utility functions
│   └── mongodb.js        # Database connection cache
├── models/               # Mongoose schemas
│   └── User.js           # Admin user schema
└── proxy.js              # Route protection middleware
```
