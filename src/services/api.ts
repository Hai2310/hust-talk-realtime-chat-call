import { User, Conversation, Message, Attachment } from '../types';

export const api = {
  async getMe(): Promise<User> {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    return data.user;
  },

  async switchDemoUser(userId: string): Promise<User> {
    const res = await fetch('/api/auth/switch-demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    return data.user;
  },

  async login(email: string): Promise<User> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.user;
  },

  async loginWithGoogle(info: { email: string; name?: string; avatar?: string }): Promise<User> {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    return data.user;
  },

  async register(info: { name: string; email: string; mssv: string; faculty?: string; id?: string }): Promise<User> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Registration failed');
    }
    return data.user;
  },

  async getUsers(): Promise<User[]> {
    const res = await fetch('/api/users');
    const data = await res.json();
    return data.users;
  },

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const res = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    return data.user;
  },

  async getConversations(userId?: string): Promise<Conversation[]> {
    const url = userId ? `/api/conversations?userId=${userId}` : '/api/conversations';
    const res = await fetch(url);
    const data = await res.json();
    return data.conversations;
  },

  async createDirectConversation(targetUserId: string): Promise<Conversation> {
    const res = await fetch('/api/conversations/direct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUserId }),
    });
    const data = await res.json();
    return data.conversation;
  },

  async createGroupConversation(name: string, description: string, memberIds: string[]): Promise<Conversation> {
    const res = await fetch('/api/conversations/group', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, memberIds }),
    });
    const data = await res.json();
    return data.conversation;
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const res = await fetch(`/api/conversations/${conversationId}/messages`);
    const data = await res.json();
    return data.messages;
  },

  async sendMessage(
    conversationId: string,
    content: string,
    type: 'text' | 'image' | 'file' | 'audio' = 'text',
    attachments?: Attachment[],
    replyTo?: { id: string; senderName: string; content: string }
  ): Promise<Message> {
    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, type, attachments, replyTo }),
    });
    const data = await res.json();
    return data.message;
  },

  async toggleReaction(messageId: string, emoji: string) {
    const res = await fetch(`/api/messages/${messageId}/reaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji }),
    });
    return res.json();
  },

  async togglePin(messageId: string) {
    const res = await fetch(`/api/messages/${messageId}/pin`, {
      method: 'POST',
    });
    return res.json();
  },

  async deleteMessage(messageId: string) {
    const res = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  async uploadFile(file: File | Blob, filename?: string): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file, filename || (file instanceof File ? file.name : 'audio-note.webm'));

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.attachment;
  },

  async getCallHistory() {
    const res = await fetch('/api/calls/history');
    return res.json();
  },
};
