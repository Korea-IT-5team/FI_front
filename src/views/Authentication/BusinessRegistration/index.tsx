import { useNavigate } from "react-router";
import { SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import { useAuthStore } from "src/stores";
import "./style.css";
import InputBox from "src/components/InputBox";
import { useState } from "react";

//   component: 사업자등록번호 확인   //
export default function BusinessRegistration() {

    // state //
    const [BusinessRegistration, setBusinessRegistration] = useState<string>('');
    const [BusinessRegistrationStatus, setBusinessRegistrationStatus] = useState<boolean>(false);
    const [BusinessRegistrationCheck, setBusinessRegistrationCheck] = useState<boolean>(false);
    const [BusinessRegistrationError, setBusinessRegistrationError] = useState<boolean>(false);

    // function //
    const navigator = useNavigate();

    // event handler //
    const onBusinessRegistrationButtonClickHandler = () => {
        if (!BusinessRegistrationStatus) return;
    }

    //   render   //
    return (
        <div id="authentication-wrapper">
            <div className="BusinessRegistration-container">
                <div className='BusinessRegistration-title'>사업자등록번호 인증</div>
                <div className='BusinessRegistration-box'>
                    <div className='BusinessRegistration-confirm-box'>

                        <InputBox type="text" value={BusinessRegistration} placeholder="사업자등록번호" buttonTitle="인증" buttonStatus={BusinessRegistrationStatus} onButtonClickHandler={onBusinessRegistrationButtonClickHandler} />

                    </div>
                    <div className='text-link-title' onClick={() => { navigator(SIGN_IN_ABSOLUTE_PATH) }}>일반회원일 경우 넘어가기</div>
                </div>
            </div>
        </div>
    );
}