const API_BASE_URL = `${import.meta.env.VITE_BASE_URL || 'https://api.rowgaming669.com'}${import.meta.env.VITE_API_VERSION || '/api/v1'}/player`;

export interface FreeSpinResponse {
  success: boolean;
  winAmount: number;
  spinId: string;
  spinType: string;
  message?: string;
}

// the bonus endpoint can return the same shape as FreeSpinResponse
// or it might return an error object containing a message property.
export type BonusSpinResponse = FreeSpinResponse & {
  // message will be present when the backend cannot calculate a bonus spin
  message?: string;
};

export const spinService = {
  async freeSpin(): Promise<FreeSpinResponse> {
    // this method is still called "freeSpin" in the UI but it uses the
    // `/spin` endpoint which now applies the new assignment/deposit
    // eligibility and daily-limit rules. `/spin/free` will continue to work
    // for a while but will return the same response via alias.
    try {
      const token = localStorage.getItem('accessToken');
      const headers: any = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/spin`, {
        method: 'POST',
        headers,
        credentials: 'include',
      });
      const data: FreeSpinResponse = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data?.message || 'Spin failed');
      }
      return data;
    } catch (error) {
      console.error('spinService.freeSpin error', error);
      throw error;
    }
  },

  async bonusSpin(): Promise<BonusSpinResponse> {
    try {
      const token = localStorage.getItem('accessToken');
      const headers: any = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/spin/bonus`, {
        method: 'POST',
        headers,
        credentials: 'include',
      });
      const data: BonusSpinResponse = await response.json();

      // treat any message from the server as an error condition unless
      // the success flag is truthy.  The API may return just `{ message: ... }`
      // without a `success` property, so we consider that a failure as well.
      if (
        !response.ok ||
        (data.message && !data.success)
      ) {
        const err = new Error(data.message || 'Bonus spin failed');
        (err as any).message = data.message;
        throw err;
      }

      return data;
    } catch (error) {
      console.error('spinService.bonusSpin error', error);
      throw error;
    }
  },
};
