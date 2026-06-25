# Fullstack Workout Tracker App

A full-stack workout tracker for creating, listing, searching, deleting, and generating descriptions for workout records. The project is split into a standalone React frontend and a standalone Express backend.

## Project Structure

```txt
fullstack-exam-moed-b/
|-- client/     React frontend
|-- server/     Express backend
|-- README.md
`-- .gitignore
```

## Technologies

- React with Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Mongoose
- Vercel AI Gateway
- AI SDK
- Zod
- dotenv
- cors
- nodemon

## Local Setup

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

## Run The Backend

```bash
cd server
npm run dev
```

The backend uses `process.env.PORT` or falls back to `5000`.

## Run The Frontend

```bash
cd client
npm run dev
```

The frontend expects the backend URL from `VITE_API_URL` and falls back to `http://localhost:5000`.

## Environment Variables

Backend `server/.env`:

```env
PORT=5000
MONGODB_URI=
AI_GATEWAY_API_KEY=
AI_GATEWAY_MODEL=
FRONTEND_URL=
```

Frontend `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Do not commit `.env` files or secret values.

## Frontend Routes

```txt
/all-workouts
/add-workout
/search-workouts
```

## Backend Endpoints

```txt
GET /workouts
POST /workouts
POST /workouts/generate
GET /workouts/search?name=
DELETE /workouts/:id
```

## Workout Structure

```js
{
  name: String, // required, trim, minlength 1, maxlength 20
  muscleGroup: String, // required, trim, minlength 1
  description: String, // required, trim, maxlength 200
  timestamps: true
}
```

## Create Workout Request

```json
{
  "name": "Leg Workout",
  "muscleGroup": "Legs",
  "description": "A beginner leg workout"
}
```

## AI Description Generation

Endpoint:

```txt
POST /workouts/generate
```

Request body:

```json
{
  "name": "Beginner Leg Workout",
  "muscleGroup": "Legs"
}
```

Response body:

```json
{
  "description": "A short workout description"
}
```

The generated description is inserted into the frontend description field, but it is not saved automatically. The user can edit the generated description and must click the regular add workout button to save the workout to MongoDB.

## Example Error Response

```json
{
  "message": "name, muscleGroup, and description are required"
}
```

## Production Links

- Frontend Production: https://fullstack-exam-moed-b-frontend.vercel.app
- Backend Production: https://fullstack-exam-moed-b-backend.vercel.app

## AI Usage

AI tools were used for project setup, code assistance, debugging, code review, and workout description generation. All generated code and generated workout content were reviewed and adapted to the project requirements.
