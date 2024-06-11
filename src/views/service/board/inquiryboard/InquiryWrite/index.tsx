import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { postInquiryBoardRequest } from 'src/apis/board/inquiryboard';
import { PostInquiryBoardRequestDto } from 'src/apis/board/inquiryboard/dto/request';
import ResponseDto from 'src/apis/response.dto';
import { INQUIRY_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import './style.css';

// component : 문의 글쓰기 // 
export default function InquiryWrite() {

  //                    state                    //
  const contentsRef = useRef<HTMLTextAreaElement | null>(null);

  const { loginUserRole } = useUserStore();

  const [cookies] = useCookies();
  
  const [isInquiryPublic, setIsInquiryPublic] = useState<boolean>(false);
  const [inquiryTitle, setInquiryTitle] = useState<string>('');
  const [inquiryContents, setInquiryContents] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();

  const postBoardResponse = (result: ResponseDto | null) => {

    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
          result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
    }
    navigator(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
  };

  //                    event handler                    //
  const onInquiryTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inquiryTitle = event.target.value;
    setInquiryTitle(inquiryTitle);
  };

  const onInquiryContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inquiryContents = event.target.value;
    if (inquiryContents.length > 500) return;
    setInquiryContents(inquiryContents);

    if (!contentsRef.current) return;
    contentsRef.current.style.height = 'auto';
    contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
  };

  const onPostButtonClickHandler = () => {
    if (!inquiryTitle.trim() || !inquiryTitle.trim()) return;
    if (!cookies.accessToken) return;

    const requestBody: PostInquiryBoardRequestDto = { inquiryTitle, inquiryContents, isInquiryPublic };

    postInquiryBoardRequest(requestBody, cookies.accessToken).then(postBoardResponse);
  };

  const onPublicButtonClickHandler = () => {
    setIsInquiryPublic(!isInquiryPublic);
  }

  //                    effect                    //
  useEffect(() => {
    if (!cookies.accessToken) {
      navigator(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }
    if (loginUserRole === 'ROLE_ADMIN') {
      navigator(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }
  }, [loginUserRole]);

  //                    render                    //
  const publicButtonClass = isInquiryPublic ? 'public-button' : 'un-public-button';
  return (
    <div id='inquiry-write-wrapper'>
      <div className='inquiry-write-main-box'>
        <div className='inquiry-write-title-box'>
          <input className='inquiry-write-title-input' placeholder='제목을 입력해주세요.' value={inquiryTitle} onChange={onInquiryTitleChangeHandler} />
        </div>
        <div className='inquiry-write-contents-box'>
          <textarea ref={contentsRef} className='inquiry-write-contents-textarea' placeholder='내용을 입력해주세요. / 500자' maxLength={500} value={inquiryContents} onChange={onInquiryContentsChangeHandler} />
          <div className='inquiry-bottom-button-box'>
            <div className={publicButtonClass} onClick={onPublicButtonClickHandler}>{ isInquiryPublic ? '공개' : '비공개' }</div>
            <div className='primary-button' onClick={onPostButtonClickHandler}>작성</div>
          </div>
        </div>
      </div>
    </div>
  );
}