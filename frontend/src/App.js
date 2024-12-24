import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {

  const [listOfProducts, setListOfProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/products").then((response) => {
      setListOfProducts(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listOfProducts.map((value, key) => {
        return <div key={key}>{value.name}</div>;
      })}
    </div>
  );
}

export default App;
