import { Match } from './match';

describe('Match', () => {
  it('should create an instance', () => {
    expect(new Match(6)).toBeTruthy();
  });

  it('Match 1 A contre U', () => {
    expect(new Match(6).rencontres[0].joueurEquipeReceveuse.position).toBe('A');
    expect(new Match(6).rencontres[0].joueurEquipeVisiteuse.position).toBe('U');
  });
});
