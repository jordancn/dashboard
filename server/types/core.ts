export type Id = string;

type Flavoring<FlavorT> = { _type?: FlavorT };
type Subflavoring<SubflavorT> = { _subtype?: SubflavorT };
export type Flavor<T, SubflavorT> = T extends Flavoring<infer FlavorT>
  ? T & Flavoring<FlavorT> & Subflavoring<SubflavorT>
  : T & Flavoring<SubflavorT>;

/** Used by Brand to mark a type in a readable way. */
export interface Branding<BrandT> {
  _type: BrandT;
}

/** A strict marking of an otherwise primitive type to ensure that only
 * primatives with the intended meaning are usable with the expected meaning.
 * E.g., you can't use an arbitrary string where a ISO8601DateTime string is
 * expected.
 */
export type Brand<T, BrandT> = T & Branding<BrandT>;
