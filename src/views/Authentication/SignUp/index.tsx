import { ChangeEvent, useEffect, useState } from 'react';
import { checkNicknameRequest, emailCheckRequest, signUpRequest, telNumberAuthCheckRequest, telNumberAuthRequest } from 'src/apis/auth';
import { CheckEmailRequestDto, CheckNicknameDto, SignUpRequestDto, CheckTelNumberAuthRequestDto, TelNumberAuthRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/InputBox';
import { useAuthStore } from 'src/stores';
import "./style.css";
import { BUSINESS_REGISTRATION_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

//   component: 회원가입   //
export default function SignUp() {

  //   state   //
  const [searchParam, setSearchParam] = useSearchParams();

  const { 
    emailId, setEmailId,
    password, setPassword,
    nickname, setNickname,
    userTelNumber, setUserTelNumber,
    authNumber, setAuthNumber,
    userAddress, setUserAddress,
    userName, setUserName,
    setJoinPath, setSnsId
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

  const isSignUpActive = isEmailIdCheck && isEmailIdPattern && isEqualPassword && isPasswordPattern && isNicknameCheck && isUserTelNumberCheck && isUserTelNumberPattern && isAuthNumberCheck;
  const signUpButtonClass = `${isSignUpActive ? 'primary' : 'disable'}-button full-width`;

  // function //
  const navigator = useNavigate();
  
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

    const requestBody: CheckTelNumberAuthRequestDto = {
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

    const joinPath = searchParam.get('joinPath');
    if (joinPath) setJoinPath(joinPath);
    const snsId = searchParam.get('snsId');
    if (snsId) setSnsId(snsId);

    navigator(BUSINESS_REGISTRATION_ABSOLUTE_PATH);
};

  //   render   //
  return(
    <div id='authentication-wrapper'>
      <div className="authentication-contents">
        <div className="authentication-sign-title">회원가입</div>
        <div className="authentication-sign-container">
          <div className="authentication-input-container">

              <InputBox label="이메일" type="text" value={emailId} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailIdChangeHandler} buttonTitle="중복 확인" buttonStatus={emailIdButtonStatus} onButtonClickHandler={onEmailIdButtonClickHandler} message={emailIdMessage} error={isEmailIdError} />

              <InputBox label="비밀번호" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />

              <InputBox label="비밀번호 확인" type="password" value={passwordCheck} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

              <InputBox label="닉네임" type="text" value={nickname} placeholder="닉네임을 입력해주세요" onChangeHandler={onNicknameChangeHandler} buttonTitle="중복 확인" buttonStatus={nicknameButtonStatus} onButtonClickHandler={onNicknameButtonClickHandler} message={nicknameMessage} error={isNicknameError} />

              <InputBox label="이름" type="text" value={userName} placeholder="이름을 입력해주세요" onChangeHandler={onUserNameChangeHandler} message={UserNameMessage} error />

              <InputBox label="전화번호" type="text" value={userTelNumber} placeholder="전화번호를 입력해주세요" onChangeHandler={onUserTelNumberChangeHandler} buttonTitle="인증번호 전송" buttonStatus={userTelNumberButtonStatus} onButtonClickHandler={onUserTelNumberButtonClickHandler} message={userTelNumberMessage} error={isUserTelNumberError} />

              {isUserTelNumberCheck && 
              <InputBox label="인증번호" type="text" value={authNumber} placeholder="인증번호 6자리를 입력해주세요" onChangeHandler={onAuthNumberChangeHandler} buttonTitle="인증 확인" buttonStatus={authNumberButtonStatus} onButtonClickHandler={onAuthNumberButtonClickHandler} message={authNumberMessage} error={isAuthNumberError} />}

              <InputBox label="주소" type="text" value={userAddress} placeholder="주소를 입력해주세요" onChangeHandler={onUserAddressChangeHandler} message={userAddressMessage} error />
          </div>
          <div className="authentication-button-container">
              <div className={signUpButtonClass} onClick={onSignUpButtonClickHandler}>회원가입</div>
              <div className="text-link" onClick={() => {navigator(SIGN_IN_ABSOLUTE_PATH)}}>로그인</div>
          </div>
        </div>
    </div>
  </div>  
  );
}

