import React from "react";
import "./VideoCard.css";
import { Link } from "react-router-dom";
import dateFormatter from "../../util/dateFormatter";
import numberFormatter from "../../util/numberFormatter";

export default function VideoCard({
  videoId,
  videoTitle,
  videoThumbnail,
  channelTitle,
  likeCount,
  dislikeCount,
  viewCount,
  publishedAt
}) {
  return (
    <div className="VideoCard--container">
      <Link to={`/watch?v=${videoId}`}>
        <img src={videoThumbnail} alt="thumbnail" />
      </Link>
      <p className="subtitle2">{videoTitle}</p>
      <div className="videoCard--bottom">
        <p className="text1">{channelTitle}</p>
        <div className="videoCard--stats">
          <div className="iconText xs">
            <i className="fas fa-thumbs-up" />
            <p className="text2">{numberFormatter(likeCount)}</p>
          </div>
          <div className="iconText xs">
            <i className="fas fa-thumbs-down" />
            <p className="text2">{numberFormatter(dislikeCount)}</p>
          </div>
          <div className="iconText xs">
            <i className="fas fa-eye" />
            <p className="text2">{numberFormatter(viewCount)}</p>
          </div>
          <div className="iconText xs">
            <i className="fas fa-calendar-alt" />
            <p className="text2">{dateFormatter(publishedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
