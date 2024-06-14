import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { getInquiryBoardListRequest, getSearchInquiryBoardListRequest } from 'src/apis/board/inquiryboard';
import { GetInquiryBoardListResponseDto, GetSearchInquiryBoardListResponseDto } from 'src/apis/board/inquiryboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INQUIRY_BOARD_WRITE_ABSOLUTE_PATH, INQUIRY_DETAILS_ABSOLUTE_PATH, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { InquiryBoardListItem } from 'src/types';

        
//     component     //
function ListItem ({
  inquiryNumber,
  status,
  inquiryPublic,
  inquiryTitle,
  inquiryWriterNickname,
  inquiryWriteDatetime,
  inquiryWriterId
}: InquiryBoardListItem) {
  
  const { loginUserRole, loginUserEmailId } = useUserStore();

  //        function       //
  const navigation = useNavigate();
  
  //      event handler      //
  const onClickHandler = () => {
    if (inquiryPublic && inquiryWriterId !== loginUserEmailId && loginUserRole !== 'ROLE_ADMIN') {
      alert('비공개 게시물입니다.');
      return;
    }
    navigation(INQUIRY_DETAILS_ABSOLUTE_PATH(inquiryNumber));
  }

  //   render   //
  
  return(
    <div className='inquiry-list-table-tr' onClick={onClickHandler}>
      <div className='inquiry-list-table-reception-number'>{inquiryNumber}</div>
      <div className='inquiry-list-table-status'>
          {status ? 
          <div className='primary-bedge'>답변</div> :
          <div className='disable-bedge'>미답변</div> 
          }
      </div>
      <div className='inquiry-list-table-public'>
          {inquiryPublic ?
          <div className='disable-bedge'>비공개</div> :
          <div className='primary-bedge'>공개</div>
          }
      </div>
      <div className='inquiry-list-table-title' style={{ textAlign: 'left' }}>{inquiryTitle}</div>
      <div className='inquiry-list-table-writer-nickname'>{inquiryWriterNickname}</div>
      <div className='inquiry-list-table-write-date'>{inquiryWriteDatetime}</div>
    </div>
  );
}

// component: 문의사항 목록보기 //
export default function InquiryList() {

  //   state   //
  const {loginUserRole} = useUserStore();

  const [cookies] = useCookies();

  const [inquiryBoardList, setInquiryBoardList] = useState<InquiryBoardListItem[]>([]);
  const [viewInquiryList, setViewInquiryList] = useState<InquiryBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);

  const [isToggleOn, setToggleOn] = useState<boolean>(false);

  const [searchWord, setSearchWord] = useState<string>('');

  //   function   //
  const navigation = useNavigate();
  
  const changePage = (inquiryBoardList: InquiryBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = inquiryBoardList.slice(startIndex, endIndex);
    setViewInquiryList(viewList);
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

  const changeInquiryBoardList = (inquiryBoardList: InquiryBoardListItem[]) => {
    if (isToggleOn) inquiryBoardList = inquiryBoardList.filter(inquiryBoardList => !inquiryBoardList.status);
    setInquiryBoardList(inquiryBoardList);

    const totalLength = inquiryBoardList.length;
    setTotalLength(totalLength);

    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);

    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);

    changePage(inquiryBoardList, totalLength);

    changeSection(totalPage);
  };

  const getInquiryBoardListResponse = (result: GetInquiryBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'AF' ? '인증에 실패했습니다.' : 
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') navigation(MAIN_ABSOLUTE_PATH);
      return;
    }

    const { inquiryBoardList } = result as GetInquiryBoardListResponseDto;
    changeInquiryBoardList(inquiryBoardList);

    setCurrentPage(!inquiryBoardList.length ? 0 : 1);
    setCurrentSection(!inquiryBoardList.length ? 0 : 1);
  };

  const getSearchInquiryBoardListResponse = (result: GetSearchInquiryBoardListResponseDto | ResponseDto | null) => {
    
    const message = 
        !result ? '서버에 문제가 있습니다.' : 
        result.code === 'VF' ? '검색어를 입력하세요.' :
        result.code === 'AF' ? '인증에 실패했습니다.' :
        result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
    if (!result || result.code !== 'SU') {
      alert(message);
      if (result?.code === 'AF') navigation(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
      return;
    }

    const { inquiryBoardList } = result as GetSearchInquiryBoardListResponseDto;
    changeInquiryBoardList(inquiryBoardList);
    
    setCurrentPage(!inquiryBoardList.length ? 0 : 1);
    setCurrentSection(!inquiryBoardList.length ? 0 : 1);
  };

  //                    event handler                       //
  const onWriteButtonClickHandler = () => {
    if ((loginUserRole !== 'ROLE_USER') && (loginUserRole !== 'ROLE_CEO')) return;
    navigation(INQUIRY_BOARD_WRITE_ABSOLUTE_PATH);
  };

  const onToggleClickHandler = () => {
    if (loginUserRole !== 'ROLE_ADMIN') return;
    setToggleOn(!isToggleOn);
  };

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
    
    getSearchInquiryBoardListRequest(searchWord, cookies.accessToken).then(getSearchInquiryBoardListResponse);
  };

  //   effect   //
  useEffect(() => {
    if (searchWord)
      getSearchInquiryBoardListRequest(searchWord, cookies.accessToken).then(getInquiryBoardListResponse);
    else
      getInquiryBoardListRequest(cookies.accessToken).then(getInquiryBoardListResponse);
  },[isToggleOn]);

  useEffect(() => {
      changePage(inquiryBoardList, totalLength);
  },[currentPage]);

  useEffect(() => {
      if (!inquiryBoardList.length) return;
      changeSection(totalPage);
  }, [currentSection]);

  //   render   //
  const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (
    <div id='inquiry-list-wrapper'>
      <div className='inquiry-list-top'>문의</div>
      <div className='inquiry-list-top-box'>
        <div className='inquiry-list-top-left'>
          <div className='inquiry-list-size-text'>전체
            <span className='emphasis'> {totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span>
          </div>
        </div>
        <div className='inquiry-list-top-right'>
          {loginUserRole === 'ROLE_ADMIN' &&
            (<>
              <div className='inquiry-list-top-admin-text'>미답변 보기</div>
              <div className={toggleClass} onClick={onToggleClickHandler}></div>
            </>)}

          {(loginUserRole === 'ROLE_USER' || loginUserRole === 'ROLE_CEO') &&(

            <div className='primary-button inquiry' onClick={onWriteButtonClickHandler}>문의 작성</div>
          )}
        </div>
      </div>
      <div className='inquiry-list-table'>
        <div className='inquiry-list-table-top'>
          <div className='inquiry-list-table-reception-number'>번호</div>
          <div className='inquiry-list-table-status'>상태</div>
          <div className='inquiry-list-table-public'>공개</div>
          <div className='inquiry-list-table-title'>제목</div>
          <div className='inquiry-list-table-writer-nickname'>작성자</div>
          <div className='inquiry-list-table-write-date'>작성일자</div>
        </div>
        <div className='inquiry-list-table-contents'>
          {viewInquiryList.map(item => <ListItem {...item} />)}
        </div>
      </div>
      <div className='inquiry-list-bottom'>
        <div style={{ width: '332px' }}></div>
        <div className='inquiry-list-pagenation'>
          <div className='page-left' onClick={onPreSectionClickHandler}></div>
          <div className='inquiry-list-page-box'>
            {pageList.map(page =>
              page === currentPage ?
                <div className='inquiry-list-page-active'>{page}</div> :
                <div className='inquiry-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}
          </div>
          <div className='page-right' onClick={onNextSectionClickHandler}></div>
        </div>
        <div className='inquiry-list-search-box'>
          <div className='inquiry-list-search-input-box'>
            <input className='inquiry-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
          </div>
          <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
        </div>
      </div>
    </div>
  )
}




