import ResponseDto from "src/apis/response.dto";

// description: 로그인 Response Body DTO
export interface SignInResponseDto extends ResponseDto {
  accessToken: string;
  expires: number;
}

// description: 아이디(이메일) 찾기 Response Body DTO
export interface FindEmailResponseDto extends ResponseDto {
  userEmailId: string;
}

// description: 비밀번호 재설정 요청 링크 전송 Response Body DTO
export interface PasswordResetResponseDto extends ResponseDto {
  passwordResetLink: string;
}