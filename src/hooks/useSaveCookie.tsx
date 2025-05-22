import { useCookies } from "@/ioc/cookies/jsCookie";

export const useSaveCookie = async (data: any) => {
  const { setCookie } = useCookies();

  for (const [key, value] of Object.entries(data)) {
    setCookie(key, value);
  }
};
