import { AccountType, PropertyPurpose, PropertyType } from "@prisma/client";

export type SeedConfiguration = {
  entityNames: string[];
  institutionNames: string[];
  accounts: Array<{
    accountType: AccountType;
    entityName: string;
    institutionName: string;
    accountName: string;
    accountNumber: string;
  }>;
  properties: Array<{
    address: string;
    city: string;
    state: string;
    zip: string;
    latitude: number;
    longitude: number;
    externalId: string;
    propertyType: PropertyType;
    propertyPurpose: PropertyPurpose;
    entityName: string;
    acquired?: Date;
  }>;
  budget: Array<{
    entityName: string;
    categories: { [categoryName: string]: number };
  }>;
  mappings: Array<{
    dmetaphone: string;
    dmetaphone_alt: string;
    categoryName: string;
    merchantName: string;
    type: string;
  }>;
};
