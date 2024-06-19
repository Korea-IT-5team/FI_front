import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetCeoReservationListRequest, GetUserReservationListRequest } from 'src/apis/restaurant/reservation';
import { GetReservationListResponseDto } from 'src/apis/restaurant/reservation/dto/response';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH, RESTAURANT_INFO_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantReservationListItem } from 'src/types';
import './style.css';
import { usePagination } from 'src/hooks';

// component //
function ListItem ({ 
    reservationNumber,
    reservationStatus,
    reservationRestaurantId,
    reservationRestaurantName,
    reservationDate,
    reservationTime,
    reservationPeople,
    reservationUserName,
    reservationRestaurantLocation,
}: RestaurantReservationListItem) {

    // function //
    const navigation = useNavigate();

    // event handler //
    const onClickHandler = () => navigation(RESTAURANT_INFO_ABSOLUTE_PATH(reservationRestaurantId));  

    // render //
    return (
        <div className='reservation-list-table-tr' onClick={onClickHandler} >
            <div className='reservation-list-table-reservation-number'>{reservationNumber}</div>
            <div className='reservation-list-table-reservation-status'>{reservationStatus}</div>
            <div className='reservation-list-table-reservation-restaurant-name'>{reservationRestaurantName}</div>
            <div className='reservation-list-table-reservation-restaurant-location'>{reservationRestaurantLocation}</div> 
            <div className='reservation-list-table-reservation-date'>{reservationDate}</div>
            <div className='reservation-list-table-reservation-time'>{reservationTime}</div>
            <div className='reservation-list-table-reservation-people'>{reservationPeople}</div>
            <div className='reservation-list-table-reservation-user-name'>{reservationUserName}</div>
        </div>
    );
}

// component //
export default function ReservationList() {

    // state //
    const {loginUserRole} = useUserStore();
    const [cookies] = useCookies();

    const {
        viewList,
        pageList,
        totalPage,
        currentPage,
        totalLength,
    
        setCurrentPage,
        setCurrentSection,
        changeList,
    
        onPageClickHandler,
        onPreSectionClickHandler,
        onNextSectionClickHandler
    } = usePagination<RestaurantReservationListItem>();

    // function //
    const navigation = useNavigate();

    const GetReservationListResponse = (result: GetReservationListResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            if (result?.code === 'AF') navigation(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { restaurantReservationList } = result as GetReservationListResponseDto;
        changeList(restaurantReservationList);

        setCurrentPage(!restaurantReservationList.length ? 0 : 1);
        setCurrentSection(!restaurantReservationList.length ? 0 : 1);
    };

    // effect //
    useEffect(() => {
        loginUserRole === "ROLE_USER" ? 
        GetUserReservationListRequest(cookies.accessToken)
            .then(GetReservationListResponse):
        GetCeoReservationListRequest(cookies.accessToken)
            .then(GetReservationListResponse)
        ;
    }, []);

    // render //

    return (
        <div id='reservation-list-wrapper'>
            <div className='reservation-list-title'>예약 내역</div>
            <div className='reservation-list-top-box'>
                <div className='reservation-list-size-text'>전체<span className='emphasis'> {totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
            </div>
            <div className='reservation-list-table'>
                <div className='reservation-list-table-top'>
                    <div className='reservation-list-table-reservation-number'>예약 번호</div>
                    <div className='reservation-list-table-reservation-status'>예약 상태</div>
                    <div className='reservation-list-table-reservation-restaurant-name'>식당 이름</div>
                    <div className='reservation-list-table-reservation-restaurant-location'>식당 위치</div> 
                    <div className='reservation-list-table-reservation-date'>예약일</div>
                    <div className='reservation-list-table-reservation-time'>예약시간</div>
                    <div className='reservation-list-table-reservation-people'>인원</div>
                    <div className='reservation-list-table-reservation-user-name'>예약자</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>
            <div className='reservation-list-bottom'>
                <div className='reservation-list-pagenation'>
                    <div className='reservation-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='reservation-list-page-box'>
                        {pageList.map(page => page === currentPage ?
                            <div className='reservation-list-page-active'>{page}</div> :
                            <div className='reservation-list-page' onClick={() => onPageClickHandler(page)}>{page}</div>
                        )}
                    </div>
                    <div className='reservation-list-page-right' onClick={onNextSectionClickHandler}></div>
                </div>
            </div>
        </div>
    );
}
