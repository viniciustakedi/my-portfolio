// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://api.takedi.dev';

export const updateVisitsOnWebsite = async () => {
  let response: { message: string, status: number } = { message: 'Erro ao atualizar visitas', status: 404 };

  await fetch(BASE_URL + '/visits-on-website', {
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