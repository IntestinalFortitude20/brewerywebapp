// IMPORT STATEMENTS (structure created using rcfe shortcut)
import React, {useEffect, useState} from 'react'
import axios from 'axios'


function App() {
  
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3050/breweries/");
        setBackendData(response.data);
      }
      catch(error) {
        console.error('Error fetching data from server:', error);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      {
        backendData.map(brewery => (
          <p key={brewery.id}>{brewery.name}</p>
        ))
      }

    </div>
  )
}



export default App