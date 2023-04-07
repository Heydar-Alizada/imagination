import React from "react";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";




export default function Car(){
    const [car, setCar] = useState('');
    const [year, setYear] = useState('');
    const apiKey = useSelector(state => state.data.apiKey);
    const [loading, setLoading] = useState(false);



    const generateCar = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
        .get(`https://api.api-ninjas.com/v1/cars?fuel_type=gas`, apiKey)
        .then(response => {
            console.log (response.data)
            setLoading(false)})
        .catch(error => {alert('Something gone wrong, please refresh the page', error)})     
    }
    

    return(
        <div className="car container"> 
            <input className="mt-5 w-25 car-input" type="number" onChange={(e)=> {setYear(e.target.value)}}/>
            <br/>
            <button className="mt-3 car-button" onClick={generateCar}>Generate Bucket List</button>
         
            {loading?<h2>Loading...</h2>:<h1 className="car-h2">{car}</h1>}





        </div>
    )
}