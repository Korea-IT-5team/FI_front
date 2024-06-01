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
