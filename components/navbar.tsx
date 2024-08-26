import React, {useEffect, useRef, useState} from "react";
import {useSetState, useClickAway} from "react-use";
import {
    Link,
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    NavbarMenuItem
} from "@nextui-org/react";
import {useRouter} from "next/router";
import {Command} from 'cmdk'
import {link as linkStyles} from "@nextui-org/theme";
import {siteConfig} from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import {ThemeSwitch} from "@/components/theme-switch";
import {
    GithubIcon,
} from "@/components/icons";
import {Logo} from "@/components/icons";
import Search from "@/components/search";
import {FilesType} from "@/types";
import {CryptoSearchKey, RenderTransformMarkdown} from "@/utils/tools";


interface Props {
    files?: FilesType[];
}

export const Navbar = ({files}: Props) => {
    const router = useRouter()
    const [list, setList] = useState<{ title: string; path: string }[]>([]);
    const [modalState, setModalState] = useSetState({
        open: false
    })
    const searchRef = useRef(null);
    const noSearch = !["/blog"].includes(router.pathname)

    useClickAway(searchRef, () => {
        handleOpenSearchModal(false)
    });

    useEffect(() => {
        if (files && files.length > 0) {
            Promise.all((files || []).map(async item => {
                const data = await RenderTransformMarkdown(item.content || "")
                return {
                    title: data?.frontMatter?.title,
                    path: item.path
                }
            }))
                .then((res) => {
                    setList((res || []).map((blog: any) => {
                        return {
                            title: blog?.title || "",
                            path: blog.path || ""
                        }
                    }))
                })
        }
    }, [files])


    const handleOpenSearchModal = (isOpen: boolean) => {
        setModalState({
            open: isOpen
        })
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (
                (navigator?.platform?.toLowerCase().includes("mac")
                    ? e.metaKey
                    : e.ctrlKey) &&
                e.key === "k"
            ) {
                e.preventDefault();
                e.stopPropagation();

                handleOpenSearchModal(true)
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <Logo/>
                        <p className="font-bold text-inherit">Moki</p>
                    </NextLink>
                </NavbarBrand>
                <div className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <NextLink
                                className={clsx(
                                    linkStyles({color: "foreground"}),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                                )}
                                color="foreground"
                                href={item.href}
                            >
                                {item.label}
                            </NextLink>
                        </NavbarItem>
                    ))}
                </div>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link isExternal href={siteConfig.links.github}>
                        <GithubIcon className="text-default-500"/>
                    </Link>
                    <ThemeSwitch/>
                </NavbarItem>
                {
                    noSearch && (
                        <NavbarItem className="hidden lg:flex">
                            <Search onPress={() => {
                                handleOpenSearchModal(true)
                            }}/>
                        </NavbarItem>
                    )
                }
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal href={siteConfig.links.github}>
                    <GithubIcon className="text-default-500"/>
                </Link>
                <ThemeSwitch/>
                {noSearch && (<NavbarMenuToggle/>)}
            </NavbarContent>

            {
                noSearch && (
                    <NavbarMenu>
                        <Search/>
                        <div className="mx-4 mt-2 flex flex-col gap-2">
                            {siteConfig.navMenuItems.map((item, index) => (
                                <NavbarMenuItem key={`${item}-${index}`}>
                                    <Link
                                        color={"primary"}
                                        href="#"
                                        size="lg"
                                    >
                                    </Link>
                                </NavbarMenuItem>
                            ))}
                        </div>
                    </NavbarMenu>
                )
            }
            <Command.Dialog
                ref={searchRef}
                id={"moki-cmd"}
                label="Global Command Menu"
                open={modalState.open}
                onOpenChange={handleOpenSearchModal}
            >
                <Command.Input placeholder="Search blog..."/>
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    {
                        list.map((item, index) => {
                            return (
                                <Command.Item
                                    key={index}
                                    onSelect={() => {
                                        const cipherPath = CryptoSearchKey.enCode(item.path);
                                        router.push({
                                            pathname: "/blog",
                                            query: {
                                                path: cipherPath
                                            }
                                        })
                                    }}
                                >{item.title}</Command.Item>
                            )
                        })
                    }
                    <Command.Item>Apple</Command.Item>
                </Command.List>
            </Command.Dialog>
        </NextUINavbar>
    );
};
