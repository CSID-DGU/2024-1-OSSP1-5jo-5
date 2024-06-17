import React, { useEffect, useState } from "react";
import * as S from "./Style";
import SearchBar from "../../component/common/SearchBar";
import ProfileBox from "./profileBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiCard from "../../component/searchResult/ApiCard";

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [likedApis, setLikedApis] = useState([]);
  const [enrollApis, setEnrollApis] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);

  const likeEndpoint = "http://localhost:8080/api/like/list?user_id=1";
  const enrollEndpoint = "http://localhost:8080/api/list?user_id=1";
  const questionEndpoint =
    "http://localhost:8080/api/forums?type=question&user_id=1";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users?user_email=admin@example.com"
        );
        setUserData(response.data.result);
      } catch (err) {
        setError("An error occurred while fetching data");
      }
    };

    const fetchLikedApis = async () => {
      try {
        const response = await axios.get(likeEndpoint);
        setLikedApis(response.data.result.slice(0, 4)); // Get only first 4 items
      } catch (err) {
        setError("An error occurred while fetching liked APIs");
      }
    };

    const fetchEnrollApis = async () => {
      try {
        const response = await axios.get(enrollEndpoint);
        setEnrollApis(response.data.result.slice(0, 4)); // Get only first 4 items
      } catch (err) {
        setError("An error occurred while fetching liked APIs");
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(questionEndpoint);
        setQuestions(response.data.result.slice(0, 4)); // Get only first 4 items
      } catch (err) {
        setError("An error occurred while fetching questions");
      }
    };

    fetchUserData();
    fetchLikedApis();
    fetchEnrollApis();
    fetchQuestions();
  }, []);

  const navigate = useNavigate();

  const likeApiClick = () => {
    navigate("/allresult", {
      state: { endpoint: likeEndpoint, resultMessage: "내가 좋아요 누른 API" },
    });
  };

  const enrollApiClick = () => {
    navigate("/allresult", {
      state: { endpoint: enrollEndpoint, resultMessage: "내가 등록한 API" },
    });
  };

  const handleCardClick = (id) => {
    navigate(`/api-details/${id}`);
  };

  //말줄임표
  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  return (
    <S.Container>
      <SearchBar />
      {userData ? (
        <ProfileBox userData={userData} />
      ) : (
        <div>{error ? error : "Loading..."}</div>
      )}
      <S.ApiBox>
        <S.ApiBoxHeader>
          <S.Title>내가 좋아요 누른 API</S.Title>
          <S.More onClick={likeApiClick}>더보기 &gt;</S.More>
        </S.ApiBoxHeader>
        <S.CardGrid>
          {likedApis.map((api, index) => (
            <S.CardGridItem
              key={index}
              onClick={() => handleCardClick(api.api_id)}
            >
              <ApiCard
                icon={api.favicon || "/img/default_api.png"}
                views={api.view}
                title={api.name}
              />
            </S.CardGridItem>
          ))}
        </S.CardGrid>
      </S.ApiBox>
      <S.ApiBox>
        <S.ApiBoxHeader>
          <S.Title>내가 등록한 API</S.Title>
          <S.More onClick={enrollApiClick}>더보기 &gt;</S.More>
        </S.ApiBoxHeader>
        <S.CardGrid>
          {enrollApis.map((api, index) => (
            <S.CardGridItem
              key={index}
              onClick={() => handleCardClick(api.api_id)}
            >
              <ApiCard
                icon={api.favicon || "/img/default_api.png"}
                views={api.view}
                title={api.name}
              />
            </S.CardGridItem>
          ))}
        </S.CardGrid>
      </S.ApiBox>

      <S.ForumContainer>
        <S.ForumBox>
          <S.ForumHeader>
            <S.Title>내가 쓴 글</S.Title>
            <S.More>더보기 &gt;</S.More>
          </S.ForumHeader>
          {questions.map((question, index) => (
            <S.QuestionItem key={index}>
              <S.QuestionTitle>{truncate(question.title, 10)}</S.QuestionTitle>

              <S.QuestionDate>
                {new Date(question.creation_date).toLocaleDateString()}
              </S.QuestionDate>
            </S.QuestionItem>
          ))}
        </S.ForumBox>

        <S.ForumBox>
          <S.ForumHeader>
            <S.Title>내가 쓴 질문</S.Title>
            <S.More>더보기 &gt;</S.More>
          </S.ForumHeader>
          {questions.map((question, index) => (
            <S.QuestionItem key={index}>
              <S.QuestionTitle>{question.title}</S.QuestionTitle>
              <S.QuestionDate>
                {new Date(question.creation_date).toLocaleDateString()}
              </S.QuestionDate>
            </S.QuestionItem>
          ))}
        </S.ForumBox>
      </S.ForumContainer>
    </S.Container>
  );
};

export default MyPage;