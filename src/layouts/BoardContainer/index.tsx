import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import "./style.css";
import { Outlet } from 'react-router';


//   component:board 공통부분  //
export default function board() {

    //                    render                    //
    return (
        <div id='board-wrapper'>
            <div className='board-head-box'>
                <div className='board-navigation-bar'>☰</div>
                <div className='board-title'>{"Food Insight"}</div>
                <div className='board-sign-in-box'>
                    <div className='board-admin'>관리자</div> 
                    <div className='board-sign-in'>로그아웃</div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}
