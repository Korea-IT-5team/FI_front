import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { useUserStore } from 'src/stores';
import { GetNoticeBoardResponseDto } from 'src/apis/board/noticeboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { BOARD_ABSOLUTE_PATH, NOTICE_BOARD_UPDATE_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { deleteNoticeBoardRequest, getNoticeBoardRequest, increaseViewCountRequest } from 'src/apis/board';

//                    component                    //
export default function NoticeDetail() {

    //                    state                    //
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    const { loginUserId, loginUserRole } = useUserStore();
    const { noticeNumber } = useParams();

    const [cookies] = useCookies();
    const [noticeTitle, setNoticeTitle] = useState<string>('');
    const [noticeWriteId, setNoticeWriterId] = useState<string>('');
    const [noticeWriteDatetime, setNoticeWriteDatetime] = useState<string>('');
    const [noticeContents, setNoticeContents] = useState<string>('');
    const [viewCount, setViewCount] = useState<number>(0);

    //                    function                    //
    const navigator = useNavigate();

    const increaseViewCountResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 공지번호입니다.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(SIGN_IN_ABSOLUTE_PATH);
                return;
            }
            navigator(BOARD_ABSOLUTE_PATH);
            return;
        }

        if (!cookies.accessToken || !noticeNumber) return;
        getNoticeBoardRequest(noticeNumber, cookies.accessToken)
            .then(getNoticeBoardResponse);
    };

    const getNoticeBoardResponse = (result: GetNoticeBoardResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 공지번호입니다.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            if (result?.code === 'AF') {
                navigator(SIGN_IN_ABSOLUTE_PATH);
                return;
            }
            navigator(BOARD_ABSOLUTE_PATH);
            return;
        }

        const { noticeTitle, noticeWriteId, noticeWriteDatetime, noticeContents, viewCount } = result as GetNoticeBoardResponseDto;
        setNoticeTitle(noticeTitle);
        setNoticeWriterId(noticeWriteId);
        setNoticeWriteDatetime(noticeWriteDatetime);
        setNoticeContents(noticeContents);
        setViewCount(viewCount);
    };

    const deleteNoticeBoardResponse = (result: ResponseDto | null) => {
        const message = 
            !result ? '서버에 문제가 있습니다.' : 
            result.code === 'AF' ? '권한이 없습니다.' : 
            result.code === 'VF' ? '올바르지 않은 접수번호입니다.' : 
            result.code === 'NB' ? '존재하지 않는 게시물입니다.' : 
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            '';
        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }
        navigator(BOARD_ABSOLUTE_PATH);
        };

    
    //                    event handler                    //    
    const onListClickHandler = () => {
        navigator(BOARD_ABSOLUTE_PATH);
    };

    const onUpdateClickHandler = () => {
        if (!noticeNumber || loginUserId !== noticeWriteId) return;
        navigator(NOTICE_BOARD_UPDATE_ABSOLUTE_PATH(noticeNumber));
    };

    const onDeleteClickHandler = () => {
        if (!noticeNumber || loginUserId !== noticeWriteId || !cookies.accessToken) return;
        const isConfirm = window.confirm('게시물을 삭제하시겠습니까?');
        if (!isConfirm) return;
    
        deleteNoticeBoardRequest(noticeNumber, cookies.accessToken).then(deleteNoticeBoardResponse);
    };

    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken || !noticeNumber) return;
        increaseViewCountRequest(noticeNumber, cookies.accessToken)
            .then(increaseViewCountResponse);
    }, []);
    
    //                    render                    //
    const coverdWriterId = noticeWriteId !== '' && (noticeWriteId[0] + '*'.repeat(noticeWriteId.length - 1));
    return (
        <div id='qna-detail-wrapper'>
            <div id='detail-main-box'>
                <div id='detail-board-box'>
                    <div id='detail-top-box'></div>
                    <div id='detail-search-box'></div>
                    <div id='detail-info-box'>
                        <div id='detail-info-box-right'>
                            <div className='detail-info-box-number'>번호</div>
                            <div className='detail-info-box-status'>상태</div>
                            <div className='detail-info-box-title'>제목</div>
                            <div className='detail-info-box-writer'>작성자</div>
                            <div className='detail-info-box-write-date'>작성시간</div>
                        </div>
                    </div>
                    <div id='detail-page-box'>
                        <div className='detail-page-number'>페이지네이션</div>
                        <div className='detail-writer-button'>글쓰기버튼</div>
                    </div>
                </div>
            </div>
        </div>
    );
}