import React, {useEffect, useMemo} from 'react';
import {NextPage} from "next";
import styled from "styled-components";
import {Button, Grid, Input, Text} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {SubmitHandler, useForm, useWatch} from "react-hook-form";
import toast from 'react-hot-toast';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  transition: background-color .3s;
  background: linear-gradient(to right, rgb(39, 42, 55), #fff);
  box-sizing: border-box;
  display: flex;
  padding: 100px;
`

const StyledForm = styled.form`
  width: 400px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

interface FormProps {
    phone: string;
    password: string;
}

const Login: NextPage = () => {
    const {register, handleSubmit, formState: {errors}, control} = useForm();
    const {t} = useTranslation()
    const phone = useWatch({control, name: "phone"})


    useEffect(() => {
        if (Object.keys(errors)?.length > 0) {
            switch (errors?.phone?.type) {
                case "pattern":
                    toast.error("手机号格式不正确!")
                    break;
                case "required":
                    toast.error("请输入手机号!")
                    break;
                default:
                    toast.error("手机号有误!")
                    break;
            }
        }
    }, [errors])


    const onSubmit = (data: any) => {
        console.log(data, 'datatt')
    }

    return (
        <StyledContainer>
            <Grid.Container justify="center" alignContent={'center'} alignItems={'center'}>
                <Grid xs={6} direction={'column'}>
                    <Text h1>{t("login.title")}</Text>
                    <Text h4>{t("login.sub-title")}</Text>
                    <StyledForm
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            size="xl"
                            labelPlaceholder={t("phone")}
                            status={Object.keys(errors?.phone || {}).length > 0 ? "error" : "default"}
                            {...register("phone", {required: true, pattern: /^1[0-9][0-9]\d{8}$/})}
                        />
                        <Input.Password
                            size="xl"
                            labelPlaceholder={t("password")}
                            {...register("password", {required: true})}
                        />
                        <Button shadow type={'submit'}>{t("login.key")}</Button>
                    </StyledForm>
                </Grid>
                <Grid xs={6}/>
            </Grid.Container>
        </StyledContainer>
    );
};

export default Login;
