import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { logout, getCookieArray, urlUser, urlLogin } from "../function/function";
import Navbar from "../components/navbar";

interface FormInput {
  username: string;
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = data => postData(data.username, data.email, data.password);
  const [user, setUser]: any = useState("匿名");
  const [message, setMassage]: any = useState("");
  const arr = getCookieArray();

  useEffect(() => {
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
  }, []);

  const postData = (username: string, email: string, password: string) => {
    axios
      .post(urlLogin, {
        username: username,
        email: email,
        password: password,
      })
      .then(res => {
        document.cookie = "name=" + res.data.key;
        setMassage("ログインに成功しました。");
        setUser(username);
      }).catch(err => {
        if (axios.isAxiosError(err)) {
          setMassage("ログインに失敗しました。入力情報を確認してください。");
        }
      })
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="title">ログイン</h2>
      <p className="user">
        <p className="text">ユーザー名：{user}</p>
      </p>
      <p className="error">{message}</p>
      <p className="text">
        ユーザー名、メールアドレスはどちらか片方でログインできます。
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <p className="input">ユーザー名</p>
        <input {...register("username")} placeholder="ユーザー名" className="form-control" />
        <p className="input">メールアドレス</p>
        <input {...register("email")} placeholder="example@example.com" className="form-control" />
        <p className="input">パスワード</p>
        <input {...register("password")} placeholder="password" className="form-control" />
        <div className="button-space">
          <input className="reset button-shadow" type="submit" value="ログイン" />
        </div>
      </form>
      <div className="button-space">
        <input className="reset button-shadow" type="button" value="ログアウト" onClick={logout} />
      </div>
      &nbsp;
    </div>
  );
};
