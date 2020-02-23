import { Equipe } from './equipe';

describe('Equipe', () => {
  it('should create an instance', () => {
    expect(new Equipe(6, 'A')).toBeTruthy();
  });
});
