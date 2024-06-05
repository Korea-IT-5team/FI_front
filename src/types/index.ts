export interface RestaurantListItem {
  restaurantId: number;
  restaurantImage: string;
  restaurantName: string;
  restaurantFoodCategory: string;
  restaurantLocation: string;
}

export interface RestaurantReviewListItem {
  reviewNumber: number;
  reviewRestaurantId: number;
  reviewImage: string;
  rating: number;
  reviewContents: string;
  reviewWriterNickname: string;
  reviewDate: string;
}

export interface RestaurantReservationListItem {
  reservationNumber: number;
  reservationStatus: boolean;
  reservationRestaurantId: number;
  reservationRestaurantName: string;
  reservationDate: string;
  reservationTime: string;
  reservationPeople: number;
  reservationUserName:string
}

export interface NoticeBoardListItem {
  noticeNumber: number;
  noticeTitle: string;
  noticeWriteDatetime: string;
  noticeViewCount: number;
}

export interface InquiryBoardListItem {
  inquiryNumber: number;
  inquiryStatus: boolean;
  inquiryPublic: boolean;
  inquiryTitle: string;
  // inquiryWriterId: string;
  inquiryWriterNickname: string;
  inquiryWriteDatetime: string;
}

//###수정
export interface RestaurantReviewListItem {
  reviewNumber: number,
  reviewRestaurantId: number,
  reviewDate: string,
  reviewImage: string,
  rating: number,
  reviewContents: string,
  reviewWriterNickname: string
}
//###수정

// export interface InquiryBoardDetailItem {
//   inquiryNumber: number;
//   inquiryTitle: string;
//   inquiryWriterId: string;
//   inquiryWriteDatetime: string;
//   inquiryContents: string;
//   comment: string;
// }