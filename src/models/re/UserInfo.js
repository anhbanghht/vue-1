export class UserInfo {
  id;
  description;
  department;
  departmentName;
  email;
  userName;
  avatar;

  constructor(id, description, department, departmentName, email, userName, avatar) {
    this.id = id;
    this.description = description;
    this.department = department;
    this.departmentName = departmentName;
    this.email = email;
    this.userName = userName;
    this.avatar = avatar;
  }
}
