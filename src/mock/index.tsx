import { PUBLIC_URLS } from "@/utils/urls";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
export const CARDSARRAY = [
  {
    title: "Design",
    sub_categories: [
      {
        title: "UI/UX Design",
        link: "/services/ui-ux-design",
      },
      {
        title: "Web Design",
        link: "/services/web-design",
      },
      {
        title: "Mobile App Design",
        link: "/services/mobile-app-design",
      },
      {
        title: "Landing Page Design",
        link: "/services/landing-page-design",
      },
    ],
  },
  {
    title: "Development",
    sub_categories: [
      {
        title: "Web Development",
        link: "/services/web-development",
      },
      {
        title: "Software Development",
        link: "/services/software-development",
      },
      {
        title: "CMS Development",
        link: "/services/cms-development",
      },
    ],
  },
  {
    title: "Marketing",
    sub_categories: [
      {
        title: "Branding",
        link: "/services/branding",
      },
      {
        title: "Content Marketing",
        link: "/services/content-marketing",
      },
      {
        title: "SEO",
        link: "/services/seo",
      },
    ],
  },
];
export const NavData = [
  {
    title: "New Blog",
    pathname: "/newblog",
    prefix: "/newblog",
  },
  {
    title: "Query",
    pathname: "/queries",
    prefix: "/queries",
  },
  {
    title: "New Portfolio",
    pathname: "/newportfolio",
    prefix: "/newportfolio",
  },
  {
    title: "New Collectibles",
    pathname: "/newcollectibles",
    prefix: "/newcollectibles",
  },
  {
    title: "Collectibles Actions",
    pathname: "/colaction",
    prefix: "/colaction",
  },
];
export const WITHOUT_AUTH_PUBLIC_NAV = [
  {
    title: "Services",
    isDropdown: true,
    dropdownItems: CARDSARRAY,
  },
  {
    isDropdown: false,
    title: "Process",
    pathname: PUBLIC_URLS.HOME,
    prefix: PUBLIC_URLS.HOME,
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
    title: "Services",
    pathname: PUBLIC_URLS.SERVICES,
    prefix: PUBLIC_URLS.SERVICES,
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
    pathname: "/queries",
    prefix: "/queries",
    dropdown: false,
  },
  {
    title: "Create",
    dropdown: true,
    options: [
      {
        title: "Create Blog",
        pathname: "/newblog",
      },
      {
        title: "Create Portfolio",
        pathname: "/newportfolio",
      },
      {
        title: "Create Collectibles",
        pathname: "/newcollectibles",
      },
    ],
  },
  {
    title: "Update",
    dropdown: true,
    options: [
      {
        title: "Update Blog",
        pathname: "/blog-actions",
      },
      {
        title: "Update Portfolio",
        pathname: "/portfolio-actions",
      },
      {
        title: "Update Collectibles",
        pathname: "/colaction",
      },
    ],
  },
];
export const SERVICES_ARRAY = [
  {
    title: "Product Research",
    desc: " To lay a solid foundation for the creative process that follows,we begin our journey with the discovery phase.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64f852beac4d6ff134432f2b_icon-services-research.svg",
  },
  {
    title: "Product design",
    desc: "By putting users' needs at the forefront, we tell a unique story of your company, juggling with fancy visual elements.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/640744d0e7b29de6f1a29aee_icon-services-design.svg",
  },
  {
    title: "Product development",
    desc: "The motto of our development process is creating digital experiences that are both appealing and functional.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/6449421486eae3cf4d387564_development-Illustration.svg",
  },
  {
    title: "Product  growth & care",
    desc: "With various tools, our experts can help you expand the target audience and increase brand awareness.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/6449410877257b6dcfa0ec88_marketing-illustration.svg",
  },
];
export const PARTNERS_ARRAY = [
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e3b9f3e40ff0538797_logo-oppo.svg",
    text: "Designing mobile concepts for a popular brand in electronic products.",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e32ce946863b8f8186_logo-udemy.svg",
    text: "Reimagining the video player for courses and overall viewer experience.",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e3096057f141c8ebcd_logo-jbl.svg",
    text: "Developing a full-stack application as part of the hi-end audio brand's marketing campaign.",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e39eb5682b005d667b_logo-creativemarket.svg",
    text: "Online marketplace that provides a platform for creators to buy and sell design assets.",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e3bff353f4da960f47_logo-seneca.svg",
    text: "Designing a powerful educational platform for effective learning..",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e39174b67fc9938ad1_logo-auth0.svg",
    text: "Using our expertise to boost Auth0 processes.",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e3e925e907cbc11093_logo-corel.svg",
    text: "Showcasing a future vision for WinZip family products.",
  },
  {
    img: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/64c916e32ce946863b8f8186_logo-udemy.svg",
    text: "Reimagining the video player for courses and overall viewer experience.",
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
export const SERVICE_ARRAY = [
  {
    title: "Research & Concepts",
    time: "4-6 days",
    description:
      "At the outset, we explore your goals, analyze competitors, and study how customers interact with similar products.",
    deliverables: ["Style visualization", "Design concepts"],
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/65675dbf5e3650c81fde3320_icon-one.svg",
  },
  {
    title: "Wireframes",
    time: "1.5-2 weeks",
    description:
      "Putting users first, our specialists visualize each screen of the product and turn it into a clickable prototype.",
    deliverables: ["Page structure", "Approximate layout"],
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/65675dc84eb549e10e0b1501_icon-second.svg",
  },
  {
    title: "UI & Design system",
    time: "2-3 weeks",
    description:
      "Based on the results from previous steps, we shape your individual style, making it appealing and functional for your audience.",
    deliverables: ["Final design", "Guide to using components"],
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/65675dd0c75e045c8d26fa87_icon-three.svg",
  },
];
export const OFFERS = [
  {
    title: "Website design",
    description:
      "Our creative team will make sure your site’s design captures and elevates the image of your start-up or business.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/663a282becda26698f443648_icon-benefits_design.svg",
  },
  {
    title: "Content writing",
    description:
      "We write clear, creative content that drives traffic, conversions, brand loyalty and works great for SEO.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/661f94e2c8f151e9638501bf_icon-benefits_responsive.svg",
  },
  {
    title: "SEO",
    description:
      "We’ll tailor our approach to help your site climb to the top of search results, making sure people find you first.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/661f949990f4a57dba84183f_icon-benefits_user-centric.svg",
  },
  {
    title: "Website development",
    description:
      "We turn great designs into functional websites, blending custom solutions and CMS with a design-first mindset.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/6595325927ede6e1109aea5c_icon-benefits_result.svg",
  },
  {
    title: "CRO",
    description:
      "We’ll audit and refine your site’s UX, applying proven strategies to drive leads and conversions.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/6595325927ede6e1109aea5c_icon-benefits_result.svg",
  },
  {
    title: "CMS setup",
    description:
      "We will pick and customize the perfect CMS to fit your needs, making your website management smooth and easy.",
    icon: "https://assets-global.website-files.com/63f38a8c92397a024fcb9ae8/663a28a647f16f833b7e49dd_icon-benefits_cms.svg",
  },
];
export const UIUXEXPERTISE = [
  {
    image: "/expertise-1.svg",
    title: "Product discovery",
    description: `This step includes business research, user research, and competitors research. We want to make sure we understand your business goals and your target audience.`,
  },
  {
    image: "/expertise-2.svg",
    title: "UI/UX design",
    description: `When designing a website, we strive for a blend of outstanding appearance and exceptional functionality. This can only be achieved with the best UX and UI practices in mind. Our ultimate goal is to ensure your users enjoy their stay on the site, appreciating both its visual component and usability.`,
  },
  {
    image: "/expertise-3.svg",
    title: "QA and support",
    description: `We are glad to provide our customers with the necessary support. Our team will stay in touch to help address your questions and concerns.`,
  },
];
export const WEBDESIGNEXPERTISE = [
  {
    image: "/offers-1.svg",
    title: "Establish online presence",
    description: ` When people discover a business, they start searching
                    online. A website becomes crucial, affecting whether users
                    stay or turn to a competitor. With a well-designed site, you
                    can make a good impression and get an extra point of
                    interaction.`,
  },
  {
    image: "/offers-2.svg",
    title: "Builds credibility and trust",
    description: `With a good website, you can share your mission and vision, letting the world know what you do and why you do it. A well-crafted website gives you the power to introduce your services and convince users that they’ve found the right partner.`,
  },
  {
    image: "/offers-3.svg",
    title: "Provides branding opportunities",
    description: `Strategic content, visuals, and interactive features on your website effectively convey your business story and values. It is a central hub of marketing efforts to realize your brand strategy and set you apart from the competitors. `,
  },
];
export const MOBILEAPPEXPERTISE = [
  {
    image: "/mobile-expertise-1.svg",
    title: "Clear and straightforward",
    description: `We pay a lot of attention to the user's behavior and their interaction with the app so that everything they need is evident and intuitive.`,
  },
  {
    image: "/mobile-expertise-2.svg",
    title: "Visually appealing",
    description: `We pay a lot of attention to the visual solution so that it is also attractive and in line with modern market requirements in addition to being comfortable to use.`,
  },
  {
    image: "/mobile-expertise-3.svg",
    title: "User-friendly",
    description: `Our design solutions are aesthetically pleasing, user-friendly, and practical so that users will feel attention and a gentle attitude in every pixel.`,
  },
];
export const LANDINGEXPERTISE = [
  {
    image: "/landing-1.svg",
    title: "Involving Content",
    description: `The content we create for your landing is engaging and attention-grabbing that the customer won't want to part with until they are entirely familiar with it.`,
  },
  {
    image: "/landing-2.svg",
    title: "Business Scaling up",
    description: `The digital solutions we create attract more attention, investment, and customers to your product because that's what it demands.`,
  },
  {
    image: "/landing-3.svg",
    title: "Reaching target audience",
    description: `What we create by our team is made to meet the needs of your target audience because we run an in-depth analysis at the start of the product.`,
  },
];
export const UIUXTECHSTACK = [
  {
    title: "Figma",
    image: "/stack-1.svg",
  },
  {
    title: "Sketch",
    image: "/stack-2.svg",
  },
  {
    title: "Adobe XD",
    image: "/stack-3.svg",
  },
  {
    title: "Miro",
    image: "/stack-4.svg",
  },
  {
    title: "HubSpot",
    image: "/stack-5.svg",
  },
  {
    title: "Google Analytics",
    image: "/stack-6.svg",
  },
  {
    title: "Maze",
    image: "/stack-7.svg",
  },
];
export const WEBDESIGNTECHSTACK = [
  {
    image: "/partner-1.svg",
    title: "Web Flow",
  },
  {
    image: "/partner-2.svg",
    title: "Sanity",
  },
  {
    image: "/partner-3.svg",
    title: "Shopify",
  },
  {
    image: "/partner-4.svg",
    title: "Strapi",
  },
  {
    image: "/partner-5.svg",
    title: "BigCommerce",
  },
  {
    image: "/partner-6.svg",
    title: "WordPress",
  },
  {
    image: "/partner-7.svg",
    title: "Prismic",
  },
];
export const MOBILEAPPTECHSTACK = [
  {
    title: "Figma",
    image: "/stack-1.svg",
  },
  {
    title: "InVision",
    image: "/invision.svg",
  },
  {
    title: "Usibility Tools",
    image: "/usibility-tools.svg",
  },
  {
    title: "Hotjar",
    image: "/hotjar.svg",
  },
  {
    title: "HubSpot",
    image: "/stack-5.svg",
  },
  {
    title: "Semrush",
    image: "/semrush.svg",
  },
  {
    title: "Google Analytics",
    image: "/stack-6.svg",
  },
];
export const WEBDEVEXPERTISE = [
  {
    image: "/web-dev-1.svg",
    title: "Project analysis and exploration",
    description: `We’ll go through the specifics of your product together, asking you questions and providing you with answers. After outlining your general idea and preferences, our team will analyze your future product in more detail.`,
  },
  {
    image: "/web-dev-2.svg",
    title: "Selection of technologies",
    description: `Every project is different, and we will have to choose the right tools for your product. To better accommodate your business needs, we will evaluate which framework, infrastructure, and database will work best.`,
  },
  {
    image: "/web-dev-3.svg",
    title: "Robust development",
    description: `Our developers will apply the chosen technologies and make your new product come to life. The testers will then ensure that it’s working flawlessly and is ready for launch.`,
  },
];
export const WEBDEVTECHSTACK = [
  {
    image: "/reactjs.svg",
    title: "React.js",
  },
  {
    image: "/nextjs.svg",
    title: "Next.js",
  },
  {
    image: "/nestjs.svg",
    title: "Nest.js",
  },
  {
    image: "/expressjs.svg",
    title: "Express",
  },
  {
    image: "/amazonaws.svg",
    title: "AWS",
  },
  {
    image: "/azure.svg",
    title: "Microsoft Azure",
  },
  {
    image: "/postgresql.svg",
    title: "PostgreSQL",
  },
  {
    image: "/mongodb.svg",
    title: "MongoDB",
  },
];
export const SOFTWAREDEVEXPERTISE = [
  {
    image: "/software-dev-1.svg",
    title: "Great performance",
    description: `Our specialists work with the most modern technology that can handle a large flow of customers and maintain a high level of quality of work.`,
  },
  {
    image: "/software-dev-2.svg",
    title: "Long-term solution",
    description:
      "Our digital products are created to a high-quality level. A successful product has a constant evolution and improvement process. Our workflow is organized to bring more improvement with each release stage. That’s why we have a support period after product release.",
  },
  {
    image: "/software-dev-3.svg",
    title: "Quality product",
    description:
      "Before releasing a product, we as a software development company test it constantly in operation for imperfections and check it during user interaction, guaranteeing that our product is of high quality.",
  },
];
export const SOFTWAREDEVTECHSTACK = [
  {
    image: "/nodejs.svg",
    title: "Node.js",
  },
  {
    image: "/nextjs.svg",
    title: "Next.js",
  },
  {
    image: "/nestjs.svg",
    title: "Nest.js",
  },
  {
    image: "/postgresql.svg",
    title: "PostgreSQL",
  },
  {
    image: "/reactjs.svg",
    title: "React.js",
  },
  {
    image: "/vuejs.svg",
    title: "VueJS",
  },

  {
    image: "/mongodb.svg",
    title: "MongoDB",
  },
];
export const CMSDEVEXPERTISE = [
  {
    image: "/cms-dev-1.svg",
    title: "Great performance",
    description: `You will love your website’s fast load speed. And so will search engine ranking algorithms and your customers.`,
  },
  {
    image: "/cms-dev-2.svg",
    title: "SEO Advantage",
    description:
      "A well-designed CMS enhances ranking possibilities in search engines. The technology works in favour of your brand’s digital visibility!",
  },
  {
    image: "/cms-dev-3.svg",
    title: "Safety",
    description:
      "Security is a high priority. Timely updates and maintenance will keep the website protected.",
  },
];
export const CMSDEVTECHSTACK = [
  {
    image: "/reactjs.svg",
    title: "React.js",
  },
  {
    image: "/nextjs.svg",
    title: "Next.js",
  },
  {
    image: "/gatsby.svg",
    title: "Gatsby.js",
  },

  {
    image: "/partner-2.svg",
    title: "Sanity",
  },
  {
    image: "/partner-4.svg",
    title: "Strapi",
  },

  {
    image: "/partner-6.svg",
    title: "WordPress",
  },

  {
    image: "/partner-3.svg",
    title: "Shopify",
  },
  {
    image: "/partner-5.svg",
    title: "BigCommerce",
  },
];
export const BRANDINGEXPERTISE = [
  {
    image: "/branding-1.svg",
    title: "Establishing a strong identity",
    description: `Branding services are essential for creating a distinct and memorable identity for your business. They help you define your brand’s values, mission, and personality, making it easier for customers to relate to and connect with your company.`,
  },
  {
    image: "/branding-2.svg",
    title: "Building trust and credibility",
    description:
      "Effective branding builds trust and credibility among your target audience. A well-designed brand with consistent messaging and visuals conveys professionalism and reliability, making customers more likely to choose your products or services over competitors.",
  },
  {
    image: "/branding-3.svg",
    title: "Differentiation in a competitive market",
    description:
      "In today’s competitive market, branding sets you apart from the crowd. It helps highlight your unique selling propositions and positions your business as a leader or innovator in your industry, making it easier to attract and retain customers.",
  },
];
export const MARKETINGEXPERTISE = [
  {
    image: "/content-marketing-1.svg",
    title: "Personalized strategies",
    description: `The success of digital marketing campaigns largely depends on the relevant and matching strategies put in place. Since industries and applications are unique, we develop custom content marketing strategies to hit the sweet spot when it comes to your business, target audience, and desired marketing outcomes.`,
  },
  {
    image: "/content-marketing-2.svg",
    title: "Competitor research",
    description:
      "We all know that competition drives success. That is why it is necessary to perform competitor research before kicking off your marketing campaigns. It allows for borrowing and adopting the best practices, avoiding costly mistakes, and sizing yourself up against thriving companies with a similar business model.",
  },
  {
    image: "/content-marketing-3.svg",
    title: "SEO copywriting",
    description:
      "Writing well is not easy, but it’s even harder to make your texts stand out in the sea of information. To ensure your content drives a point home and serves your business goals, you need to compose it in a very specific way. With our writers and SEO experts on the job, your texts will not only be visible to the search engines but also clear-cut and memorable.",
  },
];
export const SEOEXPERTISE = [
  {
    image: "/seo-1.svg",
    title: "SEO strategy development",
    description: `Our SEO strategy development process starts with a thorough analysis of your website, your competitors, and your niche. Based on this analysis, we create a customized and effective SEO strategy for your website promotion.`,
  },
  {
    image: "/seo-2.svg",
    title: "Site optimization",
    description:
      "We optimize every aspect of your website, from the main pages to the technical details. Our goal is to create a website that is user-friendly, fast, and meets the ever-changing search engine requirements.",
  },
  {
    image: "/seo-3.svg",
    title: "Improving backlinks profile",
    description:
      "Backlinks are a crucial part of SEO. We use only high-quality and ethical methods to improve your website's backlink profile. This not only helps with SEO but also establishes your website as a trustworthy and authoritative source in your niche.",
  },
];
