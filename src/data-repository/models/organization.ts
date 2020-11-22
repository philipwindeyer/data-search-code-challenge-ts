interface OrganizationProps {
  _id: number;
  url: string;
  external_id: string;
  name: string;
  domain_names: string[];
  created_at: string;
  details: string;
  shared_tickets: boolean;
  tags: string[];
}

export const getOrganization = (props: OrganizationProps) => ({
  ...props,
  getUsers: () => {},
  getTickets: () => {},
  getSearchableFields: () => {},
});
