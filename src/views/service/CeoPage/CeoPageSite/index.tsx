import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest } from 'src/apis/user';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { CEO_DELETE_ABSOLUTE_PATH, CEO_INFO_UPDATE_ABSOLUTE_PATH, INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH} from 'src/constant';
import "./style.css";

// component : 마이페이지 // 
export default function CeoPageSite() {

  // state // 
  const [cookies] = useCookies();
  
  const [userEmailId, setEmailId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState<string>('');
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

    const {userEmailId, nickname, userName, userTelNumber, userAddress, businessRegistrationNumber} = result as GetMyInfoResponseDto;
    setEmailId(userEmailId);
    setUserName(userName);
    setUserRole(userRole);
    setBusinessRegistrationNumber(businessRegistrationNumber);

  };

  //   effect   //
  useEffect(() => {
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);
  }, []);

  //   render   //
  return (
    <div id='my-page-wrapper'>
      <div className='my-page-container'>
        <div className='my-page-title'>회원 정보</div>
        <div className='my-page-box'>
          <div className='my-page-info-box'>
            <div className='my-page-info'>{userName}</div>
            <div className='my-page-info'>{userEmailId}</div>
            <div className='my-page-info'>{businessRegistrationNumber}</div>
          </div>
          <div className='my-page-nav-box'>
            <div className='my-page-nav' onClick={() => navigation(CEO_INFO_UPDATE_ABSOLUTE_PATH(userEmailId))}>사장정보 수정</div>
            <div className='my-page-nav' onClick={() => navigation(RESTAURANT_RESERVATION_ABSOLUTE_LIST_PATH)}>예약 내역</div>
            <div className='my-page-nav' onClick={() => navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_LIST_PATH)}>리뷰 내역</div>
            <div className='my-page-nav' onClick={() => navigation(INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH)}>내 문의내역</div>
          </div>
        </div>
        <div className='my-page-resign' onClick={() => navigation(CEO_DELETE_ABSOLUTE_PATH(userEmailId))}>회원탈퇴</div>
      </div>
    </div>
  )
}