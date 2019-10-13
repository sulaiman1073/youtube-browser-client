import React from "react";
import "./ChannelStatsPanel.css";
import dateFormatter from "../../util/dateFormatter";
import numberFormatter from "../../util/numberFormatter";

export default function ChannelStatsPanel({
  channelTitle,
  thumbnail,
  creationDate,
  subscriberCount,
  viewCount,
  videoCount
}) {
  return (
    <div className="ChannelStatsPanel--container">
      <div className="ChannelStatsPanel--channel">
        <img src={thumbnail} alt="thumbnail" />
        <p className="title1">{channelTitle}</p>
      </div>
      <div className="ChannelStatsPanel--stat">
        <p className="subtitle2">Videos</p>
        <p className="subtitle2">{numberFormatter(videoCount)}</p>
      </div>
      <div className="ChannelStatsPanel--stat">
        <p className="subtitle2">Subscribers</p>
        <p className="subtitle2">{numberFormatter(subscriberCount)}</p>
      </div>
      <div className="ChannelStatsPanel--stat">
        <p className="subtitle2">Views</p>
        <p className="subtitle2">{numberFormatter(viewCount)}</p>
      </div>
      <div className="ChannelStatsPanel--stat">
        <p className="subtitle2">Created At</p>
        <p className="subtitle2">{dateFormatter(creationDate)}</p>
      </div>
    </div>
  );
}
