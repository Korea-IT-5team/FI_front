import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest, getSignInUserRequest } from 'src/apis/user';
import { GetMyInfoResponseDto, GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { CEO_PAGE_SITE_ABSOLUTE_PATH, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import "./style.css";

type Path = '식당리스트' | '마이페이지' | '문의사항' | '공지사항' |'';

// interface //
interface Props {
    path: Path;
}

// component // 
function TopBar({ path }: Props) {

    // state //
    const [nickname, setNickname] = useState<string>('');
    const { setLoginUserEmailId, setLoginUserRole, loginUserRole } = useUserStore();
    const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
    const [cookies, setCookie, removeCookie] = useCookies();
    const { pathname } = useLocation();

    const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
        if (!result) return;

        const { nickname } = result as GetMyInfoResponseDto;
        setNickname(nickname);
    };

    useEffect(() => {
        if (!cookies.accessToken) return;

        getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
    }, [cookies.accessToken]);

    // function //
    const navigation = useNavigate();

    const onLogoutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        setLoginUserEmailId('');
        setLoginUserRole('');
        window.location.reload();
    };

    const onLogoClickHandler = () => {
        if (pathname === MAIN_ABSOLUTE_PATH) {
            window.location.reload();
        } else {
            navigation(MAIN_ABSOLUTE_PATH);
        }
    }

    const onSignInClickHandler = () => navigation(SIGN_IN_ABSOLUTE_PATH);
    const onMyPageClickHandler = () => navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
    const onAdminPageClickHandler = () => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
    const onCeoPageClickHandler = () => navigation(CEO_PAGE_SITE_ABSOLUTE_PATH);
    
    const toggleSideNav = () => setIsSideNavOpen(!isSideNavOpen);


    // render // 
    return (
        <>
            <div className='top-head-box'>
                <div className='top-title' onClick={onLogoClickHandler}>{"Food Insight"}</div>
                <div className='top-right-container'>
                    <div className='top-navigation-box'>
                        <div className='top-navigation'>식당 검색</div>
                        <div className='top-navigation'>고객센터</div>
                    </div>
                    <div className='top-divider'>|</div>
                    <div className='top-bar-button'>
                        {loginUserRole === 'ROLE_USER' &&
                        <div className="top-bar-role">
                            <div className="sign-in-wrapper">
                                <div className="top-button" onClick={onMyPageClickHandler}>{nickname}님</div>
                            </div>
                            <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
                        </div>
                        }
                        {loginUserRole === 'ROLE_CEO' &&
                        <div className="top-bar-role">
                            <div className="sign-in-wrapper">
                                <div className="top-button" onClick={onCeoPageClickHandler}>사장</div>
                            </div> 
                            <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
                        </div>
                        }
                        {loginUserRole === 'ROLE_ADMIN' &&
                        <div className="top-bar-role">
                            <div className="sign-in-wrapper">
                                <div className="top-button" onClick={onAdminPageClickHandler}>관리자</div>
                            </div> 
                            <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
                        </div>
                        }
                        {loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN' && loginUserRole !== 'ROLE_CEO' &&
                        <div className="top-button" onClick={onSignInClickHandler}>로그인</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

// // component //
// function SideNavigation({ path, isOpen, toggleSideNav }: { path: Path, isOpen: boolean, toggleSideNav: () => void }) {

//     const { pathname } = useLocation();
//     const { loginUserRole } = useUserStore();

//     // function //
//     const navigation = useNavigate();

//     // event handler //
//     const onRestaurantListClickHandler = () => navigation(RESTAURANT_LIST_ABSOLUTE_PATH);
//     const onMyPageSiteClickHandler = () => navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
//     const onCeoPageSiteClickHandler = () => navigation(CEO_PAGE_SITE_ABSOLUTE_PATH);
//     const onInquiryBoardClickHandler = () => {
//         if (pathname === INQUIRY_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
//         else navigation(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
//     }
//     const onNoticeBoardClickHandler = () => {
//         if (pathname === NOTICE_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
//         else navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
//     };

//     // render //
//     return (
//         <div className={`side-navigation-container${isOpen ? ' show' : ''}`}>
//             <div className='main-side-navigation-contents'>
//                 <div className='main-side-navigation-item' onClick={onRestaurantListClickHandler}>
//                     <div className='main-side-navigation-icon food'></div>
//                     <div className='main-side-navigation-title'>식당 리스트</div>
//                 </div>
//                 {loginUserRole === 'ROLE_USER' &&
//                 <div className='main-side-navigation-item' onClick={onMyPageSiteClickHandler}>
//                     <div className='main-side-navigation-icon my-page'></div>
//                     <div className='main-side-navigation-title'>마이페이지</div>
//                 </div>
//                 }

//                 {loginUserRole === 'ROLE_CEO' &&
//                 <div className='main-side-navigation-item' onClick={onCeoPageSiteClickHandler}>
//                     <div className='main-side-navigation-icon my-page'></div>
//                     <div className='main-side-navigation-title'>사장페이지</div>
//                 </div>
//                 }
//                 <div className='main-side-navigation-item' onClick={onInquiryBoardClickHandler}>
//                     <div className='main-side-navigation-icon inquiry'></div>
//                     <div className='main-side-navigation-title'>문의사항</div>
//                 </div>
//                 <div className='main-side-navigation-item' onClick={onNoticeBoardClickHandler}>
//                     <div className='main-side-navigation-icon notice'></div>
//                     <div className='main-side-navigation-title'>공지사항</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// component //
export default function TopContainer() {

    // state //
    const { pathname } = useLocation();
    const { setLoginUserEmailId, setLoginUserRole, setBusinessRegistrationNumber } = useUserStore();
    const [cookies] = useCookies();
    const [path, setPath] = useState<Path>('');

    // function // 
    const navigation = useNavigate();

    const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            return;
        }

        const { userEmailId, userRole, business_registration_number } = result as GetUserInfoResponseDto;
        setLoginUserEmailId(userEmailId);
        setLoginUserRole(userRole);
        setBusinessRegistrationNumber(business_registration_number);
    };

    // effect //
    useEffect(() => {
        const path =
            pathname === RESTAURANT_LIST_ABSOLUTE_PATH ? '식당리스트' :
            pathname === MY_PAGE_SITE_ABSOLUTE_PATH ? '마이페이지' :
            pathname.startsWith(INQUIRY_BOARD_LIST_ABSOLUTE_PATH) ? '문의사항' :
            pathname.startsWith(NOTICE_BOARD_LIST_ABSOLUTE_PATH) ? '공지사항' : '';

        setPath(path);
    }, [pathname]);

    useEffect(() => {

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
    }, [cookies.accessToken]);

    // render //
    return (
        <div id="top-wrapper">
            <TopBar path={path} />
            <div className="top-container">
                <Outlet />
            </div>
            <div >

            </div>
        </div>
    );

}