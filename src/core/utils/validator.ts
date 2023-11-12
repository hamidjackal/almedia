import { validate } from 'class-validator';

export async function validateDto<T extends object>(dto: T): Promise<string[]> {
  const errors = await validate(dto);
  if (errors.length > 0) {
    return errors.map((error) => error.toString());
  }
  return [];
}
