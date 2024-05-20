import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { SignInRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

//   component: Sns 로그인   //
export function Sns() {

  // state //
  const { accessToken, expires } = useParams();
  const [cookies, setCookie] = useCookies();

  // function //
  const navigator = useNavigate();

  // effect //
  useEffect(() => {
    if (!accessToken || !expires) return;
    const expiration = new Date(Date.now() + (Number(expires) * 1000));
    setCookie('accessToken', accessToken, { path: '/', expires: expiration });

    navigator(SIGN_IN_ABSOLUTE_PATH);
}, []);

  //   render   //
  return(
    <></>
  );
}

// type //
type AuthPage = 'sign-in' | 'sign-up';

// interface //
interface SnsContainerProps {
  title: string;
}

// component // 
function SnsContainer({ title }: SnsContainerProps) {

  // event handler //
  const onSnsButtonClickHandler = (type: 'kakao' | 'naver') => {
    // 주소 확인
      window.location.href = 'http://localhost:9999/api/v1/auth/oauth2/' + type;
  };
    // render: sns화면 //
    return (
      <div className="authentication-sns-container">
          <div className="sns-container-title label">{title}</div>
          <div className="sns-button-container">
              <div className="sns-button kakao-button" onClick={() => onSnsButtonClickHandler('kakao')}></div>
              <div className="sns-button naver-button" onClick={() => onSnsButtonClickHandler('naver')}></div>
          </div>
      </div>
  );
}

// interface //
interface Props {
  onLinkClickHandler: () => void
}

//   component: 로그인   //
function SignIn() {

  // state //
  const [cookie, setCookie] = useCookies();
  const [Email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // function // 
  const navigator = useNavigate();

  const signInResponse = (result: SignInRequestDto | ResponseDto | null) => {
    
  }

  //   render   //
  return(
    <></>
  );
}

//   component: 회원가입   //
function SignUp() {
  //   state   //
  const [Email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  //   render   //
  return(
    <></>
  );
}

//   component: 사업자등록번호 확인   //
function BusinessRegistrationCheck() {

  //   render   //
  return(
    <></>
  );
}

//   component: 로그인, 회원가입   //
export default function Authentication() {

  //   render   //
  return (
    <div></div>
  );
}
