# Development Log

## Day 1

Completed:
- Frontend React setup
- Backend Express setup
- Audit engine creation
- API integration
- Dynamic savings calculation
- Recommendation rendering
- Basic Tailwind UI
- Frontend validation
- Fullstack request-response cycle

Challenges:
- Route debugging
- ES module import issues
- Frontend-backend naming consistency
- React rendering issues

Next Steps:
- Add more AI tools
- Improve pricing logic
- Database integration
- Better UI/UX


## Day 2

Completed:
- Refactored audit engine into scalable rule-based architecture
- Added support for Claude and Cursor pricing models
- Implemented dynamic recommendation generation
- Added dropdown-based UX improvements
- Added loading states and empty-state handling
- Connected user-entered monthly spend to savings calculations
- Improved UI hierarchy and recommendation cards

Key Learning:
Moving from hardcoded logic to configuration-driven systems makes backend architecture significantly more scalable and maintainable.

## Day 3

Completed:
- Integrated MongoDB Atlas using Mongoose
- Added persistent audit storage
- Created Audit schema and database models
- Implemented UUID-based shareId generation
- Built shared audit report API endpoint
- Added dynamic public audit pages using React Router
- Added shareable audit URLs in frontend
- Improved backend recommendation flow architecture

Challenges:
- Mongoose schema validation errors
- Nested object schema debugging
- Model caching and type conflicts
- React Router integration issues

Key Learning:
Persisting data transforms a temporary calculator into a reusable SaaS-style workflow. Proper schema structure and backend architecture become significantly more important once application state is stored permanently.

## Day 4

Completed:
- Integrated MongoDB Atlas database
- Added persistent audit report storage
- Implemented shareable audit links using UUIDs
- Built public shared audit page
- Added Nodemailer email integration
- Added production environment variables
- Improved recommendation rendering logic

Challenges:
- MongoDB schema validation issues
- Mongoose casting errors
- SMTP authentication debugging
- Async request handling problems

Key Learning:
Persisting generated reports introduced backend architecture considerations around schema design, route handling, and asynchronous workflows.

## Day 5

Completed:
- Deployed backend on Render
- Deployed frontend on Vercel
- Configured production API communication
- Fixed deployment-related bugs
- Added production-ready share URLs
- Improved loading states and UI feedback
- Added additional documentation files

Challenges:
- Monorepo deployment configuration
- Production environment debugging
- Handling frontend-backend URL separation
- Email delivery limitations on free hosting tiers

Key Learning:
Production deployment exposed issues that never appeared during local development, especially around environment variables, networking, and external service integration.

---

Email feature implemented with Resend. Currently sends to verified email only due to free tier domain restriction. Production mein custom domain add karke any email pe send kar sakte hain.