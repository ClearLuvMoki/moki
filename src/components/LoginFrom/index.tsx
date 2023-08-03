import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion"
import {useTimeout} from 'react-use';


interface Props {
    onSubmit: ({email, password}: { email: string; password: string }) => void;
}

interface ValidationState {
    value: string;
    validationState: "valid" | "invalid";
    errorInfo: string;
}

const LoginForm = ({onSubmit}: Props) => {
        const {t} = useTranslation()
        const [emailState, setEmailState] = useState<ValidationState>({
            value: '',
            validationState: "valid",
            errorInfo: ""
        })
        const [passwordState, setPasswordState] = useState<ValidationState>({
            value: '',
            validationState: "valid",
            errorInfo: ""
        })


        const handleChangeEmail = (value: string) => {
            const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;
            const validatePatternEmail = !pattern.test(value);
            const validateRequiredEmail = !value;
            setEmailState({
                value,
                validationState: (validatePatternEmail || validateRequiredEmail) ? "invalid" : "valid",
                errorInfo: validatePatternEmail ? t("email.pattern") : validateRequiredEmail ? t("email.required") : ""
            })
        }

        const handleChangePassword = (value: string) => {
            const validateRequiredPassword = !value;
            setPasswordState({
                value,
                validationState: validateRequiredPassword ? "invalid" : "valid",
                errorInfo: validateRequiredPassword ? t("password.required") : ""
            })
        }

        return (
            <motion.div
                className={"w-[400px] my-[30px] flex flex-col gap-[20px]"}
                initial={{opacity: 0, x: -10}}
                animate={{opacity: 1, x: 0}}
            >
                <Input
                    size="lg"
                    labelPlacement={"inside"}
                    value={emailState.value}
                    label={t("email.key")}
                    color={emailState?.validationState === "invalid" ? "danger" : "default"}
                    errorMessage={emailState.errorInfo}
                    validationState={emailState.validationState}
                    onChange={(e) => {
                        handleChangeEmail(e.target.value)
                    }}
                />
                <Input
                    size="lg"
                    type={"password"}
                    labelPlacement={"inside"}
                    value={passwordState.value}
                    label={t("password.key")}
                    color={passwordState?.validationState === "invalid" ? "danger" : "default"}
                    errorMessage={passwordState.errorInfo}
                    validationState={passwordState.validationState}
                    onChange={(e) => {
                        handleChangePassword(e.target.value)
                    }}
                />
                <Button
                    color="primary"
                    variant="shadow"
                    onClick={() => {
                        onSubmit && onSubmit({
                            email: emailState.value,
                            password: passwordState.value
                        });
                    }}
                >{t("login.key")}</Button>
            </motion.div>
        );
    }
;

export default LoginForm;
