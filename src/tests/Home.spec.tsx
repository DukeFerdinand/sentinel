import { render, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import { Home, HELLO_QUERY } from '../pages/index';

// The mocked shape here must match the component's actual request EXACTLY
// It's best to use the REAL query, and just pass in fake variables and resolve fake data
const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: HELLO_QUERY,
    },
    result: {
      data: {
        sayHello: 'Hello, Level Up!',
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

  it('renders proper data when available', async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
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

    const text = await component.findByText('Hello, Level Up!', {
      exact: false,
    });

    expect(text).toHaveTextContent('Hello, Level Up!');
  });

  // TODO: add test for error state
});
