import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import "./style.css";
import SignInBackground from 'src/assets/image/sign-in-background.png';
import SignUpBackground from 'src/assets/image/sign-up-background.png';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { checkNicknameRequest, emailCheckRequest, signInRequest, signUpRequest, telNumberAuthCheckRequest, telNumberAuthRequest } from 'src/apis/auth';
import { CheckEmailRequestDto, CheckNicknameDto, SignInRequestDto, SignUpRequestDto, TelNumberAuthCheckRequestDto, TelNumberAuthRequestDto } from 'src/apis/auth/dto/request';
import { SignInResponseDto } from 'src/apis/auth/dto/response';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/inputBox/Index';
import { MAIN_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useAuthStore } from 'src/stores';

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
        <InputBox label="이메일" type="text" value={emailId} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailIdChangeHandler} />
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
  const { 
    emailId, setEmailId,
    password, setPassword,
    nickname, setNickname,
    userTelNumber, setUserTelNumber,
    authNumber, setAuthNumber,
    userAddress, setUserAddress,
    userName, setUserName
    } = useAuthStore();
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const [emailIdButtonStatus, setEmailIdButtonStatus] = useState<boolean>(false);
  const [nicknameButtonStatus, setNicknameButtonStatus] = useState<boolean>(false);
  const [userTelNumberButtonStatus, setUserTelNumberButtonStatus] = useState<boolean>(false);
  const [authNumberButtonStatus, setAuthNumberButtonStatus] = useState<boolean>(false);

  const [isEmailIdCheck, setEmailIdCheck] = useState<boolean>(false);
  const [isEmailIdPattern, setEmailIdPattern] = useState<boolean>(false);
  const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [isNicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [isUserTelNumberCheck, setUserTelNumberCheck] = useState<boolean>(false);
  const [isUserTelNumberPattern, setUserTelNumberPattern] = useState<boolean>(false);
  const [isAuthNumberCheck, setAuthNumberCheck] = useState<boolean>(false);

  const [emailIdMessage, setEmailIdMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [UserNameMessage, setUserNameMessage] = useState<string>('');
  const [userTelNumberMessage, setUserTelNumberMessage] = useState<string>('');
  const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
  const [userAddressMessage, setUserAddressMessage] = useState<string>('');

  const [isEmailIdError, setEmailIdError] = useState<boolean>(false);
  const [isNicknameError, setNicknameError] = useState<boolean>(false);
  const [isUserTelNumberError, setUserTelNumberError] = useState<boolean>(false);
  const [isAuthNumberError, setAuthNumberError] = useState<boolean>(false);

  const isSignUpActive = isEmailIdCheck && isEmailIdPattern && isPasswordPattern && isEqualPassword && isUserTelNumberCheck && isNicknameCheck && isUserTelNumberPattern && isAuthNumberCheck;
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

    setUserTelNumberMessage(userTelNumberMessage);
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

  const signUpResponse = (result: ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
        result.code === 'DE' ? '중복된 이메일입니다.' :
        result.code === 'DN' ? '중복된 닉네임입니다.' :
        result.code === 'SF' ? '인증번호 전송 실패했습니다.' :
        result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }
    onLinkClickHandler();

};

  // event handler // 
  const onEmailIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailId(value);
    setEmailIdButtonStatus(value !== '');
    setEmailIdCheck(false);
    setEmailIdMessage('');
  };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPassword(value);

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isPasswordPattern = passwordPattern.test(value);
    setPasswordPattern(isPasswordPattern);

    const passwordMessage = 
      isPasswordPattern ? '' :
      value ? '영문, 숫자를 혼용하여 8~13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

    const isEqualPassword = passwordCheck === value;
      setEqualPassword(isEqualPassword);

    const passwordCheckMessage = 
      isEqualPassword ? '' : 
      passwordCheck ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPasswordCheck(value);

    const isEqualPassword = password === value;
    setEqualPassword(isEqualPassword);

    const passwordCheckMessage = 
      isEqualPassword ? '' : 
      value ? '비밀번호가 일치하지 않습니다.' : '';
    setPasswordCheckMessage(passwordCheckMessage);
  };

  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickname(value);
    setNicknameButtonStatus(value !== '');
    setNicknameCheck(false);
    setNicknameMessage('');
  };

  const onUserNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserName(value);
    setUserNameMessage('');
  };

  const onUserTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserTelNumber(value);
    setUserTelNumberButtonStatus(value !== '');
    setUserTelNumberCheck(false);
    setAuthNumberCheck(false);
    setUserTelNumberMessage('');
  };

  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setAuthNumberButtonStatus(value !== '');
    setAuthNumberCheck(false);
    setAuthNumberMessage('');
  };

  const onUserAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserAddress(value);
    setUserAddressMessage('');
  };
  
  // button // 
  const onEmailIdButtonClickHandler = () => {
    if(!emailIdButtonStatus) return;

    const emailIdPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmailIdPattern = emailIdPattern.test(emailId);
    setEmailIdPattern(isEmailIdPattern);

    if (!isEmailIdPattern) {
      setEmailIdMessage('이메일 형식이 아닙니다.');
      setEmailIdError(true);
      setEmailIdCheck(false);
      return;
    }

    const requestBody: CheckEmailRequestDto = { userEmailId: emailId };
    emailCheckRequest(requestBody).then(emailCheckResponse);
  };

  const onNicknameButtonClickHandler = () => {
    if(!nicknameButtonStatus) return;
    if(!nickname || !nickname.trim()) return;

    const requestBody: CheckNicknameDto = { nickname: nickname };
    checkNicknameRequest(requestBody).then(nicknameCheckResponse);
  };

  const onUserTelNumberButtonClickHandler = () => {
    if(!userTelNumberButtonStatus) return;

    const userTelNumberPattern = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    const isUserTelNumberPattern = userTelNumberPattern.test(userTelNumber);
    setUserTelNumberPattern(isUserTelNumberPattern);

    if (!isUserTelNumberPattern) {
      setUserTelNumberMessage('전화번호 형식이 아닙니다.');
      setUserTelNumberError(true);
      setUserTelNumberCheck(false);
      return;
    }

    const requestBody: TelNumberAuthRequestDto = { userTelNumber: userTelNumber };
    telNumberAuthRequest(requestBody).then(userTelNumberResponse);
  };

  const onAuthNumberButtonClickHandler = () => {
    if(!authNumberButtonStatus) return;
    if(!authNumber) return;

    const requestBody: TelNumberAuthCheckRequestDto = {
      userTelNumber: userTelNumber,
      authNumber
    };
    telNumberAuthCheckRequest(requestBody).then(userTelNumberCheckResponse);
  };

  const onSignUpButtonClickHandler = () => {
    if(!isSignUpActive) return;
    if(!emailId || !password || !passwordCheck || !nickname || !userName || !userTelNumber ||!authNumber || !userAddress) {
        alert('모든 내용을 입력해주세요.');
        return;
    }

    const requestBody: SignUpRequestDto = {
      userEmailId: emailId,
      password: password,
      nickname: nickname,
      userName: userName,
      userTelNumber: userTelNumber,
      authNumber: authNumber,
      userAddress: userAddress
    }
    signUpRequest(requestBody).then(signUpResponse);
};

// 사원등록 번호 인증 버튼 핸들러 추가
// 일반회원 건너띄기 버튼 핸들러 추가 

  //   render   //
  return(
    <div className="authentication-contents">
      <SnsContainer title="SNS 회원가입" />
      <div className="short-divider"></div>
      <div className="authentication-input-container">

          <InputBox label="이메일" type="text" value={emailId} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailIdChangeHandler} buttonTitle="중복 확인" buttonStatus={emailIdButtonStatus} onButtonClickHandler={onEmailIdButtonClickHandler} message={emailIdMessage} error={isEmailIdError} />

          <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />

          <InputBox label="비밀번호 확인" type="password" value={passwordCheck} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

          <InputBox label="닉네임" type="text" value={nickname} placeholder="닉네임을 입력해주세요" onChangeHandler={onNicknameChangeHandler} buttonTitle="중복 확인" buttonStatus={nicknameButtonStatus} onButtonClickHandler={onNicknameButtonClickHandler} message={nicknameMessage} error={isNicknameError} />

          <InputBox label="이름" type="text" value={userName} placeholder="이름을 입력해주세요" onChangeHandler={onUserNameChangeHandler} message={UserNameMessage} error />

          <InputBox label="전화번호" type="text" value={userTelNumber} placeholder="전화번호를 입력해주세요" onChangeHandler={onUserTelNumberChangeHandler} buttonTitle="인증번호 전송" buttonStatus={userTelNumberButtonStatus} onButtonClickHandler={onUserTelNumberButtonClickHandler} message={userTelNumberMessage} error={isUserTelNumberError} />

          {isUserTelNumberCheck && 
          <InputBox label="인증번호" type="text" value={authNumber} placeholder="인증번호 6자리를 입력해주세요" onChangeHandler={onAuthNumberChangeHandler} buttonTitle="인증 확인" buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />}

          <InputBox label="주소" type="text" value={userName} placeholder="주소를 입력해주세요" onChangeHandler={onUserAddressChangeHandler} message={userAddressMessage} error />
      </div>
      <div className="authentication-button-container">
          <div className={signUpButtonClass} onClick={onSignUpButtonClickHandler}>회원가입</div>
          <div className="text-link" onClick={onLinkClickHandler}>로그인</div>
      </div>
  </div>
  );
}

//   component: 사업자등록번호 확인   //
function BusinessRegistration() {

  // state //
  const { emailId, password, nickname, userTelNumber,authNumber,userAddress,userName} = useAuthStore();

  // function //
  const navigator = useNavigate();

  // 기능적 부분에서는 추가할 사항 없고 render부분 추가하기 
  //   render   //
  return(
    <></>
  );
}

//   component: 로그인, 회원가입   //
export default function Authentication() {

  //                    state                    //
  const [page, setPage] = useState<AuthPage>('sign-in');

  //                    event handler                    //
  const onLinkClickHandler = () => {
      if (page === 'sign-in') setPage('sign-up');
      else setPage('sign-in');
  };

  //                    constant                    //
  const AuthenticationContents = 
      page === 'sign-in' ? 
          <SignIn onLinkClickHandler={onLinkClickHandler} /> : 
          <SignUp onLinkClickHandler={onLinkClickHandler} />;

  //                    render                    //
  return (
      <div id="authentication-wrapper">
          <div className="authentication-box">
              <div className="authentication-container">
                  <div className="authentication-title h1">
                      {"Food Insight"}
                  </div>
                  { AuthenticationContents }
              </div>
          </div>
      </div>
  );
}
