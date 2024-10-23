export interface IPost {
  id: string;
  title: string;
  content: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    image: string;
    name: string;
    email: string;
    authType: string;
  };
}
