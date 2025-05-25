import { StaticImageData } from "next/image";
import { User } from "./user";

export type Post = {
  id: number;
  title: string;
  content: string;
  author_id: User;
  image: StaticImageData;
  createdAt: string;
  updatedAt: string;
};
