export const withUrl = (uri = ''): string => {
  // Any hosting site this will live on is going to provide built-in https,
  // so http should only be used on the dev side
  return `${
    process.env.IS_LOCAL && process.env.IS_LOCAL !== 'false' ? 'http' : 'https'
  }://${process.env.BASEURL}${uri}`;
};
