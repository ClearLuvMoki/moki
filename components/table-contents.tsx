import React from 'react';
import {ListTree} from "lucide-react";

interface Props {
    navList: {
        content: string;
        level: number;
    }[]
}

const TableContents = ({navList}: Props) => {

    const handleClickAnchor = (anchor: string) => {
        const offset = 490;
        const targetElement = document.getElementById(anchor);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop + offset,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div
            className="rounded-xl p-4 sticky top-[80px]"
        >
            <div className="flex items-center">
                <ListTree size={18}/>
                <span className="select-none ml-2 font-extrabold">目录</span>
            </div>
            <div className="mt-2">
                {
                    (navList || []).map((item, index) => (
                        <div
                            key={index}
                            className="block group truncate transition-all duration-300  ease-in-out cursor-pointer select-none"
                            onClick={(event) => {
                                event.preventDefault();
                                handleClickAnchor(item.content)
                            }}
                        >
                              <span
                                  className="bg-left-bottom bg-gradient-to-r py-1 leading-7	 from-black to-black dark:from-white dark:to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"
                                  title={item.content}
                              >
                                {item.content}
                              </span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TableContents;
