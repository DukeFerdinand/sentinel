import { Resolver } from '@apollo/client';

export type ResolverObj<T extends string> = Record<T, Record<string, Resolver>>;
