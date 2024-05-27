import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import { AUTH_PATH, BOARD_PATH, BUSINESS_REGISTRATION_PATH, FIND_EMAIL_FINALLY_PATH, FIND_EMAIL_INPUT_PATH, INQUIRY_BOARD_LIST_PATH, INQUIRY_BOARD_UPDATE_PATH, INQUIRY_BOARD_WRITE_PATH, INQUIRY_DETAILS_PATH, INQUIRY_MY_BOARD_LIST_PATH, INQUIRY_PATH, MAIN_ABSOLUTE_PATH, MAIN_PATH, MY_PAGE_PATH, MY_PAGE_SITE_PATH, NOTICE_BOARD_LIST_PATH, NOTICE_BOARD_UPDATE_PATH, NOTICE_BOARD_WRITE_PATH, NOTICE_DETAILS_PATH, NOTICE_PATH, PASSWORD_RESET_CHECK_PATH, PASSWORD_RESET_FINALLY_PATH, PASSWORD_RESET_INPUT_PATH, RESTAURANT_INFO_PATH, RESTAURANT_LIST_PATH, RESTAURANT_PATH, RESTAURANT_RESERVATION_LIST_PATH, RESTAURANT_RESERVATION_PATH, RESTAURANT_REVIEW_DETAILS_LIST_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_PATH, USER_DELETE_PATH, USER_INFO_UPDATE_PATH } from './constant';
import Authentication from './layouts/AuthenticationContainer';
import Board from './layouts/BoardContainer';
import MyPage from './layouts/MyPageContainer';
import BusinessRegistration from './views/Authentication/BusinessRegistration';
import SignIn, { Sns } from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import Main from './views/Main';
import UserDelete from './views/Mypage/UserDelete';
import UserInfoUpdate from './views/Mypage/UserInfoUpdate';
import RestaurantInfo from './views/Restaurant/RestaurantInfo';
import Restaurantlist from './views/Restaurant/RestaurantList';
import RestaurantReservation from './views/Restaurant/RestaurantReservation';
import RestaurantReservationList from './views/Restaurant/RestaurantReservationList';
import RestaurantTopBar from './views/Restaurant/RestaurantTopBar';
import ReviewDetailsList from './views/Restaurant/ReviewDetailsList';
import InquiryDetail from './views/service/board/inquiryboard/InquiryDetail';
import { default as InquiryList, default as InquiryMyList } from './views/service/board/inquiryboard/InquiryMyList';
import InquiryUpdate from './views/service/board/inquiryboard/InquiryUpdate';
import InquiryWrite from './views/service/board/inquiryboard/InquiryWrite';
import NoticeDetail from './views/service/board/noticeboard/NoticeDetail';
import NoticeList from './views/service/board/noticeboard/NoticeList';
import NoticeUpdate from './views/service/board/noticeboard/NoticeUpdate';
import NoticeWrite from './views/service/board/noticeboard/NoticeWrite';
import MyPageSite from './views/Mypage/MyPageSite';
import FindEmailInput from './views/Authentication/FIndEmailInput';
import FindEmailFinally from './views/Authentication/FindEmailFinally';
import PasswordResetInput from './views/Authentication/PasswordResetInput';
import PasswordResetCheck from './views/Authentication/PasswordResetCheck';
import PasswordResetFinally from './views/Authentication/PasswordResetFinally';
import { useEffect } from 'react';


// component: root 경로 컴포넌트
function Index() {

  //   function   //
  const navigator = useNavigate();

  //   effect   //
  useEffect(() => navigator(MAIN_ABSOLUTE_PATH), []);

  //   render   //
  return <></>;
}

// component: Application 컴포넌트
function App() {

  //   render   //
  return (
    <Routes>
        <Route index element={<Index />} />
        <Route path={SNS_PATH} element={<Sns />} />
        <Route path={MAIN_PATH} element={<Main/>} />
        <Route path={AUTH_PATH} element={<Authentication />} >
          <Route path={SIGN_IN_PATH} element={<SignIn />} />
          <Route path={SIGN_UP_PATH} element={<SignUp />} />
          <Route path={BUSINESS_REGISTRATION_PATH} element={<BusinessRegistration />} />
          <Route path={FIND_EMAIL_INPUT_PATH} element={<FindEmailInput />} />
          <Route path={FIND_EMAIL_FINALLY_PATH} element={<FindEmailFinally />} />
          <Route path={PASSWORD_RESET_INPUT_PATH} element={<PasswordResetInput />} /> 
          <Route path={PASSWORD_RESET_CHECK_PATH} element={<PasswordResetCheck />} /> 
          <Route path={PASSWORD_RESET_FINALLY_PATH} element={<PasswordResetFinally />} /> 
        </Route>
        <Route path={RESTAURANT_PATH} element={<RestaurantTopBar/>} >
          <Route path={RESTAURANT_LIST_PATH} element={<Restaurantlist/>}/>  
          <Route path={RESTAURANT_INFO_PATH} element={<RestaurantInfo />} />
          <Route path={RESTAURANT_RESERVATION_PATH} element={<RestaurantReservation />} />
          <Route path={RESTAURANT_RESERVATION_LIST_PATH} element={<RestaurantReservationList />} />
          <Route path={RESTAURANT_REVIEW_DETAILS_LIST_PATH} element={<ReviewDetailsList />} />
          
        </Route> 
        <Route path={MY_PAGE_PATH} element={<MyPage />} >
          <Route path={MY_PAGE_SITE_PATH} element={<MyPageSite />} />
          <Route path={USER_INFO_UPDATE_PATH} element={<UserInfoUpdate />} />
          <Route path={USER_DELETE_PATH} element={<UserDelete />} />
        </Route>  
        <Route path={BOARD_PATH} element={<Board />} >
          <Route path={NOTICE_PATH} >
            <Route path={NOTICE_BOARD_LIST_PATH} element={<NoticeList />} />
            <Route path={NOTICE_BOARD_WRITE_PATH} element={<NoticeWrite />} />
            <Route path={NOTICE_BOARD_UPDATE_PATH} element={<NoticeUpdate />} />
            <Route path={NOTICE_DETAILS_PATH} element={<NoticeDetail />} />
          </Route>
          <Route path={INQUIRY_PATH} >
            <Route path={INQUIRY_BOARD_LIST_PATH} element={<InquiryList />} />
            <Route path={INQUIRY_BOARD_WRITE_PATH} element={<InquiryWrite />} />
            <Route path={INQUIRY_BOARD_UPDATE_PATH} element={<InquiryUpdate />} />
            <Route path={INQUIRY_MY_BOARD_LIST_PATH} element={<InquiryMyList />} />
            <Route path={INQUIRY_DETAILS_PATH} element={<InquiryDetail />} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;