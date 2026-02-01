Book Publishing API — Config-Driven Audit Trail

A minimal Book Publishing backend built with Node.js, TypeScript, Fastify, Prisma, and SQLite, focused on:

Auditability

Security

Observability

Clean architecture

Tech Stack
Layer	Technology
Runtime	Node.js 20
Language	TypeScript (strict mode)
Framework	Fastify
ORM	Prisma
Database	SQLite (local file)
Logging	Pino
Validation	Zod
Tracing	AsyncLocalStorage
 Architecture
Routes → Services → Prisma DB
             ↓
        Audit Service
             ↓
        AuditLog Table


Cross-cutting systems:

Authentication

RBAC

Config-driven audit logging

Structured logging & tracing

Centralized error handling

Authentication

API key–based auth using header:

x-api-key: <key>


Seeded users:

Role	API Key
Admin	admin-key
Reviewer	reviewer-key
Role-Based Access Control
Role	Access
Admin	All APIs + audit logs
Reviewer	Book APIs only
Config-Driven Audit Trail

Audit behavior is controlled via:

export const auditConfig = {
  Book: { track: true, exclude: ['updatedAt'], redact: [] },
  User: { track: true, exclude: ['credentials'], redact: ['credentials'] },
};

Each audit record stores:

entity

entityId

action

actorId

diff (before/after)

requestId

timestamp

Adding a new entity requires only config update, not logic changes.

Audit Query API

Admin can filter by:

entity

entityId

actorId

action

requestId

date range

Logging & Observability

Each request logs:

Field	Description
requestId	Unique trace id
userId	Actor
route	Endpoint
method	HTTP method
status	Response code
durationMs	Execution time
⚠ Error Handling

All errors follow this format:

{
  "error": {
    "code": "APP_ERROR",
    "message": "Something failed",
    "requestId": "req-3"
  }
}

🛠 Setup Instructions
1️⃣ Install dependencies
npm install

2️⃣ Generate Prisma client
npx prisma generate

3️⃣ Run migrations
npx prisma migrate dev --name init

4️⃣ Start server
npm run dev


Server runs at:

http://localhost:3000

🧪 cURL Examples
Health
curl http://localhost:3000/health -H "x-api-key: admin-key"

Create Book
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: application/json" \
-H "x-api-key: admin-key" \
-d '{"title":"Book","authors":"Author","publishedBy":"Publisher"}'

Update Book
curl -X PATCH http://localhost:3000/api/books/{BOOK_ID} \
-H "x-api-key: admin-key" \
-d '{"title":"Updated"}'

Delete Book
curl -X DELETE http://localhost:3000/api/books/{BOOK_ID} \
-H "x-api-key: admin-key"

Get Audit Logs
curl http://localhost:3000/api/audits -H "x-api-key: admin-key"

Evaluation Highlights

✔ Config-driven audit
✔ Secure RBAC
✔ Structured logging + tracing
✔ Central error handling
✔ Clean modular architecture

Database Choice

SQLite was selected because:

Zero setup

Easy local execution

Suitable for assignment scope

Final Outcome

This project demonstrates:

Production-ready audit design

Backend observability

Secure API practices

Extensible architecture