import { Organization, Ticket, User } from '../data-repository/models';
import { getSearchableFields, SearchableData } from '../search-utils';

interface Data {
  organizations: Organization[];
  tickets: Ticket[];
  users: User[];
}

interface PrintSearchableFieldsArgs {
  data: Data;
  log: Function;
}

const capitalize = (input: string) => `${input.charAt(0).toUpperCase()}${input.slice(1)}`;

export const printSearchableFields = ({ data, log }: PrintSearchableFieldsArgs) => {
  Object.entries(data).forEach(([name, collection]) => {
    if (collection.length > 0) {
      log(`--------------------\nSearch ${capitalize(name)} with`);

      getSearchableFields(collection as SearchableData).forEach((field) => {
        log(field);
      });

      log();
    }
  });
};
