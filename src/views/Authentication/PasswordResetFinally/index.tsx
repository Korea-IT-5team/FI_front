import React from 'react'
import "./style.css"; 
import { SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useNavigate } from 'react-router';

// component: 비밀번호 재설정 완료 // 
export default function PasswordResetFinally() {

  // function //
  const navigation = useNavigate();

  // render //  
  return (
    <div className='password-reset-final-container'>
      <div className='password-reset-final-title'>비밀번호 재설정</div>
      <div className='password-reset-final-box'>
        <div className='password-reset-final-contents'>비밀번호가 성공적으로 변경되었습니다.</div>
        <div className='password-reset-final-link-button' onClick={() => {navigation(SIGN_IN_ABSOLUTE_PATH)}}>로그인</div>
      </div>
    </div>
  )
}
