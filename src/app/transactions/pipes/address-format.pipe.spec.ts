import { AddressFormatPipe } from './address-format.pipe';

describe('AddressFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new AddressFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should handle null data', () => {
    const pipe = new AddressFormatPipe();
     let result = pipe.transform(null);
     expect(result).toBe('');
  });

  it('should handle data less than 5 char', () => {
    const pipe = new AddressFormatPipe();
     let result = pipe.transform('abcd');
     expect(result).toBe('abcd');
  });

  it('should format data', () => {
    const pipe = new AddressFormatPipe();
     let result = pipe.transform('abcdefghi');
     expect(result).toBe('ab...efghi');
  });
});
