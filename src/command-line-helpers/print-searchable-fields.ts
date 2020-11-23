import { DataCollection } from '../data-repository';
import { getSearchableFields } from '../search-utils';
import { PrintSearchableFieldsArgs } from './types';
import { capitalize } from './utils';

export const printSearchableFields = ({ data, log }: PrintSearchableFieldsArgs) => {
  Object.entries(data).forEach(([name, collection]) => {
    if (collection.length > 0) {
      log(`--------------------\nSearch ${capitalize(name)} with`);

      getSearchableFields(collection as DataCollection).forEach((field) => {
        log(field);
      });

      log();
    }
  });
};
