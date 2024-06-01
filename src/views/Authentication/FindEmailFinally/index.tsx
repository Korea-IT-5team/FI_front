import { useNavigate } from 'react-router';
import "./style.css";
import { FIND_EMAIL_INPUT_ABSOLUTE_PATH, PASSWORD_RESET_INPUT_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useAuthStore } from 'src/stores';
import { FindEmailResponseDto } from 'src/apis/auth/dto/response';
import { findEmailRequest } from 'src/apis/auth';
import { FindEmailRequestDto } from 'src/apis/auth/dto/request';
import { useEffect } from 'react';

// component: 이메일 찾기 완료 //
export default function FindEmailFinally() {

    // state // 
    const { userEmailId, setUserEmailId, userName, userTelNumber } = useAuthStore();

    // function //
    const navigator = useNavigate();

    
    // effect //
    useEffect(() => {
        const fetchEmail = async () => {
            try {
                // 이메일 찾기 요청 데이터를 구성
                const requestBody: FindEmailRequestDto = {
                    userName: userName,
                    userTelNumber: userTelNumber
                };
                console.log("req")
    
                // 서버로 이메일 찾기 요청
                const response = await findEmailRequest(requestBody);

                // 결과가 없거나 실패한 경우
                if (!response || response.code !== 'SU') {
                    const message =
                        !response ? '서버에 문제가 있습니다.' : 
                        response.code === 'VF' ? '유효성 검사 실패했습니다.' :
                        response.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
                    alert(message);
                    
                    // 필요에 따라 다른 경로로 이동할 수 있음
                    // navigator(FIND_EMAIL_INPUT_ABSOLUTE_PATH);
                    return;
                }

                // 성공한 경우 userEmailId 설정
                setUserEmailId((response as FindEmailResponseDto).userEmailId);
            } catch (error) {
                console.error('이메일 요청 오류:', error);
            }
        };

        // 컴포넌트가 마운트될 때 한 번만 실행
        fetchEmail();
    }, [setUserEmailId]); 
  
    // render // 
    return (
        <div id='authentication-wrapper'>
            <div className='find-email-container'>
                <div className='find-email-title'>이메일 찾기</div>
                <div className='find-email-box'>
                    <div className='find-email-finally'>{userEmailId}</div>
                    <div className='find-container'>
                        <div className='find-email-sign-button'>
                            <div className="text-link" onClick={() => {navigator(SIGN_IN_ABSOLUTE_PATH)}}>로그인 하기</div> 
                        </div>
                        <div className="find-divider">{'\|'}</div>
                        <div className='find-email-password-button'>
                            <div className="text-link" onClick={() => {navigator(PASSWORD_RESET_INPUT_ABSOLUTE_PATH)}}>비밀번호 재설정</div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}