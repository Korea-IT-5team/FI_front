import React, { ChangeEvent, useEffect, useState } from 'react'
import "./style.css";
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { useCookies } from 'react-cookie';
import { deleteUserRequest } from 'src/apis/user';
import { USER_DELETE_FINALLY_ABSOLUTE_PATH } from 'src/constant';
import InputBox from 'src/components/InputBox';

// component: 회원탈퇴 // 
export default function UserDelete() {

  // state //
  const [cookies] = useCookies();
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const [isEqualPassword, setEqualPassword] = useState<boolean>(false);
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);

  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  const isUserDeleteActive = isEqualPassword && isPasswordPattern;
  const UserDeleteButtonClass = `${isUserDeleteActive ? 'primary' : 'disable'}-button full-width`;

  // function // 
  const navigator = useNavigate();

  const deleteUserResponse = (result: ResponseDto | null) => {

    const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
    }
    navigator(USER_DELETE_FINALLY_ABSOLUTE_PATH);
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

  const onUserDeleteClickHandler = () => {
    if (!cookies.accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    deleteUserRequest(cookies.accessToken).then(deleteUserResponse);
};

//                    effect                    //
  useEffect(() => {
    if (!cookies.accessToken) return;
    deleteUserRequest(cookies.accessToken)
        .then(deleteUserResponse);
  }, []);

  // render // 
  return (
    <div id='authentication-wrapper'>
      <div className='user-delete-container'>
        <div className='user-delete-box'>
          <div className='user-delete-title'>회원 탈퇴</div>
          <div className='user-delete-title-2'>회원 탈퇴 시 주의사항</div>
          <div className='user-delete-title-box'>
            <div className='user-delete-title-3'>1. 해당 휴대폰번호로 30일간 재가입 불가능</div>
            <div className='user-delete-title-3'>2. 회원정보 및 게시물 삭제</div>
          </div>
        </div>
        <div className='user-delete-password'>

          <InputBox label="비밀번호 재입력" type="password" value={password} placeholder="비밀번호를 입력해주세요" onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
        
        </div>
        <div className='user-delete-button-box'>
          <div className='error-button' onClick={onUserDeleteClickHandler}>회원 탈퇴하기</div>
        </div>
      </div>
    </div>
  )
}
