import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY } from '../../data';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  // Fetch data for recommended videos
  const fetchData = async () => {
    const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(relatedVideoUrl);
      const data = await response.json();
      setApiData(data.items); // Set the fetched video items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when component mounts or categoryId changes
  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {/* Render the list of videos */}
      {apiData.map((item, index) => (
        <div key={index} className="side-video-list">
          {/* Dynamically use the thumbnail URL from the API */}
          <img
            src={item.snippet.thumbnails.medium.url} // Fetch the thumbnail dynamically from the API
            alt={item.snippet.title}
          />
          <div className="vid-info">
            {/* Dynamically use the video title, channel name, and view count */}
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{item.statistics.viewCount} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
