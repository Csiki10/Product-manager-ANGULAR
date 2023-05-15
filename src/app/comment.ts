export class Comment {
    id: number;
    body: string;
    postId: number;
    user: {
      id: number;
      username: string;
    };
  
    constructor(id: number, body: string, postId: number, user: { id: number; username: string }) {
      this.id = id;
      this.body = body;
      this.postId = postId;
      this.user = user;
    }
  }