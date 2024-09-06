import { AUTH_URLS, PUBLIC_URLS } from "@/utils/urls";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
export const WITHOUT_AUTH_PUBLIC_NAV = [
  {
    title: "Services",
    isDropdown: true,
  },
  {
    isDropdown: false,
    title: "Process",
    pathname: PUBLIC_URLS.PROCESSES,
    prefix: PUBLIC_URLS.PROCESSES,
  },
  {
    title: "Projects",
    isDropdown: false,
    pathname: PUBLIC_URLS.PROJECTS,
    prefix: PUBLIC_URLS.PROJECTS,
  },
  {
    title: "Blog",
    isDropdown: false,
    pathname: PUBLIC_URLS.BLOG,
    prefix: PUBLIC_URLS.BLOG,
  },
  {
    title: "Collectibles",
    isDropdown: false,
    pathname: PUBLIC_URLS.COLLECTIBLES,
    prefix: PUBLIC_URLS.COLLECTIBLES,
  },
];
export const PUBLIC_NAV = [
  {
    title: "Home",
    pathname: PUBLIC_URLS.HOME,
    prefix: PUBLIC_URLS.HOME,
  },
  {
    title: "Projects",
    pathname: PUBLIC_URLS.PROJECTS,
    prefix: PUBLIC_URLS.PROJECTS,
  },
  {
    title: "Blog",
    pathname: PUBLIC_URLS.BLOG,
    prefix: PUBLIC_URLS.BLOG,
  },
  {
    title: "Collectibles",
    pathname: PUBLIC_URLS.COLLECTIBLES,
    prefix: PUBLIC_URLS.COLLECTIBLES,
  },
  {
    title: "Contact",
    pathname: PUBLIC_URLS.CONTACT,
    prefix: PUBLIC_URLS.CONTACT,
  },
];
export const AUTH_NAV = [
  {
    title: "Queries",
    pathname: AUTH_URLS.QUERIES,
    prefix: AUTH_URLS.QUERIES,
    dropdown: false,
  },
  {
    title: "Create",
    dropdown: true,
    options: [
      {
        title: "Create Blog",
        pathname: AUTH_URLS.ADD_BLOG,
      },
      {
        title: "Create Portfolio",
        pathname: AUTH_URLS.ADD_PORTFOLIO,
      },
      {
        title: "Create Collectibles",
        pathname: AUTH_URLS.ADD_COLLECTIBLES,
      },
    ],
  },
  {
    title: "Update",
    dropdown: true,
    options: [
      {
        title: "Update Blog",
        pathname: AUTH_URLS.BLOG_ACTIONS,
      },
      {
        title: "Update Portfolio",
        pathname: AUTH_URLS.PORTFOLIO_ACTIONS,
      },
      {
        title: "Update Collectibles",
        pathname: AUTH_URLS.PORTFOLIO_ACTIONS,
      },
    ],
  },
];

export const SHARE_ICONS = [
  {
    icon: <FaLinkedinIn color="#878A93" size={20} />,
    iconAlt: <FaLinkedinIn color="#fff" size={20} />,
    color: "bg-[#3827C7]",
    shareType: "LINKEDIN",
  },
  {
    icon: <FaFacebookF color="#878A93" size={20} />,
    iconAlt: <FaFacebookF color="#fff" size={20} />,
    color: "bg-[#255fef]",
    shareType: "FACEBOOK",
  },
  {
    icon: <BsTwitterX color="#878A93" size={20} />,
    iconAlt: <BsTwitterX color="#fff" size={20} />,
    color: "bg-[#000]",
    shareType: "TWITTER",
  },
  {
    icon: <IoIosLink color="#878A93" size={20} />,
    iconAlt: <IoIosLink color="#fff" size={20} />,
    color: "bg-[#000]",
    shareType: "COPY",
  },
];

export const FOOTER_LINKS = [
  {
    name: "Projects",
    hasIcon: true,
    pathname: PUBLIC_URLS.PROJECTS,
  },
  {
    name: "Our Process",
    hasIcon: true,
    pathname: PUBLIC_URLS.PROCESSES,
  },

  {
    name: "Contacts",
    hasIcon: true,
    pathname: PUBLIC_URLS.CONTACT,
  },
  {
    name: "Blog",
    hasIcon: true,
    pathname: PUBLIC_URLS.BLOG,
  },
];
