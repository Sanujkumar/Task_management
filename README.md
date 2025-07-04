

## 🛠️ Local Development Using Docker Compose

This project is Dockerized with full backend (PostgreSQL) and frontend (Next.js + TypeScript + Prisma) setup using Docker Compose.

---

### 🚀 Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
* Node.js (v18+) installed (optional, for local testing)
* Git installed

---

### 📦 Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### ⚙️ Step 1: Create `.env` File

In the root of the project, create a `.env` file:

```env
DATABASE_URL=postgres://postgres:postgres@db:5432/mydb
```

> Note: Use `db` as the hostname — it's the internal service name in Docker.

---

### 🐳 Step 2: Start Everything via Docker Compose

```bash
docker-compose up --build
```

This will:

* Build your Next.js app from the Dockerfile
* Start the PostgreSQL database container
* Network both containers together

---

### 🔄 Step 3: Run Prisma Migrations Inside the App Container

In a separate terminal:

```bash
docker exec -it nextjs-app npx prisma migrate dev --name init
```

> This applies the Prisma schema to your Dockerized PostgreSQL database.

---

### ✅ Visit the App

Open your browser:

```
http://localhost:3000
```

Your app should be running and connected to the PostgreSQL DB via Docker.

---

### 🌱 (Optional) Seed Sample Data

If your project includes a seed script:

```bash
docker exec -it nextjs-app npx prisma db seed
```

---

### 🧼 Cleanup

To stop the containers:

```bash
docker-compose down
```

To stop and remove volumes (DB data):

```bash
docker-compose down -v
```

---

## 🚢 Production Deployment (Vercel)

In production, the app is deployed to Vercel and uses Neon DB.

* Set the production `DATABASE_URL` in the Vercel Dashboard → Project Settings → Environment Variables
* Vercel will auto-detect your Next.js app
* For production schema updates, run:

```bash
npx prisma migrate deploy
```

---

## 📁 Folder Structure Overview

```
.
├── docker-compose.yml      # Defines web + db services
├── Dockerfile              # Builds Next.js app container
├── prisma/
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Migration history
├── .env                    # Local environment variables
├── package.json
├── tsconfig.json
└── ...                     # Your app code
```

---

## 🙌 Contributing

1. Fork this repository
2. Clone your fork locally
3. Follow the local setup above
4. Submit a pull request with your changes

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
   



<!-- docker run -d --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb -p 5432:5432 postgres:15
     -->