import { getCachePpsition, saveCachePpsition } from '@/utils/tools';
import { Skeleton } from '@heroui/react';
import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface Props {
    cacheId: string;
    latitude: number;
    longitude: number;
}

const Position = ({ latitude, longitude, cacheId }: Props) => {
    if (!latitude || !longitude) {
        return <></>
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [postion, setPostion] = useState("")

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (getCachePpsition(cacheId)) {
            setPostion(getCachePpsition(cacheId) as string)
            setLoading(false);
        } else {
            fetch(`https://restapi.amap.com/v3/geocode/regeo?output=json&radius=2&location=${longitude},${latitude}&key=23724ecaccb2eb04b286c2b506153322&extensions=base`)
                .then((res) => res.json())
                .then((res) => {
                    if (cacheId) {
                        saveCachePpsition(cacheId, res.regeocode?.formatted_address || "")
                    }
                    setPostion(res.regeocode?.formatted_address)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [latitude, longitude, cacheId])

    return (
        <>
            {loading && (<Skeleton className="h-3 w-3/5 rounded-lg" />)}
            {
                !loading && postion && (<div className='dark:text-zinc-500 flex gap-2 items-center text-sm select-none '>
                    <MapPin className='min-w-[18px]' size={16}/>
                    <span>{postion}</span>
                </div>)
            }
        </>
    )
}

export default Position
