import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import "./style.css";
import { MAIN_ABSOLUTE_PATH, MY_PAGE_SITE_ABSOLUTE_PATH, USER_DELETE_ABSOLUTE_PATH, USER_INFO_UPDATE_ABSOLUTE_PATH } from 'src/constant';
import { getMyInfoRequest, patchUserInfoRequest } from 'src/apis/user';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { GetMyInfoResponseDto, PatchUserInfoResponseDto } from 'src/apis/user/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { PatchUserInfoRequestDto } from 'src/apis/user/dto/request';
import { useUserStore } from 'src/stores';
import InputBox from 'src/components/InputBox';

// component: 회원정보 수정 //
export default function UserInfoUpdate() {

  // state // 
  const [cookies] = useCookies();
  const { loginUserRole } = useUserStore();
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
      alert(message);
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
    if (!cookies.accessToken) return;
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);
  }, []);

  // function //
  const PatchUpdateUserInfoResponse = (result: PatchUserInfoResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'NU' ? '사용자 정보가 일치하지 않습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccess = result && result.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    alert('정보가 성공적으로 수정되었습니다.');
    navigation(USER_INFO_UPDATE_ABSOLUTE_PATH(userEmailId));
  };

  // event handler //
  const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const nickname = event.target.value;
    setNickname(nickname);
  };

  const onUserAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const userAddress = event.target.value;
    setUserAddress(userAddress);
  };

  const onUpdateButtonClickHandler = () => {
    if (!cookies.accessToken || !userEmailId) return;
    if (!nickname.trim() || !userAddress.trim()) return;

    const requestBody: PatchUserInfoRequestDto = { nickname, userAddress };
    patchUserInfoRequest(userEmailId, requestBody, cookies.accessToken).then(PatchUpdateUserInfoResponse);
  };

  // useEffect //
  let effectFlag = useRef(false);
  useEffect(() => {
    if (!cookies.accessToken) return;
    if (!loginUserRole) return;
    if (effectFlag.current) return;
    effectFlag.current = true;
    if (loginUserRole !== 'ROLE_USER') {
      navigation(MY_PAGE_SITE_ABSOLUTE_PATH);
      return;
    }
    getMyInfoRequest(cookies.accessToken).then(GetMyInfoResponse);
  }, [loginUserRole, cookies.accessToken]);

  // render //
  return (
    <div id='my-page-wrapper'>
      <div className='my-page-container'>
        <div>
          <div className='my-page-update-top-title'>회원정보 수정</div>
          <div className='short-divider-line'></div>
        </div>
        <div className='my-page-title-box'>
          <div className='my-page-title' onClick={() => navigation(MY_PAGE_SITE_ABSOLUTE_PATH)}>마이페이지</div>
          <div className='my-page-title' onClick={() => navigation(USER_INFO_UPDATE_ABSOLUTE_PATH(userEmailId))}>회원정보 수정</div>
          <div className='my-page-title' onClick={() => navigation(USER_DELETE_ABSOLUTE_PATH(userEmailId))}>회원탈퇴</div>
        </div>
        <div className='short-divider-bottom-line'></div>
        <div className='my-page-update-container'>
          <div className='my-page-contents-title'>회원정보 수정</div>
          <div className='my-page-update-contents-box'>
            <div className='my-page-update-info-first'>
              <div className='my-page-update-info'>닉네임</div>
              <InputBox type='text' value={nickname} placeholder='닉네임을 입력해주세요.' onChangeHandler={onNicknameChangeHandler} />
            </div>
            <div className='my-page-update-info-first'>
              <div className='my-page-update-info'>아이디</div>
              <div className='my-page-update-info'>{userEmailId}</div>
            </div>
            <div className='my-page-update-info-first'>
              <div className='my-page-update-info'>이름</div>
              <div className='my-page-update-info'>{userName}</div>
            </div>
            <div className='my-page-update-info-first'>
              <div className='my-page-update-info'>전화번호</div>
              <div className='my-page-update-info'>{userTelNumber}</div>
            </div>
            <div className='my-page-update-info-first'>
              <div className='my-page-update-info'>주소</div>
              <InputBox type='text' value={userAddress}  placeholder='주소를 입력해주세요.' onChangeHandler={onUserAddressChangeHandler} />
            </div>
          </div>
          <div className='my-page-update' onClick={onUpdateButtonClickHandler}>수정</div>
        </div>
      </div>
    </div>
  );
}
