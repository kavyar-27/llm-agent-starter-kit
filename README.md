# LLM Agent Starter (Titanic + Wine)

Minimal starter for a dockerized data analysis agent:
- **Frontend:** Next.js (App Router) + React + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **DB:** PostgreSQL (seeded with Titanic & Wine Quality tiny samples)
- **Orchestration (stub):** space for LangChain/LangGraph + OpenAI report synthesis

## Quickstart
1. Create `.env` from `.env.example` and set `OPENAI_API_KEY` (optional for now).
2. `docker compose up --build`  
3. Visit `http://localhost:3000` (web), API at `http://localhost:4000`.
4. Endpoints:
   - `GET /api/datasets`
   - `GET /api/schema/:dataset`
   - `POST /api/tasks` → stub creation
   - `GET /api/tasks/:id` → stub payload

> This is a minimal skeleton. It compiles but returns stub data for tasks. Fill in SQL queries and LLM synthesis in `backend/src/services/analysis.ts`.

## Structure
```
/backend      # Express + TS
/frontend     # Next.js + TS (App Router)
/db_init      # Postgres schema + seed (tiny sample rows)
/datasets     # CSVs for COPY (tiny sample versions)
docker-compose.yml
```
