import express, { Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS allowing dev preview
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingInterval: 10000,
  pingTimeout: 5000,
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure uploads folder exists
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Multer storage for uploaded files and audio voice notes
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// ==========================================
// In-Memory Database (Seeded with HUST Data)
// ==========================================

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mssv?: string;
  faculty?: string;
  bio?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  statusMessage?: string;
  lastSeen?: string;
  role?: 'student' | 'lecturer' | 'admin';
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: 'image' | 'video' | 'audio' | 'document' | 'file';
  mimeType: string;
}

interface Reaction {
  emoji: string;
  userId: string;
  userName: string;
}

interface Message {
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

interface ConversationMember {
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
}

interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name: string;
  avatar?: string;
  description?: string;
  createdBy: string;
  members: ConversationMember[];
  isPinned?: boolean;
  isMuted?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CallRecord {
  id: string;
  conversationId: string;
  callerId: string;
  receiverId?: string;
  type: 'audio' | 'video';
  status: 'completed' | 'missed' | 'rejected';
  duration: number; // in seconds
  createdAt: string;
}

// Initial HUST Users
const users: User[] = [
  {
    id: 'user-1',
    name: 'Minh Hải',
    email: 'minhhaiit1k68@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    mssv: '20235678',
    faculty: 'Trường CNTT & TT (SoICT)',
    bio: 'K68 CNTT Việt-Nhật HUST. Đam mê WebRTC, Hệ thống phân tán & AI.',
    status: 'online',
    statusMessage: 'Đang làm bài tập lớn Mạng máy tính 💻',
    role: 'student',
  },
  {
    id: 'user-2',
    name: 'Thu Trang',
    email: 'trang.nt221456@sis.hust.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    mssv: '20221456',
    faculty: 'Khoa Kỹ thuật Y sinh (BME)',
    bio: 'K67 Kỹ thuật Y sinh. Cùng trao đổi tài liệu nghiên cứu nha!',
    status: 'online',
    statusMessage: 'Thực hành tại Lab C9 🔬',
    role: 'student',
  },
  {
    id: 'user-3',
    name: 'Đức Anh',
    email: 'anh.nd233112@sis.hust.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mssv: '20233112',
    faculty: 'Trường Điện - Điện tử (SEEE)',
    bio: 'K68 Điện tử Viễn thông. Thích vi điều khiển IoT và lập trình nhúng.',
    status: 'away',
    statusMessage: 'Vừa lên thư viện Tạ Quang Bửu',
    role: 'student',
  },
  {
    id: 'user-4',
    name: 'Lê Hoàng',
    email: 'hoang.lv214980@sis.hust.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    mssv: '20214980',
    faculty: 'Trường Cơ khí (SME)',
    bio: 'K66 Kỹ thuật Cơ điện tử. Trưởng nhóm Robocon Bách Khoa.',
    status: 'busy',
    statusMessage: 'Đang gia công tại xưởng C1 ⚙️',
    role: 'student',
  },
  {
    id: 'user-5',
    name: 'PGS. TS. Nguyễn Văn Dũng',
    email: 'dung.nv@hust.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    mssv: 'GV-201088',
    faculty: 'Trường CNTT & TT (SoICT)',
    bio: 'Giảng viên Bộ môn Hệ thống máy tính & Truyền thông dữ liệu.',
    status: 'online',
    statusMessage: 'Tiếp sinh viên tại phòng 402 - B1',
    role: 'lecturer',
  },
];

// Initial Conversations
const conversations: Conversation[] = [
  {
    id: 'conv-group-1',
    type: 'group',
    name: 'K68 - Lập trình Mạng & Phân tán',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    description: 'Nhóm thảo luận học tập học phần IT4060 - Học kỳ 2024.2 Bách Khoa',
    createdBy: 'user-1',
    members: [
      { userId: 'user-1', role: 'owner', joinedAt: new Date(Date.now() - 86400000 * 5).toISOString() },
      { userId: 'user-2', role: 'admin', joinedAt: new Date(Date.now() - 86400000 * 5).toISOString() },
      { userId: 'user-3', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
      { userId: 'user-4', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
      { userId: 'user-5', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
    ],
    isPinned: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'conv-direct-1',
    type: 'direct',
    name: 'Thu Trang',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdBy: 'user-1',
    members: [
      { userId: 'user-1', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
      { userId: 'user-2', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 3).toISOString() },
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'conv-direct-2',
    type: 'direct',
    name: 'PGS. TS. Nguyễn Văn Dũng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    createdBy: 'user-5',
    members: [
      { userId: 'user-1', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
      { userId: 'user-5', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'conv-group-2',
    type: 'group',
    name: 'Robocon & Nghiên cứu HUST 🤖',
    avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80',
    description: 'Đội tuyển công nghệ sáng tạo Bách Khoa',
    createdBy: 'user-4',
    members: [
      { userId: 'user-1', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 10).toISOString() },
      { userId: 'user-3', role: 'member', joinedAt: new Date(Date.now() - 86400000 * 10).toISOString() },
      { userId: 'user-4', role: 'owner', joinedAt: new Date(Date.now() - 86400000 * 10).toISOString() },
    ],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

// Initial Messages
const messages: Message[] = [
  // Messages in K68 Group
  {
    id: 'msg-g1-1',
    conversationId: 'conv-group-1',
    senderId: 'user-5',
    senderName: 'PGS. TS. Nguyễn Văn Dũng',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    content: 'Chào các em sinh viên K68! Đề cương bài tập lớn và tài liệu WebRTC đã được cập nhật. Hạn nộp báo cáo tiến độ tuần 10 nhé.',
    type: 'text',
    isPinned: true,
    reactions: [
      { emoji: '❤️', userId: 'user-1', userName: 'Minh Hải' },
      { emoji: '👍', userId: 'user-2', userName: 'Thu Trang' },
      { emoji: '🔥', userId: 'user-3', userName: 'Đức Anh' },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'read',
  },
  {
    id: 'msg-g1-2',
    conversationId: 'conv-group-1',
    senderId: 'user-1',
    senderName: 'Minh Hải',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'Thầy cho chúng em hỏi về cấu hình STUN/TURN server khi triển khai qua Docker VPS được không ạ?',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: 'read',
  },
  {
    id: 'msg-g1-3',
    conversationId: 'conv-group-1',
    senderId: 'user-2',
    senderName: 'Thu Trang',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content: 'Nhóm mình vừa chạy thử WebRTC gọi video 1-1 trên HustMess cực kỳ mượt mà luôn, trễ chỉ dưới 40ms!',
    type: 'text',
    reactions: [{ emoji: '🎉', userId: 'user-1', userName: 'Minh Hải' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'read',
  },
  {
    id: 'msg-g1-4',
    conversationId: 'conv-group-1',
    senderId: 'user-3',
    senderName: 'Đức Anh',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'Tối nay 20h cả nhóm họp trực tuyến qua phòng họp video HustMess để chốt slide thuyết trình nhé mọi người! 🚀',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'read',
  },

  // Messages in Direct Chat with Thu Trang
  {
    id: 'msg-d1-1',
    conversationId: 'conv-direct-1',
    senderId: 'user-2',
    senderName: 'Thu Trang',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content: 'Hải ơi, cậu xem giúp tớ phần mô hình thuật toán xử lý tín hiệu ECG này với nhé!',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'read',
  },
  {
    id: 'msg-d1-2',
    conversationId: 'conv-direct-1',
    senderId: 'user-1',
    senderName: 'Minh Hải',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'Oke Trang, gửi tớ file qua đây luôn nhé. Hoặc gọi video call chia sẻ màn hình xem trực tiếp luôn cho tiện!',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'read',
  },
  {
    id: 'msg-d1-3',
    conversationId: 'conv-direct-1',
    senderId: 'user-2',
    senderName: 'Thu Trang',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content: 'Tuyệt vời, tớ gọi video call ngay nhé!',
    type: 'text',
    reactions: [{ emoji: '❤️', userId: 'user-1', userName: 'Minh Hải' }],
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'read',
  },

  // Messages with PGS. TS. Dũng
  {
    id: 'msg-d2-1',
    conversationId: 'conv-direct-2',
    senderId: 'user-5',
    senderName: 'PGS. TS. Nguyễn Văn Dũng',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    content: 'Thầy đã xem qua bản thiết kế kiến trúc hệ thống HustMess của em. Ý tưởng sử dụng WebRTC kết hợp Socket.IO signaling rất chuẩn xác. Chúc em hoàn thành xuất sắc!',
    type: 'text',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: 'read',
  },
];

// Call History
const callRecords: CallRecord[] = [
  {
    id: 'call-1',
    conversationId: 'conv-direct-1',
    callerId: 'user-2',
    receiverId: 'user-1',
    type: 'video',
    status: 'completed',
    duration: 345, // 5m45s
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'call-2',
    conversationId: 'conv-direct-1',
    callerId: 'user-1',
    receiverId: 'user-2',
    type: 'audio',
    status: 'completed',
    duration: 120,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// Active user tracking
let currentActiveUserId = 'user-1';

// Socket mapping: userId -> Set of socketIds
const userSockets = new Map<string, Set<string>>();
// Socket to userId mapping
const socketToUser = new Map<string, string>();

// ==========================================
// REST API Routes
// ==========================================

// Current authenticated user
app.get('/api/auth/me', (_req: Request, res: Response) => {
  const user = users.find((u) => u.id === currentActiveUserId) || users[0];
  res.json({ success: true, user });
});

// Real Google Authentication
app.post('/api/auth/google', (req: Request, res: Response) => {
  const { email, name, avatar } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const cleanEmail = String(email).toLowerCase().trim();
  let user = users.find((u) => u.email.toLowerCase() === cleanEmail);

  if (user) {
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    user.status = 'online';
  } else {
    // Register real user from Google profile
    const googleId = cleanEmail.split('@')[0] || `google-${Date.now()}`;
    user = {
      id: googleId,
      name: name || cleanEmail.split('@')[0],
      email: cleanEmail,
      avatar:
        avatar ||
        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      mssv: cleanEmail.includes('hust') || cleanEmail.includes('sis') ? '20235678' : googleId,
      faculty: 'Đại học Bách khoa Hà Nội',
      bio: `Tài khoản Google API đã xác thực (ID: ${googleId})`,
      status: 'online',
      role: 'student',
    };
    users.push(user);

    // Add user to existing group chats so they can immediately participate
    conversations.forEach((conv) => {
      if (conv.type === 'group' && !conv.members.some((m) => m.userId === user!.id)) {
        conv.members.push({
          userId: user!.id,
          role: 'member',
          joinedAt: new Date().toISOString(),
        });
      }
    });
  }

  currentActiveUserId = user.id;
  res.json({ success: true, user, token: `google-jwt-${user.id}` });
});

// Demo switch user (to effortlessly test 2 users in real time)
app.post('/api/auth/switch-demo', (req: Request, res: Response) => {
  const { userId } = req.body;
  const found = users.find((u) => u.id === userId);
  if (found) {
    currentActiveUserId = found.id;
    return res.json({ success: true, user: found });
  }
  return res.status(404).json({ error: 'User not found' });
});

// Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === (email || '').toLowerCase()) || users[0];
  currentActiveUserId = user.id;
  res.json({ success: true, user, token: `jwt-token-${user.id}` });
});

// Register: Bắt buộc phải có Tên và ID (MSSV)
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, mssv, faculty, id: customId } = req.body;

  if (!name || !String(name).trim() || !mssv || !String(mssv).trim()) {
    return res.status(400).json({ error: 'Họ tên và Mã ID/MSSV là bắt buộc khi đăng ký tài khoản.' });
  }

  const cleanName = String(name).trim();
  const cleanMssv = String(mssv).trim();
  const cleanId = String(customId || cleanMssv).trim();

  // Kiểm tra trùng ID hoặc email nếu cần, hoặc tái sử dụng
  const existingUser = users.find((u) => u.id === cleanId || (u.mssv && u.mssv === cleanMssv));
  if (existingUser) {
    existingUser.name = cleanName;
    if (email) existingUser.email = String(email).trim();
    currentActiveUserId = existingUser.id;
    return res.json({ success: true, user: existingUser, token: `jwt-token-${existingUser.id}` });
  }

  const newUser: User = {
    id: cleanId,
    name: cleanName,
    email: (email ? String(email).trim() : `${cleanMssv}@sis.hust.edu.vn`),
    avatar: `https://images.unsplash.com/photo-${1534528741775 + (users.length % 5)}?w=150&auto=format&fit=crop&q=80`,
    mssv: cleanMssv,
    faculty: faculty || 'Trường CNTT & TT',
    bio: `Sinh viên Đại học Bách khoa Hà Nội (ID: ${cleanMssv})`,
    status: 'online',
    role: 'student',
  };
  users.push(newUser);

  // Thêm thành viên vào các nhóm thảo luận mặc định
  conversations.forEach((conv) => {
    if (conv.type === 'group' && !conv.members.some((m) => m.userId === newUser.id)) {
      conv.members.push({
        userId: newUser.id,
        role: 'member',
        joinedAt: new Date().toISOString(),
      });
    }
  });

  currentActiveUserId = newUser.id;
  res.json({ success: true, user: newUser, token: `jwt-token-${newUser.id}` });
});

// Get all users
app.get('/api/users', (_req: Request, res: Response) => {
  res.json({ success: true, users });
});

// Update profile
app.put('/api/users/profile', (req: Request, res: Response) => {
  const { name, bio, statusMessage, status, faculty } = req.body;
  const userIndex = users.findIndex((u) => u.id === currentActiveUserId);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name: name ?? users[userIndex].name,
      bio: bio ?? users[userIndex].bio,
      statusMessage: statusMessage ?? users[userIndex].statusMessage,
      status: status ?? users[userIndex].status,
      faculty: faculty ?? users[userIndex].faculty,
    };
    io.emit('presence:update', { userId: users[userIndex].id, status: users[userIndex].status });
    return res.json({ success: true, user: users[userIndex] });
  }
  res.status(404).json({ error: 'User not found' });
});

// Get conversations for current user
app.get('/api/conversations', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || currentActiveUserId;
  const userConvs = conversations.filter((c) => c.members.some((m) => m.userId === userId));

  // Attach last message and dynamic name for direct chats
  const results = userConvs.map((conv) => {
    const convMsgs = messages.filter((m) => m.conversationId === conv.id);
    const lastMsg = convMsgs[convMsgs.length - 1];

    let displayName = conv.name;
    let displayAvatar = conv.avatar;
    let otherUser: User | undefined;

    if (conv.type === 'direct') {
      const otherMember = conv.members.find((m) => m.userId !== userId);
      if (otherMember) {
        otherUser = users.find((u) => u.id === otherMember.userId);
        if (otherUser) {
          displayName = otherUser.name;
          displayAvatar = otherUser.avatar;
        }
      }
    }

    return {
      ...conv,
      name: displayName,
      avatar: displayAvatar,
      lastMessage: lastMsg,
      otherUser,
      unreadCount: 0,
    };
  });

  res.json({ success: true, conversations: results });
});

// Create new direct conversation or get existing
app.post('/api/conversations/direct', (req: Request, res: Response) => {
  const { targetUserId } = req.body;
  const myUserId = currentActiveUserId;

  if (!targetUserId || targetUserId === myUserId) {
    return res.status(400).json({ error: 'Invalid target user' });
  }

  // Check if direct conversation already exists
  const existing = conversations.find(
    (c) =>
      c.type === 'direct' &&
      c.members.some((m) => m.userId === myUserId) &&
      c.members.some((m) => m.userId === targetUserId)
  );

  if (existing) {
    return res.json({ success: true, conversation: existing });
  }

  const targetUser = users.find((u) => u.id === targetUserId);
  const newConv: Conversation = {
    id: `conv-direct-${Date.now()}`,
    type: 'direct',
    name: targetUser?.name || 'Trò chuyện',
    avatar: targetUser?.avatar,
    createdBy: myUserId,
    members: [
      { userId: myUserId, role: 'member', joinedAt: new Date().toISOString() },
      { userId: targetUserId, role: 'member', joinedAt: new Date().toISOString() },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  conversations.unshift(newConv);
  io.emit('conversation:new', newConv);
  res.json({ success: true, conversation: newConv });
});

// Create group conversation
app.post('/api/conversations/group', (req: Request, res: Response) => {
  const { name, description, memberIds } = req.body;
  const myUserId = currentActiveUserId;

  const allMemberIds = Array.from(new Set([myUserId, ...(memberIds || [])]));

  const newGroup: Conversation = {
    id: `conv-group-${Date.now()}`,
    type: 'group',
    name: name || 'Nhóm Bách Khoa mới',
    description: description || 'Nhóm thảo luận học tập & nghiên cứu',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
    createdBy: myUserId,
    members: allMemberIds.map((id) => ({
      userId: id,
      role: id === myUserId ? 'owner' : 'member',
      joinedAt: new Date().toISOString(),
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  conversations.unshift(newGroup);

  // Add initial system message
  const creator = users.find((u) => u.id === myUserId);
  const welcomeMsg: Message = {
    id: `msg-${Date.now()}`,
    conversationId: newGroup.id,
    senderId: 'system',
    senderName: 'HustMess Bot',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: `${creator?.name || 'Thành viên'} đã tạo nhóm "${newGroup.name}". Chúc mọi người học tập và trao đổi hiệu quả!`,
    type: 'system',
    createdAt: new Date().toISOString(),
  };
  messages.push(welcomeMsg);

  io.emit('conversation:new', newGroup);
  res.json({ success: true, conversation: newGroup });
});

// Get messages of a conversation
app.get('/api/conversations/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const convMsgs = messages.filter((m) => m.conversationId === id);
  res.json({ success: true, messages: convMsgs });
});

// Send message
app.post('/api/conversations/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, type, attachments, replyTo } = req.body;
  const sender = users.find((u) => u.id === currentActiveUserId) || users[0];

  const newMsg: Message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    conversationId: id,
    senderId: sender.id,
    senderName: sender.name,
    senderAvatar: sender.avatar,
    content: content || '',
    type: type || 'text',
    attachments,
    replyTo,
    createdAt: new Date().toISOString(),
    status: 'sent',
  };

  messages.push(newMsg);

  // Update conversation updatedAt
  const conv = conversations.find((c) => c.id === id);
  if (conv) {
    conv.updatedAt = newMsg.createdAt;
  }

  // Broadcast to all participants via Socket.io
  io.to(id).emit('message:new', newMsg);
  io.emit('conversation:updated', { conversationId: id, lastMessage: newMsg });

  res.json({ success: true, message: newMsg });
});

// Add reaction
app.post('/api/messages/:id/reaction', (req: Request, res: Response) => {
  const { id } = req.params;
  const { emoji } = req.body;
  const user = users.find((u) => u.id === currentActiveUserId) || users[0];

  const msg = messages.find((m) => m.id === id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });

  if (!msg.reactions) msg.reactions = [];

  const existingIdx = msg.reactions.findIndex((r) => r.userId === user.id && r.emoji === emoji);
  if (existingIdx !== -1) {
    msg.reactions.splice(existingIdx, 1);
  } else {
    msg.reactions.push({ emoji, userId: user.id, userName: user.name });
  }

  io.to(msg.conversationId).emit('message:reaction_updated', {
    messageId: msg.id,
    reactions: msg.reactions,
  });

  res.json({ success: true, reactions: msg.reactions });
});

// Pin/unpin message
app.post('/api/messages/:id/pin', (req: Request, res: Response) => {
  const { id } = req.params;
  const msg = messages.find((m) => m.id === id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });

  msg.isPinned = !msg.isPinned;
  io.to(msg.conversationId).emit('message:pin_updated', {
    messageId: msg.id,
    isPinned: msg.isPinned,
  });

  res.json({ success: true, isPinned: msg.isPinned });
});

// Delete message
app.delete('/api/messages/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = messages.findIndex((m) => m.id === id);
  if (idx !== -1) {
    const convId = messages[idx].conversationId;
    messages.splice(idx, 1);
    io.to(convId).emit('message:deleted', { messageId: id });
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Message not found' });
});

// Upload endpoint (images, audio notes, docs)
app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const url = `/uploads/${req.file.filename}`;
  const mime = req.file.mimetype;
  let type: 'image' | 'video' | 'audio' | 'document' | 'file' = 'file';

  if (mime.startsWith('image/')) type = 'image';
  else if (mime.startsWith('video/')) type = 'video';
  else if (mime.startsWith('audio/')) type = 'audio';
  else if (mime.includes('pdf') || mime.includes('word') || mime.includes('text')) type = 'document';

  const attachment: Attachment = {
    id: `att-${Date.now()}`,
    name: req.file.originalname,
    url,
    size: req.file.size,
    type,
    mimeType: mime,
  };

  res.json({ success: true, attachment });
});

// Call history
app.get('/api/calls/history', (_req: Request, res: Response) => {
  const enriched = callRecords.map((c) => {
    const caller = users.find((u) => u.id === c.callerId);
    const receiver = users.find((u) => u.id === c.receiverId);
    return { ...c, caller, receiver };
  });
  res.json({ success: true, calls: enriched });
});

// Add contact
app.post('/api/contacts/add', (req: Request, res: Response) => {
  const { userId } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, contact: user });
});

// ==========================================
// Socket.IO Real-time & WebRTC Signaling
// ==========================================

io.on('connection', (socket) => {
  // Associate socket with user
  socket.on('auth:join', ({ userId }) => {
    if (!userId) return;
    socketToUser.set(socket.id, userId);

    if (!userSockets.has(userId)) {
      userSockets.set(userId, new Set());
    }
    userSockets.get(userId)!.add(socket.id);

    // Update user status to online
    const user = users.find((u) => u.id === userId);
    if (user && user.status === 'offline') {
      user.status = 'online';
    }

    io.emit('presence:update', { userId, status: 'online' });
  });

  // Join a conversation room for real-time messages & typing
  socket.on('conversation:join', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('conversation:leave', (conversationId) => {
    socket.leave(conversationId);
  });

  // Typing indicators
  socket.on('typing:start', ({ conversationId, userId, userName }) => {
    socket.to(conversationId).emit('typing:started', { conversationId, userId, userName });
  });

  socket.on('typing:stop', ({ conversationId, userId }) => {
    socket.to(conversationId).emit('typing:stopped', { conversationId, userId });
  });

  // ------------------------------------------
  // WebRTC 1:1 Call Signaling
  // ------------------------------------------

  // User A initiates call to User B
  socket.on('call:invite', ({ targetUserId, callType, conversationId, callId }) => {
    const callerUserId = socketToUser.get(socket.id) || currentActiveUserId;
    const caller = users.find((u) => u.id === callerUserId);

    const targetSocketSet = userSockets.get(targetUserId);
    if (targetSocketSet && targetSocketSet.size > 0) {
      targetSocketSet.forEach((sockId) => {
        io.to(sockId).emit('call:incoming', {
          callId: callId || `call-${Date.now()}`,
          caller,
          callType: callType || 'video',
          conversationId,
        });
      });
    } else {
      // Recipient is offline
      socket.emit('call:failed', { reason: 'offline' });
    }
  });

  // User B accepts the call
  socket.on('call:accept', ({ callId, callerUserId }) => {
    const calleeUserId = socketToUser.get(socket.id) || currentActiveUserId;
    const callee = users.find((u) => u.id === calleeUserId);

    const callerSockets = userSockets.get(callerUserId);
    if (callerSockets) {
      callerSockets.forEach((sockId) => {
        io.to(sockId).emit('call:accepted', { callId, callee });
      });
    }
  });

  // User B rejects the call
  socket.on('call:reject', ({ callId, callerUserId }) => {
    const callerSockets = userSockets.get(callerUserId);
    if (callerSockets) {
      callerSockets.forEach((sockId) => {
        io.to(sockId).emit('call:rejected', { callId });
      });
    }
  });

  // Either party ends the call
  socket.on('call:end', ({ targetUserId, callId, duration, callType, conversationId }) => {
    const callerUserId = socketToUser.get(socket.id) || currentActiveUserId;

    // Save call record
    callRecords.unshift({
      id: callId || `call-${Date.now()}`,
      conversationId: conversationId || 'conv-direct-1',
      callerId: callerUserId,
      receiverId: targetUserId,
      type: callType || 'audio',
      status: 'completed',
      duration: duration || 0,
      createdAt: new Date().toISOString(),
    });

    const targetSockets = userSockets.get(targetUserId);
    if (targetSockets) {
      targetSockets.forEach((sockId) => {
        io.to(sockId).emit('call:ended', { callId });
      });
    }
  });

  // WebRTC SDP Offer exchange
  socket.on('webrtc:offer', ({ targetUserId, sdp }) => {
    const senderUserId = socketToUser.get(socket.id) || currentActiveUserId;
    const targetSockets = userSockets.get(targetUserId);
    if (targetSockets) {
      targetSockets.forEach((sockId) => {
        io.to(sockId).emit('webrtc:offer', { sdp, fromUserId: senderUserId });
      });
    }
  });

  // WebRTC SDP Answer exchange
  socket.on('webrtc:answer', ({ targetUserId, sdp }) => {
    const senderUserId = socketToUser.get(socket.id) || currentActiveUserId;
    const targetSockets = userSockets.get(targetUserId);
    if (targetSockets) {
      targetSockets.forEach((sockId) => {
        io.to(sockId).emit('webrtc:answer', { sdp, fromUserId: senderUserId });
      });
    }
  });

  // WebRTC ICE Candidate exchange
  socket.on('webrtc:ice-candidate', ({ targetUserId, candidate }) => {
    const senderUserId = socketToUser.get(socket.id) || currentActiveUserId;
    const targetSockets = userSockets.get(targetUserId);
    if (targetSockets) {
      targetSockets.forEach((sockId) => {
        io.to(sockId).emit('webrtc:ice-candidate', { candidate, fromUserId: senderUserId });
      });
    }
  });

  // ------------------------------------------
  // Group Video Conference Room Signaling
  // ------------------------------------------

  socket.on('group-room:join', ({ roomId, user }) => {
    socket.join(`room:${roomId}`);
    socket.to(`room:${roomId}`).emit('group-room:user-joined', { socketId: socket.id, user });
  });

  socket.on('group-room:leave', ({ roomId }) => {
    socket.leave(`room:${roomId}`);
    socket.to(`room:${roomId}`).emit('group-room:user-left', { socketId: socket.id });
  });

  socket.on('group-room:signal', ({ targetSocketId, signal }) => {
    io.to(targetSocketId).emit('group-room:signal', {
      senderSocketId: socket.id,
      signal,
    });
  });

  socket.on('group-room:media-state', ({ roomId, audioEnabled, videoEnabled, screenSharing }) => {
    socket.to(`room:${roomId}`).emit('group-room:media-state-changed', {
      socketId: socket.id,
      audioEnabled,
      videoEnabled,
      screenSharing,
    });
  });

  // Disconnection handler
  socket.on('disconnect', () => {
    const userId = socketToUser.get(socket.id);
    if (userId) {
      const set = userSockets.get(userId);
      if (set) {
        set.delete(socket.id);
        if (set.size === 0) {
          userSockets.delete(userId);
          // User has no more open tabs
          const user = users.find((u) => u.id === userId);
          if (user) {
            user.status = 'offline';
            user.lastSeen = new Date().toISOString();
          }
          io.emit('presence:update', { userId, status: 'offline' });
        }
      }
      socketToUser.delete(socket.id);
    }
  });
});

// ==========================================
// Vite Middleware / Production Server
// ==========================================

const PORT = process.env.PORT || 3000;

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, () => {
    console.log(`[HustMess] Server running at http://localhost:${PORT}`);
    console.log(`[HustMess] WebRTC & Socket.IO signaling ready.`);
  });
}

startServer().catch((err) => {
  console.error('[HustMess] Error starting server:', err);
});
