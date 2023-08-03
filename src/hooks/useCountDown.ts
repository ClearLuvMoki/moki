import {useState, useEffect} from 'react';

export interface Options {
    time: number;
    onEnd?: () => void;
}

const useCountdown = (options: Options) => {
    const {time, onEnd} = options;
    const [count, setCount] = useState(time);

    useEffect(() => {
        if (count <= 0) {
            onEnd && onEnd();
            return;
        }
        const timer = setTimeout(() => {
            setCount(count - 1);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [count, onEnd]);

    return {count};
}

export default useCountdown;


