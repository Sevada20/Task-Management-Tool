# Task Management System

A full-stack task management application with role-based access control and real-time updates.

## Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin, Manager, User)
- Secure password hashing

### Task Management

- Create, update, and delete tasks
- Assign tasks to users
- Set task priority and due dates
- Update task status (To Do, In Progress, Completed)
- Drag-and-drop interface for status updates

### Advanced Task Filtering (Admin & Manager Only)

- Search tasks by title ,priority
- Filter tasks by priority (High, Medium, Low)
- Real-time filtering results
- Task counter for each status column

### Role-Based Permissions

#### Admin

- Full system access
- Manage users and roles
- Delete tasks
- Use advanced filtering
- Create and assign tasks

#### Manager

- Create and assign tasks
- Update task status
- Use advanced filtering
- View all tasks

#### User

- View assigned tasks
- Update task status
- Basic task interaction

### Responsive Design

- Works on desktop and mobile devices
- Adaptive layout
- Touch-friendly interface

## Technology Stack

### Frontend

- React 18
- TypeScript
- Material-UI (MUI) for UI components
- React Beautiful DnD for drag-and-drop functionality
- React Router v6 for navigation
- Axios for API requests
- React Hook Form for form handling
- JSS for styling
- Context API for state management
- Vite as build tool

### Type Safety

- TypeScript for static type checking
- Strict type checking enabled
- Interface-based type definitions
- Type-safe API calls
- Typed React components and hooks
- Type-safe form handling with React Hook Form

### Backend

- Node.js
- Express.js framework
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin resource sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Sevada20/task-management-tool.git
cd task-management-tool
```

2. Install backend dependencies:

```bash
cd server
npm install
```

3. Install frontend dependencies:

```bash
cd ..
npm install
```

4. Create a `.env` file in the server directory(if not already created):

```env
MONGO_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the Application

1. Start the backend server:

```bash
cd server
npm start
```

3. Start the frontend development server:

```bash
cd task-management-tool
npm run dev
```

The application will be running at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Test Accounts

> **Important Note About Registration:**
>
> In this demo version, users can select their role (Admin/Manager/User) during registration. This is implemented purely for testing purposes to make it easier to test different role functionalities.
>
> In a production environment:
>
> - New users would only be able to register as regular Users
> - Only existing Admins would have the ability to:
>   - Promote Users to Managers
>   - Assign Admin privileges
>   - Manage user roles
>
> This open registration with role selection is not a security best practice and is only included for demonstration purposes.

```
Admin:
- Username: Sevada1996
- Password: sevada1996

Manager:
- Username: Areg2000
- Password: areg2000

Users:
- Username: Samvel2000
- Password: samvel2000

- Username: Aram1996
- Password: aram1996

- Username: Avet1988
- Password: avet1988

- Username: Karen777
- Password: karen777

-Username: Erik777
-Password: erik777

-Username: Arman1997
-Password arman1997
```

## Technologies Used

### Frontend

- React 18
- TypeScript
- Material-UI (MUI) for UI components
- React Beautiful DnD for drag-and-drop functionality
- React Router v6 for navigation
- Axios for API requests
- React Hook Form for form handling
- JSS for styling
- Context API for state management
- Vite as build tool

### Backend

- Node.js
- Express.js framework
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin resource sharing

## Project Structure

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## API Endpoints

### Authentication

- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Tasks

- GET `/api/tasks` - Get all tasks (filtered by user role)
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task
- PUT `/api/tasks/:id/status` - Update task status

### Users

- GET `/api/users` - Get all users
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

### Task Management Features

- Kanban board style interface
- Drag and drop tasks between status columns
- Task priority levels (Low, Medium, High)
- Task status tracking (To Do, In Progress, Complete)
- Task assignment to specific users
- Due date setting
- Task description and details
- Real-time task status updates
