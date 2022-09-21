import { DeslugifyPipe } from './deslugify.pipe';

describe('DeslugifyPipe', () => {
  it('create an instance', () => {
    const pipe = new DeslugifyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should replace all underscores with whitespace', () => {
    const pipe = new DeslugifyPipe();
    const data = 'It_was_going_to_be_a_lonely_trip_back.';
    const expected = 'It was going to be a lonely trip back.';

    expect(pipe.transform(data)).toBe(expected);
  });
});
