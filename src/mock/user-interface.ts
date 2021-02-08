export interface TokenInterface {
  token: string;
}
export interface TokenArray {
  [index: string]: TokenInterface;
}
export interface UserInterface {
  roles: [string];
  introduction: string;
  avatar: string;
  name: string;
}
export interface UserArray {
  [index: string]: UserInterface;
}
