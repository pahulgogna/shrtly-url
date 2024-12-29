import { h64 } from "xxhashjs";

export function shortHash(inputString: string, length: number = 6): string {
  /**
   * Generate a short, unique hash for a given input string.
   *
   * @param inputString - The string to hash.
   * @param length - Desired length of the final hash output.
   * @returns A short hash of the input string.
   */

  const hashValue = h64(inputString, 0x0).toString(10); // Get the numeric string representation

  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let base62Hash = "";
  let numericValue = BigInt(hashValue); // Use BigInt for large values

  while (numericValue > 0) {
    const remainder = Number(numericValue % BigInt(62)); // Find remainder
    base62Hash = characters[remainder] + base62Hash; // Build Base62 string
    numericValue = numericValue / BigInt(62); // Divide by 62
  }

  // Step 3: Truncate or pad to the desired length
  return base62Hash.slice(0, length);
}