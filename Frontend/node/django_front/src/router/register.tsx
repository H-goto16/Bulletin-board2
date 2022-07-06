import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import "../styles/login.css";
import { urlRegister } from "../function/function";

interface FormInput {
  username: string;
  email: string;
  password: string;
  password2: string;
}
export const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = data => postData(data.username, data.email, data.password, data.password2);
  const [message, setMassage]: any = useState("");
  
  const postData = (username: string, email: string, password1: string, password2: string) => {
    console.log(username,email,password1,password2)
    axios
      .post(urlRegister, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        setMassage("登録に成功しました。");
      }).catch(err => {
        if (axios.isAxiosError(err)) {
          setMassage("登録に失敗しました。入力情報を確認してください。");
          console.log(err)
        }
      })
  };

  return (
    <div className="container">
      <h2 className="title">ユーザー新規登録</h2>
      <Link to="/" className="link"> 掲示板に戻る </Link>
      <p className="error">{message}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <p className="input">ユーザー名</p>
        <input {...register("username")} className="form-control"/>
        <p className="input">メールアドレス</p>
        <input {...register("email")} className="form-control"/>
        <p className="input">パスワード</p>
        <input {...register("password")} className="form-control"/>
        <p className="input">パスワード再入力</p>
        <input {...register("password2")} className="form-control"/>
        <div className="button-space">
          <input className="reset button-shadow" type="submit" value="新規登録" />
        </div>
      </form>
      <div className="button-space">
        <Link className="reset button-shadow" to="/login">ログイン</Link>
      </div>
      &nbsp;
    </div>
  );
};
