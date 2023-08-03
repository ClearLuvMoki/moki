import React, {useState} from 'react';
import {NextPage} from "next";
import {useTranslation} from "react-i18next";
import LoginForm from "@/components/LoginFrom";
import RegisterForm from "@/components/RegisterForm";
import Text from "@/components/Text";


const Login: NextPage = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    const {t} = useTranslation()

    return (
        <div
            className={"w-full h-full transition-all duration-300 bg-gradient-to-r from-[#272a37] to-[#fff] box-border flex justify-center items-center p-[100px]"}
        >
            <div
                className={"w-full flex flex-no-wrap justify-center items-center"}
            >
                <div
                    className={"w-1/2 flex flex-col justify-center"}
                >
                    <Text level={1}>{t("login.title")}</Text>
                    <Text level={4}>{t("login.sub-title")}</Text>
                    {
                        isSignIn ? (
                            <LoginForm
                                onSubmit={(data) => {
                                    console.log(data, 'dataa')
                                }}
                            />
                        ) : (
                            <RegisterForm/>
                        )
                    }
                    {
                        isSignIn ? <Text level={4}>
                                {t("sign-up")}
                                {/*<Text*/}
                                {/*    level={4}*/}
                                {/*    className={"inline underline ml-2 cursor-pointer"}*/}
                                {/*>{t('register.key')}</Text>*/}
                            </Text> :
                            <Text level={4}>
                                {t("sign-in")}
                                {/*<Text*/}
                                {/*    level={4}*/}
                                {/*    className={"inline underline ml-2 cursor-pointer"}*/}
                                {/*>{t('login.key')}</Text>*/}
                            </Text>
                    }
                </div>
                <div
                    className={"w-1/2 flex flex-col justify-center"}
                />
            </div>
        </div>
    );
};

export default Login;
