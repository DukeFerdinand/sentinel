import { withUrl } from '../withUrl';

describe('withUrl', () => {
  const original = process.env;
  afterEach(() => {
    process.env = original;
  });

  it('adds base url and http for local builds', () => {
    process.env.NEXT_PUBLIC_IS_LOCAL = 'true';
    process.env.NEXT_PUBLIC_BASEURL = 'localhost:3000';
    expect(withUrl('/api/graphql')).toBe('http://localhost:3000/api/graphql');
  });

  it('adds base url and https for prod builds', () => {
    process.env.NEXT_PUBLIC_BASEURL = 'localhost:3000';
    expect(withUrl('/api/graphql')).toBe('http://localhost:3000/api/graphql');
  });
});
