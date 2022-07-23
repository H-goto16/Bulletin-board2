import React, { useEffect, useState } from "react";
import { getCookieArray, urlAPI, urlUser } from "../function/function";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

type Data = {
    name: string;
    text: number;
    time: string;
};

export const Mypage: React.FC = () => {
    const [datas, setDatas] = useState([]);
    const [data, setData] = useState([]);
    const [user, setUser] = useState("匿名");
    const arr = getCookieArray();

    useEffect(() => {
        axios.get(urlAPI).then(res => {
            res.data.reverse().join();
            const getData = res.data;
            setDatas(getData);
        });
    }, []);

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

    function diaplay() {
        const filterData: any = [];
        const result = datas.filter((value: any) => {
            if (value.name.indexOf(user) !== -1) {
                filterData.push(value)
                filterData.reverse().join();
                const desendData = filterData.sort(function (a: { time: number; }, b: { time: number; }) {
                    return (a.time < b.time) ? -1 : 1;
                });
                setData(desendData);
            }
        })
    };

    return (
        <main className="container">
            <Navbar />
            <p className="title">マイページ</p>
            <p className="text">投稿履歴が見れます。</p>
            <Link className="reset button-shadow" to={"/reset"}>パスワード変更</Link>
            <div className="detail">ユーザー：{user}</div>
            <div>
                {data.map((data: Data) => (
                    <div>
                        <div className="detail">
                            {data.name}：{data.time}
                        </div>
                        <div className="dis">{data.text}</div>
                    </div>
                ))}
                <input className="reset button-shadow" type="button" value="表示" onClick={diaplay} />
            </div>
            &nbsp;
        </main>
    );
};
