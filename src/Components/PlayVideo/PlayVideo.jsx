import React, { useEffect, useState } from 'react'; // Fixed the missing useState import
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png'; // Assuming this is a default image
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY } from '../../data';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null); // Fixed the useState typo
  const [comments, setComments] = useState([]); // Added state for comments
  const [subscriberCount, setSubscriberCount] = useState(null); // State for subscriber count
  const [totalComments, setTotalComments] = useState(0); // State for total comments count
  const [channelLogo, setChannelLogo] = useState(null); // State for channel logo

  const fetchVideoData = async () => {
    // fetching video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(videoDetails_url);
    const data = await response.json();
    setApiData(data.items[0]);
  };

  const fetchCommentsData = async () => {
    // fetching comments data
    const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
    const response = await fetch(comments_url);
    const data = await response.json();
    setComments(data.items);
    setTotalComments(data.pageInfo.totalResults); // Get total number of comments
  };

  const fetchChannelData = async () => {
    // fetching channel data to get subscriber count and channel logo
    const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const response = await fetch(channelDetails_url);
    const data = await response.json();
    const subscriberCount = data.items[0].statistics.subscriberCount;
    const channelLogoUrl = data.items[0].snippet.thumbnails.default.url; // Channel logo URL
    setSubscriberCount(formatNumber(subscriberCount)); // Format subscriber count
    setChannelLogo(channelLogoUrl); // Set channel logo
  };

  const formatNumber = (num) => {
    // Format large numbers for readability
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // Format in millions
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'; // Format in thousands
    } else {
      return num; // Return the number as is for smaller values
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
      fetchCommentsData();
    }
  }, [videoId]); // Fetch video and comments data when the videoId changes

  useEffect(() => {
    if (apiData) {
      fetchChannelData(); // Fetch channel data once video data is available
    }
  }, [apiData]);

  if (!apiData) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData.snippet.title}</h3> {/* Video Title */}

      <div className="play-video-info">
        <p>
          {apiData.statistics.viewCount} Views &bull;{" "}
          {new Date(apiData.snippet.publishedAt).toLocaleDateString()}
        </p>
        <div>
          <span>
            <img src={like} alt="like" /> {apiData.statistics.likeCount}
          </span>
          <span>
            <img src={dislike} alt="dislike" /> {apiData.statistics.dislikeCount || 0}
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        {channelLogo ? (
          <img src={channelLogo} alt="channel logo" /> // Displaying channel logo
        ) : (
          <img src={jack} alt="default publisher" /> // Fallback image if no channel logo
        )}
        <div>
          <p>{apiData.snippet.channelTitle}</p>
          {/*span>{apiData.snippet.channelId}</span>*/}
          <p1>{subscriberCount ? `${subscriberCount} subscribers` : 'Loading subscriber count...'}</p1> {/* Display subscriber count */}
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>{apiData.snippet.description.slice(0, 250)}...</p>
        <hr />

        <h4>{totalComments} comments</h4> {/* Display total comments count */}

        {/* Render comments dynamically */}
        {comments.map((commentItem, index) => (
          <div className="comment" key={index}>
            <img
              src={commentItem.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile}
              alt={`user_profile_${index}`}
            />
            <div>
              <h3>
                {commentItem.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                <span>{new Date(commentItem.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString()}</span>
              </h3>
              <p>{commentItem.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>{commentItem.snippet.topLevelComment.snippet.likeCount}</span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
