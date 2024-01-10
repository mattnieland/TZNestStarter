import type Request from 'express';
/**
 * Wrapper function for showing request URL and method in the description
 */
export const des = (
  config: Request,
  action: (config: Request) => Promise<void> | void
) => {
  describe(`${config.url}  (${config.method || 'GET'})`, () => {
    action(config);
  });
};
