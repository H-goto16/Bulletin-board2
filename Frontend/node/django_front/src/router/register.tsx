import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

export const Register: React.FC = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [status, setStatus]: any = useState("");
  const [message, setMassage]: any = useState("");
  const [svMassage, setSvMassage]: any = useState("");
  const [datas, setDatas] = useState([]);

  const urlAPI = "http://localhost:8000/products/products/";
  const urlRegister = "http://localhost:8000/rest-auth/registration/";
  
  useEffect(() => {
    axios.get(urlAPI).then(res => {
      setDatas(res.data);
    });
  }, []);

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

  const handlePassword1 = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword1(e.target.value);
  };

  const handlePassword2 = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword2(e.target.value);
  };

  const postData = () => {
    axios
      .post(urlRegister, {
        username: userName,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then(res => {
        setStatus(res.status);
      })
      .catch(error => {
        setStatus(error.response.status);
        if (error.response.status === 500) {
          setMassage("登録に成功しました。");
        } else {
          setMassage("登録に失敗しました。エラーメッセージを確認してください。");
        }
        if (error.response.status !== 500) {
          setSvMassage(error.request.responseText);
        }
      });
  };

  return (
    <div className="container">
      <h2 className="title">ユーザー新規登録</h2>
      <p className="text">{message}</p>
      <p className="text">{svMassage}</p>
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
        value={password1}
        onChange={handlePassword1}
        className="form-control"
      />
      <p className="input">パスワード再入力</p>
      <input
        type="text"
        value={password2}
        onChange={handlePassword2}
        className="form-control"
      />
      <input
        className="reset button-shadow"
        type="button"
        value="送信"
        onClick={postData}
      />
      <div>
        <p className="text">
          登録に成功したら下記のリンクからログインをしてくさい。
        </p>
        <Link className="reset button-shadow" to="/login">
          ログイン
        </Link>
      </div>
      &nbsp;
    </div>
  );
};