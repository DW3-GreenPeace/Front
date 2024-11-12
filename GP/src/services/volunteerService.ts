// volunteerService.ts
import { Volunteer } from '../types/volunteer';
import { Campaign } from '../types/campaign'; // Certifique-se de que existe o tipo de Campaign importado

let volunteers: Volunteer[] = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com", skills: ["logistics"], availability: "weekends" },
];

let campaigns: Campaign[] = [
  { id: 1, title: "Campanha de Doação", description: "Ajude-nos a arrecadar alimentos.", startDate: "2024-01-10", endDate: "2024-01-30", volunteers: [1] },
  { id: 2, title: "Campanha de Limpeza", description: "Participe da limpeza do parque.", startDate: "2024-02-15", endDate: "2024-02-20", volunteers: [] },
];

export const getVolunteers = async (): Promise<Volunteer[]> => volunteers;

export const getVolunteerById = async (id: number): Promise<Volunteer | undefined> =>
  volunteers.find(vol => vol.id === id);

export const createVolunteer = async (volunteer: Volunteer): Promise<void> => {
  volunteer.id = new Date().valueOf(); // Gerar ID único
  volunteers.push(volunteer);
};

export const updateVolunteer = async (id: number, updatedVolunteer: Volunteer): Promise<void> => {
  const index = volunteers.findIndex(vol => vol.id === id);
  if (index !== -1) volunteers[index] = updatedVolunteer;
};

export const deleteVolunteer = async (id: number): Promise<void> => {
  volunteers = volunteers.filter(vol => vol.id !== id);
};

// Nova função para obter as campanhas nas quais o voluntário está inscrito
export const getVolunteerCampaigns = async (volunteerId: number): Promise<Campaign[]> => {
  return campaigns.filter(campaign => campaign.volunteers.includes(volunteerId));
};
