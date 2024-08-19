import { useState } from 'react';
import { RestaurantReviewListItem } from 'src/types';
import reviewDefault from 'src/assets/image/review-default.png';
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
        <div id='review-list-wrapper'>
            <div className='review-list-title'>리뷰 ({value.length})</div>
            {currentItems.map((item) => (
                <div className='review-list-contents-box' key={item.reviewNumber}>
                    <img src={item.reviewImage ? item.reviewImage : reviewDefault} className='review-content image'/>
                    <div className='review-list-container'>
                        <div className='review-content-box'>
                            <div className='review-content-nickname'>작성자 {item.reviewWriterNickname}</div>
                            <div className='review-content-divider'>{'\|'}</div>
                            <div className='review-content-rating'>평점 {item.rating}</div>
                            <div className='review-content-divider'>{'\|'}</div>
                            <div className='review-content-date'>작성일 {item.reviewDate}</div>
                        </div>
                        <div className='review-content'>{item.reviewContents}</div>
                    </div>
                </div>
            ))}
            {currentItems.length < value.length && (
                <div className='review-load-more' onClick={onLoadMoreClickHandler}>더보기</div>
            )}   
        </div>
    )
}