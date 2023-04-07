import React, { useEffect, useState } from "react";

import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";


export default function Celebrity(){

    const apiKey = useSelector(state => state.data.apiKey)
    const [name, setName] = useState('');
    const [height, setHeight] = useState(0);
    const [loading, setLoading] = useState(false);
    const [generatedCelebrity, setGeneratedCelebrity] = useState(false);

    const generateCelebrity = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
        .get(`https://api.api-ninjas.com/v1/celebrity?min_height=${+height-0.05}&max_height=${+height+0.05}`, apiKey)
        .then(response => {
            const data = response.data
            const random = getRandomInt(+(data.length)-1)
            setGeneratedCelebrity(data[random])
            console.log(data[random])
            
            
            
            // setGeneratedCelebrity(data[random])
            // console.log(data[+random], random)
            
            setLoading(false)})
        .catch(error => {alert('Something gone wrong, please refresh the page', error)})     
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      }


    return(
        <div className="container celebrity">
           {generatedCelebrity?null: <form onSubmit={generateCelebrity}>
                <h1 className="celebrity-h1">Which celebrity are you in other univers?</h1>
                <label className="celebrity-label" htmlFor="celebrity">Write your height</label>
                <br/>
                <input onChange={(e)=>{setHeight(e.target.value)}}  id="celebrity" className="celebrity-input" placeholder="1.65"/>
                <br/>
                <button  className='celebrity-button'>
                    Find me
                </button>
                

            </form>
        }



        {loading?<h1>Loading..</h1>
        :
        (<div>
           <h1 className="celebrity-ready-h1 ">{generatedCelebrity.name}</h1>
           <p>Age: {generatedCelebrity.age}</p>
           <p>Birthday: {generatedCelebrity.birthday}</p>
           <p>Gender: {generatedCelebrity.gender}</p>
           <p>Height: {generatedCelebrity.height}</p>
           <p>Nationality: {generatedCelebrity.nationality}</p>
           <p>Worth: {generatedCelebrity.net_worth}$</p>
           {generatedCelebrity.death?<p>{generatedCelebrity.death}</p>:null}
           <p></p>
        </div>)}


        </div>
    )
}