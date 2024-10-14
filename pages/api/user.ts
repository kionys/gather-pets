import { auth } from "@/core/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  uid: string;
  email: string;
  displayName?: string;
  accessToken: string;
}

export const loginAPI = async (loginData: LoginRequestDto): Promise<LoginResponseDto> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    return {
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      accessToken: token,
    };
  } catch (error) {
    throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
  }
};
