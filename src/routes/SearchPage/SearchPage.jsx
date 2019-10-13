import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import VideoCard from "../../components/VideoCard";
import Spinner from "../../components/Spinner";
import "./SearchPage.css";
import useMedia from "../../helpers/useMedia";

export default function SearchPage({ location }) {
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [numOfVideosInPage, setNumOfVideosInPage] = useState(8);
  const isDesktop = useMedia("(min-width: 1024px)");
  const isMobile = useMedia("(max-width: 479px)");

  useEffect(() => {
    const getVideos = async () => {
      try {
        setApiLoading(true);
        setCurrentPage(0);
        const searchTerms = queryString.parse(location.search).s;
        if (!searchTerms) throw new Error();
        const query = searchTerms.split(" ").join("+");
        const response = await axios.get(`/api/videos/videos?q=${query}`);
        setSearchData(response.data);
        setApiLoading(false);
      } catch (error) {
        setApiError(true);
        setApiLoading(false);
      }
    };

    getVideos();
  }, [location]);

  useEffect(() => {
    if (isMobile) {
      setNumOfVideosInPage(2);
    } else if (isDesktop) {
      setNumOfVideosInPage(8);
    } else {
      setNumOfVideosInPage(4);
    }
  }, [isMobile, isDesktop]);

  const handleNext = async () => {
    if (
      currentPage * numOfVideosInPage + numOfVideosInPage <
      searchData.videos.length
    ) {
      setCurrentPage(currentPage + 1);
    } else {
      try {
        setApiLoading(true);
        const query = queryString
          .parse(location.search)
          .s.split(" ")
          .join("+");
        const response = await axios.get(
          `/api/videos/videos?q=${query}&token=${searchData.nextPageToken}`
        );
        setSearchData({
          ...searchData,
          nextPageToken: response.data.nextPageToken,
          videos: [...searchData.videos, ...response.data.videos]
        });
        setCurrentPage(currentPage + 1);

        setApiLoading(false);
      } catch (error) {
        setApiError(true);
        setApiLoading(false);
      }
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  if (apiLoading || !searchData)
    return (
      <div className="SearchPage--spinner">
        <Spinner />
      </div>
    );

  if (apiError) return <Redirect to="/error" />;

  return (
    <div className="SearchPage--container">
      <button
        type="button"
        className="SearchPage--prev button icon lg rounded"
        onClick={handlePrev}
        disabled={currentPage === 0}
      >
        <i className="fas fa-arrow-left fa-lg" />
      </button>
      <div className="SearchPage--videos">
        {searchData.videos
          .slice(
            currentPage * numOfVideosInPage,
            currentPage * numOfVideosInPage + numOfVideosInPage
          )
          .map(
            ({
              videoId,
              videoTitle,
              videoThumbnail,
              channelTitle,
              viewCount,
              commentCount,
              likeCount,
              dislikeCount,
              publishedAt
            }) => (
              <VideoCard
                key={videoId}
                videoId={videoId}
                videoTitle={videoTitle}
                videoThumbnail={videoThumbnail}
                channelTitle={channelTitle}
                viewCount={viewCount}
                commentCount={commentCount}
                likeCount={likeCount}
                dislikeCount={dislikeCount}
                publishedAt={publishedAt}
              />
            )
          )}
      </div>
      <button
        type="button"
        className="SearchPage--next button icon lg rounded"
        onClick={handleNext}
        disabled={searchData.videos.length >= searchData.totalResults}
      >
        <i className="fas fa-arrow-right fa-lg" />
      </button>
    </div>
  );
}
