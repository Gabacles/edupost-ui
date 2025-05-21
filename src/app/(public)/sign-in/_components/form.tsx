"use client";

import Link from "next/link";
import { FormInput } from "@/components/shared/formInput";
import { Button } from "@/components/shared/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInFormSchema,
  type SignInFormSchema,
} from "../data/signinFormSchema";

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const handleSignInUser = (data: SignInFormSchema) => {
    console.log(data);
  };

  return (
    <div className="w-3/5 shadow-edu-shadow rounded-2xl min-w-96">
      <form onSubmit={handleSubmit(handleSignInUser)}>
        <div className="flex flex-col gap-4 p-8">
          <h1 className="text-2xl font-bold text-center">
            Faça seu <span className="text-edupost-blue-primary">login</span>
          </h1>
          <hr className="border border-b-edupost-blue-primary mt-4" />
          <FormInput
            name="email"
            placeholder="E-mail"
            className="w-full"
            maxLength={100}
            registration={register("email")}
            error={errors.email}
          />

          <FormInput
            name="password"
            type="password"
            placeholder="Senha"
            className="w-full"
            maxLength={100}
            registration={register("password")}
            error={errors.password}
          />
          <Button type="submit" className="w-full bg-edupost-blue-primary">
            Entrar
          </Button>
        </div>
        <div className="flex justify-center items-center bg-gray-200 h-12 rounded-b-2xl">
          <p>
            Não tem uma conta? <Link href={"/register"}>Registrar-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
