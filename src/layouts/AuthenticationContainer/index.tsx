import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import "./style.css";
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate, useParams } from 'react-router';
import { checkNicknameRequest, emailCheckRequest, signInRequest, signUpRequest, telNumberAuthCheckRequest, telNumberAuthRequest } from 'src/apis/auth';
import { CheckEmailRequestDto, CheckNicknameDto, SignInRequestDto, SignUpRequestDto, TelNumberAuthCheckRequestDto, TelNumberAuthRequestDto } from 'src/apis/auth/dto/request';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/inputBox/Index';
import { MAIN_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useAuthStore } from 'src/stores';


//   component: 로그인, 회원가입   //
export default function Authentication() {
    //                    render                    //
    return (
        <div id="authentication-wrapper">
            <div className="authentication-box">
                <div className="authentication-container">
                    <div className="authentication-title h1">
                        {"Food Insight"}
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
