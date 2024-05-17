// description: 식당 예약 Request Body DTO
export interface PostReservationRequestDto {
    reservationDate: string;
    reservationTime: string;
    reservationPeople: number;
}

export interface DeleteReservationRequestDto {
    cancellationReason: string;
}