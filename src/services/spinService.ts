const API_BASE_URL = 'http://192.168.1.99:5000/api/v1/player';

export interface FreeSpinResponse {
  success: boolean;
  winAmount: number;
  spinId: string;
  spinType: string;
}

export const spinService = {
  async freeSpin(): Promise<FreeSpinResponse> {
    try {
      const token = localStorage.getItem('accessToken');
      const headers: any = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/spin/free`, {
        method: 'POST',
        headers,
        credentials: 'include',
      });
      const data: FreeSpinResponse = await response.json();
      if (!response.ok || !data.success) {
        throw new Error('Free spin failed');
      }
      return data;
    } catch (error) {
      console.error('spinService.freeSpin error', error);
      throw error;
    }
  },
};
