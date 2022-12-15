export interface IAuth {
  email: string,
  password: string,
  returnSecureToken: boolean
}

export interface IAuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?:boolean;
}
