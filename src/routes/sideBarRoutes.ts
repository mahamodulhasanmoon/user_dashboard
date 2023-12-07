import { SiConvertio } from "react-icons/si";
import { HiInformationCircle } from "react-icons/hi2";
import { CgWebsite } from "react-icons/cg";
import { GoBell } from "react-icons/go";
import { CiLink } from "react-icons/ci";
export const sideBarRoutes:Array<any> = [
    {
        title:"conversion",
        icon: SiConvertio,
        link:'/conversion'
    },
    {
        title:"Information",
        icon: HiInformationCircle,
        link:'/information'
    },
    {
        title:"Shortener",
        icon: CiLink,
        link:'/shorter'
    },
    {
        title:"Websites",
        icon: CgWebsite,
        link:'/web_links'
    },
    {
        title:"Notice",
        icon: GoBell,
        link:'/notices'
    }
];