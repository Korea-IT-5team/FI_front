import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { postNoticeBoardRequest } from 'src/apis/board';
import { PostNoticeBoardRequestDto } from 'src/apis/board/noticeboard/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { NOTICE_BOARD_WRITE_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';

//                    component                    //
export default function NoticeWrite() {
  //                    state                    //
  const contentsRef = useRef<HTMLTextAreaElement | null>(null);
  const { loginUserRole } = useUserStore();
  const { noticeNumber } = useParams();
  const [cookies] = useCookies();
  const [noticeWriteId, setNoticeWriterId] = useState<string>('');
  const [noticeWriteDatetime, setNoticeWriteDatetime] = useState<string>('');
  const [noticeContents, setNoticeContents] = useState<string>('');
  const [noticeTitle, setNoticeTitle] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const postBoardResponse = (result: ResponseDto | null ) => {

      const message =
          !result ? '서버에 문제가 있습니다.' : 
          result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
          result.code === 'AF' ? '권한이 없습니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

      if (!result || result.code !== 'SU') {
          alert(message);
          return;
      }

      navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
  };

  //                    event handler                    //
  const NoticeTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const noticeTitle = event.target.value;
    setNoticeTitle(noticeTitle);
};

const NoticeContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
  const noticecontents = event.target.value;
  if (noticecontents.length > 1000) return;
  setNoticeContents(noticecontents);

  if (!contentsRef.current) return;
  contentsRef.current.style.height = 'auto';
  contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
};

const onPostButtonClickHandler = () => {
  if (!noticeTitle.trim() || !noticeTitle.trim()) return;
  if (!cookies.accessToken) return;

  const requestBody: PostNoticeBoardRequestDto = { noticeTitle, noticeContents };

  postNoticeBoardRequest(requestBody, cookies.accessToken).then(postBoardResponse);
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
    <div>
      공지 글쓰기 창입니다!
    </div>
  )
}
