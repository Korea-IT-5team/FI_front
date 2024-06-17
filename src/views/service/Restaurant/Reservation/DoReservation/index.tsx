import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { PostReservationRequestDto } from "src/apis/restaurant/reservation/dto/request";
import { RESTAURANT_INFO_ABSOLUTE_PATH } from "src/constant";
import './style.css';

import { PostReservationRequest } from "src/apis/restaurant/reservation";
import DatePicker from "react-datepicker";

export default function DoReservation() {

// state //
const [reservationDate,setReservationDate] = useState< Date | null >(null);
const [reservationTime,setReservationTime] = useState<string>('');
const [reservationPeople,setReservationPeople] = useState<number>();
const [isChecked,setIsChecked] = useState<boolean>(false);
const {restaurantId} = useParams();
const [cookies] = useCookies();
const navigation = useNavigate();
const [selectedTime, setSelectedTime] = useState<number | null>(null); 
const [selectedPeople, setSelectedPeople] = useState<number | null>(null); 
const [timeRange, setTimeRange] = useState<{ start: number, end: number }>({ start: 0, end: 11 }); 
const [peopleRange, setPeopleRange] = useState<{ start: number, end: number }>({ start: 1, end: 12 }); 

// function //
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
      
      if(!restaurantId) return;
      navigation(RESTAURANT_INFO_ABSOLUTE_PATH(restaurantId));
}

// event handler //

const onMonthDayChangeHandler = (date: Date | null) => 
{
    setReservationDate(date);
}

const onPeopleClickHandler = (value: number) => 
{
    setSelectedPeople(value);
    setReservationPeople(value);
};

const onTimeClickHandler = (value: number) => {
    setSelectedTime(value);
    setReservationTime(formatTime(value)); 
};

const onCheckClickHandler = () => 
{
    setIsChecked(!isChecked);
}

const onReservationClickHandler = () => 
{
    if(!reservationDate || !reservationTime || !reservationPeople 
      || !isChecked)
    {
        return;
    }

    const isoDateString = new Date(reservationDate.getTime() - reservationDate.getTimezoneOffset() * 60000).toISOString(); 
    const dateString = isoDateString.substr(0, 10); 

    const requestBody: PostReservationRequestDto = 
    {
      reservationDate: dateString,
      reservationTime: reservationTime,
      reservationPeople: reservationPeople,
    }

    if(!restaurantId) return;
    PostReservationRequest(restaurantId, requestBody,cookies.accessToken)
      .then(PostReservationResponse);
}


 const handleTimeRangeChange = (direction: 'prev' | 'next') => {
    setTimeRange(prevRange => {
        const newStart = direction === 'prev' ? Math.max(0, prevRange.start - 12) : Math.min(48, prevRange.start + 12);
        const newEnd = direction === 'prev' ? Math.max(11, prevRange.end - 12) : Math.min(59, prevRange.end + 12);
            return { start: newStart, end: newEnd };
    });
};


const handlePeopleRangeChange = (direction: 'prev' | 'next') => {
    setPeopleRange(prevRange => {
        const newStart = direction === 'prev' ? Math.max(1, prevRange.start - 12) : Math.min(49, prevRange.start + 12);
        const newEnd = direction === 'prev' ? Math.max(12, prevRange.end - 12) : Math.min(60, prevRange.end + 12);
            return { start: newStart, end: newEnd };
    });
};


const formatTime = (num: number) => {
    const hours = Math.floor(num / 4) + 9;
    const minutes = (num % 4) * 15;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// render //
const isSignUpActive = reservationDate && reservationTime && reservationPeople && isChecked;
const signUpButtonClass = `${isSignUpActive ? 'do-reservation-primary' : 'do-reservation-disable'}-button`;

  return (
  <>    
      <div className="do-reservation-information">예약자 정보</div>  
      <div className="do-reservation-box">
          <div className="do-reservation-input-label">날짜</div>
          <DatePicker
              className="do-reservation-date-input"
              selected={reservationDate}
              onChange={onMonthDayChangeHandler}
              dateFormat="yyyy-MM-dd"
              placeholderText="날짜를 선택해주세요"
          />
            
          <div className="do-reservation-input-label">시간</div>
          <div className="do-reservation-time-box">
              <div className="time-range">
                  <button className="do-reservation-arrow" onClick={() => handleTimeRangeChange('prev')}>{'<'}</button>
                  <table className="do-reservation-table">
                      <tbody>
                          {[...Array(3)].map((_, rowIndex) => (
                              <tr key={rowIndex}>
                                  {Array.from({ length: 4 }, (_, colIndex) => {
                                      const num = rowIndex * 4 + colIndex + timeRange.start;
                                      return (
                                          <td
                                              key={num}
                                              className={`do-reservation-select-item ${selectedTime === num ? 'selected' : ''}`}
                                              onClick={() => onTimeClickHandler(num)}
                                          >
                                          {formatTime(num)}
                                          </td>
                                      );
                                  })}
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  <button className="do-reservation-arrow" onClick={() => handleTimeRangeChange('next')}>{'>'}</button>
              </div>
          </div>     

          <div className="do-reservation-input-label">인원수</div>
          <div className="do-reservation-people-box">
              <div className="people-range">
                  <button className="do-reservation-arrow" onClick={() => handlePeopleRangeChange('prev')}>{'<'}</button>
                  <table className="do-reservation-table">
                      <tbody>
                          {[...Array(3)].map((_, rowIndex) => (
                              <tr key={rowIndex}>
                                  {Array.from({ length: 4 }, (_, colIndex) => {
                                      const num = rowIndex * 4 + colIndex + peopleRange.start;
                                          return (
                                              <td
                                              key={num}
                                              className={`do-reservation-select-item ${selectedPeople === num ? 'selected' : ''}`}
                                              onClick={() => onPeopleClickHandler(num)}
                                              >
                                              {num}명
                                              </td>
                                          );
                                  })}
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  <button className="do-reservation-arrow" onClick={() => handlePeopleRangeChange('next')}>{'>'}</button>
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