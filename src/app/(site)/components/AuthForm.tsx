"use client";

import axios from "axios";
import Button from "@/app/component/Button";
import Input from "@/app/component/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Login succes");
          signIn("credentials", data);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            toast.error(error.response.data);
          } else {
            toast.error("Something went wrong!");
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) {
            toast.error(res.error);
          }

          if (res?.ok && !res.error) {
            toast.success("Login succes!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.ok && !res.error) {
          toast.success("Login succes!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <div className="rounded-lg bg-white px-5 py-8 shadow lg:px-4">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              error={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email Address"
            type="email"
            register={register}
            error={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register}
            error={errors}
            disabled={isLoading}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div>
            <Button secondary fullWidth type="submit" disabled={isLoading}>
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          {/* Continue with */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New in application?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
