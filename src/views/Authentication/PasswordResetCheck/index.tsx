import React, { ChangeEvent, useState } from 'react'
import "./style.css"; 
import { emailCheckRequest, newPasswordRequest, passwordResetRequest, telNumberAuthRequest } from 'src/apis/auth';
import { CheckEmailRequestDto, NewPasswordRequestDto, PasswordResetRequestDto, TelNumberAuthRequestDto } from 'src/apis/auth/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';
import InputBox from 'src/components/InputBox';
import { PASSWORD_RESET_FINALLY_ABSOLUTE_PATH } from 'src/constant';

// component: 비밀번호 찾기 // 
export default function PasswordResetCheck() {

  // state //
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);

  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  const isResetPasswordCheckActive = isPasswordPattern && isEqualPassword;
  const passwordResetCheckButtonClass = `${isResetPasswordCheckActive ? 'primary' : 'disable'}-button full-width`;

  // function //
  const navigator = useNavigate();

  const passwordResetCheckResponse = (result: ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }
  };

  // event handler //
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

  const handleRefreshCaptcha = () => {
    // 캡차 이미지 새로고침 코드
  };

  const isCaptCha = () => {
    // 캡차 이미지 검증 코드
    return true; // 임시로 항상 true를 반환
  };

  const onPasswordResetCheckButtonClickHandler = () => {
    if(!isResetPasswordCheckActive) return;
    if(!password || !passwordCheck) {
        alert('모든 내용을 입력해주세요.');
        return;
    }
    if (!isCaptCha()) {
      alert('자동입력 방지문자가 일치하지 않습니다.');
      return;
    } else {
      alert('자동입력 방지문자가 일치합니다.');
    }

    const requestBody: NewPasswordRequestDto = {
      password: password,
      linkCode: ''
    }
    newPasswordRequest(requestBody).then(passwordResetCheckResponse);
    navigator(PASSWORD_RESET_FINALLY_ABSOLUTE_PATH);
  };
  
  // render //
  return (
    <div id='authentication-wrapper'>
      <div className='reset-password-container'>
        <div className='reset-password-title'>비밀번호 재설정</div>
        <div className='reset-password-box'>
          <div className='reset-password-input-container'>

            <InputBox type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
            <InputBox type="password" value={passwordCheck} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordCheckChangeHandler} message={passwordCheckMessage} error />

          </div>
          <div className={passwordResetCheckButtonClass} onClick={onPasswordResetCheckButtonClickHandler}>재설정</div>
        </div>
      </div>
    </div>
  )
}
