export const withUrl = (uri = ''): string => {
  console.info('BASEURL', process.env.NEXT_PUBLIC_BASEURL);
  // Any hosting site this will live on is going to provide built-in https,
  // so http should only be used on the dev side
  return `${
    process.env.NEXT_PUBLIC_IS_LOCAL &&
    process.env.NEXT_PUBLIC_IS_LOCAL !== 'false'
      ? 'http'
      : 'https'
  }://${process.env.NEXT_PUBLIC_BASEURL}${uri}`;
};
