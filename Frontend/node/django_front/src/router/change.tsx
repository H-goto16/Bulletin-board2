import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { logout, getCookieArray, urlUser, urlChange } from "../function/function";
import Navbar from "../components/navbar";

interface FormInput {
    new_password1: string;
    new_password2: string;
    old_password: string;
}

export const Change: React.FC = () => {
    const { register, handleSubmit } = useForm<FormInput>();
    const onSubmit: SubmitHandler<FormInput> = data => postData(data.new_password1, data.new_password2, data.old_password);
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

    const postData = (new_password1: string, new_password2: string, old_password: string) => {
        axios
            .post(urlChange, {
                headers: {
                    Authorization: "Token " + arr["name"],
                },
                new_password1: new_password1,
                new_password2: new_password2,
                old_password: old_password,
            })
            .then(res => {
                setMassage("パスワードの変更に成功しました。");
                console.log(res)
            }).catch(err => {
                if (axios.isAxiosError(err)) {
                    setMassage("入力情報を確認してください。");
                    console.log(err)
                }
            })
    };

    return (
        <div className="container">
            <Navbar />
            <h2 className="title">パスワードを変更</h2>
            <p className="user">
                <p className="text">ユーザー名：{user}</p>
            </p>
            <p className="massage">{message}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <p className="input">現在のパスワード</p>
                <input {...register("new_password1")} placeholder="現在のパスワードを入力してください。" className="form-control" />
                <p className="input">新しいパスワード</p>
                <input {...register("new_password2")} placeholder="新しいパスワードを入力してください。" className="form-control" />
                <p className="input">再入力</p>
                <input {...register("old_password")} placeholder="再入力してください。" className="form-control" />
                <div className="button-space">
                    <input className="reset button-shadow" type="submit" value="送信" />
                </div>
            </form>
            &nbsp;
        </div>
    );
};
