export default class UserInfo {
  constructor({ userName, userInfo }) {
    this.userName = userName;
    this.userInfo = userInfo;
  }
  _getUserInfo() {
    console.log(this.userName);
  };

  _setUserInfo() {

  };
}