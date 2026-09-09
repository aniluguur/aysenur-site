# Frontend tasarımı

Yeni frontend; Mortenson'ın sade gezinme ve asimetrik görsel kompozisyonu, Turner'ın görsel ağırlıklı kartları ve seçilebilir içerik panelleri, Makitek'in sektörel içerik sırası incelenerek oluşturuldu. Özel Astro component'leri ve CSS kullanılır; ek UI veya animasyon kütüphanesi yoktur.

## Yapı

- `src/styles/tokens.css`: renk, font, aralık ve hareket değişkenleri.
- `src/styles/global.css`: ortak tipografi, sayfa düzenleri, butonlar ve erişilebilirlik stilleri.
- `src/components/layout/`: ortak gezinme ve footer.
- `src/components/sections/`: ana sayfa ve ortak içerik bölümleri.
- `src/lib/media.ts`: Sanity CDN görsel URL'leri, geçici görsel seçimi ve tarih gösterimi.
- `src/lib/services.ts`: mekanik ve tarım alanlarının mevcut sabit hizmet metinleri.

Ana sayfa sırası: giriş → yaklaşım/rakam şeridi → hakkımızda kolajı → sektörler → seçilmiş projeler → süreç → neden biz → geçerli içerik varsa müşteri görüşü → iletişim çağrısı.

## Davranış

Menüde Escape ve mobilde odak döngüsü; sektör panelinde ok/Home/End tuşları; projelerde sektör filtresi; seçilmiş projelerde yatay kaydırma ve ileri/geri düğmeleri bulunur. Bölüm girişleri, kullanıcı hareketi azaltmayı tercih etmiyorsa IntersectionObserver ile çalışır. Kaydırma ele geçirilmez. CMS sorguları yalnızca build sırasında yapılır; statik üretim korunur.

## İçerik ve geçici varlıklar

Şirket adı CMS'den gelir; mevcut `Şirket Adı` değiştirilmedi. Geometrik işaret geçici bir tasarım işaretidir. Köşeli parantez içeren örnek istatistikler gösterilmez; yerine sayısal iddia içermeyen yaklaşım metinleri kullanılır. Örnek müşteri referansı yayımlanmaz. CMS'deki Danışmanlık dahil kategoriler otomatik listelenir.

Sanity kapak ve galeri görselleri önceliklidir. Fotoğraf yoksa aşağıdaki temsili görseller kullanılır ve kullanıcıya bu durum etiketle belirtilir. Gerçek proje fotoğrafları Studio'da eklenip site yeniden build edildiğinde yer tutucuların yerini alır. Ana sayfadaki giriş/kolaj fotoğrafları sabittir.

| Yerel dosya | Kaynak |
| --- | --- |
| `public/images/field.jpg` | https://images.unsplash.com/photo-1500382017468-9049fed747ef |
| `public/images/engineering.jpg` | https://images.unsplash.com/photo-1504307651254-35680f356dfd |
| `public/images/planning.jpg` | https://images.unsplash.com/photo-1497366811353-6870744d04b2 |
| `public/images/agriculture.jpg` | https://images.unsplash.com/photo-1625246333195-78d9c38ad449 |
| `public/images/installation.jpg` | https://images.unsplash.com/photo-1581092160562-40aa08e78837 |

Manrope yazı tipleri yerel olarak sunulur. Lisans `public/fonts/OFL.txt` dosyasındadır. Referans sitelerin fotoğrafları, logoları veya kaynak kodu kopyalanmadı.

## İletişim

Cloudflare Function / e-posta servisi kurulmadı. Geçerli CMS e-posta adresi varsa form, kullanıcının e-posta uygulamasında taslak açar; sunucuya form verisi göndermez. Geçerli adres yokken düğme devre dışıdır ve gönderimin henüz açılmadığı belirtilir. Uydurma bir başarı mesajı gösterilmez.

## Yerel kullanım

Kökte `npm run build`, ardından `npm run preview -- --host 127.0.0.1`. Build için mevcut Sanity projesine ağ erişimi gerekir. Otomatik webhook/deploy yapılandırması değiştirilmedi.
