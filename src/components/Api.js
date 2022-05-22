export default class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl,
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl, {
      headers: this.headers
    })
      .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //   });
  }

  getUserData() {
    return fetch('https://nomoreparties.co/v1/cohort-41/users/me', {
      headers: {
        authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
      },
    })
      .then((res) => {
          if (res.ok) {
              return res.json()
            }
            return Promise.reject()
        })
  }

  setUserData() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '1958a966-a982-4094-8b61-ad54c8ab2b4e',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Marie Skłodowska Curie',
          about: 'Physicist and Chemist',
        }),
      }); 
  }
}