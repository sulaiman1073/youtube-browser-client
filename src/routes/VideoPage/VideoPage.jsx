import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import ChannelStatsPanel from "../../components/ChannelStatsPanel";
import VideoStatsPanel from "../../components/VideoStatsPanel";
import Spinner from "../../components/Spinner";
import "./VideoPage.css";

export default function HomePage({ location }) {
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        setApiLoading(true);
        const videoId = queryString.parse(location.search).v;
        if (!videoId) throw new Error();
        const response = await axios.get(`/api/video/${videoId}`);
        setVideoData(response.data);
        setApiLoading(false);
      } catch (error) {
        setApiError(true);
        setApiLoading(false);
      }
    };

    getVideo();
  }, [location]);

  if (apiLoading || !videoData)
    return (
      <div className="VideoPage--spinner">
        <Spinner />
      </div>
    );

  if (apiError) return <Redirect to="/error" />;

  return (
    <div className="VideoPage--container">
      <div className="VideoPage--video">
        <iframe
          src={`https://www.youtube.com/embed/${videoData.videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={videoData.videoTitle}
        />
      </div>
      <VideoStatsPanel
        videoTitle={videoData.videoTitle}
        description={videoData.videoDescription}
        thumbnail={videoData.videoThumbnail}
        viewCount={videoData.videoViewCount}
        likeCount={videoData.videoLikeCount}
        dislikeCount={videoData.videoDislikeCount}
        publishedAt={videoData.publishedAt}
      />
      <ChannelStatsPanel
        channelTitle={videoData.channelTitle}
        thumbnail={videoData.channelThumbnail}
        creationDate={videoData.channelCreationDate}
        subscriberCount={videoData.channelSubscriberCount}
        viewCount={videoData.channelViewCount}
        videoCount={videoData.channelVideoCount}
      />
    </div>
  );
}
