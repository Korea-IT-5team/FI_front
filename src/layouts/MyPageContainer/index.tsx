import { MAIN_ABSOLUTE_PATH } from "src/constant";
import "./style.css";
import { Outlet, useNavigate } from 'react-router';


//   component: 로그인, 회원가입 공통부분  //
export default function Authentication() {

    // function //
    const navigator = useNavigate();

    //                    render                    //
    return (
        <div id="my-page-wrapper">
            <div className='my-page-head-box'>
                <div className='my-page-title' onClick={() => {navigator(MAIN_ABSOLUTE_PATH)}}>{"Food Insight"}</div>
            </div>
            <Outlet />
        </div>
    );
}