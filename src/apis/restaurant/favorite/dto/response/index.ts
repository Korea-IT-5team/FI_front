import ResponseDto from "src/apis/response.dto";
import { RestaurantListItem } from "src/types";

// description: 찜(저장)한 식당 내역 목록 확인 Response Body DTO
export interface GetFavoriteRestaurantListResponseDto extends ResponseDto {
  restaurantList: RestaurantListItem[];
}