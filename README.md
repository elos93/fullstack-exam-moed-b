# Fullstack Workout Tracker App

A full stack workout tracker project for managing workout exercises. This stage includes the backend API only.

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- nodemon

## Backend Setup

```bash
cd server
npm install
npm run dev
```

For production-style startup:

```bash
cd server
npm start
```

The server starts only after a successful MongoDB connection.

## Environment Variables

Create `server/.env` locally based on `server/.env.example`:

```env
PORT=5000
MONGODB_URI=
AI_GATEWAY_API_KEY=
AI_GATEWAY_MODEL=
```

Do not commit `.env` files.

## Workout Model

```js
{
  name: String, // required, trim, minlength 1, maxlength 20
  muscleGroup: String, // required, trim, minlength 1
  description: String, // required, trim, maxlength 200
  timestamps: true
}
```

## Backend Endpoints

```txt
GET /workouts
POST /workouts
GET /workouts/search?name=
DELETE /workouts/:id
```

## AI Usage

AI was used to set up the project, write code, run checks, and fix errors.
