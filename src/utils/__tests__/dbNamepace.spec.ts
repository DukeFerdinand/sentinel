import { withNamespace } from '../dbNamespace';

describe('withNamespace', () => {
  const original = process.env;
  afterEach(() => {
    process.env = original;
  });

  it('adds base db namespace for development', () => {
    process.env.NEXT_PUBLIC_IS_LOCAL = 'true';
    expect(withNamespace('users')).toBe('dev/users/users');
    expect(withNamespace('users', 'subuser')).toBe('dev/users/subuser');
  });

  it('adds base db namespace for production', () => {
    process.env.NEXT_PUBLIC_IS_LOCAL = 'false';
    expect(withNamespace('users', 'subuser')).toBe('prod/users/subuser');
  });
});
