import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; // Added Link import
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import profile_icon from '../../assets/user_profile.jpg';
import axios from 'axios'; // If you are using Axios

const Navbar = ({ setSidebar }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls

  // API call to fetch search results
  const fetchSearchResults = async (query) => {
    if (!query) return; // Do not fetch if the query is empty
    setIsLoading(true); // Set loading state
    
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
    
    try {
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.items); // Update search results state
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false); // Set loading state to false after API call
    }
  };

  // Debounce function to delay API call
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500); // 500ms delay to wait after typing stops

    return () => clearTimeout(debounceTimeout); // Cleanup debounce timeout on change
  }, [searchQuery]);

  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={() => setSidebar(prev => !prev)} src={menu_icon} alt="Menu" />
            <Link to='/'><img className='logo' src={logo} alt="Logo" /></Link>
        </div>

        <div className="nav-middle flex-div">
            <div className="search-box flex-div">
                <input 
                  type="text" 
                  placeholder='Search' 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update query as user types
                />
                <img src={search_icon} alt="Search" />
            </div> 
            {isLoading && <div className="loading">Loading...</div>}
            <div className="search-results">
                {searchResults.length > 0 && !isLoading && (
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id.videoId}>
                                <Link to={`/video/${result.id.videoId}`}> {/* Link to video page */}
                                    <img 
                                      src={result.snippet.thumbnails.medium.url} 
                                      alt={result.snippet.title} 
                                    />
                                    <div className="result-info">
                                        <h5>{result.snippet.title}</h5>
                                        <p>{result.snippet.channelTitle}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

        <div className="nav-right flex-div">
            <img src={upload_icon} alt="Upload" />
            <img src={more_icon} alt="More" />
            <img src={notification_icon} alt="Notification" />
            <img src={profile_icon} className='user-icon' alt="User Profile" />
        </div>      
    </nav>
  );
};

export default Navbar;
