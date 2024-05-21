import ResponseDto from "src/apis/response.dto";
import { RestaurantListItem, RestaurantReviewListItem } from "src/types";

// description: 식당 목록 검색 Response Body DTO
export interface GetRestaurantListResponseDto extends ResponseDto {
  restaurantList: RestaurantListItem[];
}

// description: 특정 식당 정보 Response Body DTO
export interface GetRestaurantInfoResponseDto extends ResponseDto {
  restaurantId: number;
  restaurantImage: string;
  restaurantName: string;
  restaurantFoodCategory: string;
  restaurantPostalCode: string;
  restaurantLocation: string;
  restaurantTelNumber: string;
  restaurantSnsAddress: string;
  restaurantOperationHours: string;
  restaurantFeatures: string;
  restaurantNotice: string;
  restaurantRepresentativeMenu: string;
  restaurantBusinessRegistrationNumber: string;
  restaurantWriterId:string;
  restaurantReviewList: RestaurantReviewListItem[]
}