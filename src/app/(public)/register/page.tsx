import { EdupostLogo } from "@/components/shared/edupostLogo";
import { RegisterForm } from "./_components/form";

export default function Signup() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="md:grid flex justify-center grid-cols-2 w-full h-full">
        <div className="bg-gray-100 md:flex justify-center items-center hidden">
          <EdupostLogo />
        </div>

        <div className="flex justify-center items-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
