
export type TwitterFormData= {
  displayName: string;
  username: string;
  avatar:string;
  bio: string;
  location: string;
  website: string;
  headline?:string;
  industry?:string;
  joinDate: string;
  following: string;
  followers: string;
  connections?:string;
  isVerified: boolean;
  headerColor: string;
  profileTheme: string;
}
export type ProfileInformation =Omit<
TwitterFormData,'following'|'followers'|'isVerified'|'headerColor'|'profileTheme'|'connections'>



export type AccountDetails=Pick<
TwitterFormData,'following'|'followers'|'isVerified'|'headerColor'|'profileTheme'|'connections'
>
