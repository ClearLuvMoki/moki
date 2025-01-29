import React, { useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { Button } from "@heroui/react"
import DefaultLayout from '@/layouts/default'
import { useRouter } from "next/router";
import { ArrowRight } from 'lucide-react';


const Years = [2019, 2020, 2021, 2022, 2023]

const Moment = () => {
    const router = useRouter();

    return (
        <DefaultLayout>
            <div className={"m-auto flex flex-col justify-center items-center  h-[500px]"}>
                <div className={"text-4xl font-bold flex justify-center w-10/12 break-words"}>
                    <Typewriter
                        loop={false}
                        cursor
                        cursorStyle='_'
                        words={["Some moments"]}
                        delaySpeed={3000}
                    />
                </div>
                <div className={"flex gap-4 mt-6"}>
                    {
                        Years.map((item) => (
                            <Button
                                variant='light'
                                key={item}
                                onPress={() => {
                                    router.push({
                                        pathname: `/moment/${item}`
                                    }) 
                                }}
                            >{item}</Button>
                        ))
                    }
                </div>
            </div>

        </DefaultLayout>
    )
}

export default Moment;
