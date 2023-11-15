import { ZodError } from 'zod';

export const isObjEmpty = (obj: typeof ZodError) => {
  for (const i in obj) return false;
  return true;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

export const truncateSentence = (sentence: string, maxWords: number) => {
  const words = sentence.split(' ');

  if (words.length > maxWords) {
    const truncatedSentence = words.slice(0, maxWords).join(' ');
    return `${truncatedSentence}...`;
  }

  // If the sentence is within the limit, return it unchanged
  return sentence;
};

export const createFileURL = (
  id: string,
  collectionId: string,
  fileName: string
) => {
  return `${process.env.NEXT_PUBLIC_PB_DOMAIN}/api/files/${collectionId}/${id}/${fileName}`;
};

export const ToFaNumbers = (str: any) =>
  str.replace(/\d/g, (d: number) => '۰۱۲۳۴۵۶۷۸۹'[d]);
