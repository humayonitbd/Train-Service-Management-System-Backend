### Train Service Management System
### Project Overview
This project is a backend system for managing train services, stations, user wallets, and ticketing. It is built using Node.js, Express, and MongoDB. The system supports user authentication, train scheduling, wallet integration, and ticket purchasing functionalities.

### Key Features
User Management: Secure user registration and login with JWT-based authentication.
Station Management: Create, update, and retrieve station details with validation.
Train Management: Manage train schedules, including stops and timings.
Wallet Integration: Add funds to user wallets, manage balances, and track transaction history.
Ticketing System: Purchase tickets using wallet balance with fare calculation based on train stops.

### Technologies Used
Node.js: Backend runtime environment.
Express: Web framework for Node.js.
Mongoose: ODM for MongoDB, used to model data.
jsonwebtoken: For generating and verifying JWT tokens.
bcrypt: For hashing passwords securely.
dotenv: For managing environment variables.
zod:For validation your project.

### Installation and Setup
### 1. Clone the repository:
git clone https://github.com/humayonitbd/Train-Service-Management-System-Backend
cd Train-Service-Management-System-Backend

### 2. Install dependencies:
npm install

### 3. Set up environment variables:
NODE_ENV=development
PORT = 5000
DATABASE_URL=
BCRYPT_SALT_ROUNDS=
JWT_ACCESS_SECRET = 
JWT_REFRESH_SECRET = 
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=

### Run the project:
npm start:dev


### Access the API: http://localhost:5000
### API Endpoints
### User Management
1.POST /api/v1/signup: Register a new user.
2.POST /api/v1/login: User login and token generation.

### Station Management
1.POST /api/v1/station/create-station: Create a new station.
2.GET /api/v1/station: Retrieve all stations.
3.PUT /api/v1/stations/:id: Update station details.

### Train Management
1.POST /api/v1/train/create-train: Create a new train schedule.
2.GET /api/v1/train: Retrieve all train schedules.
3.PUT /api/v1/train/:id: Update train schedule.

### Wallet Integration
1.POST /api/v1/wallet/add-wallet: Add funds to a user's wallet.
2.GET /api/v1/wallet: Retrieve wallet balance.

### Ticketing System
1.POST /api/v1/ticket: Purchase a ticket using wallet balance.
2.GET /api/v1/ticket: Retrieve wallet balance.






