import { IdentityEntity } from './identity-entity';
import { PriceCard } from './price-card.model';

export interface Product  extends IdentityEntity{
  uid?: string;
  companyId: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCards?: PriceCard[];
  relatedProducts?: string[];
  isOption?: boolean;
  isDomiciliation?: boolean;
  addressId?: string;
  deleted?: boolean;
  created_time?: number;
}
