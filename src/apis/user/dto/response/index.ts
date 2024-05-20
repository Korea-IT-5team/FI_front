import ResponseDto from "src/apis/response.dto";

// description: 로그인 유저 정보 반환 Response Body DTO
export interface GetUserInfoResponseDto extends ResponseDto {
  userEmailId: string;
  nickname: string;
  userName: string;
  userTelNumber: string;
  userAddress: string;
  userRole: string;
}