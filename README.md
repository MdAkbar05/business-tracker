# 📊 Business Tracker App

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green?logo=prisma)
![Postgres](https://img.shields.io/badge/Postgres-15-blue?logo=postgresql)

---

## 🚀 Overview
**Business Tracker App** is a modern and user-friendly financial management application that helps individuals and businesses track **costs, savings, additional savings, and net revenue** with ease.  
Built with **Next.js 15, React 19, TailwindCSS, Prisma, and PostgreSQL**, it ensures **secure account handling** and an intuitive interface.

---

## ✨ Features
- 📌 **Business Tracker application**
- 🎨 **User-friendly interface**
- 🔐 **Simplify account login & register**
- 🔑 **Password recovery (forget password flow)**
- 🗄 **User information stored securely in PostgreSQL with password encryption**
- 🛡 **Secure & safe user accounts**
- 📂 **Data managed in separate tables (Accounts, Costs, Savings, Additional Savings)**
- 💰 **Track costs, savings, and additional savings**
- 📊 **View net revenue calculations automatically**

---

## 🛠 Tech Stack
**Frontend:**
- ⚛️ Next.js 15 (with React 19)
- 🎨 Tailwind CSS

**Backend:**
- 🌐 Next.js Server Routes (API handling with professional structure)

**Database:**
- 🗄 PostgreSQL with Prisma ORM

---

## 📸 Screenshots

### 🔐 Authentication Pages
![Login Page](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/login.png)
![Register Page](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/register.png)

---

### 📊 Dashboard
![Dashboard Overview](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/Dashboar-loading.png)
![Dashboard Overview](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/Main-Dashboard.png)

---

### 💰 Account Management
![Account List](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/multi-account-management.png)
![Add Account](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/account-management.png)

---

### 📂 Costs, Savings & Additional Savings
![Track Costs, Savings, Additional Savings](https://raw.githubusercontent.com/MdAkbar05/business-tracker/refs/heads/main/presentation/track-cost-save-additional.png)





## 🏗️ Feature Implementation

### 1. User Authentication & Security
- Use bcrypt for password hashing before storing in PostgreSQL.
- Add JWT or session-based authentication for secure user sessions.
- Enable password recovery via email (forget password flow).

### 2. Account Management
- Allow users edit cost, save or extra of accounts.

### 4. Dashboard & Net Revenue Calculation
- Visualize data with charts (e.g., using Chart.js or Recharts).

### 6. Data Security & Integrity
- Validate all user input on both frontend and backend.

### 7. Future Features
- Add multi-user support for teams/businesses.
- Export data to CSV or PDF.
- Integrate notifications for important account changes.
