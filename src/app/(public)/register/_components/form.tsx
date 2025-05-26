"use client";

import { FormInput } from "@/components/shared/formInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/shared/select";
import { Button } from "@/components/shared/button";
import { UserRoles } from "@/models/types/user";
import { strings } from "@/models/constants/strings";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormSchema,
  type RegisterFormSchema,
} from "../data/registerFormSchema";

import { useRegister } from "@/hooks/auth/useRegister";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const { mutateAsync, isPending } = useRegister();

  const userRoles = [
    { value: UserRoles.STUDENT, label: strings.userRoles[UserRoles.STUDENT] },
    { value: UserRoles.TEACHER, label: strings.userRoles[UserRoles.TEACHER] },
  ];

  const handleRegisterUser = async (data: RegisterFormSchema) => {
    try {
      const { name, userName, email, password, role } = data;

      const userData = {
        name,
        email,
        username: userName,
        password,
        roles: UserRoles[role as UserRoles],
      };

      await mutateAsync(userData);

      toast.success("Cadastro realizado com sucesso!");
      router.push("/sign-in");
    } catch (error) {
      console.error("Erro ao fazer registro:", error);
    }
  };

  return (
    <div className="w-3/5 shadow-edu-shadow rounded-2xl min-w-96">
      <form onSubmit={handleSubmit(handleRegisterUser)}>
        <div className="flex flex-col gap-4 p-8">
          <h1 className="text-2xl font-bold text-center">
            Faça seu <span className="text-edupost-blue-primary">cadastro</span>
          </h1>
          <hr className="border border-b-edupost-blue-primary mt-4" />
          <FormInput
            name="name"
            placeholder="Nome"
            className="w-full"
            maxLength={100}
            registration={register("name")}
            error={errors.name}
          />
          <FormInput
            name="userName"
            placeholder="Usuário"
            className="w-full"
            maxLength={100}
            registration={register("userName")}
            error={errors.userName}
          />
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
            maxLength={25}
            placeholder="Senha"
            className="w-full"
            registration={register("password")}
            error={errors.password}
          />

          <FormInput
            name="confirmPassword"
            type="password"
            maxLength={25}
            placeholder="confirme sua senha"
            className="w-full"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
          />

          <div>
            <Select
              onValueChange={(value) =>
                setValue("role", UserRoles[value as UserRoles])
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione seu papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {userRoles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            isLoading={isPending}
            className="w-full bg-edupost-blue-primary"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
};
