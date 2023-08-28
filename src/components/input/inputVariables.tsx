export type FormData = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  country?: string;
  town?: string;
  password?: string;
  rePassword?: string;
  adress?: string;
  role?: string;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type HookData = {
  signActive: boolean;
  setSignActive: (setSignActive: boolean) => void;
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  content?: React.ReactNode;
};
