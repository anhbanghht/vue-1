import WebApi from '../common/interceptor/axios/WebApi'
import BaseService from '../common/interceptor/BaseService'

export class RegistrationService extends BaseService {

  getDetailUser(userId) {
    return WebApi.get('/api/re/getDetailUser/' + userId);
  }

  getListUser(conditionsSearch) {
    let params = new URLSearchParams();
    params.append('name', (conditionsSearch && conditionsSearch['name']) ? conditionsSearch.name: '');
    params.append('department', (conditionsSearch && conditionsSearch['department']) ? conditionsSearch.department : '');
    params.append('status', (conditionsSearch && conditionsSearch['status'])? conditionsSearch.status : '');
    return WebApi.get('/api/re/getUsers', { params: params});
  }

  getDepartments() {
    return WebApi.get('/api/re/getDepartments');
  }

  login(email, password) {
    return WebApi.post('/api/login', {email: email, password: password});
  }

  logout() {
    return WebApi.post('/api/logout');
  }

  updateUser(user) {
    return WebApi.post('/api/re/updateUser', user);
  }
  uploadUserAvatar(formData) {
    return WebApi.post('/api/re/uploadUserAvatar', formData);
  }
  deleteUser(user) {
    return WebApi.post('/api/re/deleteUser', user);
  }
  setUserStatus(user) {
    return WebApi.post('/api/re/setUserStatus', user);
  }

  changePassword(password, passwordConfirm) {
    return WebApi.post('/api/re/changePassword', {password: password, passwordConfirm: passwordConfirm});
  }

  getListDepartment() {
    return WebApi.get('/api/re/getDepartments');
  }

  updateDepartment(department) {
    return WebApi.post('/api/re/updateDepartment', department);
  }

  saveDepartment(department) {
    return WebApi.post('/api/re/addDepartment', department);
  }

  deleteDepartment(department) {
    return WebApi.post('/api/re/deleteDepartment', department);
  }

  addUsers(model) {
    return WebApi.post('/api/re/addUsers', model);
  }
}

const registrationService = new RegistrationService();
export default registrationService;
