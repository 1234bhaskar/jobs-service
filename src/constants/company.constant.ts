export const INDUSTRY_ENUM = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
    "Manufacturing",
    "Construction",
    "Agriculture",
    "Energy",
    "Transportation",
    "Hospitality",
    "Entertainment",
    "Other"
] as const;

export const COMPANY_SIZE_ENUM = [
    "1_10",
    "11_50",
    "51_200",
    "201_500",
    "501_1000",
    "1000_plus"
] as const;


export type Industry = typeof INDUSTRY_ENUM[number];
export type CompanySize = typeof COMPANY_SIZE_ENUM[number];