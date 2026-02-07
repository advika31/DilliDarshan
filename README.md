# 🏛️ DilliDarshan

**DilliDarshan** is an AI-powered, local-first tourism companion for Delhi that helps visitors make **real-time, context-aware decisions** while navigating the city.
Instead of static listings and generic maps, DilliDarshan acts like a **living local guide**—adapting to time, location, crowd levels, accessibility needs, and user intent.

> *Google Maps shows you roads. DilliDarshan shows you the city.*

This project was built as part of the **Delhi AI Grind – Tourism, Culture & Food Systems Challenge**.

---

## 🌆 Problem Context

Delhi’s tourism ecosystem suffers from:

* Fragmented and static information
* No real-time, on-ground decision support
* Overcrowding at iconic monuments
* Under-visibility of nearby heritage and cultural spaces
* Lack of last-mile transport clarity
* Minimal representation of local voices and cultural communities

DilliDarshan addresses this by combining **deterministic logic + AI-driven reasoning** to guide users *in the moment*, not just before travel.

---

## ✨ Key Features

### 🤖 AI Travel Chatbot (Core Feature)

* WhatsApp-style conversational interface
* Handles natural queries like:

  > *“I’m near Connaught Place, it’s hot, and I have 2 hours — what should I do?”*
* Context-aware responses using:

  * Time of day
  * Location
  * Venue hours
  * Distance & feasibility
* Provides **clear next actions**, not vague advice

---

### 🧭 Personalized Recommendations

* Based on user preferences collected during onboarding:

  * Time availability
  * Interests (history, food, culture)
  * Crowd preference
  * Language
  * Accessibility needs
* Preferences are stored locally (no login required)

---

### 🏛️ Monument & Place Details

Each place acts as a **trusted on-ground utility hub**, including:

* Best time to visit
* Opening hours & entry fee
* Ticket booking redirect
* Nearest metro & last-mile guidance
* Public toilets & accessibility notes
* Crowd level indicators
* Smart nudges to nearby alternatives when crowded

---

### 📖 AI Storytelling (Gamified & Unlockable)

* Cultural stories in:

  * Quick (30s)
  * Immersive (2–3 min) formats
* Locked by default
* Unlocked through **Heritage Points**, not payments
* Encourages engagement and cultural learning

---

### ⭐ Heritage Points System

Users earn points by:

* Asking chatbot queries (+5)
* Viewing place details (+5)
* Contributing local knowledge (+10)

Points unlock:

* Premium storytelling
* Deeper cultural narratives

All points are stored locally.

---

### 🚇 Local Transport & Utilities

* Metro exit guidance
* Walking distances & time
* Auto / e-rickshaw fare ranges
* Shared auto route awareness
* Toilets and comfort infrastructure

---

### 🍽️ Food & Mood-Based Recommendations

* Suggestions based on:

  * Time of day
  * Mood (chill, energetic, street food)
  * Budget (₹ / ₹₹ / ₹₹₹)
* Explains *why* a place fits the current moment

---

### 🎭 Events & Cultural Discovery

* Discover:

  * Heritage walks
  * Exhibitions
  * Performances
  * Festivals
* Filtered by:

  * Location
  * Time
  * Accessibility
* All data is mocked in the current prototype

---

### 🤝 Community Contributions

* Users can:

  * Add local tips
  * Update transport info
  * Review places
  * Share cultural insights
* Contributions improve system quality and unlock rewards

---

### 🏙️ Admin / Government Dashboard (Mock)

* Read-only analytics view
* Demonstrates policy and planning value:

  * Footfall trends
  * Peak hours
  * Under-visited zones
  * User satisfaction signals

---

## 🛠️ Tech Stack

* **Expo** (~51.x)
* **React Native**
* **React Navigation** (Stack + Bottom Tabs)
* **AsyncStorage** – local persistence
* **@expo/vector-icons** – iconography
* **StyleSheet (react-native)** – no Tailwind, no CSS frameworks

> ⚠️ This is a **frontend-first prototype**.
> No backend, APIs, authentication, or payments are implemented.

---

## 🚀 Installation & Running Locally

### Frontend (React Native/Expo)

#### 1. Install dependencies
```bash
npm install
```

#### 2. Start Expo development server
```bash
npx expo start
```

#### 3. Run the app
* Press `i` → iOS Simulator
* Press `a` → Android Emulator
* Or scan QR with **Expo Go** on a physical device

---

### Backend (Choose one)

#### Option 1: Python FastAPI Backend (Recommended)
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

#### Option 2: Node.js Backend
```bash
# Navigate to Node.js backend directory  
cd DilliDarshan_backend

# Install dependencies
npm install

# Start the server
npm run dev
```

#### Quick Start (Python Backend)
```bash
# Use the provided startup script
./start_backend.sh
```

---

### Running Full App
1. Start the backend first (runs on port 8000 or 3000)
2. Start the frontend (runs on port 8081)
3. Both services must run simultaneously for full functionality

---

## 🔮 Future Scope

* AI-based crowd prediction
* Crowdsourced gate & utility accuracy
* Accessibility-first routing
* Multilingual voice-based guidance
* City-by-city expansion
* Integration with tourism boards
* Anonymized data insights for city planning

---

## 📄 License

MIT License
