"use client";
// "@/app/firebase/firebasedb"

import React, { useEffect, useState } from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "@/app/firebase/firebasedb";

const Login = () => {
  //  codes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  // const [isUserOn, setIsUserOn] = useState(false); //  로그인 확인 flag (현재 비활성화)

  useEffect(() => {
    //  컴포넌트 랜더링 시 로그인 여부 체크
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("현재 로그인이 되어있습니다요");
        // setIsUserOn(true); //  로그인 확인 flag (현재 비활성화)
      } else {
        console.log("로그인하삼");
      }
    });
  }, []);

  const singUp = () => {
    //  회원가입 기능
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: displayName });
        console.log(result, "Sign Up!!!");
      })
      .catch((err) => console.log(err));
  };

  const login = () => {
    //  로그인 기능
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result, " login!!!!");
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = //  입력된 값 전달
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.type === "email") {
        setEmail(e.target.value);
      } else if (e.target.type === "password") {
        setPassword(e.target.value);
      } else {
        setDisplayName(e.target.value);
      }
    };

  const handleOnClick = () => {
    //  로그인 상태 flag
    setIsLogin(!isLogin);
  };

  const logOut = () => {
    //  로그아웃 기능
    signOut(auth).then((result) => {
      console.log(result, "log out");
    });
  };

  return (
    //  html
    <section>
      <input
        className="border"
        type="email"
        placeholder="이메일을 입력해주세요."
        onChange={handleOnChange}
      />
      <input
        className="border"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={handleOnChange}
      />
      {!isLogin ? ( //  여기서 isLogin의 false/true값에 따라 ui 변경
        <>
          <input
            className="border"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={handleOnChange}
          />
          <button className="border" type="button" onClick={singUp}>
            가입하기
          </button>
        </>
      ) : (
        <button className="border" type="button" onClick={login}>
          로그인
        </button>
      )}

      <p onClick={handleOnClick}>
        {!isLogin ? "이미 계정이 있다면??" : "계정이 없다면??"}
      </p>
      <button onClick={logOut}>로그아웃</button>
    </section>
  );
};

export default Login;
