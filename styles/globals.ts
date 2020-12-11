import { css } from '@emotion/react';

// TODO: Implement this color theme: https://digitalsynopsis.com/wp-content/uploads/2018/06/flat-color-palettes-4.png

export const GlobalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  body {
    background: #eee;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  .title-text {
    font-family: 'Roboto', sans-serif;
  }
`;
