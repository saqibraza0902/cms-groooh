export interface IHomeHeroSection {
  animatedtext: [string];
  animatedimages: [string];
  statictext: [string];
  bottomstatictext: [string];
  carouselslides: {
    text: string;
    image: string;
  }[];
}

export interface IUser {
  avatar: string;
  description: string;
  email: string;
  id: string;
  isAdmin: boolean;
  isAuther: boolean;
  name: string;
}
export interface IBlog {
  id: string;
  slug: string;
  title: string;
  desc: string;
  content: string;
  tags: string[];
  featuredImage: {
    url: string;
    alt: string;
  };
  isArchived: boolean;
  autherId: string;
  isFeatured?: boolean;
  createdAt: {
    seconds: number;
    nenoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nenoseconds: number;
  };
}

export type IPortfolio = {
  id: string;
  slug: string;
  title: string;
  desc: string;
  content: string;
  tags: string[];
  gallery: any[];
  client: {
    name: string;
    country: string;
    isIndividual: boolean;
  };
  isArchived: boolean;
  timeline: {
    start: string;
    end: string;
  };
  autherId: string;
  createdAt: {
    seconds: number;
    nenoseconds: number;
  };
  updatedAt: {
    seconds: number;
    nenoseconds: number;
  };
};

export interface ICollectible {
  id: string;
  title: string;
  type: string;
  subtype: string;
  price: number;
  image: string;
  downloadUrl: string;
  content: string;
}

export interface IServices {
  title: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
}
export interface IRating {
  title: string;
  ratings: {
    clientName: string;
    clientDescription: string;
    clientImage: string;
    review: string;
    rating: number;
  }[];
}
export interface IWork {
  title: string;
}
export interface IPartners {
  title: string;
  partners: {
    image: string;
    text: string;
  }[];
}
export interface IBlogSection {
  title: string;
  description: string;
}
export interface IHome {
  HeroSection: IHomeHeroSection;
  ScrollText: string;
  ServicesPage: IServices;
  RatingSection: IRating;
  WorksSection: IWork;
  PartnersSection: IPartners;
  BlogSection: IBlogSection;
}

export interface IContact {
  title: string;
  icon: string;
  contact: {
    title: string;
    icon: string;
    description: string;
  }[];
}

export interface IDesignProcess {
  title: string;
  processes: {
    title: string;
    time: string;
    icon: string;
    description: string;
    deliverables: string[];
  }[];
  nextphase: {
    title: string;
    icon: string;
    plans: {
      title: string;
      description: string;
    }[];
  };
}
export interface IOffersSection {
  title: string;
  offers: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface IWebServices {
  HeroSection: IHomeHeroSection;
  DesignProcessSection: IDesignProcess;
  OffersSection: IOffersSection;
}
export interface IServiceHeroSection {
  text: string;
  image: string;
}
export interface IExpertise {
  title: string;
  expertise: {
    title: string;
    description: string;
    image: string;
  }[];
}
export interface ITechStack {
  image: string;
  title: string;
}
export interface IPageServices {
  hero_section: IServiceHeroSection;
  expertise_section: IExpertise;
  tech_stack: ITechStack[];
}
export interface IPageService {
  title: string;
  url: string;
  hero_section: IServiceHeroSection;
  expertise_section: IExpertise;
  tech_stack: ITechStack[];
}
export interface IServicesPage {
  WebServices: IWebServices;
  UIUXDESIGN: IPageServices;
  WEBDESIGN: IPageServices;
  MOBILEAPPDESIGN: IPageServices;
  LANDINGPAGEDESIGN: IPageServices;
  WEBDEV: IPageServices;
  SOFTWAREPRODUCTDEV: IPageServices;
  CMSDEV: IPageServices;
  BRANDING: IPageService;
  CONTENTMARKETING: IPageService;
  SEO: IPageService;
  SERVICE_1: { title: string; services: IPageService[] };
  SERVICE_2: { title: string; services: IPageService[] };
  SERVICE_3: {
    title: string;
    services: IPageService[];
  };
}
export interface IProcess {
  title: string;
  processes: {
    title: string;
    image: string;
    description: string;
  }[];
}
export interface ICTOSection {
  cto_name: string;
  cto_image: string;
  cto_position: string;
  client_text: string;
  text: string;
}
export interface IProcesses {
  hero_section: IServiceHeroSection;
  processes_section: IProcess;
  cto_section: ICTOSection;
}
