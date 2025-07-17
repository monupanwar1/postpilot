export type FormData = {
  displayName: string;
  username: string;
  avatar: string;
  posts?: string;
  bio: string;
  location: string;
  website: string;
  headline?: string;
  industry?: string;
  joinDate: string;
  following: string;
  followers: string;
  connections?: string;
  isVerified: boolean;
  headerColor: string;
  profileTheme: string;
};
export type ProfileInformation = Omit<
  FormData,
  | 'following'
  | 'followers'
  | 'isVerified'
  | 'headerColor'
  | 'profileTheme'
  | 'connections'
>;

export type AccountDetails = Pick<
  FormData,
  | 'following'
  | 'followers'
  | 'isVerified'
  | 'headerColor'
  | 'profileTheme'
  | 'connections'
  | 'posts'
>;
