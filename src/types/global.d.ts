declare type Recordable<T extends any = any> = Record<string, T>;
declare type Indexable<T extends any = any> = {
  [key: string]: T;
};
