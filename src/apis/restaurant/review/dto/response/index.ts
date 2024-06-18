import ResponseDto from "src/apis/response.dto";
import { RestaurantReviewListItem } from "src/types";


// description: 식당 리뷰 내역 목록 확인 Response Body DTO
export interface GetReviewListResponseDto extends ResponseDto
{
    restaurantReviewList: RestaurantReviewListItem[];
}


// description: 식당 리뷰 내역 확인 Response Body Dto
export interface  GetReviewResponseDto  extends ResponseDto
{
    reviewNumber: number,
    reviewRestaurantId: number,
    reviewDate: string,
    reviewImage: string,
    reviewContents: string,
    rating: number,
    reviewWriterNickname: string
}