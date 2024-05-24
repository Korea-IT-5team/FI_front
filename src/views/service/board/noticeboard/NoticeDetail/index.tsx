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

    const { loginUserEmailId, loginUserRole } = useUserStore();
    const { noticeNumber } = useParams();

    const [cookies] = useCookies();
    const [noticeTitle, setNoticeTitle] = useState<string>('');
    const [noticeWriterId, setNoticeWriterId] = useState<string>('');
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

        const { noticeTitle, noticeWriterId, noticeWriteDatetime, noticeContents, viewCount } = result as GetNoticeBoardResponseDto;
        setNoticeTitle(noticeTitle);
        setNoticeWriterId(noticeWriterId);
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
        if (!noticeNumber || loginUserEmailId !== noticeWriterId) return;
        navigator(NOTICE_BOARD_UPDATE_ABSOLUTE_PATH(noticeNumber));
    };

    const onDeleteClickHandler = () => {
        if (!noticeNumber || loginUserEmailId !== noticeWriterId || !cookies.accessToken) return;
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
    return (
        <div id='notice-detail-wrapper'>
            <div className='notice-detail-main-box'>
                <div className='notice-detail-contents-box'>
                    <div className='notice-detail-title'>제목{noticeTitle}</div>
                        <div className='notice-detail-info-box'>
                            <div className='notice-detail-mini-box'>
                                <div className='notice-detail-writer-id'>작성자 {noticeWriterId}</div>
                                <div className='qna-detail-info-divider'>{'\|'}</div>
                                <div className='notice-detail-date'>날짜 {noticeWriteDatetime}</div>
                                <div className='qna-detail-info-divider'>{'\|'}</div>
                                <div className='notice-detail-count'>조회수 {viewCount}</div>
                            </div>
                                <div className='notice-detail-content'>내용</div>
                        </div>
                    </div>
                <div className='notice-detail-update-delete-box'>
                    <div className='notice-detail-update'>수정</div>
                    <div className='notice-detail-delete'>삭제</div>
                </div>
            </div>
        </div>
    );
}