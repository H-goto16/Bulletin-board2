import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";

type Data = {
  name: string;
  text: number;
  time: string;
};
export const Home: React.FC = () => {
  const [text, setText] = useState("");
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState("匿名");
  const [time, setTime] = useState("");
  const urlAPI = "http://localhost:8000/products/products/";
  const urlUser = "http://localhost:8000/rest-auth/user/";

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

  useEffect(() => {
    axios.get(urlAPI).then(res => {
      const result = res.data.reverse().join();
      setDatas(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(urlUser, {
        headers: {
          Authorization: "Token " + arr["name"],
        },
      })
      .then(res => {
        setUser(res.data.username);
      });
  }, []);


  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(e.target.value);
  };
  const postData = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const datetime =
      year +
      "年" +
      month +
      "月" +
      day +
      "日" +
      hour +
      "時" +
      minute +
      "分" +
      second +
      "秒";
    setTime(datetime);

    axios
      .post(urlAPI, {
        name: user,
        text: text,
        time: datetime,
      })
      .then(res => {
      })
      .catch(error => {
      })
      .finally(function () {
        window.location.reload();
      });
  };

  const logout = () => {
    document.cookie = "name=;expires=0;";
    window.location.reload();
  };

  return (
    <main className="container">
      <p className="title">簡易掲示板</p>
      <p className="text">
        こちらは簡易掲示板のサイトとなります。ログインを行うことで、投稿者名をつけて投稿することができます。ログインをしていない場合は匿名になります。
      </p>
      <p>
        <Link className="reset button-shadow" to="/login">
          ログイン
        </Link>
      </p>
      <Link className="reset button-shadow" to="/Register">
        新規登録
      </Link>
      <p></p>
      <input
        className="reset button-shadow"
        type="button"
        value="ログアウト"
        onClick={logout}
      />
      <div className="username">投稿者名：{user}</div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className="form-control"
      />
      <input
        className="reset button-shadow"
        type="button"
        value="送信"
        onClick={postData}
      />
      <div>
        {datas.reverse().map((data: Data) => (
          <div>
            <div>
              {data.name}：{data.time}
            </div>
            <div className="dis">{data.text}</div>
          </div>
        ))}
      </div>
      &nbsp;
    </main>
  );
};
