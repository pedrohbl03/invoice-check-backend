import { applyDecorators, Type } from '@nestjs/common';

/**
 * Custom API Response decorator
 * Note: Requires @nestjs/swagger to be installed for full functionality
 */
export const ApiResponse = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _status: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _description: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _type?: Type<unknown>,
) => {
  // Basic decorator that can be enhanced with Swagger later
  // Parameters are prefixed with _ to indicate they're intentionally unused
  return applyDecorators();
};
