import React, { useEffect, useState } from 'react'
import "./style.css";
import { Outlet, useLocation, useNavigate } from 'react-router';
import { INQUIRY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH, SIGN_UP_ABSOLUTE_PATH} from 'src/constant';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'src/stores';
import { GetMyInfoResponseDto, GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest, getSignInUserRequest } from 'src/apis/user';

type Path = '식당리스트' | '마이페이지' | '문의사항' | '';

// interface //
interface Props {
  path: Path;
}

// component // 
function TopBar({ path }: Props) {

  // state //
  const [nickname, setNickname] = useState<string>('');

  const { loginUserRole, setLoginUserEmailId, setLoginUserRole } = useUserStore();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { pathname } = useLocation();

  const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
    if (!result) return;        

    const { nickname } = result as GetMyInfoResponseDto;
    setNickname(nickname);
  };

  useEffect (() => {
    if (!cookies.accessToken) return;

    getMyInfoRequest(cookies.accessToken).then(getMyInfoResponse);
  }, [cookies.accessToken]);

  // function //
  const navigator = useNavigate();

  // 로그아웃 처리 시 원래 있던 쿠기 값을 제거
  const onLogoutClickHandler = () => {
    removeCookie('accessToken', { path: '/' });
    setLoginUserEmailId('');
    setLoginUserRole('');
    window.location.reload();
  };

  const onLogoClickHandler = () => {
    if(pathname === MAIN_ABSOLUTE_PATH){    
      window.location.reload();
    } else {
    navigator(MAIN_ABSOLUTE_PATH);}
  }

  const onSignInClickHandler = () => navigator(SIGN_IN_ABSOLUTE_PATH);
  const onMyPageClickHandler = () => navigator(MY_PAGE_SITE_ABSOLUTE_PATH);
  const onAdminPageClickHandler = () => navigator(MAIN_ABSOLUTE_PATH);


// render // 
  return (
    <>
      <div className='main-head-box'>
        <div className='main-icon'>☰</div>
        <div className='main-title' onClick={onLogoClickHandler}>{"Food Insight"}</div>
        <div className='main-top-bar-button'>
        {loginUserRole === 'ROLE_USER' &&
        <div className="top-bar-role">
            <div className="sign-in-wrapper">
                <div className="user-my-page-button person"></div>
                <div className="user-button" onClick={onMyPageClickHandler}>{nickname}님</div>
            </div>
            <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
        </div>
        }
        {loginUserRole === 'ROLE_ADMIN' && 
        <div className="top-bar-role">
          <div className="sign-in-wrapper">
              <div className="user-my-page-button person"></div>
              <div className="user-button" onClick={onAdminPageClickHandler}>관리자</div>
          </div>
          <div className="logout-button" onClick={onLogoutClickHandler}>로그아웃</div>
        </div>
        }
        {loginUserRole !== 'ROLE_USER' && loginUserRole !== 'ROLE_ADMIN' && 
            <div className="top-button" onClick={onSignInClickHandler}>로그인</div>
        }
        </div>
      </div>
    </>
  );
}

// component //
function SideNavigation({ path }: Props) {

  const restaurantList = `side-navigation-item${path === '식당리스트' ? 'active' : ''};`
  const myPageSite = `side-navigation-item${path === '마이페이지' ? 'active' : ''};`
  const inquiryBoard = `side-navigation-item${path === '문의사항' ? 'active' : ''};`

  const {pathname} = useLocation();

  // function //
  const navigation = useNavigate();

  // event handler //
  const onRestaurantListClickHandler = () => navigation(RESTAURANT_LIST_ABSOLUTE_PATH);
  const onMyPageSiteClickHandler = () => navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
  const onInquiryBoardClickHandler = () => {
    if (pathname === INQUIRY_BOARD_LIST_ABSOLUTE_PATH) window.location.reload();
    else navigation(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
  };

  // render //
  return (
    <div className='side-navigation-container'>
      <div className={restaurantList} onClick={onRestaurantListClickHandler}>
        <div className='side-navigation-icon food'></div>
        <div className='side-navigation-title'>식당 리스트</div>
      </div>
      <div className={myPageSite} onClick={onMyPageSiteClickHandler}>
        <div className='side-navigation-icon my-paga'></div>
        <div className='side-navigation-title'>마이페이지</div>
      </div>
      <div className={inquiryBoard} onClick={onInquiryBoardClickHandler}>
        <div className='side-navigation-icon board'></div>
        <div className='side-navigation-title'>문의사항</div>
      </div>
    </div>
  );
}

// component //
export default function Main() {

  // state //
  const { pathname } = useLocation();
  const { setLoginUserEmailId, setLoginUserRole } = useUserStore(); 
  const [cookies] = useCookies();
  const [path, setPath] = useState<Path>('');

  // function // 
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
  
  // effect //
  useEffect(() => {
    const path =
      pathname === RESTAURANT_LIST_ABSOLUTE_PATH ? '식당리스트' :
      pathname === MY_PAGE_SITE_ABSOLUTE_PATH ? '마이페이지' :
      pathname.startsWith(INQUIRY_BOARD_LIST_ABSOLUTE_PATH) ? '문의사항' : '';

    setPath(path);
  }, [pathname]);

  useEffect(() => {

    if (!cookies.accessToken) {
      navigator(MAIN_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
}, [cookies.accessToken]);

// render //
return (
  <div id="main-wrapper">
    <TopBar path={path} />
    <SideNavigation path={path} />
    <div className="main-container">
        <Outlet />
    </div>
    <div className='main-container'>
      <div className='main-banner'></div>
      <div className='main-image-box'>
        <div className='restaurant-image'>식당1</div>
        <div className='restaurant-image'>식당2</div>
        <div className='restaurant-image'>식당3</div>
        <div className='restaurant-image'>식당4</div>
      </div>
    </div>
  </div>
);

}