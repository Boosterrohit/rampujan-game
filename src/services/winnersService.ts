const API_BASE_URL = 'http://192.168.1.99:5000/api/v1';

export interface Winner {
  playerName: string;
  gameName: string;
  prizeAmount: number;
  wonAt: string;
}

export interface WinnersResponse {
  success: boolean;
  winners: Winner[];
}

export const winnersService = {
  async fetchWinners(): Promise<Winner[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/winners`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data: WinnersResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error('Failed to load winners');
      }

      return data.winners;
    } catch (error) {
      console.error('winnersService.fetchWinners error', error);
      throw error;
    }
  },
};
