import {convertToBase64, RenderTransformMarkdown} from '@/utils/tools';
import {Card, CardBody, cn, image, Image, Skeleton} from '@heroui/react'
import React, {useEffect, useState} from 'react'
import EXIF from "exif-js";
import {ExifType, MarkdownType} from '@/types';
import {useSetState} from 'react-use';
import MarkdownRender from './markdown-render';
import Position from './position';
import MomentImageModal from './moment-image-modal';
import clsx from "clsx"

interface Props {
    id: string;
    content: string;
}


const convertDMSToDD = (dms: any, direction?: any) => {
    if (!dms) return;
    const degrees = dms[0];
    const minutes = dms[1];
    const seconds = dms[2];

    let dd = degrees + minutes / 60 + seconds / 3600;

    if (direction && (direction === 'S' || direction === 'W')) {
        dd = -dd;
    }

    return dd;
};

const onExif = (blob: Blob): Promise<ExifType> => {
    return new Promise((resolve, reject) => {
        try {
            EXIF.getData(blob as unknown as string, function () {
                // @ts-ignore;
                const exifData = this;
                // 海拔
                const altitudeRef = EXIF.getTag(exifData, 'GPSAltitudeRef');
                const _altitude = EXIF.getTag(exifData, 'GPSAltitude');
                const altitude = convertDMSToDD(_altitude, altitudeRef);

                // 焦距
                const focalLength = convertDMSToDD(EXIF.getTag(exifData, 'FocalLength'));
                // 光圈值
                const fNumber = convertDMSToDD(EXIF.getTag(exifData, 'FNumber'));
                // 快门速度
                const exposureTime = convertDMSToDD(EXIF.getTag(exifData, 'ExposureTime'));

                const _latitude = EXIF.getTag(exifData, 'GPSLatitude');
                const _longitude = EXIF.getTag(exifData, 'GPSLongitude');
                const latRef = EXIF.getTag(exifData, 'GPSLatitudeRef') || 'N';
                const lonRef = EXIF.getTag(exifData, 'GPSLongitudeRef') || 'E';
                const latitude = convertDMSToDD(_latitude, latRef);
                const longitude = convertDMSToDD(_longitude, lonRef);

                const date = EXIF.getTag(exifData, 'DateTime'); // 时间
                const iso = EXIF.getTag(exifData, 'ISOSpeedRatings'); // iso
                const whiteBalance = EXIF.getTag(exifData, 'WhiteBalance'); // 白平衡
                const brightnessValue = EXIF.getTag(exifData, 'BrightnessValue'); // 亮度
                const flash = EXIF.getTag(exifData, 'Flash'); // 闪光灯状态
                resolve({
                    latitude,
                    longitude,
                    date: date ? date.replace(/:/g, function (match: any, offset: any) {
                        if (offset === date.indexOf(':') || offset === date.indexOf(':', date.indexOf(':') + 1)) {
                            return '-';
                        }
                        return match;
                    }) : "",
                    iso,
                    altitude,
                    whiteBalance,
                    focalLength,
                    fNumber,
                    exposureTime,
                    brightnessValue: brightnessValue ? Number(brightnessValue.toFixed(2)) : 0,
                    flash
                });
            });
        } catch (err) {
            reject(err)
        }
    })
}


const MomentCard = ({id, content}: Props) => {
    const [url, setUrl] = useState<{
        base64: string;
        exifInfo: ExifType
    }[]>([])
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [state, setState] = useSetState<MarkdownType>({
        frontMatter: null,
        content: ""
    })
    const [modalState, setModalState] = useSetState<{
        open: boolean;
        item: {
            base64: string;
            exifInfo: ExifType
        } | null
    }>({
        open: false,
        item: null
    })

    useEffect(() => {
        if (content) {
            RenderTransformMarkdown(content)
                .then((res) => {
                    setImages(res?.frontMatter?.moment || [])
                    setState({
                        frontMatter: res?.frontMatter,
                        content: res?.content || ""
                    })
                })
        }
    }, [content, setState])

    useEffect(() => {
        if (images && images.length > 0) {
            Promise.allSettled(images.map(async item => {
                const data = await convertToBase64(item);
                const exifInfo = await onExif(data.blob);
                return {
                    base64: data.base64,
                    exifInfo
                }
            }))
                .then((promiseRes) => {
                    const res = promiseRes.filter((item: any) => item.status === "fulfilled").map((item: any) => item?.value);
                    setUrl(res as any);
                })
                .finally(() => setLoading(false))
        }
    }, [images])


    return (
        <>
            <Card
                className={"select-none mb-4"}
            >
                <CardBody className={"flex flex-row flex-nowrap gap-4 px-8 "}
                >
                    <div className='w-[40px] min-w-[40px]'>
                        <Image
                            src={"/old_avatar.png"}
                            alt='Old avatar'
                            className='w-[40px] h-[40px] rounded-lg'
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        {
                            loading && (
                                <Skeleton/>
                            )
                        }
                        <div className='mb-4'>
                            {
                                state.content && (
                                    <MarkdownRender
                                        className="dark:text-zinc-400"
                                    >
                                        {state.content}
                                    </MarkdownRender>
                                )
                            }
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {
                                !loading && (url || []).map((item: any, index) => {
                                    return (
                                        <Image
                                            key={index}
                                            alt=''
                                            isZoomed
                                            isBlurred
                                            src={item?.base64}
                                            classNames={{
                                                img: clsx({
                                                    "w-[300px] h-[120px] md:w-[400px] md:h-[280px]": url?.length === 1,
                                                    "w-[300px] h-[120px] md:h-[200px] md:w-[300px]": url?.length >= 2
                                                })
                                            }}
                                            onClick={() => {
                                                setModalState({
                                                    open: true,
                                                    item
                                                })
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                        {url && url.length > 0 && url.some(item => item.exifInfo.date) && (
                            <div
                                className='mt-4 dark:text-zinc-500'>{url.find(item => item.exifInfo.date)?.exifInfo.date}</div>
                        )}
                        {
                            ((url && url.length > 0 && url.some(item => item.exifInfo.latitude && item.exifInfo.longitude)) || state?.frontMatter?.position) && (
                                <Position
                                    cacheId={id}
                                    position={state?.frontMatter?.position}
                                    latitude={url.find(item => item.exifInfo.date)?.exifInfo.latitude as number}
                                    longitude={url.find(item => item.exifInfo.date)?.exifInfo.longitude as number}
                                />
                            )
                        }
                    </div>
                </CardBody>
            </Card>
            <MomentImageModal
                open={modalState.open}
                item={modalState.item}
                position={state?.frontMatter?.position}
                cacheId={id}
                onClose={() => {
                    setModalState({
                        open: false,
                        item: null
                    })
                }}
            />
        </>
    )
}

export default MomentCard

