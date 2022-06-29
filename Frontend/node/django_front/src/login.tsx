import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

export const Login: React.FC = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Token, setToken]:any= useState("");
  const [user, setUser] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies();


  const urlLogin = "http://localhost:8000/rest-auth/login/";
  const urlUser = "http://localhost:8000/rest-auth/user/";
  
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


  const postData = () => {
    axios
      .post(urlLogin, {
        username: userName,
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res);
        setToken(res.data.key);
        console.log(Token);
        setCookie("name", Token);
        axios.get(urlUser, {
          headers: {
            Authorization: 'Token ' + Token,
          }
        }).then((res) => {
          console.log(res);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
      });
  };

  return (
    <div>
      <Link to="/login">ログイン</Link>
      
      {user}
      <input
        type="text"
        value={userName}
        onChange={handleChange}
        className="form-control"
        />
      <input
        type="text"
        value={email}
        onChange={handleEmail}
        className="form-control"
        />
      <input
        type="text"
        value={password}
        onChange={handlePassword}
        className="form-control"
      />
      <input type="button" value="送信" onClick={postData} />
    </div>

  );
};
