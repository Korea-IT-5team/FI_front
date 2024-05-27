// import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
// import "./style.css";
// import { useCookies } from 'react-cookie';
// import { Outlet, Path, useLocation, useNavigate } from 'react-router';
// import { useUserStore } from 'src/stores';
// import { MAIN_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, RESTAURANT_RESERVATION_ABSOLUTE_PATH, USER_INFO_UPDATE_ABSOLUTE_PATH } from 'src/constant';

// // 마이페이지 전체 수정

// type Path = '회원정보 수정' | '찜한 식당 목록' | '예약 내역' | '리뷰 내역';

// //                    interface                    //
// interface Props {
//     path: Path;
// }

// //                    component                    //
// function TopBar({ path }: Props) {

//     //                    state                    //
//     const { loginUserRole } = useUserStore();
//     const [cookies, setCookie, removeCookie] = useCookies();

//     //                    function                    //
//     const navigator = useNavigate();

//     //                    event handler                    //
//     const onLogoutClickHandler = () => {
//         removeCookie('accessToken', { path: '/' });
//         navigator(MAIN_ABSOLUTE_PATH);
//     };

//     //                    render                    //
//     return (
//         <>
//         <div className="logo-container">FoodInsight</div>
//         <div className="top-bar-container">
//             <div className="top-bar-title">{ path }</div>
//             <div className="top-bar-right">
//                 { loginUserRole === 'ROLE_ADMIN' && <div className="top-bar-role">관리자</div> }
//                 <div className="second-button" onClick={onLogoutClickHandler}>로그아웃</div>
//             </div>
//         </div>
//         </>
//     );
// }

// //                    component                    //
// function SideNavigation({ path }: Props) {

//     const userUpdateClass = `side-navigation-item${path === '회원정보 수정' ? ' active' : ''}`;
//     const restaurantListClass = `side-navigation-item${path === '찜한 식당 목록' ? ' active' : ''}`;
//     const reservationListClass = `side-navigation-item${path === '예약 내역' ? ' active' : ''}`;
//     const reviewListClass = `side-navigation-item${path === '리뷰 내역' ? ' active' : ''}`;

//     const {pathname} = useLocation();

//     //                    function                    //
//     const navigator = useNavigate();

//     //                    event handler                    //
//     const onUserUpdateClickHandler = () => navigator(USER_INFO_UPDATE_ABSOLUTE_PATH);
//     const onRestaurantListClickHandler = () => navigator(RESTAURANT_LIST_ABSOLUTE_PATH);
//     const onReservationListClickHandler = () => navigator(RESTAURANT_RESERVATION_ABSOLUTE_PATH);
//     // const onReviewListClickHandler = () => navigator();
//     /* const onQnaClickHandler = () => {
//         if (pathname === QNA_LIST_ABSOLUTE_PATH) window.location.reload();
//         else navigator(QNA_LIST_ABSOLUTE_PATH);
//     }; */
        

//     //                    render                    //
//     return (
//         <div className="side-navigation-container">
//             <div className={userUpdateClass} onClick={onUserUpdateClickHandler}>
//                 <div className="my-page-button-box"></div>
//                 <div className="side-navigation-title">회원정보 수정</div>
//             </div>
//             <div className={restaurantListClass} onClick={onRestaurantListClickHandler}>
//                 <div className="my-page-button-box"></div>
//                 <div className="side-navigation-title">찜한 식당 목록</div>
//             </div>
//             <div className={reservationListClass} onClick={onReservationListClickHandler}>
//                 <div className="my-page-button-box"></div>
//                 <div className="side-navigation-title">예약 내역</div>
//             </div>
//         </div>
//     );
// }


// //   component: 마이페이지  //
// export default function MyPage() {

//      //                    state                    //
//      const { pathname } = useLocation();
//      const { setLoginUserEmailId, setLoginUserRole } = useUserStore();
//      const [cookies] = useCookies();
//      const [path, setPath] = useState<Path>('');
 
//      //                    function                    //
//      const navigator = useNavigate();
 
//      const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {
 
//          const message = 
//              !result ? '서버에 문제가 있습니다.' :
//              result.code === 'AF' ? '인증에 실패했습니다.' :
//              result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
 
//          if (!result || result.code !== 'SU') {
//              alert(message);
//              navigator(AUTH_ABSOLUTE_PATH);
//              return;
//          }
 
//          const { userId, userRole } = result as GetSignInUserResponseDto;
//          setLoginUserEmailId(userId);
//          setLoginUserRole(userRole);
 
//      };
 
//      //                    effect                    //
//      useEffect(() => {
//          const path = 
//              pathname === LOCAL_ABSOLUTE_PATH ? '지역 평균' :
//              pathname === RATIO_ABSOLUTE_PATH ? '비율 계산' :
//              pathname.startsWith(QNA_LIST_ABSOLUTE_PATH) ? 'Q&A 게시판' : '';
 
//          setPath(path);
//      }, [pathname]);
 
//      useEffect(() => {
 
//          if (!cookies.accessToken) {
//              navigator(AUTH_ABSOLUTE_PATH);
//              return;
//          }
 
//          getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);
 
//      }, [cookies.accessToken]);
 
//      //                    render                    //
//      return (
//          <div id="wrapper">
//              <TopBar path={path} />
//              <SideNavigation path={path} />
//              <div className="main-container">
//                  <Outlet />
//              </div>
//          </div>
//      );
//  }

import React from 'react'

export default function MyPageSite() {
  return (
    <div>MyPageSite</div>
  )
}


