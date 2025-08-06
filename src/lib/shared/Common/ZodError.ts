import { ZodFormattedError } from "zod";

export function flattenZodErrors(errors: ZodFormattedError<any, string>) {
  const result: Record<string, string[]> = {};

  const traverse = (obj: any, path: string[] = []) => {
    for (const key in obj) {
      if (key === "_errors") {
        if (obj[key].length > 0) {
          result[path.join(".")] = obj[key];
        }
      } else {
        traverse(obj[key], [...path, key]);
      }
    }
  };

  traverse(errors);
  return result;
}
