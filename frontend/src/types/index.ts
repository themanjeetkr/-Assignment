export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placements: string;
  courses: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type SavedCollege = {
  id: number;
  college: College;
  createdAt?: string;
};

export type ApiError = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};
