import Logo from "../component/Logo";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-gray-100 py-12 px-4 lg:px-8">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
        <Logo size="50" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
