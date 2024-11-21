StreamHUB API - ReactJS
A React-based project that fetches and displays YouTube's most popular videos categorized by user-selected preferences, using the YouTube Data API.
![Screenshot (104)](https://github.com/user-attachments/assets/a2892619-3631-4960-85bf-b3dd871d8998)
![Screenshot (105)](https://github.com/user-attachments/assets/a2e38412-4375-4c82-85f0-0cf854f9f7e6)

Features
Displays trending videos based on categories like Gaming, Music, Sports, etc.
Fetches data using the YouTube Data API v3.
Responsive design for seamless viewing across devices.
Dynamic content updates when categories change.
View counts and timestamps formatted for better readability.
Tech Stack
React: For building the UI components.
React Router: For navigating between pages.
YouTube Data API v3: To fetch video details.
Moment.js: For date formatting.
CSS: For styling components.
Setup Instructions
Prerequisites
Node.js installed on your machine.
A YouTube Data API key. Generate API Key.
Clone the Repository
git clone https://github.com/ARIHARAN-KC/streamHUB-API--reactjs.git
cd streamHUB-API--reactjs
Install Dependencies
npm install
Add API Key
Create a file in the src/data folder called data.js.
Add the following code to include your API key:
export const API_KEY = 'YOUR_YOUTUBE_API_KEY';
Run the Project
Start the development server:

npm run dev
Open your browser and navigate to http://localhost:5173 to view the project.

Project Structure
streamhub/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # React entry point
│   ├── Feed/             # Feed component for fetching and displaying videos
│   └── data/             # Contains API-related constants
├── .gitignore            # Files to be ignored by Git
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── vite.config.js        # Vite configuration
Deployment
You can deploy the project to platforms like Vercel or Netlify. Simply connect your repository and let the platform handle the rest.
