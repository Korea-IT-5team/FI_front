// description: 식당 정보 등록 Request Body DTO
export interface PostRestaurantInfoRequestDto {
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
    restaurantBusinessRegistrationNumber: string;
    restaurantRepresentativeMenu: string;
}

// description: 식당 정보 수정 Request Body DTO
export interface PatchRestaurantInfoRequestDto {
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
}
//###수정

