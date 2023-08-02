import React from 'react';
import deepEqual from "deep-equal";


interface Props {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    allowSelect?: boolean;
    children?: React.ReactNode;
}

const Text = React.memo(({level = 1, allowSelect = false, children}: Props) => {
    let Component: keyof JSX.IntrinsicElements = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <Component
            style={{
                userSelect: allowSelect ? "auto" : "none"
            }}
        >{children}</Component>
    );
}, (prevProps, nextProps) => {
    return deepEqual(prevProps, nextProps);
});

export default Text;
