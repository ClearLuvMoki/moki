import React from 'react';
import {ToastPosition, toast} from "react-hot-toast";


interface ToastProps {
    content: string;
    duration?: number;
    type?: 'success' | 'error';
    position?: ToastPosition;
    className?: string;
    style?: React.CSSProperties;
}

const Toast = ({content, duration, style, type, className, position}: ToastProps) => {
    if (type === "success") {
        toast.success(content, {style, className, position, duration});
    } else if (type === "error") {
        toast.error(content, {style, className, position, duration});
    } else {
        toast.success(content, {style, className, position, duration});
    }
};


export default Toast;
