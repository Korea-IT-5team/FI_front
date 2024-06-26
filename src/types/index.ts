export interface RestaurantListItem {
  restaurantId: number;
  restaurantName: string;
  restaurantImage: string;
  restaurantLocation: string;
  restaurantFoodCategory: string;
}

export interface RestaurantReviewListItem {
  rating: number;
  reviewNumber: number;
  reviewRestaurantId: number;
  reviewDate: string;
  reviewImage: string;
  reviewContents: string;
  reviewRestaurantName: String;
  reviewWriterNickname: string;
}

export interface RestaurantReservationListItem {
  reservationStatus: boolean;
  reservationNumber: number;
  reservationPeople: number;
  reservationRestaurantId: number;
  reservationDate: string;
  reservationTime: string;
  reservationUserName: string;
  reservationRestaurantName: string;
  reservationRestaurantLocation: string;
}

export interface NoticeBoardListItem {
  viewCount: number;
  noticeNumber: number;
  noticeTitle: string;
  noticeWriteDatetime: string;
  noticeWriterNickname: string;
}

export interface InquiryBoardListItem {
  status: boolean;
  inquiryPublic: boolean;
  inquiryNumber: number;
  inquiryTitle: string;
  inquiryWriterId: string;
  inquiryWriteDatetime: string;
  inquiryWriterNickname: string;
}

export interface RestaurantReviewListItem {
  rating: number,
  reviewNumber: number,
  reviewRestaurantId: number,
  reviewDate: string,
  reviewImage: string,
  reviewContents: string,
  reviewWriterNickname: string
}