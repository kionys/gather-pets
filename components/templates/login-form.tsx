"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IStateLoginData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<IStateLoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginData.email && loginData.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loginData]);

  const onClickLogin = async () => {
    try {
      await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (e) {
      throw e;
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  console.log(loginData);
  return (
    <>
      <div className="hidden lg:flex w-full h-screen items-center justify-center text-3xl font-sans font-semibold">
        {/* 로고 */}
        Gather Pets Logo
      </div>
      <div className="flex w-full h-screen items-start justify-start border-l-2">
        <div className="flex flex-col gap-10 mt-10 px-12 sm:px-20 md:px-24 lg:px-28 py-8 w-full">
          {/* 인포 */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-2xl font-sans">Gather Pets - 로그인</div>
            <div className="text-gray-500 font-sans">Hello! Ready to get started?</div>
          </div>

          {/* 아이디, 비밀번호, 로그인 */}
          <div className="flex flex-col gap-3">
            <Input
              className="h-14 rounded-md px-4 py-2"
              type="email"
              name="email"
              value={loginData.email}
              onChange={onChangeInput}
              placeholder="Email"
            />
            <Input
              className="h-14 rounded-md px-4 py-2"
              type="password"
              name="password"
              value={loginData.password}
              onChange={onChangeInput}
              placeholder="Password"
            />
            <Button
              variant={"secondary"}
              className="h-14 rounded-md text-white"
              disabled={disabled}
              onClick={onClickLogin}
            >
              Login
            </Button>
          </div>

          {/* 소셜로그인 버튼 */}
          <div className="flex flex-col gap-3">
            <Button
              className="text-white h-14 flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Sign in with Google
            </Button>
            <Button
              className="text-white h-14 flex gap-3 bg-[#2db400] hover:bg-[#2db400]/90"
              onClick={() => signIn("naver", { callbackUrl: "/dashboard" })}
              disabled
            >
              Sign in with Naver
            </Button>
            <Button
              className="text-black h-14 flex gap-2 bg-[#fef01b] hover:bg-[#fef01b]/90 "
              onClick={() => signIn("kakao", { callbackUrl: "/dashboard" })}
              disabled
            >
              Sign in with Kakao
            </Button>
          </div>

          {/* 회원가입 */}
          <div className="flex gap-2 justify-center">
            <p className="text-zinc-500 font-light">New Here?</p>
            <Link href={"/register"}>
              <span className="text-blue-500 font-normal">Create an account and join us</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
