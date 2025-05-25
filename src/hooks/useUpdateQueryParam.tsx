import { usePathname } from "next/navigation";
import { useQueryParams } from "./useQueryParams";

export const useUpdateQueryParam = () => {
  const { append, actualParams } = useQueryParams();
  const pathname = usePathname();

  const updateQuery = (key: string, value: string, removeKeys?: string[]) => {
    const query = append(key, value);
    const searchParams = new URLSearchParams(query);

    if (removeKeys) {
      for (const key in removeKeys) {
        searchParams.delete(removeKeys[key]);
      }
    }
    const search = searchParams.toString();

    return pathname + "?" + search;
  };

  const removeParam = (key: string) => {
    return removeParams([key]);
  };

  const removeParams = (keys: string[]) => {
    const searchParams = new URLSearchParams(actualParams());

    for (const key in keys) {
      searchParams.delete(keys[key]);
    }

    return pathname + "?" + searchParams.toString();
  };

  return { updateQuery, removeParam, removeParams };
};
