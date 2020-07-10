import { Command } from 'commander';

const chalk = require('chalk');
const log = console.log;

export function make() {
  const heat = new Command('run');
  heat.command('file <path>', { isDefault: true })
    .action(path=>log(chalk.yellow('Running', path)));
  // heat
  //   .command('jug')
  //   .action(() => {
  //     console.log('heat jug');
  //   });
  // heat
  //   .command('pot')
  //   .action(() => {
  //     console.log('heat pot');
  //   });
  return heat;
}