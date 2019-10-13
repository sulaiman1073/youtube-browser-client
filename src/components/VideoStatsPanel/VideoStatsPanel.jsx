import React from "react";
import "./VideoStatsPanel.css";
import dateFormatter from "../../util/dateFormatter";
import numberFormatter from "../../util/numberFormatter";

export default function VideoStatsPanel({
  videoTitle,
  description,
  thumbnail,
  viewCount,
  likeCount,
  dislikeCount,
  publishedAt
}) {
  return (
    <div className="VideoStatsPanel--container">
      <p className="subtitle2">{videoTitle}</p>
      <div className="iconText lg">
        <i className="fas fa-calendar-alt fa-lg" />
        <p className="subtitle2">{dateFormatter(publishedAt)}</p>
      </div>
      <div className="iconText lg">
        <i className="fas fa-eye fa-lg" />
        <p className="subtitle2">{numberFormatter(viewCount)}</p>
      </div>
      <div className="iconText lg">
        <i className="fas fa-thumbs-up fa-lg" />
        <p className="subtitle2">{numberFormatter(likeCount)}</p>
      </div>
      <div className="iconText lg">
        <i className="fas fa-thumbs-down fa-lg" />
        <p className="subtitle2">{numberFormatter(dislikeCount)}</p>
      </div>
    </div>
  );
}
