import { Openai } from './openaimodel';

describe('Openai', () => {
  it('should create an instance', () => {
    expect(new Openai()).toBeTruthy();
  });
});
