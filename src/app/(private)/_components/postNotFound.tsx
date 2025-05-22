import postNotFoundImg from "@/assets/post-not-found.png";
import Image from "next/image";

export const PostNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <Image
        src={postNotFoundImg}
        alt="Post not found"
        className="w-1/4 max-sm:w-3/4"
      />
      <h1 className="text-2xl font-bold text-center text-edupost-blue">
        Ops!... nenhum resultado encontrado
      </h1>
      <p className="text-md">Por favor, tente outra pesquisa</p>
    </div>
  );
};
