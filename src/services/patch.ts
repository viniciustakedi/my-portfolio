import { getToken } from '@/configs';
import { enviroment } from './../configs/constants';
import { NewPostValues } from '@/models/blogs';

export const updateVisitsOnWebsite = async () => {
  let response: { message: string, status: number } = { message: 'Erro ao atualizar visitas', status: 404 };

  await fetch(`${enviroment.API_URL}/globals/visits-on-website`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((error) => {
      response = error;
    });

  return response;
}

export const replyQuizQuestion = async (quizId: string, questionId: string, questionAnswer: string) => {
  let response: { data: any, message: string, statusCode: number } = { data: null, message: 'Erro ao responder questão', statusCode: 404 };

  const body = {
    questionId,
    questionAnswer
  }

  await fetch((enviroment.API_URL + '/quizzes/' + quizId + '/reply-question'), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((error) => {
      response = error;
    });

  return response;

}

export const updateLocation = async (coords: GeolocationCoordinates) => {
  let response: { data: any, message: string, statusCode: number } = { data: null, message: 'Erro ao atualizar localização', statusCode: 404 };

  const body = {
    latitude: coords.latitude,
    longitude: coords.longitude
  }

  await fetch(`${enviroment.API_URL}/globals/location`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((error) => {
      response = error;
    });

  return response;
}


export const publishPatch = async (data: NewPostValues) => {
  let response: { data: any; message: string; statusCode: number } = {
    data: null,
    message: "Erro ao editar post",
    statusCode: 404,
  };

  data.timeToRead = Number(data.timeToRead);

  await fetch(`${enviroment.API_URL}/blogs/post/${data.friendlyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
    })
    .catch((error) => {
      response = error;
    });

  return response;
}