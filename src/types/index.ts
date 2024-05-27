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
  reviewWriterId: string;
  reviewWriterNickname: string;
  reviewDate: string;
}

export interface RestaurantReservationListItem {
  reservationNumber: number;
  reservationStatus: boolean;
  reservationRestaurantId: number;
  reservationRestaurantName: string;
  reservationUserId: string;
  reservationDate: string;
  reservationTime: string;
  reservationPeople: number;
  reservatoinUserName:string
}

export interface NoticeBoardListItem {
  noticeNumber: number;
  noticeTitle: string;
  noticeWriteId: string;
  noticeWriteDatetime: string;
  noticeViewCount: number;
}

export interface InquiryBoardListItem {
  inquiryNumber: number;
  inquiryStatus: boolean;
  inquiryTitle: string;
  inquiryWriterId: string;
  inquiryWriteDatetime: string;
}

export interface ReviewDetailsListItem{
  reviewNumber:number,
  reviewRestaurantId:number,
  reviewDate:string
}