const token = "395bc3aa-f34f-406b-9552-e0d3786795c0";
const link = "https://nomoreparties.co/v1/cohort-52/";

class Api {
  constructor(options) {
    this.endPoint = options.baseUrl;
    this.auth = options.headers;
    this.body = options.body;
    this.token = token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${link}${this.endPoint[0]}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  getUserInfo() {
    return fetch(`${link}${this.endPoint[1]}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  setUserInfo(name, about) {
    return fetch(`${link}${this.endPoint[1]}`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  setAva(avatar) {
    return fetch(`${link}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  setCard(link, name) {
    return fetch(`https://nomoreparties.co/v1/cohort-52/cards`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  deleteCard(id) {
    return fetch(`${link}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  likeCard(cardId, likeStateToBeSet) {
    // likeStateToBeSet - is a new state to be set on server
    let method = "";
    if (likeStateToBeSet) {
      method = "PUT";
    } else {
      method = "DELETE";
    }
    return fetch(`${link}cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }
}

// Api instance creation
const api = new Api({
  baseUrl: ["cards", "users/me"],
  token: token,
});

export default api;
