# Fullstack Workout Tracker App

A full stack workout tracker application for creating, listing, searching and deleting workout records. This stage focuses on the standalone Express backend.

## Project Structure

```txt
fullstack-exam-moed-b/
├── client/     Standalone React frontend
├── server/     Standalone Express backend
├── README.md
└── .gitignore
```

## Backend Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- nodemon

## Installation

```bash
cd server
npm install
```

## Running The Backend

Development:

```bash
cd server
npm run dev
```

Production-style startup:

```bash
cd server
npm start
```

The backend uses `process.env.PORT` or falls back to `5000`.

## Environment Variables

Create `server/.env` locally based on `server/.env.example`:

```env
PORT=5000
MONGODB_URI=
AI_GATEWAY_API_KEY=
AI_GATEWAY_MODEL=
```

Do not commit `.env` files or secret values.

## Workout Structure

```js
{
  name: String, // required, trim, minlength 1, maxlength 20
  muscleGroup: String, // required, trim, minlength 1
  description: String, // required, trim, maxlength 200
  timestamps: true
}
```

Example request body:

```json
{
  "name": "Leg Workout",
  "muscleGroup": "Legs",
  "description": "A beginner leg workout"
}
```

Example success response:

```json
{
  "_id": "660000000000000000000000",
  "name": "Leg Workout",
  "muscleGroup": "Legs",
  "description": "A beginner leg workout"
}
```

Example error response:

```json
{
  "message": "name, muscleGroup, and description are required"
}
```

## Backend Endpoints

```txt
GET /workouts
POST /workouts
GET /workouts/search?name=
DELETE /workouts/:id
```

## Future Links

- Frontend: TBD
- Backend: TBD

## AI Usage

AI tools were used for project setup, code assistance, debugging and code review. All generated code was reviewed and adapted to the project requirements.
