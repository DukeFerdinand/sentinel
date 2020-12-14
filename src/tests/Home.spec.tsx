import { render, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { Home, USER_QUERY } from '../pages/index';
import { ContextProviders } from '../components/ContextProviders';

// The mocked shape here must match the component's actual request EXACTLY
// It's best to use the REAL query, and just pass in fake variables and resolve fake data
const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: USER_QUERY,
    },
    result: {
      data: {
        user: {
          id: 'uuid',
          username: 'Duke_Ferdinand',
        },
      },
    },
  },
];

describe('Home/Index Page', () => {
  it('renders loading state', async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    const text = await component.findByText('Loading', { exact: false });

    expect(text).toHaveTextContent('Loading');
  });

  // TODO: Fix the warning here to avoid context updating components that don't need to update in this test
  it('renders proper data when available', async () => {
    const component = render(
      <ContextProviders>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Home />
        </MockedProvider>
      </ContextProviders>
    );

    /**
     * MockedProvider resolves gql queries asynchronously, so awaiting a general
     * promise will wait for data to populate
     *
     * the `act` wrapper here is part of handling React re-renders in the testing library
     */
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    });

    const text = await component.findByText('Hello, fake user', {
      exact: false,
    });

    expect(text).toHaveTextContent('Hello, fake user Duke_Ferdinand!');
  });

  // TODO: add test for error state
});
