# Bài tập lớn: Ứng dụng nghe gọi, nhắn tin trực tuyến

Tài liệu duy nhất của dự án dành cho nhóm 3 người: yêu cầu, thiết kế, kế hoạch 3 tuần và hướng dẫn code từng bước. Phần A–D giúp chốt phạm vi và phân công; Phần E hướng dẫn thực hành từ máy trống đến bản triển khai. Trong Phần E, “Phần I/II” là hai giai đoạn học code của riêng Phần E. Các số mục trong từng phần giữ nguyên; nếu thấy “mục 5” không kèm chữ cái, hiểu là mục 5 của phần đang đọc.

## Cấu trúc thư mục dự án

Thư mục dự án trên máy bạn là `~/Desktop/btl-chat-onl`. Cây dưới đây là **cấu trúc mục tiêu sau khi làm theo tài liệu**; hiện tại bạn đã tạo `.git` và `client`, còn `server`, `deploy`, `evidence` sẽ tạo ở các bước sau.

```text
btl-chat-onl/
  TAI_LIEU_DU_AN.md  # Toàn bộ kế hoạch và hướng dẫn trong một file
  client/            # React/Vite + ESLint đã tạo; code chức năng sẽ viết theo Phần E
  server/
    src/             # Express, Socket.IO và model Mongoose
  deploy/            # Docker Compose, Nginx và coturn
  evidence/          # Ảnh demo, biên bản test và bằng chứng commit
```

MongoDB Atlas là dịch vụ database bên ngoài; model và mã truy cập database nằm trong `server/src/`, không cần một thư mục database riêng. Các file mẫu React trong `client` mới là khung ban đầu; bạn sẽ thay chúng ở Phần E. Không chép nguyên khối Markdown vào file `.js`.

## Mục lục

- [Phần A — Yêu cầu và tiêu chí nghiệm thu](#phan-a)
  - [A.1. Mục tiêu sản phẩm](#a-1)
  - [A.2. Phạm vi bắt buộc](#a-2)
  - [A.3. Không thuộc phiên bản chấm](#a-3)
  - [A.4. Mapping tiêu chí 100 điểm](#a-4)
  - [A.5. Tiêu chí chấp nhận quan trọng](#a-5)
- [Phần B — Thiết kế kỹ thuật](#phan-b)
  - [B.1. Kiến trúc tổng thể](#b-1)
  - [B.2. Stack chốt](#b-2)
  - [B.3. Data model](#b-3)
  - [B.4. Giao thức gửi tin đáng tin cậy](#b-4)
  - [B.5. REST API tối thiểu](#b-5)
  - [B.6. Socket events](#b-6)
  - [B.7. Luồng gọi WebRTC](#b-7)
  - [B.8. Security checklist](#b-8)
  - [B.9. Deployment runbook ngắn](#b-9)
- [Phần C — Phân công, quy trình nhóm và bảo vệ](#phan-c)
  - [C.1. Phân công 3 thành viên](#c-1)
  - [C.2. Lịch tuần 7 đến 17](#c-2)
  - [C.3. Quy tắc GitHub](#c-3)
  - [C.4. Definition of done cho một thẻ Trello](#c-4)
  - [C.5. Bộ test demo](#c-5)
  - [C.6. Outline báo cáo](#c-6)
  - [C.7. Câu hỏi bảo vệ](#c-7)
- [Phần D — Kế hoạch thực hiện trong 3 tuần](#phan-d)
  - [D.1. Nguyên tắc thực hiện trong 3 tuần](#d-1)
  - [D.2. Việc phải làm ngay trong ngày đầu](#d-2)
  - [D.3. Phạm vi bản nộp tối thiểu](#d-3)
  - [D.4. Kế hoạch tuần 1](#d-4)
  - [D.5. Kế hoạch tuần 2](#d-5)
  - [D.6. Kế hoạch tuần 3](#d-6)
  - [D.7. Lịch làm việc hằng ngày](#d-7)
  - [D.8. Quy tắc cắt phạm vi](#d-8)
  - [D.9. Checklist trước khi nộp](#d-9)
- [Phần E — Hướng dẫn code toàn bộ dự án từ số 0](#phan-e)
  - [E.1. Bạn sẽ học và tạo ra điều gì](#e-1)
  - [E.2. Sáu khái niệm cần hiểu trước khi code](#e-2)
  - [E.3. Chuẩn bị máy và tạo dự án](#e-3)
  - [E.4. Chạy trang React và API đầu tiên](#e-4)
  - [E.5. Kết nối MongoDB và tạo mô hình dữ liệu](#e-5)
  - [E.6. Viết API đăng ký đăng nhập và chat riêng](#e-6)
  - [E.7. Viết giao diện chat đầu tiên](#e-7)
  - [E.8. Tự kiểm tra và sửa lỗi giai đoạn một](#e-8)
  - [E.9. Nâng chat lên mức có thể nộp](#e-9)
  - [E.10. Thêm nhóm chat](#e-10)
  - [E.11. Bắt đầu code cuộc gọi WebRTC](#e-11)
  - [E.12. Đưa lên Internet và kiểm tra TURN](#e-12)
  - [E.13. Cách học và cách làm việc trong ba tuần](#e-13)
  - [E.14. Nguồn đọc chính thức](#e-14)
  - [E.15. Cách dùng tài liệu và định nghĩa “xong”](#e-15)
  - [E.16. Cấu trúc mã nguồn và thứ tự ghép](#e-16)
  - [E.17. Hoàn thiện tài khoản, phiên đăng nhập, hồ sơ và tìm người dùng](#e-17)
  - [E.18. Hoàn thiện inbox, phân trang, tìm tin và đồng bộ sau mất mạng](#e-18)
  - [E.19. Presence, đang nhập, đã xem và quản lý nhóm](#e-19)
  - [E.20. Upload và tải tệp có kiểm tra quyền](#e-20)
  - [E.21. Gọi thoại, gọi video và xử lý lỗi cuộc gọi](#e-21)
  - [E.22. Giao diện desktop, điện thoại và khả năng sử dụng](#e-22)
  - [E.23. Kiểm thử có bằng chứng](#e-23)
  - [E.24. Docker, HTTPS, Nginx, TURN và CI/CD](#e-24)
  - [E.25. Lịch ghép trong ba tuần cho ba thành viên](#e-25)
  - [E.26. Checklist nộp bài và nguồn chính thức](#e-26)

---

<a id="phan-a"></a>

## Phần A — Yêu cầu và tiêu chí nghiệm thu

<a id="a-1"></a>

### 1. Mục tiêu sản phẩm

Xây dựng ứng dụng web nhắn tin và gọi trực tuyến dành cho nhóm sinh viên hoặc bạn bè. Người dùng có thể đăng ký, tìm nhau, chat riêng hoặc theo nhóm, gửi tệp và thực hiện cuộc gọi thoại hoặc video 1-1. Sản phẩm phải chạy trực tuyến qua HTTPS, có lịch sử dữ liệu thật và xử lý được mất kết nối.

Nhóm gồm 3 thành viên. Kế hoạch tạo bằng chứng đóng góp từ tuần 7 vì bảng chấm yêu cầu mọi thành viên commit code hằng tuần kể từ mốc này. Slide giới thiệu học phần quy định nhóm capstone 3-4 sinh viên và áp dụng nguyên tắc không có đóng góp thì không có điểm.

<a id="a-2"></a>

### 2. Phạm vi bắt buộc

<a id="a-2-1"></a>

#### 2.1 Tài khoản

- Đăng ký, đăng nhập, đăng xuất và làm mới phiên.
- Hồ sơ gồm tên hiển thị, email, avatar và trạng thái hoạt động gần nhất.
- Tìm kiếm người dùng theo tên hoặc email đã chuẩn hóa.
- Mật khẩu chỉ được lưu dạng hash; access token và refresh token phải có vòng đời khác nhau. (access thường ngắn hơn, quy định: 15 phút, refresh khoảng 14 ngày)

<a id="a-2-2"></a>

#### 2.2 Nhắn tin

- Tạo hội thoại riêng giữa hai người.
- Hiển thị danh sách hội thoại, tin gần nhất, thời gian và số tin chưa đọc.
- Gửi và nhận tin thời gian thực qua Socket.IO.
- Hiển thị các trạng thái `pending`, `sent`, `seen`, `failed`; cho phép thử lại khi lỗi.
- Hiển thị chỉ báo đang nhập và trạng thái online offline.
- Phân trang lịch sử tin và đồng bộ các tin bỏ lỡ sau reconnect.
- Tìm kiếm trong lịch sử hội thoại theo từ khóa ở mức cơ bản.

<a id="a-2-3"></a>

#### 2.3 Nhóm và tệp

- Tạo nhóm, đổi tên hoặc ảnh nhóm, thêm xóa thành viên.
- Phân quyền tối thiểu `owner` và `member`.
- Upload ảnh hoặc tệp có giới hạn dung lượng; kiểm tra MIME, phần mở rộng, tên tệp và quyền truy cập trước khi tải.

<a id="a-2-4"></a>

#### 2.4 Gọi 1-1

- Cuộc gọi thoại và video giữa hai người.
- Màn hình gọi đến, chấp nhận, từ chối, bận, đổ chuông, đang kết nối, đã kết nối và kết thúc.
- Bật tắt microphone, camera; xem local preview và remote stream.
- Báo lỗi khi người dùng từ chối camera microphone hoặc thiết bị không tồn tại.
- Hỗ trợ NAT bằng STUN và TURN. Phải có một ca demo ép relay qua TURN giữa hai mạng khác nhau.

<a id="a-3"></a>

### 3. Không thuộc phiên bản chấm

Không đưa vào cam kết bắt buộc: gọi nhóm, SFU, mã hóa đầu cuối, thu hồi hoặc sửa tin nhắn, notification native, gửi tệp lớn, ghi âm, đồng bộ đa thiết bị hoàn chỉnh, microservice hoặc Redis. Chỉ mở rộng khi mọi hạng mục bắt buộc đã qua kiểm thử.

<a id="a-4"></a>

### 4. Mapping tiêu chí 100 điểm

| Tiêu chí            | Điểm | Cách đáp ứng                                                                           | Bằng chứng                                 |
| ------------------- | ---: | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| FE giao diện hợp lý |   10 | Luồng đăng nhập, inbox, chat, nhóm và call rõ ràng; trạng thái tải và lỗi đầy đủ.      | Video demo, ảnh chụp, test kịch bản.       |
| FE di động          |    5 | Layout một pane trên điện thoại, composer không bị bàn phím che, call controls đủ lớn. | Test máy thật và viewport 360 px.          |
| BE đa dạng          |   20 | Auth, chat, nhóm, file, presence, sync reconnect, signaling.                           | API collection, integration test, DB demo. |
| Công nghệ phức tạp  |   10 | Socket.IO, WebRTC, STUN TURN coturn, Docker, CI CD.                                    | Call relay qua TURN và sơ đồ kiến trúc.    |
| Triển khai online   |    5 | HTTPS, Nginx, Docker Compose, Atlas, coturn.                                           | URL công khai, Action xanh, README deploy. |
| Báo cáo             |   10 | Báo cáo 10-20 trang theo outline đã chốt.                                              | PDF báo cáo và phụ lục.                    |
| Bảo vệ              |   10 | Mỗi người làm chủ module và phần giao cắt.                                             | Kịch bản demo, bộ câu hỏi.                 |
| Tổ chức nhóm        |   15 | Trello, issue, PR, review, họp tuần.                                                   | Lịch sử board và PR.                       |
| Commit hằng tuần    |   15 | Mỗi người có commit code hữu ích từ tuần 7.                                            | GitHub Insights và bảng đối chiếu.         |

<a id="a-5"></a>

### 5. Tiêu chí chấp nhận quan trọng

1. Tin nhắn được ghi vào DB trước khi server ACK hoặc phát realtime.
2. Retry sau mất ACK không tạo tin trùng.
3. Reconnect hoặc reload tải được các tin đã bỏ lỡ.
4. Người không phải thành viên không thể xem, gửi hoặc nhận tin của hội thoại.
5. Một cuộc gọi hoạt động trong LAN và một cuộc gọi qua TURN giữa hai mạng khác nhau.
6. Ứng dụng online qua HTTPS; camera microphone được xin quyền đúng ngữ cảnh.
7. Desktop, tablet và điện thoại không vỡ ở các luồng chính.

---

<a id="phan-b"></a>

## Phần B — Thiết kế kỹ thuật

<a id="b-1"></a>

### 1. Kiến trúc tổng thể

```text
React Vite browser
  |-- HTTPS REST ----------> Nginx ---> Node Express ---> MongoDB Atlas
  |-- Socket.IO ------------> Nginx ---> Socket.IO server
  |-- WebRTC media <----------------------------------> Browser khác
  |-- WebRTC relay (khi cần) --> coturn TURN --> Browser khác
```

REST dùng cho dữ liệu bền vững: đăng nhập, danh sách, lịch sử chat, tìm kiếm và upload. Socket.IO dùng cho cập nhật tức thời, hiện diện, typing, read receipt và signaling WebRTC. WebRTC dùng cho media. Socket.IO không chở audio video.

Nginx phục vụ frontend, TLS và reverse proxy API Socket.IO. Nginx không thay TURN server; coturn là dịch vụ relay media riêng.

<a id="b-2"></a>

### 2. Stack chốt

| Lớp           | Công nghệ                                                        | Quyết định                                                                                                                                           |
| ------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend      | React + Vite + JavaScript + Tailwind CSS v4 + `socket.io-client` | SPA responsive; dùng utility class trong JSX, cấu hình Tailwind qua plugin Vite. Bản hướng dẫn không dùng CSS Modules hoặc React Router.             |
| Backend       | Node.js 24 LTS + Express + Socket.IO                             | REST và event realtime dùng chung service nghiệp vụ; dùng JavaScript ES modules.                                                                     |
| Kiểm tra code | ESLint cho cả `client` và `server`                               | Dùng cấu hình React Hooks do Vite tạo cho frontend; backend dùng bộ quy tắc JavaScript cơ bản và Node globals. Chạy `npm run lint` trước khi commit. |
| Data          | MongoDB Atlas + Mongoose                                         | Sát học phần; Atlas replica set hỗ trợ transaction.                                                                                                  |
| Auth          | `bcryptjs` + `jsonwebtoken` + `cookie-parser`                    | Băm mật khẩu, access JWT ngắn hạn và refresh token rotation qua cookie `HttpOnly`; không lưu refresh token thô.                                      |
| Upload        | Multer 2.x                                                       | Nhận file ở API và kiểm tra kích thước/định dạng ở backend.                                                                                          |
| Media         | WebRTC `getUserMedia` + `RTCPeerConnection`                      | Chỉ gọi 1-1 để kiểm soát độ phức tạp; Socket.IO chở signaling, không chở media.                                                                      |
| NAT           | STUN + coturn TURN                                               | TURN credential có hạn, cấp bởi backend đã xác thực.                                                                                                 |
| Deploy        | Ubuntu VPS + Docker Compose + Nginx + Certbot + GitHub Actions   | Nginx phục vụ frontend và reverse proxy; có HTTPS, healthcheck và ghi commit SHA đã deploy.                                                          |

**Quy ước phiên bản:** dùng bản phát hành ổn định hiện hành của các gói npm, lưu `package-lock.json` vào Git và chạy `npm ci` khi dựng lại/CI. Với Tailwind, dùng **v4 qua `@tailwindcss/vite`**; không chạy hướng dẫn cũ `npx tailwindcss init -p`. Mọi ví dụ giao diện bên dưới theo cùng quyết định này.

<a id="b-3"></a>

### 3. Data model

<a id="b-3-1"></a>

#### 3.1 users

```js
{
  (_id,
    email,
    passwordHash,
    displayName,
    avatarUrl,
    lastSeen,
    createdAt,
    updatedAt);
}
```

`email` là unique index. API public không trả `passwordHash` hoặc token.

<a id="b-3-2"></a>

#### 3.2 conversations

```js
{
  _id, type: 'direct' | 'group', memberIds: [ObjectId],
  directKey, title, avatarUrl, ownerId,
  lastSeq: Number, lastMessageId, lastMessageAt,
  readSeqByUser: Map<userId, Number>, createdAt, updatedAt
}
```

Với chat riêng, `directKey` được tạo từ hai userId đã sort để ngăn tạo hai cuộc hội thoại cho cùng một cặp.

<a id="b-3-3"></a>

#### 3.3 messages

```js
{
  _id, conversationId, senderId, clientMessageId,
  seq, body, attachments: [AttachmentId], createdAt, updatedAt
}
```

Index bắt buộc:

- unique `(senderId, clientMessageId)` để deduplicate khi client retry.
- unique `(conversationId, seq)` để giữ thứ tự đồng bộ.
- index `(conversationId, seq)` cho đọc lịch sử.

<a id="b-3-4"></a>

#### 3.4 Trạng thái đã đọc và refreshSessions

Trong phiên bản ba tuần, `conversations.memberIds` là nguồn quyền thành viên duy nhất; `ownerId` xác định người quản trị nhóm. `readSeqByUser` là map nhúng trong conversation, chứa sequence đã đọc của mỗi thành viên. Cách này phù hợp nhóm nhỏ tối đa 20 người và tránh hai nguồn membership bị lệch. Nếu sau này nhóm lớn, có thể tách thành collection `conversationMembers` với kế hoạch migration và test quyền đầy đủ.

`refreshSessions` chỉ chứa hash refresh token, `userId`, thời hạn và trạng thái thu hồi; có TTL index trên `expiresAt`. File attachment có metadata riêng gồm owner, conversation nếu là file chat, mục đích avatar/chat, MIME, kích thước và tên lưu ngẫu nhiên.

<a id="b-4"></a>

### 4. Giao thức gửi tin đáng tin cậy

1. Client sinh UUID `clientMessageId`, thêm bubble `pending` và gửi `send_message`.
2. Server xác thực socket JWT, kiểm tra membership, validate payload và kiểm tra attachment.
3. Trong transaction ngắn, server tăng `conversations.lastSeq`, insert message với `seq` vừa cấp. Nếu unique `clientMessageId` đã tồn tại, trả lại message cũ.
4. Chỉ sau khi transaction commit, server ACK về sender và emit `message_new` vào Socket.IO room của hội thoại.
5. Client đổi `pending` thành `sent`. Người nhận cập nhật `lastContiguousSeq` khi các sequence liên tiếp đã có.
6. Khi reconnect, focus lại trang hoặc phát hiện gap, client gọi `GET /conversations/:id/messages?afterSeq=N`. DB là nguồn sự thật.

Không emit trong callback transaction vì callback transaction có thể được driver retry. Không dùng `createdAt` hoặc ObjectId thay cho cursor cam kết vì thứ tự tạo ID không đảm bảo cùng thứ tự commit.

<a id="b-5"></a>

### 5. REST API tối thiểu

| Method    | Route                                | Quyền          | Mục đích                               |
| --------- | ------------------------------------ | -------------- | -------------------------------------- |
| POST      | `/api/auth/register`                 | Public         | Tạo tài khoản.                         |
| POST      | `/api/auth/login`                    | Public         | Trả access và đặt refresh cookie.      |
| POST      | `/api/auth/refresh`                  | Refresh cookie | Rotation refresh token.                |
| POST      | `/api/auth/logout`                   | Refresh cookie | Thu hồi phiên hiện tại.                |
| GET/PATCH | `/api/me`                            | User           | Đọc hoặc sửa profile.                  |
| GET       | `/api/users/search`                  | User           | Tìm người dùng.                        |
| POST      | `/api/conversations/direct`          | User           | Tạo/lấy chat riêng.                    |
| POST      | `/api/conversations/group`           | User           | Tạo nhóm.                              |
| GET       | `/api/conversations`                 | User           | Liệt kê hội thoại.                     |
| GET       | `/api/conversations/:id/messages`    | Member         | Lịch sử và sync theo sequence.         |
| POST      | `/api/conversations/:id/attachments` | Member         | Upload file đã validate.               |
| GET       | `/api/attachments/:id`               | Member         | Tải file có kiểm tra quyền.            |
| GET       | `/api/ice`                           | User           | Cấp STUN/TURN config ngắn hạn.         |
| GET       | `/healthz`                           | Public         | Healthcheck không có dữ liệu nhạy cảm. |

<a id="b-6"></a>

### 6. Socket events

| Event               | Hướng            | Payload chính                                 | Quy tắc                                               |
| ------------------- | ---------------- | --------------------------------------------- | ----------------------------------------------------- |
| `join_conversation` | client -> server | conversationId                                | Chỉ member mới join room.                             |
| `send_message`      | client -> server | conversationId, body, clientMessageId         | ACK sau DB commit.                                    |
| `message_new`       | server -> client | message đầy đủ                                | Chỉ broadcast room hợp lệ.                            |
| `typing_start/stop` | hai chiều        | conversationId                                | Không persist; throttle.                              |
| `read_up_to`        | client -> server | conversationId, seq                           | Chỉ tăng `lastReadSeq`.                               |
| `call_invite`       | client -> server | callId, calleeId, mediaType                   | Check busy và relationship.                           |
| `call_signal`       | hai chiều        | callId, type: offer/answer/candidate, payload | Chỉ caller/callee; validate state và queue candidate. |
| `call_end`          | hai chiều        | callId, reason                                | Idempotent cleanup.                                   |

<a id="b-7"></a>

### 7. Luồng gọi WebRTC

1. Caller tạo `callId`, gửi `call_invite`; callee chọn accept hoặc reject.
2. Khi accept, hai phía gọi `getUserMedia`, tạo `RTCPeerConnection` với ICE config từ backend.
3. Caller tạo offer; callee set remote description, tạo answer; candidate trickle qua Socket.IO.
4. Candidate đến trước remote description phải đưa vào queue, sau đó `addIceCandidate` theo thứ tự phù hợp.
5. Trong bản gọi 1-1 đầu tiên, chỉ caller tạo offer sau khi callee accept để tránh offer collision. Nếu bổ sung renegotiation hoặc cả hai phía có thể cùng tạo offer, dùng perfect negotiation với polite/impolite role.
6. Khi kết thúc, stop local tracks, close peer connection, remove socket listeners và cập nhật UI.

<a id="b-7-1"></a>

#### 7.1 STUN và TURN

STUN giúp trình duyệt thu thập candidate. TURN relay media khi đường P2P không đi qua NAT hoặc firewall. Backend phát ICE config và TURN credential giới hạn thời gian sau khi user xác thực. Không commit credential tĩnh vào frontend.

Chứng minh TURN: thực hiện call qua hai mạng khác nhau, cấu hình `iceTransportPolicy: 'relay'` trong test, kiểm tra selected candidate pair có loại relay và số byte media tăng. Chạy được chỉ trong LAN không đủ bằng chứng.

<a id="b-8"></a>

### 8. Security checklist

- Hash password, limit login, không log secrets hoặc nội dung nhạy cảm.
- JWT được ký, không phải mã hóa; access token ngắn hạn; refresh token hash và rotation.
- Auth và authorization riêng: mọi REST route và Socket.IO event kiểm tra membership hoặc owner ở server.
- React render text message, không dùng `dangerouslySetInnerHTML` cho chat.
- CORS và Socket.IO origin allowlist theo environment; production không wildcard origin.
- Upload allowlist MIME và extension, size cap, key ngẫu nhiên, access control khi tải.
- Secrets chỉ trong environment hoặc GitHub Secrets; `.env` trong `.gitignore`.
- TURN dùng shared secret hoặc credential time-limited, giới hạn firewall và theo dõi allocation.

<a id="b-9"></a>

### 9. Deployment runbook ngắn

1. GitHub Actions chạy syntax/test/build trên mỗi PR; chỉ merge khi xanh.
2. Build frontend production với `VITE_API_URL` của domain API; copy `dist` đến Nginx trên VPS.
3. VPS dùng Docker Compose chạy backend với Atlas URI và named volume upload; ghi commit SHA đã deploy.
4. Nginx trên VPS cấp HTTPS, phục vụ frontend và proxy API/`/socket.io`; frontend fallback về `index.html`.
5. Coturn dùng domain public, cấu hình public IP đúng và mở listener/relay ports trên cloud firewall.
6. Kiểm tra `/healthz`, login, socket connect, upload và call relay sau deploy; sau lần deploy thủ công ổn định mới tự động hóa CD.

---

<a id="phan-c"></a>

## Phần C — Phân công, quy trình nhóm và bảo vệ

<a id="c-1"></a>

### 1. Phân công 3 thành viên

| Thành viên | Phần chịu trách nhiệm chính                                                       | Phần giao cắt bắt buộc                                                   |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| A          | Auth, profile, user search, routing, responsive shell, accessibility.             | JWT middleware, client API, error states, test auth, review chat UI.     |
| B          | Conversation, group, message service, Mongo schema index, sync reconnect, upload. | Socket rooms, API lịch sử, Postman, integration test, review deploy.     |
| C          | Call UI, signaling, WebRTC, coturn, Docker, Nginx, CI CD, monitoring.             | Presence, Socket auth, deploy runbook, responsive call, review security. |

Mỗi PR gắn issue, mô tả cách test và có review chéo khi có thể. Chủ sở hữu phải nắm phần giao cắt để trả lời bảo vệ, không chỉ module của riêng mình.

<a id="c-2"></a>

### 2. Lịch tuần 7 đến 17

| Tuần | Mục tiêu                                                             | Evidence bắt buộc                                          |
| ---: | -------------------------------------------------------------------- | ---------------------------------------------------------- |
|    7 | Khởi tạo repo, Trello, wireframe, ADR stack, Docker local, ERD.      | Ba người có commit; board có owner và acceptance criteria. |
|    8 | Register login refresh profile, routes, Mongo Atlas dev, validation. | Test auth, PR review, UI mobile form.                      |
|    9 | Chat direct, lịch sử REST, message DB-first, Socket rooms, retry.    | Test dedup và pending sent failed.                         |
|   10 | Group, roles, typing, read receipt, presence, upload, responsive.    | Demo ba account, test 360 px.                              |
|   11 | Signaling, media permission, voice video 1-1 cùng mạng.              | Call state UI, cleanup test.                               |
|   12 | coturn staging, test NAT relay, ACL socket, rate limit, security.    | Candidate relay và media byte evidence.                    |
|   13 | Docker Compose production, Nginx HTTPS, Action, healthcheck.         | Staging URL và deploy runbook.                             |
|   14 | Bản demo hoàn chỉnh và feature freeze.                               | Full regression, tag, evidence GitHub Trello.              |
|   15 | Sửa P0 P1, viết báo cáo, chụp ảnh test, tập bảo vệ.                  | Draft report 10-20 trang.                                  |
|   16 | Diễn tập demo ngoài mạng, mobile, reconnect, TURN, Q&A.              | Video dự phòng và checklist nộp.                           |
|   17 | Nộp và bảo vệ.                                                       | Release note, report PDF, URL, backup.                     |

<a id="c-3"></a>

### 3. Quy tắc GitHub

- Từ tuần 7, mỗi thành viên có ít nhất một commit code có ý nghĩa mỗi tuần.
- Không dùng commit rỗng hoặc chỉ đổi whitespace để tạo bằng chứng.
- Dùng branch `feat/*`, `fix/*`, `chore/*`; main chỉ nhận code qua PR.
- PR có mục tiêu, issue liên quan, cách test, ảnh hoặc video UI nếu thay đổi giao diện.
- Commit ví dụ: `feat(chat): persist messages with idempotency key`, `test(call): queue ICE candidates before remote SDP`, `fix(mobile): keep composer visible above virtual keyboard`.
- Chụp GitHub Insights, danh sách PR và Trello trước khi nộp để làm evidence phần tổ chức nhóm.

<a id="c-4"></a>

### 4. Definition of done cho một thẻ Trello

- Có acceptance criteria rõ ràng.
- Có code, test hoặc bước test thủ công ghi trong PR.
- Không để secret hoặc dữ liệu thật trong commit.
- Đã kiểm tra desktop và mobile nếu thay đổi UI.
- Đã xử lý loading, empty, error và permission state liên quan.
- Có review hoặc ghi lý do khi không thể review chéo.
- Đã merge vào staging hoặc main và cập nhật thẻ Done.

<a id="c-5"></a>

### 5. Bộ test demo

1. User A đăng nhập trên desktop, User B trên điện thoại; A tìm B và tạo chat.
2. A gửi text và ảnh; B nhận ngay, trả lời và A nhận read receipt.
3. B mất mạng; A gửi hai tin; B bật mạng lại và đồng bộ đủ tin theo thứ tự.
4. A reload trong khi gửi; retry không tạo bản sao vì cùng `clientMessageId`.
5. A tạo group ba người, thêm C và gửi tin; C thử xóa A nhưng bị chặn vì không phải owner.
6. A gọi video B, B tắt camera rồi bật lại, A mute mic rồi kết thúc call.
7. Lặp lại call từ hai mạng khác nhau với TURN; ghi candidate relay và byte gửi nhận.
8. User C thử gọi REST Socket API của conversation không thuộc về mình và nhận 403 hoặc event error.
9. Test 360 px, 768 px, 1440 px; kiểm tra keyboard ảo và nội dung tiếng Việt dài.
10. Sau deploy, chạy healthcheck, login, socket connect, upload và call từ domain HTTPS.

<a id="c-6"></a>

### 6. Outline báo cáo

1. Bài toán, đối tượng sử dụng, mục tiêu và phạm vi.
2. Use case, chức năng và ảnh UI desktop mobile.
3. Kiến trúc React Express Mongo Socket.IO WebRTC TURN.
4. Thiết kế dữ liệu, API, socket protocol, đồng bộ reconnect.
5. Bảo mật: password, JWT, access control, upload, CORS, secrets.
6. Triển khai Docker Nginx HTTPS CI CD và URL demo.
7. Kiểm thử: ma trận test, ảnh call relay, mobile, reconnect và kết quả.
8. Phân công, bằng chứng GitHub Trello, giới hạn và hướng phát triển.

Giữ tổng báo cáo từ 10 đến 20 trang, không tính bìa hoặc phụ lục nếu giảng viên cho phép.

<a id="c-7"></a>

### 7. Câu hỏi bảo vệ

- Vì sao Socket.IO không tự đảm bảo không mất tin nhắn sau reconnect?
- Vì sao server phải lưu tin vào DB trước ACK và trước emit?
- `clientMessageId` giải quyết vấn đề gì khi client retry?
- STUN khác TURN như thế nào? Vì sao server API online chưa đủ để thay TURN?
- Làm sao chứng minh call đang relay qua TURN?
- Tại sao HTTPS là điều kiện của camera microphone trên trình duyệt?
- JWT có mã hóa dữ liệu không? Vì sao refresh token cần rotation?
- Chặn BOLA IDOR ở REST và Socket.IO bằng cách nào?
- Vì sao chọn gọi 1-1 thay vì gọi nhóm? Khi nào cần SFU?
- Nginx, Docker Compose và GitHub Actions đóng vai trò gì trong deploy?

---

<a id="phan-d"></a>

## Phần D — Kế hoạch thực hiện trong 3 tuần

<a id="d-1"></a>

### 1. Nguyên tắc thực hiện trong 3 tuần

Ba tuần là quỹ thời gian ngắn cho một ứng dụng có chat, WebRTC, TURN và deploy. Nhóm phải làm theo thứ tự: dữ liệu thật và chat chạy trước, cuộc gọi chạy sau, TURN và deploy không để đến ngày cuối.

Mục tiêu của ba tuần là một bản sản phẩm nhỏ nhưng chạy thật:

- Đăng ký, đăng nhập, profile cơ bản.
- Chat riêng theo thời gian thực, lưu lịch sử MongoDB, tải lại trang không mất tin.
- Nhóm chat nhỏ với tạo nhóm và thêm thành viên.
- Gọi thoại hoặc video 1-1. Nếu thời gian thiếu, ưu tiên gọi video 1-1 hơn việc làm nhiều tính năng phụ.
- Cuộc gọi qua TURN giữa hai mạng khác nhau.
- Deploy online qua HTTPS, có URL demo và README.

Không đưa vào trong 3 tuần: gọi nhóm, mã hóa đầu cuối, thu hồi tin, tìm kiếm toàn văn, notification native, file lớn, giao diện quá nhiều hiệu ứng. Upload ảnh đơn giản chỉ làm khi chat và call đã ổn định.

<a id="d-2"></a>

### 2. Việc phải làm ngay trong ngày đầu

### Mục tiêu của buổi khởi động 90 phút

1. Chốt tên dự án và phạm vi tối thiểu ở phần 3; không nhận thêm tính năng mới trong tuần 1.
2. Tạo một GitHub repository chung và thêm đủ ba thành viên với quyền phù hợp.
3. Tạo Trello hoặc GitHub Projects với các cột `Backlog`, `Ready`, `In progress`, `Review`, `Test`, `Done`, `Blocked`.
4. Tạo ba tài khoản test cố định: User A, User B, User C. Dùng email test, không dùng mật khẩu thật.
5. Chốt stack: React Vite, Node Express, MongoDB Atlas, Socket.IO, WebRTC, coturn, Docker Compose.
6. Tạo `.env.example`, `.gitignore`, README tối thiểu và branch `main`, `develop` hoặc `staging`.
7. Chia owner cho các thẻ tuần 1; mỗi thẻ phải có tiêu chí chấp nhận và thời hạn cụ thể.
8. Đặt lịch họp cố định 20 phút cuối mỗi ngày hoặc tối thiểu ba lần mỗi tuần.

### Việc kỹ thuật phải hoàn thành ngay trong ngày đầu

| Người | Việc làm                                                                                                            | Đầu ra cuối ngày                                                |
| ----- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| A     | Khởi tạo React Vite, router, layout đăng nhập và inbox rỗng, cấu hình API client.                                   | Frontend chạy local; có route `/login`, `/register`, `/app`.    |
| B     | Khởi tạo Express, kết nối MongoDB Atlas dev, cấu trúc module `routes`, `controllers`, `services`, `models`.         | `GET /healthz` trả 200; MongoDB kết nối được.                   |
| C     | Tạo Docker Compose local cho backend và database hoặc cấu hình Atlas; khởi tạo Socket.IO server, README chạy local. | Docker hoặc script local chạy được; client socket kết nối được. |

Mỗi người tạo tối thiểu một commit code hữu ích trong ngày đầu. Cuối buổi, ghép frontend với backend `/healthz` và chụp màn hình hoặc ghi lại lệnh chạy. Đây là bằng chứng nhóm đã khởi động thật, không chỉ lập kế hoạch.

<a id="d-3"></a>

### 3. Phạm vi bản nộp tối thiểu

### Bắt buộc trước ngày nộp

| Chức năng   | Điều kiện hoàn thành                                                               |
| ----------- | ---------------------------------------------------------------------------------- |
| Auth        | Đăng ký, login, logout, access token; API có validation và password hash.          |
| Chat riêng  | Hai người gửi nhận tức thời; tin được lưu MongoDB và tải lại vẫn còn.              |
| Chống trùng | Client có `clientMessageId`; gửi lại cùng ID không tạo hai tin.                    |
| Reconnect   | Mất mạng hoặc reload xong tải được tin bị bỏ lỡ.                                   |
| Group       | Tạo nhóm, thêm thành viên, gửi tin nhóm; owner mới thêm hoặc xóa được thành viên.  |
| Call 1-1    | Caller gọi, callee nhận từ chối, audio video hai chiều, mute camera mic, end call. |
| TURN        | Test call khác mạng với relay; có ảnh hoặc log candidate relay.                    |
| Responsive  | Luồng login, inbox, chat và call hoạt động ở 360 px và desktop.                    |
| Online      | URL HTTPS chạy; README có biến môi trường và lệnh deploy.                          |

### Chỉ làm khi phần bắt buộc đã xanh

- Upload ảnh với giới hạn dung lượng.
- Typing indicator và read receipt.
- Tìm kiếm user hoặc lịch sử chat.
- Avatar, đổi tên nhóm, last seen.

<a id="d-4"></a>

### 4. Kế hoạch tuần 1

### Mục tiêu tuần 1

Cuối tuần 1, hai người có thể đăng nhập, tìm nhau hoặc dùng user seed, mở chat riêng, gửi nhận tin qua Socket.IO và thấy lịch sử tin sau khi reload.

### Ngày 1

Thực hiện buổi khởi động và các đầu việc ở mục 2. Mốc qua ngày: frontend, backend, database và socket cùng khởi động được trên máy ít nhất hai thành viên.

### Ngày 2

| Người | Công việc                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------ |
| A     | Hoàn thiện form register login, validation client, token storage an toàn theo quyết định nhóm, layout inbox. |
| B     | User schema, hash password, register login API, middleware xác thực JWT, test Postman.                       |
| C     | Socket authentication middleware, CORS local, Dockerfile backend, tài liệu setup local.                      |

Mốc qua ngày: A login được vào UI; B trả token thật; C chặn socket không có token.

### Ngày 3

| Người | Công việc                                                                                  |
| ----- | ------------------------------------------------------------------------------------------ |
| A     | Danh sách user hoặc user seed, UI tạo chat riêng, khung message composer và bubble.        |
| B     | Conversation schema, endpoint tạo hoặc lấy direct conversation, message schema và indexes. |
| C     | Socket room `join_conversation`, event `send_message` prototype, log event để debug.       |

Mốc qua ngày: tạo được một hội thoại giữa User A và User B, chưa cần UI đẹp.

### Ngày 4

| Người | Công việc                                                                                |
| ----- | ---------------------------------------------------------------------------------------- |
| A     | Gửi message từ UI, trạng thái `pending`, xử lý ACK thành `sent`, error state.            |
| B     | Service ghi message vào DB, validation membership, unique `(senderId, clientMessageId)`. |
| C     | Emit `message_new` đúng room sau ACK, test hai browser nhận tin.                         |

Mốc qua ngày: gửi nhận realtime qua hai trình duyệt, reload vẫn có lịch sử.

### Ngày 5

| Người | Công việc                                                                              |
| ----- | -------------------------------------------------------------------------------------- |
| A     | Render lịch sử, auto-scroll hợp lý, loading empty error, responsive 360 px cho chat.   |
| B     | API lịch sử có pagination hoặc `afterSeq`, sequence tin nhắn, test quyền conversation. |
| C     | Reconnect socket, join lại room và gọi API sync khi reconnect.                         |

Mốc qua ngày: test tắt mạng người nhận, gửi tin, bật lại và nhận được tin bị bỏ lỡ.

### Ngày 6

Tích hợp và sửa lỗi. Mỗi người review ít nhất một PR của người khác. Không thêm tính năng mới. Chạy một kịch bản demo: đăng ký, login, tạo chat, gửi 10 tin, reload, tắt mạng và reconnect.

### Ngày 7

Demo nội bộ tuần 1. Ghi lại lỗi P0, P1, P2 trong Trello. Chỉ P0 được phép chặn tuần 2. Đóng tag `week-1-chat-foundation`.

<a id="d-5"></a>

### 5. Kế hoạch tuần 2

### Mục tiêu tuần 2

Cuối tuần 2, nhóm chat và một cuộc gọi WebRTC 1-1 cùng mạng phải hoạt động. Gọi được trước, UI đẹp sau.

### Ngày 8

| Người | Công việc                                                              |
| ----- | ---------------------------------------------------------------------- |
| A     | UI tạo group, danh sách thành viên, responsive inbox group.            |
| B     | Group conversation, membership role owner member, API thêm thành viên. |
| C     | Socket presence cơ bản, rooms group, ACL event theo membership.        |

### Ngày 9

| Người | Công việc                                                                                      |
| ----- | ---------------------------------------------------------------------------------------------- |
| A     | UI chat group, trạng thái thành viên, empty hoặc permission state.                             |
| B     | Validate owner khi thêm hoặc xóa member, test User C không truy cập group không thuộc về mình. |
| C     | `typing_start`, `typing_stop` và `read_up_to` nếu chat nền đã ổn.                              |

Mốc: ba user cùng gửi nhận được trong một group; quyền owner được kiểm chứng.

### Ngày 10

| Người | Công việc                                                                                               |
| ----- | ------------------------------------------------------------------------------------------------------- |
| A     | Màn hình incoming call, ringing, accepted, rejected, connecting và end call.                            |
| B     | Call session state tối thiểu và kiểm tra caller callee hợp lệ trong service.                            |
| C     | Event `call_invite`, `call_accept`, `call_reject`, `call_end`; tạo `RTCPeerConnection` và getUserMedia. |

Mốc: gọi đến và accept reject hoạt động qua Socket.IO.

### Ngày 11

| Người | Công việc                                                                            |
| ----- | ------------------------------------------------------------------------------------ |
| A     | Hiển thị local remote video, nút mute mic và camera; xử lý permission denied.        |
| B     | Validate call state, chỉ một active call mỗi user, rate limit event call.            |
| C     | Exchange offer answer ICE candidate, candidate queue, cleanup track peer connection. |

Mốc: voice hoặc video 1-1 cùng mạng chạy hai chiều.

### Ngày 12

| Người | Công việc                                                                            |
| ----- | ------------------------------------------------------------------------------------ |
| A     | Responsive call UI trên điện thoại; test xoay màn hình và controls.                  |
| B     | Security pass: JWT expiry, membership API, input validation, CORS config.            |
| C     | Perfect negotiation cơ bản, xử lý busy timeout, test multi-tab hoặc offer collision. |

### Ngày 13

Tích hợp call với chat. Chạy full kịch bản login, chat, group, call từ hai browser. Nếu call LAN chưa ổn định, không chuyển sang thêm upload hoặc typing; cả nhóm cùng sửa call trước.

### Ngày 14

Demo nội bộ tuần 2. Đóng tag `week-2-realtime-call-lan`. Ghi video ngắn call LAN chạy được để có bản dự phòng.

<a id="d-6"></a>

### 6. Kế hoạch tuần 3

### Mục tiêu tuần 3

Đưa ứng dụng lên Internet, call qua TURN khác mạng, kiểm thử, viết báo cáo và chuẩn bị bảo vệ.

### Ngày 15

| Người | Công việc                                                                                 |
| ----- | ----------------------------------------------------------------------------------------- |
| A     | Hoàn thiện responsive, error states, empty states, ảnh minh chứng UI desktop mobile.      |
| B     | Review indexes, backup seed data, API regression, test duplicate reconnect authorization. |
| C     | VPS hoặc nền tảng deploy, domain HTTPS, Nginx, Docker Compose và healthcheck.             |

Mốc: staging URL HTTPS login chat được.

### Ngày 16

| Người | Công việc                                                                           |
| ----- | ----------------------------------------------------------------------------------- |
| A     | UI báo lỗi call ICE, reconnect và permission; viết phần UI báo cáo.                 |
| B     | Viết phần data API security test của báo cáo; test IDOR XSS.                        |
| C     | Cài coturn, mở listener relay ports firewall, backend cấp TURN credential hạn ngắn. |

Mốc: call giữa hai mạng khác nhau bắt đầu kết nối; nếu chưa relay được, C ưu tiên toàn thời gian cho TURN và một người khác hỗ trợ logs firewall.

### Ngày 17

Ép `iceTransportPolicy: relay` trong môi trường test. Xác minh selected candidate pair có candidate type `relay`, audio video hai chiều và byte media tăng. Chụp ảnh hoặc log làm bằng chứng. Sau đó trả config về chế độ bình thường cho demo.

### Ngày 18

Full regression theo bộ test ở Phần C, mục 5. Sửa P0 trước, P1 sau. Không thêm feature mới.

### Ngày 19

Viết báo cáo 10-20 trang. Phân công:

- A: bài toán, UI, responsive, ảnh màn hình.
- B: schema, API, đồng bộ, security, test chat.
- C: WebRTC TURN, deploy, Docker Nginx CI CD, test call.

Mỗi người viết phần mình nhưng một người đọc lại để thống nhất thuật ngữ.

### Ngày 20

Diễn tập bảo vệ hai lần. Lần một theo kịch bản bình thường. Lần hai mô phỏng lỗi: tắt mạng một user, từ chối camera, gọi qua TURN, thử user không có quyền truy cập group. Chuẩn bị video dự phòng cho case mạng demo không ổn định.

### Ngày 21

Tag release, rà soát README, URL, `.env.example`, tài khoản demo, report PDF, GitHub Insights, Trello và bảng phân công. Không deploy thay đổi lớn trong ngày cuối; chỉ fix lỗi chặn demo.

<a id="d-7"></a>

### 7. Lịch làm việc hằng ngày

Mỗi ngày dành 15-20 phút đồng bộ:

1. Mỗi người nói rõ việc đã xong, việc làm hôm nay và blocker.
2. Cập nhật Trello trước khi bắt đầu code.
3. Đẩy commit có ý nghĩa trước khi kết thúc ngày.
4. Khi hoàn thành một thẻ, tạo PR hoặc ít nhất yêu cầu một người khác test.
5. Ghi bug vào board thay vì báo miệng rồi quên.

Thứ sáu hoặc ngày cuối mỗi tuần phải demo end-to-end; không đánh giá tiến độ bằng số thẻ Done mà bằng luồng chạy thật.

Trong buổi demo cuối tuần, mở card `Tổng kết tuần [số tuần học phần]` trên Trello và đối chiếu **cả ba thành viên** với GitHub: mỗi người có ít nhất một commit **code có ích** trong tuần đó, đã push, có SHA, card và PR/cách test tương ứng. Yêu cầu của bảng chấm bắt đầu từ **tuần 7 của học phần**, nên ghi số tuần thật chứ không mặc định ba tuần dự án là tuần 7–9. Cách tạo board/card và kiểm tra commit được hướng dẫn ở [mục E.3.4](#e-3-4) và [mục E.4.4](#e-4-4).

<a id="d-8"></a>

### 8. Quy tắc cắt phạm vi

Khi gặp chậm tiến độ, cắt theo thứ tự dưới đây:

1. Bỏ tìm kiếm lịch sử, typing indicator, read receipt và avatar tùy biến.
2. Bỏ upload tệp, chỉ giữ text chat.
3. Giữ gọi video 1-1; có thể không lưu audit lịch sử cuộc gọi.
4. Không bỏ TURN, HTTPS, persistence và reconnect vì đây là bằng chứng quan trọng cho công nghệ, online và backend.

Nếu đến hết ngày 11 mà call LAN chưa chạy, cả nhóm ngừng làm tính năng phụ và dồn vào luồng gọi. Nếu đến hết ngày 15 chưa deploy staging, ưu tiên deploy chat trước để chắc điểm triển khai online, rồi tiếp tục xử lý TURN trên staging.

<a id="d-9"></a>

### 9. Checklist trước khi nộp

- Mỗi thành viên có commit code hữu ích trong cả ba tuần.
- URL HTTPS truy cập được trên mạng ngoài; không cần chạy bằng máy cá nhân.
- Đăng nhập, chat riêng, group, reload, reconnect và quyền membership đã test.
- Gọi 1-1 hoạt động; có bằng chứng TURN relay qua hai mạng khác nhau.
- Các trạng thái loading, empty, error, offline, permission denied đã có trên UI.
- Không có secret trong repo; `.env.example` có đầy đủ tên biến nhưng không có giá trị thật.
- README đủ để giảng viên chạy local hoặc hiểu cách deploy.
- Báo cáo trong 10-20 trang; mỗi người đã tập trả lời câu hỏi phần mình.

---

<a id="phan-e"></a>

## Phần E — Hướng dẫn code toàn bộ dự án từ số 0

<a id="e-1"></a>

### 1. Bạn sẽ học và tạo ra điều gì

Hãy coi tài liệu này như một buổi thực hành có giáo viên hướng dẫn. Bạn không cần biết code trước. Sau phần 3-8, bạn sẽ có một ứng dụng nhỏ nhưng chạy thật: hai tài khoản có thể đăng nhập, tạo một hội thoại, gửi tin nhắn tức thời và thấy tin vẫn còn sau khi đăng nhập lại. Sau đó làm tiếp Phần II (mục 15–26) trong chính tài liệu này và đối chiếu [kế hoạch ba tuần](#phan-d).

**Nguyên tắc làm bài:** làm xong một bước, chạy thử và chỉ sang bước kế khi kết quả đúng. Nếu gặp lỗi, đọc mục “Nếu bị lỗi” ngay dưới bước đó. Các đoạn mã bên dưới là điểm khởi đầu để bạn hiểu luồng chạy. Khi thêm nhóm, gọi điện và deploy, bạn vẫn phải sửa code theo sản phẩm của nhóm.

Tên thư mục dự án thật của bạn là `~/Desktop/btl-chat-onl`. Dùng repository đó cho cả ba thành viên, không tạo dự án thứ hai.

<a id="e-2"></a>

### 2. Sáu khái niệm cần hiểu trước khi code

<a id="e-2-1"></a>

#### 2.1 Frontend và backend

**Frontend** là phần chạy trong trình duyệt: nút bấm, ô nhập, danh sách tin nhắn. React giúp chia màn hình thành các phần nhỏ và cập nhật khi dữ liệu thay đổi. **Backend** là phần chạy trên máy chủ: kiểm tra tài khoản, quyền truy cập, ghi tin nhắn vào database. Express giúp backend nhận HTTP request và trả HTTP response.

Ví dụ: khi bạn bấm “Đăng nhập”, React gửi `POST /api/auth/login` với email và mật khẩu. Express kiểm tra database rồi trả token. Khi React gửi tin nhắn, server kiểm tra người gửi có thuộc hội thoại không trước khi lưu.

<a id="e-2-2"></a>

#### 2.2 API, JSON và HTTP

API là các đường dẫn để frontend nói chuyện với backend. `GET` dùng để đọc, `POST` dùng để tạo. Dữ liệu thường đi dưới dạng JSON, ví dụ `{"email":"a@example.com","password":"abc12345"}`. Mã HTTP `200` nghĩa là thành công; `400` là dữ liệu đầu vào không hợp lệ; `401` là chưa đăng nhập; `403` là không có quyền; `500` là lỗi server.

<a id="e-2-3"></a>

#### 2.3 Database

Biến JavaScript mất khi server tắt. MongoDB giữ dữ liệu lâu dài. Một `collection` giống nhóm các bản ghi cùng loại. Ứng dụng này có `users`, `conversations`, `messages`. Mongoose giúp định nghĩa trường dữ liệu và truy vấn MongoDB bằng JavaScript.

<a id="e-2-4"></a>

#### 2.4 Realtime

HTTP thường là hỏi rồi nhận câu trả lời. Chat cần server chủ động báo cho người nhận rằng có tin mới. Socket.IO giữ kết nối hai chiều để phát sự kiện như `message_new`. Tuy nhiên, sự kiện có thể bỏ lỡ khi mất mạng, nên tin nhắn vẫn phải lưu trong MongoDB rồi tải lại từ đó.

<a id="e-2-5"></a>

#### 2.5 WebRTC, STUN và TURN

WebRTC tạo đường truyền audio/video giữa hai trình duyệt. Hai bên vẫn cần một đường để trao đổi thông tin thiết lập cuộc gọi (`offer`, `answer`, ICE candidate); ứng dụng này dùng Socket.IO cho việc đó. STUN giúp tìm cách nối trực tiếp; TURN chuyển tiếp media khi mạng không cho kết nối trực tiếp. Đến bước 11 mới cần học sâu phần này.

<a id="e-2-6"></a>

#### 2.6 Terminal, thư mục và file code

**Terminal** là nơi bạn gõ lệnh cho máy. `cd ten-thu-muc` nghĩa là đi vào thư mục đó; `cd ..` nghĩa là đi ra thư mục cha. Dòng bắt đầu bằng `npm` là lệnh chạy trong terminal, còn nội dung trong khối `js`, `jsx`, `css` phải dán vào **file tương ứng** trong VS Code. Không dán dấu ba gạch ngược ` ``` ` vào file code. Trong VS Code, chọn **File > Open Folder** để mở `btl-chat-onl`, nhìn cây thư mục ở cột trái, bấm chuột phải vào thư mục để tạo file mới. Bấm **Ctrl+S** (Windows/Linux) hoặc **Cmd+S** (macOS) để lưu trước khi thử lại trên trình duyệt.

`package.json` ghi tên dự án, thư viện và các lệnh `npm run ...`; `node_modules` là thư viện do npm tải về nên không tự sửa. `.env` là cấu hình riêng của máy bạn. Nếu lệnh báo “file not found”, hãy kiểm tra terminal hiện đang đứng ở thư mục nào bằng `pwd` (macOS/Linux) hoặc `cd` (Windows Command Prompt) và nhìn lại cây thư mục.

<a id="e-3"></a>

### 3. Chuẩn bị máy và tạo dự án

**Thứ tự làm dự án:** trước khi code chức năng, hãy vẽ sơ bộ dữ liệu cần lưu: `User` (người dùng), `Conversation` (hội thoại) và `Message` (tin nhắn), cùng quan hệ “một hội thoại có nhiều thành viên và nhiều tin nhắn”. Đây là bước **thiết kế database trên giấy**; sơ đồ chi tiết nằm ở mục 5.2 và tài liệu thiết kế kỹ thuật. Sau đó tạo khung React/Express và chạy hai trang kiểm tra ở mục 3–4 để biết công cụ đã hoạt động. Tiếp theo mới tạo Atlas, viết model MongoDB ở mục 5, làm API ở mục 6, rồi làm giao diện sử dụng API ở mục 7. Mục 4 **không phải** làm xong FE/BE trước database: nó chỉ kiểm tra hai chương trình khởi động được.

<a id="e-3-1"></a>

#### 3.1 Cài và kiểm tra công cụ

**Bạn cài trên máy cá nhân trước; chưa cần mua VPS hay cài Docker để làm bài đầu tiên.** Các lệnh `bash` trong tài liệu dùng Terminal trên macOS/Linux hoặc **Git Bash** trên Windows. Đừng dán chúng vào ô tìm kiếm của trình duyệt. Nếu dùng Windows, cài Git trước để có Git Bash; trong VS Code chọn **Terminal > New Terminal**, bấm mũi tên cạnh dấu `+`, chọn **Git Bash** làm terminal mặc định. Nếu dùng macOS, mở ứng dụng Terminal hoặc terminal tích hợp của VS Code.

1. **VS Code — nơi viết mã.** Vào [trang cài VS Code](https://code.visualstudio.com/docs/getstarted/overview), chọn đúng Windows/macOS/Linux. Windows chạy file cài đặt; macOS mở `.dmg` rồi kéo ứng dụng vào Applications; Linux làm theo gói cài dành cho bản phân phối đang dùng. Mở VS Code, chọn **File > Open Folder** và chọn thư mục `btl-chat-onl` đã có sẵn cùng tài liệu này. Cột trái là danh sách file; bấm chuột phải để tạo file/thư mục. **Terminal > New Terminal** để gõ lệnh. Khi sửa xong bấm **Ctrl+S** hoặc **Cmd+S**. Không cần cài extension để chạy bài đầu tiên.
2. **Node.js và npm — chạy JavaScript ngoài trình duyệt và tải thư viện.** Vào [trang tải Node.js](https://nodejs.org/en/download), chọn **Node.js 24 LTS** cho hệ điều hành, tải installer và làm theo màn hình cài đặt. npm được cài cùng Node. Đóng rồi mở lại terminal trước khi kiểm tra. Theo [hướng dẫn Vite](https://vite.dev/guide/), Node phải đáp ứng mức tối thiểu của phiên bản Vite đang dùng; Node 24 LTS đáp ứng yêu cầu của stack đã chốt. `npm install` tải thư viện ghi trong `package.json`, còn `npm run dev` chạy lệnh `dev` được khai báo trong file đó.
3. **Git — ghi lịch sử thay đổi.** Vào [trang tải Git](https://git-scm.com/downloads/), chọn hệ điều hành và cài theo hướng dẫn. Windows dùng Git for Windows; sau khi cài, mở **Git Bash**. macOS có thể dùng phương án cài được trang Git hướng dẫn; nếu `git --version` gợi ý cài Xcode Command Line Tools thì hoàn thành hộp thoại đó. `git status` xem file đã sửa, `git add .` chọn thay đổi, `git commit -m "..."` lưu một mốc tại máy. GitHub là nơi chia sẻ repository trên mạng, khác với Git chạy ở máy.
4. **Trình duyệt — xem ứng dụng và tìm lỗi.** Dùng Chrome hoặc Edge mới. Mở hai cửa sổ ẩn danh/guest để thử hai tài khoản. Nhấn **F12** (macOS có thể dùng **Cmd+Option+I**) để mở DevTools: tab **Console** xem lỗi JavaScript; **Network** xem request API, status và response; tab **Application/Storage** xem cookie khi học refresh token. Ở trang localhost, trình duyệt có thể hỏi quyền camera/micro; chọn cho phép khi thử gọi.
5. **Tài khoản web — chưa phải phần mềm phải cài.** Tạo tài khoản [GitHub](https://github.com/) để cả ba người làm chung, [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) để có database và [Trello](https://trello.com/) để theo dõi việc. Mục 3.3 chỉ cách dùng GitHub, mục 3.4 chỉ cách dùng Trello, mục 5.1 chỉ cách tạo Atlas. Một người tạo project rồi mời hai thành viên còn lại; mỗi người dùng tài khoản GitHub riêng để bảng commit phản ánh đúng đóng góp.

Mở terminal và chạy **từng lệnh**, mỗi lệnh xong mới chạy lệnh sau:

```bash
node --version
npm --version
git --version
```

Nếu `node: command not found`, cài Node.js từ trang chính thức rồi mở cửa sổ terminal mới. Nếu Node quá cũ, nâng cấp trước khi tạo Vite. Không dùng mật khẩu tài khoản thật làm dữ liệu test.

**Đạt khi:** ba lệnh đều in ra phiên bản; bạn mở được VS Code, terminal bên trong VS Code, trang GitHub và Atlas. Nếu Windows báo `npm`/`git` không nhận diện, đóng hẳn VS Code rồi mở lại Git Bash. Nếu còn lỗi, kiểm tra đã dùng đúng installer cho hệ điều hành và mục PATH trong phần cài đặt.

<a id="e-3-2"></a>

#### 3.2 Tạo cây thư mục

Trên máy bạn, thư mục `~/Desktop/btl-chat-onl` **đã có Git và `client` React/Vite với ESLint**. Trong VS Code, chọn **File > Open Folder > btl-chat-onl** trên Desktop. Mở terminal, rồi chạy `pwd` để kiểm tra. **Không chạy lại** `git init`, `npm create vite...` hoặc `npm init` trong `client`; các bước đó đã xong. Từ trạng thái hiện tại, chạy từng dòng sau:

```bash
cd ~/Desktop/btl-chat-onl
cd client
npm install socket.io-client
npm install tailwindcss@^4 @tailwindcss/vite@^4
cd ..
mkdir -p server
cd server
npm init -y
npm install express mongoose cors dotenv socket.io bcryptjs jsonwebtoken cookie-parser multer@^2
npm pkg set type=module
npm pkg set scripts.dev="node --watch src/index.js"
npm pkg set scripts.start="node src/index.js"
npm pkg set scripts.lint="eslint ."
mkdir -p src
cd ..
```

**Nếu npm in `added ... packages`, `found 0 vulnerabilities` nhưng kèm `npm warn allow-scripts ... fsevents@2.3.3`:** bước cài đã thành công. `fsevents` là dependency tùy chọn trên macOS do Vite dùng; cảnh báo chỉ nhắc bạn xem xét install script của gói đó. Bạn có thể tiếp tục bước sau, không cần chạy `npm approve-scripts --all`. Lệnh `npm fund` chỉ mở thông tin tài trợ cho các gói, không phải yêu cầu bắt buộc. Xem [giải thích `approve-scripts` của npm](https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts/).

**Bạn đã chọn ESLint đúng rồi:** file `client/eslint.config.js` và lệnh `npm run lint` đã có trong `client/package.json`. Không cần cài ESLint lần nữa ở `client`. Nếu một thành viên khác tạo project mới từ đầu, lệnh tạo mẫu là `npm create vite@latest client -- --template react --eslint`; nhưng nhóm nên clone repository đã có theo mục 3.3. ESLint đọc code và báo lỗi thường gặp trước khi chạy ứng dụng; nó không thay thế việc test chức năng. Xem [mã nguồn create-vite](https://github.com/vitejs/vite/blob/main/packages/create-vite/src/index.ts) và [hướng dẫn ESLint](https://eslint.org/docs/latest/use/getting-started/).

Tạo `server/eslint.config.js` với nội dung sau để ESLint hiểu code backend chạy trên Node.js:

```js
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.js"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
      sourceType: "module",
    },
  },
]);
```

**Vì sao thêm `globals.node`?** Backend có các tên Node.js như `process`; nếu không khai báo môi trường Node, linter có thể báo nhầm là biến chưa được định nghĩa. `eslint.config.js` là quy tắc kiểm tra, còn `npm pkg set scripts.lint="eslint ."` tạo lệnh chạy quy tắc đó. Khi có code, chạy `cd client && npm run lint` để kiểm tra frontend, rồi `cd ../server && npm run lint` để kiểm tra backend.

Trong `client/vite.config.js`, giữ plugin React của Vite và thêm plugin Tailwind:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Vì sao làm bước này?** Vite cần plugin để sinh CSS từ các utility class trong JSX. `client/src/index.css` sẽ nạp Tailwind ở mục 7.3; file `client/src/main.jsx` do Vite tạo sẵn đã import `./index.css`, nên không cần thêm thẻ `<link>` vào HTML. Kiểm tra cả hai file trước khi chạy. [Cách cài chính thức](https://tailwindcss.com/docs/installation/using-vite).

**Vì sao chia `client` và `server`?** `client` chạy trong trình duyệt, nên mọi thứ trong đó có thể bị người khác xem. `server` chạy trên máy chủ và giữ logic, mật khẩu kết nối database, khóa ký JWT. Không đặt bí mật trong `client` hoặc biến môi trường `VITE_*`.

Cấu trúc sau khi tạo xong:

```text
btl-chat-onl/
  client/
    src/App.jsx
    src/index.css
    vite.config.js
    eslint.config.js
    package.json
    package-lock.json
  server/
    src/index.js
    src/models.js
    eslint.config.js
    .env
    package.json
    package-lock.json
  .gitignore
```

Tạo file `.gitignore` **ngay trong thư mục gốc `btl-chat-onl`**, cùng cấp với `client`, `server` và `TAI_LIEU_DU_AN.md` (không tạo bên trong `client` hoặc `server`). File này đã được tạo trên máy hiện tại; các thành viên khác sẽ nhận được khi clone repository sau khi bạn commit.

**Cách tự tạo trong VS Code:** mở thư mục `btl-chat-onl` bằng **File > Open Folder**. Ở thanh Explorer bên trái, bấm chuột phải đúng vào tên thư mục `btl-chat-onl`, chọn **New File**, gõ chính xác `.gitignore` (có dấu chấm ở đầu), nhấn Enter, dán nội dung dưới đây rồi nhấn **Cmd+S** trên Mac hoặc **Ctrl+S** trên Windows. File có dấu chấm ở đầu có thể bị Finder ẩn; trong terminal dùng `ls -a` để thấy nó.

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
server/uploads/
```

**Cách kiểm tra:** mở terminal ở thư mục gốc, chạy `pwd` để thấy đường dẫn kết thúc bằng `btl-chat-onl`, rồi chạy `ls -a`. Danh sách phải có `.gitignore` cùng cấp với `client` và `server`. Chạy `git status --short`; thư mục `node_modules` không được liệt kê để commit.

**Vì sao cần `.gitignore`?** Nó ngăn Git đưa thư viện tải về, file build, tệp upload và bí mật vào repository. Dòng `!.env.example` cho phép commit file cấu hình mẫu chỉ ghi _tên_ biến, không ghi giá trị thật. Tạo file này **trước khi chạy `git add .`**.

<a id="e-3-3"></a>

#### 3.3 Tạo repository chung trên GitHub

**GitHub:** một thành viên đăng nhập, bấm dấu **+ > New repository**, đặt tên `btl-chat-onl`, chọn phạm vi public/private theo yêu cầu lớp. Vì mục 3.2 đã tạo `git init` và `.gitignore` ở máy, khi tạo repository trên GitHub hãy để trống lựa chọn tạo README, `.gitignore` và license để lần push đầu dễ hơn. Sau khi tạo, sao chép URL HTTPS của repository. Chủ repository thực hiện lệnh `git remote add origin ...` và `git push` ở mục 4.3. Vào **Settings > Collaborators** (hoặc mục quản lý quyền tương ứng) để mời hai thành viên. Hai người kia bấm chấp nhận lời mời, sao chép URL ở nút **Code**, mở Git Bash/Terminal rồi chạy `git clone URL_THAT`, sau đó `cd btl-chat-onl`. Nếu Git yêu cầu đăng nhập khi push, làm theo cửa sổ đăng nhập của Git Credential Manager/trình duyệt; không gõ mật khẩu GitHub vào file code. Xem [hướng dẫn tạo repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) và [pull request](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests).

**Đạt khi:** cả ba người nhìn thấy repository; `git remote -v` trên máy chủ repository hiện URL thật; hai người còn lại `git clone` được. Nếu `remote origin already exists`, chạy `git remote -v` để xem URL cũ trước khi thay; không tạo thêm repository trùng tên chỉ để né lỗi.

<a id="e-3-4"></a>

#### 3.4 Sử dụng Trello để quản lý nhóm ba người

**Bước 1 — Tạo board và mời nhóm.** Mở [Trello](https://trello.com/) bằng tài khoản của một thành viên, chọn **Create > Create Board**, đặt tên `Chat Call BTL`, chọn Workspace và quyền xem phù hợp yêu cầu lớp. Trong board, dùng nút **Share/Invite** để mời hai thành viên bằng email; cả ba cần chấp nhận lời mời và thấy cùng một board. [Tài liệu tạo board](https://support.atlassian.com/trello/docs/creating-a-new-board/) và [mời người vào board](https://support.atlassian.com/trello/docs/adding-people-to-a-board/) có hình giao diện nếu nút trên máy bạn khác tên.

**Bước 2 — Tạo cột trạng thái.** Bấm **Add another list** để tạo các cột `Backlog` (mọi việc), `Ready` (việc đã rõ và sẵn sàng làm tuần này), `In progress` (đang code), `Review` (đã mở PR), `Test` (đang chạy thử), `Done` (đã nghiệm thu), `Blocked` (bị chặn). Dùng đúng các tên này trong [kế hoạch ba tuần](#phan-d). Mỗi card chỉ nằm trong một cột; kéo card sang cột mới khi trạng thái thực sự đổi. Việc bị chặn chuyển sang `Blocked`, ghi rõ lỗi, người cần hỗ trợ và ngày sẽ kiểm tra lại.

**Bước 3 — Tạo card đủ thông tin.** Ở cột `Backlog`, bấm **Add a card**, đặt tên theo kết quả cần giao, ví dụ `BE: đăng ký và đăng nhập bằng JWT` thay vì `Làm backend`. Mở card và điền mẫu sau vào **Description**:

```text
Mục tiêu: A đăng ký/đăng nhập được; dữ liệu user lưu trong MongoDB.
Người phụ trách: B. Tuần học phần: [điền tuần thật]. Hạn: [ngày/giờ].
File dự kiến: server/src/index.js, server/src/models.js.
Điều kiện xong: đăng ký đúng; trùng email trả 409; mật khẩu không lưu dạng rõ.
Cách kiểm tra: gọi API bằng Postman/curl và kiểm tra collection users.
Bằng chứng: link branch/PR, commit SHA, ảnh hoặc log đã che bí mật.
```

Trong card, dùng **Members** để gán đúng người làm chính, **Dates** để đặt hạn, **Labels** để phân loại `FE`, `BE`, `Database`, `Realtime`, `Call`, `Deploy`, `Report`. Thêm **Checklist** gồm `Code`, `Tự chạy thử`, `Mở PR`, `Bạn khác review`, `Cập nhật bằng chứng`. Gắn link PR và ảnh demo bằng **Attachment** hoặc trong bình luận. Nếu Trello hiển thị giao diện card mới, các nút này có thể nằm dưới **Add**. [Tài liệu card/list](https://support.atlassian.com/trello/docs/add-and-customize-cards-and-lists/), [ngày hạn](https://support.atlassian.com/trello/docs/adding-dates-to-cards/) và [checklist](https://support.atlassian.com/trello/docs/adding-checklists-to-cards/) là nguồn tra cứu. Chỉ cần gán hạn và người cho **card**; hạn/người cho từng mục checklist có thể phụ thuộc gói Trello.

**Bước 4 — Chia đều và cập nhật hằng ngày.** Tạo trước ít nhất ba card đầu: A nhận `FE: trang đăng nhập và chat`, B nhận `Database/BE: model và API auth`, C nhận `Realtime: Socket.IO room và gửi tin`. Tách card lớn thành phần hoàn thành được trong 1–2 ngày. Mỗi sáng, cả nhóm xem cột `Ready`, chọn việc đưa sang `In progress`, đọc lại điều kiện xong. Cuối ngày, người làm bình luận ngắn “đã làm gì, test ra sao, link commit/PR”, rồi kéo card đúng trạng thái. Card sang `Done` **chỉ khi** mã chạy, có kiểm thử, PR được người khác review và bằng chứng đã gắn; không đánh dấu Done chỉ vì đã viết code.

**Bước 5 — Họp cuối tuần và giữ bằng chứng.** Mở board, lọc/nhìn card theo người phụ trách và tuần học phần; kiểm tra cả ba có việc hoàn thành, PR và commit code có ích. Tạo một card `Tổng kết tuần [số tuần học phần]` trong `Done`, ghi link ba PR/commit, mốc demo, lỗi còn mở và việc chuyển sang tuần sau. Chụp toàn board cùng ngày/tuần và lưu link ảnh vào báo cáo. Trello chứng minh **phân công và tiến độ**; GitHub chứng minh **ai thật sự viết mã**. Xem quy tắc kiểm tra commit ở mục 4.4.

**Đạt khi:** ba tài khoản cùng vào board, mỗi người có card phụ trách và hạn rõ, card có điều kiện kiểm thử, trạng thái được cập nhật mỗi ngày, cuối tuần đối chiếu được card với PR/commit thật.

<a id="e-4"></a>

### 4. Chạy trang React và API đầu tiên

<a id="e-4-1"></a>

#### 4.1 Chạy React

Trong terminal thứ nhất, **đang ở thư mục gốc `btl-chat-onl`** sau mục 3.2:

```bash
cd client
npm run dev
```

Mở URL mà terminal hiện ra, thường là `http://localhost:5173`. Nếu thấy trang Vite React, frontend đã chạy. `localhost` là máy của bạn; port `5173` là cửa của frontend.

<a id="e-4-2"></a>

#### 4.2 Tạo backend nhỏ nhất

Tạo `server/src/index.js` với nội dung tạm thời:

```js
import express from "express";

const app = express();
app.get("/healthz", (req, res) => {
  res.json({ ok: true, service: "chat-api" });
});

app.listen(3001, () => console.log("API chạy ở http://localhost:3001"));
```

`import` lấy thư viện Express. `app.get('/healthz', ...)` định nghĩa một địa chỉ đọc thử. `res.json(...)` trả dữ liệu JSON. `app.listen(3001)` mở port 3001.

Mở terminal thứ hai trong VS Code bằng **Terminal > New Terminal**. Terminal mới phải đứng ở thư mục gốc `btl-chat-onl`; nếu chưa đúng, dùng `cd` để vào thư mục đó trước. Sau đó chạy:

```bash
cd server
npm run dev
```

Mở `http://localhost:3001/healthz`. Nếu thấy `{"ok":true,"service":"chat-api"}`, backend hoạt động. Đến đây bạn đã có hai chương trình khác nhau chạy song song. Nếu trình duyệt báo không kết nối được, xem terminal thứ hai có lỗi và đã chạy ở đúng thư mục chưa.

<a id="e-4-3"></a>

#### 4.3 Commit đầu tiên

Từ thư mục gốc dự án:

```bash
git add .
git commit -m "chore: khoi tao React va Express"
```

Nếu Git báo chưa biết tên/email, chạy `git config user.name "Tên của bạn"` và `git config user.email "email-cua-ban@example.com"` trong thư mục dự án rồi chạy lại lệnh commit. Dùng `git status` để xem file nào đã thay đổi. Commit là một mốc có thể quay lại và cũng là bằng chứng đóng góp hằng tuần.

Khi nhóm đã tạo repository GitHub chung, chủ repository sao chép URL repository thật rồi chạy từ thư mục gốc:

```bash
git branch -M main
git remote add origin URL_REPOSITORY_THAT
git push -u origin main
```

Các thành viên còn lại clone repository đó về máy rồi tạo nhánh riêng cho việc mình làm. Mỗi ngày trước khi code, kéo bản mới nhất của nhóm; sau khi test xong, commit và mở pull request để một người khác review. Không ba người cùng sửa `server/src/index.js` một lúc; chia việc theo route/component hoặc hẹn giờ ghép code để tránh xung đột. Điều kiện có commit code hằng tuần từ tuần 7 là tiêu chí chấm điểm, nên đừng gom mọi thay đổi vào một tài khoản.

**Một vòng làm việc Git/GitHub cho người mới** (chạy ở thư mục gốc của bản `git clone`; thay `chat-ui` bằng việc của bạn):

```bash
git switch main
git pull origin main
git switch -c feat/chat-ui
git status
# Sau khi sửa và tự test:
git add .
git commit -m "feat: them giao dien chat"
git push -u origin feat/chat-ui
```

Lệnh `pull` lấy bản mới nhất, `switch -c` tạo nhánh riêng, `status` cho biết file nào thay đổi, `add` chọn file, `commit` lưu mốc tại máy, `push` đưa nhánh lên GitHub. Trên trang repository, bấm **Compare & pull request**, chọn nhánh đích `main` ở giai đoạn đầu (hoặc `develop` khi nhóm đã tạo nhánh này theo mục 16), viết thay đổi và cách test, rồi bấm **Create pull request**. Một bạn khác đọc phần **Files changed**, chạy thử nếu cần và review trước khi merge. Sau merge, người làm chuyển về nhánh đích và pull bản mới trước khi tạo nhánh tiếp theo. Nếu `git status` hiện `.env` hoặc `node_modules`, dừng trước khi `add`, sửa `.gitignore` ở mục 3.2.

<a id="e-4-4"></a>

#### 4.4 Bảo đảm mỗi thành viên có commit code có ích hằng tuần

**Đây là yêu cầu chấm điểm, không chỉ là lời khuyên:** theo bảng tiêu chí của môn, **mọi thành viên trong nhóm đều phải commit code hằng tuần từ tuần 7 của học phần**. Kế hoạch thực hiện trong ba tuần không thay thế mốc tuần 7: nếu ba tuần dự án rơi vào tuần học phần 8–10, ghi đúng 8–10; nếu còn các tuần sau dự án trước hạn nộp, vẫn duy trì commit code có ích mỗi tuần đó. Không sửa ngày máy tính hoặc tạo commit giả để bù tuần đã qua.

**Commit “có ích” là gì?** Nó phải thay đổi mã nguồn hoặc cấu hình chạy/kiểm thử theo một card thật, có thể giải thích và kiểm tra được. Ví dụ: A thêm form đăng nhập có xử lý lỗi; B thêm model/index và route đăng ký; C thêm event Socket.IO có kiểm tra quyền; hoặc một người sửa bug camera không tắt sau call và thêm ca test. Commit chỉ đổi khoảng trắng, đổi tên file vô cớ, sửa README, commit rỗng, hoặc chỉ merge PR của người khác **không đủ để chứng minh đã viết code**. Giữ commit nhỏ, tên nói rõ kết quả: `feat: add group membership check`, `fix: stop media tracks on call end`, `test: reject non-member message`.

**Làm thật mỗi tuần:** vào đầu tuần, mỗi người nhận ít nhất một card **có phần code riêng** trên Trello, có người phụ trách và hạn trước cuối tuần. Trong tuần, tự chạy thử, commit bằng tài khoản Git của mình, `git push` lên GitHub, mở PR và gắn URL PR cùng SHA commit vào card. Cố gắng có 2–3 commit rõ nghĩa/người/tuần để tiến độ không dồn vào một buổi; điều kiện tối thiểu cần tự kiểm là **mỗi người có ít nhất một commit code có ích trong từng tuần học phần từ tuần 7**. Đừng chia một thay đổi nhỏ thành nhiều commit rỗng chỉ để tăng số lượng. Trước khi commit lần đầu, kiểm tra `git config user.name` và `git config user.email`; email nên là email đã liên kết với tài khoản GitHub của đúng thành viên để lịch sử tác giả hiện đúng.

| Tuần dự án | Tuần học phần thực tế | A: ví dụ phần code       | B: ví dụ phần code             | C: ví dụ phần code                    | Bằng chứng cuối tuần     |
| ---------- | --------------------- | ------------------------ | ------------------------------ | ------------------------------------- | ------------------------ |
| 1          | Điền số tuần thật     | Form login/chat đầu tiên | Model và auth/chat API         | Socket room/gửi tin                   | 3 SHA + 3 card + PR/test |
| 2          | Điền số tuần thật     | Inbox/nhóm/mobile        | Quyền nhóm, phân trang, upload | Presence/WebRTC LAN                   | 3 SHA + 3 card + PR/test |
| 3          | Điền số tuần thật     | Call UI/responsive       | Test quyền và sửa bug backend  | TURN API, call cleanup, deploy config | 3 SHA + 3 card + PR/test |

**Kiểm tra vào ngày cuối tuần:** trên GitHub mở repository, xem danh sách **Commits** và PR của từng người; mở từng SHA để xem file code nào đổi và đọc cách test trong PR. Trên máy đã clone repository, có thể chạy `git fetch --all` rồi `git log --all --since="YYYY-MM-DD 00:00" --until="YYYY-MM-DD 23:59" --format="%h %ad %an <%ae> %s" --date=short` (thay hai ngày bằng đầu/cuối **tuần học phần thật**) để rà soát tác giả; mở chi tiết bằng `git show --stat SHA`. Lệnh `git log` có thể hiện commit ở nhánh chưa merge; để bằng chứng dễ đối chiếu, hoàn tất review/merge PR trước mốc cuối tuần khi có thể và lưu link PR trong Trello. Nếu ai thiếu commit, chia ngay một card code phù hợp và làm/test thật trước khi tuần kết thúc; không nhờ người khác commit hộ. Card `Tổng kết tuần` ở mục 3.4 cần ghi ba SHA và kết quả kiểm tra này.

<a id="e-5"></a>

### 5. Kết nối MongoDB và tạo mô hình dữ liệu

<a id="e-5-1"></a>

#### 5.1 Tạo Atlas và biến môi trường

**Atlas là dịch vụ web, không cần cài MongoDB Server lên laptop.** Đăng nhập [MongoDB Atlas](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/), tạo **Project** cho nhóm rồi chọn tạo **Free cluster** (nếu gói Free còn phù hợp với tài khoản/vùng của bạn). Đặt tên cluster, chọn vùng gần người dùng rồi chờ trạng thái sẵn sàng. Trong bước bảo mật, tạo **database user** riêng cho ứng dụng: lưu username và password ở chỗ riêng tư; đây không phải tài khoản đăng nhập website Atlas. Ở **Network Access/IP Access List**, thêm **IP hiện tại của máy bạn** để máy local kết nối; khi deploy sau này, thêm IP public của VPS. Không chọn mở truy cập từ mọi IP chỉ để chữa lỗi kết nối.

Ở màn cluster, bấm **Connect > Drivers** (hoặc mục kết nối ứng dụng tương đương), chọn driver Node.js và sao chép connection string dạng `mongodb+srv://...`. Thay `<db_username>`, `<db_password>` bằng database user đã tạo và thêm tên database `chatcall` trước dấu `?`. Nếu mật khẩu chứa `@`, `#`, `/` hoặc ký tự đặc biệt, URL-encode nó hoặc tạo password alphanumeric dễ dán cho môi trường học tập. Atlas cần **cả** database user **và** IP được phép; thiếu một trong hai thì Mongoose không kết nối. Xem [hướng dẫn kết nối Atlas](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/).

**Database `chatcall` được tạo lúc nào?** Cluster Atlas là máy chủ chứa database; `chatcall` là tên database của ứng dụng trong `MONGODB_URI`. Bạn không cần chạy lệnh SQL `CREATE DATABASE`. Sau khi backend kết nối và ghi user/tin nhắn đầu tiên, MongoDB sẽ tạo database và collection cần dùng; các model ở mục 5.2 cho biết cấu trúc bản ghi. Nếu vừa tạo cluster mà chưa thấy `chatcall` trong **Browse Collections**, đó có thể chỉ là vì ứng dụng chưa ghi dữ liệu. Hãy làm đến mục 6.3, đăng ký tài khoản thử rồi quay lại Atlas kiểm tra collection `users`.

Tạo `server/.env`:

```dotenv
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb+srv://TEN_USER:MAT_KHAU@TEN_CLUSTER/chatcall?retryWrites=true&w=majority
JWT_SECRET=thay_bang_mot_chuoi_ngau_nhien_dai_it_nhat_32_ky_tu
```

Giá trị trên chỉ là ví dụ. Thay bằng URI thật và chuỗi bí mật tự tạo. Không chụp ảnh, gửi chat nhóm hoặc commit file `.env`. Tạo thêm `server/.env.example` với các tên biến như trên nhưng để trống giá trị nhạy cảm.

**Dùng Atlas để kiểm tra dữ liệu:** sau khi backend chạy và gửi được tin, mở cluster trên website Atlas, chọn **Browse Collections/Data Explorer**, chọn database `chatcall`, rồi xem `users`, `conversations`, `messages`. Mỗi lần gửi tin mới, refresh danh sách `messages` và đối chiếu `body`, `seq`, `conversationId`. Nếu backend báo timeout/không kết nối, kiểm tra IP Access List, database user, URI, mạng máy và xem cluster có đang ở trạng thái hoạt động không trước khi sửa code.

<a id="e-5-2"></a>

#### 5.2 Tạo ba model

Thay nội dung `server/src/models.js` bằng:

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

const conversationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["direct", "group"], default: "direct" },
    directKey: String,
    title: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastSeq: { type: Number, default: 0 },
  },
  { timestamps: true },
);
conversationSchema.index(
  { directKey: 1 },
  {
    unique: true,
    partialFilterExpression: { type: "direct" },
  },
);

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientMessageId: { type: String, required: true },
    seq: { type: Number, required: true },
    body: { type: String, required: true, maxlength: 2000 },
  },
  { timestamps: true },
);
messageSchema.index({ senderId: 1, clientMessageId: 1 }, { unique: true });
messageSchema.index({ conversationId: 1, seq: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);
export const Conversation = mongoose.model("Conversation", conversationSchema);
export const Message = mongoose.model("Message", messageSchema);
```

**Đọc model như thế nào?** `User` là một người, `Conversation` là phòng chat, `Message` là một tin. `memberIds` cho biết ai được vào phòng. `lastSeq` là số thứ tự tin mới nhất trong phòng. `clientMessageId` do trình duyệt tạo để khi mạng lỗi gửi lại, server nhận ra đó là cùng một tin. Index `unique` phải nằm ở MongoDB vì kiểm tra ở giao diện không chống được hai request đến cùng lúc.

Để học dễ và hoàn thành trong ba tuần, `memberIds` nằm trong `Conversation` và là nguồn quyền truy cập duy nhất; `ownerId` cho biết ai quản trị nhóm. Khi làm read receipt, bổ sung `readSeqByUser` vào cùng Conversation theo mục 19.3. Không tạo thêm một nguồn membership thứ hai rồi để hai nơi kiểm tra quyền khác nhau.

<a id="e-6"></a>

### 6. Viết API đăng ký đăng nhập và chat riêng

<a id="e-6-1"></a>

#### 6.1 Thay backend tạm thời bằng backend có dữ liệu thật

Thay toàn bộ `server/src/index.js` bằng đoạn sau. Đọc phần giải thích ngay sau code trước khi chạy.

```js
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { User, Conversation, Message } from "./models.js";

const app = express();
const httpServer = createServer(app);
const origin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const io = new Server(httpServer, { cors: { origin } });

app.use(cors({ origin }));
app.use(express.json({ limit: "32kb" }));

function publicUser(user) {
  return {
    id: String(user._id),
    email: user.email,
    displayName: user.displayName,
  };
}

function makeToken(user) {
  return jwt.sign({ sub: String(user._id) }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token) return res.status(401).json({ error: "NEED_LOGIN" });
    req.userId = jwt.verify(token, process.env.JWT_SECRET).sub;
    next();
  } catch {
    res.status(401).json({ error: "TOKEN_INVALID" });
  }
}

app.get("/healthz", (req, res) => res.json({ ok: true }));

app.post("/api/auth/register", async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const displayName = String(req.body?.displayName || "").trim();
  const password = String(req.body?.password || "");
  if (
    !/^\S+@\S+\.\S+$/.test(email) ||
    displayName.length < 2 ||
    password.length < 8
  ) {
    return res.status(400).json({ error: "INVALID_REGISTER_DATA" });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const user = await User.create({ email, displayName, passwordHash });
    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ error: "EMAIL_EXISTS" });
    throw error;
  }
});

app.post("/api/auth/login", async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();
  const user = await User.findOne({ email });
  const ok =
    user &&
    (await bcrypt.compare(String(req.body?.password || ""), user.passwordHash));
  if (!ok) return res.status(401).json({ error: "BAD_CREDENTIALS" });
  res.json({ token: makeToken(user), user: publicUser(user) });
});

app.get("/api/users", requireAuth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.userId } }).select(
    "email displayName",
  );
  res.json(users.map(publicUser));
});

app.post("/api/conversations/direct", requireAuth, async (req, res) => {
  const otherUserId = String(req.body?.otherUserId || "");
  if (!mongoose.isValidObjectId(otherUserId) || otherUserId === req.userId) {
    return res.status(400).json({ error: "INVALID_USER" });
  }
  if (!(await User.exists({ _id: otherUserId }))) {
    return res.status(404).json({ error: "USER_NOT_FOUND" });
  }
  const memberIds = [req.userId, otherUserId].sort();
  const directKey = memberIds.join(":");
  let conversation;
  try {
    conversation = await Conversation.findOneAndUpdate(
      { directKey },
      { $setOnInsert: { type: "direct", directKey, memberIds, lastSeq: 0 } },
      { upsert: true, new: true },
    );
  } catch (error) {
    if (error.code !== 11000) throw error;
    conversation = await Conversation.findOne({ directKey });
  }
  res.json(conversation);
});

app.get("/api/conversations", requireAuth, async (req, res) => {
  const conversations = await Conversation.find({ memberIds: req.userId }).sort(
    { updatedAt: -1 },
  );
  res.json(conversations);
});

app.get("/api/conversations/:id/messages", requireAuth, async (req, res) => {
  const id = req.params.id;
  const afterSeq = Number(req.query.afterSeq || 0);
  if (
    !mongoose.isValidObjectId(id) ||
    !Number.isInteger(afterSeq) ||
    afterSeq < 0
  ) {
    return res.status(400).json({ error: "INVALID_CURSOR" });
  }
  const isMember = await Conversation.exists({
    _id: id,
    memberIds: req.userId,
  });
  if (!isMember) return res.status(403).json({ error: "NOT_A_MEMBER" });
  const messages = await Message.find({
    conversationId: id,
    seq: { $gt: afterSeq },
  })
    .sort({ seq: 1 })
    .limit(100);
  res.json(messages);
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    socket.data.userId = jwt.verify(token, process.env.JWT_SECRET).sub;
    next();
  } catch {
    next(new Error("TOKEN_INVALID"));
  }
});

io.on("connection", (socket) => {
  const userId = socket.data.userId;
  socket.join(`user:${userId}`);

  socket.on("join_conversation", async (conversationId, ack) => {
    try {
      if (!mongoose.isValidObjectId(conversationId))
        return ack?.({ ok: false });
      const allowed = await Conversation.exists({
        _id: conversationId,
        memberIds: userId,
      });
      if (!allowed) return ack?.({ ok: false });
      socket.join(`conversation:${conversationId}`);
      ack?.({ ok: true });
    } catch {
      ack?.({ ok: false });
    }
  });

  socket.on("send_message", async (data, ack) => {
    try {
      const conversationId = String(data?.conversationId || "");
      const clientMessageId = String(data?.clientMessageId || "");
      const body = String(data?.body || "").trim();
      if (
        !mongoose.isValidObjectId(conversationId) ||
        !/^[0-9a-f-]{36}$/i.test(clientMessageId) ||
        !body ||
        body.length > 2000
      ) {
        return ack?.({ ok: false, error: "INVALID_MESSAGE" });
      }
      const allowed = await Conversation.exists({
        _id: conversationId,
        memberIds: userId,
      });
      if (!allowed) return ack?.({ ok: false, error: "NOT_A_MEMBER" });

      let message = await Message.findOne({
        senderId: userId,
        clientMessageId,
      });
      let isNew = false;
      if (message && String(message.conversationId) !== conversationId) {
        return ack?.({ ok: false, error: "MESSAGE_ID_REUSED" });
      }
      if (!message) {
        try {
          await mongoose.connection.transaction(async (session) => {
            const conversation = await Conversation.findOneAndUpdate(
              { _id: conversationId, memberIds: userId },
              { $inc: { lastSeq: 1 } },
              { new: true, session },
            );
            if (!conversation) throw new Error("NOT_A_MEMBER");
            const created = await Message.create(
              [
                {
                  conversationId,
                  senderId: userId,
                  clientMessageId,
                  seq: conversation.lastSeq,
                  body,
                },
              ],
              { session },
            );
            message = created[0];
          });
          isNew = true;
        } catch (error) {
          if (error.code !== 11000) throw error;
          message = await Message.findOne({
            senderId: userId,
            clientMessageId,
          });
          if (!message || String(message.conversationId) !== conversationId)
            throw error;
        }
      }
      if (isNew)
        io.to(`conversation:${conversationId}`).emit("message_new", message);
      ack?.({ ok: true, message });
    } catch (error) {
      ack?.({
        ok: false,
        error:
          error.message === "NOT_A_MEMBER" ? "NOT_A_MEMBER" : "SEND_FAILED",
      });
    }
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "SERVER_ERROR" });
});

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  throw new Error("Thiếu MONGODB_URI hoặc JWT_SECRET trong server/.env");
}
await mongoose.connect(process.env.MONGODB_URI);
await Promise.all([User.init(), Conversation.init(), Message.init()]);
httpServer.listen(Number(process.env.PORT || 3001), () => {
  console.log(`API sẵn sàng ở port ${process.env.PORT || 3001}`);
});
```

<a id="e-6-2"></a>

#### 6.2 Hiểu vì sao các phần trên tồn tại

- `createServer(app)` cho Express và Socket.IO dùng chung một cổng. Nếu gọi `app.listen` rồi tạo Socket.IO trên một server khác, client sẽ kết nối sai cổng.
- `cors({ origin })` chỉ cho phép frontend ở địa chỉ đã chỉ định gọi API khi chạy khác origin trong quá trình phát triển. CORS không thay kiểm tra đăng nhập hoặc quyền phòng chat.
- `bcrypt.hash` biến mật khẩu thành hash trước khi ghi DB; `bcrypt.compare` kiểm tra khi login. Không bao giờ trả `passwordHash` về trình duyệt.
- JWT chứa `sub` là ID người dùng, được ký để server kiểm tra. JWT không mã hóa dữ liệu; không đưa bí mật vào payload.
- `requireAuth` dùng cho HTTP. `io.use` dùng cho kết nối Socket.IO. Cả hai phải kiểm tra token vì đây là hai đường vào server khác nhau.
- `Conversation.exists({ memberIds: userId })` là kiểm tra quyền ở server. Ẩn nút trên UI không đủ vì người khác vẫn có thể tự gửi request.
- Trong `send_message`, transaction tăng `lastSeq` và ghi `Message` cùng nhau. Nhờ đó, không có tin đã lưu mà thiếu thứ tự hoặc số thứ tự tăng nhưng không có tin. Để transaction chạy được, dùng Atlas/replica set, không dùng MongoDB standalone chưa cấu hình replica set.
- Server `emit` và `ack` sau khi transaction hoàn tất. Nếu emit bị mất, client có thể tải lại tin từ DB. Nếu ACK mất, client gửi lại cùng `clientMessageId` và nhận lại tin cũ.
- `User.init()`, `Conversation.init()` và `Message.init()` đảm bảo index đã sẵn sàng trước khi server nhận request. Với database demo nhỏ thì chi phí này chấp nhận được.

**Điểm cần hiểu:** đoạn trên là bản đầu của chat riêng. HTTP sẽ từ chối access token hết hạn sau 15 phút, nhưng socket đã kết nối trước đó vẫn mở cho đến khi ngắt kết nối. Bản nộp cần buộc socket xác thực lại hoặc ngắt khi token hết hạn, đồng thời thêm refresh token như mục 9. Không coi đây là phiên bản bảo mật hoàn chỉnh.

<a id="e-6-3"></a>

#### 6.3 Chạy thử API

Khởi động lại backend bằng `npm run dev`. Terminal phải hiện `API sẵn sàng...`. Nếu chưa có database, server sẽ báo lỗi URI hoặc network. Mở `http://localhost:3001/healthz` và kiểm tra `{ "ok": true }`.

Bạn có thể dùng Postman hoặc chạy trong terminal:

Nếu muốn bấm nút thay vì gõ `curl`, tải **Postman desktop** từ [trang chính thức](https://www.postman.com/downloads/) (chọn đúng Windows/macOS/Linux) và mở ứng dụng. Tạo request mới, chọn phương thức **POST**, nhập URL `http://localhost:3001/api/auth/register`; ở tab **Body** chọn **raw > JSON**, dán phần JSON sau `-d` trong ví dụ bên dưới; bấm **Send**. Nhìn mã trạng thái và phần **Response** ở dưới: đăng ký đúng trả thông tin user, nhập trùng email trả 409. Với login, đổi URL thành `/api/auth/login` và body thành JSON ở ví dụ thứ hai. Postman chỉ là công cụ thử API, không phải một phần ứng dụng nộp bài. Bản web của Postman có thể cần desktop agent để gọi `localhost`, nên bản desktop dễ hơn cho người mới.

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@example.com","displayName":"An","password":"password123"}'
```

Tạo thêm `b@example.com` bằng cách thay email và tên. Sau đó login:

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"a@example.com","password":"password123"}'
```

Kết quả phải có `token` và `user`. Đừng đưa token thật vào commit hoặc ảnh công khai.

<a id="e-7"></a>

### 7. Viết giao diện chat đầu tiên

<a id="e-7-1"></a>

#### 7.1 Tạo địa chỉ API cho frontend

Tạo `client/.env`:

```dotenv
VITE_API_URL=http://localhost:3001
```

Tên bắt đầu bằng `VITE_` để Vite đưa giá trị này vào code chạy trong trình duyệt. Vì trình duyệt nhìn thấy nó, chỉ để URL công khai ở đây, không để URI MongoDB, JWT secret hay TURN shared secret. Sau khi sửa `.env`, khởi động lại `npm run dev` của frontend.

<a id="e-7-2"></a>

#### 7.2 Thay `client/src/App.jsx`

Đoạn này hơi dài, nhưng bạn có thể học theo từng nhóm: `request` gọi API, state giữ dữ liệu màn hình, `useEffect` nối socket, các hàm `handle...` xử lý nút bấm, phần `return` là giao diện.

```jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request(path, options = {}, token = "") {
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const response = await fetch(API_URL + path, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

async function loadAllMessages(conversationId, token) {
  const all = [];
  let afterSeq = 0;
  while (true) {
    const page = await request(
      `/api/conversations/${conversationId}/messages?afterSeq=${afterSeq}`,
      {},
      token,
    );
    all.push(...page);
    if (page.length < 100) break;
    afterSeq = page[page.length - 1].seq;
  }
  return all;
}

function mergeMessages(current, incoming) {
  const byClientId = new Map(
    current.map((message) => [message.clientMessageId, message]),
  );
  for (const message of incoming)
    byClientId.set(message.clientMessageId, message);
  return [...byClientId.values()].sort(
    (a, b) =>
      (a.seq ?? Number.MAX_SAFE_INTEGER) - (b.seq ?? Number.MAX_SAFE_INTEGER),
  );
}

export default function App() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [token, setToken] = useState("");
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  const activeIdRef = useRef("");

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!token) return;
    request("/api/users", {}, token)
      .then(setUsers)
      .catch((e) => setError(e.message));
    request("/api/conversations", {}, token)
      .then(setConversations)
      .catch((e) => setError(e.message));

    const socket = io(API_URL, { auth: { token } });
    socketRef.current = socket;
    socket.on("connect", async () => {
      const id = activeIdRef.current;
      if (!id) return;
      socket.emit("join_conversation", id);
      try {
        const history = await loadAllMessages(id, token);
        if (activeIdRef.current === id) {
          setMessages((current) => mergeMessages(current, history));
        }
      } catch (e) {
        setError(e.message);
      }
    });
    socket.on("connect_error", () =>
      setError("Socket không kết nối được. Hãy đăng nhập lại."),
    );
    socket.on("message_new", (message) => {
      if (String(message.conversationId) !== activeIdRef.current) return;
      setMessages((current) => mergeMessages(current, [message]));
    });
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  useEffect(() => {
    if (!token || !activeId) return;
    let cancelled = false;
    setMessages([]);
    socketRef.current?.emit("join_conversation", activeId, (reply) => {
      if (!reply?.ok) setError("Bạn không được vào hội thoại này.");
    });
    loadAllMessages(activeId, token)
      .then((history) => {
        if (!cancelled)
          setMessages((current) => mergeMessages(current, history));
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [activeId, token]);

  async function handleAuth(event) {
    event.preventDefault();
    setError("");
    try {
      if (mode === "register") {
        await request("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      const result = await request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      setToken(result.token);
      setMe(result.user);
    } catch (e) {
      setError(e.message);
    }
  }

  async function openChat(otherUserId) {
    setError("");
    try {
      const conversation = await request(
        "/api/conversations/direct",
        {
          method: "POST",
          body: JSON.stringify({ otherUserId }),
        },
        token,
      );
      setConversations((current) => {
        if (current.some((item) => item._id === conversation._id))
          return current;
        return [conversation, ...current];
      });
      setActiveId(conversation._id);
    } catch (e) {
      setError(e.message);
    }
  }

  function emitMessage(clientMessageId, body) {
    const socket = socketRef.current;
    if (!socket?.connected) {
      setError("Đang mất kết nối. Hãy thử gửi lại khi có mạng.");
      setMessages((current) =>
        current.map((m) =>
          m.clientMessageId === clientMessageId
            ? { ...m, status: "failed" }
            : m,
        ),
      );
      return;
    }
    setMessages((current) =>
      current.map((m) =>
        m.clientMessageId === clientMessageId ? { ...m, status: "pending" } : m,
      ),
    );
    socket.timeout(10000).emit(
      "send_message",
      {
        conversationId: activeId,
        clientMessageId,
        body,
      },
      (timeoutError, reply) => {
        if (timeoutError || !reply?.ok) {
          setMessages((current) =>
            current.map((m) =>
              m.clientMessageId === clientMessageId
                ? { ...m, status: "failed" }
                : m,
            ),
          );
          return;
        }
        setMessages((current) => mergeMessages(current, [reply.message]));
      },
    );
  }

  function send(event) {
    event.preventDefault();
    const body = text.trim();
    if (!body || !activeId || !me) return;
    const clientMessageId = crypto.randomUUID();
    setMessages((current) =>
      mergeMessages(current, [
        {
          clientMessageId,
          conversationId: activeId,
          senderId: me.id,
          body,
          status: "pending",
        },
      ]),
    );
    setText("");
    emitMessage(clientMessageId, body);
  }

  function logout() {
    setToken("");
    setMe(null);
    setActiveId("");
    setMessages([]);
    setConversations([]);
    setUsers([]);
  }

  if (!token)
    return (
      <main className="mx-auto mt-[8vh] max-w-md p-4 font-sans text-slate-800">
        <h1 className="mb-6 text-2xl font-bold">
          {mode === "login" ? "Đăng nhập" : "Đăng ký"}
        </h1>
        <form onSubmit={handleAuth} className="mb-4 grid gap-4">
          {mode === "register" && (
            <label className="grid gap-1">
              Tên hiển thị
              <input
                className="min-w-0 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
                value={form.displayName}
                onChange={(e) =>
                  setForm({ ...form, displayName: e.target.value })
                }
              />
            </label>
          )}
          <label className="grid gap-1">
            Email
            <input
              className="min-w-0 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label className="grid gap-1">
            Mật khẩu
            <input
              className="min-w-0 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </button>
        </form>
        <button
          type="button"
          className="text-blue-700 underline"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
        </button>
        {error && (
          <p role="alert" className="mt-2 text-red-700">
            {error}
          </p>
        )}
      </main>
    );

  const active = conversations.find((item) => item._id === activeId);
  const otherId = active?.memberIds.find((id) => id !== me.id);
  const other = users.find((user) => user.id === otherId);

  return (
    <main className="flex h-dvh min-h-0 text-slate-800 md:grid md:grid-cols-[18rem_minmax(0,1fr)]">
      <aside
        className={`${activeId ? "hidden" : "flex"} w-full flex-col overflow-y-auto border-r border-slate-200 p-4 md:flex md:w-auto`}
      >
        <header className="mb-4 flex items-center justify-between gap-2">
          <strong>Xin chào {me.displayName}</strong>
          <button
            className="rounded-lg px-2 py-1 text-blue-700 hover:bg-blue-50"
            onClick={logout}
          >
            Thoát
          </button>
        </header>
        <h2 className="mb-2 font-semibold">Người dùng</h2>
        {users.map((user) => (
          <button
            className="mb-1 w-full rounded-lg p-2 text-left hover:bg-slate-100"
            key={user.id}
            onClick={() => openChat(user.id)}
          >
            Nhắn {user.displayName}
          </button>
        ))}
        <h2 className="mb-2 mt-4 font-semibold">Hội thoại</h2>
        {conversations.map((conversation) => (
          <button
            className="mb-1 w-full rounded-lg p-2 text-left hover:bg-slate-100"
            key={conversation._id}
            onClick={() => setActiveId(conversation._id)}
          >
            {users.find((user) => conversation.memberIds.includes(user.id))
              ?.displayName || "Hội thoại"}
          </button>
        ))}
      </aside>
      <section
        className={`${activeId ? "flex" : "hidden"} min-w-0 flex-1 flex-col md:flex`}
      >
        <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
          <button
            className="rounded-lg px-2 py-1 text-blue-700 md:hidden"
            onClick={() => setActiveId("")}
          >
            Quay lại
          </button>
          <h2 className="font-semibold">
            {other?.displayName || "Chọn một người để nhắn tin"}
          </h2>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <article
              key={message.clientMessageId}
              className={`mb-2 w-fit max-w-[90%] rounded-xl px-3 py-2 md:max-w-[70%] ${String(message.senderId) === me.id ? "ml-auto bg-green-100" : "bg-slate-100"}`}
            >
              <p className="wrap-anywhere">{message.body}</p>
              <small className="text-slate-600">
                {message.status || "sent"}
              </small>
              {message.status === "failed" && (
                <button
                  className="ml-2 text-blue-700 underline"
                  onClick={() =>
                    emitMessage(message.clientMessageId, message.body)
                  }
                >
                  Thử lại
                </button>
              )}
            </article>
          ))}
        </div>
        {activeId && (
          <form
            onSubmit={send}
            className="flex gap-2 border-t border-slate-200 bg-white p-3"
          >
            <input
              className="min-w-0 flex-1 rounded-lg border border-slate-300 p-2 focus:border-blue-600 focus:outline-none"
              aria-label="Nội dung tin nhắn"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Viết tin nhắn"
              maxLength={2000}
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Gửi
            </button>
          </form>
        )}
        {error && (
          <p role="alert" className="px-4 py-2 text-red-700">
            {error}
          </p>
        )}
      </section>
    </main>
  );
}
```

<a id="e-7-3"></a>

#### 7.3 Thay `client/src/index.css`

```css
@import "tailwindcss";
```

CSS của giao diện nằm trong các `className` ở `App.jsx`, nên file CSS chỉ cần dòng import trên. Ví dụ `p-4` tạo khoảng đệm, `bg-blue-600` đặt màu nền, `md:grid` bật bố cục hai cột từ cỡ màn hình `md`, còn class không có tiền tố áp dụng cho điện thoại. `activeId` điều khiển inbox/chat thành một pane trên điện thoại; từ `md` trở lên, cả hai pane đều hiện. Tài liệu [responsive design](https://tailwindcss.com/docs/responsive-design) giải thích cách đọc các tiền tố này.

<a id="e-7-4"></a>

#### 7.4 Chạy hai phía

Giữ hai terminal đang mở. Terminal backend chạy `npm run dev` trong `server`; terminal frontend chạy `npm run dev` trong `client`. Mở hai cửa sổ ẩn danh hoặc hai trình duyệt. Tạo tài khoản A và B. Ở A bấm “Nhắn B”, ở B bấm “Nhắn A”, rồi gửi tin hai chiều. Sau đó đăng xuất và đăng nhập lại; tin vẫn còn vì đã lưu trong MongoDB.

**Giải thích React:** `useState` giữ dữ liệu UI. Khi gọi `setMessages`, React vẽ lại danh sách. `useEffect` tạo socket khi token xuất hiện và `disconnect` khi logout hoặc component bị tháo. `useRef` giữ đối tượng socket hoặc ID hội thoại hiện hành mà không cần vẽ lại màn hình. `crypto.randomUUID()` tạo ID để retry không tạo bản sao. `request` gom phần gọi `fetch` và đọc lỗi HTTP một chỗ.

**Giới hạn của bản đầu:** access token chỉ giữ trong memory. Refresh trang sẽ trở lại màn đăng nhập; tin nhắn không mất nhưng phải đăng nhập lại. Bản nộp cuối cần refresh token bằng cookie `HttpOnly` và route `/api/auth/refresh` hoặc chấp nhận logout sau refresh nếu giảng viên không yêu cầu giữ phiên; ghi rõ giới hạn khi báo cáo. Client cũng đang tải toàn bộ lịch sử từng trang để dễ hiểu. Khi dữ liệu lớn, chuyển sang tải trang mới theo nhu cầu.

<a id="e-8"></a>

### 8. Tự kiểm tra và sửa lỗi giai đoạn một

| Hiện tượng                                                   | Nguyên nhân thường gặp                                         | Cách kiểm tra                                                                                                          |
| ------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| React mở nhưng không login được                              | Backend chưa chạy hoặc sai `VITE_API_URL`.                     | Mở `http://localhost:3001/healthz`; kiểm tra Network tab và `client/.env`.                                             |
| Trang React hiện chữ nhưng không có màu/khoảng cách Tailwind | Thiếu plugin Vite hoặc `@import "tailwindcss";`.               | Kiểm tra `client/vite.config.js`, `client/src/index.css`, import CSS trong `main.jsx`; dừng và chạy lại `npm run dev`. |
| Backend dừng khi khởi động                                   | Thiếu `MONGODB_URI`, URI sai hoặc IP chưa được Atlas cho phép. | Xem terminal backend; kiểm tra Atlas Database Access và Network Access.                                                |
| `EMAIL_EXISTS`                                               | Email đã đăng ký.                                              | Dùng login hoặc email test khác.                                                                                       |
| `TOKEN_INVALID` sau một lúc                                  | Token 15 phút đã hết hạn.                                      | Đăng xuất/đăng nhập lại; triển khai refresh token ở mục 9.                                                             |
| Chat không cập nhật tức thì                                  | Socket không kết nối, token sai hoặc chưa join room.           | DevTools Network kiểm tra `/socket.io`; log `connect_error`; kiểm tra `join_conversation` ACK.                         |
| Gửi thành công nhưng người nhận không thấy                   | Người nhận chưa mở đúng hội thoại hoặc không join room.        | Mở chat ở cả hai cửa sổ; tải lại lịch sử để kiểm tra DB.                                                               |
| `Transaction numbers are only allowed...`                    | MongoDB local standalone không hỗ trợ transaction.             | Dùng Atlas/replica set; không bỏ transaction rồi vẫn hứa bảo đảm thứ tự.                                               |
| Tin lặp lại                                                  | Client retry bằng ID mới hoặc server thiếu unique index.       | Kiểm tra `clientMessageId` giữ nguyên khi retry và index `Message`.                                                    |
| Lỗi CORS                                                     | `CLIENT_ORIGIN` sai so với URL frontend.                       | So sánh đúng scheme, host và port; khởi động lại backend.                                                              |

Khi không hiểu lỗi, hãy ghi lại **lệnh vừa chạy**, **tệp vừa sửa**, **dòng lỗi đầu tiên trong terminal** và **mốc gần nhất đã chạy được**. Đây là thông tin đủ để hỏi bạn cùng nhóm hoặc giảng viên mà không cần gửi toàn bộ repository.

<a id="e-9"></a>

### 9. Nâng chat lên mức có thể nộp

Bạn đã có bản chat đầu tiên. Trước khi làm cuộc gọi, hãy làm chắc những điểm sau vì đây là phần backend dễ bị hỏi khi bảo vệ.

<a id="e-9-1"></a>

#### 9.1 Kiểm tra mất ACK và retry

Mở hai trình duyệt, gửi một tin, rồi trong DevTools tắt mạng của người gửi ngay khi bấm Gửi. Khi kết nối trở lại, nút “Thử lại” phải dùng **cùng** `clientMessageId`; database chỉ có một bản ghi. Nếu bạn tạo UUID mới khi thử lại, server không thể nhận ra đó là tin cũ.

Trong MongoDB Compass hoặc Atlas Data Explorer, xem `messages`: mỗi tin có `conversationId`, `senderId`, `clientMessageId`, `seq` và `body`. `seq` trong cùng hội thoại phải tăng liên tục 1, 2, 3... Nếu có khoảng trống, kiểm tra transaction, không sửa bằng cách tự thay `seq` ở frontend.

<a id="e-9-2"></a>

#### 9.2 Kiểm tra quyền truy cập

Tạo tài khoản C. Lấy ID hội thoại của A và B rồi dùng token của C gọi `GET /api/conversations/ID/messages`. Kết quả phải là `403`. C cũng không được `join_conversation` hoặc `send_message` vào phòng đó. Đây là ví dụ dễ hiểu về authorization: đăng nhập đúng chưa đủ, server phải kiểm tra người đó có thuộc hội thoại không.

<a id="e-9-3"></a>

#### 9.3 Đổi phần đăng nhập từ bài học sang bản nộp

Mã hiện tại chỉ có access token 15 phút trong memory. Để người dùng giữ phiên an toàn hơn, tạo refresh token ngẫu nhiên ở server, lưu **hash** trong collection `refreshSessions`, còn giá trị gốc gửi vào cookie `HttpOnly; Secure; SameSite=Lax` trên HTTPS. Khi access token hết hạn, frontend gọi `POST /api/auth/refresh` với `credentials: 'include'`; server kiểm tra refresh token, thu hồi token cũ, cấp access token và refresh token mới. Logout cũng thu hồi refresh token. Làm theo mục 17.1 và test trường hợp dùng lại token cũ bị từ chối.

Không lưu refresh token trong `localStorage`. Access token trong memory chỉ tồn tại khi tab còn mở; sau reload, frontend dùng refresh cookie để lấy access token mới. Nếu nhóm chưa làm xong phần này, demo bằng cách đăng nhập lại sau reload và ghi giới hạn trung thực vào báo cáo. Không tuyên bố đã làm refresh rotation khi chưa có collection và test tương ứng.

<a id="e-9-4"></a>

#### 9.4 Chuyển từ “tải hết” sang phân trang thực tế

Frontend hiện tải các trang 100 tin trong vòng lặp để người mới dễ hiểu. Khi hội thoại dài, sửa thành tải 30-50 tin mới nhất trước, rồi tải trang cũ khi người dùng cuộn lên. Vẫn giữ API đồng bộ tin sau `lastContiguousSeq` khi reconnect. `lastContiguousSeq` là sequence cuối cùng mà mọi sequence trước đó đều đã có; đừng lưu `max(seq)` nếu có khoảng trống, vì bạn sẽ bỏ sót tin ở giữa.

<a id="e-10"></a>

### 10. Thêm nhóm chat

Group dùng lại `Conversation` và `Message`, chỉ khác `type`, `title`, `ownerId` và nhiều `memberIds`. Vì hàm `send_message` đã kiểm tra membership, bạn không cần viết lại toàn bộ cơ chế lưu tin.

<a id="e-10-1"></a>

#### 10.1 API tạo nhóm

Thêm đoạn sau vào `server/src/index.js` **trước** phần `io.use`:

```js
app.post("/api/conversations/group", requireAuth, async (req, res) => {
  const title = String(req.body?.title || "").trim();
  const requested = Array.isArray(req.body?.memberIds)
    ? req.body.memberIds
    : [];
  const ids = [...new Set([req.userId, ...requested.map(String)])];
  if (
    title.length < 2 ||
    title.length > 80 ||
    ids.length < 3 ||
    ids.length > 20 ||
    ids.some((id) => !mongoose.isValidObjectId(id))
  ) {
    return res.status(400).json({ error: "INVALID_GROUP" });
  }
  const existingUsers = await User.countDocuments({ _id: { $in: ids } });
  if (existingUsers !== ids.length) {
    return res.status(400).json({ error: "UNKNOWN_MEMBER" });
  }
  const group = await Conversation.create({
    type: "group",
    title,
    ownerId: req.userId,
    memberIds: ids,
    lastSeq: 0,
  });
  res.status(201).json(group);
});
```

`new Set` bỏ ID trùng; `req.userId` luôn nằm trong nhóm. `countDocuments` chắc chắn mọi ID được gửi là người thật. Giới hạn 20 thành viên giúp tránh tạo nhóm quá lớn trong bản demo.

Ở `client/src/App.jsx`, thêm hai state cạnh `const [text, setText] = useState('');`:

```jsx
const [groupTitle, setGroupTitle] = useState("");
const [selectedUserIds, setSelectedUserIds] = useState([]);
```

Thêm hàm sau **trong `App`, trước `logout`**. Hàm chỉ gọi API; server vẫn là nơi quyết định nhóm hợp lệ:

```jsx
async function createGroup(event) {
  event.preventDefault();
  if (selectedUserIds.length < 2) {
    setError("Chọn ít nhất hai người khác để tạo nhóm.");
    return;
  }
  try {
    const group = await request(
      "/api/conversations/group",
      {
        method: "POST",
        body: JSON.stringify({ title: groupTitle, memberIds: selectedUserIds }),
      },
      token,
    );
    setConversations((current) => [group, ...current]);
    setActiveId(group._id);
    setGroupTitle("");
    setSelectedUserIds([]);
    setError("");
  } catch (e) {
    setError(e.message);
  }
}
```

Trong `<aside>` của `App.jsx`, đặt form này **sau danh sách `users.map(...)` và trước tiêu đề “Hội thoại”**:

```jsx
<form
  onSubmit={createGroup}
  className="mt-4 grid gap-2 border-t border-slate-200 pt-4"
>
  <h2 className="font-semibold">Tạo nhóm</h2>
  <input
    className="min-w-0 rounded-lg border border-slate-300 p-2"
    aria-label="Tên nhóm"
    placeholder="Tên nhóm"
    value={groupTitle}
    onChange={(e) => setGroupTitle(e.target.value)}
    required
  />
  {users.map((user) => (
    <label className="flex items-center gap-2" key={user.id}>
      <input
        type="checkbox"
        checked={selectedUserIds.includes(user.id)}
        onChange={(e) =>
          setSelectedUserIds((current) =>
            e.target.checked
              ? [...current, user.id]
              : current.filter((id) => id !== user.id),
          )
        }
      />
      {user.displayName}
    </label>
  ))}
  <button type="submit" className="rounded-lg bg-blue-600 px-3 py-2 text-white">
    Tạo nhóm
  </button>
</form>
```

Cuối cùng, thay biểu thức hiển thị tên trong nút hội thoại bằng `conversation.type === 'group' ? conversation.title : users.find((user) => conversation.memberIds.includes(user.id))?.displayName || 'Hội thoại'`. Ở header chat, chỉ thay **biểu thức bên trong** `<h2 className="font-semibold">` thành `{active?.type === 'group' ? active.title : other?.displayName || 'Chọn một người để nhắn tin'}`; giữ nguyên class Tailwind. Test bằng ba tài khoản A/B/C: A chọn B và C, tạo nhóm, rồi B và C chọn nhóm mới trong danh sách hội thoại. Danh sách hội thoại ở bản học đầu chỉ tải khi login, nên B/C cần đăng nhập lại để thấy nhóm vừa tạo; bản nộp nên phát event cập nhật hội thoại mới.

<a id="e-10-2"></a>

#### 10.2 Quyền thêm thành viên

Sau khi tạo group, chỉ owner được thêm hoặc xóa thành viên. Thêm hai route sau vào `server/src/index.js` **trước `io.use`**:

```js
app.post("/api/conversations/:id/members", requireAuth, async (req, res) => {
  const groupId = req.params.id;
  const newUserId = String(req.body?.userId || "");
  if (
    !mongoose.isValidObjectId(groupId) ||
    !mongoose.isValidObjectId(newUserId)
  ) {
    return res.status(400).json({ error: "INVALID_USER_OR_GROUP" });
  }
  if (!(await User.exists({ _id: newUserId }))) {
    return res.status(404).json({ error: "USER_NOT_FOUND" });
  }
  const group = await Conversation.findOneAndUpdate(
    { _id: groupId, type: "group", ownerId: req.userId },
    { $addToSet: { memberIds: newUserId } },
    { new: true },
  );
  if (!group) return res.status(403).json({ error: "OWNER_ONLY" });
  io.to(`user:${newUserId}`).emit("conversation_added", group);
  res.json(group);
});

app.delete(
  "/api/conversations/:id/members/:userId",
  requireAuth,
  async (req, res) => {
    const groupId = req.params.id;
    const targetId = req.params.userId;
    if (
      !mongoose.isValidObjectId(groupId) ||
      !mongoose.isValidObjectId(targetId)
    ) {
      return res.status(400).json({ error: "INVALID_USER_OR_GROUP" });
    }
    const group = await Conversation.findOne({
      _id: groupId,
      type: "group",
      ownerId: req.userId,
    });
    if (!group) return res.status(403).json({ error: "OWNER_ONLY" });
    if (String(group.ownerId) === targetId) {
      return res.status(400).json({ error: "CANNOT_REMOVE_OWNER" });
    }
    if (!group.memberIds.some((id) => String(id) === targetId)) {
      return res.status(404).json({ error: "NOT_A_MEMBER" });
    }
    const updated = await Conversation.findOneAndUpdate(
      { _id: groupId, type: "group", ownerId: req.userId },
      { $pull: { memberIds: targetId } },
      { new: true },
    );
    for (const socketId of io.sockets.adapter.rooms.get(`user:${targetId}`) ||
      []) {
      io.sockets.sockets.get(socketId)?.leave(`conversation:${groupId}`);
    }
    io.to(`user:${targetId}`).emit("removed_from_group", {
      conversationId: groupId,
    });
    res.json(updated);
  },
);
```

`$addToSet` thêm ID nếu chưa có, không tạo trùng. `$pull` xóa ID khỏi nhóm. Khi xóa người C, backend còn đưa tất cả socket đang kết nối của C ra khỏi room, vì nếu chỉ xóa khỏi database mà vẫn để socket ở room, C vẫn nhận `message_new` cho đến khi ngắt kết nối. Bản demo dùng một tiến trình backend; nếu mở rộng nhiều instance, phải dùng adapter Socket.IO phù hợp và kiểm tra room trên mọi instance.

Ở `App.jsx`, trong effect đang đăng ký `socket.on('message_new', ...)`, thêm hai listener sau ngay trước `return () => { socket.disconnect(); ... }`:

```jsx
socket.on("conversation_added", (group) => {
  setConversations((current) =>
    current.some((item) => item._id === group._id)
      ? current
      : [group, ...current],
  );
});
socket.on("removed_from_group", ({ conversationId }) => {
  setConversations((current) =>
    current.filter((item) => item._id !== conversationId),
  );
  if (activeIdRef.current === conversationId) {
    activeIdRef.current = "";
    setActiveId("");
    setMessages([]);
  }
});
```

Trong giao diện owner, thêm nút “Thêm” gọi `POST /api/conversations/:id/members` với `{ userId }` và nút “Xóa” gọi `DELETE /api/conversations/:id/members/:userId`; sau khi API thành công, cập nhật group trong `conversations` bằng response trả về. Đây là việc giao diện tuần 2 cho thành viên A trong [kế hoạch ba tuần](#phan-d). Test bằng token của member thường: hai route phải trả `403`; C sau khi bị xóa không được nhận tin mới và `GET` lịch sử phải trả `403`.

<a id="e-11"></a>

### 11. Bắt đầu code cuộc gọi WebRTC

Đừng gắn WebRTC vào UI chat ngay. Trước tiên dùng hai cửa sổ trình duyệt để hiểu luồng: A bấm Gọi, B thấy lời mời, B bấm Nhận, hai bên trao đổi `offer`, `answer` và ICE candidate qua Socket.IO, rồi video xuất hiện. Sau khi chạy được trong LAN, mới thay STUN/TURN và kiểm tra mạng khác.

<a id="e-11-1"></a>

#### 11.1 Các trạng thái cuộc gọi

```text
idle -> ringing -> accepted -> connecting -> connected -> ended
       |             |              |
       -> rejected   -> failed      -> failed
       -> timeout
```

Bạn nên viết state trước khi viết nút. Nếu chỉ dùng boolean `isCalling`, không phân biệt được đang đổ chuông, chờ camera hay ICE lỗi. Một cuộc gọi cần `callId` riêng để bỏ qua tín hiệu cũ của lần gọi trước.

<a id="e-11-2"></a>

#### 11.2 Server chuyển tiếp signaling

Trong `server/src/index.js`, phía trên `io.on('connection', ...)`, thêm:

```js
const calls = new Map(); // Bản demo một tiến trình server.
const busyUsers = new Map();

function finishCall(callId, reason) {
  const call = calls.get(callId);
  if (!call) return;
  calls.delete(callId);
  busyUsers.delete(call.callerId);
  busyUsers.delete(call.calleeId);
  io.to(call.callerSocketId).emit("call_end", { callId, reason });
  if (call.calleeSocketId) {
    io.to(call.calleeSocketId).emit("call_end", { callId, reason });
  } else {
    io.to(`user:${call.calleeId}`).emit("call_end", { callId, reason });
  }
}
```

Sau đó thêm các handler này **bên trong** `io.on('connection', (socket) => { ... })`, ngay sau `socket.join(...)` và trước `socket.on('join_conversation', ...)`:

```js
socket.on("call_invite", async (data, ack) => {
  // Chặn dữ liệu sai trước khi tạo trạng thái cuộc gọi.
  try {
    const { callId, calleeId } = data || {};
    if (
      !/^[0-9a-f-]{36}$/i.test(String(callId)) ||
      !mongoose.isValidObjectId(calleeId) ||
      calleeId === userId ||
      busyUsers.has(userId) ||
      busyUsers.has(calleeId)
    ) {
      return ack?.({ ok: false, error: "CALL_BUSY_OR_INVALID" });
    }
    if (
      !(await User.exists({ _id: calleeId })) ||
      !io.sockets.adapter.rooms.get(`user:${calleeId}`)?.size
    ) {
      return ack?.({ ok: false, error: "USER_OFFLINE" });
    }
    calls.set(callId, {
      callerId: userId,
      calleeId,
      callerSocketId: socket.id,
      calleeSocketId: null,
      state: "ringing",
    });
    busyUsers.set(userId, callId);
    busyUsers.set(calleeId, callId);
    io.to(`user:${calleeId}`).emit("call_invite", { callId, callerId: userId });
    ack?.({ ok: true });
    setTimeout(() => {
      if (calls.get(callId)?.state === "ringing") finishCall(callId, "timeout");
    }, 30000);
  } catch {
    ack?.({ ok: false, error: "CALL_FAILED" });
  }
});

socket.on("call_accept", (data, ack) => {
  const { callId } = data || {};
  const call = calls.get(callId);
  if (!call || call.calleeId !== userId || call.state !== "ringing") {
    return ack?.({ ok: false });
  }
  call.state = "accepted";
  call.calleeSocketId = socket.id;
  io.to(call.callerSocketId).emit("call_accept", { callId });
  io.to(`user:${userId}`)
    .except(socket.id)
    .emit("call_end", { callId, reason: "answered_elsewhere" });
  ack?.({ ok: true });
});

socket.on("call_reject", (data) => {
  const { callId } = data || {};
  const call = calls.get(callId);
  if (call?.calleeId === userId && call.state === "ringing") {
    finishCall(callId, "rejected");
  }
});

socket.on("call_signal", (data) => {
  const { callId, type, payload } = data || {};
  const call = calls.get(callId);
  if (
    !call ||
    call.state !== "accepted" ||
    !["offer", "answer", "candidate"].includes(type)
  )
    return;
  const target =
    socket.id === call.callerSocketId
      ? call.calleeSocketId
      : socket.id === call.calleeSocketId
        ? call.callerSocketId
        : null;
  if (!target || !payload || JSON.stringify(payload).length > 16000) return;
  io.to(target).emit("call_signal", { callId, type, payload });
});

socket.on("call_end", (data) => {
  const { callId } = data || {};
  const call = calls.get(callId);
  if (call && [call.callerSocketId, call.calleeSocketId].includes(socket.id)) {
    finishCall(callId, "ended");
  }
});

socket.on("disconnect", () => {
  for (const [callId, call] of calls) {
    if ([call.callerSocketId, call.calleeSocketId].includes(socket.id)) {
      finishCall(callId, "disconnected");
    }
  }
});
```

**Vì sao server chỉ chuyển `offer`, `answer`, candidate?** Chúng là thông tin giúp hai trình duyệt bắt tay. Audio/video sẽ đi qua kết nối WebRTC, không đi trong các event này. Server kiểm tra socket gửi là caller hoặc callee đã được chọn, nên người thứ ba không thể đẩy SDP vào cuộc gọi. `Map` nằm trong RAM chỉ phù hợp demo một instance; khi server restart, call đang diễn ra sẽ mất state.

<a id="e-11-3"></a>

#### 11.3 Đặt WebRTC ở phía client

Ở client, thêm một component `CallPanel.jsx` và dùng nó ở màn hình chat. Trước tiên chỉ tạo một peer connection và media stream theo thứ tự sau; viết một bước, test một bước:

```js
// 1. Bấm nút Gọi hoặc Nhận: xin quyền camera/mic.
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
localVideoRef.current.srcObject = stream;

// 2. Tạo peer connection với ICE servers lấy từ backend.
const pc = new RTCPeerConnection({ iceServers });
stream.getTracks().forEach((track) => pc.addTrack(track, stream));
pc.ontrack = (event) => {
  remoteVideoRef.current.srcObject = event.streams[0];
};
pc.onicecandidate = (event) => {
  if (event.candidate)
    socket.emit("call_signal", {
      callId,
      type: "candidate",
      payload: event.candidate.toJSON(),
    });
};

// 3. Caller làm bước này SAU KHI nhận event call_accept.
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
socket.emit("call_signal", {
  callId,
  type: "offer",
  payload: pc.localDescription,
});

// 4. Callee nhận offer và trả answer.
await pc.setRemoteDescription(receivedOffer);
const answer = await pc.createAnswer();
await pc.setLocalDescription(answer);
socket.emit("call_signal", {
  callId,
  type: "answer",
  payload: pc.localDescription,
});

// 5. Caller nhận answer.
await pc.setRemoteDescription(receivedAnswer);

// 6. Hai phía nhận ICE candidate. Nếu chưa có remoteDescription,
//    đưa candidate vào một hàng đợi; xử lý hàng đợi sau bước 4 hoặc 5.
if (pc.remoteDescription) await pc.addIceCandidate(receivedCandidate);
else candidateQueue.push(receivedCandidate);
```

Đây là **sáu đoạn đặt vào các event handler khác nhau**, không phải một file chạy nguyên khối. `receivedOffer`, `receivedAnswer`, `receivedCandidate`, `callId`, `socket`, `localVideoRef` và `remoteVideoRef` phải lấy từ state, props hoặc event tương ứng. Cách tách này giúp bạn nhìn rõ thứ tự và tránh copy một ví dụ trông có vẻ chạy nhưng không xử lý race condition.

Viết các handler theo thứ tự: `call_invite` để hiện nút Nhận/Từ chối; `call_accept` để caller tạo offer; `call_signal` để xử lý offer/answer/candidate; `call_end` để dọn dẹp. Khi kết thúc, gọi `pc.close()`, `stream.getTracks().forEach(track => track.stop())`, xóa `srcObject` của video và bỏ các socket listener trong cleanup của `useEffect`. Nếu không, camera có thể vẫn sáng sau khi đóng UI.

Nếu hai phía có thể cùng tạo offer, dùng mô hình perfect negotiation và vai trò `polite`/`impolite`; đừng tự xử lý bằng timeout. Xem tài liệu MDN ở cuối file. Với bản demo, có thể quy định chỉ caller tạo offer sau `call_accept`, nên tránh được phần lớn va chạm ở luồng đầu tiên. Vẫn phải bỏ signal có `callId` cũ và xử lý candidate đến sớm.

<a id="e-11-4"></a>

#### 11.4 Ghép các bước thành một component gọi đầu tiên

Tạo `client/src/CallPanel.jsx`. Component dưới đây làm cuộc gọi video 1-1 cơ bản. Nó luôn được render để có thể nhận cuộc gọi dù bạn chưa mở một hội thoại cụ thể.

```jsx
import { useEffect, useRef, useState } from "react";

export default function CallPanel({ socket, otherUserId, iceServers }) {
  const [incoming, setIncoming] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const callRef = useRef(null);
  const incomingRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);
  const candidateQueue = useRef([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  function cleanup() {
    pcRef.current?.close();
    pcRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    candidateQueue.current = [];
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    callRef.current = null;
    incomingRef.current = null;
    setIncoming(null);
    setStatus("idle");
  }

  async function prepareMedia() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    streamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    const pc = new RTCPeerConnection({ iceServers });
    pcRef.current = pc;
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    pc.ontrack = (event) => {
      if (remoteVideoRef.current)
        remoteVideoRef.current.srcObject = event.streams[0];
    };
    pc.onicecandidate = (event) => {
      if (event.candidate && callRef.current) {
        socket.emit("call_signal", {
          callId: callRef.current.callId,
          type: "candidate",
          payload: event.candidate.toJSON(),
        });
      }
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") setStatus("connected");
      if (pc.connectionState === "failed" && callRef.current) {
        socket.emit("call_end", { callId: callRef.current.callId });
        setError("Kết nối media thất bại. Kiểm tra STUN/TURN.");
        cleanup();
      }
    };
    return pc;
  }

  async function flushCandidates() {
    const pc = pcRef.current;
    if (!pc?.remoteDescription) return;
    for (const candidate of candidateQueue.current)
      await pc.addIceCandidate(candidate);
    candidateQueue.current = [];
  }

  useEffect(() => {
    if (!socket) return;
    const onInvite = ({ callId, callerId }) => {
      setError("");
      incomingRef.current = { callId, callerId };
      setIncoming({ callId, callerId });
    };
    const onAccept = async ({ callId }) => {
      if (callRef.current?.callId !== callId || !pcRef.current) return;
      try {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socket.emit("call_signal", {
          callId,
          type: "offer",
          payload: pcRef.current.localDescription,
        });
        setStatus("connecting");
      } catch {
        socket.emit("call_end", { callId });
        cleanup();
        setError("Không tạo được offer.");
      }
    };
    const onSignal = async ({ callId, type, payload }) => {
      if (callRef.current?.callId !== callId) return;
      try {
        const pc = pcRef.current;
        if (type === "candidate") {
          if (pc?.remoteDescription) await pc.addIceCandidate(payload);
          else candidateQueue.current.push(payload);
        } else if (type === "offer" && pc) {
          await pc.setRemoteDescription(payload);
          await flushCandidates();
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit("call_signal", {
            callId,
            type: "answer",
            payload: pc.localDescription,
          });
        } else if (type === "answer" && pc) {
          await pc.setRemoteDescription(payload);
          await flushCandidates();
        }
      } catch {
        socket.emit("call_end", { callId });
        cleanup();
        setError("Không xử lý được tín hiệu cuộc gọi.");
      }
    };
    const onEnd = ({ callId, reason }) => {
      if (
        callRef.current?.callId === callId ||
        incomingRef.current?.callId === callId
      ) {
        cleanup();
        if (reason && reason !== "ended")
          setError(`Cuộc gọi kết thúc: ${reason}`);
      }
    };
    const onDisconnect = () => {
      if (callRef.current || incomingRef.current) {
        cleanup();
        setError("Mất kết nối. Hãy thử gọi lại sau khi socket kết nối.");
      }
    };
    socket.on("call_invite", onInvite);
    socket.on("call_accept", onAccept);
    socket.on("call_signal", onSignal);
    socket.on("call_end", onEnd);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("call_invite", onInvite);
      socket.off("call_accept", onAccept);
      socket.off("call_signal", onSignal);
      socket.off("call_end", onEnd);
      socket.off("disconnect", onDisconnect);
      if (callRef.current)
        socket.emit("call_end", { callId: callRef.current.callId });
      pcRef.current?.close();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [socket]);

  async function startCall() {
    if (!socket?.connected || !otherUserId || callRef.current) return;
    const callId = crypto.randomUUID();
    callRef.current = { callId, otherUserId };
    setError("");
    setStatus("preparing");
    try {
      await prepareMedia();
      socket.emit("call_invite", { callId, calleeId: otherUserId }, (reply) => {
        if (!reply?.ok) {
          cleanup();
          setError(reply?.error || "Không gọi được.");
        } else setStatus("ringing");
      });
    } catch {
      cleanup();
      setError("Không lấy được camera hoặc microphone.");
    }
  }

  async function acceptCall() {
    if (!incoming || !socket?.connected) return;
    const { callId, callerId } = incoming;
    callRef.current = { callId, otherUserId: callerId };
    setStatus("preparing");
    setError("");
    try {
      await prepareMedia();
      socket.emit("call_accept", { callId }, (reply) => {
        if (!reply?.ok) {
          cleanup();
          setError("Cuộc gọi đã hết hạn.");
        } else {
          incomingRef.current = null;
          setIncoming(null);
          setStatus("connecting");
        }
      });
    } catch {
      socket.emit("call_reject", { callId });
      cleanup();
      setError("Không lấy được camera hoặc microphone.");
    }
  }

  function rejectCall() {
    if (incoming) socket?.emit("call_reject", { callId: incoming.callId });
    incomingRef.current = null;
    setIncoming(null);
  }

  function endCall() {
    if (callRef.current)
      socket?.emit("call_end", { callId: callRef.current.callId });
    cleanup();
  }

  return (
    <section className="fixed inset-x-3 top-3 z-50 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3 shadow-lg sm:left-auto sm:w-96">
      <button
        className="rounded-lg bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
        onClick={startCall}
        disabled={!otherUserId || status !== "idle"}
      >
        Gọi video
      </button>
      {incoming && (
        <div role="alert" className="mt-2 flex flex-wrap items-center gap-2">
          Có cuộc gọi đến
          <button
            className="rounded-lg bg-green-600 px-3 py-2 text-white"
            onClick={acceptCall}
          >
            Nhận
          </button>
          <button
            className="rounded-lg bg-red-600 px-3 py-2 text-white"
            onClick={rejectCall}
          >
            Từ chối
          </button>
        </div>
      )}
      {status !== "idle" && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span>Trạng thái: {status}</span>
          <button
            className="rounded-lg bg-red-600 px-3 py-2 text-white"
            onClick={endCall}
          >
            Kết thúc
          </button>
          <button
            className="rounded-lg border border-slate-300 px-3 py-2"
            onClick={() => {
              const track = streamRef.current?.getAudioTracks()[0];
              if (track) track.enabled = !track.enabled;
            }}
          >
            Bật tắt mic
          </button>
          <button
            className="rounded-lg border border-slate-300 px-3 py-2"
            onClick={() => {
              const track = streamRef.current?.getVideoTracks()[0];
              if (track) track.enabled = !track.enabled;
            }}
          >
            Bật tắt camera
          </button>
        </div>
      )}
      <video
        className={`${status === "idle" ? "hidden" : "mt-2 block"} w-32 max-w-full rounded-lg bg-slate-900`}
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
      />
      <video
        className={`${status === "idle" ? "hidden" : "mt-2 block"} w-full max-w-full rounded-lg bg-slate-900`}
        ref={remoteVideoRef}
        autoPlay
        playsInline
      />
      {error && (
        <p role="alert" className="mt-2 text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}
```

Để ghép với `App.jsx` ở mục 7, thực hiện đúng ba sửa đổi:

1. Thêm dòng `import CallPanel from './CallPanel.jsx';` ở đầu file.
2. Thêm state `const [liveSocket, setLiveSocket] = useState(null);` cạnh các state khác. Trong effect tạo socket, ngay sau `socketRef.current = socket;` thêm `setLiveSocket(socket);`. Trong cleanup, sau `socket.disconnect();` thêm `setLiveSocket(null);`.
3. Trong JSX của `App.jsx`, đặt component sau `</section>` của pane chat và **ngay trước `</main>`**. Đây là sibling của pane chat nên cuộc gọi đến vẫn hiện trên điện thoại khi đang ở inbox:

```jsx
<CallPanel
  socket={liveSocket}
  otherUserId={active?.type === "direct" ? other?.id : undefined}
  iceServers={[{ urls: "stun:stun.l.google.com:19302" }]}
/>
```

Các utility class Tailwind ngay trong `CallPanel.jsx` làm video không tràn màn hình và đặt panel nổi lên trên inbox/chat. Không thêm CSS riêng vào `index.css`. Đây là cấu hình thử trong LAN. Sau khi coturn chạy, thay `iceServers` cố định bằng kết quả API `/api/ice` mà backend cấp sau đăng nhập. `CallPanel` được render cả khi chưa chọn chat, để B vẫn thấy lời mời gọi từ A. Test hai cửa sổ, mỗi cửa sổ đăng nhập một tài khoản; bấm Gọi video ở A, chọn Nhận ở B.

Component này cố ý dùng một người gọi và một người nhận. Nó chưa hỗ trợ đổi camera, khôi phục call sau refresh, nhiều server backend hoặc call dài. Khi phát triển thêm, tách `prepareMedia`, signaling và UI thành các hook/component nhỏ để dễ test.

<a id="e-11-5"></a>

#### 11.5 Test WebRTC trước TURN

Mở hai trình duyệt trên hai máy cùng Wi-Fi. Test lần lượt: từ chối quyền camera, chấp nhận quyền, nhận/từ chối cuộc gọi, bật tắt mic/camera, kết thúc và thử gọi lại. Dùng `chrome://webrtc-internals` hoặc `about:webrtc` để xem trạng thái ICE. Nếu cùng Wi-Fi còn chưa có audio/video hai chiều, hãy sửa thứ tự `setLocalDescription`, `setRemoteDescription`, candidate queue và `ontrack` trước khi cài TURN.

<a id="e-12"></a>

### 12. Đưa lên Internet và kiểm tra TURN

<a id="e-12-1"></a>

#### 12.1 Vì sao phải deploy qua HTTPS

Trên domain công khai, trình duyệt chỉ cho `getUserMedia` trong secure context. `localhost` là trường hợp đặc biệt được phép dùng khi phát triển. Vì vậy, trang demo phải dùng HTTPS, Socket.IO đi qua cùng cấu hình TLS phù hợp, và chứng chỉ phải hợp lệ.

<a id="e-12-2"></a>

#### 12.2 Thành phần cần có

1. Một nơi chạy backend Node liên tục; VPS dễ kiểm soát port nhất cho demo TURN.
2. Một nơi phục vụ frontend React build tĩnh, có HTTPS.
3. MongoDB Atlas production hoặc cluster demo tách dev nếu có thể.
4. coturn trên máy có IP public, với listener và dải relay port được firewall cho phép.
5. Nginx reverse proxy HTTP và Socket.IO. Nginx HTTP không thay coturn.

Trong `server/.env` production, đặt `CLIENT_ORIGIN` đúng domain frontend, `MONGODB_URI`, `JWT_SECRET`, TURN shared secret và các biến cần thiết. Trong `client/.env.production`, `VITE_API_URL` là URL HTTPS của API. Không dùng `localhost` trong bản build production.

<a id="e-12-3"></a>

#### 12.3 TURN credential ngắn hạn

Không đưa tài khoản TURN cố định vào React. Backend xác thực user rồi sinh credential tạm theo shared secret với coturn. Về mặt ý tưởng:

```text
username = thời_điểm_hết_hạn_unix:userId
credential = Base64(HMAC-SHA1(TURN_SHARED_SECRET, username))
```

Backend trả một cấu hình ICE gồm URL `stun:`, `turn:` và có thể `turns:` cùng `username`, `credential`. Chỉ shared secret cần giữ kín ở server; credential ngắn hạn phải đến trình duyệt để WebRTC dùng. Coturn cần cấu hình `use-auth-secret`, `static-auth-secret`, `realm`, public IP và dải relay ports phù hợp với VPS. Port và IP cụ thể phụ thuộc môi trường, nên kiểm tra cả firewall cloud, firewall máy và port mapping Docker.

Để tự viết API này, trong `server/src/index.js` thêm `import { createHmac } from 'node:crypto';` ở đầu file, rồi thêm route sau **trước `io.use`**:

```js
app.get("/api/ice", requireAuth, (req, res) => {
  const host = process.env.TURN_HOST;
  const secret = process.env.TURN_SHARED_SECRET;
  if (!host || !secret)
    return res.status(503).json({ error: "TURN_NOT_CONFIGURED" });
  const expiresAt = Math.floor(Date.now() / 1000) + 3600;
  const username = `${expiresAt}:${req.userId}`;
  const credential = createHmac("sha1", secret)
    .update(username)
    .digest("base64");
  res.json({
    iceServers: [
      { urls: `stun:${host}:3478` },
      {
        urls: [
          `turn:${host}:3478?transport=udp`,
          `turn:${host}:3478?transport=tcp`,
        ],
        username,
        credential,
      },
    ],
  });
});
```

Trong `server/.env` thêm `TURN_HOST=turn.example.com` và `TURN_SHARED_SECRET=...` với secret giống `static-auth-secret` của coturn. **Đây là biến server**, không có tiền tố `VITE_`. Trong `App.jsx`, thêm `const [iceServers, setIceServers] = useState([]);` cạnh các state khác; trong effect theo `token`, gọi `request('/api/ice', {}, token).then((data) => setIceServers(data.iceServers)).catch((e) => setError(e.message));`. Sau đó thay prop `iceServers={[{ urls: 'stun:stun.l.google.com:19302' }]}` bằng `iceServers={iceServers}`. Trong `CallPanel`, cho nút Gọi thêm điều kiện disable `|| !iceServers?.length` để không bắt đầu khi chưa có cấu hình. Credential có hạn 1 giờ; ứng dụng thật nên lấy lại cấu hình ngay trước mỗi cuộc gọi dài hoặc khi cấu hình hết hạn.

Đối chiếu công thức tạo credential với [README chính thức của coturn](https://github.com/coturn/coturn/blob/master/README.turnserver). Nếu coturn báo sai credential, kiểm tra `realm`, đồng hồ máy chủ và giá trị shared secret trước khi sửa luồng WebRTC.

<a id="e-12-4"></a>

#### 12.4 Chứng minh đã dùng TURN

Trong một chế độ test riêng, tạo peer connection với `iceTransportPolicy: 'relay'`. Cho máy A ở Wi-Fi và máy B ở 4G/5G gọi nhau. Dùng WebRTC stats xem **selected candidate pair** có candidate type `relay`, rồi xác nhận số byte media gửi nhận tăng và cả hai nghe nhìn được. Sự xuất hiện của một relay candidate trong danh sách chưa đủ chứng minh media thực sự đang đi qua TURN.

Nếu call LAN chạy mà khác mạng thất bại, kiểm tra theo thứ tự: domain TURN phân giải đúng IP, credential chưa hết hạn, public IP hoặc `external-ip` đúng, listener 3478 UDP/TCP hoạt động, dải relay port mở, chứng chỉ hợp lệ nếu dùng `turns:`. Ghi mỗi kết quả vào Trello để tránh thử ngẫu nhiên.

<a id="e-12-5"></a>

#### 12.5 Kiểm tra deploy

Sau khi deploy, mở URL từ điện thoại bằng mạng di động. Làm đủ bốn bước: login, gửi chat, reload lấy lịch sử, gọi qua TURN. Chụp kết quả cùng commit SHA đã deploy để báo cáo có thể đối chiếu. Nếu dùng GitHub Actions, chạy lint/test/build trước khi push image; image cần tag theo commit để quay lại bản trước khi bản mới lỗi.

<a id="e-13"></a>

### 13. Cách học và cách làm việc trong ba tuần

<a id="e-13-1"></a>

#### 13.1 Lịch học thực hành cho người mới

| Buổi | Việc bạn tự làm                                | Dấu hiệu đã hiểu                                                        |
| ---- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| 1    | Cài Node Git, tạo React Express, chạy hai URL. | Giải thích được frontend và backend khác nhau ở đâu.                    |
| 2    | Tạo Atlas, `.env`, ba model.                   | Giải thích vì sao không lưu mật khẩu dạng rõ và vì sao có index unique. |
| 3    | Chạy register/login bằng curl hoặc Postman.    | Đọc được request, response và mã 400/401/409.                           |
| 4    | Tạo chat riêng, gửi tin bằng hai trình duyệt.  | Chỉ ra được tin đi qua React, Socket.IO, Express, MongoDB.              |
| 5    | Tắt mạng và thử lại cùng clientMessageId.      | Giải thích vì sao DB là nguồn dữ liệu thật.                             |
| 6    | Tạo nhóm và kiểm tra owner.                    | Chỉ ra chỗ server kiểm tra quyền.                                       |
| 7    | Làm call LAN, sau đó TURN khác mạng.           | Giải thích được signaling, media, STUN và TURN.                         |

Nếu bạn là thành viên A, bắt đầu từ mục 3, 4, 7. Nếu là B, bắt đầu từ mục 4, 5, 6. Nếu là C, bắt đầu từ mục 4, 6 và 11. Nhưng cả ba nên cùng chạy bản chat đầu tiên trên máy mình trước khi chia sâu hơn.

<a id="e-13-2"></a>

#### 13.2 Cách đọc một đoạn code khi chưa hiểu

Đọc theo bốn câu hỏi: dữ liệu đi vào từ đâu, điều kiện nào có thể từ chối nó, dữ liệu được lưu hoặc gửi đi đâu, và người dùng thấy gì khi thành công hoặc lỗi. Ví dụ `send_message`: đầu vào là `conversationId`, `body`, `clientMessageId`; server kiểm tra token và membership; transaction lưu message; ACK và event cập nhật UI. Viết bốn dòng tóm tắt đó vào PR của bạn, bạn sẽ dễ trả lời bảo vệ hơn.

<a id="e-13-3"></a>

#### 13.3 Khi dùng AI hoặc hỏi người khác

Hãy hỏi một vấn đề hẹp: “Tại sao request này trả 403? Đây là route và response”; “candidate đến trước remote description thì xử lý thế nào?”. Chạy code và giải thích lại bằng lời của mình. Tài liệu thực hành trong học phần có nhấn mạnh giảng viên có thể hỏi về code để kiểm tra mức hiểu; nhóm cần nắm được code đã nộp.

<a id="e-13-4"></a>

#### 13.4 Bước tiếp theo sau Phần I

Nếu **tự học buổi đầu**, hãy hoàn thành mục 3 và 4: máy có Node/Git, frontend mở được ở port 5173, backend `/healthz` mở được ở port 3001. Nếu **đang làm theo nhóm ba người**, đây là phần bạn tự làm; đồng thời phân công B kết nối Atlas, C khởi tạo Socket.IO theo ngày 1 của [kế hoạch ba tuần](#phan-d), rồi mỗi người commit phần code của mình. Buổi sau làm mục 5 và phần auth ở mục 6. Hãy để WebRTC đến sau khi chat và server chạy, để khi lỗi xảy ra bạn biết phải kiểm tra tầng nào.

<a id="e-14"></a>

### 14. Nguồn đọc chính thức

- [Vite Getting Started](https://vite.dev/guide/) - lệnh tạo React Vite và yêu cầu phiên bản Node.
- [React Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) - vì sao nối socket trong `useEffect` và cần cleanup.
- [Express Installing](https://expressjs.com/en/starter/installing/) - khởi tạo ứng dụng Node Express.
- [Mongoose Getting Started](https://mongoosejs.com/docs/index.html) và [Mongoose Transactions](https://mongoosejs.com/docs/transactions.html) - schema, connection và transaction.
- [Socket.IO Server Initialization](https://socket.io/docs/v4/server-initialization/) và [Delivery Guarantees](https://socket.io/docs/v4/delivery-guarantees/) - tạo socket server, ACK, giới hạn khi mất mạng.
- [WebRTC Peer Connections](https://webrtc.org/getting-started/peer-connections), [TURN Server](https://webrtc.org/getting-started/turn-server) và [MDN Perfect Negotiation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation) - thiết lập cuộc gọi và xử lý offer trùng.
- [MDN getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) - quyền camera/mic và yêu cầu HTTPS.

---

**PHẦN II — HOÀN THIỆN SẢN PHẨM ĐỂ NỘP BÀI**

<a id="e-15"></a>

### 15. Cách dùng tài liệu và định nghĩa “xong”

Phần II này tiếp nối Phần I của cùng tài liệu. Trước khi bắt đầu, bạn cần chạy được bản ở mục 7 của Phần I: hai tài khoản đăng nhập, mở chat riêng, gửi tin qua hai trình duyệt và tải lịch sử từ MongoDB. Nếu bản đó chưa chạy, sửa nó trước; mọi phần phía dưới đều dựa trên cùng `client`, `server`, tên route `/api/...` và event Socket.IO của bản đó.

**Phân biệt ba loại nội dung:** khối `bash` là lệnh gõ trong terminal; khối `js/jsx/css` là mã đặt vào file được nêu ngay trước; dòng `THAY` nghĩa là sửa mã cũ, dòng `THÊM` nghĩa là giữ mã cũ và chèn mã mới. Sau mỗi bước đều có “Đạt khi” để bạn tự kiểm tra. Các đoạn trong tài liệu này là phần bổ sung có vị trí chèn cụ thể; nó không giả vờ là một repository mã nguồn hoàn chỉnh đã chạy trên máy của bạn.

Để không lẫn phạm vi, dùng [tệp yêu cầu và tiêu chí](#phan-a) làm danh sách **sản phẩm đầy đủ**. [Kế hoạch ba tuần](#phan-d) cho biết thứ tự ưu tiên khi thời gian thiếu. Phần điểm chính thức nằm ở ảnh bảng tiêu chí người dùng đã cung cấp: FE 15, BE và công nghệ 30, deploy 5, báo cáo/bảo vệ 20, tổ chức/commit 30. Các chức năng như typing, tìm kiếm hay upload là phạm vi nhóm đã tự chọn trong Phần A; nếu buộc phải cắt, cập nhật lại Phần A và báo cáo, đừng tuyên bố đã làm.

Một tính năng chỉ được đánh dấu **Done** khi: mã chạy, xử lý lỗi, người không có quyền bị chặn ở server, dùng được trên mobile nếu có UI, có ca kiểm thử, đã được một thành viên khác thử và có commit/PR. Mỗi thành viên phải có commit code hữu ích hằng tuần từ tuần 7 theo bảng chấm; trong ba tuần thực hiện, giữ bằng chứng theo cả ngày và người.

<a id="e-16"></a>

### 16. Cấu trúc mã nguồn và thứ tự ghép

Giữ bản đã làm ở Phần I hoạt động, tạo branch `develop`, rồi phát triển từng PR nhỏ. Cấu trúc cuối cùng nên gần như sau:

```text
btl-chat-onl/
  client/
    src/
      App.jsx                 # điều phối trạng thái và route ban đầu
      api.js                  # fetch, refresh access token, upload
      components/
        AuthForm.jsx
        ConversationList.jsx
        MessageList.jsx
        Composer.jsx
        GroupDialog.jsx
        CallPanel.jsx
      index.css
    .env.example
  server/
    src/
      index.js                # tạo Express, Socket.IO, mount route
      models.js               # Mongoose schemas + indexes
      auth.js                 # cookie, token, middleware
      routes/
        users.js
        conversations.js
        uploads.js
      realtime/
        chat.js
        presence.js
        calls.js
      uploads/                # chỉ ở môi trường local, production dùng volume
    Dockerfile
    .env.example
  deploy/
    compose.yml
    nginx-chat.conf
    nginx-api.conf
    turnserver.conf.example
  .github/workflows/ci.yml
  README.md
```

**Không cần tách file ngay ngày đầu.** Khi một phần trong `index.js` đã chạy và có test, mới chuyển nguyên đoạn sang module riêng, import lại và test trước khi làm phần tiếp. Lý do: tách cấu trúc và thêm chức năng cùng lúc sẽ khiến bạn không biết lỗi do đâu. Tên route thực tế trong Phần I là `/api/auth/...`, `/api/conversations/...`; giữ đúng tên đó ở mọi file. Tên event call thực tế là `call_signal` kèm `type: offer/answer/candidate`, thống nhất với [thiết kế kỹ thuật](#phan-b).

Thứ tự phụ thuộc bắt buộc:

```text
Auth + quyền -> Chat DB-first -> Reconnect -> Group -> Presence/read -> Upload
                                           \-> Signaling -> WebRTC LAN -> TURN
Chat + Call + Responsive -> HTTPS online -> Full regression -> Báo cáo
```

Mỗi PR nên có một trang Trello: mục tiêu, người phụ trách, các file đổi, cách test, ảnh/video nếu là UI và dòng “Đạt khi”.

<a id="e-17"></a>

### 17. Hoàn thiện tài khoản, phiên đăng nhập, hồ sơ và tìm người dùng

<a id="e-17-1"></a>

#### 17.1 Vì sao phải thay bản đăng nhập đầu tiên

Bản đầu ở Phần I giữ access token trong memory, nên tải lại trang phải login và socket cũ có thể sống quá hạn token. Bản hoàn chỉnh cần refresh token nằm trong cookie `HttpOnly`, rotation và logout thu hồi phiên. Access token vẫn chỉ để trong memory. Trên production, Nginx phục vụ frontend và API bằng HTTPS, không đặt bí mật trong `VITE_*`.

Gói `cookie-parser` đã được cài cùng backend ở mục 3.2. Kiểm tra nó có trong `server/package.json` trước khi làm bước này.

**THÊM vào `server/src/models.js`:** User có `avatarAttachmentId`, `lastSeenAt`; tạo `RefreshSession`. MongoDB TTL xóa bản ghi hết hạn để database không tăng mãi. Trạng thái thu hồi vẫn phải được kiểm tra khi dùng token, không chờ TTL chạy.

```js
userSchema.add({
  avatarAttachmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachment",
  },
  lastSeenAt: Date,
});

const refreshSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revokedAt: Date,
  },
  { timestamps: true },
);
refreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const RefreshSession = mongoose.model(
  "RefreshSession",
  refreshSessionSchema,
);
```

`userSchema.add` phải đặt **sau khi tạo `userSchema`, trước dòng `mongoose.model('User', userSchema)`**. Import `RefreshSession` trong `index.js` và thêm `RefreshSession.init()` vào `Promise.all` lúc khởi động. Nếu bạn đặt schema sau `mongoose.model`, Mongoose đã biên dịch model nên field mới có thể không hoạt động như dự định.

**THÊM ở đầu `server/src/index.js`:**

```js
import cookieParser from "cookie-parser";
import { randomBytes, createHash } from "node:crypto";
// Trong import từ ./models.js, bổ sung RefreshSession.
```

**THAY cấu hình CORS và thêm cookie parser** trước các route:

```js
app.use(cors({ origin, credentials: true }));
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());
```

`credentials: true` cho phép trình duyệt gửi refresh cookie từ Vite port 5173 sang API port 3001. CORS chỉ là quy tắc trình duyệt; mọi route vẫn phải kiểm tra token/quyền. Nếu giữ `app.use(cors({ origin }))` cũ song song, xóa dòng cũ để tránh hai cấu hình trái nhau.

**THÊM helper gần `makeToken` trong `server/src/index.js`:**

```js
const REFRESH_MS = 14 * 24 * 60 * 60 * 1000;
const REFRESH_COOKIE = "chatcall_refresh";
function hashToken(value) {
  return createHash("sha256").update(value).digest("hex");
}
function setRefreshCookie(res, rawToken) {
  res.cookie(REFRESH_COOKIE, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: REFRESH_MS,
  });
}
function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
  });
}
async function issueRefresh(userId, res) {
  const rawToken = randomBytes(48).toString("base64url");
  await RefreshSession.create({
    userId,
    tokenHash: hashToken(rawToken),
    expiresAt: new Date(Date.now() + REFRESH_MS),
  });
  setRefreshCookie(res, rawToken);
}
```

`randomBytes` tạo token khó đoán. DB chỉ giữ hash nên lộ DB không lập tức lộ token còn dùng được. Cookie `HttpOnly` không thể bị JavaScript đọc; `Secure` yêu cầu HTTPS khi production. `path` làm cookie chỉ được gửi đến các route auth. Nếu frontend/API nằm ở hai site khác nhau hoàn toàn, `SameSite=Lax` có thể không gửi cookie: ưu tiên hai subdomain cùng site; không đổi sang `None` mà quên `Secure` và chống CSRF.

**THAY cuối route login:** trước khi `res.json`, gọi `await issueRefresh(user._id, res);`. Response vẫn là `{ token: makeToken(user), user: publicUser(user) }`. **THÊM hai route trước `io.use`:**

```js
app.post("/api/auth/refresh", async (req, res) => {
  const raw = req.cookies?.[REFRESH_COOKIE];
  if (!raw) return res.status(401).json({ error: "NO_REFRESH_TOKEN" });
  const now = new Date();
  // Chỉ một request có thể đổi phiên cũ: chống dùng lại cùng token.
  const oldSession = await RefreshSession.findOneAndUpdate(
    { tokenHash: hashToken(raw), revokedAt: null, expiresAt: { $gt: now } },
    { $set: { revokedAt: now } },
    { new: false },
  );
  if (!oldSession) {
    clearRefreshCookie(res);
    return res.status(401).json({ error: "REFRESH_EXPIRED_OR_REUSED" });
  }
  const user = await User.findById(oldSession.userId);
  if (!user) {
    clearRefreshCookie(res);
    return res.status(401).json({ error: "USER_NOT_FOUND" });
  }
  await issueRefresh(user._id, res);
  res.json({ token: makeToken(user), user: publicUser(user) });
});

app.post("/api/auth/logout", async (req, res) => {
  const raw = req.cookies?.[REFRESH_COOKIE];
  if (raw)
    await RefreshSession.updateOne(
      { tokenHash: hashToken(raw), revokedAt: null },
      { $set: { revokedAt: new Date() } },
    );
  clearRefreshCookie(res);
  res.status(204).end();
});
```

`logout` ở đây thu hồi refresh cookie. Access token đã cấp vẫn hợp lệ tối đa 15 phút nếu bị sao chép trước đó; khi cần thu hồi tức thì phải thêm denylist/version trên server. Với bài tập 3 tuần, thời gian 15 phút và rotation là mức thực tế hơn. Route refresh là một thay đổi trạng thái dựa vào cookie; trên production phải kiểm tra `Origin`/`Referer` cùng site hoặc dùng CSRF token, nhất là nếu đổi `SameSite`.

Thêm hai chốt bảo vệ nhỏ trước khi đưa online. Trong `server`, chạy `npm install express-rate-limit`, rồi import `{ rateLimit }`. Tạo `const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 });` và đặt middleware này trước handler `register`, `login`, `refresh`; quá giới hạn sẽ nhận HTTP 429. Tạo middleware `requireTrustedOrigin` kiểm tra `req.get('origin')` nếu có phải đúng `CLIENT_ORIGIN`; đặt trước handler `login`, `refresh`, `logout` vì các route này đặt hoặc dùng cookie. Khi backend đứng sau **đúng một** Nginx proxy, cấu hình `app.set('trust proxy', 1)` trên production để limiter thấy IP client; không bật mức trust proxy rộng tùy tiện. Bản demo dùng memory store một instance; nếu sau này nhiều backend instance, limiter cần shared store. Xem [tài liệu chính thức express-rate-limit](https://github.com/express-rate-limit/express-rate-limit/blob/main/readme.md).

**THÊM `client/src/api.js`** để mọi request dùng chung một cách xác thực. Hàm `refreshSession` giữ một Promise chung, nhờ vậy hai request cùng nhận 401 không dùng lại cùng refresh cookie hai lần:

```js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
let accessToken = "";
let sessionListener = () => {};
let refreshPromise = null;

export function subscribeSession(listener) {
  sessionListener = listener;
  return () => {
    sessionListener = () => {};
  };
}
export function setSession(session) {
  accessToken = session?.token || "";
  sessionListener(session);
}
export async function refreshSession() {
  if (!refreshPromise)
    refreshPromise = (async () => {
      const response = await fetch(API_URL + "/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        if (response.status === 401) setSession(null);
        throw new Error(
          response.status === 401
            ? "REFRESH_EXPIRED"
            : `REFRESH_HTTP_${response.status}`,
        );
      }
      const session = await response.json();
      setSession(session);
      return session;
    })().finally(() => {
      refreshPromise = null;
    });
  return refreshPromise;
}
export async function apiResponse(path, options = {}) {
  const send = () => {
    const headers = new Headers(options.headers || {});
    if (options.body && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return fetch(API_URL + path, {
      ...options,
      headers,
      credentials: "include",
    });
  };
  let response = await send();
  if (response.status === 401 && !path.startsWith("/api/auth/")) {
    await refreshSession();
    response = await send(); // Chỉ thử lại một lần.
  }
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return response;
}
export async function api(path, options = {}) {
  const response = await apiResponse(path, options);
  return response.status === 204 ? null : response.json();
}
export async function logoutSession() {
  const response = await fetch(API_URL + "/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) throw new Error("LOGOUT_FAILED");
  setSession(null);
}
```

**THAY trong `App.jsx` của Phần I:** import `api`, `refreshSession`, `subscribeSession`, `setSession`, `logoutSession` từ `./api.js`; xóa hàm `request` cũ. Thay mọi lệnh `request(...)` thành `api(...)` và bỏ tham số token cuối cùng vì `api` tự đọc access token. Đổi `loadAllMessages(conversationId, token)` thành `loadAllMessages(conversationId)` và các chỗ gọi tương ứng. Sau khi login thành công, gọi `setSession(result)` thay cho `setToken(result.token); setMe(result.user);`. Trong `logout`, `await logoutSession()` rồi xóa inbox/chat; socket sẽ bị ngắt khi `token` trở thành rỗng. Nếu logout API lỗi do mất mạng, hiện thông báo và cho thử lại; đừng nói đã đăng xuất khỏi server khi refresh cookie chưa được thu hồi.

Đổi hàm logout cũ thành:

```jsx
async function logout() {
  try {
    await logoutSession();
    setActiveId("");
    setMessages([]);
    setConversations([]);
    setUsers([]);
  } catch {
    setError("Chưa đăng xuất được khỏi server. Kiểm tra mạng và thử lại.");
  }
}
```

Thêm state `const [booting, setBooting] = useState(true);` và effect này **trước effect tạo socket**:

```jsx
useEffect(() => {
  let alive = true;
  const unsubscribe = subscribeSession((session) => {
    if (!alive) return;
    setToken(session?.token || "");
    setMe(session?.user || null);
  });
  refreshSession()
    .catch(() => {})
    .finally(() => {
      if (alive) setBooting(false);
    });
  return () => {
    alive = false;
    unsubscribe();
  };
}, []);

useEffect(() => {
  if (!token) return;
  // Chỉ dùng payload JWT để hẹn giờ; server vẫn là nơi xác thực chữ ký.
  const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(
    atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")),
  );
  const delay = Math.max(1000, payload.exp * 1000 - Date.now() - 60000);
  const timer = setTimeout(() => refreshSession().catch(() => {}), delay);
  return () => clearTimeout(timer);
}, [token]);

useEffect(() => {
  const onOnline = () => refreshSession().catch(() => {});
  window.addEventListener("online", onOnline);
  return () => window.removeEventListener("online", onOnline);
}, []);
```

Trước `if (!token) return (...)`, thêm `if (booting) return <p>Đang kiểm tra phiên...</p>;`. Nếu máy offline lúc mở trang, `refreshSession` báo lỗi mạng nhưng không xóa token cookie; hiện nút Thử lại thay vì màn login vĩnh viễn. Với người mới, có thể reload sau khi mạng trở lại, rồi cải thiện UI thử lại. Khi `setSession` đổi token, effect socket `[token]` ở Phần I sẽ disconnect socket cũ và tạo socket mới, sau đó join/sync lại phòng. Trong listener `connect_error` của socket, thử `refreshSession()` một lần trước khi yêu cầu login lại; nếu refresh cũng 401, mới hiển thị form đăng nhập.

**Socket hết hạn:** trong middleware `io.use`, giữ `decoded = jwt.verify(...)`, đặt `socket.data.userId = decoded.sub` và `socket.data.tokenExpiresAt = decoded.exp * 1000`. Ngay đầu `io.on('connection')`, đặt timer `setTimeout(() => socket.disconnect(true), Math.max(0, socket.data.tokenExpiresAt - Date.now()))` và `clearTimeout` khi disconnect. Client cần làm mới access token trước mốc hết hạn rồi tạo socket mới bằng token mới; nếu không, sau 15 phút realtime dừng. Đây là chỗ bản đầu ở Phần I chưa hoàn thiện.

**Đạt khi:** login đặt cookie HttpOnly; reload trang vẫn vào app; refresh cũ dùng lần hai nhận 401; logout rồi reload không còn phiên; socket với token hết hạn bị ngắt. Chụp DevTools Application/Cookies nhưng che giá trị token trong ảnh báo cáo.

<a id="e-17-2"></a>

#### 17.2 Hồ sơ và tìm người dùng

**THAY `publicUser` trong `server/src/index.js`** để trả cả avatar và lần hoạt động gần nhất, vẫn không trả `passwordHash`:

```js
function publicUser(user) {
  return {
    id: String(user._id),
    email: user.email,
    displayName: user.displayName,
    avatarAttachmentId: user.avatarAttachmentId || null,
    lastSeenAt: user.lastSeenAt || null,
  };
}
```

**THÊM các route trước `io.use`:**

```js
app.get("/api/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "USER_NOT_FOUND" });
  res.json(publicUser(user));
});

app.patch("/api/me", requireAuth, async (req, res) => {
  const displayName = String(req.body?.displayName || "").trim();
  if (displayName.length < 2 || displayName.length > 50) {
    return res.status(400).json({ error: "INVALID_DISPLAY_NAME" });
  }
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $set: { displayName } },
    { new: true },
  );
  res.json(publicUser(user));
});

app.get("/api/users/search", requireAuth, async (req, res) => {
  const q = String(req.query.q || "")
    .trim()
    .slice(0, 50);
  if (q.length < 2) return res.json([]);
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(safe, "i");
  const users = await User.find({
    _id: { $ne: req.userId },
    $or: [{ displayName: regex }, { email: regex }],
  })
    .select("email displayName avatarAttachmentId lastSeenAt")
    .limit(20);
  res.json(users.map(publicUser));
});
```

Escaping trong `safe` làm dấu `.` hay `*` người dùng nhập được hiểu là ký tự bình thường, không thành biểu thức tìm kiếm khó kiểm soát. Bản capstone nhỏ có thể dùng regex; khi dữ liệu lớn, tạo index phục vụ search hoặc dùng Atlas Search. Để sửa avatar, dùng `POST /api/me/avatar` ở mục 20.4; server lấy user ID từ access token và tự cập nhật `avatarAttachmentId`. `PATCH /api/me` ở ví dụ này chỉ sửa tên hiển thị. Không dùng ảnh thuộc một phòng chat làm avatar công khai, và không nhận URL tùy ý từ client rồi tin rằng đó là avatar an toàn.

Ở frontend, thay danh sách mọi user bằng ô tìm kiếm: state `query`, `useEffect` đặt timer 300 ms sau khi gõ rồi gọi `GET /api/users/search?q=${encodeURIComponent(query)}`; khi effect cleanup thì `clearTimeout`. Hiển thị ba trạng thái: chưa nhập đủ 2 ký tự, đang tải và không có kết quả. Form sửa tên gọi `PATCH /api/me`, nhận response và cập nhật `me`. **Đạt khi:** tìm được B bằng tên/email; đổi tên xong inbox hiện tên mới; token của A không sửa được hồ sơ B.

<a id="e-18"></a>

### 18. Hoàn thiện inbox, phân trang, tìm tin và đồng bộ sau mất mạng

<a id="e-18-1"></a>

#### 18.1 Inbox có tin gần nhất và chưa đọc

Bản đầu chỉ trả mảng `Conversation` và tải toàn bộ lịch sử; bản cuối cần tin gần nhất, thời gian và số chưa đọc. Với nhóm tối đa 20 người và dự án ba tuần, giữ `memberIds` là **nguồn quyền truy cập duy nhất**, `ownerId` là owner. Thêm một map số thứ tự đã đọc cho từng user vào Conversation, thay vì tạo một collection membership thứ hai rồi có nguy cơ hai nơi không khớp. Cập nhật sơ đồ dữ liệu ở báo cáo theo đúng quyết định này.

**THÊM vào `conversationSchema` trước khi tạo model:**

```js
conversationSchema.add({
  lastMessageAt: Date,
  lastMessageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  readSeqByUser: { type: Map, of: Number, default: {} },
});
```

Trong transaction `send_message` ở Phần I, sau `Message.create(...)` và trước khi callback transaction kết thúc, cập nhật `Conversation` cùng session:

```js
await Conversation.updateOne(
  { _id: conversationId },
  {
    $set: {
      lastMessageAt: created[0].createdAt,
      lastMessageId: created[0]._id,
    },
  },
  { session },
);
```

Sau đó **THAY** `GET /api/conversations` bằng một route trả từng `Conversation` cộng `latestMessage` và `unreadCount`: tìm tối đa 50 conversation của user, lấy `Message.findById(conversation.lastMessageId)` và `Message.countDocuments({ conversationId: conversation._id, seq: { $gt: conversation.readSeqByUser?.get(req.userId) || 0 }, senderId: { $ne: req.userId } })`. Dùng `Promise.all` để làm song song; sắp xếp theo `lastMessageAt`, fallback `createdAt`. 50 conversation và các index ở Phần I đủ cho demo; nếu lớn hơn phải dùng aggregation thay vì nhiều query. Frontend render tên, `latestMessage.body` hoặc “Đã gửi tệp”, thời gian, badge `unreadCount`.

<a id="e-18-2"></a>

#### 18.2 Phân trang đúng nghĩa

Ở Phần I, API `afterSeq` dùng để lấy tin **mới bị bỏ lỡ**, không thuận tiện để cuộn lên xem lịch sử cũ. Giữ API đó cho reconnect. Thêm query `beforeSeq` cho trang cũ:

```js
const beforeSeq = Number(req.query.beforeSeq);
const pageSize = 30;
const page = await Message.find({
  conversationId: id,
  seq: { $lt: beforeSeq },
})
  .sort({ seq: -1 })
  .limit(pageSize);
res.json(page.reverse());
```

Đây là phần **thân route sau khi đã kiểm tra ID và membership như route lịch sử ở Phần I**, không phải route mới hoàn chỉnh. Trong route cũ, nếu request có `beforeSeq` thì validate đó là số nguyên dương, chạy nhánh trên và `return res.json(...)`; nếu không có, giữ nhánh `afterSeq` cũ. Đừng để một request gọi `res.json` hai lần. Khi lần đầu mở chat, đặt `beforeSeq = Number.MAX_SAFE_INTEGER`, lấy 30 tin cuối. Khi người dùng cuộn gần đầu danh sách, gọi tiếp với `beforeSeq` bằng `seq` của tin cũ nhất đang có. Khi reconnect, gọi `afterSeq` bằng **số liên tiếp cuối cùng đã nhận**, không dùng số lớn nhất nếu có gap. Hiển thị spinner khi tải và “Hết lịch sử” khi page ngắn hơn 30.

<a id="e-18-3"></a>

#### 18.3 Đồng bộ sau offline và tìm tin

Socket.IO không lưu tin giúp client khi đang mất mạng; MongoDB là nguồn thật. Sau mỗi `connect`/reconnect, frontend join lại room rồi tải `afterSeq` theo vòng lặp cho đến khi hết. Nếu nhận `message_new` có `seq` lớn hơn `lastContiguousSeq + 1`, gọi sync ngay. Trong `message_new`, thêm tin theo `clientMessageId` như Phần I để tránh trùng khi ACK và broadcast đến cùng lúc. Ghi `lastContiguousSeq` theo từng conversation trong `useRef` hoặc state; khi đổi chat, không dùng cursor của phòng A cho phòng B.

**Tìm tin:** route `GET /api/conversations/:id/search?q=...` phải kiểm tra membership trước, giới hạn query 2–80 ký tự, escape regex như mục 17.2, tìm trong `Message` theo `conversationId` và `body`, sort mới nhất, limit 20. Ở UI, nhập từ khóa, hiện kết quả kèm người gửi/thời gian, bấm kết quả thì mở chat và tải trang chứa `seq` đó. Đừng tìm bằng cách lọc 30 tin đang hiển thị: kết quả cũ sẽ bị bỏ sót.

**Đạt khi:** chat có 120 tin nhưng mở lần đầu chỉ tải 30; cuộn lên tải tiếp; B mất mạng, A gửi 3 tin, B online lại có đủ đúng thứ tự; danh sách chat hiện tin cuối và số chưa đọc; tìm từ ở tin cũ vẫn có kết quả.

<a id="e-19"></a>

### 19. Presence, đang nhập, đã xem và quản lý nhóm

<a id="e-19-1"></a>

#### 19.1 Online/offline không bị sai khi mở nhiều tab

Nếu B mở hai tab, đóng một tab thì B vẫn online. Vì vậy server giữ `Map<userId, Set<socketId>>`. Đặt ở cấp module, trước `io.on('connection')`. Khi connect, thêm socket ID; chỉ phát `presence_changed: online=true` khi số tab chuyển từ 0 sang 1. Khi disconnect, xóa socket ID; chỉ phát `online=false` và `User.updateOne({ _id: userId }, { $set: { lastSeenAt: new Date() } })` khi không còn tab. Với lớp học nhỏ có thể `io.emit`; nếu triển khai thật, chỉ phát cho người có hội thoại liên quan. `Map` RAM chỉ đúng với một backend instance; muốn scale nhiều instance phải đổi sang adapter và presence store chung.

Đoạn cốt lõi để chèn **vào đầu `io.on('connection')` sau `socket.join('user:...')`**:

```js
const onlineSockets = new Map(); // Khai báo MỘT LẦN trước io.on('connection').
// Các dòng dưới nằm trong callback connection, nơi đã có userId và socket.
const tabs = onlineSockets.get(userId) || new Set();
const firstTab = tabs.size === 0;
tabs.add(socket.id);
onlineSockets.set(userId, tabs);
socket.emit("presence_snapshot", [...onlineSockets.keys()]);
if (firstTab) io.emit("presence_changed", { userId, online: true });
socket.on("disconnect", async () => {
  tabs.delete(socket.id);
  if (tabs.size === 0) {
    onlineSockets.delete(userId);
    const lastSeenAt = new Date();
    try {
      await User.updateOne({ _id: userId }, { $set: { lastSeenAt } });
    } catch (error) {
      console.error("Không lưu được lastSeenAt", error);
    }
    io.emit("presence_changed", { userId, online: false, lastSeenAt });
  }
});
```

Đây là **mẫu chèn ở hai vị trí**, không dán nguyên cả khối vào một chỗ: dòng `const onlineSockets = new Map()` ở ngoài callback, các dòng còn lại ở trong. Phần I đã có một `socket.on('disconnect')` cho call; giữ listener đó, Socket.IO có thể gọi cả hai.

Client lắng nghe `presence_changed`, cập nhật user tương ứng trong state, render “Online” hoặc `lastSeenAt`. `GET /api/users/search` chỉ trả `lastSeenAt`, nên thêm event hoặc endpoint lấy snapshot online khi đăng nhập; nếu không, UI có thể hiện offline cho người đã online trước đó. **Đạt khi:** B mở hai tab, đóng một tab vẫn online; đóng tab cuối thì A thấy offline và thời gian cuối hoạt động.

<a id="e-19-2"></a>

#### 19.2 “Đang nhập” là tín hiệu ngắn hạn

Trong `io.on('connection')`, thêm event `typing_start` và `typing_stop`. Mỗi event lấy `conversationId`, validate ObjectId, `Conversation.exists({ _id: conversationId, memberIds: userId })`, rồi `socket.to('conversation:' + conversationId).emit('typing_changed', { conversationId, userId, typing: true/false })`. Không ghi database. Client chỉ gửi `typing_start` tối đa một lần mỗi 2 giây khi đang gõ; sau 2 giây không có phím thì gửi `typing_stop`. Khi rời chat hoặc mất kết nối, xóa indicator. Bên nhận tự tắt indicator sau 3 giây kể cả khi không nhận được `typing_stop` để tránh chữ “đang nhập...” treo mãi.

Code server có thể dùng một handler chung để khỏi quên kiểm tra quyền ở event thứ hai:

```js
for (const [eventName, typing] of [
  ["typing_start", true],
  ["typing_stop", false],
]) {
  socket.on(eventName, async (data, ack) => {
    try {
      const conversationId = String(data?.conversationId || "");
      if (
        !mongoose.isValidObjectId(conversationId) ||
        !(await Conversation.exists({
          _id: conversationId,
          memberIds: userId,
        }))
      )
        return ack?.({ ok: false, error: "NOT_A_MEMBER" });
      socket.to(`conversation:${conversationId}`).emit("typing_changed", {
        conversationId,
        userId,
        typing,
      });
      ack?.({ ok: true });
    } catch {
      ack?.({ ok: false, error: "TYPING_FAILED" });
    }
  });
}
```

<a id="e-19-3"></a>

#### 19.3 Đã xem bằng sequence

Khi A đang mở chat và đã render đủ tin đến `seq=N`, A gửi `read_up_to({ conversationId, seq: N })`. Server chỉ nhận nếu A thuộc room, `N` là số nguyên không âm và `N <= Conversation.lastSeq`. Dùng update `$max: { ['readSeqByUser.' + userId]: N }` để giá trị không lùi khi hai request đến ngược thứ tự. Sau khi DB update, phát `message_seen({ conversationId, userId, seq: N })` cho room. Frontend của người gửi đánh dấu `seen` cho tin có `seq <= N`; `pending/sent/failed` vẫn được quản lý bằng ACK như Phần I. Với nhóm, có thể hiển thị “2/3 đã xem” thay vì một boolean.

Chèn event này **trong callback connection**:

```js
socket.on("read_up_to", async (data, ack) => {
  try {
    const conversationId = String(data?.conversationId || "");
    const seq = Number(data?.seq);
    if (
      !mongoose.isValidObjectId(conversationId) ||
      !Number.isInteger(seq) ||
      seq < 0
    ) {
      return ack?.({ ok: false, error: "INVALID_READ_CURSOR" });
    }
    const conversation = await Conversation.findOne({
      _id: conversationId,
      memberIds: userId,
    }).select("lastSeq");
    if (!conversation || seq > conversation.lastSeq) {
      return ack?.({ ok: false, error: "NOT_ALLOWED" });
    }
    await Conversation.updateOne(
      { _id: conversationId, memberIds: userId },
      {
        $max: { [`readSeqByUser.${userId}`]: seq },
      },
    );
    io.to(`conversation:${conversationId}`).emit("message_seen", {
      conversationId,
      userId,
      seq,
    });
    ack?.({ ok: true });
  } catch {
    ack?.({ ok: false, error: "READ_FAILED" });
  }
});
```

Nếu hai `read_up_to` đến ngược thứ tự, DB không lùi nhờ `$max`; event `message_seen` có thể đến ngược, nên frontend cũng lấy `max(seq hiện tại, seq mới)`.

Không tự gọi `read_up_to` khi tab đang ẩn; dùng `document.visibilityState === 'visible'` và chỉ gửi sau khi trang đã nhận/render lịch sử. Nếu không, bạn có thể báo đã xem tin mà người dùng chưa từng thấy. **Đạt khi:** A gửi tin, B mở chat thì A thấy “Đã xem”; B chưa mở chat thì badge unread còn; `read_up_to` của người lạ bị từ chối.

<a id="e-19-4"></a>

#### 19.4 Quản lý nhóm đầy đủ

Phần I đã có tạo nhóm, thêm và xóa thành viên. Còn thiếu đổi tên, ảnh nhóm và UI owner. Thêm `PATCH /api/conversations/:id` với `requireAuth`, chỉ chấp nhận `type='group'` và `ownerId=req.userId`, validate title 2–80 ký tự; nếu đổi ảnh, attachment phải là ảnh do owner upload. Chỉ dùng `$set` các field cho phép, không đưa cả `req.body` vào `$set` vì client có thể tự sửa `ownerId` hoặc `memberIds`. Phát `conversation_updated` đến room sau khi DB lưu thành công; client cập nhật tên/ảnh trong inbox. UI owner có form tên, chọn người chưa ở nhóm để thêm, danh sách thành viên với nút xóa; nút xóa owner bị vô hiệu và backend cũng chặn. Member thường chỉ xem được danh sách.

**Đạt khi:** A tạo nhóm A/B/C, B không đổi tên hoặc xóa C được, A đổi tên thì B/C thấy sau realtime hoặc reload, C bị xóa không nhận tin mới và API lịch sử trả 403.

<a id="e-20"></a>

### 20. Upload và tải tệp có kiểm tra quyền

<a id="e-20-1"></a>

#### 20.1 Giới hạn và nơi lưu

Chọn phạm vi nhỏ: PNG, JPEG và PDF, tối đa 5 MiB/tệp, tối đa ba tệp trong một tin. Tệp nằm trong thư mục `server/uploads` khi chạy local và một Docker volume khi deploy. Không đưa thư mục này vào Git; thêm `server/uploads/` vào `.gitignore`. Không dùng tên tệp người dùng làm tên lưu trên đĩa, vì tên đó có thể trùng hoặc chứa ký tự đường dẫn. Không phục vụ `uploads` bằng `express.static`: như vậy mọi người biết URL sẽ tải được mà không qua kiểm tra membership.

Multer 2.x đã được cài cùng backend ở mục 3.2; kiểm tra `server/package.json`. Dùng middleware này **chỉ trên route upload**.

**THÊM `Attachment` trong `server/src/models.js`:**

```js
const attachmentSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purpose: { type: String, enum: ["chat", "avatar"], required: true },
    storedName: { type: String, required: true, unique: true },
    originalName: { type: String, required: true },
    mime: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true },
);
export const Attachment = mongoose.model("Attachment", attachmentSchema);
messageSchema.add({
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
});
```

Đặt `messageSchema.add` trước `mongoose.model('Message', ...)`. Trong `messageSchema`, đổi `body` từ `required: true` sang `default: ''` để gửi tin chỉ có tệp. Validation “phải có text hoặc tệp” sẽ ở event `send_message`. Import `Attachment` vào `index.js` và thêm `Attachment.init()` khi server khởi động.

<a id="e-20-2"></a>

#### 20.2 Route upload

**THÊM import** `multer`, `randomUUID` từ `node:crypto`, `mkdir/open/unlink` từ `node:fs/promises`, `join/extname/resolve` từ `node:path` trong module upload riêng hoặc `index.js`. Đặt `const uploadDir = resolve(process.env.UPLOAD_DIR || './uploads');` rồi gọi `await mkdir(uploadDir, { recursive: true })` trước khi mở HTTP server. Nếu dùng `index.js`, chèn route trước `io.use`:

```js
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, callback) => callback(null, randomUUID()),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 0, parts: 1 },
});

async function detectAllowedFile(pathname) {
  const handle = await open(pathname, "r");
  try {
    const buffer = Buffer.alloc(8);
    await handle.read(buffer, 0, 8, 0);
    if (buffer.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")))
      return "image/png";
    if (buffer.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex")))
      return "image/jpeg";
    if (buffer.subarray(0, 5).toString() === "%PDF-") return "application/pdf";
    return null;
  } finally {
    await handle.close();
  }
}

async function requireConversationMember(req, res, next) {
  const id = req.params.id;
  if (
    !mongoose.isValidObjectId(id) ||
    !(await Conversation.exists({ _id: id, memberIds: req.userId }))
  ) {
    return res.status(403).json({ error: "NOT_A_MEMBER" });
  }
  next();
}

app.post(
  "/api/conversations/:id/attachments",
  requireAuth,
  requireConversationMember,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "FILE_REQUIRED" });
    try {
      const detected = await detectAllowedFile(req.file.path);
      const extension = extname(req.file.originalname).toLowerCase();
      const expected = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".pdf": "application/pdf",
      }[extension];
      if (
        !detected ||
        detected !== expected ||
        req.file.mimetype !== detected
      ) {
        await unlink(req.file.path);
        return res.status(400).json({ error: "FILE_TYPE_NOT_ALLOWED" });
      }
      const attachment = await Attachment.create({
        conversationId: req.params.id,
        ownerId: req.userId,
        purpose: "chat",
        storedName: req.file.filename,
        originalName: req.file.originalname
          .replace(/[\\/\r\n\0]/g, "_")
          .slice(0, 120),
        mime: detected,
        size: req.file.size,
      });
      return res
        .status(201)
        .json({
          id: String(attachment._id),
          name: attachment.originalName,
          mime: attachment.mime,
          size: attachment.size,
        });
    } catch (error) {
      await unlink(req.file.path).catch(() => {});
      throw error;
    }
  },
);
```

`Multer` ghi tệp vào đĩa; `limits` chặn kích thước trước khi đọc vô hạn. `mimetype` và extension do client báo, nên phải kiểm tra thêm chữ ký byte đầu. Bản demo giới hạn chỉ ba định dạng; PDF có thể chứa nội dung chủ động trong một số trình đọc, nên route download ở dưới luôn trả PDF dưới dạng attachment. Với production thật cần thêm quét mã độc và object storage; ghi giới hạn này vào báo cáo.

**THAY error handler cuối `index.js`:**

```js
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.code });
  }
  console.error(error);
  res.status(500).json({ error: "SERVER_ERROR" });
});
```

Nếu không làm bước này, file quá 5 MiB bị hiển thị là lỗi server thay vì lỗi dữ liệu. `catch` trong route upload xóa file khi DB lưu metadata thất bại để tránh tệp mồ côi.

**THÊM route tải có quyền:**

```js
app.get("/api/attachments/:attachmentId", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.attachmentId)) {
    return res.status(400).json({ error: "INVALID_ATTACHMENT_ID" });
  }
  const attachment = await Attachment.findById(req.params.attachmentId);
  if (
    !attachment ||
    attachment.purpose !== "chat" ||
    !(await Conversation.exists({
      _id: attachment.conversationId,
      memberIds: req.userId,
    }))
  )
    return res.status(403).json({ error: "NOT_ALLOWED" });
  res.set("X-Content-Type-Options", "nosniff");
  res.type(attachment.mime);
  res.download(join(uploadDir, attachment.storedName), attachment.originalName);
});
```

`res.download` giữ tên gốc cho người tải, nhưng path lấy từ `storedName` ngẫu nhiên của server. Ảnh xem trước trong chat có thể thêm endpoint `?inline=1` chỉ cho MIME ảnh, vẫn phải qua `requireAuth` và membership. Không trả file bằng đường dẫn static công khai.

<a id="e-20-3"></a>

#### 20.3 Gắn tệp vào tin nhắn và frontend

Trong `send_message` của Phần I, đọc `attachmentIds = Array.isArray(data?.attachmentIds) ? data.attachmentIds : []`. Kiểm tra tối đa ba ID, không trùng nhau và tất cả là ObjectId; nếu `body` rỗng và không có attachment thì từ chối. Trước transaction, dùng `Attachment.find({ _id: { $in: attachmentIds }, conversationId, ownerId: userId, purpose: 'chat' })`; số bản ghi phải bằng số ID gửi lên. Trong `Message.create`, thêm `attachments: attachmentIds`. Không tin client chỉ vì họ có ID tệp: phải kiểm tra đúng hội thoại và đúng người upload. Khi trả message cho client, populate hoặc lấy metadata attachment để hiển thị tên, loại và link tải.

Ở `Composer.jsx`, dùng `<input type="file" accept="image/png,image/jpeg,application/pdf" multiple />`. Với từng tệp, tạo `FormData`, `append('file', file)`, rồi gọi `api('/api/conversations/' + activeId + '/attachments', { method: 'POST', body: formData })` từ `client/src/api.js`. **Không tự đặt `Content-Type`** cho `FormData`; trình duyệt sẽ thêm boundary. Chỉ khi mọi upload đã trả ID mới emit `send_message` với `attachmentIds`. Hiển thị tiến trình “Đang tải”, lỗi từng tệp và nút thử lại; nút Gửi bị khóa trong lúc tải.

Khi hiển thị tệp, gọi `apiResponse('/api/attachments/' + id)` từ `api.js`, sau đó `await response.blob()`, tạo `URL.createObjectURL(blob)`, gắn vào link/ảnh và `URL.revokeObjectURL` khi component biến mất. `apiResponse` giữ nguyên Bearer/refresh logic nhưng trả raw Response để bạn đọc dữ liệu nhị phân. Nếu B bị xóa khỏi nhóm, request tải phải trả 403 dù B vẫn giữ URL trong trình duyệt. Tệp đã tải vào máy trước đó không thể thu hồi từ xa; không tuyên bố bảo mật tuyệt đối.

**Đạt khi:** PNG/JPEG/PDF hợp lệ dưới 5 MiB tải được; file giả mạo `.png` bị từ chối; tệp >5 MiB lỗi rõ ràng; user ngoài hội thoại không tải được; Docker restart không làm mất file vì đã mount volume. Cần dọn tệp upload bỏ dở không gắn vào tin bằng một job định kỳ hoặc ghi rõ giới hạn demo.

<a id="e-20-4"></a>

#### 20.4 Avatar cá nhân tách khỏi phòng chat

Tạo `POST /api/me/avatar` với `requireAuth` và cùng `upload.single('file')`/`detectAllowedFile` ở mục 20.2; chỉ chấp nhận PNG/JPEG, tạo Attachment có `purpose:'avatar'`, `ownerId:req.userId`, **không có `conversationId`**, rồi đặt `User.avatarAttachmentId` bằng ID mới. Response trả `publicUser(user)`. Tạo `GET /api/users/:id/avatar`: yêu cầu user đăng nhập, tìm User và Attachment có `purpose:'avatar'`, trả ảnh bằng `res.sendFile` với `Content-Type` đúng và `X-Content-Type-Options:nosniff`. Vì thẻ `<img src>` không tự gửi Bearer token, frontend dùng `apiResponse` để lấy Blob và tạo object URL như ảnh trong chat. Avatar được chia sẻ cho người dùng đã đăng nhập, nên không dùng ảnh thuộc phòng chat làm nguồn avatar. Nếu avatar cũ không còn được dùng, job dọn file phải xác nhận không có User nào tham chiếu nó trước khi xóa. **Đạt khi:** A đổi avatar, B nhìn thấy; user C không thể cập nhật avatar của A qua API.

<a id="e-21"></a>

### 21. Gọi thoại, gọi video và xử lý lỗi cuộc gọi

<a id="e-21-1"></a>

#### 21.1 Mở rộng CallPanel đã viết ở Phần I

Phần I mới gọi video. Để có cả gọi thoại, mỗi lời mời phải có `mediaType: 'voice' | 'video'` và hai phía dùng cùng mode. Trong handler `call_invite` trên server, lấy thêm `mediaType` từ `data`, chỉ chấp nhận hai giá trị đó, lưu vào `calls.set(...)` và phát cùng `call_invite` cho callee. Nếu nhận `call_accept`, caller lấy mode trong `callRef`; callee lấy mode từ incoming event.

Trong `CallPanel.jsx`:

1. Đổi `startCall()` thành `startCall(mediaType)`, gán `callRef.current = { callId, otherUserId, mediaType }`, emit `call_invite` kèm `mediaType`.
2. Đổi `prepareMedia()` thành `prepareMedia(mediaType)`, dùng `getUserMedia({ audio: true, video: mediaType === 'video' })`. Caller gọi `prepareMedia(mediaType)`; callee gọi `prepareMedia(incoming.mediaType)`.
3. Thay một nút bằng “Gọi thoại” gọi `startCall('voice')` và “Gọi video” gọi `startCall('video')`. Khi voice, ẩn khung camera local, nút tắt camera bị disable; mic và nút kết thúc vẫn hoạt động.
4. Thêm `remoteAudioRef = useRef(null)` và thẻ `<audio ref={remoteAudioRef} autoPlay />`. Trong `pc.ontrack`, nếu voice thì gán stream vào `remoteAudioRef.current.srcObject`; nếu video thì gán vào video remote. Trong `cleanup`, xóa cả hai `srcObject`. Chỉ một thẻ nhận stream để âm thanh không phát hai lần.
5. Khi `getUserMedia` bị từ chối (`NotAllowedError`) hoặc không có thiết bị (`NotFoundError`), map tên lỗi thành thông báo tiếng Việt dễ hiểu; emit `call_reject` nếu callee chưa accept, hoặc `call_end` nếu call đã bắt đầu.

Các dòng quan trọng cần **thay trong component**, không dán thành một hàm mới độc lập:

```jsx
const remoteAudioRef = useRef(null); // Cạnh remoteVideoRef.

// Trong prepareMedia(mediaType):
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: mediaType === "video",
});
pc.ontrack = (event) => {
  const target =
    callRef.current?.mediaType === "voice"
      ? remoteAudioRef.current
      : remoteVideoRef.current;
  if (target) target.srcObject = event.streams[0];
};

// Trong JSX, luôn render audio để ref tồn tại khi voice bắt đầu:
<>
  <audio ref={remoteAudioRef} autoPlay />
  <button
    onClick={() => startCall("voice")}
    disabled={!otherUserId || status !== "idle" || !iceServers?.length}
  >
    Gọi thoại
  </button>
  <button
    onClick={() => startCall("video")}
    disabled={!otherUserId || status !== "idle" || !iceServers?.length}
  >
    Gọi video
  </button>
</>;
```

Khi callee bấm Nhận, đặt `callRef.current = { callId, otherUserId: callerId, mediaType: incoming.mediaType }` **trước** `prepareMedia(incoming.mediaType)`. Trong `cleanup`, thêm `if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;`. Trong handler `onInvite`, lưu `mediaType` vào `incoming`. Nếu một bên vẫn dùng `video:true` cho voice, trình duyệt sẽ xin quyền camera không cần thiết và nút Gọi thoại không đúng nghĩa.

Server chỉ chuyển signaling; không gửi audio/video bằng Socket.IO. Trong `call_signal`, thêm kiểm tra hướng: chỉ caller được gửi `offer`, chỉ callee được gửi `answer`, hai phía đều có thể gửi `candidate`. Chặn payload quá lớn và bỏ `callId` cũ. Khi một tab accept, các tab khác của cùng người nhận nhận `answered_elsewhere` như Phần I. Thêm giới hạn tần suất `call_invite` (ví dụ tối đa 5 lần/phút/user) để một tài khoản không liên tục làm phiền người khác; có thể dùng package rate limiter hoặc bộ đếm RAM vì demo một instance.

<a id="e-21-2"></a>

#### 21.2 Các trạng thái phải hiện trong UI

Đừng chỉ có một boolean `isCalling`. Bản cuối phải phân biệt `idle`, `preparing`, `ringing`, `connecting`, `connected`, `ended/failed`. Ở mỗi trạng thái, ghi text người dùng hiểu được và chỉ hiện nút hợp lệ. Nếu B offline, server ACK `USER_OFFLINE`; nếu bận, `CALL_BUSY_OR_INVALID`; nếu không nhận trong 30 giây, `timeout`; nếu mất mạng/camera, có thông báo và cleanup. Sau `call_end`, mọi track phải `stop()`, peer connection `close()`, listener không được đăng ký lặp. Test gọi lần thứ hai ngay sau lần đầu để phát hiện camera còn bị giữ.

<a id="e-21-3"></a>

#### 21.3 TURN và bằng chứng relay

Phần I, mục 12 đã có API `/api/ice` sinh credential coturn. Ở bước deploy, đặt `TURN_HOST` và `TURN_SHARED_SECRET` đúng với coturn; tải lại ICE config trước khi gọi. Chỉ trong **một chế độ test**, tạo `RTCPeerConnection({ iceServers, iceTransportPolicy: 'relay' })` để ép relay; bản dùng thường quay về `all`. Kiểm tra selected candidate pair trong `chrome://webrtc-internals` hoặc stats API: local hoặc remote candidate là `relay` và `bytesSent/bytesReceived` tăng khi nói/di chuyển. Ghi ảnh có thời gian, hai mạng khác nhau và commit SHA. Có relay candidate trong danh sách nhưng không được chọn thì chưa chứng minh cuộc gọi đi qua TURN.

**Cách dùng công cụ kiểm tra:** trên Chrome của cả hai máy, mở tab `chrome://webrtc-internals` **trước** khi bấm gọi. Quay lại tab ứng dụng và thực hiện cuộc gọi. Trong tab webrtc-internals, chọn peer connection vừa tạo, tìm `selectedCandidatePair`/`candidate-pair` đang được chọn, rồi xem loại candidate liên quan (`relay`) và số byte media gửi/nhận tăng theo thời gian. Nếu không thấy peer connection, cuộc gọi chưa đi tới bước tạo `RTCPeerConnection`; quay lại Console/Network và log signaling. Nếu có peer connection nhưng không có pair được chọn, kiểm tra ICE URL, credential, cổng TURN và firewall. Chụp màn hình sau khi che token/credential.

**Đạt khi:** voice và video đều hai chiều trong LAN; từ chối permission không làm ứng dụng treo; sau khi kết thúc camera tắt; hai máy khác mạng vẫn gọi được với relay; một user không nhận hai call đang hoạt động cùng lúc.

<a id="e-22"></a>

### 22. Giao diện desktop, điện thoại và khả năng sử dụng

<a id="e-22-1"></a>

#### 22.1 Luồng màn hình

Vẽ bốn màn hình trước khi chỉnh CSS: đăng nhập/đăng ký, inbox, chat riêng/nhóm, call overlay. Desktop có sidebar và pane chat; điện thoại chỉ một pane: từ inbox bấm hội thoại đi vào chat, có nút Quay lại. Form đăng nhập phải có nhãn, thông báo lỗi và nút khóa khi đang gửi. Inbox có tìm người, danh sách hội thoại, badge chưa đọc. Chat có header, timeline, composer, upload, typing, trạng thái sent/seen/failed. Call overlay xuất hiện ngay cả khi đang ở inbox.

Mục 7.2 đã triển khai màn hình một pane trên điện thoại bằng `activeId`: sidebar nhận `hidden` khi đã chọn hội thoại, pane chat nhận `hidden` khi chưa chọn; tiền tố `md:flex` cho cả hai pane trên tablet/desktop. Nút Quay lại có `md:hidden`, chỉ xuất hiện trên điện thoại. Bố cục hai cột bắt đầu ở `md:grid md:grid-cols-[18rem_minmax(0,1fr)]`. Đừng viết thêm media query CSS cho các trường hợp này; sửa utility class trong JSX để bố cục ở cùng chỗ với component.

`CallPanel` ở mục 11.4 là sibling của pane chat, dùng `fixed` và `z-50`, nên lời mời gọi vẫn hiện khi điện thoại đang ở inbox. Khi thêm tính năng mới, giữ cấu trúc này. `max-w-full` giữ video trong khung; `wrap-anywhere` xử lý tin nhắn có chuỗi dài. Test ở 360, 768 và 1440 px; trên điện thoại thật mở bàn phím ảo để kiểm tra composer vẫn nhìn thấy. Dùng `<label>` cho input, `role="alert"` cho lỗi, `aria-label` cho nút chỉ có icon, màu chữ đủ tương phản và điều khiển được bằng bàn phím.

<a id="e-22-2"></a>

#### 22.2 Loading, empty, error

Mỗi request cần trạng thái `idle/loading/success/error`. Không dùng một biến `error` duy nhất cho toàn app khi dự án lớn lên; auth, inbox, chat, upload và call nên có lỗi riêng. Khi chưa có hội thoại, hiển thị hướng dẫn tạo chat. Khi lịch sử trống, hiện “Chưa có tin nhắn”. Khi offline, cho biết tin đang `pending/failed` và có nút retry cùng `clientMessageId`. Khi upload lỗi, giữ nội dung đã nhập. Khi call lỗi, cho phép gọi lại sau cleanup.

**Đạt khi:** không có màn trắng lúc tải; không cần refresh thủ công để thấy tin hoặc call; thao tác chính chạy ở 360 px, bàn phím và chuột; người dùng hiểu lỗi và có cách thử lại.

<a id="e-23"></a>

### 23. Kiểm thử có bằng chứng

<a id="e-23-1"></a>

#### 23.1 Ma trận test bắt buộc

Tạo `evidence/test-results.md` trong repository code của nhóm. Mỗi dòng ghi ngày, commit SHA, người test, môi trường, kết quả Pass/Fail và link ảnh/video/log. Không ghi token, mật khẩu hoặc connection string vào ảnh. Test ba tài khoản A/B/C và hai thiết bị/mạng thật nếu có.

| Mã         | Thao tác                                  | Kết quả phải thấy                                    |
| ---------- | ----------------------------------------- | ---------------------------------------------------- |
| AUTH-01    | Đăng ký A, trùng email, mật khẩu ngắn     | Tạo A; trùng 409; dữ liệu sai 400.                   |
| AUTH-02    | Login, reload, logout, reload             | Refresh giữ phiên; logout xong không tự vào lại.     |
| AUTH-03    | Dùng lại refresh token cũ sau rotation    | 401, không cấp thêm access token.                    |
| PROFILE-01 | A đổi tên/avatar, B tìm A                 | B thấy thông tin mới; người lạ không sửa A.          |
| CHAT-01    | A/B gửi 10 tin, reload                    | Đủ 10 tin, thứ tự `seq` đúng, không trùng.           |
| CHAT-02    | Tắt mạng B, A gửi 3 tin, bật lại          | B sync đủ 3 tin bỏ lỡ.                               |
| CHAT-03    | Giả lập mất ACK, retry cùng UUID          | MongoDB chỉ có một message.                          |
| CHAT-04    | Có 120 tin, cuộn lịch sử                  | Mở đầu 30 tin; cuộn mới tải trang cũ.                |
| CHAT-05    | Tìm từ khóa ở tin cũ                      | Có kết quả kể cả tin chưa tải lên màn hình.          |
| ACL-01     | C dùng ID phòng A/B qua REST/socket       | GET 403; join/send ACK lỗi; không nhận tin.          |
| GROUP-01   | A tạo nhóm, thêm/xóa C, đổi tên           | A làm được; B không có quyền quản trị.               |
| GROUP-02   | C bị xóa khi socket còn online            | C rời room, không nhận tin mới, tải cũ 403.          |
| STATE-01   | A gõ, B xem, B mở hai tab                 | Typing tự tắt; seen đúng; đóng một tab B vẫn online. |
| FILE-01    | Upload PNG/JPEG/PDF; giả mạo; quá 5 MiB   | File hợp lệ tải được; hai trường hợp sai bị từ chối. |
| FILE-02    | C tải attachment của A/B                  | 403 dù biết attachment ID.                           |
| CALL-01    | Voice/video LAN, reject, busy, timeout    | Media hai chiều; trạng thái và lỗi đúng.             |
| CALL-02    | Từ chối camera/mic rồi gọi lại            | Có thông báo; camera không bị giữ.                   |
| CALL-03    | Hai mạng khác nhau, ép relay              | Selected candidate pair dùng relay và byte tăng.     |
| MOBILE-01  | 360/768/1440 px; bàn phím ảo              | Luồng chính không vỡ; composer dùng được.            |
| DEPLOY-01  | Mở URL ngoài mạng, login/chat/upload/call | HTTPS hợp lệ; không phụ thuộc localhost.             |

Với backend, thêm test tự động cho `register/login`, `NOT_A_MEMBER`, tạo direct idempotent, `send_message` retry và group owner. Test integration phải dùng MongoDB replica set hoặc Atlas test vì transaction ở Phần I sẽ không chạy trên MongoDB standalone. Nếu chưa có test tự động cho WebRTC, ghi rõ ma trận thao tác thủ công và video bằng chứng; không gọi đó là unit test.

<a id="e-23-2"></a>

#### 23.2 Cách debug theo tầng

Khi chức năng lỗi, kiểm tra theo thứ tự: UI có gửi đúng dữ liệu không (DevTools Network/Console), API/socket ACK trả gì, server log gì, MongoDB có bản ghi không, rồi mới đến mạng/TURN. Ví dụ A bấm Gửi mà B không thấy: kiểm tra `send_message` ACK; nếu ACK lỗi, xem validation/quyền; nếu ACK thành công mà DB có tin, kiểm tra B đã join room và sync `afterSeq`; nếu chỉ call khác mạng lỗi, kiểm tra ICE/TURN thay vì sửa API chat. Ghi một bug gồm cách tái hiện, expected, actual, log đã che secret và commit SHA.

<a id="e-24"></a>

### 24. Docker, HTTPS, Nginx, TURN và CI/CD

<a id="e-24-1"></a>

#### 24.1 Môi trường được giả định

Phần này chọn một phương án cụ thể cho người mới: một VPS Ubuntu có IPv4 public, ba DNS `chat.example.com`, `api.example.com`, `turn.example.com` đều trỏ về VPS; MongoDB Atlas ở ngoài VPS. Nginx và coturn cài trên VPS; backend Node chạy trong Docker Compose; frontend React build thành file tĩnh rồi Nginx phục vụ. Thay mọi `example.com` bằng domain thật của nhóm. Đây là một phương án triển khai, không phải yêu cầu duy nhất của học phần.

**Phân biệt máy:** lệnh có ghi “máy cá nhân” chạy trong VS Code/Git Bash/Terminal của bạn; lệnh có ghi “VPS” chỉ chạy sau khi đã SSH vào Ubuntu. Cần có domain và VPS do nhóm quản lý. Trong trang DNS của nhà cung cấp domain, tạo ba bản ghi **A**: `chat`, `api`, `turn`, cùng trỏ đến IPv4 public của VPS. Từ máy cá nhân chạy `nslookup chat.example.com` (thay domain thật); kết quả phải là IP VPS. Trong trang firewall của nhà cung cấp VPS, cho phép SSH từ IP quản trị và TCP 80/443; ở bước TURN còn cần 3478 UDP/TCP và dải relay UDP đã cấu hình. Đừng thay tên domain trong tài liệu bằng `localhost` khi deploy.

**Vào VPS:** nhà cung cấp VPS cho bạn IP, username và cách đăng nhập (mật khẩu hoặc SSH key). Trên máy cá nhân chạy `ssh TEN_USER@IP_VPS`; nếu dùng key riêng thì chạy `ssh -i DUONG_DAN_KEY TEN_USER@IP_VPS`. Khi dấu nhắc lệnh đổi thành máy Ubuntu, mọi lệnh tiếp theo mới chạy trên VPS. Gõ `exit` để về máy cá nhân. Nếu SSH báo timeout, kiểm tra IP và firewall SSH; nếu báo `Permission denied`, kiểm tra username/key theo nhà cung cấp. Trên VPS, cài Git, Nginx và coturn bằng:

```bash
sudo apt update
sudo apt install -y git nginx coturn curl ca-certificates snapd
git --version
nginx -v
sudo systemctl status nginx
```

`sudo` chạy lệnh với quyền quản trị; `apt` tải gói Ubuntu; `systemctl status` xem dịch vụ đang chạy. Bấm `q` để thoát màn hình status. Nếu Nginx chưa chạy, dùng `sudo systemctl enable --now nginx`. Coturn chỉ cấu hình ở mục 24.4. [Hướng dẫn Nginx](https://nginx.org/en/docs/beginners_guide.html) và [coturn README](https://github.com/coturn/coturn/blob/master/README.turnserver) giúp tra cứu khi tên tùy chọn thay đổi.

**Cài Docker Engine và Compose trên VPS:** bước đầu thêm kho gói Docker theo [hướng dẫn Ubuntu chính thức](https://docs.docker.com/engine/install/ubuntu/). Chạy từng lệnh dưới đây trong Bash trên VPS; khối từ `sudo tee` đến dòng `EOF` là **một lệnh nhiều dòng**, cần dán trọn khối. Không dùng `docker-compose` bản cũ có dấu gạch ngang; tài liệu này dùng `docker compose` plugin.

```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
```

Lệnh trên đăng ký kho chính thức cho đúng mã phiên bản Ubuntu và kiến trúc CPU của VPS. Sau đó cài và kiểm tra:

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
sudo docker --version
sudo docker compose version
sudo docker run hello-world
```

Nếu `apt` báo không tìm thấy `docker-ce`, bạn chưa hoàn thành bước **Set up Docker's apt repository** trong trang Docker; quay lại bước đó thay vì cài một gói tên gần giống. `hello-world` phải in thông báo chạy thành công. Dùng `sudo docker ...` trong toàn bộ bước VPS của tài liệu này; máy cá nhân không cần cài Docker để học các mục 1–23.

**Đưa repository lên VPS:** sau khi code đã có trên GitHub, trên VPS chạy `git clone URL_REPOSITORY_THAT` và `cd btl-chat-onl`. Chạy `git rev-parse HEAD` để ghi commit SHA đang deploy. Mở `nano server/.env.production`, dán các biến môi trường ở đoạn dưới với giá trị thật, lưu bằng **Ctrl+O**, Enter, thoát bằng **Ctrl+X**; chạy `chmod 600 server/.env.production`. Lần sau cập nhật code, vào thư mục repo rồi chạy `git pull` sau khi PR đã merge. Tuyệt đối không đưa file env thật vào Git.

**Trước khi triển khai:** repository đã có `.env.example`, không có `.env` thật trong Git, tài khoản Atlas dành cho production, Atlas Network Access cho IP VPS, và snapshot/backup dữ liệu demo. `server/.env.production` chỉ ở VPS, gồm `NODE_ENV=production`, `PORT=3001`, `CLIENT_ORIGIN=https://chat.example.com`, `MONGODB_URI`, `JWT_SECRET`, `TURN_HOST=turn.example.com`, `TURN_SHARED_SECRET`, `UPLOAD_DIR=/app/uploads`. `client/.env.production` ở lúc build chứa `VITE_API_URL=https://api.example.com`; URL này công khai, không phải secret.

<a id="e-24-2"></a>

#### 24.2 Docker backend và volume upload

Tạo `server/Dockerfile`:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/index.js"]
```

Tạo `deploy/compose.yml`:

```yaml
services:
  api:
    build: ../server
    env_file: ../server/.env.production
    restart: unless-stopped
    ports:
      - "127.0.0.1:3001:3001"
    volumes:
      - uploads:/app/uploads
    healthcheck:
      test:
        [
          "CMD",
          "node",
          "-e",
          "fetch('http://127.0.0.1:3001/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))",
        ]
      interval: 20s
      timeout: 5s
      retries: 3
volumes:
  uploads:
```

`127.0.0.1:3001:3001` khiến API container chỉ nghe từ VPS; Nginx ở cùng máy sẽ chuyển tiếp request. Named volume giữ file sau khi container được thay. `MONGODB_URI` ở Atlas nên Compose không có service MongoDB. Trên VPS, từ thư mục repo chạy `sudo docker compose -f deploy/compose.yml up -d --build`, rồi `sudo docker compose -f deploy/compose.yml ps` và `curl http://127.0.0.1:3001/healthz`. Nếu container unhealthy, xem `sudo docker compose -f deploy/compose.yml logs api`; thường là Atlas chặn IP, env sai hoặc DB index lỗi. Đừng mở port 3001 ra Internet để chữa lỗi Nginx.

<a id="e-24-3"></a>

#### 24.3 Nginx và HTTPS

**Build trên máy cá nhân** ở đúng commit đang deploy, vì máy đó đã có Node/npm từ mục 3.1. Trong thư mục `client`, chạy `npm ci`, `npm run build`; thư mục `dist/` là website tĩnh, không phải mã nguồn để sửa bằng tay. Từ thư mục gốc repository trên máy cá nhân, chạy `scp -r client/dist TEN_USER@IP_VPS:~/btl-chat-onl/client/` để gửi bản build lên VPS (thay username/IP thật, thêm `-i DUONG_DAN_KEY` nếu SSH dùng key riêng). Trên VPS, kiểm tra `ls client/dist` thấy `index.html` và `assets`. Nếu VPS đã có Node LTS tương thích, bạn cũng có thể build ngay trên VPS, nhưng chỉ chọn một cách cho mỗi lần deploy.

Tạo hai Nginx server block HTTP trước, kiểm tra `nginx -t`, sau đó dùng Certbot theo hướng dẫn chính thức để cấp HTTPS và tự sửa block TLS. Phần cấu hình cốt lõi:

```nginx
server {
  listen 80;
  server_name chat.example.com;
  root /var/www/chatcall;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }
}

server {
  listen 80;
  server_name api.example.com;
  location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
  location /socket.io/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_read_timeout 75s;
  }
}
```

`try_files ... /index.html` giúp React SPA mở đường dẫn trực tiếp không 404. Socket.IO cần các header `Upgrade` và `Connection` khi dùng WebSocket. Certbot cần DNS đúng và port 80/443 mở; sau khi cấp cert, kiểm tra `https://chat.example.com` và `https://api.example.com/healthz`. Test làm mới chứng chỉ theo tài liệu Certbot. Nếu dùng hai subdomain cùng site, cookie refresh host-only ở `api.example.com` và `credentials:'include'` từ frontend vẫn hoạt động; CORS chỉ cho `https://chat.example.com`.

Trên VPS, lưu server block thứ nhất vào `deploy/nginx-chat.conf`, block thứ hai vào `deploy/nginx-api.conf`. Sau khi build `client/dist`, chạy từ thư mục gốc repository trên VPS (thay domain trước khi chạy):

```bash
sudo mkdir -p /var/www/chatcall
sudo cp -R client/dist/. /var/www/chatcall/
sudo cp deploy/nginx-chat.conf /etc/nginx/sites-available/chatcall-chat
sudo cp deploy/nginx-api.conf /etc/nginx/sites-available/chatcall-api
sudo ln -s /etc/nginx/sites-available/chatcall-chat /etc/nginx/sites-enabled/chatcall-chat
sudo ln -s /etc/nginx/sites-available/chatcall-api /etc/nginx/sites-enabled/chatcall-api
sudo nginx -t
sudo systemctl reload nginx
```

Nếu symlink đã tồn tại khi deploy lần sau, bỏ qua hai lệnh `ln -s`. **Cài Certbot trên VPS** bằng snap theo [hướng dẫn Certbot cho Nginx](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal): chạy `sudo snap install --classic certbot`, rồi `sudo ln -s /snap/bin/certbot /usr/local/bin/certbot` nếu đường dẫn đó chưa tồn tại; kiểm tra `certbot --version`. Sau đó chạy `sudo certbot --nginx -d chat.example.com -d api.example.com` với domain thật, cung cấp email và chọn chuyển HTTP sang HTTPS khi được hỏi. Cuối cùng chạy `sudo certbot renew --dry-run` để thử gia hạn và mở cả hai URL HTTPS trong trình duyệt. Chỉ chạy khi DNS và Nginx HTTP đã hoạt động, nếu không Certbot không xác minh được domain.

<a id="e-24-4"></a>

#### 24.4 coturn và firewall

Coturn đã được cài bằng `apt` ở mục 24.1. Trong repository, tạo `deploy/turnserver.conf.example` với các ý chính sau. Giữ placeholder trong Git; chỉ trên VPS mới thay bằng một secret ngẫu nhiên dài và dùng **cùng giá trị** ở `server/.env.production`:

```text
listening-port=3478
fingerprint
use-auth-secret
static-auth-secret=THAY_BANG_CUNG_GIA_TRI_TURN_SHARED_SECRET
realm=turn.example.com
min-port=49160
max-port=49200
no-multicast-peers
```

Nếu VPS nằm sau NAT, cấu hình `external-ip` bằng public IP đúng theo tài liệu coturn; nếu VPS có public IP trực tiếp, kiểm tra candidate thực tế trước khi thêm. Mở 3478 UDP/TCP và dải relay 49160–49200 UDP trong cả cloud firewall và firewall OS. Nếu dùng `turns:` trên 5349, phải cấu hình chứng chỉ cho coturn và mở port tương ứng. Secret chỉ nằm trong coturn config và `server/.env.production`, không vào Git. API `/api/ice` ở Phần I phải tạo username/credential bằng cùng secret. Test `relay` như mục 21.3; chỉ thấy API `/api/ice` trả 200 chưa chứng minh TURN chuyển media.

Trên VPS, chép file ví dụ bằng `sudo cp deploy/turnserver.conf.example /etc/turnserver.conf`, mở `sudo nano /etc/turnserver.conf`, thay `THAY_BANG_CUNG_GIA_TRI_TURN_SHARED_SECRET` bằng secret thật, lưu bằng **Ctrl+O**, Enter, **Ctrl+X**. Sau đó chạy `sudo chmod 600 /etc/turnserver.conf`, `sudo systemctl enable --now coturn` và `sudo systemctl restart coturn`. Kiểm tra `sudo systemctl status coturn`; nếu chưa chạy, xem log bằng `sudo journalctl -u coturn -n 50 --no-pager`. Trên một số bản Ubuntu, dịch vụ còn cần bật `TURNSERVER_ENABLED=1` trong `/etc/default/coturn`; kiểm tra file này khi service báo disabled. **Không commit secret thật trong file `.example`**. Mở port trong trang firewall của nhà cung cấp VPS và firewall Ubuntu (nếu đang bật); kiểm tra cổng 3478 bằng `sudo ss -lunpt` rồi thử cuộc gọi ép relay theo mục 21.3, vì cổng mở vẫn chưa chứng minh media đi qua TURN.

<a id="e-24-5"></a>

#### 24.5 CI rồi mới CD

Tạo `.github/workflows/ci.yml` để mọi PR được kiểm tra. Bản tối thiểu:

```yaml
name: ci
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v7
        with:
          node-version: "24"
      - name: Lint and build frontend
        run: cd client && npm ci && npm run lint && npm run build
      - name: Install and check backend
        run: cd server && npm ci && npm run lint && node --check src/index.js && node --check src/models.js && npm test --if-present
```

`npm ci` dùng lockfile đã commit, giúp môi trường CI gần với máy dev. Khi test integration đã có, `npm test --if-present` phải thật sự chạy bộ test; không để nó im lặng như bằng chứng test nếu chưa viết test. Chỉ sau khi CI xanh và người review duyệt PR mới merge vào main. Deploy lần đầu theo runbook thủ công mục 24.2–24.4; khi ổn, tự động hóa việc SSH đến VPS, pull đúng commit SHA, build image và chạy `docker compose up -d --build`, rồi healthcheck và rollback nếu fail. SSH key/domain/env phải nằm trong GitHub Secrets hoặc trên VPS, không hard-code trong workflow. Ghi commit SHA đã deploy trong README/release note để đối chiếu khi bảo vệ.

**Cách dùng GitHub Actions:** sau khi commit `.github/workflows/ci.yml` và push, mở repository trên GitHub, vào tab **Actions**, chọn lần chạy `ci` mới nhất và mở job `check`. Dấu tích xanh nghĩa là các lệnh trong workflow đã chạy xong; dấu X đỏ thì mở đúng bước lỗi để đọc log, sửa code tại máy rồi push commit mới. Trên pull request, xem phần **Checks** và đối chiếu commit SHA với bản đang demo. File workflow là cách **cấu hình** Actions; bạn không phải cài GitHub Actions lên laptop. Nếu tab Actions chưa có run, kiểm tra file có đúng đường dẫn `.github/workflows/ci.yml` và repository đã nhận commit đó.

**Đạt khi:** người ngoài mạng mở URL HTTPS, login/reload/chat/upload được; Socket.IO qua Nginx hoạt động; call qua TURN giữa hai mạng chạy; container restart không mất file; GitHub Actions xanh trên commit đang demo.

<a id="e-25"></a>

### 25. Lịch ghép trong ba tuần cho ba thành viên

Không phải ba người cùng chờ học xong mọi thứ. Dùng [kế hoạch ngày 1–21](#phan-d) làm lịch, và ghép các mục tài liệu này theo cổng kiểm tra sau:

| Mốc        | A: frontend/auth                      | B: data/chat/file                            | C: realtime/call/deploy         | Điều kiện qua mốc                                     |
| ---------- | ------------------------------------- | -------------------------------------------- | ------------------------------- | ----------------------------------------------------- |
| Ngày 1–3   | Phần I, mục 3–7, login/profile cơ bản | Model, auth API, direct chat                 | Socket auth/rooms, Docker local | Hai user login và tạo chat.                           |
| Ngày 4–7   | Inbox, pending/retry, mobile chat     | DB-first, cursor, quyền, test                | Reconnect/sync, logs            | Chat 1-1 đủ tin sau reload/offline.                   |
| Ngày 8–9   | Group UI, profile/search, read/typing | Group owner, unread, upload                  | Presence, ACL Socket            | Ba user chat nhóm và test C bị xóa.                   |
| Ngày 10–14 | Call UI, voice/video buttons, mobile  | Refresh/session, upload security, regression | Signaling, WebRTC LAN           | Voice/video LAN hai chiều, cleanup đúng.              |
| Ngày 15–17 | UX cuối, ảnh mobile                   | DB indexes, security/test                    | HTTPS, Docker, TURN relay       | URL online và relay khác mạng.                        |
| Ngày 18–21 | Viết UI report, diễn tập              | Viết data/test report                        | Viết call/deploy report         | Full regression, PDF 10–20 trang, PR/commit evidence. |

Nếu một mốc không qua, cả nhóm tập trung sửa luồng chặn mốc. Không thêm typing/ảnh đẹp khi chat còn mất tin; không làm upload lớn khi call LAN chưa chạy; không đợi ngày cuối mới cài TURN. Họp 15–20 phút mỗi ngày, cập nhật Trello và ít nhất một PR/review có ý nghĩa cho mỗi người mỗi tuần. Bảng chấm tính tổ chức và commit tổng 30 điểm, nên lưu lịch sử board/PR/commit như lưu bằng chứng kỹ thuật.

<a id="e-26"></a>

### 26. Checklist nộp bài và nguồn chính thức

<a id="e-26-1"></a>

#### 26.1 Bảng đối chiếu trước ngày nộp

| Hạng mục       | Kiểm tra cuối                                                                         | Bằng chứng                     |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------ |
| FE hợp lý 10đ  | Auth, inbox, chat, group, call; loading/empty/error                                   | Ảnh + video demo               |
| FE mobile 5đ   | 360 px và điện thoại thật, keyboard, call controls                                    | Ảnh viewport và máy thật       |
| BE đa dạng 20đ | Auth/refresh, profile/search, direct/group, read/typing/presence, upload, sync, quyền | API collection + test-results  |
| Công nghệ 10đ  | Socket.IO + WebRTC + STUN/TURN + Docker/CI                                            | Sơ đồ, relay candidate và byte |
| Online 5đ      | Domain HTTPS, Nginx, API/Socket/call đều chạy                                         | URL + healthcheck              |
| Báo cáo 10đ    | 10–20 trang, phạm vi thật, sơ đồ, test, giới hạn                                      | PDF                            |
| Bảo vệ 10đ     | Cả ba giải thích được module của mình và luồng chung                                  | Diễn tập Q&A                   |
| Tổ chức 15đ    | Trello, owner, deadline, PR/review                                                    | Board + PR                     |
| Commit 15đ     | Mỗi người commit code hữu ích hằng tuần từ tuần 7                                     | GitHub Insights/commit list    |

README cuối cùng phải có: mô tả sản phẩm, thành viên và phân công, sơ đồ kiến trúc, yêu cầu Node, cách tạo `.env` từ `.env.example`, lệnh chạy local, URL demo, tài khoản test riêng, kịch bản demo, lệnh deploy/rollback, giới hạn đã biết. Báo cáo chỉ mô tả tính năng **đã chạy**; nếu tính năng nào cắt theo mục 8 của kế hoạch ba tuần, sửa lại phạm vi và giải thích lý do. Không gửi mật khẩu tài khoản demo thật trong repository công khai; cung cấp bằng kênh nộp phù hợp của lớp.

<a id="e-26-2"></a>

#### 26.2 Tài liệu gốc để tra cứu khi code

- [React Effects](https://react.dev/learn/synchronizing-with-effects), [Vite Guide](https://vite.dev/guide/) và [Express middleware](https://expressjs.com/en/guide/using-middleware/) cho UI, build và HTTP.
- [Mongoose transactions](https://mongoosejs.com/docs/transactions.html) và [Socket.IO delivery guarantees](https://socket.io/docs/v4/delivery-guarantees/) cho tin nhắn DB-first/reconnect.
- [Socket.IO Rooms](https://socket.io/docs/v4/rooms/) cho quyền room và nhiều tab.
- [Multer README](https://github.com/expressjs/multer) cho upload/limits; cài bản 2.x còn được vá bảo mật.
- [WebRTC Peer Connections](https://webrtc.org/getting-started/peer-connections), [MDN getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) và [coturn README](https://github.com/coturn/coturn/blob/master/README.turnserver) cho media/TURN.
- [Nginx WebSocket proxying](https://nginx.org/en/docs/http/websocket.html), [Docker Compose volumes](https://docs.docker.com/reference/compose-file/volumes/), [Certbot instructions](https://certbot.eff.org/instructions) và [GitHub Actions Node guide](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs) cho deploy/CI.
