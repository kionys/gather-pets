import AppContainer from "@/components/templates/app-container";
import { setInitAuth, useCache } from "@/core/hooks/use-cache";
import QueryProviders from "@/core/utils/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { auth, setAuth } = useCache();

  useEffect(() => {
    const initCache = async () => {
      const auth = await setInitAuth();
      if (router.pathname !== "/login" && auth === null) {
        router.push("/login");
      }
      if (router.pathname === "/login" && auth !== null) {
        router.push("/");
      }
      setAuth(auth);
    };
    initCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(router.pathname);
  return (
    <QueryProviders>
      {router.pathname === "/404" ? (
        <Component {...pageProps} />
      ) : router.pathname === "/login" ? (
        <Component {...pageProps} />
      ) : auth ? (
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      ) : (
        <></>
      )}
    </QueryProviders>
  );
}
