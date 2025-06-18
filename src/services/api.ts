import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// Use the temporary backend URL provided earlier
// TODO: Make this configurable via environment variables for production
const API_BASE_URL = 'https://8000-igrfjqcsguksnbqmduoge-98bd9c5f.manusvm.computer';

// --- Interface Definitions (align with backend schemas.py) ---
interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface UserResponse {
  id: number;
  email: string;
  created_at: string; // Assuming ISO string format
}

// Add Email interfaces based on schemas.py
interface EmailMessageBase {
    sender: string;
    recipient: string;
    subject?: string | null;
    body_text?: string | null;
    body_html?: string | null;
    folder: string;
    is_read: boolean;
    is_draft: boolean;
    is_sent_by_user: boolean;
    message_id?: string | null;
    thread_id?: string | null;
}

export interface EmailMessage extends EmailMessageBase {
    id: number;
    owner_id: number;
    received_at: string; // Assuming ISO string format
    sent_at?: string | null; // Assuming ISO string format
}

interface EmailSendRequest {
    recipient: string;
    subject: string;
    body_text: string;
    body_html?: string | null;
}

interface EmailStatusUpdate {
    is_read?: boolean;
    folder?: string;
}

// --- API Client Setup ---
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Set Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    console.error('API request error:', error.response?.data || error.message || error);
    return Promise.reject(error);
  }
);

// --- Authentication API Functions ---
export const loginUser = async (credentials: any): Promise<TokenResponse> => {
  const response = await apiClient.post<TokenResponse>('/auth/token', new URLSearchParams(credentials), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (response.data.access_token) {
    localStorage.setItem('authToken', response.data.access_token);
  }
  return response.data;
};

export const registerUser = async (userData: any): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/auth/register', userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/auth/users/me');
  return response.data;
};

// --- Email API Functions ---
export const getEmails = async (params?: { folder?: string; is_read?: boolean; skip?: number; limit?: number }): Promise<EmailMessage[]> => {
    const response = await apiClient.get<EmailMessage[]>('/emails/', { params });
    return response.data;
};

export const getEmailById = async (emailId: number): Promise<EmailMessage> => {
    const response = await apiClient.get<EmailMessage>(`/emails/${emailId}`);
    return response.data;
};

export const createEmail = async (emailData: Partial<EmailMessageBase>): Promise<EmailMessage> => {
    const response = await apiClient.post<EmailMessage>('/emails/', emailData);
    return response.data;
};

export const updateEmailStatus = async (emailId: number, updateData: EmailStatusUpdate): Promise<EmailMessage> => {
    const response = await apiClient.patch<EmailMessage>(`/emails/${emailId}`, updateData);
    return response.data;
};

export const deleteEmail = async (emailId: number): Promise<void> => {
    await apiClient.delete(`/emails/${emailId}`);
};

export const sendEmail = async (emailData: EmailSendRequest): Promise<EmailMessage> => {
    const response = await apiClient.post<EmailMessage>('/emails/send', emailData);
    return response.data;
};

// --- Add other API functions here (documents, programs, search, ai) ---

export default apiClient;
