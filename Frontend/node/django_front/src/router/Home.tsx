import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCookieArray, data, urlAPI, urlUser } from "../function/function";
import Navbar from "../components/navbar";
import axios from "axios";
import "../styles/App.css";
import logo from "../images/logo.png";

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
      console.log(res);
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
    const datetime: any = data()
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
      <Navbar />
      <img src={logo} className="logo" alt="" />
      <p className="text">こちらは簡易掲示板のサイトとなります。ログインを行うことで、投稿者名をつけて投稿することができます。ログインをしていない場合は匿名になります。</p>
      <div className="detail">投稿者名：{user}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="input-form">
        <input {...register("text")} placeholder="投稿する内容を入力" className="form-control" />
        <input className="reset button-shadow" type="submit" value="送信" />
      </form>
      <ul>
        {datas.reverse().map((data: Data) => (
          <div>
            <div className="detail">
                {data.name}：{data.time}
            </div>
            <div className="dis" >{data.text}</div>
          </div>
        ))}
      </ul >
      &nbsp;
    </main >
  );
};
