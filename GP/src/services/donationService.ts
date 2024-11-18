
import { Donation } from '../types/donation'; 

let donations: Donation[] = [
    { id: 1, nameDonor: "João Silva", date: "2024-11-01", donation: 100  },
    { id: 1, nameDonor: "João Silva", date: "2024-11-01", donation: 300  },
    { id: 2, nameDonor: "Maria Oliveira", date: "2024-11-05", donation: 50 },
    { id: 3, nameDonor: "Carlos Souza", date: "2024-11-10", donation: 200 },
    // Adicione mais doações conforme necessário
  ];
export const getDonation = async (): Promise<Donation[]> => donations;

export const getDonationById = async (id: number): Promise<Donation | undefined> =>
  donations.find(vol => vol.id === id);


