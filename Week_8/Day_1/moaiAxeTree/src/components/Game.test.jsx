import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from './Game';

describe('Tests for Game Component', () => {
  test('The cheating state to be toggled when computer icon is clicked', () => {
    const { getByTestId } = render(<Game/>);
    const robotIcon = getByTestId('robot-icon');
    
    fireEvent.click(robotIcon);
    expect(robotIcon).not.toHaveClass('cheating');

    fireEvent.click(robotIcon);
    expect(robotIcon).toHaveClass('cheating');
  });
});
