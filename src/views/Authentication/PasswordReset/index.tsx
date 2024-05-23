import React, { ChangeEvent, useState } from 'react'
import "./style.css"; 
import { emailCheckRequest, passwordResetRequest, telNumberAuthRequest } from 'src/apis/auth';
import { CheckEmailRequestDto, PasswordResetRequestDto, TelNumberAuthRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';

// component: 비밀번호 찾기 // 
export default function PasswordReset() {

  // state //
  const [emailId, setEmailId] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');

  const [emailIdButtonStatus, setEmailIdButtonStatus] = useState<boolean>(false);
  const [userTelNumberButtonStatus, setUserTelNumberButtonStatus] = useState<boolean>(false);

  const [isEmailIdCheck, setEmailIdCheck] = useState<boolean>(false);
  const [isEmailIdPattern, setEmailIdPattern] = useState<boolean>(false);
  const [isUserTelNumberCheck, setUserTelNumberCheck] = useState<boolean>(false);
  const [isUserTelNumberPattern, setUserTelNumberPattern] = useState<boolean>(false);

  const [emailIdMessage, setEmailIdMessage] = useState<string>('');
  const [userTelNumberMessage, setUserTelNumberMessage] = useState<string>('');

  const [isEmailIdError, setEmailIdError] = useState<boolean>(false);
  const [isUserTelNumberError, setUserTelNumberError] = useState<boolean>(false);

  const isResetPasswordActive = isEmailIdCheck && isEmailIdPattern &&isUserTelNumberCheck && isUserTelNumberPattern;
  const signUpButtonClass = `${isResetPasswordActive ? 'primary' : 'disable'}-button full-width`;

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

  const resetPasswordResponse = (result: ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
        result.code === 'NF' ? '사용자 정보 불일치.' :
        result.code === 'SF' ? '인증번호 전송 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }
  };

  // event handler //
  const onEmailIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setEmailId(value);
    setEmailIdButtonStatus(value !== '');
    setEmailIdCheck(false);
    setEmailIdMessage('');
  };

  const onUserTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserTelNumber(value);
    setUserTelNumberButtonStatus(value !== '');
    setUserTelNumberCheck(false);
    setUserTelNumberMessage('');
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

  const onResetPasswordButtonClickHandler = () => {
    if(!isResetPasswordActive) return;
    if(!emailId || !userTelNumber) {
        alert('모든 내용을 입력해주세요.');
        return;
    }

    const requestBody: PasswordResetRequestDto = {
      userEmailId: emailId,
      userTelNumber: userTelNumber
    }
    passwordResetRequest(requestBody).then(resetPasswordResponse);
  };

  return (
    <div className='reset-password-container'>
      <div className='reset-password-title'>비밀번호 재설정</div>
      <div className='reset-password-input'>
        <div className='reset-password-email'>이메일</div>
        <div className='reset-password-tel-number'>전화번호</div>
      </div>
      <div className='reset-password-button'>재설정 링크 전송</div>
    </div>
  )
}
