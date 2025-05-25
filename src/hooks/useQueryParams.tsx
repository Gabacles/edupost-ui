"use client";

import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();

  const actualParams = () => {
    if (!window?.location) return "";

    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.toString();
  };

  const append = (key: string, value: string) => {
    if (!window?.location) return "";

    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);

    return searchParams.toString();
  };

  const buildQueryParams = (keys: string[]) => {
    let query: string = "";

    for (const key of keys) {
      const value = searchParams.get(key);
      if (value) {
        const sufix = !!query ? "&" : "?";
        query += `${sufix}${key}=${value}`;
      }
    }

    const sufix = !!query ? "&" : "?";

    if (!query.includes("limit")) query += sufix + `limit=${5}`;

    return query;
  };

  return { append, actualParams, buildQueryParams };
};
