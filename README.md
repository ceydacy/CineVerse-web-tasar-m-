# 🎬 CineVerse

🌐 **Live Demo:** https://ceydacy.github.io/CineVerse-web-tasar-m-/  
📂 **GitHub Repo:** https://github.com/ceydacy/CineVerse-web-tasar-m-

![Status](https://img.shields.io/badge/status-completed-success?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-blue?style=for-the-badge&logo=bootstrap)
![API](https://img.shields.io/badge/API-TVMaze-orange?style=for-the-badge)

---

## 🚀 Proje Hakkında

**CineVerse**, modern web teknolojileri kullanılarak geliştirilmiş bir film ve dizi keşif platformudur.  
Kullanıcılar içerikleri keşfedebilir, arama yapabilir, favorilere ekleyebilir ve arayüzü kişiselleştirebilir.

Bu proje, frontend geliştirme becerilerini geliştirmek amacıyla hazırlanmış olup tamamen **API tabanlı dinamik bir web uygulamasıdır**.

---

## 🎯 Proje Amacı

Bu projenin amacı:

- Fetch API kullanımı öğrenmek  
- Async / Await yapısını uygulamak  
- DOM manipulation pratiği yapmak  
- Event listener mantığını geliştirmek  
- LocalStorage ile veri kalıcılığı sağlamak  
- Responsive UI geliştirme deneyimi kazanmak  

---

## 👩‍💻 Geliştirici Bilgileri

- **Geliştirici:** Ceyda Çay  
- **Ders:** Web Tasarım Ödevi  
- **Platform:** Üniversite Projesi  

---

## ✨ Özellikler

- 🎥 TVMaze API üzerinden film/dizi listeleme  
- 🔍 Canlı arama (live search)  
- ➕ Film ekleme (local CRUD simülasyonu)  
- ✏️ Film güncelleme  
- ❌ Film silme  
- ❤️ Favorilere ekleme sistemi  
- 🌙 Dark / Light mode desteği  
- 💾 LocalStorage ile kalıcı veri saklama  
- ⏳ Loading spinner animasyonu  
- 🔔 Toast bildirim sistemi  
- 📱 Fully responsive tasarım  

---

## 🛠️ Kullanılan Teknolojiler

- HTML5  
- CSS3  
- Bootstrap 5  
- JavaScript (ES6+)  
- Fetch API  
- Async / Await  
- LocalStorage  

---

## 📡 API Kullanımı

Bu projede TVMaze public API kullanılmıştır:

👉 https://api.tvmaze.com/shows

---

## 🧠 Mimari Notlar

TVMaze API **read-only** bir servis olduğu için backend işlemleri desteklemez.  
Bu nedenle:

- CRUD işlemleri local `movies` dizisi üzerinde simüle edilmiştir  
- UI güncellemeleri DOM üzerinden anlık yapılmıştır  
- Favoriler ve tema seçimi LocalStorage ile saklanmıştır  
- Tüm yapı frontend odaklıdır  

---


## 💻 Örnek Kod

```javascript
async function getMovies() {
  loading.style.display = "block";

  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();

    movies = data.slice(0, 60);
    displayMovies(movies);

  } catch (error) {
    showToast("API bağlantı hatası");
    console.error(error);

  } finally {
    loading.style.display = "none";
  }
}
