import { useUserStore } from "src/stores";
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useCookies } from "react-cookie";
import { MAIN_ABSOLUTE_PATH, MY_PAGE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from "src/constant";
import { useEffect, useState } from "react";
import { GetUserInfoResponseDto } from "src/apis/user/dto/response";
import ResponseDto from "src/apis/response.dto";
import { getSignInUserRequest } from "src/apis/user";

type Path = '식당 검색' | '마이페이지' | '고객 센터' | '';

//   interface   //
interface Props {
    path: Path;
}

//   component   //
function TopBar({ path }: Props) {
    //   state   //
    const { loginUserRole } = useUserStore();

    const [cookies, setCookie, removeCookie] = useCookies();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    //   function   //
    const navigator = useNavigate();

    //   event handler   //
    const onLogoutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        navigator(MAIN_ABSOLUTE_PATH);
    };

    const onSideNavClickHandler = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };

    //   render   //
    return (
        <>
        <div id='board-wrapper'>
            <div className='board-head-box'>
                <div className='board-navigation-icon' onClick={onSideNavClickHandler}>☰</div>
                { isSideNavOpen && <SideNavigation path={path} /> }
                <div className='board-title'>{"Food Insight"}</div>
                <div className='board-sign-in-box'>
                    { loginUserRole === 'USER_ADMIN' &&
                    <div className='board-role-visible'>
                        <div className='board-role'>관리자</div> 
                        <div className='board-divider'>{'\|'}</div>
                    </div>
                    }
                    {/* { 비회원인 경우 - '로그인/회원가입' / 회원+관리자인 경우 - '로그아웃' } */}
                    <div className='board-sign-out' onClick={onLogoutClickHandler}>로그아웃</div>
                </div>
            </div>
        </div>
        </>
    )
}

//   component   //
function SideNavigation({ path }: Props) {

    const {pathname} = useLocation();

    //   function   //
    const navigator = useNavigate();

    //   event handler   //
    const onRestaurantSearchClickHandler = () => navigator(RESTAURANT_LIST_ABSOLUTE_PATH);
    const onMyPageClickHandler = () => navigator(MY_PAGE_ABSOLUTE_PATH);
    const onBoardClickHandler = () => {
        if (pathname === '고객 센터') window.location.reload();
        else navigator(NOTICE_BOARD_LIST_ABSOLUTE_PATH)
    };

    //   render   //
    return (
        <div className="side-navigation-container">
            <div className="side-navigation-search-restaurant" onClick={onRestaurantSearchClickHandler}>
                <div className="side-navigation-title">식당 검색</div>
            </div>
            <div className="side-navigation-my-page" onClick={onMyPageClickHandler}>
                <div className="side-navigation-icon pie"></div>
                <div className="side-navigation-title">마이페이지</div>
            </div>
            <div className="side-navigation-board" onClick={onBoardClickHandler}>
                <div className="side-navigation-icon edit"></div>
                <div className="side-navigation-title">고객 센터</div>
            </div>
        </div>
    );
}

//   component: board 공통부분
export default function BoardContainer() {
    //   state   //
    const { pathname } = useLocation();
    const { setLoginUserEmailId, setLoginUserRole } = useUserStore();

    const [cookies] = useCookies();
    const [path, setPath] = useState<Path>('');

    //   function   //
    const navigator = useNavigate();

    const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(SIGN_IN_ABSOLUTE_PATH);
            return;
        }

        const { userEmailId, userRole } = result as GetUserInfoResponseDto;
        setLoginUserEmailId(userEmailId);
        setLoginUserRole(userRole);
    };

    //   effect   //
    useEffect(() => {
        const path = 
            pathname === RESTAURANT_LIST_ABSOLUTE_PATH ? '식당 검색' :
            pathname === MY_PAGE_ABSOLUTE_PATH ? '마이페이지' :
            pathname === NOTICE_BOARD_LIST_ABSOLUTE_PATH ? '고객 센터' : '';

        setPath(path);
    }, [pathname]);

    // useEffect(() => {
    //     if (!cookies.accessToken) {
    //         navigator(SIGN_IN_ABSOLUTE_PATH);
    //         return;
    //     }

    //     getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
    // }, [cookies.accessToken]);
    
    //   render   //
    return (
        <div id="wrapper">
            <TopBar path={path} />
            <div className='main-container'>
                <Outlet />
            </div>
        </div>
    );
}