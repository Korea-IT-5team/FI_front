import "./style.css";
import { Outlet } from 'react-router';


//   component: 로그인, 회원가입 공통부분  //
export default function Authentication() {
    //                    render                    //
    return (
        <div id="my-page-wrapper">
            <div className='my-page-head-box'>
                <div className='my-page-title'>{"Food Insight"}</div>
            </div>
            <Outlet />
        </div>
    );
}