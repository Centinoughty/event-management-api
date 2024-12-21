# Event Management API

An event management API built with Express.js and MongoDB. This API allows you to manage events, users, and authentication for building scalable event management systems.

## Features

- **Event CRUD Operations**: Create, Read, Update, and Delete events.
- **User Authentication**: Register and login users with JWT-based authentication.
- **Role-based Access Control**: Admins can manage users and events, while regular users can only interact with their own events.
- **Event Search and Filtering**: Filter events by date, type, and location.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- BcryptJS
- Mongoose

## API Endpoints

### Events

- `POST /api/event/create`: Create an event (Admin, Manager and Organizer only).
- `GET /api/event/:id`: Get a single event by ID.
- `GET /api/event`: Get all events.
- `PUT /api/event/upodate/:id`: Update an existing event by ID (Admin, Manager and Organizer only).
- `DELETE /api/event/:id`: Delete an event by ID (Admin, Manager and Organizer only).
- `POST /register/:id`: User can register for an event.

### Users

- `GET /api/user/register`: Register a user.
- `GET /api/user/login`: Logs in a user.
- `PUT /api/user/update`: Update user information.
- `PUT /api/user/update-control`: Update control of user (Admin only).

### Venues

- `POST /api/venue`: Create a venue (Admin and Manager only).
- `GET /api/venue/:id`: Get a single venue by ID.
- `GET /api/venue`: Get all venue.
- `PUT /api/venue/update/:id`: Update an existing venue by ID (Admin and Manager only).
- `DELETE /api/venue/:id`: Delete an venue by ID (Admin and Manager only).

### Attendance

- `POST /api/attendance/generate-code/:id`: Generate the attendance code for the event.
- `POST /api/attendance/mark-attendance/:id`: User can mark the attendance once the event has started.
- `GET /api/attendance/get-attendance/:id`: Get the attendance list for the event(Admin, Manager and Organizer).

### Attendance

- `POST /api/feedback/add/:id`: Registered users can add feedback.
- `GET /api/feedback/get-feedback/:id`: User can get the feedback for the event.
- `GET /api/feedback/get-all-attendance/:id`: Get all the feedback given by the particpants for the event.


### Middleware

- **LogAccess Middleware**: Logs all the requests to the server
- **Authorization Middleware**: Ensures that only users with the appropriate role (admin or user) can access certain endpoints.

## Security

- **Events wont encounter clashes**
- **4 levels of hierarchy included**
- **Only admins can assign roles and edit the userId**
- **Keeps the log for security**
- **Scheduled background task for extra benefits**

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Centinoughty/event-management-api.git
   cd event-management-api

2. Install the dependencies:

  ```bash
  npm install

3. Create a `.env` file and set the required environment variables (e.g., `MONGO_URI`, `JWT_SECRET`, etc.).

4. Start the server

  ```bash
  npm start

## Contributing

1. Fork the repository

2. Create your feature branch

3. Commit your changes and push

4. Create a new pull request


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.