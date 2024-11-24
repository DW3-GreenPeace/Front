import axios from 'axios';
import { Volunteer } from '../types/volunteer';
import { Campaign } from '../types/campaign';
import env from '../../env';

const BASE_URL = env.url.local + '/volunteers'; // Rota base para voluntários

// Função para obter o ID do voluntário do localStorage
const getLoggedInVolunteerId = (): number | null => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const parsedUserData = JSON.parse(userData); // Convertendo a string JSON em objeto
    return parsedUserData.id; // Retorna o ID do voluntário logado
  }
  return null; // Retorna null se não houver usuário logado
};

// Obter todos os voluntários
export const getVolunteers = async (): Promise<Volunteer[]> => {
  const response = await axios.get<Volunteer[]>(BASE_URL);
  return response.data;
};

// Obter voluntário por ID
export const getVolunteerById = async (id: number): Promise<Volunteer | undefined> => {
  const response = await axios.get<Volunteer>(`${BASE_URL}/${id}`);
  return response.data;
};

// Criar novo voluntário
export const createVolunteer = async (volunteer: Volunteer): Promise<void> => {
  await axios.post(BASE_URL, volunteer);
};

// Atualizar voluntário existente
export const updateVolunteer = async (id: number, updatedVolunteer: Volunteer): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, updatedVolunteer);
};

// Deletar voluntário
export const deleteVolunteer = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

// Obter campanhas nas quais o voluntário está inscrito
export const getVolunteerCampaigns = async (): Promise<Campaign[]> => {
  const volunteerId = getLoggedInVolunteerId(); // Obtém o ID do voluntário do localStorage
  if (volunteerId) {
    const response = await axios.get<Campaign[]>(`${BASE_URL}/${volunteerId}/campaigns`);
    return response.data;
  } else {
    throw new Error('Usuário não autenticado');
  }
};
