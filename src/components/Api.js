const resultHandler = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
export default class Api {
  constructor(baseUrl, headers) {
    (this._baseUrl = baseUrl), (this._headers = headers);
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then(resultHandler);
  }

  getUserData(targetApiUrl) {
    return fetch(targetApiUrl, {
      headers: this._headers,
    }).then(resultHandler);
  }

  setUserData(targetApiUrl, userData) {
    return fetch(targetApiUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(resultHandler);
  }

  setUserAvatar(targetApiUrl, userData) {
    return fetch(targetApiUrl + '/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData,
      }),
    }).then(resultHandler);
  }

  setNewCard(cardData) {
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.cardName,
        link: cardData.cardAdress,
      }),
    }).then(resultHandler);
  }
}