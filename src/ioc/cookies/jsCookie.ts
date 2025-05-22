import Cookie from "js-cookie";

export const useCookies = () => {
  const domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost";

  const setCookie = (name: string, value: any, options?: any) => {
    Cookie.set(name, value, { ...options, domain });
  };

  const getCookie = (name: string) => {
    return Cookie.get(name);
  };

  const removeCookie = (name: string, options?: any) => {
    Cookie.remove(name, { ...options, domain });
  };

  return {
    setCookie,
    getCookie,
    removeCookie,
  };
};
