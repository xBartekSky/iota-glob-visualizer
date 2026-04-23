import { extractDomain } from '../src/services/ValidatorService';

describe('NetworkService - extractDomain', () => {
  it('should extract domain from dns format', () => {
    const input = '/dns/node.iota.cafe/tcp/15600';
    expect(extractDomain(input)).toBe('node.iota.cafe');
  });

  it('should extract IP from ip4 format', () => {
    const input = '/ip4/192.168.1.1/tcp/15600';
    expect(extractDomain(input)).toBe('192.168.1.1');
  });

  it('should return null when format is unknown', () => {
    const input = '/unknown/format/123';
    expect(extractDomain(input)).toBeNull();
  });

  it('should return null for empty input', () => {
    expect(extractDomain(null)).toBeNull();
  });
});