import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { postNoticeBoardRequest } from 'src/apis/board';
import { PostNoticeBoardRequestDto } from 'src/apis/board/noticeboard/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import './style.css';

export default function NoticeWrite() {

  //                    state                    //
  const contentsRef = useRef<HTMLTextAreaElement | null>(null);
  const { loginUserRole } = useUserStore();
  const [cookies] = useCookies();
  const [noticeTitle, setNoticeTitle] = useState<string>('');
  const [noticeContents, setNoticeContents] = useState<string>('');
  const navigator = useNavigate();

  const postNoticeBoardResponse = (result: ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
      result.code === 'AF' ? '권한이 없습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
    }
    navigator(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
  };

  const onNoticeTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNoticeTitle(event.target.value);
  };

  const onNoticeContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const noticeContents = event.target.value;
    if (noticeContents.length > 1000) return;
    setNoticeContents(noticeContents);

    if (!contentsRef.current) return;
    contentsRef.current.style.height = 'auto';
    contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
  };

  const onPostButtonClickHandler = async () => {
    if (!noticeTitle.trim() || !noticeTitle.trim()) return;
    if (!cookies.accessToken) return;

    const requestBody: PostNoticeBoardRequestDto = { noticeTitle, noticeContents };

    postNoticeBoardRequest(requestBody, cookies.accessToken).then(postNoticeBoardResponse);
  };

  useEffect(() => {
    if (loginUserRole !== 'ROLE_ADMIN') {
      navigator(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
    }
  }, [loginUserRole]);

  return (
    <div id='notice-write-wrapper'>
      <div className='notice-write-main-box'>
        <div className='notice-write-title-box'>
          <input className='notice-write-title-input' placeholder='공지를 입력해주세요.' value={noticeTitle} onChange={onNoticeTitleChangeHandler} />
        </div>
        <div className='notice-write-contents-box'>
          <textarea ref={contentsRef} className='notice-write-contents-textarea' placeholder='내용을 입력해주세요. / 500자' maxLength={500} value={noticeContents} onChange={onNoticeContentsChangeHandler} />
          <div className='primary-button' onClick={onPostButtonClickHandler}>작성</div>
        </div>
      </div>
    </div>
  );
}