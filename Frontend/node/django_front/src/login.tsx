import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

export const Login: React.FC = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Token, setToken]: any = useState("");
  const [user, setUser]: any = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["name"]);
  const [status, setStatus]:any = useState("");
  const [message, setMassage]:any = useState("");


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
    document.cookie = 'name=;expires=0;';
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
          console.log(res);
          setToken(res.data.key);
          setCookie("name", Token);
          syncDelay(100);
          setStatus(res.status);
          console.log(res.status)
          console.log(Token);
          axios
            .get(urlUser, {
              headers: {
                Authorization: "Token " + Token,
              },
            })
            .then(res => {
              console.log(res.data.username);
              setUser(res.data.username);
              console.log(user);
            });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(function () {
        console.log(status)
        if (status == 200) {
          setMassage("ログインに成功しました。");
        } else if (status == 401) {
          setMassage("サーバーエラーのためもう一度ログインを押してください。")
        } else {
          setMassage("ログインに失敗しました。入力情報を確認してください。")
        }
      });
  };

  return (
    <div>
      <Link to="/">掲示板に戻る</Link>
      <p className="user">
        <p className="text">ユーザー名：{user}</p>
      </p>
      <p>{message}</p>
        <p>ユーザー名、パスワードはどちらか片方でログインできます。</p>
      <p>ユーザー名</p>
      <input
        type="text"
        value={userName}
        onChange={handleChange}
        className="form-control"
      />
      <p>メールアドレス</p>
      <input
        type="text"
        value={email}
        onChange={handleEmail}
        className="form-control"
      />
      <p>パスワード</p>
      <input
        type="text"
        value={password}
        onChange={handlePassword}
        className="form-control"
      />
      <input type="button" value="ログイン" onClick={postData} />
      <input type="button" value="ログアウト" onClick={logout} />
    </div>
  );
};
