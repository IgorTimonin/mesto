export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userinfo: this._userInfo.textContent,
    };
    return userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = Object.values(userData)[0];
    this._userInfo.textContent = Object.values(userData)[1];
  }
}