# TableEase

TableEase is a restaurant table reservation system developed for IFN636 Assessment 1. The sample application focuses on the main customer reservation workflow, including entering booking details, validating the input, saving the reservation and displaying a confirmation result.

## Main Workflow

The implemented workflow allows a customer to:

1. Enter reservation details.
2. Submit the reservation form.
3. Receive validation feedback if the input is invalid.
4. Save a valid reservation to the database.
5. Receive a reservation ID and confirmation result.

## Technologies

- React
- Node.js
- Express
- MongoDB Atlas
- Git and GitHub
- AWS EC2
- PM2

## Architecture Summary

TableEase uses a React frontend and a Node.js/Express backend.

The frontend sends reservation requests to the Express API. The backend validates the reservation information and stores valid reservations in MongoDB Atlas. In the deployed version, Express also serves the React production build from the EC2 instance.

Basic architecture:

```text
Customer
   ↓
React Frontend
   ↓
Express API
   ↓
Reservation Validation
   ↓
MongoDB Atlas
```

## Project Structure

TableEase/

```text
TableEase/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
├── .gitignore
└── README.md
```

## Local Setup

1. Clone the repository:

```bash
git clone https://github.com/Violet-636/TableEase.git
cd TableEase
```

2. Install the backend dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file inside the `backend` folder and add the MongoDB connection string:

```text
MONGO_URI=<your MongoDB connection string>
PORT=5000
```

The `.env` file contains private configuration and is not committed to GitHub.

4. Install the frontend dependencies:

```bash
cd ../frontend
npm install
```

5. Create the React production build:

```bash
npm run build
```

6. Start the backend server:

```bash
cd ../backend
node server.js
```

The local application can then be accessed at:

```text
http://localhost:5000
```

## EC2 Deployment

TableEase is manually deployed to an AWS EC2 Ubuntu instance.

Deployment configuration:

- Instance name: TableEase
- Instance type: t3.medium
- Region: Asia Pacific (Sydney)
- Public subnet: PublicSubnet1
- IAM instance profile: IFN636-EC2-Role
- Application port: 5001

The deployment process included installing Git, Node.js and npm on the EC2 instance, cloning the GitHub repository, installing the project dependencies, creating the React production build, configuring the MongoDB connection and running the application with PM2.

PM2 is used to keep the application running after the SSH connection is closed.

## Deployment URL

The deployed TableEase application is available at:

```text
http://13.211.219.102:5001/
```

## Known Limitations

- The sample application implements the customer reservation creation workflow only.
- Customer reservation management and staff reservation management are included in the design and prototype but are not implemented in the sample application.
- The deployed application currently uses HTTP rather than HTTPS.
- The application uses the EC2 public IPv4 address instead of a custom domain.
- The EC2 public IP may change if the instance is stopped and restarted.