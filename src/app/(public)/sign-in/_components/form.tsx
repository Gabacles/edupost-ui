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

import { useLogin } from "@/hooks/auth/useLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
  });

  const [isInvalidCredentials, setIsInvalidCredentials] =
    useState<boolean>(false);
  const { mutateAsync, isPending } = useLogin();
  const router = useRouter();

  const handleSignInUser = async (data: SignInFormSchema) => {
    try {
      await mutateAsync(data);

      setIsInvalidCredentials(false);

      router.push("/");
    } catch (error: any) {
      if (error?.message === "invalid credentials") {
        setIsInvalidCredentials(true);
      }
      console.error("Erro ao fazer login:", error);
    }
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

          {isInvalidCredentials && (
            <div className="bg-red-100 p-3 rounded-md">
              <p className="text-red-500 text-sm">E-mail ou senha inválidos</p>
            </div>
          )}
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            className="w-full bg-edupost-blue-primary"
          >
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
