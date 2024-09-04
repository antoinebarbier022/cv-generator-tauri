export const countWarnings = (errorsObj: object) => {
  return Object.values(errorsObj).reduce((count, value) => {
    if (typeof value === "object" && value !== null) {
      return count + countWarnings(value);
    } else if (value) {
      return count + 1;
    }
    return count;
  }, 0);
};
