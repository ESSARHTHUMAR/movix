import { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from "react-redux"
import {getApiConfiguration, getGeners} from "./store/homeSlice"
import Header from "./Components/header/Header"
import Footer from "./Components/footer/Footer"
import Home from './Pages/home/Home'
import Details from "./Pages/details/Details"
import Explore from "./Pages/explore/Explore"
import Error from "./Pages/404/Error"
import SearchResult from "./Pages/searchResult/SearchResult"

function App() {

  const dispatch = useDispatch();
  const {url} = useSelector((state) => 
    state.home
  );
  


  useEffect(() => {
    fetchApiConfig();
    genersCall();
  }, [])
  
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        console.log(res);
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original"
        }
        dispatch(getApiConfiguration(url));
      });
  }

  const genersCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({genres}) => {
      return genres.map((genre) => (allGenres[genre.id] = genre))
    })
    dispatch(getGeners(allGenres))
  }

  return (
    <BrowserRouter>
    <Header />
      <Routes>
      
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:mediaType/:id" element={<Details/>}></Route>
        <Route path="/search/:query" element={<SearchResult/>}></Route>
        <Route path="/explore/:mediaType" element={<Explore/>}></Route>
        <Route path="*" element={<Error />}></Route>
        
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
