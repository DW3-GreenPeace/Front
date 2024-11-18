import { Campaign } from '../types/campaign';

let campaigns: Campaign[] = [
  { 
    id: 1, 
    title: "Campanha de Inverno", 
    description: "Campanha para arrecadar roupas e cobertores para o inverno", 
    address: "Rua 1, 123",
    startDate: "2024-06-01", 
    endDate: "2024-08-31", 
    volunteers: []
  },
  { 
    id: 2, 
    title: "Campanha de Inverno",
    description: "Campanha para arrecadar roupas e cobertores para o inverno", 
    address: "Rua 1, 123",
    startDate: "2024-06-01", 
    endDate: "2024-08-31", 
    volunteers: []
  },
  { 
    id: 3, 
    title: "Campanha de Verão", 
    description: "Campanha para arrecadar roupas e cobertores para o inverno", 
    address: "Rua 1, 123",
    startDate: "2024-06-01", 
    endDate: "2024-08-31", 
    volunteers: []
  }
];

export const getCampaigns = async (): Promise<Campaign[]> => campaigns;

export const getCampaignById = async (id: number): Promise<Campaign | undefined> => 
  campaigns.find(camp => camp.id === id);

export const createCampaign = async (campaign: Campaign): Promise<void> => {
  campaign.id = new Date().valueOf(); // Gerar ID único
  campaigns.push(campaign);
};

export const updateCampaign = async (id: number, updatedCampaign: Campaign): Promise<void> => {
  const index = campaigns.findIndex(camp => camp.id === id);
  if (index !== -1) campaigns[index] = updatedCampaign;
};

export const deleteCampaign = async (id: number): Promise<void> => {
  campaigns = campaigns.filter(camp => camp.id !== id);
};

// Função para adicionar voluntário à campanha
export const joinCampaignById = async (id: number, volunteer: { id: number, name: string, email: string }): Promise<void> => {
  const campaign = campaigns.find(camp => camp.id === id);
  if (campaign && !campaign.volunteers.some(v => v.id === volunteer.id)) {
    campaign.volunteers.push(volunteer);
  }
};
