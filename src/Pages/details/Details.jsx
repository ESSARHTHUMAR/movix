import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Recommendation from "./carousels/Recommendation";
import Similar from "./carousels/Similliar";
import Cast from "./cast/Cast";
import "./details.scss";
import DetailsBanner from "./detailsBenner/DetailsBanner";
import Videos from "./videosSection/Videos";

function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <Videos data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  );
}

export default Details;
