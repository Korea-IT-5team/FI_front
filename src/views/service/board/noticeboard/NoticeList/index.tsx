import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { GetNoticeBoardListResponseDto, GetSearchNoticeBoardListResponseDto} from 'src/apis/board/noticeboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, NOTICE_BOARD_WRITE_ABSOLUTE_PATH, NOTICE_DETAILS_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { NoticeBoardListItem } from 'src/types';
import { getNoticeBoardListRequest, getNoticeBoardRequest, getSearchNoticeBoardListRequest } from 'src/apis/board/noticeboard';

//     component     //
function ListItem ({
  noticeNumber,
  noticeTitle,
  noticeWriteDatetime,
  viewCount,
  noticeWriterNickname            
}: NoticeBoardListItem) {

  //        function       //
  const navigator = useNavigate();

  //      event handler      //
  const onClickHandler = () => navigator(NOTICE_DETAILS_ABSOLUTE_PATH(noticeNumber));

  //   render   //
  return(
    <div className='notice-list-table-tr' onClick={onClickHandler}>
      <div className='notice-list-table-reception-number'>{noticeNumber}</div>
      <div className='notice-list-table-title' style={{ textAlign: 'left' }}>{noticeTitle}</div>
      <div className='notice-list-table-write-nickname'>{noticeWriterNickname}</div>
      <div className='notice-list-table-write-date'>{noticeWriteDatetime}</div>
      <div className='notice-list-table-viewcount'>{viewCount}</div>
    </div>
  );
}

// component: 공지사항 목록보기 //
export default function NoticeList() {

  //                    state                    //
  const {loginUserRole} = useUserStore();
  
  const [cookies] = useCookies();

  const [noticeBoardList, setNoticeBoardList] = useState<NoticeBoardListItem[]>([]);
  const [viewNoticeList, setViewNoticeList] = useState<NoticeBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);

  const [searchWord, setSearchWord] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();
  
  const changePage = (noticeBoardList: NoticeBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = noticeBoardList.slice(startIndex, endIndex);
    setViewNoticeList(viewList);
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

  // 추가
  const changeNoticeBoardList = (noticeList: NoticeBoardListItem[]) => {
    setNoticeBoardList(noticeList);
    const totalLength = noticeList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(noticeList, totalLength);

    changeSection(totalPage);
};

  const getNoticeBoardListResponse = (result: GetNoticeBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') navigator(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }

    const { noticeBoardList } = result as GetNoticeBoardListResponseDto;
    changeNoticeBoardList(noticeBoardList);

    setCurrentPage(!noticeBoardList.length ? 0 : 1);
    setCurrentSection(!noticeBoardList.length ? 0 : 1);
  };

  const getSearchNoticeBoardListResponse = (result: GetSearchNoticeBoardListResponseDto | ResponseDto | null) => {

    const message = 
        !result ? '서버에 문제가 있습니다.' : 
        result.code === 'VF' ? '검색어를 입력하세요.' : 
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
    if (!result || result.code !== 'SU') {
        alert(message);
        if (result?.code === 'AF') navigator(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
        return;
    }

    const { noticeBoardList } = result as GetSearchNoticeBoardListResponseDto;
    changeNoticeBoardList(noticeBoardList);

    setCurrentPage(!noticeBoardList.length ? 0 : 1);
    setCurrentSection(!noticeBoardList.length ? 0 : 1);
};

  //                    event handler                       //
  const onWriteButtonClickHandler = () => {
    if (loginUserRole !== 'ROLE_ADMIN') return;
    navigator(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
  }

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const onPreSectionClickHandler = () => {
    if (currentSection <= 1) return;
    setCurrentSection(currentSection - 1);
    setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
  };

  const onNextSectionClickHandler = () => {
    if (currentSection === totalSection) return;
    setCurrentSection(currentSection + 1);
    setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
  };

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
  };

  const onSearchButtonClickHandler = () => {
    if (!searchWord) return;
    if (!cookies.accessToken) return;

    getSearchNoticeBoardListRequest(searchWord, cookies.accessToken).then(getSearchNoticeBoardListResponse);
  };

  //                  effect                  //
  useEffect(() => {
    if (searchWord)
    getSearchNoticeBoardListRequest(searchWord, cookies.accessToken)
      .then(getNoticeBoardListResponse)
      
    else
      getNoticeBoardListRequest(cookies.accessToken).then(getNoticeBoardListResponse)
  }, [searchWord]);

  useEffect(() => {
    if (!noticeBoardList.length) return;
    changePage(noticeBoardList, totalLength);
  },[currentPage]);

  useEffect(() => {
    if (!noticeBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]); 
  
  //                    render                      //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return(
    <div id='notice-list-wrapper'>
      <div className='notice-list-top-box'>
        <div className='notice-list-top-left'>
          <div className='notice-list-size-text'>전체 
            <span className='emphasis'> {totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span>
          </div>
        </div>
        <div className='notice-list-top-right'>
          {loginUserRole === 'ROLE_ADMIN' && (
          <div className='primary-button' onClick={onWriteButtonClickHandler}>공지 작성</div>
          )} 
        </div>
      </div>
      <div className='notice-list-table'>
        <div className='notice-list-table-top'>
          <div className='notice-list-table-reception-number'>번호</div>
          <div className='notice-list-table-title'>제목</div>
          <div className='notice-list-table-writer-nickname'>작성자</div>
          <div className='notice-list-table-write-date'>작성일자</div>
          <div className='notice-list-table-view-count'>조회수</div>
        </div>
        <div className='notice-list-table-contents'>
          {viewNoticeList.map(item => <ListItem {...item} />)}
        </div>
      </div>
      <div className='notice-list-bottom'>
        <div style={{ width: '332px' }}></div>
        <div className='notice-list-pagenation'>
          <div className='notice-list-page-left' onClick={onPreSectionClickHandler}></div>
          <div className='notice-list-page-box'>
            {pageList.map(page =>
              page === currentPage ?
                <div className='notice-list-page-active'>{page}</div> :
                <div className='notice-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
          </div>
          <div className='notice-list-page-right' onClick={onNextSectionClickHandler}></div>
        </div>
        <div className='notice-list-search-box'>
          <div className='notice-list-search-input-box'>
            <input className='notice-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
          </div>
          <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
        </div>
      </div>
    </div>
  )

}