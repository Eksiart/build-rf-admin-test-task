import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { Comment } from '@/shared/types/comment';
import { makeAutoObservable } from 'mobx';
import { fetchGetComments, fetchNewComment } from '../api/commentApi';

class CommentStore {
  private route: string;
  comments: IPromiseBasedObservable<Comment[]> = fromPromise.resolve([]);
  sendCommentRequest: IPromiseBasedObservable<Comment | null> = fromPromise.resolve(null);

  constructor(route: string) {
    this.route = route;
    makeAutoObservable(this);
  }

  getComments = () => {
    this.comments = fromPromise(fetchGetComments(this.route));
  };

  newComment = (data: string) => {
    this.sendCommentRequest = fromPromise(fetchNewComment(this.route, data));
  };
}

export default CommentStore;
