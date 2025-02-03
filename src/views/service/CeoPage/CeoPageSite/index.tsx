import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest } from 'src/apis/user';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH, RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH } from 'src/constant';
import { getRestaurantIdRequest } from 'src/apis/restaurant';
import { GetRestaurantIdResponseDto } from 'src/apis/restaurant/dto/response';
import "./style.css";
import Modal from 'src/components/Modal';
import UserDelete from '../../Mypage/UserDelete';

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
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

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

    const onClickToggleModal = useCallback(() => {
      setOpenModal(!isOpenModal);
    }, [isOpenModal]);

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
        </div>
        <div className='ceo-page-contents-nav-box'>
            <div className='ceo-page-nav' onClick={() => navigation(RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH)}>예약 내역</div>
            <div className='ceo-page-nav' onClick={onMyRestaurantInformationClickHandler}>나의 식당 정보</div>
            <div className='ceo-page-nav' onClick={() => navigation(INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH)}>서비스 문의 내역</div>
        </div>
        <div className='short-divider-bottom-line'></div>
        <div className='my-page-info-contents-container'>
          <div className='my-page-contents-title'>회원정보</div>
          <div className='my-page-contents-box'>
            <div className='my-page-info'>
              <div className='my-page-info-first'>아이디</div>
              <div className='my-page-info-second'>{userEmailId}</div>
            </div>
            <div className='my-page-info'>
              <div className='my-page-info-first'>이름</div>
              <div className='my-page-info-second'>{userName}</div>
            </div>
            <div className='my-page-info'>
              <div className='my-page-info-first'>전화번호</div>
              <div className='my-page-info-second'>{userTelNumber}</div>
            </div>
            <div className='my-page-info'>
              <div className='my-page-info-first'>운영 중인 식당 수</div>
              <div className='my-page-info-second'>9</div>
            </div>
          </div>
            {isOpenModal && (
              <Modal onClickToggleModal={onClickToggleModal}>
                <UserDelete />
              </Modal>
            )}
            <div className='primary-button' onClick={onClickToggleModal}>회원 탈퇴</div>
        </div>
      </div>
    </div>
  );
}