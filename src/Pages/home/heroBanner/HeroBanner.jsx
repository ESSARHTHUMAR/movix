import {React, useState, useEffect} from 'react'
import "./heroBanner.scss"
import {useNavigate} from "react-router-dom"
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import Img from '../../../lazyLoadImage/Img';
import ContentWrapper from "../../../contentWrapper/ContentWrapper"

function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("")
  const navigate = useNavigate();
  const {data, loading} = useFetch("/movie/upcoming")

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const queryHandler = (e) => {
    if(query.length > 0 && e.key === "Enter"){
      navigate(`/search/${query}`)
    }
  }

  const {url} = useSelector((state) => state.home)

  useEffect(() => {
    const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data])

  return (
    <div className='heroBanner'>
      {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>
          <div className="searchInput">
            <input type="text" onKeyUp={queryHandler} onChange={handleChange} placeholder='Search for a movie or tv show....' />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner