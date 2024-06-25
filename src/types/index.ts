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
  reviewRestaurantName: String;
}

export interface RestaurantReservationListItem {
  reservationNumber: number;
  reservationStatus: boolean;
  reservationRestaurantId: number;
  reservationRestaurantName: string;
  reservationDate: string;
  reservationTime: string;
  reservationPeople: number;
  reservationUserName: string;
  reservationRestaurantLocation: string;
}

export interface NoticeBoardListItem {
  noticeNumber: number;
  noticeTitle: string;
  noticeWriteDatetime: string;
  viewCount: number;
  noticeWriterNickname: string;
}

export interface InquiryBoardListItem {
  inquiryNumber: number;
  status: boolean;
  inquiryPublic: boolean;
  inquiryTitle: string;
  inquiryWriterId: string;
  inquiryWriterNickname: string;
  inquiryWriteDatetime: string;
}

export interface RestaurantReviewListItem {
  reviewNumber: number,
  reviewRestaurantId: number,
  reviewDate: string,
  reviewImage: string,
  rating: number,
  reviewContents: string,
  reviewWriterNickname: string
}