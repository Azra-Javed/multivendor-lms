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
