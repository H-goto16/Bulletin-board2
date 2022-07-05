import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";

export const Login: React.FC = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Token, setToken]: any = useState("");
  const [user, setUser]: any = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [status, setStatus]: any = useState("");
  const [message, setMassage]: any = useState("");

  const urlLogin = "http://localhost:8000/rest-auth/login/";
  const urlUser = "http://localhost:8000/rest-auth/user/";

  function syncDelay(milliseconds: number) {
    var start = new Date().getTime();
    var end = 0;
    while (end - start < milliseconds) {
      end = new Date().getTime();
    }
  }

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handleEmail = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const logout = () => {
    document.cookie = "name=;expires=0;";
    window.location.reload();
  };

  const postData = () => {
    axios
      .post(urlLogin, {
        username: userName,
        email: email,
        password: password,
      })
      .then(res => {
        setToken(res.data.key);
        setCookie("name", Token);
        syncDelay(100);
        setStatus(res.status);
        axios
          .get(urlUser, {
            headers: {
              Authorization: "Token " + Token,
            },
          })
          .then(res => {
            setUser(res.data.username);
          });
      })
      .catch(error => {
      })
      .finally(function () {
        if (status == 200) {
          setMassage("ログインに成功しました。");
        } else if (status == 401) {
          setMassage("サーバーエラーのためもう一度ログインを押してください。");
        } else {
          setMassage("ログインに失敗しました。入力情報を確認してください。");
        }
      });
  };

  return (
    <div className="container">
      
      <h2 className="title">ログイン</h2>
      <Link to="/" className="link">
        掲示板に戻る
      </Link>
      <p className="user">
        <p className="text">ユーザー名：{user}</p>
      </p>
      <p className="error">{message}</p>
      <p className="text">
        ユーザー名、メールアドレスはどちらか片方でログインできます。
      </p>
      <p className="input">ユーザー名</p>
      <input
        type="text"
        value={userName}
        onChange={handleChange}
        className="form-control"
      />
      <p className="input">メールアドレス</p>
      <input
        type="text"
        value={email}
        onChange={handleEmail}
        className="form-control"
      />
      <p className="input">パスワード</p>
      <input
        type="text"
        value={password}
        onChange={handlePassword}
        className="form-control"
      />
      <div className="button-space">
        <input className="reset button-shadow" type="button" value="ログイン" onClick={postData} />
      </div>
      <div className="button-space">
        <input className="reset button-shadow" type="button" value="ログアウト" onClick={logout} />
      </div>
      &nbsp;
    </div>
  );
};
