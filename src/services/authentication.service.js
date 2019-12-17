import BaseService from '../common/interceptor/BaseService';
import ShareValueService from '../services/shareValue.service';
import WebApi from '../common/interceptor/axios/WebApi'
import JwtDecode from 'jwt-decode';

export class AuthenticationService extends BaseService {
  _data;
  _canRefresh;

  constructor() {
    super();
  }

  isLogin() {
    const accessToken = localStorage.getItem('access_token');
    let expire = true;

    if (!this._data && accessToken) {
      this._data = this.toAuthenticationModel(accessToken);
      expire = this.isEnableExpire();
    }

    if (!(accessToken && 0 < accessToken.length && expire)) {
      ShareValueService.removeAccessToken();
      ShareValueService.clearUserSession();
      this._data = null;
      return false;
    }

    return true;
  }

  isEnableExpire() {
    const now = Math.round(new Date().getTime() / 1000);
    return this._data && now < this._data.expire;
  }

  // accessToken: string
  toAuthenticationModel(accessToken) {
    const decoded = JwtDecode(accessToken);
    return {
      id: decoded.user.id,
      userName: decoded.user.userName,
      email: decoded.user.email,
      department: decoded.user.department,
      expire: decoded.exp
    };
  }

  // callback?: any
  refreshToken(callback) {
    if (!this._data || !this._canRefresh) {
      return callback ? callback('Busy refresh token request') : null;
    }
    this._canRefresh = false;
    console.log('*** RefreshToken');

    const refreshToken = localStorage.getItem('access_token');
    if (!refreshToken) {
      const reason = 'Unsupported refresh token';

      console.log(reason);
      return callback ? callback(reason) : null;
    }

    let params = new URLSearchParams();
    params.append('access_token', refreshToken);

    WebApi.get('/api/refreshToken', {params: params}).then((res) => {
      ShareValueService.setAccessToken(res['data']['access_token']);
      ShareValueService.fetchUserSession().then();
      this._canRefresh = true;
      this._data = this.toAuthenticationModel(res['data']['access_token']);
    }).catch((error) => {
      console.log('*** error refresh token: ', error);
      this._canRefresh = true;
      return callback ? callback(error) : null;
    });
  }
}

const authenticationService = new AuthenticationService();
export default authenticationService;
