# 💼 Smart Job Portal

A **Full Stack Job Portal** developed using **Spring Boot**, **React.js**, **MySQL**, and **JWT Authentication**.

This application enables job seekers to browse and apply for jobs while allowing administrators to manage job postings, applications, and applicants through a secure dashboard.

---

# 🚀 Features

## 👤 User Module

- User Registration
- User Login (JWT Authentication)
- Browse Available Jobs
- View Job Details
- Apply for Jobs
- Upload Resume (PDF/DOC/DOCX)
- View My Applications
- Logout

---

## 👨‍💼 Admin Module

- Admin Login
- Dashboard with Statistics
- Add New Job
- Edit Existing Job
- Delete Job
- View Applicants
- Download Applicant Resume
- Accept / Reject Applications
- Logout

---

# 🔐 Security Features

- JWT Authentication
- Spring Security
- Role-Based Authorization
- BCrypt Password Encryption
- Protected REST APIs

---

# 🎨 Frontend Features

- Responsive UI using Bootstrap 5
- React Router
- Axios API Integration
- React Toastify Notifications
- SweetAlert2 Confirmation Dialogs
- Loading Spinner
- Professional Dashboard

---

# 🛠 Tech Stack

## Frontend

- React.js
- Bootstrap 5
- Axios
- React Router DOM
- React Toastify
- SweetAlert2

## Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven

## Database

- MySQL

## Tools

- IntelliJ IDEA / VS Code
- Postman
- MySQL Workbench
- Git & GitHub

---

# 📂 Project Structure

```
Smart-Job-Portal
│
├── backend
│   ├── src
│   ├── uploads
│   ├── pom.xml
│   └── ...
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── README.md
│
├── README-Images
│   ├── home.png
│   ├── login.png
│   ├── register.png
│   ├── jobs.png
│   ├── job-details.png
│   ├── my-applications.png
│   ├── admin-dashboard.png
│   ├── add-job.png
│   ├── edit-job.png
│   ├── applicants.png
│
└── .gitignore
```

---

# 📸 Application Screenshots

## 🏠 Home Page

![Home](README-Images/home.png)

---

## 🔐 Login Page

![Login](README-Images/login.png)

---

## 📝 Register Page

![Register](README-Images/register.png)

---

## 💼 Jobs Page

![Jobs](README-Images/jobs.png)

---

## 📄 Job Details

![Job Details](README-Images/job-details.png)

---

## 📋 My Applications

![My Applications](README-Images/my-applications.png)

---

## 👨‍💼 Admin Dashboard

![Admin Dashboard](README-Images/admin-dashboard.png)

---

## ➕ Add Job

![Add Job](README-Images/add-job.png)

---

## ✏️ Edit Job

![Edit Job](README-Images/edit-job.png)

---

## 👥 View Applicants

![Applicants](README-Images/applicants.png)

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/smart-job-portal.git
```

---

## Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🗄 Database Setup

Create a MySQL database:

```sql
CREATE DATABASE smart_job_portal;
```

Update the database configuration in:

```
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/smart_job_portal
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
```

---

# 🔑 Default Roles

### Admin

Create an admin user in the database or register one and update its role to:

```
ADMIN
```

### User

Normal registered users automatically get:

```
USER
```

---

# 📌 Sample Jobs

- Java Full Stack Developer — Infosys
- React Developer — TCS
- Python Developer — Wipro
- DevOps Engineer — Accenture
- Data Analyst — Capgemini
- Software Engineer — Cognizant

---

# 🔗 REST APIs

## Authentication

- Register User
- Login User

## Jobs

- Get All Jobs
- Get Job By ID
- Add Job
- Update Job
- Delete Job

## Applications

- Apply for Job
- View My Applications
- View Applicants
- Update Application Status
- Download Resume

---

# 🚀 Future Enhancements

- Email Notifications
- Company Profiles
- Saved Jobs
- Interview Scheduling
- Advanced Job Search
- Pagination
- Profile Picture Upload
- Resume Builder
- AI Job Recommendations

---

# 👨‍💻 Developed By

**Mansi Bhole**

Bachelor of Technology (Computer Engineering)

Full Stack Java Developer

---

# ⭐ If you like this project

Give this repository a ⭐ on GitHub.

---