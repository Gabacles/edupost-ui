import { BackButton } from "@/components/shared/backButton";
import { CreatePostForm } from "./_components/createPostForm";

export default function NovaPostagem() {
  return (
    <div className="w-full p-6 gap-4 flex flex-col">
      <BackButton className="!text-black" />
      <h1 className="text-edupost-blue-primary font-bold text-3xl">
        Nova Postagem
      </h1>

      <div className="max-w-[600px]">
        <p className="text-gray-500 my-4">
          Crie uma nova postagem para compartilhar com a comunidade.
        </p>

        <p className="text-gray-500">
          Preencha os campos abaixo para criar sua postagem:
        </p>

        <div className="mt-4">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
}
