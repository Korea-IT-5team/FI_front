import React, { ChangeEvent, useEffect, useState } from 'react'
import "./style.css";
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { useCookies } from 'react-cookie';
import { deleteUserRequest } from 'src/apis/user';
import { MAIN_ABSOLUTE_PATH } from 'src/constant';
import InputBox from 'src/components/InputBox';
import { useUserStore } from 'src/stores';
import { DeleteUserRequestDto } from 'src/apis/user/dto/request';

// component: 회원탈퇴 // 
export default function UserDelete() {

  // state //
  const { userEmailId } = useParams();
  const { loginUserRole } = useUserStore();
  const [cookies] = useCookies();
  // const [userEmailId, setUserEmailId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  
  // function // 
  const navigator = useNavigate();
  
  const deleteUserResponse = (result: ResponseDto | null) => {
    
    const message = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '권한이 없습니다.' :
      result.code === 'NU' ? '사용자 정보가 일치하지 않습니다.' :
      result.code === 'VF' ? '비밀번호가 유효하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    // 성공 안됨
    alert('회원탈퇴가 성공하였습니다.');
    navigator(MAIN_ABSOLUTE_PATH);
  };

  // event handler // 
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);

    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isPasswordPattern = passwordPattern.test(password);
    setPasswordPattern(isPasswordPattern);

    const passwordMessage = 
      isPasswordPattern ? '' :
      password ? '영문, 숫자를 혼용하여 8~13자 입력해주세요.' : '';
    setPasswordMessage(passwordMessage);

  };

  const onUserDeleteButtonClickHandler = () => {
    if (!userEmailId || !cookies.accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!isConfirm) return;

    deleteUserRequest(userEmailId, cookies.accessToken).then(deleteUserResponse);
  };

  // effect // 
  useEffect(() => {
    if (!cookies.accessToken || !userEmailId) return;
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
          <div className='error-button' onClick={onUserDeleteButtonClickHandler}>회원 탈퇴하기</div>
        </div>
        
      </div>
    </div>
  )
}
