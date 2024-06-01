import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { getMyInfoRequest } from 'src/apis/user';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import { MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, RESTAURANT_LIST_ABSOLUTE_PATH, USER_DELETE_ABSOLUTE_PATH, USER_INFO_UPDATE_ABSOLUTE_PATH } from 'src/constant';
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
  const [status, setStatus] = useState<boolean>(false);

  // function //
  const navigator = useNavigate();

  const GetMyInfoResponse = (result : GetMyInfoResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') {
        navigator(MAIN_ABSOLUTE_PATH);
        return;
      }
      navigator(MY_PAGE_SITE_ABSOLUTE_PATH);
      return;
    }

    if (!cookies.accessToken) return;
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);

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
    if (!cookies.accessToken) return;
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);
  }, []);

  //   render   //
  return (
    <div id='authentication-wrapper'>
      <div className='my-page-big-box'>
        <div className='my-page-container'>
          <div className='my-page-title'>메인페이지</div>
          <div className='my-page-box'>
            <div className='my-page-info-box'>
              <div className='my-page-info'>{nickname}</div>
              <div className='my-page-info'>{userEmailId}</div>
              <div className='my-page-info'>{userName}</div>
              <div className='my-page-info'>{userTelNumber}</div>
              <div className='my-page-info'>{userAddress}</div>
            </div>
            <div className='my-page-link'>
              <div className='my-page-link-box' onClick={() => navigator(USER_INFO_UPDATE_ABSOLUTE_PATH)}>회원정보 수정</div>
              <div className='my-page-link-box' onClick={() => navigator(RESTAURANT_LIST_ABSOLUTE_PATH)}>찜한 식당 목록</div>
              <div className='my-page-link-box' onClick={() => {}}>예약 내역</div>
              <div className='my-page-link-box'>리뷰 내역</div>
            </div>
            <div className='my-page-delete' onClick={() => navigator(USER_DELETE_ABSOLUTE_PATH)}>회원탈퇴</div>
          </div>
        </div>
      </div>
    </div>
  )
}