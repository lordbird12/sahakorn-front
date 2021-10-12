
export type Roles = 'SUSCRIPTOR' | 'ADMIN';

// company
export interface Company {
  company_id: number;
  name_th: string;
  name_en: string;
  abbreviation: string;
  tax_id: string;
  bank_id: string;
  bank_name: string;
  account_name: string;
  bank_batch: string;
  address: string;
  village: string;
  road: string;
  sub_district: string;
  district: string;
  province_id: string;
  zipcode: string;
  phone: string;
  fax: string;
  map: string;
  logo: string;

}

export interface CompanyResponse extends Company {
  code: string;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}

// privince
export interface Province {
  id: number;
  name_th: string;
  name_en: string;
  zone: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface ProvinceResponse extends Province {
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


// branch
export interface Branch {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  address: [];
  village: string;
  road: [];
  sub_district: [];
  district: [];
  province_id: number;
  zipcode: [];
  phone: [];
  fax: string;
  map: [];
  create_by: string;
  update_by: [];
  created_at: string;
  updated_at: string;


}

export interface BranchResponse extends Branch {
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

// division
export interface Division {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface DivisionResponse extends Division {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

// department
export interface Department {
  id: number;
  code: number;
  branch_id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface DepartmentResponse extends Department {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
  // role: Roles;
}

// persontype
export interface PersonType {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PersonTypeResponse extends PersonType {
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

// position
export interface Position {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PositionResponse extends Position {
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

// position type
export interface PositionType {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PositionTypeResponse extends PositionType {
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

// position group
export interface PositionGroup {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PositionGroupResponse extends PositionGroup {
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

// position level
export interface PositionLevel {
  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PositionLevelResponse extends PositionLevel {
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

// hospital
export interface Hospital {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface HospitalResponse extends Hospital {
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


// hospital
export interface Religion {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface ReligionResponse extends Religion {
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

// taxbreak
export interface Taxbreak {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface TaxbreakResponse extends Taxbreak {
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

// Loan
export interface Loan {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface LoanResponse extends Loan {
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

// Register
export interface Register {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterResponse extends Register {
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

// Stock
export interface Stock {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface StockResponse extends Stock {
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

// employee
export interface Employee {
  id: number;
  person_id: number;
  prefix_id: number;
  company_id: number;
  branch_id: number;
  division_id: number;
  department_id: number;
  position_id: number;
  person_type_id: number;
  position_group_id: [];
  position_type_id: [];
  position_level_id:[];
  card_id: string;
  name: string;
  name_en: string;
  status: string;
  work: string;
  sex: string;
  position_number: [];
  id_card: string;
  email: string;
  photo: string;
  phone: [];
  birthday: string;
  start_work_date: string;
  pass_testing_date: string;
  retire_date: [];
  disable_date: [];
  resign_date: [];
  resign_id: [];
  create_by: [];
  update_by: [];
  created_at: string;
  updated_at: string;

}

export interface EmployeeResponse extends Employee {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
  // role: Roles;
}


export interface Gender {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}


export interface GenderResponse extends Gender {
  code: string;
  status: string;
  message: string;
  data: [];
  role: Roles;
}
//prefix
export interface Prefix {

  id: number;
  code: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}

export interface PrefixResponse extends Prefix {

  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };

  // code: number;
  // status: string;
  // message: string;
  // data: [];
  // role: Roles;

}

export interface Permission {
  id: number;
  name: string;
  menu_name: [];
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
}
export interface PermissionResponse extends Permission {
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

export interface ItemType {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;

}
export interface ItemTypeResponse extends ItemType {
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

export interface Size {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;

}
export interface SizeResponse extends Size {
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

export interface Item {
  id: number;
  item_id: number;
  name: string;
  item_type_id: number;
  size_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  select_file: string;

}
export interface ItemResponse extends Item {
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
export interface Register {
  id: number;
  prefix_id: string;
  company_id: string;
  permission_id: number;
  branch_id: number;
  division_id: string;
  department_id: number;
  position_id: string;
  person_type_id: string;
  position_group_id: string;
  position_type_id: string;
  position_level_id: string;
  person_id: string;
  card_id: string;
  name: string;
  name_en: string;
  status: string;
  work: string;
  sex: string;
  position_number: string;
  phone: string;
  email: string;
  id_card: string;
  birthday: string;
  date_start_work: string;
  date_test_work: string;
  date_retire: string;
  date_disable: string;
  date_leaved: string;
  leaved_id: string;
  pic: string;
  sort: string;
}
export interface Deposit {
  id: number;
  item_id: number;
  item_type_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;

}
export interface RegisterResponse extends Register {
  select_file: string;

}
export interface DepositResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface Vendor {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;

}
export interface VendorResponse extends Item {
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
export interface Withdraw {
  id: number;
  item_id: number;
  item_type_id: number;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  prefix: [];
  company: [];
  branch: [];
  division: [];
  department: [];
  position: [];
  position_group: [];
  person_type: string;
  position_type: [];
  position_level: [];
  leaved: [];
  No: number;
  doc_id: number;
  report_id: string;
  date: string;
  status: string;
  status_by: string;
  status_at: string;
  reason: string;
  pdf_path: string;
}

export interface WithdrawResponse extends Item {
  code: number;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
  role: Roles;
}

export interface ForgotPassword {

  id: number;
  name_th: string;
  email: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;

}

//cooperative
export interface Cooperative {
  cooperative_id: number;
  cooperative_no: string;
  name: string;
  start_date: string;
  type: string;
  tax_id: string;
  bank_batch: string;
  bank_name: string;
  account_name: string;
  bank_id: number;
  logo: string;
  address: string;
  village: [];
  road: string;
  sub_district: string;
  district: string;
  province_id: number;
  zipcode: number;
  phone: number;
  fax: [];
  map: string;
}

export interface CooperativeResponse extends Cooperative {
  code: string;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}

//cooperative-members
export interface CooperativeMember {
  id: number;
  person_id: string;
  member_id: string;
  type: string;
  status: string;
  share_qty: string;
  share_amount: string;
  sum_share_qty: string;
  sum_share_amount: string;
  share_pay: number;
  share_doc: [];
  member_doc: [];
  member_date: string;
  resign_doc: [];
  resign_date: [];
  resign_id: [];
  reason: [];
  create_by:[];
  update_by: [];
  created_at: [];
  updated_at: string;
}

export interface CooperativeMembersResponse extends CooperativeMember {
  code: string;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}

//cooperative-board
export interface CooperativeBoard {
  id: number;
  account_year_id: number;
  status: string;
  position: string;
  member_id: string;
  start_date: string;
  end_date: string;
  term: number;
  year: string;
  phase: string;
  resign_id: number;
  create_by: [];
  update_by: [];
  created_at: string;
  updated_at: string;

}

export interface CooperativeResponse extends CooperativeBoard {
  code: string;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}


//loantype
export interface Loantype {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  share: string;
  supporter: number;
  member_age: number;
  supporter_age: number;
  sup_num: number;


  interest_rate: string;



  account_name: string;

}

export interface LoantypeResponse extends Loantype {
  code: string;
  status: string;
  message: string;
  data: {
    data: any[],
    draw: number;
    to: number;
    total: number;
  };
}





