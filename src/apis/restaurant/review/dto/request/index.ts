// description: 식당 리뷰 작성 Request Body DTO
export interface PostReviewRequestDto {
    reviewImage: string;
    rating: number;
    reviewContents: string;
}

// description: 식당 리뷰 수정 Request Body DTO
export interface PatchReviewRequestDto {
    reviewImage: string;
    rating: number;
    reviewContents: string;
}
