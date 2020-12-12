export const withNamespace = (collection: string): string => {
  return `${
    process.env.NEXT_PUBLIC_IS_LOCAL &&
    process.env.NEXT_PUBLIC_IS_LOCAL !== 'false'
      ? 'dev'
      : 'prod'
  }/${collection}`;
};
