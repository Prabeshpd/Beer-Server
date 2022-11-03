interface UserDetail {
  id: number;
  email: string;
  password?: string;
  createdAt: string;
  isActive: boolean;
  updatedAt: string;
}

export default UserDetail;
