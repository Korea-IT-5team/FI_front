import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest } from 'src/apis/user';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_FAVORITE_ABSOLUTE_LIST_PATH, RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH, USER_DELETE_ABSOLUTE_PATH, USER_INFO_UPDATE_ABSOLUTE_PATH} from 'src/constant';
import "./style.css";

// component : 마이페이지 // 
export default function MyPageSite() {

  // state // 
  const [cookies] = useCookies();
  
  const [userEmailId, setEmailId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

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
          <div className='short-divider-line'></div>
        </div>
        <div className='my-page-navigation-box'>
          <div className='my-page-navigation' onClick={() => navigation(MY_PAGE_SITE_ABSOLUTE_PATH)}>마이페이지</div>
          <div className='my-page-navigation' onClick={() => navigation(USER_INFO_UPDATE_ABSOLUTE_PATH(userEmailId))}>회원정보 수정</div>
          <div className='my-page-navigation' onClick={() => navigation(USER_DELETE_ABSOLUTE_PATH(userEmailId))}>회원탈퇴</div>
        </div>
        <div className='short-divider-line'></div>
        <div className='my-page-contents-nav-box'>
          <div className='my-page-contents-nav' onClick={() => navigation(RESTAURANT_FAVORITE_ABSOLUTE_LIST_PATH)}>찜한 식당 목록</div>
          <div className='my-page-contents-nav' onClick={() => navigation(RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH)}>예약 내역</div>
          <div className='my-page-contents-nav' onClick={() => navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH)}>리뷰 내역</div>
          <div className='my-page-contents-nav' onClick={() => navigation(INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH)}>내 문의내역</div>
        </div>
        <div className='short-divider-bottom-line'></div>
        <div className='my-page-info-contents-container'>
          <div className='my-page-contents-title'>회원정보</div>
          <div className='my-page-contents-box'>
            <div className='my-page-info-first'>
              <div className='my-page-info'>아이디</div>
              <div className='my-page-info'>{userEmailId}</div>
            </div>
            <div className='my-page-info-first'>
              <div className='my-page-info'>닉네임</div>
              <div className='my-page-info'>{nickname}</div>
            </div>
            <div className='my-page-info-first'>
              <div className='my-page-info'>이름</div>
              <div className='my-page-info'>{userName}</div>
            </div>
            <div className='my-page-info-first'>
              <div className='my-page-info'>전화번호</div>
              <div className='my-page-info'>{userTelNumber}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}