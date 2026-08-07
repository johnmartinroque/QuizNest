# 🧠 QuizNest [Website Link](https://emerg-tech.vercel.app)



## 🎮 How to Play

1. Enter a topic prompt — QuizNest will generate a quiz based on your chosen topic.
2. Answer the questions and submit to instantly see your score.
3. Browse quizzes created from other users’ prompts and try them out.
4. Track your progress in your profile, including quiz history, streaks, and performance stats.

## Tech Stack

- **Frontend:** React, React Router
- **Database:** Firebase
- **State Management:** In-memory per lobby
- **AI:** Google Generative AI (Gemini) for quiz generation


## 🏃 How to Run
### Installation
1️⃣ Clone the repository
```bash
git clone https://github.com/johnmartinroque/QuizNest.git
cd QuizNest
```

2️⃣ Install dependencies
```bash
npm install

#Frontend (React app)
cd ../frontend
npm install
```

3️⃣ Configure environment variables
```bash
#Create a .env file inside the /frontend directory:

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```


4️⃣ Run the App Locally
```bash
npm start
```


