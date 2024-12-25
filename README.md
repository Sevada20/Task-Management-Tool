# Task Management System

A full-stack task management application with role-based access control.

## Features

### User Roles & Permissions

#### Admin

- Full system access
- Manage users:
  - View all users
  - Delete users
  - Change user roles
- Manage tasks:
  - Create new tasks
  - Edit any task
  - Delete any task
  - Assign tasks to users
  - View all tasks
  - Update task status
- Access to user management page

#### Manager

- Task management:
  - Create new tasks
  - Edit tasks
  - Assign tasks to users
  - View all tasks
  - Update task status
- User management:
  - View list of users
  - Cannot modify user roles
  - Cannot delete users
- Access to user management page

#### User

- Limited access:
  - View only assigned tasks
  - Update status of assigned tasks
  - Cannot create tasks
  - Cannot assign tasks
  - Cannot access user management
  - Cannot view other users' tasks

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

4. Create a `.env` file in the server directory:

```env
MONGO_URI=your_mongodb_connection_string
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
```

## Technologies Used

### Frontend

- React 18
- Material-UI (MUI) for UI components
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
