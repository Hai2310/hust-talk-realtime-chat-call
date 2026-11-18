export type UserStatus = 'online' | 'away' | 'busy' | 'offline';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mssv?: string; // Student ID (Mã số sinh viên HUST, e.g., 20210001)
  faculty?: string; // e.g., Trường CNTT & TT, Điện - Điện tử
  bio?: string;
  status: UserStatus;
  statusMessage?: string;
  lastSeen?: string;
  role?: 'student' | 'lecturer' | 'admin';
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: 'image' | 'video' | 'audio' | 'document' | 'file';
  mimeType: string;
}

export interface Reaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'call_log' | 'system';
  attachments?: Attachment[];
  replyTo?: {
    id: string;
    senderName: string;
    content: string;
  };
  reactions?: Reaction[];
  isPinned?: boolean;
  isEdited?: boolean;
  createdAt: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export type ConversationType = 'direct' | 'group';

export interface ConversationMember {
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  avatar?: string;
  description?: string;
  createdBy: string;
  members: ConversationMember[];
  lastMessage?: Message;
  unreadCount?: number;
  isPinned?: boolean;
  isMuted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CallSession {
  id: string;
  conversationId: string;
  type: 'audio' | 'video';
  caller: User;
  receiver: User;
  status: 'calling' | 'connected' | 'ended' | 'rejected' | 'missed';
  startTime?: string;
  endTime?: string;
  duration?: number; // seconds
}

export interface GroupRoomState {
  roomId: string;
  roomName: string;
  initiator: User;
  participants: {
    user: User;
    audioEnabled: boolean;
    videoEnabled: boolean;
    screenSharing: boolean;
  }[];
}
