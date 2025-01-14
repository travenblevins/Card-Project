# Card-Project
This is a simple RESTful API built with Node.js and Express for managing cards. The API allows users to perform CRUD operations on card data, including:

- **Create a card**: Add new cards to the system.
- **Update a card**: Modify existing card details.
- **Delete a card**: Remove cards from the system.
- **Login**: Authenticate users with JWT (JSON Web Token) for secure access to API endpoints.

### Features
- Secure endpoints using JWT authentication.
- In-memory card storage (simulated with an array).
- CRUD operations for card management.
- User authentication via JWT.

### Technologies
- Node.js
- Express
- JWT (JSON Web Token)
- Body-parser for request parsing
- Express-jwt middleware for securing routes

### Setup
1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the server with `npm start`.
4. Use API tools (like Postman) to interact with the endpoints.

### Endpoints
- `POST /login`: User login to receive a JWT.
- `POST /cards/create`: Create a new card.
- `POST /cards/update`: Update an existing card.
- `POST /cards/delete`: Delete a card.

### Notes
- JWT authentication is required for accessing the card management endpoints.
- In-memory data is used for simplicity; in a production environment, a database would be used.

