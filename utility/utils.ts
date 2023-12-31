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

  return sentence;
};

export const createFileURL = (
  id: string,
  collectionId: string,
  fileName: string
) => {
  return `${process.env.NEXT_PUBLIC_PB_DOMAIN}/api/files/${collectionId}/${id}/${fileName}`;
};

export const ToFaNumbers = (number: string | number) => {
  if (typeof number === 'number') number = number.toString();
  return number.replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d, 10)]);
};

export const formatHeadlines = (rootDiv: HTMLDivElement) => {
  const listItems = rootDiv.querySelectorAll('li');

  listItems.forEach((li, _index) => {
    const anchorChild = li.querySelector('a');
    const nestedList = li.querySelector('ul');

    if (anchorChild) {
      anchorChild.classList.add('hover:font-bold');
      anchorChild.classList.add('transition-all');
    }

    if (!nestedList) {
      li.classList.add('lg:py-3', 'max-md:py-1');
    }

    if (nestedList) {
      anchorChild?.classList.add('inline-block', 'lg:py-3', 'max-md:py-1');
      li.classList.add('pr-6');
    }
  });

  return rootDiv.innerHTML;
};
