import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';

interface Props {
    value: RestaurantReviewListItem[];
}

// component: 리뷰 리스트 // 
export default function ReviewList({ value }: Props) {

    // state //
    const {loginUserRole} = useUserStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1; // 한 번에 표시할 리뷰의 수

    // function //
    const navigation = useNavigate();

    // event handler //

    const onLoadMoreClickHandler = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }

    const currentItems = value.slice(0, currentPage * itemsPerPage);

    // render //
    return (
        <>
            <div className='review-select-list'>
                {currentItems.map((item) => (
                    <div className='review-select-list-item-box' key={item.reviewNumber}>
                        <img src={item.reviewImage} className='review-select-item' />
                        <div className='review-select-item'>평점: {item.rating}</div>
                        <div className='review-select-item'>내용: {item.reviewContents}</div>
                        <div className='review-select-item'>작성자: {item.reviewWriterNickname}</div>
                        <div className='review-select-item'>작성일: {item.reviewDate}</div>
                    </div>
                ))}
            </div>
            {currentItems.length < value.length && (
                <div onClick={onLoadMoreClickHandler}>더보기</div>
            )}   
        </>
    )
}