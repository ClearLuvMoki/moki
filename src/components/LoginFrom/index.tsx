import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button, Input} from "@nextui-org/react";
import {useForm, useWatch} from "react-hook-form";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";
import {useControlledState} from "@react-stately/utils";

const StyledForm = styled.form`
  width: 400px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

interface Props {
    onSubmit: ({email, password}: { email: string; password: string }) => void;
}

const LoginForm = ({onSubmit}: Props) => {
    const {register, handleSubmit, formState: {errors}, control} = useForm();
    const {t} = useTranslation()
    const [state, setState] = useState({
        email: '',
        password: ""
    })
    const email = useWatch({control, name: "email"})

    const $onSubmit = (data: any) => {
        onSubmit && onSubmit(data)
    }


    useEffect(() => {
        if (Object.keys(errors)?.length > 0) {
            switch (errors?.email?.type) {
                case "pattern":
                    toast.error(t("email.pattern"))
                    break;
                case "required":
                    toast.error(t("email.required"))
                    break;
                default:
                    toast.error(t("email.fail"))
                    break;
            }
        }
    }, [errors])


    return (
        <StyledForm onSubmit={handleSubmit($onSubmit)}>
            <Input
                size="xl"
                value={state.email}
                labelPlaceholder={t("email.key")}
                status={Object.keys(errors?.email || {}).length > 0 ? "error" : "default"}
                {...register("email", {required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        email: e?.target.value
                    }))
                }}
            />
            <Input.Password
                size="xl"
                value={state.password}
                labelPlaceholder={t("password")}
                {...register("password", {required: true})}
                onChange={(e) => {
                    setState((prevState) => ({
                        ...prevState,
                        password: e?.target.value
                    }))
                }}
            />
            <Button shadow type={'submit'}>{t("login.key")}</Button>
        </StyledForm>
    );
};

export default LoginForm;
