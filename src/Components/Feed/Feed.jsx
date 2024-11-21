import React, { useEffect, useState } from 'react'; // Added useState import
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../data';
import moment from 'moment'; // Import moment to format the date

const Feed = ({ category }) => {
  const [data, setData] = useState([]); // Added useState import above

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items || [])); // Prevent errors if items is undefined
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  // Helper function to format view count
  const valueConverter = (value) => {
    if (!value) return '0';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value;
  };

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`} // Fixed string interpolation here
            className="card"
            key={item.id || index}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{valueConverter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p> {/* Fixed moment usage */}
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
