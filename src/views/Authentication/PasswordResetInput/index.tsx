import React, { ChangeEvent, useState } from 'react'
import "./style.css"; 
import { emailCheckRequest, passwordResetRequest, telNumberAuthRequest } from 'src/apis/auth';
import { CheckEmailRequestDto, PasswordResetRequestDto, TelNumberAuthRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import InputBox from 'src/components/InputBox';
import { PASSWORD_RESET_CHECK_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';

// component: 비밀번호 재설정 (이메일 비밀번호) // 
export default function PasswordResetInput() {

  // state //
  const [userEmailId, setUserEmailId] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');

  const [userEmailIdButtonStatus, setUserEmailIdButtonStatus] = useState<boolean>(false);
  const [userTelNumberButtonStatus, setUserTelNumberButtonStatus] = useState<boolean>(false);

  const [isUserEmailIdPattern, setUserEmailIdPattern] = useState<boolean>(false);
  const [isUserTelNumberPattern, setUserTelNumberPattern] = useState<boolean>(false);

  const [userEmailIdMessage, setUserEmailIdMessage] = useState<string>('');
  const [userTelNumberMessage, setUserTelNumberMessage] = useState<string>('');

  const [isUserEmailIdError, setUserEmailIdError] = useState<boolean>(false);
  const [isUserTelNumberError, setUserTelNumberError] = useState<boolean>(false);

  const passwordResetInputButtonClass = `${userEmailId && userTelNumber ? 'primary' : 'disable'}-button full-width`;

  // function //
  const navigation = useNavigate();

  const passwordResetResponse = (result: ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
        result.code === 'AF' ? '사용자 정보와 불일치 합니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }
    navigation(PASSWORD_RESET_CHECK_ABSOLUTE_PATH(userEmailId));
  };

  // event handler //
  const onEmailIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setUserEmailId(value);
    setUserEmailIdButtonStatus(value !== '');
    setUserEmailIdMessage('');
  };

  const onUserTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserTelNumber(value);
    setUserTelNumberButtonStatus(value !== '');
    setUserTelNumberMessage('');
  };

  const onUserEmailIdButtonClickHandler = () => {
    if(!userEmailIdButtonStatus) return;

    const emailIdPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
    const isEmailIdPattern = emailIdPattern.test(userEmailId);
    setUserEmailIdPattern(isEmailIdPattern);

    if (!isEmailIdPattern) {
      setUserEmailIdMessage('이메일 형식이 아닙니다.');
      setUserEmailIdError(true);
      return;
    }
  };

  const onUserTelNumberButtonClickHandler = () => {
    if(!userTelNumberButtonStatus) return;

    const userTelNumberPattern = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
    const isUserTelNumberPattern = userTelNumberPattern.test(userTelNumber);
    setUserTelNumberPattern(isUserTelNumberPattern);

    if (!isUserTelNumberPattern) {
      setUserTelNumberMessage('전화번호 형식이 아닙니다.');
      setUserTelNumberError(true);
      return;
    }

    setUserTelNumberButtonStatus(false);
  };

  const onPasswordResetButtonClickHandler = () => {
    if(!userEmailId || !userTelNumber) {
        alert('모든 내용을 입력해주세요.');
        return;
    }

    const requestBody: PasswordResetRequestDto = {
      userEmailId: userEmailId,
      userTelNumber: userTelNumber
    }
    passwordResetRequest(requestBody).then(passwordResetResponse);
  };

  return (
    <div id='authentication-wrapper'>
      <div className='reset-password-container'>
        <div className='reset-password-title'>비밀번호 재설정</div>
        <div className='reset-password-box'>
          <div className='reset-password-input-container'>
            <InputBox type="text" value={userEmailId} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailIdChangeHandler} buttonStatus={userEmailIdButtonStatus} onButtonClickHandler={onUserEmailIdButtonClickHandler} message={userEmailIdMessage} error={isUserEmailIdError} />

            <InputBox type="text" value={userTelNumber} placeholder="전화번호를 입력해주세요" onChangeHandler={onUserTelNumberChangeHandler} buttonStatus={userTelNumberButtonStatus} onButtonClickHandler={onUserTelNumberButtonClickHandler} message={userTelNumberMessage} error={isUserTelNumberError} />
          </div>
          <div className={passwordResetInputButtonClass} onClick={onPasswordResetButtonClickHandler}>본인 확인</div>
        </div>
      </div>
    </div>
  )
}
