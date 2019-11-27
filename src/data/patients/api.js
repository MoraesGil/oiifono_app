import { api } from '/src/services/api';

const endPoints = {
	create: '/patients',
	getAll: '/patients',
	get: '/patients/{id}',
};

export const create = payload => api.post(endPoints.create, payload, 'post');

export const get = payload => api.get(endPoints.get, payload, 'get');
