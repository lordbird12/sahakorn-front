export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
  user_id: string;
  password: string;
  module_id: string;
  data: [];
}

export interface UserResponse extends User {
  code: string;
  status: string;
  message: string;
  token: string;
  data: [];
  role: Roles;
}


// user group
export interface UserGroup {
  id: number;
  user_id: number;
  name_th: string;
  name_en: string;
  type: string;
  permission: string;
  email: string;
  line_token: string;
  status: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;


}

export interface UserGroupResponse extends UserGroup {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}

export class Person {
  id: number;
  firstName: string;
  lastName: string;
}

