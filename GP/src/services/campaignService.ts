import axios from 'axios';
import { Campaign } from '../types/campaign';
import env from '../../env';

const BASE_URL = env.url.local + '/campaigns'; // Rota base para campanhas

// Obter todas as campanhas
export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get<Campaign[]>(BASE_URL);
  return response.data;
};

// Obter campanha por ID
export const getCampaignById = async (id: number): Promise<Campaign | undefined> => {
  const response = await axios.get<Campaign>(`${BASE_URL}/${id}`);
  return response.data;
};

// Criar nova campanha
export const createCampaign = async (campaign: Campaign): Promise<void> => {
  await axios.post(BASE_URL, campaign, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Atualizar campanha existente
export const updateCampaign = async (id: number, updatedCampaign: Campaign): Promise<void> => {
  await axios.put(`${BASE_URL}/${id}`, updatedCampaign, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Deletar campanha
export const deleteCampaign = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

// Adicionar voluntário à campanha
export const joinCampaignById = async (
  id: number,
  volunteer: { id: number; name: string; email: string }
): Promise<void> => {
  await axios.post(`${BASE_URL}/${id}/volunteers`, volunteer, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
