// volunteerService.ts
import { Volunteer } from '../types/volunteer';

let volunteers: Volunteer[] = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com", skills: ["logistics"], availability: "weekends" },
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
