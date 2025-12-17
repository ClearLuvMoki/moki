"use client";
import {Player, PlaybackStyle, Errors} from "livephotoskit"
import { useEffect, useRef } from "react";
import { LivePhotoViewer } from 'live-photo';


export default function LivePhoto() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(ref.current) {
            new LivePhotoViewer({
                photoSrc: 'https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/IMG_1500.HEIC',
                videoSrc: 'https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/IMG_1500.mov',
                container: ref.current!,
                onPhotoLoad: console.log,
                autoplay: false,
                 imageCustomization: {
    styles: {
      objectFit: "cover",
      filter: "brightness(1.1)",
    },
    attributes: {
      alt: "我的实时照片",
      loading: "lazy",
      draggable: "false",
    },
  },
  
  // 视频自定义
  videoCustomization: {
    styles: {
      objectFit: "contain",
      filter: "contrast(1.1)",
    },
    attributes: {
      preload: "metadata",
    },
  },
            });

//             const player = Player(ref.current!);
//             player.photoSrc = 'https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/IMG_1500.HEIC';
//             player.videoSrc = 'https://moki-blog.oss-cn-chengdu.aliyuncs.com/moki-note/IMG_1500.mov';
//             player.addEventListener('canplay', evt => console.log('player ready', evt));
//             player.addEventListener('error', (ev: any) => {
//                  if (typeof ev.detail.errorCode === 'number') {
//         switch (ev.detail.errorCode) {
//         case Errors.FAILED_TO_DOWNLOAD_RESOURCE:
//             console.log(12)
//             break;
//         case Errors.VIDEO_FAILED_TO_LOAD:
//             // Do something
//             console.log(23)
//             break;
//         case Errors.PHOTO_FAILED_TO_LOAD: 
// console.log(ev.detail)
//             break;
//         }
//     } else {
//         // Extract error.
//         console.error(ev.detail.error);
//     }
//             });
//             player.addEventListener('ended', evt => console.log('player finished playing through', evt));
//             // Use the playback controls.
//             player.playbackStyle = PlaybackStyle.HINT;
//             player.playbackStyle = PlaybackStyle.FULL;
//             player.play();
//             player.pause();
//             player.toggle();
//             player.stop();
//             // Seek the animation to one quarter through.
//             player.currentTime = 0.25 * player.duration;
//             // Seek the animation to 0.1 seconds into the Live Photo.
//             player.currentTime = 0.1;
        }
        
    }, [ref.current])

    return <div ref={ref} style={{
        width: 300,
        height: 300
    }}/>
}