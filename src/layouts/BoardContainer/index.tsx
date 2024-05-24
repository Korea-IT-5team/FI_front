import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import "./style.css";
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router';


//   component:board 공통부분  //
export default function Board() {
    //                    render                    //
    return (
        <div id="authentication-wrapper">
            <div className='authentication-head-box'>
                <div className='authentication-title'>{"Food Insight"}</div>
            </div>
            <Outlet />
        </div>
    );
}
