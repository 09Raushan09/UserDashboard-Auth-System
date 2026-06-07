# 🚀 Premium User Dashboard & Auth System

A high-performance Full-Stack MERN (MongoDB, Express, React, Node.js) application designed for secure user management. This project features JWT-based authentication, cloud-integrated media handling, and a professional-grade responsive UI.

---

## 🏗 System Architecture

This system follows a clean **MVC (Model-View-Controller)** pattern on the backend, ensuring maintainability and scalability, paired with a **Component-Based Architecture** on the frontend for optimized state management.

---

## 🔑 Key Features

- **Secure Authentication:** Password hashing using `Bcryptjs` to ensure data security; stateless JWT-based session management for protected access.
- **Media Pipeline:** Automated image upload to `Cloudinary` with temporary local storage management handled by `Multer`.
- **Protected Routes:** Middleware-driven authorization ensuring that sensitive dashboard data is only accessible to authenticated users.
- **Premium UI/UX:** A mobile-first, responsive design built with Tailwind CSS, utilizing modern animations and a clean professional aesthetic.

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Lucide Icons, React Router.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Mongoose).
- **Security & Storage:** Cloudinary API, JSON Web Tokens (JWT), Bcryptjs.

---

## 💡 Technical Challenges & Solutions

### 1. Robust Password Hashing

- **Problem:** Implementing hashing within Mongoose middleware caused asynchronous context conflicts in specific Node environments.
- **Solution:** Refactored the authentication logic by moving the hashing process directly into the controller, which improved predictability and removed reliance on complex middleware hooks.

### 2. File Processing Lifecycle

- **Problem:** Managing multipart form data (images) requires temporary local storage before cloud transfer.
- **Solution:** Configured `Multer` with a `public/temp` directory. Integrated a cleanup utility using Node’s `fs` module to purge temporary files immediately after a successful upload to Cloudinary, ensuring storage optimization.

### 3. Authentication Persistence

- **Problem:** Maintaining authentication state across browser page refreshes.
- **Solution:** Implemented a robust `useEffect` hook in the `Dashboard` component that validates the JWT stored in `localStorage` against a secure `/me` backend API endpoint.

---

## 📈 Development Roadmap

| Phase       | Milestone       | Focus                                                                   |
| :---------- | :-------------- | :---------------------------------------------------------------------- |
| **Phase 1** | **Foundation**  | Server scaffolding, Database connectivity, and Environment setup.       |
| **Phase 2** | **Core Auth**   | JWT implementation, Password security, and User Model design.           |
| **Phase 3** | **Cloud Logic** | Media pipeline setup (Multer + Cloudinary SDK integration).             |
| **Phase 4** | **Frontend UI** | Premium component development, State management, and Responsive design. |

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```
### 2. Environment Configuration

- Create .env files in both Frontend and Backend directories with the following keys: 

---

For Backend (/Backend/.env): 
-MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- CLOUDINARY_CLOUD_NAME=your_name
- CLOUDINARY_API_KEY=your_key
- CLOUDINARY_API_SECRET=your_secret
- PORT=your_choice_port

---

 For Frontend (/Frontend/.env):
- VITE_BACKEND_URL=http://localhost:your_choice_port

### 3. Install & Run

- Backend: 
```bash
cd Backend && npm install && npm run dev
``` 

- Frontend: 
```bash
cd Frontend && npm install && npm run dev
```

## 👨‍💻 Author
**Raushan Kumar**
