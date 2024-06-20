import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest, getSignInUserRequest } from 'src/apis/user';
import { GetMyInfoResponseDto, GetUserInfoResponseDto } from 'src/apis/user/dto/response';
import { CEO_PAGE_SITE_ABSOLUTE_PATH, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INTRODUCTION_COMPANY_ABSOLUTE_PATH, INTRODUCTION_POLICY_ABSOLUTE_PATH, INTRODUCTION_PROVISION_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { CEO_PAGE_SITE_ABSOLUTE_PATH, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH, RESTAURANT_INFO_WRITE_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import "./style.css";
import { RestaurantListItem } from 'src/types';
import { GetRestaurantListResponseDto } from 'src/apis/restaurant/dto/response';
import { GetRestaurantListRequest } from 'src/apis/restaurant';

// component // 
function TopBar() {

  // state //
  const [nickname, setNickname] = useState<string>('');

  const { loginUserRole, setLoginUserEmailId, setLoginUserRole } = useUserStore();
  const [cookies, removeCookie] = useCookies();
  const { pathname } = useLocation();

  const getMyInfoResponse = (result: GetMyInfoResponseDto | ResponseDto | null) => {
    if (!result) return;        

    const { nickname } = result as GetMyInfoResponseDto;
    setNickname(nickname);
  };

  // effect //
  useEffect (() => {
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
    if(pathname === MAIN_ABSOLUTE_PATH){    
      window.location.reload();
    } else {
    navigation(MAIN_ABSOLUTE_PATH);}
  }

  const onSignInClickHandler = () => navigation(SIGN_IN_ABSOLUTE_PATH);
  const onMyPageClickHandler = () => navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
  const onAdminPageClickHandler = () => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
  const onCeoPageClickHandler = () => navigation(CEO_PAGE_SITE_ABSOLUTE_PATH);

  // render // 
  return (
    <>
      <div className='main-head-box'>
        <div className='main-title' onClick={onLogoClickHandler}>{"Food Insight"}</div>
        <div className='main-right-container'>
          <div className='top-navigation-box'>
            <div className='top-navigation' onClick={() => navigation(RESTAURANT_LIST_ABSOLUTE_PATH)}>식당 검색</div>
            <div className='top-navigation' onClick={() => navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH)}>고객센터</div>
          </div>
          <div className='top-divider'>|</div>
          <div className='main-top-bar-button'>
          {loginUserRole === 'ROLE_USER' &&
            <div className="top-bar-role">
              <div className="sign-in-box">
                <div className="user-button" onClick={onMyPageClickHandler}>{nickname}님</div>
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
                <div className="user-button" onClick={onAdminPageClickHandler}>관리자</div>
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
function BottomBar() {

  // function //
  const navigation = useNavigate();

  // render // 
  return (
    <div className='bottom-box'>
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
      <div className='bottom-detail-contents-box first'>
        <div className='bottom-detail-content'>(주)FoodInsight</div>
        <div className='bottom-detail-content'>대표자| 김나경 김다인 김유진 박주형</div>
        <div className='bottom-detail-content'>대한민국</div>
      </div>
      <div className='bottom-detail-contents-box second'>
        <div className='bottom-detail-content'>사업자등록번호 111-11-11111</div>
        <div className='bottom-detail-content'>TEL 1515-1515</div>
        <div className='bottom-detail-content'>FAX 02.000.000</div>
        <div className='bottom-detail-content'>EMAIL foodinsight@email.com</div>
      </div>
    </div>
  );
}

// component //
export default function Main() {

  // state //
  const { setLoginUserEmailId, setLoginUserRole } = useUserStore(); 
  const [cookies] = useCookies();
  const [searchWord, setSearchWord] = useState<string>('');
  const [restaurantList, SetRestaurantList] = useState<RestaurantListItem[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(8); // 한 번에 보여줄 식당 목록 개수

  // function // 
  const navigation = useNavigate();

  const getSignInUserResponse = (result: GetUserInfoResponseDto | ResponseDto | null) => {
    const message = 
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      navigation(SIGN_IN_ABSOLUTE_PATH);
      return;
    }

    const { userEmailId, userRole } = result as GetUserInfoResponseDto;
    setLoginUserEmailId(userEmailId);
    setLoginUserRole(userRole);
  };

  const GetRestaurantListResponse = (result: GetRestaurantListResponseDto | ResponseDto | null) => {
    const message =
        !result ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
        return;
    }

    const { restaurantList } = result as GetRestaurantListResponseDto;
    SetRestaurantList(restaurantList);
  };

  // event handler //
  const onItemClickHandler = (item: number) => {
    navigation(RESTAURANT_INFO_ABSOLUTE_PATH(item));
  };
  
  // effect //
  useEffect(() => {
    if (!cookies.accessToken) {
      navigation(MAIN_ABSOLUTE_PATH);
      return;
    }

    getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
  }, [cookies.accessToken]);
  
  let effectFlag1 = false;

  useEffect(() => {
    if(effectFlag1) return;
    effectFlag1 = true; 

    GetRestaurantListRequest(searchWord, cookies.accessToken)
        .then(GetRestaurantListResponse);
  }, []);

// render //
  return (
    <div id="main-wrapper">
      <TopBar />
      <div className="main-container">
        <Outlet />
      </div>
      <div className='main-container'>
        <div className='main-banner'></div>
        <div className='main-image-box'></div>
        <div id='restaurant-list-wrapper'>
            <div className='restaurant-list-box'>
                {!restaurantList || restaurantList.length === 0 ?
                (<div className='restaurant-list-no-item'>해당하는 식당이 없습니다.</div>) :
                (restaurantList.slice(0, displayCount).map((item) => (
                <div className='restaurant-list-item-box' onClick={() => onItemClickHandler(item.restaurantId)}>
                    <img src={item.restaurantImage} className='restaurant-list-item' />
                    <div className='restaurant-list-item-top-box'>
                        <div className='restaurant-list-item name'>{item.restaurantName}</div>
                        <div className='restaurant-list-item category'>{item.restaurantFoodCategory}</div>
                    </div>
                    <div className='restaurant-list-item location'>{item.restaurantLocation}</div>
                </div>
                )))}
            </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
