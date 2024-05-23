import { useCookies } from 'react-cookie';
import { Route, Routes, useNavigate } from 'react-router';
import { AUTH_PATH, BUSINESS_REGISTRATION_PATH, FIND_EMAIL_PATH, RESTAURANT_INFO_PATH, RESTAURANT_LIST_PATH, RESTAURANT_PATH, SIGN_IN_PATH, SIGN_UP_PATH, SNS_PATH } from './constant';
import ServiceContainer from './layouts/ServiceContainer';
import Restaurant from './views/Restaurant';
import RestaurantInfo from './views/RestaurantInfo';
import SignIn, { Sns } from './views/Authentication/SignIn';
import Authentication from './layouts/AuthenticationContainer';
import SignUp from './views/Authentication/SignUp';
import BusinessRegistration from './views/Authentication/BusinessRegistration';

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
      <Route index element={<Index />} />
      <Route path={SNS_PATH} element={<Sns />} />
      <Route path={AUTH_PATH} element={<Authentication />} >
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={SIGN_UP_PATH} element={<SignUp />} />
        <Route path={BUSINESS_REGISTRATION_PATH} element={<BusinessRegistration />} />
        {/* <Route path={FIND_EMAIL_PATH} element={<FindEmail />} /> */}
        {/* <Route path={FIND_PASSWORD_PATH} element={<FindPassword />} />
        <Route path={PASSWORD_RESET_PATH} element={<PasswordReset />} /> */}
      </Route>
      <Route path={RESTAURANT_PATH} element={<ServiceContainer/>} />
        <Route path={RESTAURANT_LIST_PATH} element={<Restaurant/>}/>  
        <Route path={RESTAURANT_INFO_PATH} element={<RestaurantInfo />} />
        {/*
        <Route path={RESTAURANT_RESERVATION_PATH} element={<RestaurantReservation />} />
        <Route path={RESTAURANT_RESERVATION_INFO_PATH} element={<RestaurantReservationInfo />} /> */}


      {/* <Route path={MYPAGE_PATH} element={<MyPage />} />
        <Route path={USER_INFO_UPDATE_PATH} element={<UserInfoUpdate />} />
        <Route path={USER_DELETE_PATH} element={<UserDelete />} />
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
    </Routes>
  );
}

export default App;
