import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Cookies } from "react-cookie";

type Data = {
  name: string;
  price: number;
};
export const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState("匿名");

  function getCookieArray() {
    const arr: any = new Array();
    if (document.cookie != "") {
      const tmp = document.cookie.split("; ");
      for (var i = 0; i < tmp.length; i++) {
        var data = tmp[i].split("=");
        arr[data[0]] = decodeURIComponent(data[1]);
      }
    }
    return arr;
  }

  const arr = getCookieArray();
  console.log(arr["name"]);

  const urlAPI = "http://localhost:8000/products/products/";
  const urlUser = "http://localhost:8000/rest-auth/user/";

  console.log(axios.defaults.baseURL);

  useEffect(() => {
    axios.get(urlAPI).then(res => {
      setDatas(res.data);
    });
  }, []);
  console.log(datas);

  console.log(axios.defaults.baseURL);
  useEffect(() => {
    axios
      .get(urlUser, {
        headers: {
          Authorization: "Token " + arr["name"],
        },
      })
      .then(res => {
        console.log(res);
        setUser(res.data.username);
      });
  }, []);

  console.log(datas);
  console.log(user);

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
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(function () {
        window.location.reload();
      });
  };

  const logout = () => {
    document.cookie = 'name=;expires=0;';
    window.location.reload();
  };

  return (
    <main className="container">
      <p className="title">簡易掲示板</p>
      <p className="text">
        こちらは簡易掲示板のサイトとなります。ログインを行うことで投稿名が自動的に入力されます。登録していない場合はAnonumousUserと表示されます。
      </p>
      <p>
        <Link to="/login">ログイン</Link>
      </p>
      <p>
        <Link to="/Register">新規登録</Link>
      </p>
      <input type="button" value="ログアウト" onClick={logout} />

      <div className="username">投稿者名：{user}</div>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        className="form-control"
      />
      <input type="button" value="送信" onClick={postData} />
      <div>
        {datas.map((data: Data) => (
          <div className="dis">{data.name}</div>
        ))}
      </div>
      &nbsp;
    </main>
  );
};
