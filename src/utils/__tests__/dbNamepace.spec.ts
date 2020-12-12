import { withNamespace } from '../dbNamespace';

describe('withNamespace', () => {
  const original = process.env;
  afterEach(() => {
    process.env = original;
  });

  it('adds base db namespace for development', () => {
    process.env.NEXT_PUBLIC_IS_LOCAL = 'true';
    expect(withNamespace('users')).toBe('dev/users');
  });

  it('adds base db namespace for production', () => {
    process.env.NEXT_PUBLIC_IS_LOCAL = 'false';
    expect(withNamespace('users')).toBe('prod/users');
  });
});
