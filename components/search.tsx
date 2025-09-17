import React from 'react';
import {Button, Kbd} from "@heroui/react";
import {SearchIcon} from "@/components/icons";

interface Props {
    onPress?: VoidFunction
}

const Search = ({onPress}: Props) => {

    return (
        <React.Fragment>
            <Button
                aria-label="Search"
                className={"w-3xl"}
                startContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0"/>
                }
                endContent={
                    <Kbd className="hidden lg:inline-block" keys={["command"]}>
                        K
                    </Kbd>
                }
                onPress={onPress}
            >
                <span className="text-small text-zinc-500">Search...</span>
            </Button>
        </React.Fragment>
    );
};

export default Search;
