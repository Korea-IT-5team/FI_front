import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import ResponseDto from "src/apis/response.dto";
import { PostReservationRequestDto } from "src/apis/restaurant/reservation/dto/request";
import { RESTAURANT_INFO_ABSOLUTE_PATH } from "src/constant";
import './style.css';

import { PostReservationRequest } from "src/apis/restaurant/reservation";
import DatePicker from "react-datepicker";

// interface //
interface TermsPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsPopup: React.FC<TermsPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" >
            <div className="popup-content">
                <h2>약관 동의</h2>
                <div className="terms-text">
                    본 서비스는 예약 서비스를 제공하며,
                    예약 시 고객의 개인 정보를 수집할 수 있습니다.
                    고객은 예약을 위해 필요한 정보를 정확히 제공해야 하며,
                    잘못된 정보로 인한 문제는 책임지지 않습니다.
                    본 예약 서비스는 예약 신청 시점에서의 식당 상황에 따라 예약이 확정되지 않을 수 있습니다.
                    예약이 확정되는 시점에 대해 별도의 안내를 받으실 수 있습니다.
                    예약 취소나 변경은 가능한 최소한의 시간 이내에 진행해야 하며,
                    이에 대한 정책은 식당의 규정에 따릅니다.
                    본 예약 서비스를 이용함으로써 고객은 위 내용에 동의하는 것으로 간주됩니다.
                </div>
                <button className="popup-close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

// component //
export default function DoReservation() {

    // state //
    const [reservationDate, setReservationDate] = useState<Date | null>(null);
    const [reservationTime, setReservationTime] = useState<string>('');
    const [reservationPeople, setReservationPeople] = useState<number>();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { restaurantId } = useParams();
    const [cookies] = useCookies();
    const navigation = useNavigate();
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [selectedPeople, setSelectedPeople] = useState<number | null>(null);
    const [timeRange, setTimeRange] = useState<{ start: number, end: number }>({ start: 0, end: 11 });
    const [peopleRange, setPeopleRange] = useState<{ start: number, end: number }>({ start: 1, end: 12 });
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    // function //
    const PostReservationResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '필수 데이터를 입력하지 않았습니다.' :
            result.code === 'NR' ? '존재하지 않는 식당입니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'NU' ? '존재하지 않는 사용자입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!restaurantId) return;
        navigation(RESTAURANT_INFO_ABSOLUTE_PATH(restaurantId));
    }

    // event handler //
    const onMonthDayChangeHandler = (date: Date | null) => {
        setReservationDate(date);
    }

    const onPeopleClickHandler = (value: number) => {
        setSelectedPeople(value);
        setReservationPeople(value);
    };

    const onTimeClickHandler = (value: number) => {
        setSelectedTime(value);
        setReservationTime(formatTime(value));
    };

    const onCheckClickHandler = () => {
        setIsChecked(!isChecked);
    }

    const onReservationClickHandler = () => {
        if (!reservationDate || !reservationTime || !reservationPeople || !isChecked) {
            return;
        }

        const isoDateString = new Date(reservationDate.getTime() - reservationDate.getTimezoneOffset() * 60000).toISOString();
        const dateString = isoDateString.substr(0, 10);
        const requestBody: PostReservationRequestDto =
        { reservationDate: dateString, reservationTime: reservationTime, reservationPeople: reservationPeople }

        if (!restaurantId) return;
        PostReservationRequest(restaurantId, requestBody, cookies.accessToken)
            .then(PostReservationResponse);
    }

    const handleTimeRangeChange = (direction: 'prev' | 'next') => {
        setTimeRange(prevRange => {
            const newStart = direction === 'prev' ? Math.max(0, prevRange.start - 12) : Math.min(36, prevRange.start + 12);
            const newEnd = direction === 'prev' ? Math.max(11, prevRange.end - 12) : Math.min(47, prevRange.end + 12);
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
        const hours = Math.floor(num / 2);
        const minutes = (num % 2) * 30;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const openPopup = () => { setIsPopupOpen(true); }

    const closePopup = () => { setIsPopupOpen(false); }

    // render //
    const isSignUpActive = reservationDate && reservationTime && reservationPeople && isChecked;
    const signUpButtonClass = `${isSignUpActive ? 'do-reservation-primary' : 'do-reservation-disable'}-button`;

    return (
        <>
            <div className="do-reservation-information">예약자 정보</div>
            <div className="do-reservation-box">
                {!isPopupOpen && <div className="do-reservation-input-label">날짜</div>}
                {!isPopupOpen && <DatePicker
                    className="do-reservation-date-input"
                    selected={reservationDate}
                    onChange={onMonthDayChangeHandler}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜를 선택해주세요"
                />}
                <div className="do-reservation-input-label">시간</div>
                <div className="do-reservation-time-box">
                    <div className="time-range">
                        <button className="do-reservation-arrow" onClick={() => handleTimeRangeChange('prev')}>{'<'}</button>
                        <table className="do-reservation-table">
                            <tbody>
                                {[...Array(3)].map((_, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Array.from({ length: 4 }, (_, colIndex) => { const num = rowIndex * 4 + colIndex + timeRange.start;
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
                                        {Array.from({ length: 4 }, (_, colIndex) => { const num = rowIndex * 4 + colIndex + peopleRange.start;
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
                    <button className="popup-open-button" onClick={openPopup}>약관 보기</button>
                </div>
                <div className={signUpButtonClass} onClick={onReservationClickHandler}>예약하기</div>
            </div>
            <TermsPopup isOpen={isPopupOpen} onClose={closePopup} />
        </>
    )
}