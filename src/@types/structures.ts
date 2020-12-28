import { Resolver } from '@apollo/client';

export type ResolverObj<T extends string> = Record<T, Record<string, Resolver>>;

export type DefaultObject = Record<string, unknown>;

export enum TokenStatus {
  Missing,
  Invalid,
  Expired,
}

export interface GenericCollectionCount {
  total: number;
  collection: string;
}

export interface KeyPayload extends Record<string, string> {
  userId: string;
  projectId: string;
  environment: string;
  keyId: string;
}
