import "./style.css";
import { Outlet } from 'react-router';


//   component: 로그인, 회원가입 공통부분  //
export default function Authentication() {
    //                    render                    //
    return (
        <div id="authentication-wrapper">
            <div className='authentication-head-box'>
                <div className='authentication-title'>{"Food Insight"}</div>
            </div>
            <Outlet />
        </div>
    );
}