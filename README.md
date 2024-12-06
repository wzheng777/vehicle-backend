# Vehicle Dashboard Backend Application

This is the **Node.js backend** for the **Vehicle Dashboard** application. The backend serves as the API layer, handling data interactions, updating vehicle metrics, and connecting to the **MongoDB** database. The backend is containerized using Docker and can be deployed to **Google Cloud Run**.

## Features
- Provides REST API endpoints to manage vehicle data.
- Connects to **MongoDB** for data persistence.
- Uses **Express.js** for handling HTTP requests.
- Can be easily deployed using **Docker** and **Google Cloud Run**.

## Prerequisites
Before running this project, make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Docker** (for containerization)
- **Google Cloud SDK** (for deployment)

## Getting Started

### Clone the Repository
```sh
git clone https://github.com/your-username/vehicle-dashboard-backend.git
cd vehicle-dashboard-backend
```

### Install Dependencies
Run the following command to install the required packages:
```sh
npm install
```

### Running the Backend Locally
To run the backend in development mode, use:
```sh
npm start
```
The backend will run at `http://localhost:5001`.

## Connecting to the Database
We use **MongoDB Compass** to connect to the MongoDB database for this project. Here’s how you can connect:

### Step 1: Install MongoDB Compass
If you don't have **MongoDB Compass** installed, you can download it from [the official MongoDB website](https://www.mongodb.com/products/compass).

### Step 2: Open MongoDB Compass
After installing MongoDB Compass, open the application.

### Step 3: Enter the Connection String
- Click on **"New Connection"**.
- In the **connection string field**, paste the following:
  ```
  mongodb+srv://demo:iJClKDvavYXaKrbV@cluster0.hb45y.mongodb.net/vehicle_dashboard
  ```
- Click **"Connect"**.

### Step 4: Explore the Database
- Once connected, you will see the **vehicle_dashboard** database listed on the left sidebar.
- You can explore the collections, view documents, and run queries to interact with the data.


## Docker Setup
This project uses Docker to create a containerized version of the Node.js backend.

### Build the Docker Image
Create a Docker image for your application:
```sh
docker build -t vehicle-backend .
```

### Run the Docker Container Locally
Run the container to test it locally:
```sh
docker run -p 5001:5001 vehicle-backend
```
The backend will be available at `http://localhost:5001`.

## Deployment to Google Cloud Run
To deploy this application to **Google Cloud Run**, follow these steps:

### Step 1: Tag and Push Docker Image to Google Container Registry
```sh
docker tag vehicle-backend gcr.io/[YOUR_PROJECT_ID]/vehicle-backend
docker push gcr.io/[YOUR_PROJECT_ID]/vehicle-backend
```

### Step 2: Deploy to Google Cloud Run
Deploy your Docker image to Google Cloud Run:
```sh
gcloud run deploy vehicle-backend-service \
  --image gcr.io/[YOUR_PROJECT_ID]/vehicle-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

Replace `[YOUR_PROJECT_ID]` with your Google Cloud Project ID.

## REST API
The backend provides the following REST API endpoints to manage vehicle data:

### GET /api/dashboard
- **Description**: Fetch the current dashboard data, including speed, power, battery level, and other metrics.
- **Response**: JSON object containing vehicle dashboard metrics.

### POST /api/dashboard/motor-speed
- **Description**: Update the motor speed value.
- **Request Body**:
  ```json
  {
    "speed": 3
  }
  ```
- **Response**: Status message indicating success or failure.

### POST /api/dashboard/charging
- **Description**: Toggle the charging state of the vehicle.
- **Request Body**:
  ```json
  {
    "charging": true
  }
  ```
- **Response**: Status message indicating success or failure.


## Environment Variables
The backend expects certain environment variables to be set for MongoDB integration:
- **MONGODB_URI**: Connection string for MongoDB.

You can set these environment variables using Google Cloud Run's **Variables & Secrets** tab.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database for storing vehicle data.
- **Docker**: Containerization.
- **Google Cloud Run**: Serverless container platform for deployment.

## Project Structure
```
vehicle-dashboard-backend/
  │── routes/      # API route handlers
  │── models/      # Database models
  │── server.js    # Entry point
  ├── Dockerfile       # Docker configuration
  ├── package.json     # Dependencies and scripts
  └── README.md        # Project documentation
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or new features.

## License
This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

## Contact
For questions or issues, please reach out via [GitHub Issues](https://github.com/your-username/vehicle-dashboard-backend/issues).

---

Feel free to customize the deployment steps or add additional project details if needed. Let me know if you need further assistance!

