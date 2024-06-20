import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetFavoriteRestaurantListRequest } from 'src/apis/restaurant/favorite';
import { GetFavoriteRestaurantListResponseDto } from 'src/apis/restaurant/favorite/dto/response';
import { MAIN_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';
import { RestaurantListItem } from 'src/types';
import './style.css';

// component //
export default function FavoriteList() {

    // state //
    const [cookies] = useCookies();
    const [restaurantList, setRestaurantList] = useState<RestaurantListItem[]>([]);
    const [displayCount, setDisplayCount] = useState<number>(8);

    // function //
    const navigation = useNavigate();

    const GetFavoriteRestaurantListResponse = (result: GetFavoriteRestaurantListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
            result.code === 'NR' ? '존재하지 않는 식당입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            if (result?.code === 'AF') navigation(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { restaurantFavoriteList } = result as GetFavoriteRestaurantListResponseDto;
        setRestaurantList(restaurantFavoriteList);
    };

    // event handler //
    const onClickHandler = (item: number) =>
    { navigation(RESTAURANT_INFO_ABSOLUTE_PATH(item)); }

    const onLoadMoreClickHandler = () => {
        setDisplayCount(prevCount => prevCount + 8); 
    };

    // effect //
    useEffect(() => {
        GetFavoriteRestaurantListRequest(cookies.accessToken)
            .then(GetFavoriteRestaurantListResponse);
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
                            <img src={item.restaurantImage} className='favorite-list-item' />
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
