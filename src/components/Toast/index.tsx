import React from 'react';
import {ToastPosition, toast} from "react-hot-toast";


interface ToastProps {
    content: string;
    duration?: number;
    type?: 'success' | 'fail';
    position?: ToastPosition;
    className?: string;
    style?: React.CSSProperties;
}

const Toast = ({}: ToastProps) => {

};


export default Toast;
