import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Input} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";

const StyledForm = styled.form`
  width: 400px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

type State = {
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
        <StyledForm onSubmit={handleSubmit($onSubmit)}>
            <Input
                size="lg"
                value={state.email}
                label={t("email.key")}
                status={Object.keys(errors?.email || {}).length > 0 ? "error" : "default"}
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
            <Input.Password
                size="lg"
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
            <Button shadow type={'submit'}>{t("login.key")}</Button>
        </StyledForm>
    );
};

export default RegisterForm;
