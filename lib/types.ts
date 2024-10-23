export interface IPost {
  id: string;
  title: string | null;
  content: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  likes?: ILike[] | [];
  comments?: IComment[] | [];
  savedBy?: ISavedPost[] | [];
  user: {
    id: string;
    image: string;
    name: string;
    email: string;
    authType: string;
  };
}

export interface ILike {
  id?: string;
}
export interface IComment {
  id?: string;
}
export interface ISavedPost {
  id?: string;
}
