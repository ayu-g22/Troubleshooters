# 🚗 DriveGuardian

**Reward Good Drivers. Reform the Roads. Respect the Rules.**

DriveGuardian is a smart, AI-powered platform that tracks and analyzes your driving behavior to generate a **Driving Credit Score (DCS)** – think CIBIL score, but for your on-road performance. Whether you're a responsible driver or a bit of a speed demon, your DCS reflects your discipline on the road.

---

## 🌐 Platform Overview

DriveGuardian is designed to promote safe driving habits in India by:

- Monitoring **driving behavior** in real-time
- Tracking **violations** via government challan databases
- Recording **speed, lane changes**, and driving patterns using mobile sensors
- Allowing **ownership transfer** to track the real driver behind the wheel
- Rewarding **safe drivers** with perks (future scope)

---

## 🧠 Problem Statement

India sees thousands of accidents every year due to reckless driving and lack of accountability. Current traffic systems don't actively encourage safe driving — they only punish poor behavior.

---

## 💡 Our Solution

We created DriveGuardian to build **awareness**, **accountability**, and **incentives** into the Indian driving experience. Using mobile data, backend logic, and real-time traffic violation APIs, we calculate a **DCS (Driving Credit Score)**. A high score means you're doing great, a low score means you gotta chill on those highways.

---

## 🔧 Tech Stack

| Layer        | Tech Used                      |
|--------------|--------------------------------|
| Frontend     | React.js + Tailwind CSS        |
| Backend      | Node.js + Express.js           |
| Database     | MongoDB                        |
| Mobile Data  | Device sensors (GPS, Gyro, etc.) |
| Integrations | Gov APIs (Challan DB), Firebase |
| AI Logic     | Scoring Algorithm, Future: ML  |

---

## 🔍 Features

- 📊 **Dashboard** with Driving Score and history
- 🧾 **Violation tracking** with challan sync
- 📱 **Real-time driving behavior tracking** using device sensors
- 👥 **Transfer Control** to switch drivers in shared vehicles
- 🏆 **Reward System** (coming soon!)
- 🛠️ Admin panel for analytics and user management

---

## 🔐 Role-Based Access

- **Driver Users**: Can view their own scores, history, and get tips
- **Admin Users**: Manage users, verify challans, monitor system health

---

## ⚙️ Installation (Local Setup)

```bash
# Clone the repo
git clone https://github.com/your-username/driveguardian.git
cd driveguardian

# Start backend
cd backend
npm install
npm run dev

# Start frontend
cd ../frontend
npm install
npm start
