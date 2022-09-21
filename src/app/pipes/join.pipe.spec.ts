import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  const data = ['first entry', 'second entry', 'third entry'];

  let pipe: JoinPipe;

  beforeEach(() => {
    pipe = new JoinPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('join an array into a string seperated by delimiter', () => {
    const result = pipe.transform(data, ', ');
    const expected = 'first entry, second entry, third entry';

    expect(result).toBe(expected);
  });

  it('should allow strings to pass through unchanged', () => {
    const result = pipe.transform('Hello,World!', ', ');
    const expected = 'Hello,World!';
    const unexpected = 'Hello, World!';

    expect(result).toBe(expected);
    expect(result).not.toBe(unexpected);
  });
});
