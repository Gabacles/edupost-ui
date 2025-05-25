"use client";

import { useEffect, useState } from "react";

import { Switch } from "@/components/shared/switch";
import { useUserStore } from "@/hooks/user/useUserStore";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRoles } from "@/models/types/user";

export const AuthorOnlySwitch = () => {
  const [authorId, setAuthorId] = useState<number | undefined>();
  const [authorRole, setAuthorRole] = useState<UserRoles | undefined>(
    UserRoles.STUDENT
  );
  const { getUserData } = useUserStore();

  useEffect(() => {
    const user = getUserData();
    setAuthorId(user?.id);
    setAuthorRole(user?.roles);
  }, [getUserData]);

  const router = useRouter();
  const params = useSearchParams();
  const { updateQuery } = useUpdateQueryParam();

  if (authorRole !== UserRoles.TEACHER) return null;

  const isAuthorOnly = params.get("authorId") === authorId?.toString();

  const handleChange = (checked: boolean) => {
    const newQuery = updateQuery(
      "authorId",
      checked ? String(authorId ?? "") : "",
      ["page"]
    );
    router.push(newQuery);
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Switch
        id="userOnly"
        className="cursor-pointer"
        checked={isAuthorOnly}
        onCheckedChange={handleChange}
      />
      <label htmlFor="userOnly" className="text-sm cursor-pointer">
        Somente meus posts
      </label>
    </div>
  );
};
