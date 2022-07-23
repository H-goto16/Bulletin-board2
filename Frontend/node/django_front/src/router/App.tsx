import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Login } from "./login";
import { Register } from "./register";
import { Mypage } from "./mypage";
import { Change } from "./change";
import "../styles/App.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login"element={<Login/>}/>
        <Route path="/Register" element={<Register />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/reset" element={<Change />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
