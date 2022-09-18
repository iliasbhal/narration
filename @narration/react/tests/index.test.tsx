import './lib/setup';

import React from 'react';
import { render } from '@testing-library/react'
import { useNarration, Event } from '../src';

const ToggleButton = () => {
  const { it, given, end } = useNarration('toggle');

  const Toggle = new Event('TOGGLE');

  const [OFF] = it.starts.as('OFF');
  const [ON] = it.can.be('ON');
  
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

  it('should change its state', () => {
    const constainer = render(<ToggleButton />)
    const component = constainer.getByTestId('test');
    component.click();
    expect(component).toHaveTextContent("ON");
  });
});