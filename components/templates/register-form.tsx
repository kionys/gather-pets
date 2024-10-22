"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface IStateRegisterData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [registerData, setRegisterData] = useState<IStateRegisterData>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (registerData.name && registerData.email && registerData.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [registerData]);

  const onClickRegister = async () => {
    try {
      await axios.post(`/api/signup`, {
        name: registerData.name,
        username: registerData.name,
        email: registerData.email,
        website: "https://github.com/kionys",
        bio: "https://velog.io/@kionys/posts",
        gender: "male",
        password: registerData.password,
      });
      router.replace(`/login`);
    } catch (e) {
      throw e;
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

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
            <div className="font-semibold text-2xl font-sans">Gather Pets - 회원가입</div>
            <div className="text-gray-500 font-sans">Hello! Ready to get started?</div>
          </div>

          <div className="flex flex-col gap-3">
            <Input
              type="name"
              name="name"
              value={registerData.name}
              onChange={onChangeInput}
              placeholder="이름"
              className="h-14 rounded-md px-4 py-2"
            />
            <Input
              type="email"
              name="email"
              value={registerData.email}
              onChange={onChangeInput}
              placeholder="이메일"
              className="h-14 rounded-md px-4 py-2"
            />
            <Input
              type="password"
              name="password"
              value={registerData.password}
              onChange={onChangeInput}
              placeholder="비밀번호"
              className="h-14 rounded-md px-4 py-2"
            />
            <Button
              variant={"secondary"}
              onClick={onClickRegister}
              className="h-14 rounded-md text-white"
              disabled={disabled}
            >
              가입하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
