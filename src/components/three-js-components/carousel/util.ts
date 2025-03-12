/**
 * Linear interpolation function.
 * @param v0 - Start value.
 * @param v1 - End value.
 * @param t - Interpolation factor (0 to 1).
 * @returns Interpolated value between v0 and v1.
 */
export const lerp = (v0: number, v1: number, t: number): number => {
    return v0 * (1 - t) + v1 * t;
  };
/**
 * Generates an array of decreasing index values in a pyramidal shape.
 * @param array - The input array (used for its length).
 * @param index - The center index for the pyramid.
 * @returns Array of pyramidal index values.
 */
export const getPiramidalIndex = <T>(array: T[], index: number): number[] => {
    return array.map((_, i) => {
      if (index === i) {
        return array.length;
      }
      return array.length - Math.abs(index - i);
    });
  };
    