import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

type Data = {
  name: string;
  price: number;
};
export const App:React.FC= () => {
  const [name, setName] = useState("");

  const urlAPI = "http://localhost:8000/products/products/";
  const [datas, setDatas] = useState([]);
  console.log(axios.defaults.baseURL);
  useEffect(() => {
    axios.get(urlAPI).then((res) => {
      setDatas(res.data);
    });
  }, []);
  console.log(datas);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };
  const postData = () => {
    axios
      .post(urlAPI, {
        name: name,
        price: 1,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        window.location.reload();
      });
  };
  return (
    <main className="container">
      <p className="title">簡易掲示板</p>
      <p className="text">
        こちらは簡易掲示板のサイトとなります。ログインを行うことで投稿名が自動的に入力されます。登録していない場合はAnonumousUserと表示されます。
      </p>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className="form-control"
      />
      <input type="button" value="送信" onClick={postData} />
      <div>
        {datas.map((data: Data) => (
          <div className="dis">
            {data.name}
          </div>
        ))}
      </div>
      &nbsp;
    </main>
  );
};

export default App;
