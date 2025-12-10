# 🌾 Smart Dharani - AI-Powered Farming Assistant

**Smart Dharani** is a modern web application that helps farmers make better decisions using artificial intelligence. It provides crop recommendations, disease diagnosis, marketplace features, and expert farming guidance - all in one place.

![Smart Dharani](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Explained](#-key-features-explained)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🌱 **AI-Powered Crop Recommendations**
- Get personalized crop suggestions based on your location, soil type, and season
- Powered by Google's Gemini AI
- Supports multiple languages (English, Hindi, Telugu)

### 🔍 **Crop Disease Diagnosis**
- Upload photos of affected crops
- Get instant AI-powered diagnosis
- Receive treatment recommendations and product suggestions
- Text-based symptom analysis also available

### 🛒 **Farmer's Marketplace**
- Buy and sell agricultural products directly
- List your produce with photos and prices
- Contact sellers through built-in inquiry system
- Filter products by crop type, price, and location

### 💬 **Smart Chatbot (Dharani AI)**
- 24/7 farming assistant
- Ask questions about crops, weather, pests, and more
- Get instant answers in your preferred language

### 📚 **Farming Guides**
- Access comprehensive farming guides
- Learn best practices for different crops
- Seasonal farming tips and techniques

### 👤 **User Profiles**
- Create and manage your farmer profile
- Track your marketplace listings
- Save your preferences

### 🌙 **Dark Mode**
- Easy on the eyes with dark theme
- Automatically detects system preference
- Toggle anytime with one click

### ♿ **Accessibility First**
- Fully keyboard navigable
- Screen reader friendly
- WCAG AA compliant
- Touch-friendly on mobile devices

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home.png)

### Crop Recommendations
![Crop Recommendations](./screenshots/crop-selection.png)

### Disease Diagnosis
![Disease Diagnosis](./screenshots/diagnosis.png)

### Marketplace
![Marketplace](./screenshots/marketplace.png)

---

## 🛠 Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router** - Navigation
- **Axios** - HTTP requests
- **Vite** - Build tool
- **CSS3** - Styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

### AI & APIs
- **Google Gemini AI** - Crop recommendations and diagnosis
- **Socket.io** - Real-time chat

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:
- **Node.js** (v16 or higher)
- **MySQL** (v8 or higher)
- **Git**
- **Google Gemini API Key**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/JakkalaRamu2005/smartDharani.git
cd smartDharani
```

2. **Set up the Backend**
```bash
cd backend
npm install
```

3. **Create `.env` file in backend folder**
```env
PORT=9291
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=smartdharani
JWT_SECRET=your_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

4. **Set up the Database**
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE smartdharani;

# Import the schema (if you have a SQL file)
mysql -u root -p smartdharani < database.sql
```

5. **Set up the Frontend**
```bash
cd ../dharni-frotend
npm install
```

6. **Start the Application**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd dharni-frotend
npm run dev
```

7. **Open in Browser**
```
http://localhost:5173
```

---

## 📁 Project Structure

```
smartDharani/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── authController.js     # Login/Register
│   │   ├── cropController.js     # Crop recommendations
│   │   ├── diagnosisController.js # Disease diagnosis
│   │   ├── marketplaceController.js # Marketplace
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cropRoutes.js
│   │   └── ...
│   ├── .env                      # Environment variables
│   ├── server.js                 # Main server file
│   └── package.json
│
├── dharni-frotend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home/             # Home page
│   │   │   ├── Login/            # Login page
│   │   │   ├── CropSelection/    # Crop recommendations
│   │   │   ├── IssueDiagnosis/   # Disease diagnosis
│   │   │   ├── Marketplace/      # Marketplace
│   │   │   ├── Chatbot/          # AI chatbot
│   │   │   ├── utils/            # Reusable components
│   │   │   └── context/          # React contexts
│   │   ├── styles/
│   │   │   ├── variables.css     # CSS variables
│   │   │   ├── utilities.css     # Utility classes
│   │   │   ├── animations.css    # Animations
│   │   │   └── darkmode.css      # Dark theme
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── App.css               # Global styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🎯 Key Features Explained

### 1. **Crop Recommendations**

How it works:
1. Enter your location, soil type, and farming details
2. AI analyzes your inputs
3. Get personalized crop suggestions with:
   - Best crops for your conditions
   - Expected yield
   - Market prices
   - Farming tips

### 2. **Disease Diagnosis**

How it works:
1. Upload a photo of the affected crop (optional)
2. Select crop type and describe symptoms
3. AI analyzes the image and symptoms
4. Get:
   - Disease identification
   - Severity assessment
   - Treatment steps
   - Product recommendations

### 3. **Marketplace**

Features:
- **Browse Products** - View all available products
- **Filter & Search** - Find exactly what you need
- **Add Listings** - Sell your own produce
- **Contact Sellers** - Send inquiries directly
- **Manage Listings** - Edit or delete your products

### 4. **Smart Chatbot**

Capabilities:
- Answer farming questions
- Provide weather information
- Suggest pest control methods
- Offer crop care advice
- Available 24/7

---

## 🔌 API Documentation

### Authentication

**Register**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Farmer",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Crop Recommendations

```http
POST /api/crop/recommend
Authorization: Bearer <token>
Content-Type: application/json

{
  "location": "Warangal, Telangana",
  "soilType": "Clay",
  "irrigationType": "Drip",
  "farmSize": "5 acres",
  "language": "english"
}
```

### Disease Diagnosis

```http
POST /api/diagnosis/diagnose
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "cropType": "Rice",
  "symptoms": "Yellow leaves",
  "image": <file>,
  "language": "english"
}
```

### Marketplace

**Get All Listings**
```http
GET /api/marketplace/listings
Authorization: Bearer <token>
```

**Create Listing**
```http
POST /api/marketplace/listings
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "productName": "Fresh Tomatoes",
  "cropType": "Vegetables",
  "quantity": "100 kg",
  "price": "50",
  "location": "Hyderabad",
  "description": "Organic tomatoes",
  "image": <file>
}
```

---

## 🎨 UI/UX Features

### Design System
- **Fluid Typography** - Text scales perfectly on all devices
- **8px Spacing System** - Consistent spacing throughout
- **Color Palette** - Carefully chosen colors for agriculture theme
- **Dark Mode** - Easy on the eyes

### Accessibility
- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ Screen reader support
- ✅ ARIA labels on all interactive elements
- ✅ High contrast colors (WCAG AA)
- ✅ Touch-friendly buttons (44px minimum)
- ✅ Skip navigation links

### Mobile Responsive
- ✅ Hamburger menu on mobile
- ✅ Touch-friendly interface
- ✅ Optimized layouts for small screens
- ✅ Fast loading on slow connections

### Animations
- ✅ Smooth page transitions
- ✅ Button hover effects
- ✅ Loading spinners
- ✅ Success animations
- ✅ Respects reduced motion preference

---

## 🔐 Security Features

- **Password Hashing** - Using bcrypt
- **JWT Authentication** - Secure token-based auth
- **HTTP-only Cookies** - Protection against XSS
- **CORS Protection** - Controlled cross-origin requests
- **Input Validation** - Prevents SQL injection
- **Rate Limiting** - API protection (planned)

---

## 🌐 Environment Variables

### Backend (.env)
```env
# Server
PORT=9291

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smartdharani

# Authentication
JWT_SECRET=your_secret_key

# AI
GEMINI_API_KEY=your_gemini_api_key

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Write clear commit messages
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 🐛 Known Issues

- [ ] Image upload size limit needs optimization
- [ ] Marketplace search could be faster
- [ ] Mobile chatbot positioning needs adjustment

---

## 🗺 Roadmap

### Version 2.0 (Planned)
- [ ] Weather integration
- [ ] Soil testing recommendations
- [ ] Government scheme information
- [ ] Multi-language support expansion
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Push notifications
- [ ] Advanced analytics dashboard

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Developer:** Jakkala Ramu  
**GitHub:** [@JakkalaRamu2005](https://github.com/JakkalaRamu2005)  
**Email:** your.email@example.com

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powering our AI features
- **React Community** - For amazing tools and libraries
- **Farmers** - For their valuable feedback and suggestions

---

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@smartdharani.com
- 🐛 Issues: [GitHub Issues](https://github.com/JakkalaRamu2005/smartDharani/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/JakkalaRamu2005/smartDharani/discussions)

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ for Farmers**

🌾 Happy Farming! 🌾
