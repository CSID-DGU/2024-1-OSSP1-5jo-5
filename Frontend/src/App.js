import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/common/NavBar";
import MainPage from "./pages/main/MainPage";
import "./App.css";
import SearchResultPage from "./pages/searchResult/SearchResultPage";
import ApiDetailPage from "./pages/apiDetail/ApiDetailPage";
import SignUp from "./pages/signup/signup";
import MyPage from "./pages/mypage/mypage";
import Login from "./pages/login/login";
import PostAPI from "./pages/postAPI/postAPI";
import WriteBoard from "./pages/write/write";
import ReadFree from "./pages/readfree/readFree";
import ReadQnA from "./pages/readqna/readQnA";
import Board from "./pages/board/board";

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavBar />
        <div className="search-bar">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/allresult" element={<SearchResultPage />} />
            <Route path="/api-details/:id" element={<ApiDetailPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/board" element={<Board />} />
            <Route path="/postAPI" element={<PostAPI />} />
            <Route path="/write" element={<WriteBoard />} />
            <Route path="/readFree/:postId" element={<ReadFree />} />
            <Route path="/readQnA/:postId" element={<ReadQnA />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
