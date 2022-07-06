import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { urlRegister } from "../function/function";
import Navbar from "../components/navbar";

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
  const [userError, setUserError]: any = useState("");
  const [emailError, setEmailError]: any = useState("");
  const [password1Error, setPassword1Error]: any = useState("");
  const [password2Errpr, setPassword2Error]: any = useState("");

  const postData = (username: string, email: string, password1: string, password2: string) => {
    axios
      .post(urlRegister, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
      }).catch(err => {
        if (axios.isAxiosError(err)) {
        } if (err.response.status == "500") {
          setMassage("登録に成功しました。");
        } else {
          setMassage("登録に失敗しました。入力情報を確認してください。");
          setUserError(err.response.data.username);
          setEmailError(err.response.data.email);
          setPassword1Error(err.response.data.password1);
          setPassword2Error(err.response.data.password2);
        }
      })
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="title">ユーザー新規登録</h2>
      <p className="massage">{message}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <p className="input">ユーザー名<p className="error">{userError}</p></p>
        <input {...register("username")} placeholder="投稿者名になります" className="form-control" />
        <p className="input">メールアドレス<p className="error">{emailError}</p></p>
        <input {...register("email")} placeholder="example@example.com" className="form-control" />
        <p className="input">パスワード<p className="error">{password1Error}</p></p>
        <input {...register("password")} placeholder="英数８文字以上" className="form-control" />
        <p className="input">パスワード再入力<p className="error">{password2Errpr}</p></p>
        <input {...register("password2")} placeholder="英数８文字以上" className="form-control" />
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
