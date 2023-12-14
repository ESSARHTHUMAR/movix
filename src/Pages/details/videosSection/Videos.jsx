import React, { useState } from "react";

import "./videos.scss";

import Img from "../../../lazyLoadImage/Img";
import ContentWrapper from "../../../contentWrapper/ContentWrapper";
import PlayIcon from "../Playbtn";
import VideoPopup from "../../../Components/VideoPopup";

const Videos = ({ data, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return ( data?.results?.length > 0 &&
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => (
              <div
                key={video.id}
                onClick={() => {
                  setShow(true);
                  setVideoId(video.key);
                }}
                className="videoItem"
              >
                <div className="videoThumbnail">
                    <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}/>
                    <PlayIcon />
                </div>
                <div className="videoTitle">
                    {video.name}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default Videos;
