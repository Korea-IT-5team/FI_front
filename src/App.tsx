import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import { AUTH_PATH, MAIN_PATH, RESTAURANT_INFO_PATH, RESTAURANT_LIST_PATH, RESTAURANT_PATH, RESTAURANT_RESERVATION_INFO_PATH, RESTAURANT_RESERVATION_PATH } from './constant';
import Restaurant from './views/Restaurant';

// component: root 경로 컴포넌트
function Index() {

  //   state   //
  const [cookies] = useCookies();

  //   function   //
  const navigator = useNavigate();

  //   effect   //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) navigator(MAIN_PATH);
    else navigator(AUTH_PATH);
  }, []);

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
        <Route path={FIND_EMAIL_PATH} element={<FindEmail />} />
        <Route path={FIND_PASSWORD_PATH} element={<FindPassword />} />
        <Route path={PASSWORD_RESET_PATH} element={<PasswordReset />} /> */}


      <Route path={RESTAURANT_PATH}/>
        <Route index element={<Restaurant />} />
        <Route path={RESTAURANT_LIST_PATH} element={<RestaurantList />} />
        <Route path={RESTAURANT_INFO_PATH} element={<RestaurantInfo />} />
        <Route path={RESTAURANT_RESERVATION_PATH} element={<RestaurantReservation />} />
        <Route path={RESTAURANT_RESERVATION_INFO_PATH} element={<RestaurantReservationInfo />} />


      {/* <Route path={MYPAGE_PATH} element={<MyPage />} />
        <Route path={USER_INFO_UPDATE_PATH} element={<UserInfoUpdate />} />
        <Route path={USER_DELETE_PATH} element={<UserDelete />} />
      <Route path={BOARD_PATH} element={<Board />} />
        <Route path={INQUIRY_PATH} element={<Inquiry />} />
          <Route path={INQUIRY_BOARD_WRITE_PATH} element={<InquiryWrite />} />
          <Route path={INQUIRY_BOARD_UPDATE_PATH} element={<InquiryUpdate />} />
          <Route path={INQUIRY_MY_BOARD_LIST_PATH} element={<MyInquiry />} />
          <Route path={INQUIRY_DETAILS_PATH} element={<InquiryDetails />} />
        <Route path={NOTICE_PATH} element={<Notice />} />
          <Route path={NOTICE_BOARD_WRITE_PATH} element={<NoticeWrite />} />
          <Route path={NOTICE_BOARD_UPDATE_PATH} element={<NoticeUpdate />} />
          <Route path={NOTICE_DETAILS_PATH} element={<NoticeDetails />} /> */}
    </Routes>
  );
}

export default App;
