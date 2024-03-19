# School Management Server

This is a backend server application for managing school data using Node.js, Express.js, and Prisma ORM. The application provides APIs for performing CRUD operations on students, classrooms, and clubs.

## Project Structure

The project is organized into the following modules:

### Entities (`src/entities`)

This module defines the data models and relationships for the application. It includes:

- `Student`: Represents a student with properties like `fullname`, `classroomId`, and associated `clubs`.
- `Classroom`: Represents a classroom with a `name`.
- `Club`: Represents a club with a `name` and associated `students`.

### Repositories (`src/repositories`)

This module contains repository classes that interact with the Prisma client to perform database operations. It includes:

- `RepositoryStudent`: Provides methods for creating, retrieving, updating, and deleting students, as well as managing their associated clubs.
- `RepositoryClassroom`: Provides methods for creating and retrieving classrooms.
- `RepositoryClub`: Provides methods for creating and retrieving clubs, including their associated students.

### Handlers (`src/handlers`)

This module implements Express.js route handlers for handling HTTP requests and responses. It utilizes the repository classes to perform the required operations. It includes:

- `HandlerStudent`: Handles CRUD operations for students, including managing their associated clubs.
- `HandlerClassroom`: Handles creating and retrieving classrooms.
- `HandlerClub`: Handles creating and retrieving clubs, including their associated students.

### Server Setup (`src/index.ts`)

This file sets up the Express.js server, initializes the required instances (Prisma client, repositories, and handlers), and defines the API routes.

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm start`

The server will start running at `http://localhost:8000`.

## API Endpoints

- **Students**
  - `POST /students`: Create a new student
  - `GET /students`: Get all students
  - `GET /students/:id`: Get a student by ID
  - `DELETE /students/:id`: Delete a student by ID
  - `POST /students/clubs/:id`: Update a student's associated clubs

- **Classrooms**
  - `POST /classrooms`: Create a new classroom
  - `GET /classrooms`: Get all classrooms

- **Clubs**
  - `POST /clubs`: Create a new club
  - `GET /clubs`: Get all clubs with associated students

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- TypeScript