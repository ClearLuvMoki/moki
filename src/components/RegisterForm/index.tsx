import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";


interface State {
    email: string;
    emailCode: string;
    nickName: string;
    password: string;
    verifyPassword: string;
}

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}, control} = useForm();
    const {t} = useTranslation()
    const [state, setState] = useState<State>({
        email: '',
        emailCode: "",
        nickName: "",
        password: "",
        verifyPassword: ""
    })

    const $onSubmit = () => {

    }


    return (
        <form
            className={"w-[400px] my-[30px] flex flex-col gap-[40px]"}
            onSubmit={handleSubmit($onSubmit)}
        >
            <Input
                size="lg"
                value={state.email}
                labelPlacement={"outside"}
                label={t("email.key")}
                color={Object.keys(errors?.email || {}).length > 0 ? "danger" : "default"}
                {...register("email", {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        email: e?.target.value
                    }))
                }}
            />
            <Input
                size="lg"
                value={state.emailCode}
                labelPlacement={"outside"}
                label={t("email.code")}
                {...register("emailCode", {required: true})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        emailCode: e?.target.value
                    }))
                }}
            />
            <Input
                size="lg"
                value={state.nickName}
                labelPlacement={"outside"}
                label={t("email.nickName")}
                {...register("nickName", {required: true})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        nickName: e?.target.value
                    }))
                }}
            />
            <Input
                size="lg"
                type={"password"}
                labelPlacement={"outside"}
                value={state.password}
                label={t("password")}
                {...register("password", {required: true})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        password: e?.target.value
                    }))
                }}
            />
            <Input
                type={"password"}
                size="lg"
                labelPlacement={"outside"}
                value={state.verifyPassword}
                label={t("verifyPassword")}
                {...register("verifyPassword", {required: true})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        verifyPassword: e?.target.value
                    }))
                }}
            />
            <Button variant={"shadow"} type={'submit'}>{t("login.key")}</Button>
        </form>
    );
};

export default RegisterForm;
