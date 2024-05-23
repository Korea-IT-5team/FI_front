import { useCookies } from 'react-cookie';
<<<<<<< HEAD
import { Route, Routes, useNavigate } from 'react-router';
import { RESTAURANT_INFO_PATH, RESTAURANT_LIST_PATH, RESTAURANT_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import Restaurant from './views/Restaurant';
import RestaurantInfo from './views/RestaurantInfo';
=======
import { AUTH_PATH, BOARD_PATH, BUSINESS_REGISTRATION_PATH, FIND_EMAIL_PATH, INQUIRY_BOARD_UPDATE_PATH, INQUIRY_BOARD_WRITE_PATH, INQUIRY_DETAILS_PATH, INQUIRY_MY_BOARD_LIST_PATH, INQUIRY_PATH, MAIN_PATH, MY_PAGE_PATH, NOTICE_BOARD_LIST_PATH, NOTICE_BOARD_UPDATE_PATH, NOTICE_BOARD_WRITE_PATH, NOTICE_DETAILS_PATH, NOTICE_PATH, PASSWORD_RESET_PATH, RESTAURANT_INFO_PATH, RESTAURANT_LIST_PATH, RESTAURANT_PATH, RESTAURANT_RESERVATION_INFO_PATH, RESTAURANT_RESERVATION_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_PATH, USER_DELETE_PATH, USER_INFO_UPDATE_PATH } from './constant';
import Authentication from './layouts/AuthenticationContainer';
import SignIn, { Sns } from './views/Authentication/SignIn';
import SignUp from './views/Authentication/SignUp';
import BusinessRegistration from './views/Authentication/BusinessRegistration';
<<<<<<< HEAD
import InquiryList from './views/service/board/inquiryboard/InquiryList';
import InquiryWrite from './views/service/board/inquiryboard/InquiryWrite';
import InquiryUpdate from './views/service/board/inquiryboard/InquiryUpdate';
import MyInquiry from './views/service/board/inquiryboard/MyInquiry';
import NoticeList from './views/service/board/noticeboard/NoticeList';
import NoticeWrite from './views/service/board/noticeboard/NoticeWrite';
import NoticeUpdate from './views/service/board/noticeboard/NoticeUpdate';
import NoticeDetail from './views/service/board/noticeboard/NoticeDetail';
=======
import FindEmail from './views/Authentication/FindEmail';
import PasswordReset from './views/Authentication/PasswordReset';
>>>>>>> 02ead6963a68f725ef0cce45785a8aeddc368f0e

>>>>>>> 8e4f39bddfe7941cff96d13c4a9035d6a6cc09a1

// component: root 경로 컴포넌트
function Index() {

  //   state   //
  const [cookies] = useCookies();

  //   function   //
  const navigator = useNavigate();

  //   effect   //
  // useEffect(() => {
  //   navigator(MAIN_PATH);
  // }, []);

  //   render   
  return <></>;
}

// component: Application 컴포넌트
function App() {

  //   render   //
  return (
    <Routes>
      {/* <Route index element={<Index />} />
      <Route path={SNS_PATH} element={<Sns />} />
      <Route path={AUTH_PATH} element={<Authentication />} />
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SIGN_UP_PATH} element={<SignUp />} />
        <Route path={BUSINESS_REGISTRATION_PATH} element={<BusinessRegistration />} />
<<<<<<< HEAD
        <Route path={FIND_EMAIL_PATH} element={<FindEmail />} />
        <Route path={FIND_PASSWORD_PATH} element={<FindPassword />} />
        <Route path={PASSWORD_RESET_PATH} element={<PasswordReset />} /> */}

      <Route path={RESTAURANT_PATH} element={<ServiceContainer/>} />
        <Route path={RESTAURANT_LIST_PATH} element={<Restaurant/>}/>  
=======
<<<<<<< HEAD
        {/* <Route path={FIND_EMAIL_PATH} element={<FindEmail />} />
        <Route path={PASSWORD_RESET_PATH} element={<PasswordReset />} />  */}
=======
        <Route path={FIND_EMAIL_PATH} element={<FindEmail />} />
        <Route path={PASSWORD_RESET_PATH} element={<PasswordReset />} />
>>>>>>> 02ead6963a68f725ef0cce45785a8aeddc368f0e
      </Route>
      {/* <Route path={RESTAURANT_PATH} element={<Restaurant />} >
        <Route path={RESTAURANT_LIST_PATH} element={<RestaurantList />} />
>>>>>>> 8e4f39bddfe7941cff96d13c4a9035d6a6cc09a1
        <Route path={RESTAURANT_INFO_PATH} element={<RestaurantInfo />} />
        {/*
        <Route path={RESTAURANT_RESERVATION_PATH} element={<RestaurantReservation />} />
        <Route path={RESTAURANT_RESERVATION_INFO_PATH} element={<RestaurantReservationInfo />} /> */}


      {/* <Route path={MYPAGE_PATH} element={<MyPage />} />
        <Route path={USER_INFO_UPDATE_PATH} element={<UserInfoUpdate />} />
        <Route path={USER_DELETE_PATH} element={<UserDelete />} />
<<<<<<< HEAD
      <Route path={BOARD_PATH} />
        <Route path={INQUIRY_PATH} />
          <Route element={<InquiryList />} />
          <Route path={INQUIRY_BOARD_WRITE_PATH} element={<InquiryWrite />} />
          <Route path={INQUIRY_BOARD_UPDATE_PATH} element={<InquiryUpdate />} />
          <Route path={INQUIRY_MY_BOARD_LIST_PATH} element={<MyInquiry />} />
          <Route path={INQUIRY_DETAILS_PATH} element={<InquiryDetail />} />
        <Route path={NOTICE_PATH} />
          <Route element={<NoticeList />} />
          <Route path={NOTICE_BOARD_WRITE_PATH} element={<NoticeWrite />} />
          <Route path={NOTICE_BOARD_UPDATE_PATH} element={<NoticeUpdate />} />
      <Route path={NOTICE_DETAILS_PATH} element={<NoticeDetail />} /> */}
=======
      </Route> */}
      <Route path={BOARD_PATH} >
        <Route path={INQUIRY_PATH} >
          <Route element={<InquiryList />} />
            <Route path={INQUIRY_BOARD_WRITE_PATH} element={<InquiryWrite />} />
            <Route path={INQUIRY_BOARD_UPDATE_PATH} element={<InquiryUpdate />} />
            <Route path={INQUIRY_MY_BOARD_LIST_PATH} element={<MyInquiry />} />
<<<<<<< HEAD
            {/* <Route path={INQUIRY_DETAILS_PATH} element={<InquiryDetail />} /> */}
        </Route>
        <Route path={NOTICE_PATH} >
          <Route path={NOTICE_BOARD_LIST_PATH} element={<NoticeList />} />
            <Route path={NOTICE_BOARD_WRITE_PATH} element={<NoticeWrite />} />
            <Route path={NOTICE_BOARD_UPDATE_PATH} element={<NoticeUpdate />} />
            <Route path={NOTICE_DETAILS_PATH} element={<NoticeDetail />} />
        </Route>
      </Route>
=======
            <Route path={INQUIRY_DETAILS_PATH} element={<InquiryDetail />} />
        </Route>
        <Route path={NOTICE_PATH} >
          <Route element={<NoticeList />} />
            <Route path={NOTICE_BOARD_WRITE_PATH} element={<NoticeWrite />} />
            <Route path={NOTICE_BOARD_UPDATE_PATH} element={<NoticeUpdate />} />
            <Route path={NOTICE_DETAILS_PATH} element={<NoticeDetail />} />
        </Route> */}
      {/* </Route> */}
>>>>>>> 02ead6963a68f725ef0cce45785a8aeddc368f0e
>>>>>>> 8e4f39bddfe7941cff96d13c4a9035d6a6cc09a1
    </Routes>
  );
}

export default App;
