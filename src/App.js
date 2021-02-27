import React, { useState } from 'react'
import './app.css'
import axios from 'axios';
import { TextField, Select, InputLabel } from '@material-ui/core';

const Countrycard = ({ data }) => {

   React.useEffect(() => {
      setTimezones(data.timezones)
   }, [data.timezones]);

   const [timezones, setTimezones] = useState([]);

   return(
      <div style={{width:'16vw', height: '45vh', minWidth: '150px', marginBottom: '15px'}}>
         <div>
            <img style={{height: '15vh'}} src={data.flag} alt='flag'/>
         </div>
         <div style={{fontSize: '1.5rem'}}>
            {data.name}
         </div>
         <div style={{fontSize: '1rem'}}>
            {data.nativeName}
         </div>
         <div style={{fontSize: '1.5rem'}}>
            {data.capital}
         </div>
         <div style={{fontSize: '1.5rem'}}>
            {data.subregion}
         </div>
         <div style={{fontSize: '1rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {timezones.map((timezone, index) => (
               <div key={index} style={{padding: '2px'}}>{timezone}</div>
            ))}
         </div>
      </div>
   )
} 

const App = () => {

   const [countries, setCountries] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');

   axios.defaults.baseURL = 'https://restcountries.eu/rest/v2/';

   React.useEffect(() => {
      axios.get('/all').then((res) => {
         console.log(res.data);
         setCountries(res.data)
   })
   }, []);

   return(
      <div>
         <div style={{height: '40vh', display: 'flex', flexDirection: 'column'}}>
            <TextField 
               id="outlined-basic"
               label="Search"
               variant="outlined"
               onChange={event => {setSearchTerm(event.target.value)}}
            />
            <div style={{}}>
               <InputLabel id="timezone">Select timezone</InputLabel>
               <Select
                  multiple
                  labelId="timezone"
               />
            </div>
         </div>
         <div style={{height: 'auto', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            {countries.filter((country) => {
               if(searchTerm === "") {
                  return country
               } else if (country.name.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                  return country
               } else if (country.capital.toLowerCase().startsWith(searchTerm.toLowerCase())) {
                  return country
               }
            }).map((country, index) => (
            <Countrycard key={index} data={country}/> ))}
         </div>
      </div>
)}

export default App