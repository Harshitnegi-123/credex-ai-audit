# AI Spend Audit

AI Spend Audit is a fullstack SaaS-style web application that helps teams analyze AI subscription spending and identify optimization opportunities through upgrade, downgrade, and utilization recommendations.

The system evaluates current AI plans, calculates potential savings, stores audit reports in MongoDB, and generates shareable public audit links.

---

## Features

- AI subscription audit engine
- Dynamic savings calculations
- Upgrade and downgrade recommendations
- Optimized plan detection
- MongoDB persistence
- UUID-based shareable audit reports
- Public audit report pages
- Responsive React frontend
- Rule-based recommendation architecture

---

## Current Supported Tools

- ChatGPT
- Claude
- Cursor
- Midjourney
- GitHub Copilot

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- UUID

---

## Architecture Overview

Frontend → Express API → Audit Engine → MongoDB → Shared Audit Route

The recommendation engine uses a configuration-driven architecture for scalable pricing and recommendation logic.

---

## Project Structure

```txt
client/
server/
```

---

## Setup Instructions

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
```

---

## Future Improvements

- Email-based audit delivery
- Multi-tool auditing in single session
- Authentication system
- Advanced analytics dashboard
- AI-generated audit explanations
- Vendor/team management
- Subscription trend analysis

---

## Key Learnings

- Scalable backend architecture design
- MongoDB schema modeling
- Recommendation engine patterns
- React state management
- Fullstack API integration
- Public report sharing workflows

---

Anthropic API integration structure has been prepared, but production API usage was deferred due to paid API credit requirements during development.