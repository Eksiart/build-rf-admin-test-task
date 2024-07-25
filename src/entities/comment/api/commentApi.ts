import { Comment } from '@/shared/types/comment';
import { kyApi } from '@/shared/api/kyApi';

export const fetchNewComment = async (route: string, data: string) =>
  await kyApi.post(`${route}`, { json: { message: data } }).json<Comment>();

export const fetchGetComments = async (route: string) => await kyApi.get(`${route}`).json<Comment[]>();
