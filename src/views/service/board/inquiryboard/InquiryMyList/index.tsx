import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import { useUserStore } from 'src/stores';

import ResponseDto from 'src/apis/response.dto';
import { InquiryBoardListItem } from 'src/types';
import { GetMyInquiryBoardListResponseDto } from 'src/apis/board/inquiryboard/dto/response';

import { getInquiryBoardListRequest } from 'src/apis/board/inquiryboard';

import { COUNT_PER_PAGE, COUNT_PER_SECTION, INQUIRY_DETAILS_ABSOLUTE_PATH, NOTICE_BOARD_LIST_ABSOLUTE_PATH } from 'src/constant';

import './style.css'

// component //
function ListItem ({
  index,
  inquiryNumber,
  status,
  inquiryTitle,
  inquiryWriteDatetime,
}: InquiryBoardListItem & { index: number }) {

  // function //
  const navigation = useNavigate();
  
  // event handler //
  const onClickHandler = () => navigation(INQUIRY_DETAILS_ABSOLUTE_PATH(inquiryNumber));
  
  // render //
  return(
    <div className='inquiry-my-list-table-tr' onClick={onClickHandler}>
      <div className='inquiry-my-list-table-reception-number'>{index + 1}</div>
      <div className='inquiry-my-list-table-status'>
        {status ? 
          <div className='primary-bedge'>답변</div> :
          <div className='disable-bedge'>미답변</div>
        }
      </div>
      <div className='inquiry-my-list-table-title' style={{ textAlign: 'left' }}>{inquiryTitle}</div>
      <div className='inquiry-my-list-table-write-date'>{inquiryWriteDatetime}</div>
    </div>
  );
}

// component: 나의 문의사항 목록보기 //
export default function InquiryMyList() {
  
  // state //
  const [cookies] = useCookies();
  const [totalPage, setTotalPage] = useState<number>(1);
  const [pageList, setPageList] = useState<number[]>([1]);
  const {loginUserRole, loginUserEmailId} = useUserStore();
  const [totalLength, setTotalLength] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isToggleOn, setToggleOn] = useState<boolean>(false);
  const [totalSection, setTotalSection] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [viewInquiryList, setViewInquiryList] = useState<InquiryBoardListItem[]>([]);
  const [inquiryBoardList, setInquiryBoardList] = useState<InquiryBoardListItem[]>([]);
  
  // function //
  const filterInquiryList = inquiryBoardList.filter(item => item.inquiryWriterId === loginUserEmailId)

  const navigation = useNavigate();
  
  const changePage = (inquiryMyBoardList: InquiryBoardListItem[], totalLength: number) => {
    if (!currentPage) return;
    const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
    let endIndex = currentPage * COUNT_PER_PAGE;
    if (endIndex > totalLength) endIndex = totalLength;
    const viewList = inquiryMyBoardList.slice(startIndex, endIndex);
    setViewInquiryList(viewList);
  };

  const changeSection = (totalPage: number) => {
    if (!currentSection) return;
    const startPage = (currentSection - 1) * COUNT_PER_SECTION + 1;
    let endPage = currentSection * COUNT_PER_SECTION;
    if (endPage > totalPage) endPage = totalPage;
    const pageList: number[] = [];
    for (let page = startPage; page <= endPage; page++) pageList.push(page);
    setPageList(pageList);
  };

  const changeInquiryBoardList = (inquiryMyBoardList: InquiryBoardListItem[]) => {
    if (isToggleOn) inquiryMyBoardList = inquiryMyBoardList.filter(inquiryBoardList => !inquiryBoardList.status);
    setInquiryBoardList(inquiryMyBoardList);
    const totalLength = inquiryMyBoardList.length;
    setTotalLength(totalLength);
    const totalPage = Math.floor((totalLength - 1) / COUNT_PER_PAGE) + 1;
    setTotalPage(totalPage);
    const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
    setTotalSection(totalSection);
    changePage(inquiryMyBoardList, totalLength);
    changeSection(totalPage);
  };

  const getMyInquiryBoardListResponse = (result: GetMyInquiryBoardListResponseDto | ResponseDto | null) => {
    const message =
      !result ? '서버에 문제가 있습니다.' :
      result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    if (!result || result.code !== 'SU') {
      alert(message);
      return;
    }

    if (loginUserRole == "ROLE_ADMIN")
    { navigation(NOTICE_BOARD_LIST_ABSOLUTE_PATH); }

    const { inquiryBoardList } = result as GetMyInquiryBoardListResponseDto;
    changeInquiryBoardList(inquiryBoardList.filter(item => item.inquiryWriterId === loginUserEmailId));

    setCurrentPage(!inquiryBoardList.length ? 0 : 1);
    setCurrentSection(!inquiryBoardList.length ? 0 : 1);
  };

  // event handler //
  const onToggleClickHandler = () => {
    if ((loginUserRole !== 'ROLE_USER') && (loginUserRole !== 'ROLE_CEO')) return;
    setToggleOn(!isToggleOn);
  };

  const onPreSectionClickHandler = () => {
    if (currentSection <= 1 && currentPage <= 1) {
      return;
    }

    if (currentPage === (currentSection - 1) * COUNT_PER_SECTION + 1) {
      if (currentSection > 1) {
        setCurrentSection(currentSection - 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1));
      }
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const onNextSectionClickHandler = () => {
    if (currentSection >= totalSection && currentPage >= totalPage) {
      return;
    }
    
    if (currentPage === currentSection * COUNT_PER_SECTION) {
      if (currentSection < totalSection) {
        setCurrentSection(currentSection + 1);
        setCurrentPage((currentSection + 1) * COUNT_PER_SECTION - (COUNT_PER_SECTION - 1));
      }
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  // effect //
  useEffect(() => {
    if (!cookies.accessToken) return;
    getInquiryBoardListRequest(cookies.accessToken).then(getMyInquiryBoardListResponse);
  }, [isToggleOn ,cookies.accessToken, loginUserEmailId]);

  useEffect(() => {
    changePage(inquiryBoardList, totalLength);
  }, [currentPage]);

  useEffect(() => {
    if (!inquiryBoardList.length) return;
    changeSection(totalPage);
  }, [currentSection]);

  // render //
  const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';
  return (
    <div id='inquiry-my-list-wrapper'>
      <div className='inquiry-my-list-top'>나의 문의 내역</div>
      <div className='inquiry-my-list-top-box'>
        <div className='inquiry-my-list-top-left'>
          <div className='inquiry-my-list-size-text'>전체 
          <span className='emphasis'> {filterInquiryList.length}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
        </div>
        <div className='inquiry-my-list-top-right'>
          <div className='inquiry-my-list-toggle-box'>
            <div className='inquiry-my-list-top-text'>미답변 보기</div>
            <div className={toggleClass} onClick={onToggleClickHandler}></div>
          </div>
        </div>
      </div>
    <div className='inquiry-my-list-table'>
    <div className='inquiry-my-list-table-top'>
      <div className='inquiry-my-list-table-reception-number'>번호</div>
      <div className='inquiry-my-list-table-status'>상태</div>
      <div className='inquiry-my-list-table-title'>문의 제목</div>
      <div className='inquiry-my-list-table-write-date'>작성일자</div>
    </div>
    <div className='inquiry-my-list-table-contents'>
    {viewInquiryList.map((item, index)=> <ListItem {...item} index={totalLength - (currentPage - 1) * COUNT_PER_PAGE - (index + 1)} key={item.inquiryNumber} />)}
    </div> 
  </div>
  <div className='inquiry-my-list-bottom'>
    <div className='inquiry-my-list-pagenation'>
      <div className='page-left' onClick={onPreSectionClickHandler}></div>
      <div className='inquiry-my-list-page-box'>
        {pageList.map(page => page === currentPage ? 
          <div className='inquiry-my-list-page-active'>{page}</div> :
          <div className='inquiry-my-list-page'onClick={() => onPageClickHandler(page)}>{page}</div>
        )}
      </div>
        <div className='page-right' onClick={onNextSectionClickHandler}></div>
    </div>
    </div>
  </div>
  )
}
