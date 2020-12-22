const { incCount } = require('../index');

describe('incCount', () => {
  it('should add to count', async (done) => {
    const val = await incCount({
      value: {
        fields: {
          name: 'sentinel-api',
          id: 'uuid',
          // Should not be a real uuid. ALWAYS use 'test-account' for testing
          createdBy: 'test-account',
          language: 'Node.js',
        },
      },
    });

    expect(typeof val).toEqual('object');
    done();
  });
});
