# Proje: Kurumsal Tanıtım + Proje Vitrini Sitesi

Mekanik ve tarım alanında faaliyet gösteren bir şirket için kurumsal site. Müşteri, yönetim panelinden (Sanity Studio) yeni proje/iş ekleyebilecek; site bu içeriği otomatik yayınlayacak. Müşteri tasarımı değiştiremez, sadece içerik girer.

## Stack ve Mimari Kararlar

- **Astro** (static output / SSG) — frontend
- **Sanity** — içerik yönetimi, Studio müşteri paneli olarak kullanılacak
- **Cloudflare Pages** — hosting
- **GitHub** — kaynak kod

**Kritik mimari karar: Static build + webhook rebuild.** SSR veya canlı Sanity sorgusu YOK. Müşteri Studio'da içerik yayınladığında Sanity → Cloudflare Pages deploy hook tetiklenir, site birkaç saniyede yeniden build olur. Astro sayfaları sadece build-time'da Sanity'den veri çeker, client tarafında Sanity'e hiç istek atılmaz (CORS/rate-limit/güvenlik yüzeyini tamamen ortadan kaldırır).

Bu kararı değiştirmeden önce (SSR'a geçiş, canlı önizleme vb.) kullanıcıyla teyitleş — proje küçük ölçekli olduğu için bu basit yaklaşım bilinçli tercih edildi.

## Klasör Yapısı

```
apps/web/        → henüz taşınmadı, şu an proje kökünde (src/, astro.config.mjs)
  src/pages/
    index.astro                → Ana Sayfa
    hakkimizda.astro
    [isKoluSlug]/index.astro   → dinamik, her iş kolu için Sanity'den getStaticPaths ile üretilir (Mekanik, Tarım, + yeni eklenenler)
    projeler/[slug].astro      → proje detay (flat, tüm iş kollarında ortak namespace; kendi genel listesi/index'i YOK)
    iletisim.astro
  src/layouts/          → BaseLayout.astro
  src/components/       → henüz yok; ileride layout/ (Header, NavDropdown, Footer) ui/ sections/ projects/ alt klasörleri
  src/lib/              → sanity client, GROQ query'ler (henüz yok, şimdilik mockProjects.js var)
apps/studio/      → henüz kurulmadı (Sanity Studio, ayrı paket, sanity.studio'da host edilecek)
```

Monorepo tooling (pnpm workspace vb.) kasıtlı olarak kullanılmıyor — tek geliştirici, 2 bağımsız paket yeterli.

## Navigasyon (Header) — Mortenson referanslı

Mortenson'ın (mortenson.com) header'ı incelendi: sabit sayıda üst seviye link + onlarca "industry"yi TEK dropdown'a sığdıran bir yapı kullanıyorlar. Bizim ölçeğimize uyarlanmış hali:

- **Sabit linkler:** Ana Sayfa, Hakkımızda, İletişim
- **"İş Kollarımız" (dropdown, tetikleyici, kendi sayfası YOK)** — Mortenson'daki "Industries we serve" ile aynı desen: parent item tıklanamaz/sayfası yok, sadece hover/tıklamada alt menüyü açar. Alt öğeler (Mekanik, Tarım, + gelecekte eklenenler) build-time'da Sanity'deki category listesinden, `order` alanına göre sıralanarak üretilir — her biri kendi `/[isKoluSlug]/` sayfasına gider.
- Genel bir "Projeler" üst-seviye linki YOK (daha önce karar verildiği gibi tüm işleri gösteren tekil bir liste sayfası yok; proje giriş noktası iş kolu sayfaları üzerinden).
- Bu yapı sayesinde iş kolu sayısı 2'den 10'a çıksa bile header'da tek ek öğe (dropdown) var — kod değişmeden yeni iş kolu Studio'da eklenip yayınlanınca nav'a otomatik girer.

## İçerik Modeli (Sanity — henüz kurulmadı, plan)

- **category** (İş Kolu / Faaliyet Alanı): title, slug, description, icon/coverImage, **order** (nav dropdown sıralaması için) — hem header dropdown'ında hem proje kategorisi olarak kullanılır
- **project**: title, slug, category (ref), shortDescription, description (Portable Text), coverImage, gallery, location, projectDate, technicalInfo (key-value array)
- **homePage / aboutPage / contactPage / siteSettings**: singleton dokümanlar, sabit alanlar — genel bir "page builder" YOK (müşteri tasarımı bozmamalı, bu bilinçli bir basitleştirme)

## İş Kolu Sayfası Şablonu (`/[isKoluSlug]/`) — Mortenson referanslı

Mortenson'ın industry sayfalarından (örn. `/industries/data-centers`) uyarlanan, sade tutulmuş bölüm sırası:

1. Hero — iş kolu adı + kısa açıklama
2. Öne çıkan proje (opsiyonel, tek büyük vitrin — v1'de atlanabilir)
3. Proje grid'i (kart: kapak görseli, proje adı, lokasyon) — filtre/pagination YOK, iş kolu başına proje sayısı azken (5-15) gereksiz karmaşıklık

Turner Construction'daki "Find a Project" (lokasyon/sektör/kapsam filtresi + pagination) kasıtlı olarak alınmadı — küçük ölçek için gereksiz, ileride (v2) proje sayısı artarsa değerlendirilebilir.

## Kod Stili ve Kurallar

- Component bazlı, mobile-first
- Yorum yazma — sadece non-obvious bir WHY varsa tek satır
- Gereksiz soyutlama yok: bu bir bug fix/basit proje, "belki lazım olur" kodu yazma
- Görsel optimizasyonu Astro'da değil, Sanity CDN transform parametreleriyle yapılacak (`?w=800&auto=format`)
- İletişim formu: Cloudflare Pages Function + e-posta servisi (Resend vb.) — henüz kurulmadı

## Geliştirme Sırası (4 hafta, hafta sonları)

1. Tasarım yönü, ana sayfa, genel layout, responsive yapı
2. Kurumsal sayfalar, iş kolu sayfa şablonu (`/[isKoluSlug]/`), proje detay tasarımı, iletişim, header dropdown nav — component'ler Sanity şemasıyla birebir eşleşen mock data ile kurulur
3. Sanity CMS: schema, Studio deploy, Astro+Sanity bağlantısı (GROQ), dinamik proje sayfaları, webhook
4. SEO, mobil/performans kontrolleri, formlar, revizyonlar, Cloudflare deploy, domain, yayın

## Dikkat Edilecek Noktalar

- Slug değişirse eski link kırılır → slug değiştiğinde `_redirects`'e yönlendirme eklenmeli
- Sanity write token asla frontend'e sızmamalı (Studio kendi auth'uyla yazar, Astro sadece read client kullanır)
- Webhook URL secret olmalı, repoya girmemeli
