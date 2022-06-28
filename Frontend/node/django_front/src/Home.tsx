import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

type Data = {
  name: string;
  price: number;
};
export const Home:React.FC= () => {
  const [name, setName] = useState("");
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState([]);

  const urlAPI = "http://localhost:8000/products/products/";
  const urlUser = "http://localhost:8000/rest-auth/user/";
  console.log(axios.defaults.baseURL);
  useEffect(() => {
    axios.get(urlAPI).then((res) => {
      setDatas(res.data);
    });
  }, []);
  console.log(datas);

  console.log(axios.defaults.baseURL);
  useEffect(() => {
    axios.get(urlUser, {
      headers: {
        Authorization: 'Token 1546b71af7249430ec6bfe69506d144459a21034',
      }
    }).then((res) => {
      console.log(res);
      setUser(res.data.username);
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
      <p><Link to="/login">ログイン</Link></p>
      <p><Link to="/Register">新規登録</Link></p>
        <div className="username">
          {user}
        </div>
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
