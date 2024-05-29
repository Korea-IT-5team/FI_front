import React, { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { getSearchInquiryBoardListRequest } from 'src/apis/board/inquiryboard';
import { GetInquiryBoardListResponseDto, GetSearchInquiryBoardListResponseDto } from 'src/apis/board/inquiryboard/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, INQUIRY_BOARD_LIST_ABSOLUTE_PATH, INQUIRY_DETAILS_ABSOLUTE_PATH, SIGN_IN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { InquiryBoardListItem } from 'src/types';

        
//     component     //
function ListItem ({
  inquiryNumber,
  inquiryStatus,
  inquiryTitle,
  inquiryWriterId,
  inquiryWriteDatetime
}: InquiryBoardListItem) {

  //        function       //
  const navigator = useNavigate();
  
  //      event handler      //
  const onClickHandler = () => navigator( INQUIRY_DETAILS_ABSOLUTE_PATH(inquiryNumber));
  //   render   //
  return(
    <div className='inquiry-list-table-tr' onClick={onClickHandler}>
      <div className='inquiry-list-table-reception-number'>{inquiryNumber}</div>
      <div className='inquiry-list-table-status'>{inquiryStatus}</div>
      <div className='inquiry-list-table-title'>{inquiryTitle}</div>
      <div className='inquiry-list-table-writerId'>{inquiryWriterId}</div>
      <div className='inquiry-list-table-write-date'>{inquiryWriteDatetime}</div>
    </div>
  );
}
  // component: 문의사항 목록보기 //
export default function InquiryList() {
  //                    state                    //
  const {loginUserEmailId, loginUserRole} = useUserStore();

  const [cookies] = useCookies();

  const [inquiryBoardList, setInquiryBoardList] = useState<InquiryBoardListItem[]>([]);
  const [viewList, setViewList] = useState<InquiryBoardListItem[]>([]);
  const [totalLength, setTotalLength] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);

  const [searchWord, setSearchWord] = useState<string>('');

  //                    function                    //
  const navigator = useNavigate();
  
  const changePage = (inquiryBoardList: InquiryBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength - 1) endIndex = totalLength;
    const viewList = inquiryBoardList.slice(startIndex, endIndex);
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

  const changeInquiryBoardList = (inquiryBoardList: InquiryBoardListItem[]) => {
    if (isToggleOn) inquiryBoardList = inquiryBoardList.filter(inquiryBoardList => !inquiryBoardList.inquiryStatus);
    setInquiryBoardList(inquiryBoardList);

    const totalLength = setInquiryBoardList.length;
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
    if (result?.code === 'AF') navigator(SIGN_IN_ABSOLUTE_PATH);
    return;
  }

  const { inquiryBoardList } = result as GetInquiryBoardListResponseDto;

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
      if (result?.code === 'AF') navigator(INQUIRY_BOARD_LIST_ABSOLUTE_PATH);
      return;
  }

  const { inquiryBoardList } = result as GetSearchInquiryBoardListResponseDto;
  // changeInquiryBoardList(inquiryBoardList);
  setCurrentPage(!inquiryBoardList.length ? 0 : 1);
  setCurrentSection(!inquiryBoardList.length ? 0 : 1);

};

  //                    event handler                       //

  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setSearchWord(searchWord);
};

const onSearchButtonClickHandler = () => {
    if (!searchWord) return;
    if (!cookies.accessToken) return;

    getSearchInquiryBoardListRequest(searchWord, cookies.accessToken).then(getSearchInquiryBoardListResponse);
  };


  //                  effect                  //

  //                    render                      //
  const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
  return (
    <div id='inquiry-list-wrapper'>
      <div className='inquiry-list-top'>
        <div className='inquiry-list-size-text'>전체 
        <span className='emphasis'>{totalLength}건</span>| 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
        <div className='inquiry-list-search-box'>
          <div className='inquiry-list-search-input-box'>
            <input className='inquiry-list-search-input' placeholder='검색어를 입력하세요.' value={searchWord} onChange={onSearchWordChangeHandler}/>
          </div>
          <div className={searchButtonClass} onClick={onSearchButtonClickHandler}>검색</div>
        </div>
        <div className='inquiry-list-top-right'>
        
        
        </div>
      </div>
    </div>
  )
}
