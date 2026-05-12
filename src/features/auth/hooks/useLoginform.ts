"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { loginSchema, LoginSchema } from "../schema";

export function useLoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginSchema) {
        // mock delay api
        await new Promise((resolve) =>
            setTimeout(resolve, 2000)
        );

        const isValidUser =
            data.username === "estapar" &&
            data.password === "@estapar@";

        if (!isValidUser) {
            setError("root", {
                message: "Usuário ou senha inválidos",
            });

            return;
        }

        // mock token
        localStorage.setItem(
            "token",
            "fake-jwt-token"
        );

        router.push("/dashboard");
    }

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
    };
}