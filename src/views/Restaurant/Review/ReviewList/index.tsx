import {  useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetRestaurantInfoRequest } from 'src/apis/restaurant';
import { GetRestaurantInfoResponseDto } from 'src/apis/restaurant/dto/response';
import { PostReviewRequest } from 'src/apis/restaurant/review';
import { PostReviewRequestDto } from 'src/apis/restaurant/review/dto/request';
import { RESTAURANT_REVIEW_ABSOLUTE_DETAILS_WRITE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantReviewListItem } from 'src/types';

interface Props {
    value: RestaurantReviewListItem[];
}

//               component: 리뷰 리스트             // 
export default function ReviewList({ value }: Props) {
    //                      state                           //
    const {loginUserRole, RestaurantId } = useUserStore();


    //                  function                            //
    const navigator = useNavigate();

    //          effect              //


    //              event handler                           //
    const onWriteClickHandler = () => {
        navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAILS_WRITE_PATH(RestaurantId));
    }

    //                                  render                            //
    return (
        <>
            {loginUserRole === "ROLE_USER" && (<div onClick={onWriteClickHandler}>리뷰작성</div>)}
            <div className='select-list'>
                {value.map((item) => (
                    <div className='select-list-item-box' key={item.reviewNumber}>
                        <div>
                            <div className='select-item'>{item.reviewImage}</div>
                            <div className='select-item'>{item.rating}</div>
                            <div className='select-item'>{item.reviewContents}</div>
                            <div className='select-item'>{item.reviewWriterId}</div>
                            <div className='select-item'>{item.reviewWriterNickname}</div>
                            <div className='select-item'>{item.reviewDate}</div>
                        </div>
                    </div>
                ))}
            </div>   
        </>
    )
}
