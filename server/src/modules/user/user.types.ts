// Register user
export interface IRegistration {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

//activation token
export interface IActivationToken {
  token: string;
  activationCode: string;
}

//activate user
export interface IActivateUser {
  activation_token: string;
  activation_code: string;
}

// login user
export interface ILogin {
  email: string;
  password: string;
}

//social auth
export interface IsocialAuth {
  name: string;
  email: string;
  avatar: string;
}

//update user-info
export interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

//upate user-password
export interface IUpdateUserPassword{
  oldPassword: string;
  newPassword: string;
}

//update user avatar
export interface IUpdateProfilePicture{
  avatar: string
}