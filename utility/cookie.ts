// Funcs in this file use the `document` object which means they are
// only usable inside client components.

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
};

export const addCookie = (newCookie: string) => {
  const currentCookies = document.cookie;

  document.cookie = currentCookies
    ? `${currentCookies}; ${newCookie} SameSite=Lax; Secure;`
    : newCookie;
};
