# StreamHUB API - ReactJS

A React-based project that fetches and displays YouTube's most popular videos categorized by user-selected preferences using the YouTube Data API.

---

## Features

- **Trending Videos**: Displays trending videos based on categories like Gaming, Music, Sports, etc.
- **YouTube API Integration**: Fetches data using the YouTube Data API v3.
- **Responsive Design**: Seamless viewing experience across devices.
- **Dynamic Content**: Automatically updates content when categories are changed.
- **View Count & Timestamps**: Readable formatting for video views and timestamps.

---

## Tech Stack

- **React**: For building the UI components.
- **React Router**: For page navigation.
- **YouTube Data API v3**: To fetch video details.
- **Moment.js**: For date formatting.
- **CSS**: To style components effectively.

---

## Setup Instructions

### Prerequisites

1. Install [Node.js](https://nodejs.org/).
2. Obtain a YouTube Data API key. Follow the guide to [Generate API Key](https://developers.google.com/youtube/registering_an_application).

---

### Clone the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/ARIHARAN-KC/streamHUB-API--reactjs.git
   ```
2. Navigate into the project directory:
   ```bash
   cd streamHUB-API--reactjs
   ```

---

### Install Dependencies

Install all necessary dependencies using npm:
```bash
npm install
```

---

### Add Your API Key

1. Navigate to the `src/data` folder.
2. Create a file named `data.js`.
3. Add the following code, replacing `YOUR_YOUTUBE_API_KEY` with your actual API key:
   ```javascript
   export const API_KEY = 'YOUR_YOUTUBE_API_KEY';
   ```

---

### Run the Project

Start the development server:
```bash
npm run dev
```

Open your browser and visit [http://localhost:5173](http://localhost:5173) to explore the project.

---

## Project Structure

```plaintext
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
```

---

## Deployment

You can deploy the project to platforms like **Vercel** or **Netlify**. 

1. Connect your repository to the platform.
2. Let the platform automatically build and deploy your project.

---

## Screenshots

![Screenshot 1](https://github.com/user-attachments/assets/a2892619-3631-4960-85bf-b3dd871d8998)
![Screenshot 2](https://github.com/user-attachments/assets/a2e38412-4375-4c82-85f0-0cf854f9f7e6)

--- 
