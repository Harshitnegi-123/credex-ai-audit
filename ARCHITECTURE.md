# Architecture Overview

Frontend:
React frontend handles:
- User input
- Form handling
- API requests
- Audit result rendering

Backend:
Node.js + Express backend handles:
- Audit API
- Business logic
- Savings calculation
- Recommendation generation

Flow:
Frontend Form → Axios Request → Express Route → Controller → Audit Engine → JSON Response → Frontend UI

The recommendation engine uses configurable pricing and rule objects instead of hardcoded conditions, making the system scalable for additional AI tools and optimization strategies.

## Persistence Layer

Audit reports are persisted in MongoDB using Mongoose schemas. Each audit receives a unique UUID-based shareId used for generating public report URLs.

Flow:
Frontend → Express API → Audit Engine → MongoDB → Shared Report Route