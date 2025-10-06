# Tindora (Backend)

Backend server for the Tindora application — handles business logic, API routes, authentication, database, real‑time communication, email, etc.

---

## Table of Contents

- [Demo / Live Site](#demo--live-site)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Architecture & Folder Structure](#architecture--folder-structure)  
- [Setup / Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Running the Server](#running-the-server)  
- [API Routes](#api-routes)  
- [Socket / Real-time](#socket--real-time)  
- [Cron Jobs / Background Tasks](#cron-jobs--background-tasks)  
- [Testing / Validation](#testing--validation)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Demo / Live Site

The frontend is hosted at [*Live Preview*](https://themiraclestreet.co.in) (production).  
The frontend repository is: [Frontend Repo](https://github.com/Anurag1224/tindora-UI ) 

---

## Tech Stack

| Component           | Technology / Library            |
|---------------------|----------------------------------|
| Runtime / Framework | Node.js, Express.js              |
| Database            | MongoDB (via Mongoose)          |
| Authentication      | JWT (JSON Web Tokens)           |
| Password hashing    | bcrypt                          |
| Real-time / Sockets | socket.io                        |
| Cron / Scheduling   | node-cron                        |
| Email Service        | AWS SES via AWS SDK              |
| Input Validation    | validator / custom validation    |
| Env & Configuration | dotenv                           |
| CORS, Cookies        | cors, cookie-parser               |

---

## Features

- User authentication (signup, login)  
- Profile management  
- Chat / messaging between users (socket-based)  
- Connection / request system (send/accept/reject connection)  
- Email notifications via AWS SES  
- Scheduled tasks / cleanup using cron  
- Validation & sanitization of inputs  
- Middleware for protected routes  
- Modular routing: auth, user, profile, chat, request

---

## Architecture & Folder Structure

Here’s a high-level view of the structure:

.
├── package.json
├── package-lock.json
├── .gitignore
└── src
├── app.js
├── config
│ └── database.js
├── middlewares
│ └── auth.js
├── models
│ ├── user.js
│ ├── chat.js
│ └── connectionRequest.js
├── routes
│ ├── auth.js
│ ├── user.js
│ ├── profile.js
│ ├── chat.js
│ └── request.js
└── utils
├── socket.js
├── sendEmail.js
├── sesClient.js
├── cronJob.js
└── validation.js


- `app.js` — initializes Express, middleware, routes, and socket server  
- `config/database.js` — MongoDB connection  
- `middlewares/auth.js` — JWT‑based route protection  
- `models/` — Mongoose schemas for users, chats, connection requests  
- `routes/` — the API endpoints  
- `utils/` — helper functionality: validation, email sending, cron tasks, socket logic  

---

## Setup / Installation

Clone the repo and install dependencies:

    git clone https://uithub.com/Anurag1224/tindora.git
    cd tindora
    npm install

---

## Environment Variables

You should create a .env file in the root with variables such as:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
AWS_REGION=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
EMAIL_FROM_ADDRESS=...
##### any other AWS SES or email config

---

## Running the Server

Start the server (development): 
  
    npm run dev

By default, it listens on the port from process.env.PORT (fallback to something you set in code).

---

## API Routes

Below is an approximate list of the major API endpoints:


| Route                | Method           | Description                                    |
| -------------------- | ---------------- | ---------------------------------------------- |
| `/api/auth/register` | POST             | Register new user                              |
| `/api/auth/login`    | POST             | Login user, return JWT                         |
| `/api/user/...`      | GET / PUT etc.   | User-related endpoints (profile, fetch users)  |
| `/api/profile/...`   | GET / PUT etc.   | Profile-specific endpoints                     |
| `/api/chat/...`      | GET / POST       | Chat history, send messages                    |
| `/api/request/...`   | POST / GET / PUT | Send, view, accept, reject connection requests |

**Note:** Some routes require authentication (JWT token) via Authorization header.

You can expand this section by listing all routes with input / output schemas.

---

## Socket / Real-Time

    - Uses socket.io (integrated with Express)

    - On client connection, uses socket logic (in utils/socket.js) for messaging events

    - Real-time delivery of chat messages between connected users.

---

## Cron Jobs / Background Tasks

    - A scheduled cron job (in utils/cronJob.js) runs at intervals (e.g., cleanup, reminders)

    - Useful for tasks like marking stale requests, sending scheduled emails, etc.

---

## Testing / Validation

    - Input validation is done in utils/validation.js, checking required fields, data formats

    - You may write unit or integration tests using Jest, Mocha, etc. (future scope)

---

## Contributing

    - If others want to contribute:

    - Fork the repository

    - Create a feature branch (git checkout -b feature/awesome)

    - Commit your changes (git commit -m "Add feature")

    - Push to branch (git push origin feature/awesome)

    - Open a Pull Request

    - Please follow code style, document new features, and write tests if possible. 

---

## License

This project is licensed under the ISC License (as per package.json)
You can adjust this if you prefer MIT or another license.

---

Thank you for checking out Tindora!
Let me know if you want me to refine any section (e.g. route details, examples, swagger specs) or integrate with the frontend readme for a unified presentation.
