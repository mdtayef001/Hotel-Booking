# HotelBooking - Modern Hotel Booking Platform

**Live Demo:** [Hotel Booking Live Demo](https://hotel-booking-19def.web.app/)

---

## **Project Overview**
HotelBooking is a modern **Hotel Booking Platform** designed to provide users with a seamless and engaging experience for discovering and booking hotel rooms. The platform includes features like user authentication, room booking, canceling bookings, and adding reviews. The backend is built with **Express.js**, **MongoDB**, and **JWT** for secure authentication.

---

## **Key Features**
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile).
- **User Authentication**: Log in and Sign up using JWT for secure authentication.
- **Room Booking**: Users can search for and book available rooms.
- **Cancel Booking**: Users can cancel their bookings.
- **Add Review**: Users can leave reviews for hotels they’ve stayed in.

---

## **Technologies Used**

### **Frontend**
- **React.js**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **DaisyUI**: Tailwind CSS component library for pre-built UI components.
- **Axios**: For making HTTP requests to the backend.
- **React Helmet**: For managing document head tags.
- **React Leaflet**: For interactive maps.
- **React Day Picker**: For date selection.
- **SweetAlert2**: For beautiful and customizable alerts.

### **Backend**
- **Express.js**: Backend framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data (e.g., users, hotels, bookings).
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Firebase**: For frontend authentication and hosting.

---

## Installation & Setup (Local Testing)

### Prerequisites

- Node.js (Latest Version Recommended)
- MongoDB (Local or Cloud Instance)

### Clone Repository

```sh
  https://github.com/mdtayef001/Hotel-Booking.git
  cd Hotel-Booking
```

### Frontend Setup

1. Install dependencies:
   ```sh
   cd client
   npm install
   ```
2. Create a `.env` file and add the required environment variables:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```
3. Run the frontend:
   ```sh
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   PORT=5000
   JWT_SECRET=your_secret_key
   DB_USER=your_mongodb_user_name
   DB_PASS=your_mongodb_password
   ```
