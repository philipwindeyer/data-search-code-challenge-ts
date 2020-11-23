export const quit = () => {
  console.log('Bye! 👋\n\n'); // eslint-disable-line no-console
  process.exit(); // eslint-disable-line unicorn/no-process-exit
};

export const captureSigInt = () => {
  process.on('beforeExit', quit);
};
