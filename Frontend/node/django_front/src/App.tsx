import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

type Data = {
  name: string;
  price: number
}
export const App = () => {
  const urlAPI = "http://localhost:8000/products/products/";
  const [datas, setDatas] = useState([]);
  console.log(axios.defaults.baseURL)
  useEffect( () => {
    axios.get(urlAPI).then((res)=> {
      setDatas(res.data);
    })
  },[])
  console.log(datas)
  return (
    <div className="App">
      <h1>Axios Test</h1>
      <div>
        {datas.map((data: Data) => (
          <div>{data.name} : {data.price}</div>
        ))}
      </div>
    </div>
  );}
export default App;