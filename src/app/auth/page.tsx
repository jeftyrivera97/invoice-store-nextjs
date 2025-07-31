import { LoginForm } from "@/components";



export default function LoginPage() {
  return (
   <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm rounded-xl border border-gray-300 bg-white/80 shadow-lg dark:bg-gray-900/80 p-6">
        <LoginForm />
      </div>
    </div>
  );
}