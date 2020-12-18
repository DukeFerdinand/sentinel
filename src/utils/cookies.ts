import moment from 'moment';
import { DefaultObject } from '../@types/structures';

export const setCookie = (cookieData: {
  key: string;
  data: any;
  expiration?: number | string;
  path?: string;
}): void => {
  const formattedCookie =
    `${cookieData.key}=${
      typeof cookieData.data === 'string'
        ? cookieData.data
        : JSON.stringify(cookieData.data)
    };` +
    // expiration or "never" (sometime in 2038)
    `expires=${
      cookieData.expiration ?? moment.unix(2147400000).utc().toString()
    };` +
    `domain=${window.location.hostname};` +
    `path=${cookieData.path ?? '/'};`;
  document.cookie = formattedCookie;
};

export const getCookies = <T extends DefaultObject>(
  cookieString?: string
): T => {
  const pairs = cookieString?.split(';') || window.document.cookie.split(';');
  const cookies: Record<string, unknown> = {};

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    if ((pair[0] + '').trim() === '') {
      console.warn(
        '[ COOKIE PARSE ] Got empty key when parsing cookies, please check you have set them properly'
      );

      //? If we don't break here, a useless object is returned that looks something like this:
      //? {
      //?    "": "undefined"
      //? }
      break;
    }

    cookies[(pair[0] + '').trim()] = unescape(pair[1]);
  }
  return cookies as T;
};
