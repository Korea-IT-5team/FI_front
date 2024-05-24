import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { getNoticeBoardRequest, patchNoticeBoardRequest } from 'src/apis/board';
import { PatchNoticeBoardRequestDto } from 'src/apis/board/noticeboard/dto/request';
import { GetNoticeBoardListResponseDto, GetNoticeBoardResponseDto } from 'src/apis/board/noticeboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_BOARD_WRITE_ABSOLUTE_PATH, NOTICE_DETAILS_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';

//                    component                    //
export default function NoticeUpdate() {

  //                    state                    //
  const contentsRef = useRef<HTMLTextAreaElement | null>(null);
  const { loginUserEmailId, loginUserRole } = useUserStore();
  const { noticeNumber } = useParams();
  const [cookies] = useCookies();
  const [noticeWriteId, setNoticeWriterId] = useState<string>('');
  const [noticeWriteDatetime, setNoticeWriteDatetime] = useState<string>('');
  const [noticeContents, setNoticeContents] = useState<string>('');
  const [noticeTitle, setNoticeTitle] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const getNoticeBoardResponse = (result: GetNoticeBoardResponseDto | ResponseDto | null) => {

    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
          result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
              result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
      return;
    }

    const { noticeWriterId, noticeWriteDatetime, noticeContents, noticeTitle } = result as GetNoticeBoardResponseDto;
    if (noticeWriteId !== loginUserEmailId) {
      alert('권한이 없습니다.');
      navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
      return;
    }

    setNoticeWriterId(noticeWriteId);
    setNoticeWriteDatetime(noticeWriteDatetime);
    setNoticeContents(noticeContents);
    setNoticeTitle(noticeTitle)
  };

  const patchNoticeBoardResponse = (result: ResponseDto | null) => {

    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '권한이 없습니다.' :
          result.code === 'VF' ? '모든 값을 입력해주세요.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
              result.code === 'WC' ? '이미 답글이 작성되어있습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
    }

    if (!noticeNumber) return;
    navigator(NOTICE_DETAILS_ABSOLUTE_PATH(noticeNumber));
  };
  
  //                    event handler                    //
  const NoticeTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const noticeTitle = event.target.value;
    setNoticeTitle(noticeTitle);
  };

  const NoticeContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    if (contents.length > 1000) return;
    setNoticeContents(noticeContents);

    if (!contentsRef.current) return;
    contentsRef.current.style.height = 'auto';
    contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
};

const NoticeUpdateButtonClickHandler = () => {
  if (!cookies.accessToken || !noticeNumber) return;
  if(!noticeTitle.trim() || !noticeContents.trim()) return;

  const requestBody: PatchNoticeBoardRequestDto = {noticeTitle, noticeContents};
  patchNoticeBoardRequest(noticeNumber, requestBody, cookies.accessToken).then(patchNoticeBoardResponse);
};

//                    effect                    //
let effectFlag = false;
useEffect(() => {
    if (!noticeNumber || !cookies.accessToken) return;
    if(!loginUserRole) return;
    if(effectFlag) return;
    effectFlag = true;
    if(loginUserRole !== 'ROLE_USER') {
      navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
      return;
    }
    getNoticeBoardRequest(noticeNumber, cookies.accessToken).then(getNoticeBoardResponse);
}, [loginUserRole]);


//                    render                    //
  return (
    <div >dsfsdfd</div>
  )
};
