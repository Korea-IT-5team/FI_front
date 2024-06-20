import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { GetNoticeBoardListResponseDto, GetSearchNoticeBoardListResponseDto} from 'src/apis/board/noticeboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { COUNT_PER_PAGE, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH, NOTICE_BOARD_WRITE_ABSOLUTE_PATH, NOTICE_DETAILS_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { NoticeBoardListItem } from 'src/types';
import { getNoticeBoardListRequest, getSearchNoticeBoardListRequest } from 'src/apis/board/noticeboard';
import { usePagination } from 'src/hooks';

// component //
function ListItem ({
  index,
  noticeNumber,
  noticeTitle,
  noticeWriteDatetime,
  viewCount,
  noticeWriterNickname            
}: NoticeBoardListItem & { index: number }) {

  // function //
  const navigation = useNavigate();

  // event handler //
  const onClickHandler = () => navigation(NOTICE_DETAILS_ABSOLUTE_PATH(noticeNumber));

  // render //
  return(
    <div className='notice-list-table-tr' onClick={onClickHandler}>
      <div className='notice-list-table-reception-number'>{index + 1}</div>
      <div className='notice-list-table-title' style={{ textAlign: 'left' }}>{noticeTitle}</div>
      <div className='notice-list-table-writer-nickname'>{noticeWriterNickname}</div>
      <div className='notice-list-table-write-date'>{noticeWriteDatetime}</div>
      <div className='notice-list-table-view-count'>{viewCount}</div>
    </div>
  );
}

// component: 공지사항 목록보기 //
export default function NoticeList() {

  // state //
  const {loginUserRole} = useUserStore();
  const [cookies] = useCookies();

  const {
    viewList,
    pageList,
    totalPage,
    currentPage,
    totalLength,

    setCurrentPage,
    setCurrentSection,
    changeList,

    onPageClickHandler,
    onPreSectionClickHandler,
    onNextSectionClickHandler
  } = usePagination<NoticeBoardListItem>();
  
  const [searchWord, setSearchWord] = useState<string>('');

  // function //
  const navigation = useNavigate();

  const getNoticeBoardListResponse = (result: GetNoticeBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') navigation(MAIN_ABSOLUTE_PATH);
      return;
    }

    const { noticeBoardList } = result as GetNoticeBoardListResponseDto;
    changeList(noticeBoardList);

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
        if (result?.code === 'AF') navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH);
        return;
    }

    const { noticeBoardList } = result as GetSearchNoticeBoardListResponseDto;
    changeList(noticeBoardList);

    setCurrentPage(!noticeBoardList.length ? 0 : 1);
    setCurrentSection(!noticeBoardList.length ? 0 : 1);
  };

  // event handler //
  const onWriteButtonClickHandler = () => {
    if (loginUserRole !== 'ROLE_ADMIN') return;
    navigation(NOTICE_BOARD_WRITE_ABSOLUTE_PATH);
  }

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
  };

  const onSearchButtonClickHandler = () => {
    if (!searchWord) return;
    getSearchNoticeBoardListRequest(searchWord, cookies.accessToken).then(getSearchNoticeBoardListResponse);
    setSearchWord('');
  };

  const onEnterKeyHandler = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      if (searchWord) {
        getSearchNoticeBoardListRequest(searchWord, cookies.accessToken)
          .then(getSearchNoticeBoardListResponse);
        setSearchWord('');
      }
    }
  };

  // effect //
  useEffect(() => {
    if (searchWord)
    getSearchNoticeBoardListRequest(searchWord, cookies.accessToken)
      .then(getNoticeBoardListResponse)
    else
      getNoticeBoardListRequest(cookies.accessToken).then(getNoticeBoardListResponse)
  }, []);
  
  // render //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return(
    <div id='notice-list-wrapper'>
      <div className='notice-list-title'>공지사항</div>
      <div className='notice-list-nav-box'>
          <div className='notice-list-nav' onClick={() => navigation(INQUIRY_BOARD_LIST_ABSOLUTE_PATH)}>문의사항</div>
          <div className='notice-list-nav-divider'>|</div>
          <div className='notice-list-nav' onClick={() => navigation(INQUIRY_MY_BOARD_LIST_ABSOLUTE_PATH)}>내 문의사항</div>
        </div>
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
          {viewList.map((item, index) => <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.noticeNumber} />)}
        </div>
      </div>
      <div className='notice-list-bottom'>
        <div style={{ width: '332px' }}></div>
        <div className='notice-list-pagenation'>
          <div className='page-left' onClick={onPreSectionClickHandler}></div>
          <div className='notice-list-page-box'>
            {pageList.map(page => page === currentPage ?
              <div className='notice-list-page-active'>{page}</div> :
              <div className='notice-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
          </div>
          <div className='page-right' onClick={onNextSectionClickHandler}></div>
        </div>
        <div className='notice-list-search-box'>
          <div className='notice-list-search-input-box'>
            <input className='notice-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} onKeyDown={onEnterKeyHandler} />
          </div>
          <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
        </div>
      </div>
    </div>
  )
}