import { CammelCasePipe } from './cammel-case.pipe';

describe('CammelCasePipe', () => {
  it('create an instance', () => {  
    const pipe = new CammelCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should capitalize each word in a sentence', () => {
    const pipe = new CammelCasePipe();
    const data = 'I watched the storm, so beautiful yet terrific.';
    const expected = 'I Watched The Storm, So Beautiful Yet Terrific.';

    expect(pipe.transform(data)).toBe(expected);
  });

  it('should capitalize a single word', () => {
    const pipe = new CammelCasePipe();
    const data = 'wunderbar';
    const expected = 'Wunderbar';

    expect(pipe.transform(data)).toBe(expected);
  });
});
