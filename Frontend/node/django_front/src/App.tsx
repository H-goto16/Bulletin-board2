import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type Data = {
  name: string;
  price: number;
};
export const App = () => {
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
      <p>
        <a href="" className="link">
          サインアップ
        </a>
      </p>
      <p>
        <a href="" className="link">
          ログイン
        </a>
      </p>
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
