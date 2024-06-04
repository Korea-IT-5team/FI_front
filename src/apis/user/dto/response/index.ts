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

// description: 내 정보 불러오기 Response Body DTO
export interface GetMyInfoResponseDto extends ResponseDto{
  userEmailId: string;
  nickname: string;
  userName: string;
  userTelNumber: string;
  userAddress: string;
  userRole: string;
  joinPath: String;
}
//수정5