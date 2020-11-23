import { Command, flags } from '@oclif/command';
import { prompt } from 'inquirer';
import { welcome } from './constants';
import { getData } from './data-repository';
import { quit } from './quit';
import { searchPrompt, printSearchableFields } from './command-line-helpers';

class DataSearch extends Command {
  static description = 'Zendesk Search';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
  };

  async run() {
    this.parse(DataSearch);
    this.log(welcome);

    await prompt([{ name: 'continue' }]).then((answer) => {
      if (this.isQuitCommand(answer.continue)) quit();
    });

    const data = getData();
    const runApp = true;

    while (runApp) {
      const choice = await prompt([
        {
          name: 'action',
          message: 'Select search options',
          type: 'list',
          choices: [
            { name: 'Search Zendesk', value: 'search' },
            { name: 'View a list of searchable fields', value: 'list' },
            { name: 'Quit', value: 'quit' },
          ],
        },
      ]);

      switch (choice.action) {
        case 'search':
          await searchPrompt({ prompt, data, log: this.log });
          break;
        case 'list':
          printSearchableFields({ data, log: this.log });
          break;
        default:
          quit();
      }
    }
  }

  private isQuitCommand = (input: string) => ['quit', 'exit', 'bye'].includes(input.toLowerCase());
}

export = DataSearch;
