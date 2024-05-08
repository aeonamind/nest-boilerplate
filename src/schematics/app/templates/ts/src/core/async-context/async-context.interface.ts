export type User = {
  empNo?: string;
};

// overwrite interface ClsStore of nestjs-cls
declare module 'nestjs-cls' {
  interface ClsStore {
    id: number;
    user: User;
    startAt: bigint;
  }
}
