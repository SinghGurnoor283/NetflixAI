# 🎬 NetflixAI – AI-Powered Movie Recommendation Web App

**NetflixAI** is a responsive, Netflix-inspired web application that leverages the power of AI to suggest personalized movie recommendations based on natural language queries. Just type what you're in the mood to watch, and NetflixAI returns a curated list of relevant movies — no filters, no scrolling, just smart suggestions.

## 🚀 Live Demo

👉 [View NetflixAI Live] (https://netflixai.vercel.app)
Advisory -- Depending on your geographic location, access to certain Firebase Authentication services or Google AI APIs may occasionally be restricted. If you encounter issues during sign-in or when generating recommendations, using a trusted VPN can help bypass these limitations. This ensures uninterrupted access to all features and improves the overall experience of using NetflixAI.

---

## 🌟 Features

- 🎯 **AI-Powered Recommendations**  
  Get movie suggestions by typing queries like `action movies from the 90s` or `something like Inception`.

- 🎥 **Netflix-Inspired UI**  
  Clean, intuitive, and mobile-friendly interface inspired by Netflix, built with Tailwind CSS.

- 🌐 **Multilingual Support**  
  Supports dynamic language switching using Redux and language constants.

- 🔐 **Firebase Authentication**  
  Secure login functionality using Firebase, with support for email/password and OAuth providers.

- ⚡ **Debounced Search**  
  Optimized input with Lodash debounce to reduce unnecessary AI API calls.

- 📲 **Fully Responsive Design**  
  Works seamlessly on desktop, tablet, and mobile devices.

---

## 🛠 Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, JavaScript
- **Authentication:** Firebase Authentication
- **AI Integration:** Google Generative AI (Gemini Pro)
- **Utilities:** Lodash (debounce), useRef, useCallback
- **Deployment:** [Vercel]

---

## 📦 Installation

```bash
git clone https://github.com/your-username/netflixai.git
cd netflixai
npm install
npm start
