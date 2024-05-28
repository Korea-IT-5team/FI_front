import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetReviewDetailsRequest } from 'src/apis/restaurant/review';
import { GetReviewDetailsResponseDto } from 'src/apis/restaurant/review/dto/response';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAIL_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { ReviewDetailsListItem } from 'src/types';
import './style.css';

//                    component                    //
function ListItem ({ 
    reviewNumber,
    reviewRestaurantId,
    reviewDate
}: ReviewDetailsListItem) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onClickHandler = () => navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAIL_PATH(reviewNumber));

    //                    render                    //
    return (
        <div className='review-list-table-tr' onClick={onClickHandler}>
            <div className='review-list-table-reviewNumber-number'></div>
            <div className='review-list-table-title' style={{ textAlign: 'left' }}></div>
            <div className='review-list-table-writer-id'></div>
            <div className='review-list-table-write-date'></div>
            <div className='review-list-table-viewcount'></div>
        </div>
    );
}

//                    component                    //
export default function ReviewDetailsList() {
    //                    state                    //
    const {loginUserRole} = useUserStore();
    const [cookies] = useCookies();
    const [reviewDetailsList, setReviewDetailsList] = useState<ReviewDetailsListItem[]>([]);
    const [viewList, setViewList] = useState<ReviewDetailsListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const location = useLocation();

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (reviewDetailsList: ReviewDetailsListItem[], totalLenght: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = reviewDetailsList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if(!currentSection) return;
        const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };


    const changeReviewDetailsList = (reviewDetailsList: ReviewDetailsListItem[]) => {
        setReviewDetailsList(reviewDetailsList);

        const totalLenght = reviewDetailsList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);
        

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(reviewDetailsList, totalLenght);

        changeSection(totalPage);
    };

    const GetReviewDetailsResponse = (result: GetReviewDetailsResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') 
        {
            //alert(message);
            if (result?.code === 'AF') navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { reviewDetailsList } = result as GetReviewDetailsResponseDto;
        changeReviewDetailsList(reviewDetailsList);
        setCurrentPage(!reviewDetailsList.length ? 0 : 1);
        setCurrentSection(!reviewDetailsList.length ? 0 : 1);
    };

    //                    event handler                    //
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

    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;
        GetReviewDetailsRequest(cookies.accessToken)
        .then(GetReviewDetailsResponse);
    }, [location]);

    useEffect(() => {
        if (!reviewDetailsList.length) return;
        changePage(reviewDetailsList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!reviewDetailsList.length) return;
        changeSection(totalPage);
    }, [currentSection]);
    
  
    //                    render                    //
    return (
        <div id='review-list-wrapper'>
            <div className='review-list-top'>
                <div className='review-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>
            <div className='review-list-table'>
                <div className='review-list-table-th'>
                    <div className='review-list-table-reception-number'>접수번호</div>
                    <div className='review-list-table-status'>상태</div>
                    <div className='review-list-table-title'>제목</div>
                    <div className='review-list-table-writer-id'>작성자</div>
                    <div className='review-list-table-write-date'>작성일</div>
                    <div className='review-list-table-viewcount'>조회수</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>
            <div className='review-list-bottom'>
                <div style={{ width: '299px' }}></div>
                <div className='review-list-pagenation'>
                    <div className='review-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='review-list-page-box'>
                        {pageList.map(page => 
                        page === currentPage ?
                        <div className='review-list-page-active'>{page}</div> :
                        <div className='review-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='review-list-page-right' onClick={onNextSectionClickHandler}></div>
                </div>
            </div>
        </div>
    );
}