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
  src/pages/            → rotalar (index, hakkimizda, faaliyet-alanlari, projeler/, iletisim)
  src/layouts/          → BaseLayout.astro
  src/components/       → henüz yok; ileride layout/ ui/ sections/ projects/ alt klasörleri
  src/lib/              → sanity client, GROQ query'ler (henüz yok, şimdilik mockProjects.js var)
apps/studio/      → henüz kurulmadı (Sanity Studio, ayrı paket, sanity.studio'da host edilecek)
```

Monorepo tooling (pnpm workspace vb.) kasıtlı olarak kullanılmıyor — tek geliştirici, 2 bağımsız paket yeterli.

## İçerik Modeli (Sanity — henüz kurulmadı, plan)

- **category** (Faaliyet Alanı): title, slug, description, icon/coverImage — hem "Faaliyet Alanları" sayfasında hem proje kategorisi olarak kullanılır
- **project**: title, slug, category (ref), shortDescription, description (Portable Text), coverImage, gallery, location, projectDate, technicalInfo (key-value array)
- **homePage / aboutPage / contactPage / siteSettings**: singleton dokümanlar, sabit alanlar — genel bir "page builder" YOK (müşteri tasarımı bozmamalı, bu bilinçli bir basitleştirme)

## Kod Stili ve Kurallar

- Component bazlı, mobile-first
- Yorum yazma — sadece non-obvious bir WHY varsa tek satır
- Gereksiz soyutlama yok: bu bir bug fix/basit proje, "belki lazım olur" kodu yazma
- Görsel optimizasyonu Astro'da değil, Sanity CDN transform parametreleriyle yapılacak (`?w=800&auto=format`)
- İletişim formu: Cloudflare Pages Function + e-posta servisi (Resend vb.) — henüz kurulmadı

## Geliştirme Sırası (4 hafta, hafta sonları)

1. Tasarım yönü, ana sayfa, genel layout, responsive yapı
2. Kurumsal sayfalar, faaliyet alanları, projeler, proje detay tasarımı, iletişim — component'ler Sanity şemasıyla birebir eşleşen mock data ile kurulur
3. Sanity CMS: schema, Studio deploy, Astro+Sanity bağlantısı (GROQ), dinamik proje sayfaları, webhook
4. SEO, mobil/performans kontrolleri, formlar, revizyonlar, Cloudflare deploy, domain, yayın

## Dikkat Edilecek Noktalar

- Slug değişirse eski link kırılır → slug değiştiğinde `_redirects`'e yönlendirme eklenmeli
- Sanity write token asla frontend'e sızmamalı (Studio kendi auth'uyla yazar, Astro sadece read client kullanır)
- Webhook URL secret olmalı, repoya girmemeli
