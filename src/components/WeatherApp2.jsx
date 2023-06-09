import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import sunny from "./assets/sunny.png"
import cloud from "./assets/cloud.png"
import fewcloud from "./assets/fewcloud.png"
import lightrain from "./assets/lightrain.png"
import haze from "./assets/haze.png"
import showerrain from "./assets/showerrain.png"
import all from "./assets/all.png"
import BounceLoader from "react-spinners/BounceLoader";
const WeatherApp2 = () => {
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
    const [data,setData] = useState({})
    const [location,setLocation] = useState('')
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fee0ac29d95d24f929c5f4ba5cf179dc&units=metric`
    let time = new Date().toLocaleTimeString();
    const [localTime,setLocalTime] = useState(time)
    const searchLocation = async(event)=>{
    if(event.key === "Enter"){
     await axios.get(url)
     .then((res)=>{setData(res.data)
    console.log(res.data);
    })
     setLocation('')
    }

}
const formSubmit =(e)=>{
    e.preventDefault()
    console.log("a");
}

let emojiImg = null
let backgroundImg = null
if( typeof data.main != "undefined"){

 if(data.weather[0].description == "clear sky"){
emojiImg = <img src={sunny} alt="" />
backgroundImg="sky"

 } 
    else if(data.weather[0].description == "broken clouds"){
    emojiImg = <img src={cloud} alt="" />
    backgroundImg="cloud"
 }
 else if(data.weather[0].description == "few clouds"){
    emojiImg = <img src={fewcloud} alt="" />
    backgroundImg="fewcloud"
 }
 else if(data.weather[0].description == "light rain"){
    emojiImg = <img src={lightrain} alt="" />
     backgroundImg="rain"
 }
 else if(data.weather[0].description == "haze"){
    emojiImg = <img src={haze} alt="" />
    backgroundImg="haze"
 }
 else if(data.weather[0].description == "scattered clouds"){
    emojiImg = <img src={cloud} alt="" />
    backgroundImg="scattered"
 }
 else if(data.weather[0].description == "light intensity shower rain"){
    emojiImg = <img src={showerrain} alt="" />
     backgroundImg="rain"
 }
 else if(data.weather[0].description == "overcast clouds"){
    emojiImg = <img src={fewcloud} alt="" />
    backgroundImg="overcast"
 }
 else {
    emojiImg = <img src={all} alt="" />
    backgroundImg="allbg"
 }
} else {
    backgroundImg="weatherAppBg"
}

const updateTime = ()=>{
  time = new Date().toLocaleTimeString();
  setLocalTime(time)
}
 setInterval(updateTime,2000)
  return (
    
   <>
   {
    loading ?
   <div className="loading">
     <BounceLoader
    loading={loading}
    color="rgb(6, 178, 221)"
    size={150}
    />
   </div>
  :
  <section className={`weatherapp ${backgroundImg}`}>
  <div className={`${backgroundImg}`}>
  <div className="container-fluid ">
     <h6 className='pt-5 ms-5'>the.weather</h6>  
     <div className="row">
         <div className="col-12 col-sm-12 col-md-12 col-lg-8 ">
    <div className="d-flex align-items-end ms-5 pb-5" style={{"height":"100%"}}>
 {
     data.main ?     <div className="tempBox pb-5"><h1 className="temph1">{data.main.temp}°</h1></div> : null
 }
     <div className="tempBox"><h6 className='temph6 ms-2'> {emojiImg} <br />
 {
     data.sys ?     <span className='ms-3'>{data.name},{data.sys.country}</span> : null
 }
    </h6> 
     </div>
 
    </div>
                 
         </div>
 
 
         <div className="col-12 col-sm-12 col-md-12 col-lg-4 ">
             <div className="weatherDetails">
           <form onSubmit={formSubmit}>
           <div className="input-group mb-3">
   <input 
   type="text" 
   className="form-control" 
   placeholder="Another location ..." 
   aria-label="Recipient's username" 
   aria-describedby="button-addon2"
   value={location}
   onChange={e=>{setLocation(e.target.value)}}
   onKeyPress={searchLocation}
   />
 
 </div>
           </form>
    <h5 className='text-center mt-4 mb-4 detailsh5'>Weather Details</h5>
    <div className="d-flex justify-content-between">
    <h6 style={{"display":"inline-block"}}>Weather:</h6>
   {
     data.weather ?
     <h6>{data.weather[0].description}</h6>
     : null
   }
   </div>
 
 
   <div className="d-flex justify-content-between mt-3">
     <h6>Feels Like:</h6>
 {
     data.main ?
     <h6>{data.main.feels_like}°C</h6>
     :
     null
 }
     </div>
 
     <div className="d-flex justify-content-between my-4">
     <h6>Humidity:</h6>
 {
     data.main ?
     <h6>{data.main.humidity} %</h6>
     :
     null
 }
     </div>
 
 <div className="tempBox">
   <div className="d-flex justify-content-between">
     <h6>Minimum Temp <i className="fa-solid fa-arrow-down ms-2"></i></h6>
 {
   data.main ?
 
   <h6>{data.main.temp_min}°C</h6>
 
     :
     null
   }
   </div>
      <div className="d-flex justify-content-between my-4">
   <h6>Maximum Temp <i className="fa-solid fa-arrow-up ms-1"></i></h6>
    {
     data.main ?
     <h6>{data.main.temp_max}°C </h6>
     :null
    }
     </div>
   </div>
 
    <hr  style={{"color":"#fff"}}/>
    <div className="d-flex justify-content-center mt-5" >
       <h6 style={{"fontSize":"30px","color":"#fff","fontSize":"40px"}} className="time">{localTime}</h6>
    </div>
             </div>
         </div>
     </div>
    </div>
  </div>
 
    </section>
   }

   
   </>
  )
}

export default WeatherApp2