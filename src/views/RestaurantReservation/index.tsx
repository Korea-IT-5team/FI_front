
export default function RestaurantReservation() {
  return (
    <>
      <div className="reservation-npeople">
          <div className="reservation">예약하기</div>
          {/* <select id="rating" name="rating" defaultValue={rating} onClick={() => onRatingChangeHandler}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
          </select> */}
       </div>
       <div className="reservation-box">
          <div>
            <div>달력</div>
            <div>n월 n주차</div>
          </div>
       </div>
    </>
  )
}
