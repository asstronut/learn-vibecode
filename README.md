# Learn VibeCode Backend

A high-performance backend API built with the modern TypeScript stack.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Web Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: PostgreSQL (via Docker)
- **Hashing**: Bun.password (bcrypt)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:asstronut/learn-vibecode.git
   cd learn-vibecode
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Setup environment variables:
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=postgres://vibecode_user:vibecode_password@127.0.0.1:5433/vibecode_db
   ```

### Running the Project

1. Start the database:
   ```bash
   docker-compose up -d
   ```

2. Sync the database schema:
   ```bash
   bun db:push
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Users
- `POST /api/users`: Register a new user.
- `POST /api/users/login`: Login and create a session.

## 📄 License
MIT
