import React, {useEffect, useMemo, useState} from 'react';
import {NextPage} from "next";
import styled from "styled-components";
import {Button, Grid, Input, Text} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {useForm, useWatch} from "react-hook-form";
import toast from 'react-hot-toast';
import LoginForm from "@/components/LoginFrom";
import RegisterForm from "@/components/RegisterForm";

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  transition: background-color .3s;
  background: linear-gradient(to right, rgb(39, 42, 55), #fff);
  box-sizing: border-box;
  display: flex;
  padding: 100px;
`


const Login: NextPage = () => {
    const [isSignIn, setIsSignIn] = useState<boolean>(true)
    const {t} = useTranslation()


    return (
        <StyledContainer>
            <Grid.Container justify="center" alignContent={'center'} alignItems={'center'}>
                <Grid xs={6} direction={'column'}>
                    <Text h1>{t("login.title")}</Text>
                    <Text h4>{t("login.sub-title")}</Text>
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
                        isSignIn ? <Text h4>{t("sign-up")}</Text> :
                            <Text h4>{t("sign-in")}</Text>
                    }
                </Grid>
                <Grid xs={6}/>
            </Grid.Container>
        </StyledContainer>
    );
};

export default Login;
