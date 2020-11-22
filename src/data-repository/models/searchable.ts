interface GetSearchableFields {
  (): string[];
}

export interface Searchable {
  getSearchableFields: GetSearchableFields;
}
