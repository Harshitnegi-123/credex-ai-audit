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

Frontend Form
↓
Axios API Request
↓
Express Route
↓
Controller
↓
Audit Engine
↓
JSON Response
↓
Frontend UI