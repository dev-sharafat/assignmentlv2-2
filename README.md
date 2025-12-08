# Vehicle Rental System – Backend API

A modular and scalable backend API for managing vehicle rentals.  
Built with Node.js, TypeScript, Express.js, and PostgreSQL.  
Supports secure authentication, vehicle management, user accounts, and booking operations with full role-based access control.

---
### Project Live Link: https://assignmentlv2-2.vercel.app/
## Overview

The Vehicle Rental System backend provides:

- Vehicle inventory management  
- Admin and Customer roles  
- Rental bookings with validation and automated pricing  
- JWT-based authentication  
- Role-based authorization for secure access  

---

## Features

### Users
- Register and login  
- Customers can manage their own profiles  
- Admin can manage all users  

### Vehicles
- Admin can create, update, and delete vehicles  
- Public users can view vehicle listings  
- Each vehicle has availability tracking  

### Bookings
- Create bookings with automatic validation  
- Rental cost calculated based on date range  
- Cancel or return bookings  
- Auto status updates  

### Authentication
- JWT token-based authentication  
- Password hashing using bcrypt  
- Role-based authorization middleware  

---

## Technology Stack

- Node.js  
- TypeScript  
- Express.js  
- PostgreSQL  
- bcrypt  
- JSON Web Token (JWT)

---

## Database Schema

### Users

| Field | Notes |
|-------|-------|
| id | Auto-increment |
| name | Required |
| email | Unique, lowercase |
| password | Hashed, min 6 chars |
| phone | Required |
| role | 'admin' or 'customer' |

### Vehicles

| Field | Notes |
|-------|-------|
| id | Auto-increment |
| vehicle_name | Required |
| type | car \| bike \| van \| SUV |
| registration_number | Unique |
| daily_rent_price | Positive |
| availability_status | available \| booked |

### Bookings

| Field | Notes |
|-------|-------|
| id | Auto-increment |
| customer_id | FK → Users |
| vehicle_id | FK → Vehicles |
| rent_start_date | Required |
| rent_end_date | Must be after start date |
| total_price | Positive |
| status | active \| cancelled \| returned |

---

## Authentication & Authorization

### Roles
- **Admin:** Full access (manage users, vehicles, and bookings)  
- **Customer:** Can manage only their profile and bookings  

### Token Flow
1. User signs up → password hashed with bcrypt  
2. User logs in → receives JWT token  
3. Protected endpoints require:  
4. Token and role permissions are validated using middleware  

---

## API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|-----------|---------|-------------|
| POST | `/api/v1/auth/signup` | Public | Register new user |
| POST | `/api/v1/auth/signin` | Public | Login and receive token |

---

### Vehicles

| Method | Endpoint | Access | Description |
|--------|-----------|---------|-------------|
| POST | `/api/v1/vehicles` | Admin | Add a vehicle |
| GET | `/api/v1/vehicles` | Public | View all vehicles |
| GET | `/api/v1/vehicles/:vehicleId` | Public | View vehicle details |
| PUT | `/api/v1/vehicles/:vehicleId` | Admin | Update vehicle |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin | Delete vehicle (no active bookings) |

---

### Users

| Method | Endpoint | Access | Description |
|--------|-----------|---------|-------------|
| GET | `/api/v1/users` | Admin | Get all users |
| PUT | `/api/v1/users/:userId` | Admin or Owner | Update user or self profile |
| DELETE | `/api/v1/users/:userId` | Admin | Delete user (if no active bookings) |

---

### Bookings

| Method | Endpoint | Access | Description |
|--------|-----------|---------|-------------|
| POST | `/api/v1/bookings` | Customer/Admin | Create booking |
| GET | `/api/v1/bookings` | Role-based | Admin: all / Customer: own |
| PUT | `/api/v1/bookings/:bookingId` | Role-based | Customer: cancel / Admin: return |

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000
DB_USERNAME = Database user name
DB_PASSWORD = Database password
ACCESS_SECRET = Access_secret

```

### Installation
```
git clone https://github.com/dev-sharafat/assignmentlv2-2.git
cd assignmentlv2-2
npm install
```

### Running the Project
Development
```
npm run dev
```

### Production
```
npm run build
npm start
```