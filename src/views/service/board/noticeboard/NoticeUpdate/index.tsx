import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { getNoticeBoardRequest, patchNoticeBoardRequest } from 'src/apis/board';
import { PatchNoticeBoardRequestDto } from 'src/apis/board/noticeboard/dto/request';
import { GetNoticeBoardListResponseDto, GetNoticeBoardResponseDto } from 'src/apis/board/noticeboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_BOARD_WRITE_ABSOLUTE_PATH, NOTICE_DETAILS_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import './style.css';

//                    component                    //
export default function NoticeUpdate() {

  //                    state                    //
  const contentsRef = useRef<HTMLTextAreaElement | null>(null);

  const { loginUserEmailId, loginUserRole } = useUserStore();
  const { noticeNumber } = useParams();

  const [cookies] = useCookies();

  const [noticeWriterId, setNoticeWriterId] = useState<string>('');
  const [noticeTitle, setNoticeTitle] = useState<string>('');
  const [noticeContents, setNoticeContents] = useState<string>('');

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

    const { noticeWriterId, noticeContents, noticeTitle } = result as GetNoticeBoardResponseDto;
    if (noticeWriterId !== loginUserEmailId) {
      alert('권한이 없습니다.');
      navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
      return;
    }
    setNoticeWriterId(noticeWriterId);
    setNoticeTitle(noticeTitle)
    setNoticeContents(noticeContents);
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
  const onNoticeTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const noticeTitle = event.target.value;
    setNoticeTitle(noticeTitle);
  };

  const onNoticeContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    if (contents.length > 1000) return;
    setNoticeContents(noticeContents);

    if (!contentsRef.current) return;
    contentsRef.current.style.height = 'auto';
    contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
  };

  const onNoticeUpdateButtonClickHandler = () => {
    if (!cookies.accessToken || !noticeNumber) return;
    if (!noticeTitle.trim() || !noticeContents.trim()) return;

    const requestBody: PatchNoticeBoardRequestDto = { noticeTitle, noticeContents };
    patchNoticeBoardRequest(noticeNumber, requestBody, cookies.accessToken).then(patchNoticeBoardResponse);
  };

  //                    effect                    //
  useEffect(() => {
    if (loginUserRole === 'ROLE_ADMIN') {
      navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
      return;
    }
  }, [loginUserRole]);


  //                    render                    //
  return (
    <div id='notice-update-wrapper'>
      <div className='notice-update-main-box'>
        <div className='notice-update-title-box'>
          <input className='notice-update-title-input' placeholder='제목을 입력해주세요.' value={noticeTitle} onChange={onNoticeTitleChangeHandler} />
        </div>
        <div className='notice-update-contents-box'>
          <textarea ref={contentsRef} className='notice-update-contents-textarea' placeholder='내용을 입력해주세요. / 500자' maxLength={1000} value={noticeContents} onChange={onNoticeContentsChangeHandler} />
          <div className='primary-button' onClick={onNoticeUpdateButtonClickHandler}>수정</div>
        </div>
      </div>
    </div>
  );
};
