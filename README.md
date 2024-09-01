### Train Service Management System
### Project Overview
This project is a backend system for managing train services, stations, user wallets, and ticketing. It is built using Node.js, Express, and MongoDB. The system supports user authentication, train scheduling, wallet integration, and ticket purchasing functionalities.

### Key Features
1. User Management: Secure user registration and login with JWT-based authentication.
2. Station Management: Create, update, and retrieve station details with validation.
3. Train Management: Manage train schedules, including stops and timings.
4. Wallet Integration: Add funds to user wallets, manage balances, and track transaction history.
5. Ticketing System: Purchase tickets using wallet balance with fare calculation based on train stops.

### Technologies Used
1. Node.js: Backend runtime environment.
2. Express: Web framework for Node.js.
3. Mongoose: ODM for MongoDB, used to model data.
4. jsonwebtoken: For generating and verifying JWT tokens.
5. bcrypt: For hashing passwords securely.
6. dotenv: For managing environment variables.
7. zod:For validation your project.

### Installation and Setup
### 1. Clone the repository:
1. git clone https://github.com/humayonitbd/Train-Service-Management-System-Backend
2. cd Train-Service-Management-System-Backend

### 2. Install dependencies:
npm install

### 3. Set up environment variables:
1. NODE_ENV=development
2. PORT = 5000
3. DATABASE_URL=
4. BCRYPT_SALT_ROUNDS=
5. JWT_ACCESS_SECRET = 
6. JWT_REFRESH_SECRET = 
7. JWT_ACCESS_EXPIRES_IN=
8. JWT_REFRESH_EXPIRES_IN=

### Run the project:
npm start:dev


### Access the API: http://localhost:5000
### API Endpoints
### User Management
1. POST /api/v1/signup: Register a new user.
2. POST /api/v1/login: User login and token generation.

### Station Management
1. POST /api/v1/station/create-station: Create a new station.
2. GET /api/v1/station: Retrieve all stations.
3. PUT /api/v1/stations/:id: Update station details.

### Train Management
1. POST /api/v1/train/create-train: Create a new train schedule.
2. GET /api/v1/train: Retrieve all train schedules.
3. PUT /api/v1/train/:id: Update train schedule.

### Wallet Integration
1. POST /api/v1/wallet/add-wallet: Add funds to a user's wallet.
2. GET /api/v1/wallet: Retrieve wallet balance.

### Ticketing System
1. POST /api/v1/ticket: Purchase a ticket using wallet balance.
2. GET /api/v1/ticket: Retrieve wallet balance.






