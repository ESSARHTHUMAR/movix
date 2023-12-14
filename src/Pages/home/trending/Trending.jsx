import React, { useState } from 'react'
import Carousel from '../../../Components/carousel/Carousel';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs'
import ContentWrapper from '../../../contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'

function Trending() {

    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>
                Trending
            </span>
            <SwitchTabs onTabChange={onTabChange} data={["Day", "Week"]}/>
        </ContentWrapper>
        <Carousel data= {data?.results} loading= {loading}/>
    </div>
  )
}

export default Trending