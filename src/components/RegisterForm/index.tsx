import React, {useState} from 'react';
import {Button, Input} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion"
import {useTimeout} from "react-use";
import useCountdown from "@/hooks/useCountDown";
import {useMutation} from "@tanstack/react-query";
import {getEmailCode} from "@/service/get-api";


interface Props {
    onSubmit: () => void;
}

interface ValidationState {
    value: string;
    validationState: "valid" | "invalid";
    errorInfo: string;
}

const RegisterForm = ({onSubmit}: Props) => {
    const {t} = useTranslation()
    const [isReady, cancel] = useTimeout(60000);
    const [emailState, setEmailState] = useState<ValidationState>({
        value: '',
        validationState: "valid",
        errorInfo: ""
    })
    const [emailCodeState, setEmailCodeState] = useState<ValidationState>({
        value: '',
        validationState: "valid",
        errorInfo: ""
    })
    const [passwordState, setPasswordState] = useState<ValidationState>({
        value: '',
        validationState: "valid",
        errorInfo: ""
    })
    const [nickNameState, setNickNameState] = useState<ValidationState>({
        value: '',
        validationState: "valid",
        errorInfo: ""
    })
    const [verifyPasswordState, setVerifyPasswordState] = useState<ValidationState>({
        value: '',
        validationState: "valid",
        errorInfo: ""
    })
    const [time, setTime] = useState<number>(0); // 获取验证码时间
    const {count} = useCountdown({
        time,
    })

    const {mutateAsync} = useMutation(getEmailCode)


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
    const handleChangeEmailCode = (value: string) => {
        const validateRequiredEmailCode = !value;
        setEmailState({
            value,
            validationState: (validateRequiredEmailCode) ? "invalid" : "valid",
            errorInfo: validateRequiredEmailCode ? t("email-code.required") : ""
        })
    }

    const handleChangeNickName = (value: string) => {
        const validateRequiredNickName = !value;
        setPasswordState({
            value,
            validationState: validateRequiredNickName ? "invalid" : "valid",
            errorInfo: validateRequiredNickName ? t("nickName.required") : ""
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

    const handleChangeVerifyPassword = (value: string) => {
        const validateEqualVerifyPassword = value !== passwordState.value;
        const validateRequiredVerifyPassword = !value;
        setVerifyPasswordState({
            value,
            validationState: (validateRequiredVerifyPassword || validateEqualVerifyPassword) ? "invalid" : "valid",
            errorInfo: validateRequiredVerifyPassword ? t("verify-password.required") : validateEqualVerifyPassword ? t("verify-password.not-equal") : ""
        })
    }

    const handleSendCode = () => {
        mutateAsync({email: "1371259175@qq.com"})
            .then((res) => {
                console.log(res, 'res')
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
                value={emailCodeState.value}
                labelPlacement={"inside"}
                label={t("email-code.key")}
                color={emailCodeState?.validationState === "invalid" ? "danger" : "default"}
                errorMessage={emailCodeState.errorInfo}
                validationState={emailCodeState.validationState}
                onChange={(e) => {
                    handleChangeEmailCode(e.target.value)
                }}
                endContent={
                    <div
                        className={"inline-flex"}
                    >
                        {
                            count === 0 ? <Button
                                color="primary"
                                variant="shadow"
                                onClick={() => {
                                    handleSendCode()
                                }}
                            >{t("email-code.send-code")}</Button> : `${count}s`
                        }
                    </div>
                }
            />
            <Input
                size="lg"
                value={nickNameState.value}
                labelPlacement={"inside"}
                label={t("nickName.key")}
                color={nickNameState?.validationState === "invalid" ? "danger" : "default"}
                errorMessage={nickNameState.errorInfo}
                validationState={nickNameState.validationState}
                onChange={(e) => {
                    handleChangeNickName(e.target.value)
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
            <Input
                type={"password"}
                size="lg"
                labelPlacement={"inside"}
                value={verifyPasswordState.value}
                label={t("verify-password.key")}
                color={verifyPasswordState?.validationState === "invalid" ? "danger" : "default"}
                errorMessage={verifyPasswordState.errorInfo}
                validationState={verifyPasswordState.validationState}
                onChange={(e) => {
                    handleChangeVerifyPassword(e.target.value)
                }}
            />
            <Button
                color="primary"
                variant="shadow"
                onClick={() => {
                    onSubmit && onSubmit();
                }}
            >{t("login.key")}</Button>
        </motion.div>
    );
};

export default RegisterForm;
