const { incCount } = require('../index');

describe('incCount', () => {
  it('should add to count', async (done) => {
    const val = await incCount({
      value: {
        fields: {
          name: {
            stringValue: 'sentinel-api',
          },
          id: {
            stringValue: 'uuid',
          },
          // Should not be a real uuid. ALWAYS use 'test-account' for testing
          createdBy: { stringValue: 'test-account' },
          language: { stringValue: 'Node.js' },
        },
      },
    });

    expect(typeof val).toEqual('object');
    done();
  });
});
