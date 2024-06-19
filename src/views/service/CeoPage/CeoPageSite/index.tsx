import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest } from 'src/apis/user';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { CEO_INFO_UPDATE_ABSOLUTE_PATH, CEO_PAGE_SITE_ABSOLUTE_PATH, INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH, RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH, USER_DELETE_ABSOLUTE_PATH} from 'src/constant';
import "./style.css";
import { getRestaurantIdRequest } from 'src/apis/restaurant';
import { GetRestaurantIdResponseDto } from 'src/apis/restaurant/dto/response';

// component : 마이페이지 // 
export default function CeoPageSite() {

  // state // 
  const [cookies] = useCookies();
  
  const [userEmailId, setEmailId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [restaurantId, setRestaurantId] = useState<number>();

  // function //
  const navigation = useNavigate();

  const GetMyInfoResponse = (result : GetMyInfoResponseDto | ResponseDto | null) => {

    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      if (result?.code === 'AF') {
        navigation(MAIN_ABSOLUTE_PATH);
        return;
      }
      navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
      return;
    }

    if (!cookies.accessToken) return;

    const {userEmailId, userName, businessRegistrationNumber, userTelNumber} = result as GetMyInfoResponseDto;
    setEmailId(userEmailId);
    setUserName(userName);
    setUserRole(userRole);
    setBusinessRegistrationNumber(businessRegistrationNumber);
    setUserTelNumber(userTelNumber);
  };

  const getRestaurantIdResponse = (result : GetRestaurantIdResponseDto | ResponseDto | null) => {
    
    const message = 
    !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      if (result?.code === 'AF') {
        navigation(MAIN_ABSOLUTE_PATH);
        return;
      }
      navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
      return;
    }

    if (!cookies.accessToken) return;

    const {restaurantId} = result as GetRestaurantIdResponseDto;
    setRestaurantId(restaurantId);

    navigation(RESTAURANT_INFO_ABSOLUTE_PATH(restaurantId));
  }

  //   effect   //
  useEffect(() => {
    getMyInfoRequest(cookies.accessToken)
      .then(GetMyInfoResponse);
  }, []);
  
  const onMyRestaurantInformationClickHandler = () => {
    getRestaurantIdRequest(cookies.accessToken)
      .then(getRestaurantIdResponse);
  } 
  

  //   render   //
  return (
    <div id='ceo-page-wrapper'>
      <div className='ceo-page-container'>
        <div className='ceo-page-top'>
          <div className='ceo-page-top-title'>사장페이지</div>
          <div className='short-divider-line'></div>
        </div>
        <div className='ceo-page-navigation-box'>
          <div className='ceo-page-navigation' onClick={() => navigation(CEO_PAGE_SITE_ABSOLUTE_PATH)}>사장페이지</div>
          <div className='ceo-page-navigation' onClick={() => navigation(CEO_INFO_UPDATE_ABSOLUTE_PATH(userEmailId))}>사장정보 수정</div>
          <div className='ceo-page-navigation' onClick={() => navigation(USER_DELETE_ABSOLUTE_PATH(userEmailId))}>회원탈퇴</div>
        </div>
        <div className='short-divider-line'></div>
        <div className='ceo-page-contents-nav-box'>
            <div className='ceo-page-nav' onClick={() => navigation(RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH)}>예약 내역</div>
            <div className='ceo-page-nav' onClick={onMyRestaurantInformationClickHandler}>내 식당 정보</div>
            <div className='ceo-page-nav' onClick={() => navigation(INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH)}>내 문의내역</div>
        </div>
        <div className='short-divider-bottom-line'></div>
        <div className='ceo-page-info-contents-container'>
          <div className='ceo-page-contents-title'>회원정보</div>
          <div className='ceo-page-contents-box'>
            <div className='ceo-page-info-first'>
              <div className='ceo-page-info'>아이디</div>
              <div className='ceo-page-info'>{userEmailId}</div>
            </div>
            <div className='ceo-page-info-second'>
              <div className='ceo-page-info'>이름</div>
              <div className='ceo-page-info'>{userName}</div>
            </div>
            <div className='ceo-page-info-second'>
              <div className='ceo-page-info'>전화번호</div>
              <div className='ceo-page-info'>{userTelNumber}</div>
            </div>
            <div className='ceo-page-info-second'>
              <div className='ceo-page-info'>사업번호</div>
              <div className='ceo-page-info'>{businessRegistrationNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}