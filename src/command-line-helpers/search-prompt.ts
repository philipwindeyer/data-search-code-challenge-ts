import { DataCollection } from '../data-repository';
import { getSearchableFields, search } from '../search-utils';
import { PrintSearchableFieldsArgs, Data } from './types';
import { capitalize } from './utils';

interface SearchPromptArgs extends PrintSearchableFieldsArgs {
  prompt: Function;
}

interface SelectCollectionArgs {
  prompt: Function;
  data: Data;
}

interface SelectTermArgs {
  prompt: Function;
  collection: DataCollection;
}

const selectCollection = async ({ prompt, data }: SelectCollectionArgs) => {
  const { collectionName } = await prompt([
    {
      name: 'collectionName',
      message: 'Select data collection',
      type: 'list',
      choices: Object.keys(data).map((key) => ({
        name: capitalize(key),
        value: key,
      })),
    },
  ]);

  return collectionName;
};

const selectTerm = async ({ prompt, collection }: SelectTermArgs) => {
  const { term } = await prompt([
    {
      name: 'term',
      message: 'Select search term',
      type: 'list',
      choices: getSearchableFields(collection),
      loop: false,
    },
  ]);

  return term;
};

const getSearchValue = async (prompt: Function) => {
  const { value } = await prompt([
    {
      name: 'value',
      message: 'Enter search value',
    },
  ]);

  return value;
};

const printResults = (results: DataCollection, log: Function) => {
  if (results.length > 0) {
    results.forEach((result) => {
      log(`${result.formatForDisplay()}\n`);
    });
  } else {
    log('No results found\n');
  }
};

export const searchPrompt = async ({ prompt, data, log }: SearchPromptArgs) => {
  const collectionName = await selectCollection({ prompt, data });
  const term = await selectTerm({ prompt, collection: data[collectionName] });
  const value = await getSearchValue(prompt);

  const result = search(term, value, data[collectionName]);
  printResults(result, log);
};
