import React, { useState } from 'react'
import "./style.css";
import { useNavigate } from 'react-router';
import { SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

// 네비게이션 바 기능주기

export default function Main() {

  // function //
  const navigator = useNavigate();

  // 토글을 이용한 네비게이션 바 만들기

  return (
    <div id="main-wrapper">
      <div className='main-head-box'>
        <div className='main-icon-image'></div>
        <div className='main-title'>{"Food Insight"}</div>
        <div className='main-sign-in' onClick={() => {navigator(SIGN_IN_ABSOLUTE_PATH)}}>로그인</div>
      </div>
      <div className='main-container'>
        <div className='main-banner-box'></div>
        <div className='main-image-box'>
          <div className='food-image'>식당1</div>
          <div className='food-image'>식당2</div>
          <div className='food-image'>식당3</div>
          <div className='food-image'>식당4</div>
        </div>
      </div>
    </div>
  )
}

