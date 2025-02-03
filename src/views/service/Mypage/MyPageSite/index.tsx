import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest } from 'src/apis/user';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_FAVORITE_ABSOLUTE_LIST_PATH, RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH } from 'src/constant';
import "./style.css";
import Modal from 'src/components/Modal';
import UserDelete from '../UserDelete';

// component: 마이페이지 //
export default function MyPageSite() {

  // state //
  const [cookies] = useCookies();

  const [userEmailId, setEmailId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
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

    const {userEmailId, nickname, userName, userTelNumber, userAddress} = result as GetMyInfoResponseDto;
    setNickname(nickname);
    setEmailId(userEmailId);
    setUserName(userName);
    setUserTelNumber(userTelNumber);
    setUserAddress(userAddress);
    setUserRole(userRole);
  };

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  //   effect   //
  useEffect(() => {
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);
  }, []);

  //   render   //
  return (
    <div id='my-page-wrapper'>
      <div className='my-page-container'>
        <div className='my-page-top'>
          <div className='my-page-top-title'>마이페이지</div>
        </div>
        <div className='my-page-contents-nav-box'>
          <div className='my-page-contents-nav' onClick={() => navigation(RESTAURANT_FAVORITE_ABSOLUTE_LIST_PATH)}>찜한 식당 목록</div>
          <div className='my-page-contents-nav' onClick={() => navigation(RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH)}>예약 내역</div>
          <div className='my-page-contents-nav' onClick={() => navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH)}>리뷰 내역</div>
          <div className='my-page-contents-nav' onClick={() => navigation(INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH)}>서비스 문의 내역</div>
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
              <div className='my-page-info-first'>닉네임</div>
              <div className='my-page-info-second'>{nickname}</div>
            </div>
            <div className='my-page-info'>
              <div className='my-page-info-first'>이름</div>
              <div className='my-page-info-second'>{userName}</div>
            </div>
            <div className='my-page-info'>
              <div className='my-page-info-first'>전화번호</div>
              <div className='my-page-info-second'>{userTelNumber}</div>
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