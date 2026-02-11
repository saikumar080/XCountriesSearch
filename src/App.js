import React,{useEffect, useState} from 'react';
import './App.css';
const API_URL="https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
function App() {
  const[search, setSearch]=useState("");
  const[countries,setCountries]=useState([]);
  const [loading, setLoading]=useState(true);

  //fetching Data:::
  useEffect(()=>{
    async function fetchCountries() {
      try{
        const res= await fetch(API_URL);
        const data=await res.json();
        setTimeout(() => {
          setCountries(data);
          setLoading(false);
        }, 1000); // Simulating a delay of 1 second

      }catch(err){
        console.error("Error Fetching Countries::", err);
        setLoading(false);
      }
    }
    fetchCountries();
  },[])

  // Filtering Countries based on search input
 const filteredCountries=countries.filter((country)=> country.common.toLowerCase().includes(search.toLowerCase())
 );


  return (
    <div className="App">
      <h1>Countries Search</h1>
      <input
        type="text"
        placeholder="Search for  countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="countriesCard">
        {loading ?(
          // display the  circular loading animation::
          <div className="loader">
            <div className="spinner">

            </div>

          </div>


        ):  filteredCountries.length >0 ? filteredCountries.map((country)=>(
          <div key={country.code} className="countryCard">
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))
        : search && <p>No countries found.</p>}
      </div>
    </div>
  );
}

export default App;
