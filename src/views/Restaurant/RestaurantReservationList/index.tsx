import { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router';
import ResponseDto from 'src/apis/response.dto';
import { GetCeoReservationListRequest, GetUserReservationListRequest } from 'src/apis/restaurant/reservation';
import { GetReservationListResponseDto } from 'src/apis/restaurant/reservation/dto/response';
import { COUNT_PER_PAGE, COUNT_PER_SECTION, MAIN_ABSOLUTE_PATH } from 'src/constant';
import { useUserStore } from 'src/stores';
import { RestaurantReservationListItem } from 'src/types';
import './style.css';

//                    component                    //
function ListItem ({ 
  reservationNumber,
  reservationStatus,
  reservationRestaurantId,
  reservationRestaurantName,
  reservationUserId,
  reservationDate,
  reservationTime,
  reservationPeople,
  reservatoinUserName,
}: RestaurantReservationListItem) {

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //

    //                    render                    //
    return (
        <div className='reservation-list-table-tr' >
          <div>
            <div className='reservation-list-table-reception-number'>예약번호 : {reservationNumber}</div>
            <div className='reservation-list-table-restaurant-name'>예약한 식당명 : {reservationRestaurantName}</div>
            <div className='reservation-list-table-user-name'>예약자명 : {reservatoinUserName}</div>
            <div className='reservation-list-table-people-count'>인원수 : {reservationPeople}</div>
          </div>
          <div className='reservation-list-table-status'>
              <div className='disable-bedge'>상태</div>
              <div className='disable-bedge'></div>
          </div>
          <div>
            <div className='reservation-list-reservation-date'>예약일 : {reservationDate}</div>
            <div className='reservation-list-reservation-time'>예약시간 : {reservationTime}</div>
          </div>

          <div className='reservation-list-table-title' style={{ textAlign: 'left' }}>{5}</div>
          <div className='reservation-list-table-writer-id'>{2}</div>
          <div className='reservation-list-table-write-date'>{3}</div>
          <div className='reservation-list-table-viewcount'>{4}</div>
        </div>
    );
}

//                    component                    //
export default function RestaurantReservationList() {

    //                    state                    //
    const {loginUserRole,RestaurantId} = useUserStore();
    const [cookies] = useCookies();
    const [restaurantReservationList, setRestaurantReservationList] = useState<RestaurantReservationListItem[]>([]);
    const [viewList, setViewList] = useState<RestaurantReservationListItem[]>([]);
    const [totalLenght, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageList, setPageList] = useState<number[]>([1]);
    const [totalSection, setTotalSection] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [searchWord, setSearchWord] = useState<string>('');
    const location = useLocation();

    //                    function                    //
    const navigator = useNavigate();

    const changePage = (restaurantReservationList: RestaurantReservationListItem[], totalLenght: number) => {
        if(!currentPage) return;
        const startIndex = (currentPage - 1) * COUNT_PER_PAGE;
        let endIndex = currentPage * COUNT_PER_PAGE;
        if (endIndex > totalLenght - 1) endIndex = totalLenght;
        const viewList = restaurantReservationList.slice(startIndex, endIndex);
        setViewList(viewList);
    };

    const changeSection = (totalPage: number) => {
        if(!currentSection) return;
        const startPage = (currentSection * COUNT_PER_SECTION) - (COUNT_PER_SECTION - 1);
        let endPage = currentSection * COUNT_PER_SECTION;
        if (endPage > totalPage) endPage = totalPage;
        const pageList: number[] = [];
        for (let page = startPage; page <= endPage; page++) pageList.push(page);
        setPageList(pageList);
    };


    const changeRestaurantReservationList = (restaurantReservationList: RestaurantReservationListItem[]) => {
        
        setRestaurantReservationList(restaurantReservationList);

        const totalLenght = restaurantReservationList.length;
        setTotalLength(totalLenght);

        const totalPage = Math.floor((totalLenght - 1) / COUNT_PER_PAGE) + 1;
        setTotalPage(totalPage);
        

        const totalSection = Math.floor((totalPage - 1) / COUNT_PER_SECTION) + 1;
        setTotalSection(totalSection);

        changePage(restaurantReservationList, totalLenght);

        changeSection(totalPage);
    };

    const GetReservationListResponse = (result: GetReservationListResponseDto | ResponseDto | null) => {

        const message =
            !result ? '서버에 문제가 있습니다.' :
                result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') 
        {
            // alert(message);
            if (result?.code === 'AF') navigator(MAIN_ABSOLUTE_PATH);
            return;
        }

        const { restaurantReservationList } = result as GetReservationListResponseDto;
        changeRestaurantReservationList(restaurantReservationList);
        setCurrentPage(!restaurantReservationList.length ? 0 : 1);
        setCurrentSection(!restaurantReservationList.length ? 0 : 1);
    };

    //                    event handler                    //
    
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

    const onPreSectionClickHandler = () => {
        if (currentSection <= 1) return;
        setCurrentSection(currentSection - 1);
        setCurrentPage((currentSection - 1) * COUNT_PER_SECTION);
    };

    const onNextSectionClickHandler = () => {
        if (currentSection === totalSection) return;
        setCurrentSection(currentSection + 1);
        setCurrentPage(currentSection * COUNT_PER_SECTION + 1);
    };

    const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setSearchWord(searchWord);
    };

    //                    effect                    //
    useEffect(() => {
        if (!cookies.accessToken) return;

        loginUserRole === "ROLE_USER" ? 
        GetUserReservationListRequest(cookies.accessToken)
        .then(GetReservationListResponse):
        GetCeoReservationListRequest(RestaurantId,cookies.accessToken)
        .then(GetReservationListResponse)
        ;
    }, [location]);

    useEffect(() => {
        if (!restaurantReservationList.length) return;
        changePage(restaurantReservationList, totalLenght);
    }, [currentPage]);

    useEffect(() => {
        if (!restaurantReservationList.length) return;
        changeSection(totalPage);
    }, [currentSection]);
    
  
    //                    render                    //
    const searchButtonClass = searchWord ? 'primary-button' : 'disable-button';
    return (
        <div id='reservation-list-wrapper'>
            <div className='reservation-list-top'>
                <div className='reservation-list-size-text'>전체 <span className='emphasis'>{totalLenght}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
                <div className='reservation-list-top-right'>
                </div>
            </div>
            <div className='reservation-list-table'>
                <div className='reservation-list-table-th'>
                    <div className='reservation-list-table-reception-number'>예약번호</div>
                    <div className='reservationa-list-table-status'>상태</div>
                    <div className='reservation-list-table-title'>제목</div>
                    <div className='reservation-list-table-writer-id'>작성자</div>
                    <div className='reservation-list-table-write-date'>작성일</div>
                    <div className='reservation-list-table-viewcount'>조회수</div>
                </div>
                {viewList.map(item => <ListItem {...item} />)}
            </div>
            <div className='reservation-list-bottom'>
                <div style={{ width: '299px' }}></div>
                <div className='reservation-list-pagenation'>
                    <div className='reservation-list-page-left' onClick={onPreSectionClickHandler}></div>
                    <div className='reservation-list-page-box'>
                        {pageList.map(page => 
                        page === currentPage ?
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