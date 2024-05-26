import ResponseDto from "src/apis/response.dto";
import { ReviewDetailsListItem } from "src/types";

// description: 식당 리뷰 내역 목록 확인 Response Body DTO
export interface GetReviewDetailsResponseDto extends ResponseDto
{
    reviewDetailsList : ReviewDetailsListItem[]
}


// description: 식당 리뷰 내역 확인 Response Body Dto
export interface  GetReviewDetailResponseDto extends ResponseDto
{
    reviewNumber:number,
    reviewRestaurantId:number,
    reviewDate:string,
    reviewImage:string,
    reviewContents:string,
    rating:number,
}