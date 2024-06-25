import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

import { useEffect, useState } from 'react';

import restaurantDefault from 'src/assets/image/restaurant-default.png';

import { RestaurantListItem } from 'src/types';

import ResponseDto from 'src/apis/response.dto';
import { GetFavoriteRestaurantListResponseDto } from 'src/apis/restaurant/favorite/dto/response';

import { GetFavoriteRestaurantListRequest } from 'src/apis/restaurant/favorite';

import { MAIN_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';

import './style.css';

// component //
export default function FavoriteList() {

    // state //
    const [cookies] = useCookies();
    const [displayCount, setDisplayCount] = useState<number>(8);
    const [restaurantList, setRestaurantList] = useState<RestaurantListItem[]>([]);

    // function //
    const navigation = useNavigate();

    const GetFavoriteRestaurantListResponse = (result: GetFavoriteRestaurantListResponseDto | ResponseDto | null) => {
        if (!result || result.code !== 'SU') {
            if (result?.code === 'AF') navigation(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { restaurantFavoriteList } = result as GetFavoriteRestaurantListResponseDto;
        setRestaurantList(restaurantFavoriteList);
    };

    // event handler //
    const onClickHandler = (item: number) => navigation(RESTAURANT_INFO_ABSOLUTE_PATH(item)); 
    const onLoadMoreClickHandler = () => setDisplayCount(prevCount => prevCount + 8); 
    
    // effect //
    useEffect(() => {
        GetFavoriteRestaurantListRequest(cookies.accessToken).then(GetFavoriteRestaurantListResponse);
    }, []);

    // render //
    return (
            <div id='favorite-list-wrapper'>
                <div className='favorite-list-title'>찜한 맛집</div>
                <div className='favorite-list-top-box'>
                    <div className='favorite-list-size-text'>전체<span className='emphasis'> {restaurantList.length}건</span></div>
                </div>
                <div className='favorite-list-box'>
                    {restaurantList.slice(0, displayCount).map((item) => (
                        <div className='favorite-list-item-box' onClick={() => onClickHandler(item.restaurantId)}>
                            <img src={item.restaurantImage ? item.restaurantImage : restaurantDefault} className='favorite-list-item' />
                            <div className='favorite-list-item-top-box'>
                                <div className='favorite-list-item name'>{item.restaurantName}</div>
                                <div className='favorite-list-item category'>{item.restaurantFoodCategory}</div>
                            </div>
                                <div className='favorite-list-item location'>{item.restaurantLocation}</div>
                        </div>
                        ))}
                </div>
                {restaurantList.length > displayCount && (
                    <div className="load-more-button" onClick={onLoadMoreClickHandler}>더보기</div>
                )}
            </div>
            );
}
