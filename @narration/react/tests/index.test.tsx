import './lib/setup';

import React from 'react';
import { render, act } from '@testing-library/react'
import { useNarration } from '../src';

const ToggleButton = () => {
  const { it, given, end } = useNarration('toggle');

  const OFF = it.starts.as('OFF');
  const ON = it.can.be('ON');  

  const Toggle = it.can.happen('TOGGLE');
  
  given(OFF).when(Toggle).then.it.becomes(ON);
  given(ON).when(Toggle).then.it.becomes(OFF);

  end();

  return (
    <div data-testid="test" onClick={() => Toggle.happen()}>
      {OFF.is() && "OFF"}
      {ON.is() && "ON"}
    </div>
  )
}

describe('Narration / React', () => {
  it('should display initial state', () => {
    const constainer = render(<ToggleButton />)
    const component = constainer.getByTestId('test');
    expect(component).toHaveTextContent("OFF");
  });

  it('should change its state', async () => {
    const constainer = render(<ToggleButton />)
    const component = constainer.getByTestId('test');

    act(() => component.click());

    
    expect(constainer.getByTestId('test')).toHaveTextContent("ON");
  
    act(() => component.click());

    expect(constainer.getByTestId('test')).toHaveTextContent("OFF");
  });
});