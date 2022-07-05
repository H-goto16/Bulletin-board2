export function getCookieArray() {
    const arr: any = new Array();
    if (document.cookie != "") {
        const tmp = document.cookie.split("; ");
        for (var i = 0; i < tmp.length; i++) {
            var data = tmp[i].split("=");
            arr[data[0]] = decodeURIComponent(data[1]);
        }
    }
    return arr;
};
export function data() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const datetime = year + "年" + month + "月" + day + "日" + hour + "時" + minute + "分" + second + "秒";
    return datetime
}
export const logout = () => {
    document.cookie = "name=;expires=0;";
    window.location.reload();
}

export const urlAPI = "http://localhost:8000/products/products/";
export const urlUser = "http://localhost:8000/rest-auth/user/";
export const urlLogin = "http://localhost:8000/rest-auth/login/";
