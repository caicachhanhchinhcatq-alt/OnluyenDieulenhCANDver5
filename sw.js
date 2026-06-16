const CACHE_NAME = 'dieulenh-cand-v1';
const assets = [
  'index.html',
  'questions.js',
  'QR.png',
  'icon.png',
  'manifest.json'
];

// Cài đặt Service Worker và lưu trữ các file cốt lõi
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Kích hoạt và dọn dẹp cache cũ nếu có cập nhật
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Phản hồi yêu cầu mạng (Ưu tiên lấy từ mạng, lỗi mạng sẽ lấy từ bộ nhớ cache)
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});