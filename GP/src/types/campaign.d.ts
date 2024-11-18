export interface Campaign {
    id: number;
    title: string;
    description: string;
    address: string;
    startDate: string;
    endDate: string;
    volunteers: Volunteer[];
  }