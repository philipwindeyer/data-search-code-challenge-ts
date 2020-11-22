export const quit = () => {
  console.log('Bye! 👋\n\n');
  process.exit();
};

export const captureSigInt = () => {
  process.on('beforeExit', quit);
};
