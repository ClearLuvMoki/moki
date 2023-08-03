import React from 'react';
import deepEqual from "deep-equal";


interface Props {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    allowSelect?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Text = React.memo(({level = 1, allowSelect = false, className = "", style = {}, children}: Props) => {
    let Component: keyof JSX.IntrinsicElements = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <Component
            className={className}
            style={{
                userSelect: allowSelect ? "auto" : "none",
                ...style
            }}
        >{children}</Component>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default Text;
