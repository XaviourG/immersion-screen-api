import 'dotenv/config';

export class Env {
  static get = (key: string, fallback?: string): string => {
    const value = process.env?.[key];
    if (!value && fallback === undefined) {
      throw new Error(`Env: enviroment variable "${key}" does not exist and has no fallback`);
    }
    if (!value) {
      console.warn(`Env: using fallback value for enviroment variable "${key}" (${fallback})`);
      return fallback!;
    }
    return value;
  };

  static getNumeric = (key: string, fallback?: number): number => {
    const value = process.env?.[key];
    if (!value && fallback === undefined) {
      throw new Error(`Env: numeric enviroment variable "${key}" does not exist and has no fallback`);
    }
    if (!value) {
      console.warn(`Env: using fallback value for enviroment variable "${key}" (${fallback})`);
      return fallback!;
    }
    const numeric = parseFloat(value);
    if (Number.isNaN(numeric)) {
      throw new Error(`Env: integer enviroment variable "${key}" does not exist and has no fallback`);
    }
    return numeric;
  };
}
