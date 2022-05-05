export class UserInfo {
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

  setUserInfo({ userName, userinfo }) {
    this._userName.textContent = userName;
    this._userInfo.textContent = userinfo;
  }
}