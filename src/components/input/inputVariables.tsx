export type DeviceFormData = {
  deviceName?: string;
  deviceType?: string;
  email?: string;
  serialNumber?: string;
  country?: string;
  city?: string;
  adress?: string;
};

export type FormData = {
  name?: string;
  surname?: string;
  email?: string;
  role?: string;
  password?: string;
  country?: string;
  city?: string;
  rePassword?: string;
  address?: string;
  phone_number?: string;
};

export type SignInFormData = {
  email?: string;
  password?: string;
};

export type HookData = {
  signActive: boolean;
  setSignActive: (setSignActive: boolean) => void;
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  content?: React.ReactNode;
};
