import { Command, flags } from "@oclif/command";

class DataSearch extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
  };

  async run() {
    this.parse(DataSearch);
    this.log(`hello from ./src/index.ts`);
  }
}

export = DataSearch;
