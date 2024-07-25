import ky from 'ky';

export const kyApi = ky.create({
  prefixUrl: import.meta.env.APP_BASE_URL,
});
