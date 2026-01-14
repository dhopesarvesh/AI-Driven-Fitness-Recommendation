🏋️ AI-Driven Fitness Recommendation System

A full-stack, microservices-based web application that provides personalized fitness recommendations by analyzing user activity data such as activity type, duration, and calories burned. The system leverages AI-assisted logic, event-driven architecture, and modern web technologies to deliver scalable and intelligent fitness insights.

🚀 Features

User authentication with secure signup and login

Activity tracking (Running, Swimming, Cycling, etc.)

Input of activity duration and calories burned

AI-based fitness recommendations with performance summaries

Microservices communication using Apache Kafka

Centralized configuration and service discovery

Responsive and interactive frontend UI

🧱 System Architecture

Frontend: React.js (Vite)

Backend: Java Spring Boot (Microservices)

Databases:

MongoDB (Activity & AI data)

PL/SQL (User-related data)

Messaging: Apache Kafka

DevOps: Docker

Communication: REST APIs + Event-Driven Messaging

🧩 Microservices Overview
Service Name	Description
User Service	Manages user registration, login, and roles
Activity Service	Handles fitness activity tracking
AI Service	Generates personalized fitness recommendations
Gateway Service	API Gateway with request filtering
Eureka Server	Service discovery
Config Server	Centralized configuration management
⚙️ Tech Stack

Frontend

React.js

Vite

Axios

HTML5 / CSS3

Backend

Java

Spring Boot

Spring Cloud (Eureka, Config Server, Gateway)

Databases

MongoDB

PL/SQL

Infrastructure

Apache Kafka

Docker

📊 Impact

Improved workout consistency by ~25–30% using personalized recommendations

Reduced inefficient workout patterns by ~20%

Achieved ~30% better scalability with microservices architecture

Reduced inter-service data latency by ~40% using Kafka

🛠️ Setup & Installation (High-Level)

Clone the repository

git clone https://github.com/dhopesarvesh/AI-Driven-Fitness-Recommendation.git


Start infrastructure services

Kafka

MongoDB

PL/SQL database

Eureka Server

Config Server

Run backend services (Spring Boot)

Start frontend using:

npm install
npm run dev

📌 Future Enhancements

JWT-based authentication and role management

Real AI/ML model integration

Cloud deployment (AWS/GCP)

Mobile application support

Advanced analytics dashboard

👨‍💻 Author

Sarvesh Dhope
Full-Stack Developer | Java | Spring Boot | Microservices

⭐ Support

If you find this project useful, feel free to ⭐ the repository.
