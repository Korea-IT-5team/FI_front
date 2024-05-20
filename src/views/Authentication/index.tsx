import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { signInRequest } from 'src/apis/auth';
import { SignInRequestDto } from 'src/apis/auth/dto/request';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/inputBox/Index';
import { MAIN_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';

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
function SignIn({onLinkClickHandler}: Props) {

  // state //
  const [cookie, setCookie] = useCookies();

  const [emailId, setEmailId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  // function // 
  const navigator = useNavigate();

  const signInResponse = (result: SignInResponseDto | ResponseDto | null) => {

    const message = 
    !result ? '서버에 문제가 있습니다.' :
    result.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' : 
    result.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
    result.code === 'TF' ? '서버에 문제가 있습니다.' :
    result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
  setMessage(message);

  const isSuccess = result && result.code === 'SU';
  if (!isSuccess) return;

  const { accessToken, expires } = result as SignInResponseDto;
  const expiration = new Date(Date.now() + (expires * 1000));
  setCookie('accessToken', accessToken, {path: '/', expires: expiration})

  navigator(MAIN_PATH);
  };

  // event handler //
  const onEmailIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailId(event.target.value);
    setMessage('');
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setMessage('');
  };

  const onPasswordKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onSignInButtonClickHandler();
  };

  const onSignInButtonClickHandler = () => {
        
    if (!emailId || !password) {
        setMessage('이에일과 비밀번호를 모두 입력하세요.');
        return;
    }

    const requestBody: SignInRequestDto = {
        userEmailId: emailId,
        password: password
    }
    signInRequest(requestBody).then(signInResponse);
    
  };


  //   render   //
  return(
    <div className="authentication-contents">
    <div className="authentication-input-container">
        <InputBox label="아이디" type="text" value={emailId} placeholder="아이디를 입력해주세요" onChangeHandler={onEmailIdChangeHandler} />
        <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} onKeydownHandler={onPasswordKeydownHandler} message={message} error />
    </div>
    <div className="authentication-button-container">
        <div className="primary-button full-width" onClick={onSignInButtonClickHandler}>로그인</div>
        <div className="text-link" onClick={onLinkClickHandler}>회원가입</div>
    </div>
    <div className="short-divider"></div>
    <SnsContainer title="SNS 로그인" />
</div>
  );
}

//   component: 회원가입   //
function SignUp({onLinkClickHandler}: Props) {

  //   state   //
  const [emailId, setEmailId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');

  const [emailIdButtonStatus, setEmailIdButtonStatus] = useState<boolean>(false);
  const [nicknameButtonStatus, setNicknameButtonStatus] = useState<boolean>(false);
  const [userTelNumberButtonStatus, setUserTelNumberButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);
  const [userAddressButtonStatus, setUserAddressButtonStatus] = useState<boolean>(false);

  const [isEmailIdCheck, setEmailIdCheck] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
  const [isNicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [isUserTelNumberCheck, setUserTelNumberCheck] = useState<boolean>(false);
  const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);
  const [isUserAddress, setUserAddressCheck] = useState<boolean>(false);

  const [emailIdMessage, setEmailIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [userTelNumberMessage, setUserTelNumberMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

  const [isEmailIdError, setEmailIdError] = useState<boolean>(false);
  const [isNicknameError, setNicknameError] = useState<boolean>(false);
  const [isUserTelNumberError, setUserTelNumberError] = useState<boolean>(false);
  const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);
  const [isUserAddressError, setUserAddressError] = useState<boolean>(false);

  const isSignUpActive = isEmailIdCheck && isPasswordPattern && isEqualPassword && isNicknameCheck && isAuthNumberCheck && isUserAddress;
  const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`;

  // function //
  const emailCheckResponse = (result: ResponseDto | null) => {
    
    const emailMessage = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '이메일 형식에 맞지 않습니다.' :
      result.code === 'DE' ?  '이미 사용중인 이메일입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '사용 가능한 이메일입니다.' : '';
    const emailCheck =  result !== null && result.code === 'SU';
    const emailError = !emailCheck;

    setEmailIdMessage(emailMessage);
    setEmailIdCheck(emailCheck);
    setEmailIdError(emailError);
  };

  const nicknameCheckResponse = (result: ResponseDto | null) => {
    
    const nicknameMessage = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '닉네임은 빈 값 혹은 공백으로만 이루어질 수 없습니다.' :
      result.code === 'SF' ?  '이미 사용중인 닉네임입니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '사용 가능한 닉네임입니다.' : '';
    const nicknameError = !(result && result.code === 'SU');
    const nicknameCheck = !nicknameError;

    setNicknameMessage(nicknameMessage);
    setNicknameError(nicknameError);
    setNicknameCheck(nicknameCheck);
  };

  const userTelNumberResponse = (result: ResponseDto | null) => {
    
    const userTelNumberMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '인증번호를 입력해주세요.' : 
      result.code === 'SF' ? '인증번호 전송이 실패하였습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
    const userTelNumberCheck = result !== null && result.code === 'SU';
    const UserTelNumberError = !userTelNumberCheck;

    setUserTelNumberMessage(authNumberMessage);
    setUserTelNumberCheck(userTelNumberCheck);
    setUserTelNumberError(UserTelNumberError);
  };

  const userTelNumberCheckResponse = (result: ResponseDto | null) => {
    
    const authNumberMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '인증번호를 입력해주세요.' : 
      result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
    const authNumberCheck = result !== null && result.code === 'SU';
    const authNumberError = !authNumberCheck;

    setAuthNumberMessage(authNumberMessage);
    setAuthNumberCheck(authNumberCheck);
    setAuthNumberError(authNumberError);
  };

  const userAddressResponse = (result: ResponseDto | null) => {
    
    const userAddressMessage = 
      !result ? '서버에 문제가 있습니다.' : 
      result.code === 'VF' ? '인증번호를 입력해주세요.' : 
      result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' :
      result.code === 'SU' ? '인증번호가 확인되었습니다.' : '';
    const authNumberCheck = result !== null && result.code === 'SU';
    const authNumberError = !authNumberCheck;

    setAuthNumberMessage(authNumberMessage);
    setAuthNumberCheck(authNumberCheck);
    setAuthNumberError(authNumberError);
  };
  
  // event handler // 
  const onEmailIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailId(value);
    setEmailIdButtonStatus(value !== '');
    setEmailIdCheck(false);
    setEmailIdMessage('');
  };

  

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
