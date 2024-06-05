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


    //                  function                            //
    const navigator = useNavigate();

    //          effect              //


    //              event handler                           //
    const onWriteClickHandler = () => {
        if(!restaurantId) return;
        navigator(RESTAURANT_REVIEW_ABSOLUTE_DETAIL_WRITE_PATH(restaurantId));
    }

    //                                  render                            //
    return (
        <>
            {loginUserRole === "ROLE_USER" && (<div onClick={onWriteClickHandler}>리뷰작성</div>)}
            <div className='review-select-list'>
                {value.map((item) => (
                    <div className='review-select-list-item-box' key={item.reviewNumber}>
                        <div>
                            <div className='review-select-item'>{item.reviewImage}</div>
                            <div className='review-select-item'>{item.rating}</div>
                            <div className='review-select-item'>{item.reviewContents}</div>
                            <div className='review-select-item'>{item.reviewWriterNickname}</div>
                            <div className='review-select-item'>{item.reviewDate}</div>
                        </div>
                    </div>
                ))}
            </div>   
        </>
    )
}
// 기능부분완료