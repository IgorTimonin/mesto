const resultHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject();
};
export default class Api {
  constructor(baseUrl, headers) {
    (this.baseUrl = baseUrl), (this.headers = headers);
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      headers: this.headers,
    }).then(resultHandler);
  }

  getUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-41/users/me', {
      headers: {
        authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
      },
    }).then(resultHandler);
  }

  setUserData(userData) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      }),
    });
  }

  setUserAvatar(userData) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: userData,
      }),
    }).then(resultHandler);
  }
}