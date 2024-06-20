import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest, getSignInUserRequest } from 'src/apis/user';
import { GetMyInfoResponseDto, GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { CEO_PAGE_SITE_ABSOLUTE_PATH, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INTRODUCTION_COMPANY_ABSOLUTE_PATH, INTRODUCTION_POLICY_ABSOLUTE_PATH, INTRODUCTION_PROVISION_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import "./style.css";

// component // 
function TopBar() {

    // state //
    const [nickname, setNickname] = useState<string>('');
    const { setLoginUserEmailId, setLoginUserRole, loginUserRole } = useUserStore();
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

    const onRestaurantListClickHandler = () => {
        navigation(RESTAURANT_LIST_ABSOLUTE_PATH);
        window.location.reload();
    }
    const onNoticeBoardListClickHandler = () => {
        navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
        window.location.reload();
    }

    const onSignInClickHandler = () => navigation(SIGN_IN_ABSOLUTE_PATH);
    const onMyPageClickHandler = () => navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
    const onAdminPageClickHandler = () => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
    const onCeoPageClickHandler = () => navigation(CEO_PAGE_SITE_ABSOLUTE_PATH);

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

function BottomBar() {

     // function //
    const navigation = useNavigate();

    // render // 
    return (
        <div className='bottom-head-box'>
            <div className='bottom-title'>Food Insight</div>
            <div className='bottom-navigation-box'>
                <div className='bottom-navigation' onClick={() => navigation(INTRODUCTION_COMPANY_ABSOLUTE_PATH)}>회사소개</div>
                <div className="bottom-divider">{'\|'}</div>
                <div className='bottom-navigation' onClick={() => navigation(INTRODUCTION_POLICY_ABSOLUTE_PATH)}>개인정보처리방침</div>
                <div className="bottom-divider">{'\|'}</div>
                <div className='bottom-navigation' onClick={() => navigation(INTRODUCTION_PROVISION_ABSOLUTE_PATH)}>이용약관</div>
                <div className="bottom-divider">{'\|'}</div>
                <div className='bottom-navigation' onClick={() => navigation(INQUIRY_BOARD_LIST_ABSOLUTE_PATH)}>도움말</div>
                <div className="bottom-divider">{'\|'}</div>
                <div className='bottom-navigation' onClick={() => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH)}>공지사항</div>
            </div>
            <div className='bottom-detail-title-box'>
                <div className='bottom-detail-title'>FoodInsight(주)</div>
                <div className='bottom-detail-title'>대표자 김나경</div>
                <div className='bottom-detail-title'>대한민국(어딘가)</div>
            </div>
            <div className='bottom-detail-title-box'>
                <div className='bottom-detail-title'>사업자등록번호 111-11-11111</div>
                <div className='bottom-detail-title'>TEL 1515-1515</div>
                <div className='bottom-detail-title'>FAX 02.000.000</div>
                <div className='bottom-detail-title'>EMAIL food@food.com</div>
            </div>
            <div className='bottom-detail-title-box'>
                <div className='bottom-detail-title'>Thank you for using FoodInsight</div>
            </div>
        </div>
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
        <div id="top-wrapper">
            <TopBar />
            <div className="top-container">
                <Outlet />
            </div>
            <BottomBar />
        </div>
    );
}