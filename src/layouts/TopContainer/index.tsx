import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest, getSignInUserRequest } from 'src/apis/user';
import { GetMyInfoResponseDto, GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { CEO_INFO_UPDATE_ABSOLUTE_PATH, CEO_PAGE_SITE_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH, USER_INFO_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import "./style.css";
import BottomBar from '../BottomContainer';

// component // 
function TopBar() {

    // state //
    const [nickname, setNickname] = useState<string>('');
    const [userEmailId, setUserEmailId] = useState<string>('');
    const [isPageSelect, setIsPageSelect] = useState<boolean>(false);
    const { setLoginUserEmailId, setLoginUserRole, loginUserRole } = useUserStore();
    const [cookies, setCookie, removeCookie] = useCookies();
    const { pathname } = useLocation();

    const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
        if (!result) return;

        const { userEmailId, nickname } = result as GetMyInfoResponseDto;
        setUserEmailId(userEmailId);
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

    const onRestaurantListClickHandler = () => {
        navigation(RESTAURANT_LIST_ABSOLUTE_PATH);
        window.location.reload();
    }
    
    const onNoticeBoardListClickHandler = () => {
        navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
        window.location.reload();
    }

    const onPageSelectClickHandler = () => {
        setIsPageSelect(!isPageSelect);
    }

    const onSignInClickHandler = () => navigation(SIGN_IN_ABSOLUTE_PATH);

    const onMyPageClickHandler = () => {
        navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
        window.location.reload();
    }

    const onUserUpdateClickHandler = () => {
        navigation(USER_INFO_UPDATE_ABSOLUTE_PATH(userEmailId));
        window.location.reload();
    }

    const onCeoPageClickHandler = () => {
        navigation(CEO_PAGE_SITE_ABSOLUTE_PATH);
        window.location.reload();
    }

    const onCeoUpdateClickHandler = () => {
        navigation(CEO_INFO_UPDATE_ABSOLUTE_PATH(userEmailId));
        window.location.reload();
    }

    const onAdminPageClickHandler = () => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
    
    // render // 
    return (
        <>
            <div className='top-head-box'>
                <div className='top-title' onClick={onLogoClickHandler}>{"Food Insight"}</div>
                <div className='top-right-container'>
                    <div className='top-navigation-box'>
                        <div className='top-navigation' onClick={onRestaurantListClickHandler}>식당 검색</div>
                        <div className='top-navigation' onClick={onNoticeBoardListClickHandler}>고객센터</div>
                    </div>
                    <div className='top-divider'>|</div>
                    <div className='top-bar-button'>
                        {loginUserRole === 'ROLE_USER' &&
                            <div className="top-bar-role">
                                <div className="top-button" onClick={onPageSelectClickHandler}>{nickname}님</div>
                                {isPageSelect && (
                                    <ul className='top-ul'>
                                        <li className='top-li' onClick={onMyPageClickHandler}>마이페이지</li>
                                        <li className='top-li' onClick={onUserUpdateClickHandler}>회원 정보 수정</li>
                                    </ul>
                                )}
                                <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
                            </div>
                        }
                        {loginUserRole === 'ROLE_CEO' &&
                            <div className="top-bar-role">
                                <div className="sign-in-wrapper">
                                    <div className="top-button" onClick={onPageSelectClickHandler}>사장</div>
                                    {isPageSelect && (
                                    <ul className='top-ul'>
                                        <li className='top-li' onClick={onCeoPageClickHandler}>마이페이지</li>
                                        <li className='top-li' onClick={onCeoUpdateClickHandler}>회원 정보 수정</li>
                                    </ul>
                                )}
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

// component //
export default function TopContainer() {

    // state //
    const { pathname } = useLocation();
    const { setLoginUserEmailId, setLoginUserRole, setBusinessRegistrationNumber } = useUserStore();
    const [cookies] = useCookies();

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

    useEffect(() => {

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
    }, [cookies.accessToken]);

    // render //
    return (
        <div id="page-wrapper">
            <TopBar />
            <div className='page-container'>
                <Outlet />
            </div>
            <BottomBar />
        </div>
    );
}