import { useNavigate } from "react-router";
import { useAuthStore } from "src/stores";



//   component: 사업자등록번호 확인   //
export default function BusinessRegistration() {

    // state //
    const { emailId, password, nickname, userTelNumber, authNumber, userAddress, userName } = useAuthStore();

    // function //
    const navigator = useNavigate();

    //   render   //
    return (
        <div id="food-insight-wrapper">
            <div className='food-insight-title'>Food Insight</div>
            <div className='BusinessRegistration-title'>사업자등록번호 인증</div>
            <div className='BusinessRegistration-box'>
                <div className='BusinessRegistration-confirm-box'>
                    <div className='BusinessRegistration-confirm-text'>사업자등록번호</div>
                    <div className='BusinessRegistration-confirm-button'>인증</div>
                </div>
                <div className='BusinessRegistration-pass'>일반회원일 경우 넘어가기</div>
            </div>
        </div>
    );
}