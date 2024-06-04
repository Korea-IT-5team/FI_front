import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import "./style.css";
import { MY_PAGE_SITE_ABSOLUTE_PATH, USER_INFO_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { getMyInfoRequest, patchUserInfoRequest } from 'src/apis/user';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { GetMyInfoResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { PatchUserInfoRequestDto } from 'src/apis/user/dto/request';
import { useUserStore } from 'src/stores';

// component : 회원정보 수정 //
export default function UserInfoUpdate() {

  // state // 
  const [cookies] = useCookies();
  const { userEmailId: paramUserEmailId } = useParams<{ userEmailId: string }>();
  const { loginUserEmailId, loginUserRole } = useUserStore();
  const [userEmailId, setEmailId] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userTelNumber, setUserTelNumber] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');

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
        navigator(MY_PAGE_SITE_ABSOLUTE_PATH);
        return;
      }

      // navigator(USER_INFO_UPDATE_ABSOLUTE_PATH(paramUserEmailId));
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

  const PatchUpdateMyInfoResponse = (result: ResponseDto | null) => {

    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'NU' ? '사용자 정보 불일치.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
      }

      navigator(USER_INFO_UPDATE_ABSOLUTE_PATH);
    }

  // event handler // 
  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;
    setNickname(nickname);
  };

  const onUserAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const userAddress = event.target.value;
    setUserAddress(userAddress);
  }

  const onUpdateButtonClickHandler = () => {
    if (!cookies.accessToken) return;
    if (!nickname.trim() || !userAddress.trim()) return;

    const requestBody: PatchUserInfoRequestDto = {nickname, userAddress};
    patchUserInfoRequest(requestBody, cookies.accessToken).then(PatchUpdateMyInfoResponse);
  };

  //   effect   //
  let effectFlag = false;
  useEffect(() => {
    if (!cookies.accessToken) return;
    if (!loginUserRole) return;
    if (effectFlag) return;
    effectFlag = true;
    if (loginUserRole !== 'ROLE_USER') {
      navigator(MY_PAGE_SITE_ABSOLUTE_PATH);
      return;
    }
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);
  }, [loginUserRole]);

  // render // 
  return (
    <div id='authentication-wrapper'>
      <div className='my-page-big-box'>
        <div className='my-page-container'>
          <div className='my-page-title'>메인페이지</div>
          <div className='my-page-box'>
            <div className='my-page-info-box'>
              <input
                type='text'
                value={nickname}
                onChange={onNicknameChangeHandler}
                placeholder='닉네임을 입력해주세요.'
                className='my-page-input'
              />
              
              <div className='my-page-info'>{userEmailId}</div>
              
              <div className='my-page-info'>{userName}</div>

              <div className='my-page-info'>{userTelNumber}</div>
              
              <input
                type='text'
                value={userAddress}
                onChange={onUserAddressChangeHandler}
                placeholder='주소를 입력해주세요.'
                className='my-page-input'
              />
            </div>
            <div className='my-page-delete' onClick={onUpdateButtonClickHandler}>수정</div>
          </div>
        </div>
      </div>
    </div>
  )

};
