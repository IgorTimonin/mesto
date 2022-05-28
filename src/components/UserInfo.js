export default class UserInfo {
  constructor({ userName, userInfo }, avatar) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._avatar = avatar;
  }

  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userinfo: this._userInfo.textContent,
    };
    return userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userInfo.textContent = userData.about;
  }

  setAvatar(userData) {
    this._avatar.src = userData.avatar;
  }

  getMyId(id) {
    const myID = id;
    return myID;
  }
}