export const announceResult = (playerSelection, compSelection) => {
  const lookup = {
    'Axe': 'Tree',
    'Tree': 'Moai',
    'Moai': 'Axe'
  };
  if (!(playerSelection && compSelection)) {
    return 'Waiting';
  }
  if (lookup[playerSelection] === compSelection) {
    return 'Won';
  }
  if (lookup[compSelection] === playerSelection) {
    return 'Lost';
  }
  return 'Tied';
}

export const generateMessage = (status) => {
  switch (status) {
    case 'Won':
      return 'Very Nice!';
    case 'Tied':
      return 'Try again';
    case 'Lost':
      return 'Go home!!';
  }
  return 'Waiting for your call';
};

export const computerSelection = (cheating, playerChoice) => {
  const lookup = {
    'Tree': 'Axe',
    'Axe': 'Moai',
    'Moai': 'Tree'
  };
  if (cheating) {
    return lookup[playerChoice];
  }
  const options = ['Axe', 'Tree', 'Moai'];
  return options[Math.floor(Math.random() * options.length)];
};
