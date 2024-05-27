import React, { useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetNoticeBoardListResponseDto, GetNoticeBoardResponseDto, GetSearchNoticeBoardResponseDto } from 'src/apis/board/noticeboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { AUTH_PATH, COUNT_PER_PAGE, COUNT_PER_SECTION, NOTICE_DETAILS_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { NoticeBoardListItem } from 'src/types'

// component //
function ListItem ({
  noticeNumber,
  noticeTitle,
  noticeWriteId,
  noticeWriteDatetime,
  noticeViewCount
}: NoticeBoardListItem) {

  //    function    //
  const navigator = useNavigate();

  //   event handler   //
  const onClickHandler = () => navigator(NOTICE_DETAILS_ABSOLUTE_PATH(noticeNumber));

  //   render   //
  return(
    <div className='notice-list-table-tr' onClick={onClickHandler}>
      <div className='notice-list-table-reception-number'>{noticeNumber}</div>
      <div className='qna-list-table-title'>{noticeTitle}</div>
      <div className='qna-list-table-write-date'>{noticeWriteDatetime}</div>
      <div className='qna-list-table-viewCount'>{noticeViewCount}</div>
    </div>
  );
}

// component: 공지사항 목록보기 //
export default function NoticeList() {
  //                    state                    //
  const {loginUserEmailId, loginUserRole} = useUserStore();

  const [cookies] = useCookies();

  const [noticeNumber, setNoticeList] = useState<NoticeBoardListItem[]>([]);
  const [boardList, setBoardList] = useState<NoticeBoardListItem[]>([]);
  const [viewList, setViewList] = useState<NoticeBoardListItem[]>([]);
  const [totalLenght, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);

  const [searchWord, setSearchWord] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();
  
  const changePage = (noticeBoardList: NoticeBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = noticeBoardList.slice(startIndex, endIndex);
    setViewList(viewList);
  };

  const changeSection = (totalPage: number )=> {
    if (!currentSection) return;
    const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
    let endPage = currentSection * COUNT_PER_SECTION;
    if(endPage > totalPage) endPage = totalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setPageList(pageList);
  };

  const getNoticeBoardListResponse = (result: GetNoticeBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
          result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') navigator(SIGN_IN_ABSOLUTE_PATH);
      return;
    }

    const { noticeBoardList } = result as GetNoticeBoardListResponseDto;

    setCurrentPage(!noticeBoardList.length ? 0 : 1);
    setCurrentSection(!noticeBoardList.length ? 0 : 1);
  };
  // 공지 리스트
  return(
    <div id='notice-list-wrapper'>
      <div className='notice-list-top'>
        <div className='notice-list-size-text'>전체
        <span className='emphasis'>999건</span>| 페이지 <span className='emphasis'>2/820</span></div>
        <div className='notice-list-top-right'>
          <div className='primary-button'>공지 작성</div>
        </div>
      </div>
      <div className='notice-list-table'>
        <div className='notice-list-table-reception-number'>번호</div>
        <div className='notice-list-table-title'>공지제목</div>
        <div className='notice-list-table-writer-date'>작성일자</div>
        <div className='notice-list-table-viewcount'>조회수</div>
      </div>
      <div className='notice-list-bottom'>
                <div style={{ width: '299px' }}></div>
                <div className='notice-list-pageNation'>
                    <div className='notice-list-page-left'></div>
                    <div className='notice-list-page-box'>
                        
                        <div className='notice-list-page-active'></div> 
                        <div className='notice-list-page'>5</div>
                    </div>
                    <div className='notice-list-page-right'></div>
                </div>
                <div className='notice-list-search-box'>
                    <div className='notice-list-search-input-box'>
                        <input className='notice-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord}/>
                    </div>
                    <div>검색</div>
                </div>
            </div>
    </div>
  )

}
