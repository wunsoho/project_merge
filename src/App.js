import React, { useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./component/Main/Main";
import Deatil from "./component/Detail/Detail";
import Reserve1 from "./component/Reserve/Reserve1";
import Status from "./component/Status/Status";
import Review from "./component/Review/Review";
import Return from "./component/Return/Return";
import './App.css';
import Alarm from "./component/Alarm/Alarm";
import History from "./component/History/History";
import Extension from "./component/Extension/Extension";
import NavigationBar from "../src/component/Navi/NavigationBar";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Map from "./pages/Map";
import MyPage from "./pages/MyPage";
import Category from "./pages/CategoryBuilding"
import Search from "./pages/Search";
import Notification from "./pages/Notification"
import FAQ from "./pages/FAQ"
import Inquiry from "./pages/Inquiry"
import Building from "./component/Detail/BuildDetail";
import Login from "./component/Login/Login";

function App() {  
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  }, []);
  return (  
    <BrowserRouter>
    <div>
      <Routes>
        <Route path ="/" element={<Login/>}/>
        <Route path="/main" element={
          <>
            <Main />
            <NavigationBar />
          </>} />
        <Route path ="/facility/:id" element={<Deatil/>}/>
        <Route path ="/facility/:id/reserve1" element = {<Reserve1/>}/>
        <Route path ="/building/:id" element={<Building/>}/>
        <Route path ="/building/:id/reserve1" element={<Reserve1/>}/>
        <Route path ="/status" element={<Status/>}/>
        <Route path ="/review" element={<Review/>}/>
        <Route path ="/return" element={<Return/>}/>
        <Route path ="/extension" element={<Extension/>}/>
        <Route path ="/Alarm" element={<Alarm/>}/>
        <Route path ="/history" element={<History/>}/>
        <Route path="/1" element={
          <>
            <Home />
            <NavigationBar />
          </>} />
        <Route path="/reservation" element={
          <>
            <Reservation />
            <NavigationBar />
          </>} />
        <Route path="/map" element={
          <>
            <Map />
            <NavigationBar />
          </>} />
        <Route path="/mypage" element={
          <>
            <MyPage />
            <NavigationBar />
          </>} />
        <Route path="/map/category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/inquiry" element={<Inquiry />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
