import { TransactionFormatPipe } from './transaction-format.pipe';

describe('TransactionFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('should format date', () => {
    const pipe = new TransactionFormatPipe();
    var result = pipe.transform(1576400509000);
    expect(result).toBe('Dec 15 2019, 02:31');
  });

  it('should return Invalid date on bad date', () => {
    const pipe = new TransactionFormatPipe();
    var result = pipe.transform(null);
    expect(result).toBe('Invalid date');
  });
});
