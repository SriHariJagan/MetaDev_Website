import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(originalRequest);
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: { page: number; limit: number; total: number; totalPages: number };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  status: string;
  isSuperAdmin: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  userModules?: UserModule[];
}

export interface UserModule {
  id: string;
  module: { id: string; code: string; name: string };
  role: { id: string; name: string };
  status: string;
  expiresAt: string | null;
  assignedAt: string;
}

export interface Module {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: string;
}

export interface Plan {
  id: string;
  moduleId: string;
  name: string;
  code: string;
  description: string | null;
  price: number;
  currency: string;
  billingInterval: string;
  trialDays: number;
  status: string;
  module?: Module;
}

export interface Subscription {
  id: string;
  organizationId: string;
  moduleId: string;
  planId: string;
  status: string;
  startsAt: string;
  endsAt: string | null;
  trialEndsAt: string | null;
  autoRenew: boolean;
  organization?: Organization;
  module?: Module;
  plan?: Plan;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  status: string;
}

export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  resource: string;
  resourceId: string | null;
  module: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  user?: { id: string; email: string; firstName: string; lastName: string };
}

export interface Job {
  id: string;
  moduleId: string | null;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  employmentType: string;
  status: string;
  publishedAt: string | null;
  createdBy: string;
  createdAt: string;
  module?: Module;
  _count?: { applications: number };
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ accessToken: string; refreshToken: string; user: User }>>('/auth/login', { email, password }),
  refresh: (refreshToken: string) =>
    api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>('/auth/refresh', { refreshToken }),
  logout: () => api.post<ApiResponse<null>>('/auth/logout'),
  me: () => api.get<ApiResponse<User>>('/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post<ApiResponse<null>>('/auth/change-password', { currentPassword, newPassword }),
  forgotPassword: (email: string) =>
    api.post<ApiResponse<null>>('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post<ApiResponse<null>>('/auth/reset-password', { token, password }),
};

// Users
export const usersApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<User[]>>('/admin/users', { params }),
  get: (id: string) => api.get<ApiResponse<User>>(`/admin/users/${id}`),
  create: (data: Record<string, unknown>) =>
    api.post<ApiResponse<User>>('/admin/users', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch<ApiResponse<User>>(`/admin/users/${id}`, data),
  updateStatus: (id: string, status: string) =>
    api.patch<ApiResponse<User>>(`/admin/users/${id}/status`, { status }),
  resetPassword: (id: string, password: string) =>
    api.post<ApiResponse<null>>(`/admin/users/${id}/reset-password`, { password }),
  delete: (id: string) => api.delete<ApiResponse<null>>(`/admin/users/${id}`),
  getModules: (id: string) =>
    api.get<ApiResponse<UserModule[]>>(`/admin/users/${id}/modules`),
  assignModule: (id: string, data: { moduleCode: string; roleCode: string }) =>
    api.post<ApiResponse<UserModule>>(`/admin/users/${id}/modules`, data),
  removeModule: (id: string, moduleId: string) =>
    api.delete<ApiResponse<null>>(`/admin/users/${id}/modules/${moduleId}`),
};

// Modules
export const modulesApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Module[]>>('/admin/modules', { params }),
  get: (id: string) => api.get<ApiResponse<Module>>(`/admin/modules/${id}`),
  create: (data: Record<string, unknown>) =>
    api.post<ApiResponse<Module>>('/admin/modules', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch<ApiResponse<Module>>(`/admin/modules/${id}`, data),
};

// Organizations
export const organizationsApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Organization[]>>('/admin/organizations', { params }),
  get: (id: string) => api.get<ApiResponse<Organization>>(`/admin/organizations/${id}`),
  create: (data: Record<string, unknown>) =>
    api.post<ApiResponse<Organization>>('/admin/organizations', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch<ApiResponse<Organization>>(`/admin/organizations/${id}`, data),
};

// Plans
export const plansApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Plan[]>>('/admin/plans', { params }),
  get: (id: string) => api.get<ApiResponse<Plan>>(`/admin/plans/${id}`),
  create: (data: Record<string, unknown>) =>
    api.post<ApiResponse<Plan>>('/admin/plans', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch<ApiResponse<Plan>>(`/admin/plans/${id}`, data),
};

// Subscriptions
export const subscriptionsApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Subscription[]>>('/admin/subscriptions', { params }),
  get: (id: string) => api.get<ApiResponse<Subscription>>(`/admin/subscriptions/${id}`),
  create: (data: Record<string, unknown>) =>
    api.post<ApiResponse<Subscription>>('/admin/subscriptions', data),
  cancel: (id: string) => api.post<ApiResponse<Subscription>>(`/admin/subscriptions/${id}/cancel`),
  renew: (id: string) => api.post<ApiResponse<Subscription>>(`/admin/subscriptions/${id}/renew`),
};

// Jobs
export const jobsApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<Job[]>>('/admin/jobs', { params }),
  get: (id: string) => api.get<ApiResponse<Job>>(`/admin/jobs/${id}`),
  create: (data: Record<string, unknown>) =>
    api.post<ApiResponse<Job>>('/admin/jobs', data),
  update: (id: string, data: Record<string, unknown>) =>
    api.patch<ApiResponse<Job>>(`/admin/jobs/${id}`, data),
  updateStatus: (id: string, status: string) =>
    api.patch<ApiResponse<Job>>(`/admin/jobs/${id}/status`, { status }),
  delete: (id: string) => api.delete<ApiResponse<null>>(`/admin/jobs/${id}`),
};

// Audit
export const auditApi = {
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<AuditLog[]>>('/admin/audit', { params }),
};

// Contact
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  product: string | null;
  status: string;
  read: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export const contactApi = {
  submit: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    product?: string;
  }) => api.post<ApiResponse<ContactSubmission>>('/contact', data),
  list: (params?: Record<string, string>) =>
    api.get<ApiResponse<ContactSubmission[]>>('/admin/contact', { params }),
  get: (id: string) => api.get<ApiResponse<ContactSubmission>>(`/admin/contact/${id}`),
  update: (id: string, data: { status?: string; read?: boolean; notes?: string }) =>
    api.patch<ApiResponse<ContactSubmission>>(`/admin/contact/${id}`, data),
  markRead: (id: string) =>
    api.patch<ApiResponse<ContactSubmission>>(`/admin/contact/${id}/read`),
  unreadCount: () =>
    api.get<ApiResponse<{ count: number }>>('/admin/contact/unread-count'),
  delete: (id: string) => api.delete<ApiResponse<null>>(`/admin/contact/${id}`),
};

export default api;
