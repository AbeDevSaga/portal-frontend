import Image from "next/image";
import RegisterForm from "./RegisterForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex bg-gray-100 px-16 py-10">
      <div className="flex bg-white shadow-2xl rounded-3xl border w-full py-10">
        {/* Left Side - Logo */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center px-12 py-7">
          <Image
            src="/logo.jpg"
            alt="CRRSA Logo"
            width={1000}
            height={1000}
            className="max-w-[441px]"
          />
        </div>

        {/* Right Side - Form Area (60% width) */}
        <div className="w-full lg:w-1/2 flex items-center lg:border-l-2 border-[#D9D9D9] justify-center p-8">
          <div className="w-full max-w-3xl flex flex-col gap-2 ">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
