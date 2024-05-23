import React from 'react'
import { RestaurantReviewListItem } from 'src/types';

interface Prop {
    value: RestaurantReviewListItem[];
}


export default function ReviewList({ value }: Prop) 
{
  return (
    <>
        <div>리뷰작성</div>
        <div className='select-list'>
            {value.map((item) => 
            <div className='select-list-item-box'>
                <div className='select-item'>{item.rating}</div>
                <div className="update-delete">
                    <div>수정</div>
                    <div>삭제</div>
                </div>
            </div>
            )}
        </div>
        </>
  )
}
