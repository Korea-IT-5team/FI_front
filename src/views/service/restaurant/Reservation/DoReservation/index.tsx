import { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { PostReservationRequestDto } from "src/apis/restaurant/reservation/dto/request";
import { RESTAURANT_INFO_ABSOLUTE_PATH } from "src/constant";
import { useUserStore } from "src/stores";
import './style.css';


import { PostReservationRequest } from "src/apis/restaurant/reservation";
import RestaurantInputBox from "src/components/RestaurantInputBox";


export default function DoReservation() {

  //                    state                    //
const[reservationDate,setReservationDate] = useState<string>('');
const[reservationTime,setReservationTime] = useState<string>('');
const[reservationPeople,setRreservationPeople] = useState<number>();
const[isChecked,setIsChecked] = useState<boolean>(false);
const {setUserReservationStatus} = useUserStore();
const {restaurantId} = useParams();
const [cookies] = useCookies();
const navigator = useNavigate();
const [selected, setSelected] = useState<number | null>(null);



//                  function                           //

//!!!
const PostReservationResponse = (result: ResponseDto | null) => 
{
      const message = 
          !result ? '서버에 문제가 있습니다.':
            result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' : 
              result.code === 'NR' ? '존재하지 않는 식당입니다.' :
                result.code === 'AF' ? '권한이 없습니다.' :
                  result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
                    result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''
      
      if (!result || result.code !== 'SU') 
      {
          alert(message);
          return;
      }
      
      setUserReservationStatus(true);
      if(!restaurantId) return;
      navigator(RESTAURANT_INFO_ABSOLUTE_PATH(restaurantId));
}
//!!!

//                    event handler                    //

const onMonthDayChangeHandler = (event : ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setReservationDate(value);
}

const onHourMinuteChangeHandler = (event: ChangeEvent<HTMLInputElement>) => 
{
    const { value } = event.target;
    setReservationTime(value);
}

const onPeopleClickHandler = (value: number) => 
{
    setSelected(value);
    
      setRreservationPeople(value);
};

const onCheckClickHandler = () => 
{
    setIsChecked(!isChecked);
}

//!!!
const onReservationClickHandler = () => 
{
    if(!reservationDate || !reservationTime || !reservationPeople 
      || !isChecked)
    {
        return;
    }

    const requestBody: PostReservationRequestDto = 
    {
      reservationDate: reservationDate,
      reservationTime: reservationTime,
      reservationPeople: reservationPeople,
    }

    if(!restaurantId) return;
    PostReservationRequest(restaurantId, requestBody,cookies.accessToken).then(PostReservationResponse);
}
//!!!



//                      render                        //
const isSignUpActive = reservationDate && reservationTime && reservationPeople && isChecked;
const signUpButtonClass = `${isSignUpActive ? 'do-reservation-primary' : 'do-reservation-disable'}-button`;

  return (
    <>
      
      <div className="do-reservation-information-title">예약자 정보</div>
      
      <div className="do-reservation-box">
          <div className="do-reservation-date-time-people">
            <RestaurantInputBox label="날짜" type="text" value={reservationDate} placeholder="날짜를 입력해주세요"
            onChangeHandler={onMonthDayChangeHandler}/>
            <RestaurantInputBox label="시간" type="text" value={reservationTime} placeholder="시간을 입력해주세요"
            onChangeHandler={onHourMinuteChangeHandler}/>                
            <div className="do-reservation-people">인원수</div>
              
            <div className="do-reservation-people-box">
                <table className="do-reservation-table">
                <tr>
                {[1, 2, 3, 4].map((number) => (
                  <td
                    key={number}
                    className={`do-reservation-select-item ${selected === number ? 'selected' : ''}`}
                    onClick={() => onPeopleClickHandler(number)}
                  >
                    {number}명
                  </td>
                ))}
              </tr>
              <tr>
                {[5, 6, 7, 8].map((number) => (
                  <td
                    key={number}
                    className={`do-reservation-select-item ${selected === number ? 'selected' : ''}`}
                    onClick={() => onPeopleClickHandler(number)}
                  >
                    {number}명
                  </td>
                ))}
              </tr>
              <tr>
                {[9, 10, 11, 12].map((number) => (
                  <td
                    key={number}
                    className={`do-reservation-select-item ${selected === number ? 'selected' : ''}`}
                    onClick={() => onPeopleClickHandler(number)}
                  >
                    {number}명
                  </td>
                ))}
              </tr>
                </table>
            </div>
          </div>

          <div className="do-reservation-checkbox">
              <input type="checkbox" checked={isChecked} onClick={onCheckClickHandler} />
              <div className="do-reservation-checkfont">인증 약관 전체 동의</div>
          </div>
          <div className={signUpButtonClass} onClick={onReservationClickHandler}>예약하기</div>   
      </div>
    </>
  )
}