import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css'
import { useUserStore } from 'src/stores';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import ResponseDto from 'src/apis/response.dto';
import { INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INQUIRY_BOARD_UPDATE_ABSOLUTE_PATH, NOTICE_BOARD_LIST_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { deleteInquiryBoardRequest, getInquiryBoardRequest, postCommentRequest } from 'src/apis/board/inquiryboard';
import { GetInquiryBoardResponseDto } from 'src/apis/board/inquiryboard/dto/response';
import { PostCommentRequestDto } from 'src/apis/board/inquiryboard/dto/request';

//                    component : 문의 답변달기                  //
export default function InquiryDetail() {

    //                    state                    //
    const { loginUserEmailId, loginUserRole }  = useUserStore();
    const { inquiryNumber } = useParams();

    const [cookies] = useCookies();
    const [inquiryTitle, setInquiryTitle] = useState<string>('');
    const [inquiryWriterId, setInquiryWriterId] = useState<string>('');
    const [inquiryWriteDatetime, setInquiryWriteDatetime] = useState<string>('');
    const [inquiryContents, setInquiryContents] = useState<string>('');
    const [inquiryComment, setInquiryComment] = useState<string | null>(null);
    const [commentRows, setCommentRows] = useState<number>(1);

    //                    function                    //
    const navigator = useNavigate();

    const getInquiryBoardResponse = (result: GetInquiryBoardResponseDto | ResponseDto | null) => {
      const message =
        !result ? '서버에 문제가 있습니다.' :
        result.code === 'VF' ? '잘못된 접수번호입니다.' : 
        result.code === 'NB' ? '존재하지 않는 접수번호입니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
          alert(message);
          if (result?.code === 'AF') {
              navigator(SIGN_IN_ABSOLUTE_PATH);
              return;
          }
          navigator(NOTICE_BOARD_LIST_PATH);
          return;
      }
      
      const { inquiryTitle, inquiryWriterId, inquiryWriteDatetime, inquiryContents, comment } = result as GetInquiryBoardResponseDto;
      setInquiryTitle(inquiryTitle);
      setInquiryWriterId(inquiryWriterId);
      setInquiryWriteDatetime(inquiryWriteDatetime);
      setInquiryContents(inquiryContents);
      setInquiryComment(inquiryComment);
    };

    const postInquiryCommentResponse = (result: ResponseDto | null) => {
        
        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '입력 데이터가 올바르지 않습니다.' : 
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'WC' ? '이미 답글이 작성된 게시물입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!inquiryNumber || !cookies.accessToken) return;
        getInquiryBoardRequest(inquiryNumber, cookies.accessToken).then(getInquiryBoardResponse);
    };

    const deleteInquiryBoardResponse = (result: ResponseDto | null) => {
      const message = 
          !result ? '서버에 문제가 있습니다.' : 
          result.code === 'VF' ? '올바르지 않은 접수번호입니다.' : 
          result.code === 'NB' ? '존재하지 않는 게시물입니다.' : 
          result.code === 'AF' ? '권한이 없습니다.' : 
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
          '';
      if (!result || result.code !== 'SU') {
          alert(message);
          return;
      }
      navigator(NOTICE_BOARD_LIST_PATH);
    };

    // const postInquiryBoardResponseWrite = (result: ResponseDto | null ) => {
  
    //       const message =
    //           !result ? '서버에 문제가 있습니다.' : 
    //           result.code === 'VF' ? '제목과 내용을 모두 입력해주세요.' :
    //           result.code === 'AF' ? '인증에 실패했습니다.' :
    //           result.code === 'AF' ? '권한이 없습니다.' :
    //           result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
  
    //       if (!result || result.code !== 'SU') {
    //           alert(message);
    //           return;
    //       }
  
    //       navigator(BOARD_ABSOLUTE_PATH);
    //   };

    //   const getInquiryBoardListResponse = (result: GetInquiryBoardResponseDto | ResponseDto | null) => {
    //     const message = 
    //         !result ? '서버에 문제가 있습니다.' :
    //         result.code === 'AF' ? '인증에 실패했습니다.' : 
    //         result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    //     if (!result || result.code !== 'SU') {
    //         alert(message);
    //         if (result?.code === 'AF') navigator(BOARD_ABSOLUTE_PATH);
    //         return;
    //     }

    //   const getInquiryBoardSearchResponse = (result: GetInquiryBoardResponseDto | ResponseDto | null) => {
    //     const message = 
    //         !result ? '서버에 문제가 있습니다.' :
    //         result.code === 'AF' ? '인증에 실패했습니다.' : 
    //         result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    //     if (!result || result.code !== 'SU') {
    //         alert(message);
    //         if (result?.code === 'AF') navigator(BOARD_ABSOLUTE_PATH);
    //         return;
    //     }

    //   const putInquiryBoardResponse = (result: ResponseDto | null) => {
    //     const message =
    //         !result ? '서버에 문제가 있습니다.' :
    //         result.code === 'AF' ? '권한이 없습니다.' :
    //         result.code === 'VF' ? '모든 값을 입력해주세요.' :
    //         result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
    //         result.code === 'WC' ? '이미 답글이 작성되어있습니다.' :
    //         result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    //         if(!result || result.code !== 'SU') {
    //             alert(message);
    //             return;
    //         }

    //         if(!inquiryNumber) return;
    //         navigator(INQUIRY_BOARD_UPDATE_ABSOLUTE_PATH(inquiryNumber));
    // }

    //   const getInquiryMyListResponse = (result: GetInquiryBoardResponseDto | ResponseDto | null) => {
    //     const message = 
    //         !result ? '서버에 문제가 있습니다.' :
    //         result.code === 'AF' ? '인증에 실패했습니다.' : 
    //         result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    //     if (!result || result.code !== 'SU') {
    //         alert(message);
    //         if (result?.code === 'AF') navigator(BOARD_ABSOLUTE_PATH);
    //         return;
    //     }

    //                    event handler                    //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        const comment = event.target.value;
        setInquiryComment(inquiryComment);

        const commentRows = comment.split('\n').length;
        setCommentRows(commentRows);
    };
        
    const onCommentSubmitClickHandler = () => {
        if (!inquiryComment || !inquiryComment.trim()) return;
        if (! inquiryNumber || loginUserRole !== 'ROLE_ADMIN' || !cookies.accessToken) return;
        
        const requestBody: PostCommentRequestDto = { inquiryComment };
        postCommentRequest(inquiryNumber, requestBody, cookies.accessToken).then(postInquiryCommentResponse);
    };
    
    const onListClickHandler = () => {
        navigator(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
    };

    const onUpdateClickHandler = () => {
        if (!inquiryNumber || loginUserEmailId !== inquiryWriterId) return;
        navigator(INQUIRY_BOARD_UPDATE_ABSOLUTE_PATH(inquiryNumber));
    };

    const onDeleteClickHandler = () => {
        if (!inquiryNumber || loginUserEmailId !== inquiryWriterId || !cookies.accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;
    
        deleteInquiryBoardRequest(inquiryNumber, cookies.accessToken).then(deleteInquiryBoardResponse);
    };

    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken || !inquiryNumber) return;
    }, []);
    
    //                    render                    //
    const coverWriterId = inquiryWriterId !== '' && (inquiryWriterId[0] + '*'.repeat(inquiryWriterId.length - 1));
    return (
        <div id='qna-detail-wrapper'>
            <div className='qna-detail-main-box'>
                <div className='qna-detail-top-box'>
                    <div className='qna-detail-title-box'>{inquiryTitle}</div>
                    <div className='qna-detail-info-box'>
                        <div className='qna-detail-info'>작성자 {coverWriterId}</div>
                        <div className='qna-detail-info-divider'>{'\|'}</div>
                        <div className='qna-detail-info'>작성일 {inquiryWriteDatetime}</div>
                    </div>
                </div>
                <div className='qna-detail-contents-box'>{inquiryContents}</div>
            </div>
            {loginUserRole === 'ROLE_ADMIN' && 
            <div className='qna-detail-comment-write-box'>
                <div className='qna-detail-comment-textarea-box'>
                    <textarea style={{height: `${28 * commentRows}px`}} className='qna-detail-comment-textarea' placeholder='답글을 작성해주세요.' value={inquiryComment == null ? '' : inquiryComment} onChange={onCommentChangeHandler}/>
                </div>
                <div className='primary-button' onClick={onCommentSubmitClickHandler}>답글달기</div>
            </div>
            }
            <div className='qna-detail-comment-box'>
                <div className='primary-bedge'>답변</div>
                <div className='qna-detail-comment'>{inquiryComment}</div>
            </div>
            <div className='qna-detail-button-box'>
                <div className='primary-button' onClick={onListClickHandler}>목록보기</div>
                {loginUserEmailId === inquiryWriterId && loginUserRole === 'ROLE_USER' &&
                <div className='qna-detail-owner-button-box'>
                    <div className='second-button' onClick={onUpdateClickHandler}>수정</div>
                    <div className='error-button' onClick={onDeleteClickHandler}>삭제</div>
                </div>
                }
            </div>
        </div>
    );
}
