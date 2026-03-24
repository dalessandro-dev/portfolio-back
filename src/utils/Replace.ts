export type Replace<OrinalTypes, ReplaceTypes> = Omit<
  OrinalTypes,
  keyof ReplaceTypes
> &
  ReplaceTypes;
