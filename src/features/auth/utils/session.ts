export const TOKEN_STORAGE_KEY = "token";
export const TOKEN_EXPIRED_STORAGE_KEY = "tokenExpiredIn";

type SessionData = {
  token: string;
  expiredIn: string;
};

export function saveSession({ token, expiredIn }: SessionData) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TOKEN_EXPIRED_STORAGE_KEY, expiredIn);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRED_STORAGE_KEY);
}

export function hasValidSession() {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const expiredIn = localStorage.getItem(TOKEN_EXPIRED_STORAGE_KEY);

  if (!token) {
    return false;
  }

  if (!expiredIn) {
    return true;
  }

  const expirationDate = new Date(expiredIn);

  if (Number.isNaN(expirationDate.getTime())) {
    clearSession();
    return false;
  }

  const isExpired = expirationDate.getTime() <= Date.now();

  if (isExpired) {
    clearSession();
    return false;
  }

  return true;
}
