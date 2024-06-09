// auth.ts
export const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };
  