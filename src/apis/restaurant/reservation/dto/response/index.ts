import ResponseDto from "src/apis/response.dto";
import { RestaurantReservationListItem } from "src/types";

// description: 식당 예약 내역 목록 확인 Response Body DTO
export interface GetReservationListResponseDto extends ResponseDto {
  restaurantReservationList: RestaurantReservationListItem[];
}