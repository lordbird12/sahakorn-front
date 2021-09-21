
export type Roles = 'SUSCRIPTOR' | 'ADMIN';

// company
export interface Company {
  id: number;
  name_th: string;
  name_en: string;
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
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

// branch
export interface Branch {
  id: number;
  name: string;
  create_by: string;
  update_by: string;
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
  name: string;
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
  role: Roles;
}

// position
export interface Position {
  id: number;
  name: string;
  // name_th: string;
  // name_en: string;
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
  // name: string;
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

// position level
export interface PositionLevel {
  id: number;
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
  create_by: string;
  update_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  image: string;
  image_url: string;
  signature: string;
  signature_url: string;
  line_token: string;
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
  role: Roles;
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


export interface Prefix {

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

export interface PrefixResponse extends Prefix {

  code: string;
  status: string;
  message: string;
  data: [];
  role: Roles;
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
