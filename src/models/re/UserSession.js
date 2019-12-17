// import { UserStatus } from '@/common/RegistrationCommon';

export class UserSession {
  id;
  userName;
  email;
  department;
  departmentName;
  avatar;
  authority;
  status;

  // res: any
  constructor(res) {
    this.id = res.id;
    this.userName = res.userName;
    this.email = res.email;
    this.department = res.department;
    this.departmentName = res.departmentName;
    this.avatar = res.avatar;
    this.authority = new FuncAuthority(res.authority);
    this.status = res.status;
  }
}

export class FuncAuthority {
  /** admin content */
  // AU_1: boolean | undefined
  AU_1;

  // authorities: number[]
  constructor(authorities) {
    if (!authorities || authorities.length === 0) {
      this.AU_1 = false;
      return;
    }
    this.AU_1 = this.isAuthority(authorities, 1);
  }

  // authorities: number[], value: number
  isAuthority(authorities, value) {
    const authority = authorities.find(v => {
      return v === value;
    });

    return authority > 0;
  }
}
