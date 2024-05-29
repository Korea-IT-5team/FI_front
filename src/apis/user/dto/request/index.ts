// description: 비밀번호 재확인 Request Body DTO
export interface PasswordRecheckRequestDto {
    password: string;
}

// description: 회원정보 수정 Request Body DTO
export interface PatchUserInfoRequestDto {
    nickname: string;
    userAddress: string;
}

// description: 회원 탈퇴 Request Body DTO
export interface DeleteUserRequestDto {
    password: string;
}

// description: 로그인 유저 정보 Request Body DTO
export interface GetUserInfoRequestDto {
    userEmailId: string;
    nickname: string;
    userName: string;
    userTelNumber: string;
    userAddress: string;
    userRole: string;
}
