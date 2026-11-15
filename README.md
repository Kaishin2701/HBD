# Một vũ trụ nhỏ dành cho Tợp

Website sinh nhật Lê Như Hoài (Katie / Tợp), ngày 15.11.2026.

## Chạy trên máy

Yêu cầu Node.js. Không cần cài thư viện.

```sh
npm start
```

Mở http://localhost:5173. Có thể mở trực tiếp `index.html` để xem trang mà không chạy server.

## Nội dung

- `index.html`: bố cục trang.
- `styles.css`: giao diện và hiệu ứng 3D bằng CSS.
- `app.js`: toàn bộ lời chúc VI / EN, tương tác, ngôi sao với phép chiếu phối cảnh, album và nhạc music box tổng hợp bằng Web Audio.
- `effects.js` và `animations.css`: màn mở phong thư, ba cảnh phẩm chất, thư hiện từng đoạn, bánh có nến, album quỹ đạo 3D, sao băng và pháo bông Canvas.
- `photos.js`: danh sách 57 ảnh gốc trong `image/`.

Nhạc chỉ phát sau khi nhấn nút âm thanh. Ảnh mở được bằng chạm, chuyển bằng phím mũi tên hoặc vuốt; Escape để đóng. Trang hỗ trợ thiết lập giảm chuyển động của hệ điều hành. Phông chữ tải từ Google Fonts; khi không có mạng trang dùng phông dự phòng.

Màn mở đầu có lựa chọn mở cùng âm nhạc hoặc mở không nhạc. Chạm bánh hoặc ngôi sao để thổi nến và xem màn pháo bông khoảng 11 giây (hoa nở, vòng sao, liễu rủ, trái tim). Có thể bỏ qua, bắn lại, hoặc thắp lại nến. Nút giảm hiệu ứng và thiết lập hệ điều hành tắt chuyển động; album và lời chúc vẫn dùng được. Pháo bông dừng khi chuyển sang tab khác.

Để đưa lên hosting tĩnh, tải lên `index.html`, `styles.css`, `animations.css`, `app.js`, `effects.js`, `photos.js` và thư mục `image/`, giữ nguyên cấu trúc. Không cần tải `server.cjs` hay `package.json` lên hosting tĩnh.
