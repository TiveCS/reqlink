import { Context, useContext } from 'react';

export function useSafeContext<T>(context: Context<T | undefined>): T {
  const value = useContext(context);
  if (value === undefined) {
    const name = context.displayName ?? 'Unnamed';
    throw new Error(
      `${name} context consumer was used outside of a context provider.
  To fix this, make sure the provider is always higher up the component tree than the consumer.`
    );
  }
  return value;
}
