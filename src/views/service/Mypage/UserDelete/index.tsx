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
  const { loginUserRole, setLoginUserEmailId, setLoginUserRole} = useUserStore();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [password, setPassword] = useState<string>('');
  const [isPasswordPattern, setPasswordPattern] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  
  // function //
  const navigation = useNavigate();
  
  const deleteUserResponse = (result: ResponseDto | null) => {
    const message = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '권한이 없습니다.' :
      result.code === 'NU' ? '사용자 정보가 일치하지 않습니다.' :
      result.code === 'VF' ? '비밀번호를 입력해주세요.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU'){
      alert(message);
      return;
    }
    alert('회원탈퇴가 성공하였습니다.');

    removeCookie('accessToken', { path: '/' });
    navigation(MAIN_ABSOLUTE_PATH);
    setLoginUserEmailId("");
    setLoginUserRole("");
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
    
    const isConfirm = window.confirm('정말로 삭제하시겠습니까? 삭제하면 회원의 모든 내역이 사라집니다.');
    if (!isConfirm) return;

    const requestData: DeleteUserRequestDto = { password };
    deleteUserRequest(userEmailId, requestData, cookies.accessToken).then(deleteUserResponse);
  };

  // effect // 
  useEffect(() => {
    if (!cookies.accessToken || !userEmailId) return;
  }, [cookies.accessToken]);

  // render // 
  return (
    <div id='resign-wrapper'>
      <div className='resign-container'>
        <div className='resign-title'>회원 탈퇴</div>
        <div className='resign-box'>
          <div className='resign-content caution-title'>회원 탈퇴 시 주의사항!</div>
          <div className='resign-content caution-contents'>1. 회원 정보 및 모든 게시물(리뷰, 문의) 삭제 처리됨
            <p>
              회원탈퇴 즉시 아래에 해당하는 개인정보가 삭제됩니다.
              <br />
              개인정보 : 이메일 계정, 비밀번호, 휴대폰번호, 생일, 성별 정보 삭제
            </p>
          </div>
          {/* <div className='resign-content caution-contents'>2. 30일간 동일한 전화번호로 가입 불가능
            <p>
              회원탈퇴를 신청하시면 해당 닉네임은 즉시 탈퇴 처리되며
              <br />
              기존에 사용하던 휴대폰번호로는 30일 동안 재가입이 불가합니다.
            </p>
          </div> */}
        </div>
        <div className='resign-password'>
          <InputBox label="비밀번호 재입력" type="password" value={password} placeholder="비밀번호를 입력해주세요." onChangeHandler={onPasswordChangeHandler} message={passwordMessage} error />
        </div>
        <div className='error-button delete' onClick={onUserDeleteButtonClickHandler}>회원 탈퇴하기</div>
      </div>
    </div>
  )
}