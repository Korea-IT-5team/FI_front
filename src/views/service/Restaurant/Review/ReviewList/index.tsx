import { useState } from 'react';
import { useNavigate } from 'react-router';
import { RESTAURANT_REVIEW_ABSOLUTE_DETAIL_WRITE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';

interface Props {
    value: RestaurantReviewListItem[];
    restaurantId: string | undefined;
}

//               component: 리뷰 리스트             // 
export default function ReviewList({ value,restaurantId }: Props) {
    //                      state                           //
    const {loginUserRole} = useUserStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // 한 번에 표시할 리뷰의 수


    //                  function                            //
    const navigator = useNavigate();

    //          effect              //


    //              event handler                           //
    const onWriteClickHandler = () => {
        if(!restaurantId) return;
        navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAIL_WRITE_PATH(restaurantId));
    }

    const onLoadMoreClickHandler = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }

    // 현재 페이지에 해당하는 리뷰들을 계산
    const currentItems = value.slice(0, currentPage * itemsPerPage);

    //                                  render                            //
    return (
        <>
            {loginUserRole === "ROLE_USER" && (<div onClick={onWriteClickHandler}>리뷰작성</div>)}
            <div className='review-select-list'>
                {currentItems.map((item) => (
                    <div className='review-select-list-item-box' key={item.reviewNumber}>
                        <div>
                            <img src={item.reviewImage} className='review-select-item' />
                            <div className='review-select-item'>{item.rating}</div>
                            <div className='review-select-item'>{item.reviewContents}</div>
                            <div className='review-select-item'>{item.reviewWriterNickname}</div>
                            <div className='review-select-item'>{item.reviewDate}</div>
                        </div>
                    </div>
                ))}
            </div>
            {currentItems.length < value.length && (
                <div onClick={onLoadMoreClickHandler}>더보기</div>
            )}   
        </>
    )
}
// 기능부분완료