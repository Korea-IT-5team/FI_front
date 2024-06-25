import { useNavigate } from 'react-router';
import { ChangeEvent, useState } from 'react';

import InputBox from 'src/components/InputBox';

import ResponseDto from 'src/apis/response.dto';
import { PasswordResetRequestDto } from 'src/apis/auth/dto/request';

import { passwordResetRequest } from 'src/apis/auth';

import { PASSWORD_RESET_CHECK_ABSOLUTE_PATH } from 'src/constant';

import './style.css';

// component: 비밀번호 재설정(이메일 비밀번호) // 
export default function PasswordResetInput() {

  // state //
  const [userEmailId, setUserEmailId] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');

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
  };

  const onUserTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserTelNumber(value);
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
            <InputBox type="text" value={userEmailId} placeholder="이메일을 입력해주세요" onChangeHandler={onEmailIdChangeHandler} />
            <InputBox type="text" value={userTelNumber} placeholder="전화번호를 입력해주세요" onChangeHandler={onUserTelNumberChangeHandler} />
          </div>
          <div className={passwordResetInputButtonClass} onClick={onPasswordResetButtonClickHandler}>본인 확인</div>
        </div>
      </div>
    </div>
  )
}
