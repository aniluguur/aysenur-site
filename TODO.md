# Yapılacaklar

- [x] Mekanik ve Tarım sayfaları oluşturuldu (`/mekanik/`, `/tarim/`) — `[isKoluSlug]/index.astro`, kategoriye göre filtrelenmiş proje grid'i ile
- [ ] İletişim formu / e-posta gönderim yapısı araştırılacak (kullanıcı kendisi araştıracak, sonra karar verilecek)
  - Planlanan yapı: Cloudflare Pages Function + Resend ile e-posta gönderimi
  - Resend ücretsiz plan: günde 100 / ayda 3.000 e-posta, 1 özel domain doğrulama hakkı — bizim kullanım için yeterli görünüyor
  - Karar bekleniyor: bu yapıyla mı devam, yoksa araştırma sonrası başka bir servis mi tercih edilecek
- [x] Sanity CMS kuruldu — Studio (`studio/`, https://aysenur-site.sanity.studio), şemalar, Astro bağlantısı, mock veri gerçek Sanity dokümanına aktarıldı
- [ ] Astro sürümü güncellenmeli (4.16 → 7.x) — `npm audit` kritik güvenlik açıkları buldu (RCE, XSS, auth bypass). Breaking change olabilir, dikkatli test gerekir.
- [ ] Otomatik deploy (webhook) konusu — şu an Cloudflare Pages "Direct Upload" modunda, Sanity webhook'u otomatik rebuild tetikleyemiyor. Müşteri kendi başına içerik girmeye başlayınca çözülmeli (Git entegrasyonuna geçmek gibi).
- [ ] Studio'ya müşteri erişimi — müşterinin kendi Sanity hesabıyla giriş yapıp içerik düzenleyebilmesi için projeye üye olarak eklenmesi gerekiyor
- [ ] 404 sayfası yapılacak — Sanity'de proje/sektör silindiğinde otomatik yönlendirme olmuyor, kırık link yerine düzgün bir "sayfa bulunamadı" sayfası (Ana Sayfa/Sektörler linkleriyle) gösterilmeli
