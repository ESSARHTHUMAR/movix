import React from 'react'
import { useState } from 'react'
import ContentWrapper from '../../../contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import Carousel from '../../../Components/carousel/Carousel';

function Popular() {

  const [endpoint, setEndpoint] = useState("movie");
  const {data, loading} = useFetch(`/${endpoint}/popular`)

  const onTabChange = (tab) => {
    setEndpoint( tab === "Movies" ? "movie" : "tv")
  }

  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">
          What's Popular
        </span>
        <SwitchTabs onTabChange={onTabChange} data={["Movies", "TV Shows"]}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular