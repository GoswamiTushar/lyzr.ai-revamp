export interface NavItemDropdown {
  [category: string]: string[];
}

export interface HeaderNavigation {
  Solutions: NavItemDropdown;
  Platform: NavItemDropdown;
  Customers: string;
  Pricing: string;
  Partners: NavItemDropdown;
  Resources: NavItemDropdown;
}

export interface LayerItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface EnterpriseWay {
  label: string;
  title: string;
  description: string;
  features: string[];
  cta: {
    label: string;
    url: string;
  };
}

export interface WhyReason {
  id: string;
  category: string;
  title: string;
  description: string;
  points: {
    title: string;
    text: string;
  }[];
  highlight: string;
}

export interface ProductionPath {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cta: {
    label: string;
    url: string;
  };
}

export interface CaseStudy {
  company: string;
  title: string;
  quote: string;
  metrics: {
    value: string;
    label: string;
  }[];
  tags: string[];
}

export interface TestimonialItem {
  quote: string;
  company: string;
  role: string;
}

export interface ResourceItem {
  type: string;
  title: string;
  description?: string;
  cta: string;
}
