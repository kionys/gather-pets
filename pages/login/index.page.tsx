import { useCache } from "@/core/hooks/use-cache";
import { useRouter } from "next/router";
import { useState } from "react";
import { loginAPI } from "../api/user";

interface IStateLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const { setAuth } = useCache();
  const [loginData, setLoginData] = useState<IStateLogin>({
    email: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      window.alert("이메일과 비밀번호를 확인하세요");
    }
    try {
      const result = await loginAPI(loginData);
      setAuth(result);
      router.reload();
    } catch (e) {
      throw e;
    }
  };
  return (
    <div className="flex w-full justify-center items-center flex-col gap-3 h-[100vh]">
      <div className="text-blue-500">Gather Pets Login</div>
      <input
        type="text"
        name="email"
        value={loginData.email}
        onChange={onChangeInput}
        onKeyPress={e => e.key === "Enter" && onClickLogin(e)}
        className="border border-blue-500 rounded-md h-[50px] w-[300px] p-3 placeholder:text-blue-500"
        placeholder="이메일을 입력해 주세요."
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={onChangeInput}
        onKeyPress={e => e.key === "Enter" && onClickLogin(e)}
        className="border border-blue-500 rounded-md h-[50px] w-[300px] p-3 placeholder:text-blue-500"
        placeholder="비밀번호를 입력해 주세요."
      />
      <button
        className="bg-blue-500 font-semibold border-blue-500 text-white rounded-md h-[50px] w-[300px] p-3 hover:bg-blue-700"
        onClick={onClickLogin}
      >
        Login
      </button>
    </div>
  );
};
export default LoginPage;
