import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetReviewDetailsRequest } from 'src/apis/restaurant/review';
import { GetReviewListResponseDto } from 'src/apis/restaurant/review/dto/response';
import { MAIN_ABSOLUTE_PATH, RESTAURANT_REVIEW_ABSOLUTE_DETAIL_PATH } from 'src/constant';
import { RestaurantReviewListItem } from 'src/types';
import './style.css';
import { usePagination } from 'src/hooks';
import { useUserStore } from 'src/stores';

// component //
function ListItem ({ 
    reviewNumber,
    reviewImage,
    rating,
    reviewWriterNickname,
    reviewDate,
    reviewRestaurantName
}: RestaurantReviewListItem) {

    // function //
    const navigation = useNavigate();

    // event handler //
    const onClickHandler = () => navigation(RESTAURANT_REVIEW_ABSOLUTE_DETAIL_PATH(reviewNumber));

    // render //
    return (
        <div className='review-list-table-tr' onClick={onClickHandler}>
            <div className='review-list-table-restaurant-name'>{reviewRestaurantName}</div>
            <div className='review-list-table-rating'>{rating}</div>
            <div className='review-list-table-writer-nickname'>{reviewWriterNickname}</div>
            <div className='review-list-table-write-date'>{reviewDate}</div>
        </div>
    );
}

// component //
export default function MyReviewList() {

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
    } = usePagination<RestaurantReviewListItem>();

    // function //
    const navigation = useNavigate();

    const GetReviewDetailsResponse = (result: GetReviewListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            if (result?.code === 'AF') navigation(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { restaurantReviewList } = result as GetReviewListResponseDto;
        changeList(restaurantReviewList);
        setCurrentPage(!restaurantReviewList.length ? 0 : 1);
        setCurrentSection(!restaurantReviewList.length ? 0 : 1);
    };

    // effect //
    useEffect(() => {
        GetReviewDetailsRequest(cookies.accessToken)
            .then(GetReviewDetailsResponse);
    },[]);
    
    // render //
    return (
        <div id='my-review-list-wrapper'>
            <div className='my-review-list-top'>나의 리뷰 내역</div>
            <div className='my-review-list-top-box'>
                <div className='my-review-list-size-text'>전체<span className='emphasis'> {totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>
            <div className='my-review-list-table'>
                <div className='my-review-list-table-top'>
                    <div className='my-review-list-table-restaurant-name'>식당 이름</div>
                    <div className='my-review-list-table-rating'>평점</div>
                    <div className='my-review-list-table-writer-nickname'>작성자</div>
                    <div className='my-review-list-table-write-date'>작성일</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>
            <div className='my-review-list-bottom'>
                <div className='my-review-list-pagenation'>
                    <div className='my-review-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='my-review-list-page-box'>
                        {pageList.map(page => page === currentPage ?
                            <div className='my-review-list-page-active'>{page}</div> :
                            <div className='my-review-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='my-review-list-page-right' onClick={onNextSectionClickHandler}></div>
                </div>
            </div>
        </div>
    );
}