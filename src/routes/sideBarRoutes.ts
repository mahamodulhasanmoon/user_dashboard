
import { HiInformationCircle } from "react-icons/hi2";
import { CgWebsite } from "react-icons/cg";
import { GoBell, GoPerson } from "react-icons/go";
import { CiLink } from "react-icons/ci";
export const sideBarRoutes:Array<any> = [

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

export const sideBarSubAdminRoutes:Array<any> = [

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

export const sideBarAdminRoutes:Array<any> = [

    {
        title:"Information",
        icon: HiInformationCircle,
        link:'/information'
    },
    {
        title:"Paid link pending",
        icon: GoBell,
        link:'/notices'
    },
    {
        title:"All user",
        icon: GoPerson,
        link:'/users'
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



