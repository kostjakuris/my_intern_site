import React from "react";

export type DeviceFormData = {
  id?: number;
  owner_id?: number | null;
  name?: string | null;
  device_type?: string | null;
  email?: string | null;
  serial_number?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  phase_active?: boolean | null;
  phase_type?: string | null;
  sum_power?: number | null;
  group_id?: number | null;
  location?: string | null;
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

export type CreateUserData = {
  name?: string;
  surname?: string;
  email?: string;
  role?: string;
  password?: string;
  country?: string;
  city?: string;
  address?: string;
  phone_number?: string;
};

export type ValuesData = {
  name: string | null;
  surname: string | null;
  email: string | null;
  role?: string | null;
  country: string | null;
  city: string | null;
  password: string | null;
  address: string | null;
  phone_number?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type SignInFormData = {
  email?: string;
  password?: string;
};

export type AddGridGridData = {
  headerName?: string;
  field?: string;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  rowGroupPanelShow?: string;
};

export type HookData = {
  signActive: boolean;
  setSignActive: (setSignActive: boolean) => void;
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  addGridActive?: boolean;
  setAddGridActive?: (addGridActive: boolean) => void;
  group_id?: number;
  grid_id?: number;
  groupData?:any[];
  rowData?: AddGridGridData[] | undefined;
  setRowData?: (rowData: AddGridGridData[] | undefined) => void;
  content?: React.ReactNode;
};

export type AddGridData = {
  signActive: boolean;
  setSignActive: (setSignActive: boolean) => void;
  navActive: boolean;
  setNavActive: (navActive: boolean) => void;
  addGridActive: boolean;
  setAddGridActive: (addGridActive: boolean) => void;
  content?: React.ReactNode;
};

export type createGroupData  = {
  name:string
}
