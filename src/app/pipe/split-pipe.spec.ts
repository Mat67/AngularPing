import { SplitPipe } from './split-pipe';

describe('SplitPipe', () => {
  let pipe: SplitPipe;

  beforeEach(() => {
    pipe = new SplitPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string when input is null, undefined, or empty', () => {
    expect(pipe.transform('', ',', 0)).toBe('');
    expect(pipe.transform(null as any, ',', 0)).toBe('');
    expect(pipe.transform(undefined as any, ',', 0)).toBe('');
  });

  it('should split string by delimiter and return element at specified index', () => {
    expect(pipe.transform('A-B-C', '-', 0)).toBe('A');
    expect(pipe.transform('A-B-C', '-', 1)).toBe('B');
    expect(pipe.transform('A-B-C', '-', 2)).toBe('C');
  });

  it('should return empty string if index is out of bounds', () => {
    expect(pipe.transform('A-B', '-', 5)).toBe('');
  });
});
