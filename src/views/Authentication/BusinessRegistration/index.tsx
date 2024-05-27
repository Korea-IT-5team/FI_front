import { useNavigate } from "react-router";
import { BUSINESS_REGISTRATION_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import { useAuthStore } from "src/stores";
import "./style.css";
import InputBox from "src/components/InputBox";
import { useState } from "react";
import { SignUpRequestDto } from "src/apis/auth/dto/request";
import { signUpRequest } from "src/apis/auth";
import ResponseDto from "src/apis/response.dto";

//   component: 사업자등록번호 확인   //
export default function BusinessRegistration() {

    // state //
    const { emailId, password, nickname, userTelNumber, authNumber, userAddress, userName, joinPath, snsId } = useAuthStore();

    const [businessRegistration, setBusinessRegistration] = useState<string>('');
    const [businessRegistrationStatus, setBusinessRegistrationStatus] = useState<boolean>(false);
    const [businessRegistrationCheck, setBusinessRegistrationCheck] = useState<boolean>(false);
    const [businessRegistrationError, setBusinessRegistrationError] = useState<boolean>(false);

    // function //
    const navigator = useNavigate();

    const signUpResponse = (result: ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 형식이 맞지 않습니다.' : 
            result.code === 'DE' ? '중복된 이메일입니다.' :
            result.code === 'DN' ? '중복된 닉네임입니다.' :
            result.code === 'SF' ? '인증번호 전송 실패했습니다.' :
            result.code === 'AF' ? '인증번호가 일치하지 않습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '' ;
    
        const isSuccess = result && result.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
    
        navigator(BUSINESS_REGISTRATION_ABSOLUTE_PATH);
    
    };

    // TODO: 사업자 등록번호 인증 요청 응답 처리 함수
    const _ = () => {
        // TODO: 응답 처리 
        // TODO: 실패 처리

        // TODO: 성공일 때 
        const requestBody: SignUpRequestDto = {
            userEmailId: emailId,
            password: password,
            nickname: nickname,
            userName: userName,
            userTelNumber: userTelNumber,
            authNumber: authNumber,
            userAddress: userAddress,
            joinPath,
            snsId,
            businessRegistration
        }
        signUpRequest(requestBody).then(signUpResponse);
    };

    // event handler //
    const onBusinessRegistrationButtonClickHandler = () => {
        if (!businessRegistrationStatus) return;
        // TODO: 사업자 등록번호 인증 요청

    }

    const onUserLinkClickHandler = () => {
        const requestBody: SignUpRequestDto = {
            userEmailId: emailId,
            password: password,
            nickname: nickname,
            userName: userName,
            userTelNumber: userTelNumber,
            authNumber: authNumber,
            userAddress: userAddress,
            joinPath,
            snsId
        }
        signUpRequest(requestBody).then(signUpResponse);
    }

    //   render   //
    return (
        <div id="authentication-wrapper">
            <div className="BusinessRegistration-container">
                <div className='BusinessRegistration-title'>사업자등록번호 인증</div>
                <div className='BusinessRegistration-box'>
                    <div className='BusinessRegistration-confirm-box'>

                        <InputBox type="text" value={businessRegistration} placeholder="사업자등록번호" buttonTitle="인증" buttonStatus={businessRegistrationStatus} onButtonClickHandler={onBusinessRegistrationButtonClickHandler} />

                    </div>
                    <div className='text-link-title' onClick={onUserLinkClickHandler}>일반회원일 경우 넘어가기</div>
                </div>
            </div>
        </div>
    );
}