import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { getCookieArray, data, logout, urlAPI, urlUser } from "../function/function";
import axios from "axios";
import "../styles/App.css";

type Data = {
  name: string;
  text: number;
  time: string; 
};
interface FormInput {
  text: string;
}
export const Home: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = data => postData(data.text);
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState("匿名");
  const arr = getCookieArray();
  
  useEffect(() => {
    axios.get(urlAPI).then(res => {
      res.data.reverse().join();
      setDatas(res.data);
    });
  }, []);

if (arr["name"] !== "") {
  axios
  .get(urlUser, {
    headers: {
      Authorization: "Token " + arr["name"],
    },
  })
  .then(res => {
    setUser(res.data.username);
  });
}

  const postData = (textData: any) => {
    const datetime:any = data()
    axios
      .post(urlAPI, {
        name: user,
        text: textData,
        time: datetime,
      })
      .finally(function () {
        window.location.reload();
      });
  };

  return (
    <main className="container">
      <p className="title">簡易掲示板</p>
      <p className="text">こちらは簡易掲示板のサイトとなります。ログインを行うことで、投稿者名をつけて投稿することができます。ログインをしていない場合は匿名になります。</p>
      <Link to="/Mypage">マイページ</Link>
      <Link className="reset button-shadow" to="/login">ログイン</Link>
      <Link className="reset button-shadow" to="/Register">新規登録</Link>
      <input className="reset button-shadow"type="button" value="ログアウト" onClick={logout}/>
      <div className="username">投稿者名：{user}</div>
        <form onSubmit={handleSubmit(onSubmit)} className="input-form">
          <input {...register("text")} className="form-control" />
          <input className="reset button-shadow" type="submit" value="送信"/>
        </form>
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
