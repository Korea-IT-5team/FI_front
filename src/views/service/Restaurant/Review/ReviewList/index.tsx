import { useState } from 'react';
import { RestaurantReviewListItem } from 'src/types';
import './style.css';

// interface //
interface Props {
    value: RestaurantReviewListItem[];
}

// component: 리뷰 리스트 // 
export default function ReviewList({ value }: Props) {

    // state //
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    // event handler //
    const onLoadMoreClickHandler = () => { setCurrentPage(prevPage => prevPage + 1); }

    const currentItems = value.slice(0, currentPage * itemsPerPage);

    // render //
    return (
        <>
            <div className='review-select-list-title'>리뷰 ({value.length})</div>
            {currentItems.map((item) => (
                <div className='review-select-list-item-box' key={item.reviewNumber}>
                    <div className='review-select-list-package'>
                        <div className='review-select-item nickname'>{item.reviewWriterNickname}</div>
                        <div className='review-select-item rating'>{item.rating}</div>
                        <div className='review-select-item date'>{item.reviewDate}</div>
                    </div>
                    <img src={item.reviewImage} className='review-select-item image' />
                    <div className='review-select-item'>{item.reviewContents}</div>
                </div>
            ))}
            {currentItems.length < value.length && (
                <div className='review-selecton-see-more' onClick={onLoadMoreClickHandler}>더보기</div>
            )}   
        </>
    )
}