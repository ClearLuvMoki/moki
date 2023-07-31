import React from 'react';
import {forwardRef} from 'react';

export type IconProps = {
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    svg: React.ReactNode;
    className?: string
};


export const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({style = {}, svg, onClick, className = ''}, ref) => {
        return (
            <span
                ref={ref}
                className={className}
                style={{display: 'inline-flex', alignItems: 'center', justifyItems: 'center', ...style}}
                onClick={(event) => {
                    onClick && onClick(event);
                }}
            >
        {svg}
      </span>
        );
    }
);

export const buildIcon = (svg: IconProps['svg']) =>
    forwardRef<HTMLSpanElement, Omit<IconProps, 'svg'>>((props, ref) => (
        <Icon ref={ref} svg={svg} {...props}></Icon>
    ));


