import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

export const Register: React.FC = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const urlAPI = "http://localhost:8000/products/products/";
  const urlRegister = "http://localhost:8000/rest-auth/registration/";
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
        password2: password2
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(function () {
        // window.location.reload();
      });
  };

  return (
    <div>
      <Link to="/login">ログイン</Link>
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
        value={password1}
        onChange={handlePassword1}
        className="form-control"
      />
      <input
        type="text"
        value={password2}
        onChange={handlePassword2}
        className="form-control"
      />
      <input type="button" value="送信" onClick={postData} />
    </div>
  );
};
