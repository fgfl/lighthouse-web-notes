import { announceResult, generateMessage, computerSelection } from './helpers';

describe('announceResult function', () => {  
  test('returns "Won" if player is "Axe" and comp is "Tree"', () => {
    const playerSelection = 'Axe';
    const compSelection = 'Tree';
    expect(announceResult(playerSelection, compSelection)).toBe('Won');
  });

  test('returns "Tied" if player is "Axe" and comp is "Axe"', () => {
    const playerSelection = 'Axe';
    const compSelection = 'Axe';
    expect(announceResult(playerSelection, compSelection)).toBe('Tied');
  });

  test('returns "Lost" if player is "Axe" and comp is "Moai"', () => {
    const playerSelection = 'Axe';
    const compSelection = 'Moai';
    expect(announceResult(playerSelection, compSelection)).toBe('Lost');
  });

  test('returns "Waiting" if nothing is passed in', () => {
    expect(announceResult()).toBe('Waiting');
  });
});

describe('generateMessage function', () => {
  // Won, Tied, Lost, Waiting
  test('Given "Won" returns "Very Nice!"', () => {
    const status = "Won";
    const result = generateMessage(status);
    expect(result).toBe('Very Nice!');
  });

  test('Given "Tied" returns "Try again"', () => {
    const status = 'Tied';
    const result = generateMessage(status);
    expect(result).toBe('Try again');
  });

  test('Given "Lost" returns "Go home!!"', () => {
    const status = 'Lost';
    const result = generateMessage(status);
    expect(result).toBe('Go home!!');
  });

  test('Given "Waiting" returns "Waiting for your call"', () => {
    const status = 'Waiting';
    const result = generateMessage(status);
    expect(result).toBe('Waiting for your call');
  });
});

describe('computerSelection function', () => {
  test('Given player choice and cheating is true, returns winning choice', () => {
    let playerSelection = 'Axe';
    const cheating = true;
    let result = computerSelection(cheating, playerSelection);
    expect(result).toBe('Moai');

    playerSelection = 'Moai';
    result = computerSelection(cheating, playerSelection);
    expect(result).toBe('Tree');

    playerSelection = 'Tree';
    result = computerSelection(cheating, playerSelection);
    expect(result).toBe('Axe');
  });

  test('Given player choice and cheating is false, returns a valid choice', () => {
    const playerSelection = 'Axe';
    const cheating = false;
    const result = computerSelection(cheating, playerSelection);
    const options = ['Axe', 'Tree', 'Moai'];
    expect(options.includes(result)).toBeTruthy();
  });
});
