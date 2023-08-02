import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button, Input} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import toast from "react-hot-toast";


interface Props {
    onSubmit: ({email, password}: { email: string; password: string }) => void;
}

const LoginForm = ({onSubmit}: Props) => {
        const {t} = useTranslation()
        const [state, setState] = useState({
            email: '',
            password: ""
        })
        const [emailState, setEmailState] = useState<{
            value: string;
            validationState: "valid" | "invalid";
            errorInfo: string;
        }>({
            value: '',
            validationState: "valid",
            errorInfo: ""
        })
        const $onSubmit = (data: any) => {
            onSubmit && onSubmit(data)
        }

        const handleChangeEmail = (value: string) => {
            const validatePatternEmail = value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
            const validateRequiredEmail = !value;
            console.log(validatePatternEmail, 'validatePatternEmail')
            console.log(value, 'value')
            setEmailState({
                value,
                validationState: (validatePatternEmail || validateRequiredEmail) ? "invalid" : "valid",
                errorInfo: validatePatternEmail ? t("email.pattern") : validateRequiredEmail ? t("email.required") : ""
            })

        }

        return (
            <div
                className={"w-[400px] my-[30px] flex flex-col gap-[40px]"}
            >
                <Input
                    size="lg"
                    labelPlacement={"outside"}
                    value={state.email}
                    label={t("email.key")}
                    color={emailState?.validationState === "invalid" ? "danger" : "default"}
                    errorMessage={emailState.errorInfo}
                    validationState={emailState.validationState}
                    onChange={(e) => {
                        handleChangeEmail(e.target.value)
                        setState((prevState) => ({
                            ...prevState,
                            email: e?.target.value
                        }))
                    }}
                />
                <Input
                    size="lg"
                    type={"password"}
                    labelPlacement={"outside"}
                    value={state.password}
                    label={t("password")}
                    onChange={(e) => {
                        setState((prevState) => ({
                            ...prevState,
                            password: e?.target.value
                        }))
                    }}
                />
                <Button variant="shadow" type={'submit'}>{t("login.key")}</Button>
            </div>
        );
    }
;

export default LoginForm;
