import { Track } from '../data/types';

// Generic helper function that can be used for the three operations:
const operation = (list1: Track[], list2: Track[], isUnion = false) =>
  list1.filter(
    (
      (set) => (a) =>
        isUnion === set.has(a.id)
    )(new Set(list2.map((b) => b.id)))
  );

const hashCode = (s: string) => {
  for (var i = 0, h = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
};
    const getHashParams = (hash: string) => {
      return hash
        ?.substring(1)
        ?.split('&')
        ?.find((elem) => elem.startsWith('access_token'))
        ?.split('=')[1];
    };

// Following functions are to be used:
const inBoth = (list1: Track[], list2: Track[]) =>
    operation(list1, list2, true),
  inFirstOnly = operation,
  inSecondOnly = (list1: Track[], list2: Track[]) => inFirstOnly(list2, list1);

export { inBoth, inFirstOnly, inSecondOnly, hashCode, getHashParams };

      