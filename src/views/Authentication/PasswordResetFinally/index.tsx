import React from 'react'
import "./style.css"; 
import { SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';

// component: 비밀번호 재설정 완료 // 
export default function PasswordResetFinally() {

  // function //
  const navigator = useNavigate();

  // render //  
  return (
    <div className='reset-password-container'>
      <div className='reset-password-title'>비밀번호 재설정</div>
      <div className='reset-password-box'>
        <div className='reset-password-input'>
          <div className='reset-password-title'>비밀번호가 성공적으로 변경되었습니다.</div>
        </div>
        <div className='reset-password-link-title' onClick={() => {navigator(SIGN_IN_ABSOLUTE_PATH)}}>로그인 하기</div>
      </div>
    </div>
  )
}
