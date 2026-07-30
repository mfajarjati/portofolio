"use strict";

/*===========================================================
  PAGE LOADER
===========================================================*/

(function initPageLoader() {
  const loader = document.getElementById("pageLoader");
  const bar = document.getElementById("loaderProgressBar");
  if (!loader || !bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 90) { clearInterval(interval); progress = 90; }
    bar.style.width = progress + "%";
  }, 120);

  window.addEventListener("load", () => {
    clearInterval(interval);
    bar.style.width = "100%";
    setTimeout(() => {
      loader.classList.add("hidden");
      loader.setAttribute("aria-hidden", "true");
    }, 350);
  });
})();

/*===========================================================
  UTILITY
===========================================================*/

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/*===========================================================
  SIDEBAR
===========================================================*/

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
    const isExpanded = sidebar.classList.contains("active");
    sidebarBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  });
}

/*===========================================================
  TESTIMONIALS MODAL
  (kept for backwards compat; testimonials section is commented out in HTML)
===========================================================*/

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const titleEl = this.querySelector("[data-testimonials-title]");
    const textEl = this.querySelector("[data-testimonials-text]");

    if (avatar && modalImg) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
    }
    if (titleEl && modalTitle) modalTitle.innerHTML = titleEl.innerHTML;
    if (textEl && modalText) modalText.innerHTML = textEl.innerHTML;

    testimonialsModalFunc();
  });
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

/*===========================================================
  CUSTOM SELECT (Filter dropdown for mobile)
===========================================================*/

const select = document.querySelector("[data-select]");
// NOTE: fixed typo from data-selecct-value -> data-select-value (HTML updated too)
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
    const isExpanded = this.classList.contains("active");
    this.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  });
}

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) {
      select.classList.remove("active");
      select.setAttribute("aria-expanded", "false");
    }
    filterFunc(selectedValue);
    syncActiveFilterButton(selectedValue);
  });
}

/*===========================================================
  FILTER / PAGINATION (Projects)
===========================================================*/

const filterItems = document.querySelectorAll("[data-filter-item]");
const projectPagination = document.querySelector("[data-project-pagination]");
const projectsSection = document.querySelector(".projects");
const certificatesSection = document.querySelector(".certificates");

const PROJECTS_PER_PAGE = 9;
let currentProjectFilter = "all";
let currentProjectPage = 1;

const normalizeFilterValue = function (value) {
  return String(value || "")
    .toLowerCase()
    .trim();
};

const scrollToSectionTop = function (sectionElement) {
  if (!sectionElement) return;
  const targetTop =
    sectionElement.getBoundingClientRect().top + window.scrollY - 20;
  window.scrollTo({ top: targetTop, behavior: "smooth" });
};

const getFilteredProjectItems = function (selectedValue) {
  const normalizedValue = normalizeFilterValue(selectedValue);
  return Array.from(filterItems).filter((item) => {
    if (normalizedValue === "all") return true;
    return item.dataset.category === normalizedValue;
  });
};

const renderPaginationButtons = function (
  container,
  totalPages,
  currentPage,
  onPageChange
) {
  if (!container) return;

  container.innerHTML = "";

  if (totalPages <= 1) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";

  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement("button");
    pageButton.type = "button";
    pageButton.className = "pagination-btn";
    pageButton.textContent = page;

    if (page === currentPage) {
      pageButton.classList.add("active");
      pageButton.setAttribute("aria-current", "page");
    }

    pageButton.addEventListener("click", function () {
      onPageChange(page);
    });

    container.appendChild(pageButton);
  }
};

const syncActiveFilterButton = function (selectedValue) {
  const normalizedValue = normalizeFilterValue(selectedValue);

  for (let i = 0; i < filterBtn.length; i++) {
    const buttonValue = normalizeFilterValue(filterBtn[i].innerText);

    if (buttonValue === normalizedValue) {
      lastClickedBtn.classList.remove("active");
      filterBtn[i].classList.add("active");
      lastClickedBtn = filterBtn[i];
      break;
    }
  }
};

const renderProjectPage = function (selectedValue, page = 1) {
  currentProjectFilter = normalizeFilterValue(selectedValue);

  const matchedItems = getFilteredProjectItems(currentProjectFilter);
  const totalPages = Math.max(
    1,
    Math.ceil(matchedItems.length / PROJECTS_PER_PAGE)
  );

  currentProjectPage = Math.min(Math.max(page, 1), totalPages);

  for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].classList.remove("active");
  }

  const startIndex = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;

  matchedItems.slice(startIndex, endIndex).forEach((item) => {
    item.classList.add("active");
  });

  renderPaginationButtons(
    projectPagination,
    totalPages,
    currentProjectPage,
    function (nextPage) {
      renderProjectPage(currentProjectFilter, nextPage);
      scrollToSectionTop(projectsSection);
    }
  );
};

const filterFunc = function (selectedValue) {
  renderProjectPage(selectedValue, 1);
};

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    syncActiveFilterButton(selectedValue);
  });
}

/*===========================================================
  CERTIFICATES PAGINATION
===========================================================*/

const certificateItems = document.querySelectorAll(".certificate-card");
const certificatePagination = document.querySelector(
  "[data-certificate-pagination]"
);
const CERTIFICATES_PER_PAGE = 9;
let currentCertificatePage = 1;

const renderCertificatePage = function (page = 1) {
  const totalPages = Math.max(
    1,
    Math.ceil(certificateItems.length / CERTIFICATES_PER_PAGE)
  );

  currentCertificatePage = Math.min(Math.max(page, 1), totalPages);

  for (let i = 0; i < certificateItems.length; i++) {
    certificateItems[i].style.display = "none";
  }

  const startIndex = (currentCertificatePage - 1) * CERTIFICATES_PER_PAGE;
  const endIndex = startIndex + CERTIFICATES_PER_PAGE;

  Array.from(certificateItems)
    .slice(startIndex, endIndex)
    .forEach((item) => {
      item.style.display = "block";
    });

  renderPaginationButtons(
    certificatePagination,
    totalPages,
    currentCertificatePage,
    function (nextPage) {
      renderCertificatePage(nextPage);
      scrollToSectionTop(certificatesSection);
    }
  );
};

// Initialize pagination state
renderProjectPage("all", 1);
renderCertificatePage(1);

/*===========================================================
  CONTACT FORM
===========================================================*/

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute("disabled");
    } else {
      if (formBtn) formBtn.setAttribute("disabled", "");
    }
  });
}

/*===========================================================
  PAGE NAVIGATION
===========================================================*/

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const asideEl = document.querySelector("[data-sidebar]");

// On load: show About page and sidebar by default
window.addEventListener("load", () => {
  const aboutPage = document.querySelector('[data-page="about"]');
  if (aboutPage) aboutPage.classList.add("active");

  const sidebarEl = document.querySelector("[data-sidebar]");
  if (sidebarEl) sidebarEl.classList.add("show");
});

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedText = this.innerHTML.toLowerCase().trim();

    if (clickedText !== "home") {
      if (asideEl) asideEl.classList.add("show");
    } else {
      if (asideEl) asideEl.classList.remove("show");
    }

    // Activate matching page and nav link by data-page attribute
    for (let j = 0; j < pages.length; j++) {
      const pageMatch = pages[j].dataset.page === clickedText;

      if (pageMatch) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Sync active class on nav links
    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k] === this) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }
  });
}

/*===========================================================
  IMAGE PREVIEW MODAL
===========================================================*/

const imagePreviewModal = document.getElementById("imagePreviewModal");
const previewModalImg = document.getElementById("previewModalImg");
const previewModalCaption = document.getElementById("previewModalCaption");
const closePreviewModalBtn = document.getElementById("closePreviewModal");

let isPreviewOpen = false;

function openImagePreview(src, caption) {
  if (!imagePreviewModal || !previewModalImg) return;

  previewModalImg.src = src;
  previewModalImg.alt = caption || "";
  if (previewModalCaption) previewModalCaption.textContent = caption || "";

  imagePreviewModal.classList.add("active");
  imagePreviewModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  isPreviewOpen = true;

  // Focus the close button for keyboard users
  if (closePreviewModalBtn) {
    setTimeout(() => closePreviewModalBtn.focus(), 50);
  }
}

function closeImagePreview() {
  if (!imagePreviewModal) return;
  imagePreviewModal.classList.remove("active");
  imagePreviewModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  isPreviewOpen = false;

  // Return focus to last trigger if available
  if (lastPreviewTrigger) {
    lastPreviewTrigger.focus();
    lastPreviewTrigger = null;
  }
}

let lastPreviewTrigger = null;

// Close button click
if (closePreviewModalBtn) {
  closePreviewModalBtn.addEventListener("click", closeImagePreview);
}

// Click outside image to close
if (imagePreviewModal) {
  imagePreviewModal.addEventListener("click", function (e) {
    if (e.target === imagePreviewModal || e.target === previewModalImg) {
      closeImagePreview();
    }
  });
}

/*===========================================================
  PORTFOLIO DATA
===========================================================*/

const portfolioData = {
  fjdigitalsolutions: {
  title: "FJ Digital Solution - Company Profile & Digital Agency Website",
  image: "./assets/images/project-17.png",
  description:
    "Website company profile modern yang dikembangkan untuk FJ Digital Solution sebagai media branding dan pemasaran layanan pengembangan website, aplikasi, serta solusi Artificial Intelligence. Platform ini dirancang dengan pendekatan SEO, performa tinggi, dan desain responsif untuk meningkatkan kredibilitas bisnis sekaligus menghasilkan prospek pelanggan melalui landing page, artikel, portofolio, dan formulir konsultasi.",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Mantine UI",
    "Supabase",
    "PostgreSQL",
    "React Hook Form",
    "Zod",
    "EmailJS",
    "Framer Motion",
    "Google Analytics",
    "Google Search Console",
  ],
  highlights: [
    "Mengembangkan website company profile modern menggunakan Next.js dengan performa tinggi dan SEO-friendly.",
    "Mengembangkan halaman portofolio dinamis untuk menampilkan berbagai proyek yang telah dikerjakan.",
    "Membangun sistem artikel/blog sebagai strategi Content Marketing dan Search Engine Optimization (SEO).",
    "Mengoptimalkan struktur metadata, sitemap, Open Graph, dan Schema Markup untuk meningkatkan visibilitas mesin pencari.",
    "Mengoptimalkan performa website melalui lazy loading, image optimization, code splitting, dan server-side rendering.",
    "Mengintegrasikan Google Analytics dan Google Search Console untuk memantau performa website.",
  ],
  myRole: "Full Stack Web Developer & UI/UX Designer",
  duration: "1 bulan (Juli 2026)",
  challenges: [
    "Merancang struktur website yang mampu meningkatkan kredibilitas bisnis sekaligus mendukung strategi digital marketing.",
    "Mengoptimalkan SEO teknis agar seluruh halaman mudah diindeks oleh mesin pencari.",
    "Menjaga konsistensi tampilan pada desktop, tablet, dan perangkat mobile.",
    "Mengembangkan halaman artikel yang SEO-friendly dengan struktur heading dan metadata yang optimal.",
    "Mengoptimalkan struktur informasi agar pengunjung lebih mudah memahami layanan perusahaan.",
  ],
  outcome: [
    "Berhasil membangun website company profile modern yang merepresentasikan identitas dan layanan FJ Digital Solutions.",
    "Mendukung strategi digital marketing melalui implementasi blog dan optimasi Search Engine Optimization (SEO).",
    "Menghasilkan website yang cepat, responsif, dan memiliki pengalaman pengguna yang optimal.",
    "Mempermudah calon pelanggan dalam melihat portofolio, layanan, serta menghubungi perusahaan.",
    "Menerapkan praktik terbaik pengembangan web modern menggunakan Next.js, TypeScript, dan React.",
  ],
  links: [
    {
      url: "https://fjdigitalsolution.vercel.app",
      text: "Live Website",
    },

  ],
  documentation: [
    "./assets/images/fjdigital/home.png",
    "./assets/images/fjdigital/portfolio.png",
    "./assets/images/fjdigital/articles.png",
    "./assets/images/fjdigital/article-detail.png",
    "./assets/images/fjdigital/packages.png",
    "./assets/images/fjdigital/about.png",
    "./assets/images/fjdigital/contact.png",

  ],
},
  afterschola: {
  title: "AfterSchola LMS - Learning Management System",
  image: "./assets/images/project-16.png",
  description:
    "Platform Learning Management System (LMS) berbasis web yang dikembangkan selama program magang di AfterSchola untuk mendukung proses pembelajaran digital bagi siswa, sekolah, instruktur, dan administrator. Sistem ini menyediakan marketplace kursus, pembelajaran online, gamifikasi, manajemen tugas, penilaian, serta dashboard terintegrasi untuk setiap peran pengguna. Platform dirancang agar sekolah dapat mengelola siswanya secara terpusat, instruktur dapat membuat dan mengelola materi pembelajaran, sedangkan administrator dapat mengelola seluruh operasional platform mulai dari pengguna, kursus, hingga transaksi keuangan.",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Mantine UI",
    "Prisma",
    "Supabase",
    "PostgreSQL",
    "Socket.IO",
    "React Hook Form",
    "Zod",
    "Axios",
    "Xendit"
  ],
  highlights: [
    "Mengembangkan Learning Management System (LMS) dengan empat role utama yaitu Siswa, Sekolah, Instruktur, dan Administrator.",
    "Membangun marketplace kursus sehingga siswa dapat membeli, mengakses, dan mengikuti pembelajaran secara mandiri.",
    "Mengembangkan fitur manajemen sekolah sehingga sekolah dapat membeli kursus dan mendistribusikannya kepada seluruh siswa yang terdaftar.",
    "Mengembangkan dashboard administrator untuk mengelola pengguna, kursus, transaksi keuangan, dan aktivitas platform.",
    "Mengimplementasikan sistem gamifikasi berupa poin, leaderboard, achievement, dan mini games untuk meningkatkan keterlibatan belajar siswa.",
    "Mengembangkan antarmuka yang responsif menggunakan Mantine UI dan Tailwind CSS sehingga optimal di desktop maupun perangkat mobile."
  ],
  myRole: "Full Stack Web Developer",
  duration: "4 bulan (September 2025 - Desember 2025)",
  challenges: [
    "Merancang arsitektur sistem multi-role dengan hak akses dan dashboard yang berbeda untuk setiap jenis pengguna.",
    "Mengembangkan alur pembelian kursus baik oleh siswa secara individu maupun oleh sekolah untuk seluruh siswanya.",
    "Mengoptimalkan struktur database relasional menggunakan Prisma ORM dan Supabase PostgreSQL.",
    "Mengimplementasikan autentikasi, manajemen sesi, dan role-based access control pada seluruh modul aplikasi.",
    "Mengembangkan sinkronisasi aktivitas dan notifikasi pembelajaran secara real-time menggunakan Socket.IO.",
    "Membangun komponen frontend yang reusable agar pengembangan lebih mudah dipelihara dan dikembangkan.",
    "Mengimplementasikan validasi form dinamis menggunakan React Hook Form dan Zod.",
  ],
  outcome: [
    "Berhasil mengembangkan Learning Management System (LMS) berskala enterprise dengan empat role pengguna yang saling terintegrasi.",
    "Mendigitalisasi seluruh proses pembelajaran mulai dari pembuatan kursus, pembelian, pembelajaran, penugasan, hingga penilaian.",
    "Meningkatkan keterlibatan siswa melalui implementasi gamifikasi berupa poin, leaderboard, achievement, dan mini games.",
    "Mempermudah sekolah dalam mengelola distribusi akses kursus kepada seluruh siswa secara terpusat.",
    "Membantu instruktur mengelola materi pembelajaran, tugas, nilai, dan perkembangan belajar siswa melalui satu dashboard.",
    "Memberikan administrator kontrol penuh terhadap pengguna, kursus, transaksi keuangan, serta aktivitas platform.",
  ],
  links: [
    {
      url: "https://lms-afterschola.vercel.app",
     text: "Live Website",
    },
  ],
  documentation: [
    "./assets/images/afterschola/landing.png",
    "./assets/images/afterschola/login.png",
    "./assets/images/afterschola/student-dashboard.png",
    "./assets/images/afterschola/course-marketplace.png",
    "./assets/images/afterschola/course-learning.png",
    "./assets/images/afterschola/leaderboard.png",
    "./assets/images/afterschola/game.png",
    "./assets/images/afterschola/discussions.png",
    "./assets/images/afterschola/instructor-dashboard.png",
    "./assets/images/afterschola/course-editor.png",
    "./assets/images/afterschola/assignment-management.png",
    "./assets/images/afterschola/admin-dashboard.png",
    "./assets/images/afterschola/user-management.png",
    "./assets/images/afterschola/finance-dashboard.png",
  ],
},
bookara: {
  title: "Bookara - Sistem Manajemen Buku Berbasis Web",
  image: "./assets/images/project-18.png",
  description:
    "Bookara merupakan platform Full Stack berbasis web yang dikembangkan untuk membantu penerbit, perpustakaan, maupun tim editorial dalam mengelola data buku, penulis, dan penerbit secara terpusat. Sistem ini menyediakan dashboard modern dengan autentikasi JWT, pengelolaan katalog buku, pencarian cepat, filter data, ekspor laporan, serta RESTful API yang aman untuk mendukung operasional penerbitan secara lebih efisien.",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "PHP",
    "PostgreSQL",
    "Mantine UI",
    "Axios",
    "JWT Authentication",
    "REST API",
    "Docker",
    "Nginx",
  ],
  highlights: [
    "Mengembangkan aplikasi Full Stack menggunakan Next.js dan Laravel REST API.",
    "Mengimplementasikan autentikasi berbasis JWT untuk login, logout, dan manajemen sesi pengguna.",
    "Membangun fitur CRUD untuk data Buku, Penulis, dan Penerbit dengan validasi data yang lengkap.",
    "Mengimplementasikan fitur pencarian, filter, sorting, dan pagination agar pengelolaan data lebih efisien.",
    "Membangun RESTful API menggunakan Laravel sebagai backend aplikasi.",
    "Mengembangkan antarmuka responsif menggunakan Mantine UI dan React.",
    "Mengintegrasikan PostgreSQL sebagai database relasional dengan struktur data yang optimal.",
    "Mendukung deployment menggunakan Docker, Docker Compose, dan Nginx Reverse Proxy.",
  ],
  myRole: "Full Stack Web Developer",
  duration: "1 bulan (Maret 2026)",
  challenges: [
    "Merancang arsitektur Full Stack yang memisahkan frontend Next.js dan backend Laravel REST API.",
    "Mengimplementasikan autentikasi JWT yang aman beserta pengelolaan token dan sesi pengguna.",
    "Mengoptimalkan relasi database PostgreSQL antara buku, penulis, dan penerbit.",
    "Mengembangkan API yang reusable dan mudah diintegrasikan dengan frontend.",
    "Mengimplementasikan validasi form pada sisi frontend dan backend untuk menjaga integritas data.",
    "Mengonfigurasi Docker dan Nginx agar proses deployment lebih mudah dan konsisten.",
  ],
  outcome: [
    "Berhasil mengembangkan platform manajemen buku berbasis web dengan arsitektur Full Stack modern.",
    "Menyederhanakan proses pengelolaan data buku, penulis, dan penerbit dalam satu dashboard terintegrasi.",
    "Meningkatkan efisiensi pencarian dan pengelolaan katalog melalui fitur filter, sorting, dan pagination.",
    "Menyediakan proses deployment yang lebih mudah menggunakan Docker dan Nginx.",
    "Menghasilkan sistem yang siap digunakan sebagai solusi digital bagi penerbit, perpustakaan, maupun organisasi yang mengelola katalog buku.",
  ],
  links: [
    {
      url: "https://github.com/mfajarjati/bookara",
      text: "GitHub",
    },
  ],
  documentation: [
    "./assets/images/bookara/landing.png",
    "./assets/images/bookara/login.png",
    "./assets/images/bookara/dashboard.png",
    "./assets/images/bookara/books.png",
    "./assets/images/bookara/authors.png",
    "./assets/images/bookara/publishers.png",
    "./assets/images/bookara/dashboard-api.png",
    "./assets/images/bookara/api-login.png",
    "./assets/images/bookara/api-books.png",
        "./assets/images/bookara/api-authors.png",
  ],
},
pajakpb1: {
  title: "PB1 Tax - Sistem Manajemen Pajak Daerah Berbasis Web",
  image: "./assets/images/project-19.png",
  description:
    "PB1 Tax merupakan platform manajemen pajak daerah berbasis web yang dikembangkan untuk mendigitalisasi proses pelaporan, perhitungan, verifikasi, dan pembayaran pajak daerah. Sistem ini menyediakan tiga portal utama, yaitu Wajib Pajak, Admin Pemerintah Daerah, dan Superadmin, sehingga seluruh proses administrasi pajak dapat dilakukan secara terpusat, transparan, dan efisien. Platform mendukung pelaporan pendapatan harian, perhitungan pajak otomatis, monitoring pembayaran, verifikasi dokumen usaha, serta pengelolaan data wajib pajak dan instansi pemerintah daerah dalam satu sistem terintegrasi.",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Mantine UI",
    "Laravel",
    "PHP",
    "PostgreSQL",
    "REST API",
    "JWT Authentication",
    "Axios",
    "Recharts",
  ],
  highlights: [
    "Mengembangkan portal Wajib Pajak untuk pelaporan pendapatan harian, monitoring tagihan, dan pembayaran pajak daerah.",
    "Membangun dashboard Admin Pemerintah Daerah untuk memantau pendapatan, laporan pajak, serta proses verifikasi wajib pajak.",
    "Mengembangkan sistem pelaporan pendapatan harian yang secara otomatis menghasilkan rekap pajak bulanan.",
    "Mengembangkan sistem monitoring status pembayaran pajak beserta histori transaksi setiap periode.",
    "Mengimplementasikan pencarian, filter, pagination, dan manajemen data untuk meningkatkan efisiensi administrasi.",
    "Mengembangkan antarmuka responsif sehingga sistem dapat digunakan dengan optimal pada desktop maupun perangkat mobile.",
  ],
  myRole: "Full Stack Web Developer",
  duration: "3 bulan (Agustus 2025 - Oktober 2026)",
  challenges: [
    "Merancang arsitektur sistem multi-role dengan hak akses berbeda untuk Wajib Pajak, Admin Pemerintah Daerah, dan Superadmin.",
    "Mengembangkan mekanisme perhitungan pajak otomatis berdasarkan laporan pendapatan harian wajib pajak.",
    "Mengimplementasikan Role-Based Access Control (RBAC) agar setiap pengguna hanya dapat mengakses modul sesuai kewenangannya.",
    "Mengoptimalkan struktur database relasional untuk mengelola data wajib pajak, instansi pemerintah, laporan pendapatan, dan pembayaran pajak.",
    "Mengoptimalkan performa aplikasi melalui lazy loading, pagination, dan optimasi rendering data dalam jumlah besar.",
    "Mengintegrasikan frontend dan backend melalui REST API yang aman dan mudah dikembangkan.",
  ],
  outcome: [
    "Berhasil membangun sistem manajemen pajak daerah berbasis web dengan tiga portal utama yang saling terintegrasi.",
    "Mendigitalisasi proses pelaporan pendapatan, perhitungan pajak, verifikasi, dan monitoring pembayaran dalam satu platform.",
    "Mempermudah wajib pajak dalam melaporkan pendapatan harian dan memantau kewajiban pajaknya secara mandiri.",
    "Membantu Admin Pemerintah Daerah memonitor kepatuhan wajib pajak melalui dashboard analitik yang terpusat.",
    "Meningkatkan transparansi administrasi pajak melalui sistem monitoring status verifikasi dan pembayaran secara real-time.",
  ],
  links: [
    {
      url: "https://pajak-app.vercel.app",
     text: "Live Website",
    },
  ],
  documentation: [
    "./assets/images/pb1-tax/landing.png",
    "./assets/images/pb1-tax/login.png",
    "./assets/images/pb1-tax/dashboard-user.png",
    "./assets/images/pb1-tax/entri-user.png",
    "./assets/images/pb1-tax/report-user.png",
    "./assets/images/pb1-tax/activity-user.png",
    "./assets/images/pb1-tax/dashboard-admin.png",
    "./assets/images/pb1-tax/businesses-admin.png",
    "./assets/images/pb1-tax/revenues-admin.png",
    "./assets/images/pb1-tax/revenuesdetail-admin.png",
     "./assets/images/pb1-tax/reports-admin.png",
     "./assets/images/pb1-tax/submissions-admin.png",
  ],
},
bkadventure: {
  title: "BK Adventure - Platform Booking Paralayang & Paramotor",
  image: "./assets/images/project-20.png",
  description:
    "BK Adventure merupakan platform berbasis web yang dikembangkan untuk PT Sekti Teknologi Globalindo sebagai media promosi sekaligus sistem reservasi layanan paralayang dan paramotor di berbagai destinasi wisata Indonesia, seperti Golo Mori, Nusa Penida, dan Kota Batu. Platform ini memungkinkan pelanggan melihat informasi destinasi, memilih aktivitas, melakukan booking, pembayaran, serta memperoleh informasi layanan melalui antarmuka modern yang responsif. Website telah di-deploy menggunakan domain .com dan dioptimalkan untuk performa, SEO, serta pengalaman pengguna yang optimal.",
  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Mantine UI",
    "Supabase",
    "PostgreSQL",
    "React Hook Form",
    "Zod",
    "Axios",
    "Framer Motion",
    "Xendit",
    "Google Maps",
  ],
  highlights: [
    "Mengembangkan platform booking paralayang dan paramotor berbasis web menggunakan Next.js.",
    "Membangun landing page modern yang menampilkan informasi layanan, destinasi, aktivitas, dan profil perusahaan.",
    "Mengintegrasikan sistem pembayaran online untuk mempermudah proses transaksi pelanggan.",
    "Membangun halaman galeri, testimoni, FAQ, serta informasi destinasi wisata secara interaktif.",
    "Mengimplementasikan autentikasi pengguna dan penyimpanan data menggunakan Supabase.",
    "Mengoptimalkan performa website melalui image optimization, lazy loading, dan Server-Side Rendering (SSR).",
    "Melakukan deployment website ke domain production (.com) sehingga siap digunakan oleh pelanggan.",
  ],
  myRole: "Full Stack Web Developer",
  duration: "2 bulan (November 2025 - Desember 2025)",
  challenges: [
    "Merancang alur reservasi wisata mulai dari pemilihan aktivitas, jadwal, hingga pembayaran.",
    "Mengembangkan sistem booking yang mampu mengelola data pelanggan dan reservasi secara terpusat.",
    "Mengoptimalkan struktur database untuk data pelanggan, destinasi, aktivitas, dan transaksi.",
    "Mengoptimalkan performa website melalui lazy loading, image optimization, dan code splitting.",
    "Mengimplementasikan validasi form menggunakan React Hook Form dan Zod.",
    "Mengintegrasikan layanan pembayaran online ke dalam proses reservasi.",
  ],
  outcome: [
    "Berhasil mengembangkan platform reservasi paralayang dan paramotor yang modern dan mudah digunakan.",
    "Mempermudah pelanggan dalam melihat informasi destinasi, melakukan booking, dan menyelesaikan pembayaran secara online.",
    "Membantu perusahaan mengelola data pelanggan, reservasi, dan aktivitas wisata secara terpusat.",
    "Menghasilkan website yang responsif, cepat, dan SEO-friendly menggunakan teknologi web modern.",
    "Berhasil melakukan deployment website ke domain production sehingga siap digunakan oleh pelanggan.",
  ],
  links: [
    {
      url: "https://www.paraglidingindonesia.com",
      text: "Live Website",
    },
  ],
  documentation: [
    "./assets/images/bkadventure/landing.png",
    "./assets/images/bkadventure/login.png",
    "./assets/images/bkadventure/register.png",
    "./assets/images/bkadventure/dashboard.png",
    "./assets/images/bkadventure/booking.png",
    "./assets/images/bkadventure/booking-detail.png",
    "./assets/images/bkadventure/history.png",
        "./assets/images/bkadventure/profile.png",
  ],
},
  cleanclass: {
    title: "CleanClass - Classroom Management System",
    image: "./assets/images/project-1.jpg",
    description:
      "Web-based classroom management system untuk mengatur jadwal piket dan monitoring kebersihan kelas. Sistem ini memungkinkan guru dan siswa untuk mengatur jadwal piket, melacak kehadiran, dan memberikan penilaian.",
    technologies: ["Laravel", "MySQL", "Bootstrap", "JavaScript", "HTML/CSS"],
    highlights: [
      "Implementasi UI/UX design yang user-friendly menggunakan Bootstrap 5",
      "Pengembangan cookie-based authentication system untuk multiple user roles",
      "Mengembangkan fitur setuju/terima untuk jadwal piket dan penilaian",
      "Implementasi responsive design untuk berbagai ukuran device",
      "Pengembangan CRUD system untuk manajemen data siswa dan guru",
    ],
    myRole: "Frontend Developer",
    duration: "3 bulan (Februari 2024 - April 2024)",
    challenges: [
      "Optimisasi performa loading page dengan lazy loading dan code splitting",
      "Implementasi state management untuk data realtime dari backend",
      "Membuat UI yang konsisten untuk multiple user roles (siswa, guru, admin)",
      "Mengelola form validation yang kompleks untuk input jadwal dan penilaian",
      "Handling multiple user sessions dan data privacy",
    ],
    outcome: [
      "Diperkirakan dapat pengurangan waktu pengelolaan jadwal piket sebesar 70%",
      "Mengurangi loading time halaman sebesar 40% melalui optimisasi frontend",
      "UI yang user-friendly dengan 90% positive feedback dari hasil testing",
      "100% data privacy dan security compliance",
      "Mencapai 98% responsive design compatibility across devices",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/cleanclass",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/cleanclass/dashboard-siswa.png",
      "./assets/images/cleanclass/dashboard-guru.png",
      "./assets/images/cleanclass/leaderboard-siswa.png",
      "./assets/images/cleanclass/leaderboard-guru.png",
      "./assets/images/cleanclass/jadwal-siswa.png",
      "./assets/images/cleanclass/jadwal-guru.png",
      "./assets/images/cleanclass/berita-siswa.png",
      "./assets/images/cleanclass/berita-guru.png",
      "./assets/images/cleanclass/laporan-siswa.png",
      "./assets/images/cleanclass/laporan-guru.png",
    ],
  },
  kidstrackr: {
    title: "Kids Trackr - Child Development Monitoring",
    image: "./assets/images/project-2.png",
    description:
      "Aplikasi mobile untuk memantau perkembangan anak di sekolah menggunakan Flutter yang berhasil menjadi Finalis LIDM (Lomba Inovasi Digital Mahasiswa) 2024. disini bertugas dalam pengambilan data dari REST API PHP, menampilkan informasi real-time tentang aktivitas, nilai, dan laporan perkembangan anak. Aplikasi ini telah diuji dan diimplementasikan di SD Lab School UPI Cibiru.",
    technologies: ["Flutter", "Dart", "REST API", "PHP"],
    highlights: [
      "Finalis Lomba Inovasi Digital Mahasiswa 2024 kategori Inovasi Teknologi Digital Pendidikan",
      "Integrasi chatbot dengan data untuk interaksi real-time",
      "Pengembangan fitur monitoring real-time untuk guru dan orang tua",
      "Implementasi sistem pelaporan perkembangan anak berbasis AI dan data",
      "Integrasi dengan REST API PHP untuk data management",
    ],
    myRole: "Flutter Frontend Developer, UI/UX Designer & AI Engineer",
    duration: "4 bulan (Januari 2024 - April 2024)",
    challenges: [
      "Menyesuaikan UI/UX dengan kebutuhan sistem pelaporan perkembangan anak di sekolah",
      "Mengembangkan fitur chatbot untuk interaksi real-time dengan orang tua mengenai perkembangan anak",
      "Implementasi AI untuk analisis hasil refleksi perkembangan anak berbasis data",
      "Integrasi dengan sistem akademik yang sudah ada di sekolah",
      "Pengembangan fitur yang user-friendly untuk guru dan orang tua serta anak",
    ],
    outcome: [
      "Finalis Top 20 Lomba Inovasi Digital Mahasiswa 2024 dari 250+ tim peserta",
      "Uji coba sukses di SD Lab School UPI Cibiru dengan 50+ pengguna aktif",
      "95% tingkat kepuasan dari guru dan orang tua dalam survey pengguna",
      "Pengurangan waktu pelaporan perkembangan siswa sebesar 70%",
      "tercapainya 90% akurasi AI dalam analisis perkembangan anak",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/kids-trackr",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/kidstrackr/started.png",
      "./assets/images/kidstrackr/dashboard-ortu.png",
      "./assets/images/kidstrackr/nilai-ortu.png",
      "./assets/images/kidstrackr/jadwal-ortu.png",
      "./assets/images/kidstrackr/nilaidetail-ortu.png",
      "./assets/images/kidstrackr/chat-ortu.png",
      "./assets/images/kidstrackr/berita-ortu.png",
      "./assets/images/kidstrackr/gizi-ortu.png",
      "./assets/images/kidstrackr/dashboard-anak.png",
      "./assets/images/kidstrackr/belajar-anak.png",
      "./assets/images/kidstrackr/dashboard-guru.png",
      "./assets/images/kidstrackr/datasiswa-guru.png",
      "./assets/images/kidstrackr/nilaidetail-guru.png",
      "./assets/images/kidstrackr/chatbot.png",
    ],
  },
  skinsenseai: {
    title: "SkinSenseAI - Skin Disease Detection",
    image: "./assets/images/project-3.png",
    description:
      "Aplikasi mobile untuk deteksi penyakit kulit menggunakan AI yang berhasil meraih Juara 3 di Kompetisi AI NOVAC 2024. Menggunakan TensorFlow untuk implementasi model AI di Flutter, dengan akurasi deteksi mencapai 89% untuk 10 jenis penyakit kulit umum.",
    technologies: [
      "Flutter",
      "TensorFlow",
      "Python",
      "Firebase",
      "REST API",
      "Flask",
    ],
    highlights: [
      "Juara 3 Kompetisi AI NOVAC 2024 kategori Kesehatan dan Makhluk Hidup",
      "Implementasi chatbot untuk konsultasi penyakit kulit",
      "Pengembangan UI/UX untuk kemudahan pengambilan foto kulit",
      "Integrasi Firebase untuk autentikasi dan penyimpanan data",
      "Implementasi custom camera interface untuk hasil foto optimal",
    ],
    myRole: "Flutter Frontend Developer",
    duration: "2 bulan (September - Oktober 2024)",
    challenges: [
      "Optimisasi model AI untuk performa real-time di mobile device",
      "Implementasi preprocessing gambar untuk akurasi deteksi",
      "Pengembangan UI yang intuitif untuk pengguna",
      "Manajemen state kompleks untuk proses scanning dan hasil",
      "Pengembangan chatbot untuk konsultasi penyakit kulit real-time",
    ],
    outcome: [
      "Juara 3 dari 100+ tim di Kompetisi AI NOVAC 2024",
      "Akurasi deteksi 89% untuk 10 jenis penyakit kulit",
      "chatbot konsultasi 24/7 dengan respon < 5 detik",
      "Proses deteksi < 5 detik per scan",
      "File size optimasi 60% dengan image preprocessing",
    ],
    links: [],
    documentation: [
      "./assets/images/skinsenseai/started.png",
      "./assets/images/skinsenseai/login.png",
      "./assets/images/skinsenseai/home.png",
      "./assets/images/skinsenseai/scanning.png",
      "./assets/images/skinsenseai/hasil.png",
      "./assets/images/skinsenseai/chatbot.png",
      "./assets/images/skinsenseai/history.png",
      "./assets/images/skinsenseai/profile.png",
    ],
  },
  pokemondataset: {
    title: "Pokemon Dataset Analysis - Dibimbing.id Project",
    image: "./assets/images/project-4.png",
    description:
      "Analisis komprehensif dataset Pokemon sebagai bagian dari pelatihan Data Science di Dibimbing.id. Proyek ini fokus pada analisis karakteristik yang membedakan Pokemon Legendary dan non-Legendary menggunakan teknik data visualization dan statistical analysis.",
    technologies: [
      "Python",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Jupyter Notebook",
    ],
    highlights: [
      "Sertifikasi Data Science dari Dibimbing.id",
      "Implementasi EDA (Exploratory Data Analysis)",
      "Pengembangan visualisasi data interaktif",
      "Analisis statistik untuk klasifikasi Pokemon",
      "Penghapusan outliers dan data preprocessing",
    ],
    myRole: "Data Analyst",
    duration: "1 bulan (Maret 2024)",
    challenges: [
      "Handling missing values dalam dataset",
      "Optimisasi visualisasi untuk dataset kompleks",
      "Penyelesaian data cleaning untuk data yang tidak konsisten",
      "Interpretasi hasil analisis untuk non-technical audience",
      "Implementasi berbagai teknik statistical testing",
    ],
    outcome: [
      "Penganalisisan 700+ data Pokemon dengan 10+ features",
      "Identifikasi 5 feature penting pembeda Pokemon",
      "Visualisasi data yang digunakan dalam documentation Dibimbing.id",
      "Project Sertifikasi Award dalam kelas Data Science",
      "Publikasi analisis di Linkedin dengan 100+ views",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/pokemon_analysis",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/pokemon/dataset.PNG",
      "./assets/images/pokemon/kekosongan.PNG",
      "./assets/images/pokemon/info.PNG",
      "./assets/images/pokemon/grafik1.PNG",
      "./assets/images/pokemon/grafik2.PNG",
      "./assets/images/pokemon/dataset.PNG",
      "./assets/images/pokemon/kekosongan.PNG",
      "./assets/images/pokemon/info.PNG",
      "./assets/images/pokemon/grafik1.PNG",
      "./assets/images/pokemon/grafik2.PNG",
      "./assets/images/pokemon/grafik3.png",
    ],
  },
  sirem: {
    title: "SIREM - Sistem Informasi Rencana Pembelajaran",
    image: "./assets/images/project-5.png",
    description:
      "Platform berbasis web untuk identifikasi dini gangguan belajar dan perencanaan pembelajaran menggunakan Laravel. Sistem ini membantu dosen dan tenaga pendidik dalam mendeteksi potensi gangguan belajar (disleksia, disgrafia, diskalkulia, ADHD) serta memberikan rekomendasi rencana pembelajaran yang sesuai.",
    technologies: ["Laravel", "Bootstrap", "jQuery", "MySQL", "Chart.js"],
    highlights: [
      "Implementasi dashboard analytics dengan Chart.js untuk visualisasi data gangguan belajar",
      "Pengembangan form dinamis untuk asesmen gangguan belajar",
      "Integrasi fitur export PDF untuk laporan diagnostik",
      "Implementasi real-time search dan filter data peserta didik",
      "Pengembangan UI/UX yang user-friendly untuk guru dan tenaga pendidik",
    ],
    myRole: "Frontend Developer",
    duration: "1 bulan (Agustus 2024)",
    challenges: [
      "Optimisasi performa rendering komponen dinamis",
      "Implementasi form wizard untuk proses asesmen bertahap",
      "Pengembangan UI yang accessible untuk berbagai pengguna",
      "Integrasi multiple filter dan advanced search",
      "Handling concurrent form submissions dari multiple users",
    ],
    outcome: [
      "Adopsi oleh 30+ guru di Sekolah Dasar lab School UPI cibiru",
      "Pengurangan waktu asesmen gangguan belajar sebesar 60%",
      "Peningkatan early detection rate hingga 75%",
      "Feedback positif 85% dari pengguna guru",
      "Implementasi sukses di 1 sekolah dasar",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/sirem",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/sirem/landing.png",
      "./assets/images/sirem/dashboard.png",
      "./assets/images/sirem/tes1.png",
      "./assets/images/sirem/tes2.png",
      "./assets/images/sirem/tes.png",
      "./assets/images/sirem/Hasil.png",
      "./assets/images/sirem/Hasil.png",
    ],
  },
  amazonprimeanalysis: {
    title: "Amazon Prime Analysis - RevoU Final Project",
    image: "./assets/images/project-6.png",
    description:
      "Proyek ini bertujuan untuk menganalisis konten film dan televisi yang tersedia di Amazon Prime Video berdasarkan metadata yang mencakup informasi seperti judul, sutradara, pemeran, negara asal, tahun rilis, durasi, rating, genre, dan tanggal penambahan ke platform. Dengan memanfaatkan dataset yang ada informasi ini, analisis dilakukan untuk mengungkap pola dan tren utama dalam perkembangan konten.",
    technologies: ["Google spreadsheet", "Tableu", "Looker Studio"],
    highlights: [
      "Final Project Award di RevoU Data Analytics Program",
      "Implementasi data cleaning dan preprocessing di Google Spreadsheet",
      "Pengembangan dashboard interaktif di Tableau dan Looker Studio",
      "Analisis trend konten film dan televisi di Amazon Prime Video",
      "Forecasting penjualan menggunakan time series analysis",
    ],
    myRole: "Data Analyst",
    duration: "2 bulan (Januari 2024 - Februari 2024)",
    challenges: [
      "Data cleaning untuk 9k+ records penjualan",
      "Optimisasi performa dashboard untuk data large-scale",
      "Implementasi automated reporting system",
      "Integrasi multiple data sources",
      "Visualisasi complex metrics di Tableau dan Looker Studio",
    ],
    outcome: [
      "Identificasi potential revenue increase 25%",
      "Optimisasi inventory reducing costs 15%",
      "Dashboard adoption rate 90% oleh stakeholders",
      "Accuracy 85% dalam sales forecasting",
      "Presentasi findings ke 50+ audience",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/amazon-analysis",
        text: "GitHub Repository",
      },
      {
        url: "https://lookerstudio.google.com/reporting/266dbcf4-becb-4836-8213-2e5f7f49bb5c/page/qgR",
        text: "View Dashboard",
      },
    ],
    documentation: [
      "./assets/images/amazon/dashboard.jpg",
      "./assets/images/amazon/dataset.PNG",
      "./assets/images/amazon/filter.PNG",
      "./assets/images/amazon/grafik1.PNG",
      "./assets/images/amazon/grafik2.PNG",
      "./assets/images/amazon/dataset.PNG",
      "./assets/images/amazon/filter.PNG",
      "./assets/images/amazon/grafik1.PNG",
      "./assets/images/amazon/grafik2.PNG",
    ],
  },
  socialnetworkanalysis: {
    title: "Social Network Analysis using Graph Theory",
    image: "./assets/images/project-7.png",
    description:
      "Project analisis jejaring sosial menggunakan teori graf untuk menganalisis pola interaksi dan penyebaran informasi di media sosial. Menggunakan R dan library igraph untuk menganalisis struktur jaringan, mengidentifikasi influencers, dan memetakan komunitas dalam jaringan sosial.",
    technologies: ["R", "igraph", "ggplot", "tidyverse", "RStudio", "Gephi"],
    highlights: [
      "Implementasi algoritma centrality measures (Degree, Betweenness, Eigenvector)",
      "Visualisasi interaktif jaringan menggunakan ggplot",
      "Analisis komunitas dengan algoritma Louvain dan Girvan-Newman",
      "Development custom metrics untuk analisis jaringan",
      "Integrasi dengan Twitter API untuk pengumpulan data",
    ],
    myRole: "Data Analyst & Network Researcher",
    duration: "2 bulan (Mei 2023 - Juni 2023)",
    challenges: [
      "Optimisasi performa untuk analisis large-scale networks (>1k nodes)",
      "Implementasi efficient graph algorithms untuk big data",
      "Handling data streaming dari social media yaitu Twitter API",
      "Visualisasi complex network patterns secara efektif",
      "Interpretasi metrics centrality untuk business insights",
    ],
    outcome: [
      "Identifikasi 100+ key pengaruh dalam jaringan sosial",
      "Pemetaan 5+ komunitas dalam jaringan",
      "Diperkirakan dapat meningkatkan engagement rate 40% melalui targeted marketing",
      "Dapat optimisasi strategi promosi dengan 70% cost reduction",
      "Presentasi findings ke 50+ audience",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/SNA-Analysis",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/sna/data1.png",
      "./assets/images/sna/data2.png",
      "./assets/images/sna/graf.png",
    ],
  },
  rockpaperscissorsclassification: {
    title: "Rock Paper Scissors Classification - Dicoding Project",
    image: "./assets/images/project-8.png",
    description:
      "Proyek klasifikasi gambar untuk mendeteksi gestur tangan batu, gunting, kertas menggunakan Deep Learning. Implementasi menggunakan TensorFlow dan Convolutional Neural Network (CNN) untuk mencapai akurasi tinggi dalam klasifikasi real-time.",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "NumPy",
      "Matplotlib",
      "Google Colab",
      "streamlit",
    ],
    highlights: [
      "Sertifikasi Machine Learning dari Dicoding Indonesia",
      "Implementasi CNN dengan arsitektur custom untuk klasifikasi gambar",
      "Data augmentation untuk meningkatkan performa model",
      "Optimisasi model untuk real-time inference",
      "Deployment model menggunakan Streamlit",
    ],
    myRole: "Machine Learning Engineer",
    duration: "1 bulan (Desember 2023)",
    challenges: [
      "Preprocessing dataset untuk menangani variasi pencahayaan dan sudut",
      "Optimisasi arsitektur model untuk performa real-time",
      "Mengatasi overfitting dengan teknik regularisasi",
      "Implementasi data augmentation yang efektif",
      "Model deployment untuk penggunaan web-based",
    ],
    outcome: [
      "Accuracy 94% pada test dataset",
      "Real-time inference < 100ms per frame",
      "Deployment sukses di web platform",
      "Project Sertifikat Award di kelas Belajar Machine Learning",
      "Model size optimization hingga < 10MB",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/mageClassificationRockPaperScissors",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/rps/dataset.PNG",
      "./assets/images/rps/training.PNG",
      "./assets/images/rps/augmentasi.PNG",
      "./assets/images/rps/hasil.PNG",
      "./assets/images/rps/hasil2.PNG",
    ],
  },

  vehicleclassification: {
    title: "Vehicle Type Classification using YOLOv11 - BISA.AI Project",
    image: "./assets/images/project-10.png",
    description:
      "Sistem klasifikasi dan deteksi kendaraan (mobil dan motor) menggunakan YOLOv11 yang dikembangkan sebagai project akhir pelatihan AI di BISA.AI. Sistem ini mampu mendeteksi dan mengklasifikasikan kendaraan secara real-time dengan tingkat akurasi tinggi.",
    technologies: [
      "Python",
      "YOLOv11",
      "PyTorch",
      "OpenCV",
      "TensorFlow",
      "CUDA",
      "Streamlit",
    ],
    highlights: [
      "Sertifikasi AI Engineer dari BISA.AI",
      "Implementasi YOLOv11 untuk deteksi multi-class kendaraan",
      "Pengembangan model dengan custom dataset CCTV jalan raya",
      "Real-time detection dengan processing < 30ms per frame",
      "Integrasi dengan web interface menggunakan Streamlit",
    ],
    myRole: "Machine Learning Engineer",
    duration: "1 bulan (November 2024)",
    challenges: [
      "Pengumpulan dan anotasi dataset kendaraan dari CCTV",
      "Optimisasi model untuk real-time detection pada CPU",
      "Handling variasi pencahayaan dan kondisi cuaca",
      "Peningkatan akurasi untuk kendaraan dengan oklusi parsial",
      "Implementasi tracking untuk menghitung jumlah kendaraan",
    ],
    outcome: [
      "Akurasi deteksi 94% untuk mobil",
      "Akurasi deteksi 96% untuk motor",
      "Processing time < 30ms pada GPU NVIDIA RTX 3060",
      "Best Project Award di kelas AI BISA.AI",
      "Dataset kontribusi 1000+ gambar kendaraan terklasifikasi",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/object-detection-kendaraan-mobil-dan-motor",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/vehicle/train.PNG",
      "./assets/images/vehicle/trainloss.png",
      "./assets/images/vehicle/confusion.png",
      "./assets/images/vehicle/hasil.jpg",
    ],
  },
  wasteclassification: {
    title: "Trash Transform - Waste Classification System",
    image: "./assets/images/project-9.png",
    description:
      "Sistem klasifikasi sampah otomatis menggunakan YOLOv11 untuk mendeteksi dan mengkategorikan jenis sampah (Organik, Anorganik, B3) secara real-time. Implementasi deep learning melalui IOT dengan Mengintegrasikan hardware untuk mendukung pengelolaan sampah yang efektif dan membantu edukasi masyarakat tentang pemilahan sampah yang benar.",
    technologies: [
      "Python",
      "YOLOv11",
      "PyTorch",
      "OpenCV",
      "CUDA",
      "TensorFlow",
      "Google Collab",
    ],
    highlights: [
      "Implementasi YOLOv11 untuk deteksi multi-class sampah",
      "Integrasi IoT dengan AI untuk klasifikasi real-time",
      "Real-time detection dengan processing < 50ms per frame",
      "Integrasi dengan web interface menggunakan React js",
      "Sistem poin otomatis berdasarkan jenis sampah",
    ],
    myRole: "Machine Learning Engineer & Data Scientist",
    duration: "3 bulan (November 2024 - Januari 2025)",
    challenges: [
      "Pengumpulan dan labeling dataset sampah yang beragam",
      "Integrasi hardware dengan AI model untuk real-time detection",
      "Handling variasi pencahayaan dan sudut pengambilan gambar",
      "Sistem pemberian poin yang akurat berdasarkan jenis sampah",
      "Implementasi augmentasi data untuk improve model robustness",
    ],
    outcome: [
      "Akurasi klasifikasi 96% untuk semua jenis sampah",
      "Processing time <50ms per item",
      "Successful integration dengan sistem reward",
      "Dataset kontribusi 1000+ gambar sampah terklasifikasi",
      "Meningkatkan kesadaran masyarakat tentang pemilahan sampah",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/wasteclassification",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/waste/training.PNG",
      "./assets/images/waste/training1.PNG",
      "./assets/images/waste/hasil1.png",
      "./assets/images/waste/hasil2.png",
      "./assets/images/waste/hasil3.jpg",
      "./assets/images/waste/hasil4.jpg",
    ],
  },
  trashtransformwebsite: {
    title: "Trash Transform - Admin Dashboard & Landing Page",
    image: "./assets/images/project-11.png",
    description:
      "Platform web admin dan landing page untuk sistem pengelolaan sampah berbasis poin. Menggunakan Next.js untuk dashboard admin yang powerful dan landing page yang menarik untuk promosi layanan.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Firebase",
      "REST API",
    ],
    highlights: [
      "Pengembangan dashboard admin untuk monitoring transaksi dan pengelolaan data",
      "Landing page interaktif untuk promosi layanan dan edukasi masyarakat",
      "Integrasi dengan sistem IoT dan mobile app",
      "Real-time monitoring system menggunakan Firebase",
      "Analytics dashboard untuk tracking performa bisnis",
    ],
    myRole: "Full Stack Developer",
    duration: "3 bulan (November 2024 - Januari 2025)",
    challenges: [
      "Implementasi real-time data synchronization",
      "Optimisasi performa dashboard dengan large dataset",
      "Integrasi multiple sistem (IoT, Mobile, AI)",
      "Pengembangan UI/UX yang intuitif untuk admin",
      "Implementasi secure authentication system",
    ],
    outcome: [
      "Pengembangan dashboard yang berhasil mengelola 10+ transaksi per hari",
      "Peningkatan efisiensi pengelolaan data sampai 60%",
      "Implementasi sistem analitik untuk monitoring 5+ metrik bisnis",
      "Berhasil mengintegrasikan 3 sistem berbeda (IoT, Mobile, Web)",
      "Feedback positif 90% dari tim dosen dan mahasiswa dalam penggunaan dashboard",
    ],
    links: [
      {
        url: "https://trash-transform.vercel.app",
        text: "Live Website",
      },
    ],
    documentation: [
      "./assets/images/trashtransformweb/landing.png",
      "./assets/images/trashtransformweb/dashboard.png",
      "./assets/images/trashtransformweb/pengguna.png",
      "./assets/images/trashtransformweb/lokasi.png",
      "./assets/images/trashtransformweb/mitra.png",
      "./assets/images/trashtransformweb/laporan.png",
      "./assets/images/trashtransformweb/transaksi.png",
      "./assets/images/trashtransformweb/admin.png",
      "./assets/images/trashtransformweb/ujicoba.png",
    ],
  },

  trashtransformmobile: {
    title: "Trash Transform - Mobile Application",
    image: "./assets/images/project-12.png",
    description:
      "Aplikasi mobile untuk pengguna sistem pengelolaan sampah berbasis poin. Memungkinkan pengguna untuk memantau poin, melacak riwayat transaksi, dan menukarkan poin dengan uang digital.",
    technologies: ["Flutter", "Dart", "Firebase", "REST API", "Maps API"],
    highlights: [
      "Sistem tukar uang berbasis poin untuk mendorong partisipasi",
      "Integrasi dengan IoT device untuk tracking sampah",
      "Fitur maps untuk lokasi tempat pembuangan",
      "Real-time monitoring system yang user-friendly",
      "In-app rewards system untuk meningkatkan engagement",
    ],
    myRole: "Mobile Developer",
    duration: "3 bulan (November 2024 - Januari 2025)",
    challenges: [
      "Integrasi dengan hardware IoT",
      "Implementasi sistem tracking real-time",
      "Optimisasi performa aplikasi untuk multiple devices",
      "state management yang kompleks untuk data realtime",
      "Handling offline mode dan data synchronization",
    ],
    outcome: [
      "Pengembangan sistem reward point berhasil",
      "Integrasi berhasil dengan perangkat IoT untuk tracking point",
      "Implementasi fitur maps sesuai rencana dan data",
      "Sistem penukaran rewards menjadi uang berjalan lancar",
      "Pengembangan selesai sesuai timeline dan waktu",
    ],
    links: [],
    documentation: [
      "./assets/images/trashtransformmobile/home.png",
      "./assets/images/trashtransformmobile/history.png",
      "./assets/images/trashtransformmobile/tukar.png",
      "./assets/images/trashtransformmobile/lokasi.png",
      "./assets/images/trashtransformmobile/jenis.png",
      "./assets/images/trashtransformmobile/idea.png",
      "./assets/images/trashtransformmobile/profile.png",
    ],
  },

  steganografilsb: {
    title: "Steganografi LSB - Image Message Encryption",
    image: "./assets/images/project-13.png",
    description:
      "Aplikasi mobile untuk menyembunyikan pesan terenkripsi Caesar Cipher dalam gambar menggunakan teknik steganografi LSB (Least Significant Bit). Aplikasi ini memungkinkan pengguna untuk menyisipkan pesan rahasia ke dalam gambar dengan aman dan mengekstraknya kembali.",
    technologies: [
      "Flutter",
      "Dart",
      "Image Processing",
      "Cryptography",
      "Steganography",
      "File Handling",
    ],
    highlights: [
      "Implementasi algoritma Caesar Cipher untuk enkripsi pesan",
      "Penggunaan teknik LSB untuk menyembunyikan pesan dalam gambar",
      "Fitur pemilihan dan manipulasi gambar",
      "Interface user-friendly untuk proses enkripsi dan dekripsi",
      "Sistem keamanan berlapis (enkripsi + steganografi)",
    ],
    myRole: "Mobile Developer & Cryptography Engineer",
    duration: "2 bulan (Februari 2024 - Maret 2024)",
    challenges: [
      "Implementasi algoritma LSB yang efisien",
      "Optimisasi proses encoding/decoding gambar",
      "Handling berbagai format gambar dan ukuran file",
      "Memastikan kualitas gambar tetap terjaga setelah steganografi",
      "Pengembangan UI yang intuitif untuk proses kompleks",
    ],
    outcome: [
      "Berhasil mengimplementasi steganografi LSB dengan minimal distorsi gambar",
      "Enkripsi Caesar Cipher bekerja dengan akurasi 100%",
      "Aplikasi dapat menangani gambar hingga 10MB",
      "Proses encoding/decoding < 3 detik per gambar",
      "UI yang user-friendly dengan rating kepuasan pengguna 90%",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/stegocrypt",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/steganografi/home.png",
      "./assets/images/steganografi/encrpyt.png",
      "./assets/images/steganografi/encrpyt-hasil.png",
      "./assets/images/steganografi/decrpyt.png",
      "./assets/images/steganografi/decrpyt-hasil.png",
    ],
  },
  harganahotelwebsite: {
    title: "Hargana Hotel - Intelligent Hotel Price Analytics Website",
    image: "./assets/images/project-14.png",
    description:
      "Website interaktif berbasis Next.js yang dirancang untuk menampilkan data dan analitik prediksi harga hotel secara real-time. Platform ini memungkinkan pengguna untuk mengeksplorasi harga hotel, grafik tren, analisis selisih prediksi-akurat, dan ulasan hotel yang diolah dengan sentimen analysis.",
    technologies: [
      "Next.js",
      "TailwindCSS",
      "Mantine UI",
      "Recharts",
      "Firebase (Hosting & Database)",
    ],
    highlights: [
      "Pengembangan UI modern dengan framework Mantine UI dan TailwindCSS yang responsif",
      "Integrasi model Machine Learning ke dalam frontend melalui API untuk prediksi harga hotel",
      "Visualisasi grafik harga dan selisih prediksi-akurat menggunakan Recharts",
      "Implementasi sistem pencarian data hotel berdasarkan lokasi pengguna",
      "Tampilan detail hotel lengkap dengan hasil analisis sentimen dari ulasan pengguna",
    ],
    myRole: "Full Stack Web Developer",
    duration: "6 bulan (Februari 2025 – Juli 2025)",
    challenges: [
      "Integrasi model ML ke frontend dengan menggunakan API endpoint untuk membaca hasil model Python yang diekspor, memastikan kompatibilitas data antar platform",
      "Optimisasi performa frontend dengan menerapkan lazy loading dan dynamic import pada grafik dan komponen berat lainnya",
      "Desain UI yang kompleks dengan pendekatan atomic design dan konsistensi UI pada berbagai resolusi device",
      "Pengelolaan state dan reaktivitas dengan memanfaatkan React hook dan context untuk sinkronisasi data dan interaksi user",
      "Penanganan data real-time dengan integrasi dengan Firebase Realtime Database untuk penyimpanan dan pembaruan data hotel",
    ],
    outcome: [
      "Mempermudah pengguna untuk membandingkan harga hotel aktual dengan hasil prediksi",
      "Membantu pemilik hotel memahami tren dan insight dari data harga dan ulasan",
      "Desain UI memperoleh feedback positif dari pengguna awal dengan rating user experience > 90%",
      "Website berjalan stabil dengan > 95% uptime dan loading time < 2.5 detik",
    ],
    links: [
      {
        url: "https://harganahotel.vercel.app",
        text: "Link website",
      },
    ],
    loginInfo: ["Email: muhammad.fajarjati@gmail.com", "Password: 12345678"],
    documentation: [
      "./assets/images/harganahotelwebsite/home.png",
      "./assets/images/harganahotelwebsite/login.png",
      "./assets/images/harganahotelwebsite/register.png",
      "./assets/images/harganahotelwebsite/dashboard.png",
      "./assets/images/harganahotelwebsite/lokasi.png",
      "./assets/images/harganahotelwebsite/pilih.png",
      "./assets/images/harganahotelwebsite/tambahan.png",
      "./assets/images/harganahotelwebsite/model.png",
      "./assets/images/harganahotelwebsite/progress.png",
      "./assets/images/harganahotelwebsite/chart.png",
      "./assets/images/harganahotelwebsite/sentimen.png",
    ],
  },
  harganahotelmachinelearning: {
    title:
      "Hargana Hotel - Machine Learning Model for Hotel Price Prediction & Review Sentiment Analysis",
    image: "./assets/images/project-15.png",
    description:
      "Riset dan pengembangan sistem prediksi harga hotel berbasis machine learning menggunakan data real dari situs pemesanan hotel. Fokus utama adalah membangun model yang mampu memprediksi harga hotel secara akurat serta menganalisis ulasan pengguna melalui pendekatan analisis sentimen.",
    technologies: [
      "Python (Pandas, Scikit-learn, XGBoost, LightGBM)",
      "TextBlob (untuk analisis sentimen)",
      "Google Hotel Data & Booking Platforms",
      "Jupyter Notebook",
      "Matplotlib & Seaborn (untuk visualisasi analisis)",
    ],
    highlights: [
      "Scraping data harga hotel dan ulasan pengguna selama 3 bulan dari Google Hotel dan beberapa situs pemesanan langsung",
      "Penyesuaian preprocessing agar semua jenis kamar disamakan, dan fitur difokuskan pada harga, kategori bintang hotel, rating pengguna, jarak ke pusat kota, serta pola musiman harian dan bulanan",
      "Pelatihan data dengan 5 model: Random Forest, Gradient Boosting, XGBoost, LightGBM, dan Linear Regression",
      "Evaluasi performa model menggunakan metrik RMSE, MAE, R², dan analisis overfitting",
      "Analisis sentimen dari 2000+ ulasan hotel untuk menghasilkan insight tambahan dalam pemahaman kualitas hotel dari sisi pengguna",
    ],
    myRole: "Machine Learning Engineer & Data Analyst",
    duration: "6 bulan (Februari 2025 – Juli 2025)",
    challenges: [
      "Menyeimbangkan dataset dengan preprocessing berbasis fitur musiman agar model tidak overfit terhadap waktu tertentu",
      "Menghadapi variasi harga antar platform: menggunakan median harga antar situs untuk stabilisasi target prediksi",
      "Penyesuaian hyperparameter model untuk menekan overfitting dan meningkatkan generalisasi",
      "Proses labeling sentimen dengan metode lexicon-based menggunakan TextBlob, serta evaluasi hasil labeling",
    ],
    outcome: [
      "Model terbaik (XGBoost) menghasilkan RMSE 93.334, MAE 64.515, dan R² 0.8643",
      "Data analitik mampu memberikan insight terkait fluktuasi harga berdasarkan waktu dan lokasi",
      "Analisis sentimen mendukung visualisasi skor ulasan dan membantu pemilik hotel memahami persepsi pelanggan",
      "Hasil riset ini menjadi dasar sistem rekomendasi untuk pemilik hotel terkait strategi penetapan harga",
    ],
    links: [
      {
        url: "https://github.com/mfajarjati/harganahotel-ml",
        text: "GitHub Repository",
      },
    ],
    documentation: [
      "./assets/images/harganahotelml/features.png",
      "./assets/images/harganahotelml/heatmap.png",
      "./assets/images/harganahotelml/perbandingan1.png",
      "./assets/images/harganahotelml/perbandingan2.png",
      "./assets/images/harganahotelml/tabel.png",
    ],
  },
};


/*===========================================================
  PROJECT ITEMS — click to open modal
===========================================================*/

const portfolioModal = document.getElementById("portfolioModal");
const closeProjectModalBtn = document.getElementById("closeProjectModal");

function openProjectModal() {
  if (!portfolioModal) return;
  portfolioModal.classList.add("open");
  portfolioModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (closeProjectModalBtn) {
    setTimeout(() => closeProjectModalBtn.focus(), 50);
  }
}

function closeProjectModal() {
  if (!portfolioModal) return;
  portfolioModal.classList.remove("open");
  portfolioModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Close on X button
if (closeProjectModalBtn) {
  closeProjectModalBtn.addEventListener("click", closeProjectModal);
}

// Close on clicking the dark overlay (outside modal-content)
if (portfolioModal) {
  portfolioModal.addEventListener("click", function (e) {
    if (e.target === portfolioModal) closeProjectModal();
  });
}

document.querySelectorAll(".project-item a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const projectTitle = this.querySelector(".project-title")
      .textContent.toLowerCase()
      .replace(/\s+/g, "");
    const projectData = portfolioData[projectTitle];

    if (!projectData) return;

    // Populate modal content
    document.getElementById("modal-title").textContent = projectData.title;

    const modalImgEl = document.getElementById("modal-image");
    modalImgEl.src = projectData.image;
    modalImgEl.alt = projectData.title;

    document.getElementById("modal-description").textContent =
      projectData.description;
    document.getElementById("modal-role").textContent = projectData.myRole;

    // Links
    const linksContainer = document.getElementById("modal-links");
    const linksSection = document.getElementById("modal-links-section");
    linksContainer.innerHTML = "";

    const validLinks = Array.isArray(projectData.links)
      ? projectData.links.filter((link) => {
          if (!link || typeof link !== "object") return false;
          const url = String(link.url || "").trim();
          const text = String(link.text || "").trim();
          return url && text && url !== "#" && text !== "#";
        })
      : [];

    if (validLinks.length > 0) {
      linksSection.style.display = "block";
      validLinks.forEach((link) => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `<ion-icon name="${
          link.url.includes("github") ? "logo-github" : "link-outline"
        }"></ion-icon> ${link.text}`;
        linksContainer.appendChild(a);
      });
    } else {
      linksSection.style.display = "none";
    }

    // Login info
    const loginInfoContainer = document.getElementById("modal-login-info");
    const loginInfoSection = document.getElementById("modal-login-info-section");
    loginInfoContainer.innerHTML = "";

    const validLoginInfo = Array.isArray(projectData.loginInfo)
      ? projectData.loginInfo
          .map((item) => {
            if (item && typeof item === "object" && !Array.isArray(item)) {
              const label = String(item.label || "").trim();
              const value = String(item.value || "").trim();
              if (!label || !value || value === "#") return null;
              return { label, value };
            }
            if (typeof item === "string") {
              const raw = item.trim();
              if (!raw || raw === "#") return null;
              const sepIdx = raw.indexOf(":");
              if (sepIdx === -1) return { label: "Info", value: raw };
              return {
                label: raw.slice(0, sepIdx).trim(),
                value: raw.slice(sepIdx + 1).trim(),
              };
            }
            return null;
          })
          .filter(Boolean)
      : [];

    if (validLoginInfo.length > 0) {
      loginInfoSection.style.display = "block";
      validLoginInfo.forEach((info) => {
        const row = document.createElement("div");
        row.className = "login-info-item";
        row.innerHTML = `<span class="login-info-label">${info.label}:</span><span class="login-info-value">${info.value}</span>`;
        loginInfoContainer.appendChild(row);
      });
    } else {
      loginInfoSection.style.display = "none";
    }

    // Screenshots with click-to-preview
    const screenshotsContainer = document.getElementById("modal-screenshots");
    screenshotsContainer.innerHTML = "";

    if (projectData.documentation && projectData.documentation.length > 0) {
      projectData.documentation.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Project screenshot";
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("click", function () {
          lastPreviewTrigger = this;
          openImagePreview(this.src, projectData.title + " screenshot");
        });
        screenshotsContainer.appendChild(img);
      });
    }

    // Click on main modal image -> fullscreen preview
    modalImgEl.onclick = function () {
      lastPreviewTrigger = modalImgEl;
      openImagePreview(modalImgEl.src, projectData.title);
    };

    // Lists
    document.getElementById("modal-highlights").innerHTML =
      projectData.highlights.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("modal-challenges").innerHTML =
      projectData.challenges.map((item) => `<li>${item}</li>`).join("");
    document.getElementById("modal-outcomes").innerHTML = projectData.outcome
      .map((item) => `<li>${item}</li>`)
      .join("");
    document.getElementById("modal-tech").innerHTML = projectData.technologies
      .map((item) => `<li>${item}</li>`)
      .join("");
    document.getElementById("modal-duration").textContent =
      projectData.duration;

    // Reset scroll and show modal
    portfolioModal.scrollTop = 0;
    const modalContent = portfolioModal.querySelector(".modal-content");
    if (modalContent) modalContent.scrollTop = 0;

    openProjectModal();
  });
});

/*===========================================================
  CERTIFICATE CARDS — click to preview fullscreen
===========================================================*/

document.querySelectorAll(".certificate-card").forEach((card) => {
  const img = card.querySelector("img");
  const titleEl = card.querySelector(".certificate-title");
  const dateEl = card.querySelector(".certificate-date");

  if (!img) return;

  const handleCertificateOpen = function () {
    const caption = [
      titleEl ? titleEl.textContent : "",
      dateEl ? dateEl.textContent : "",
    ]
      .filter(Boolean)
      .join(" — ");

    lastPreviewTrigger = card;
    openImagePreview(img.src, caption);
  };

  // Mouse click
  card.addEventListener("click", handleCertificateOpen);

  // Keyboard: Enter or Space
  card.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCertificateOpen();
    }
  });
});

/*===========================================================
  KEYBOARD GLOBAL — ESC to close active modal
===========================================================*/

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;

  if (isPreviewOpen) {
    closeImagePreview();
    return;
  }

  if (portfolioModal && portfolioModal.classList.contains("open")) {
    closeProjectModal();
  }
});

/*===========================================================
  LAZY IMAGE FADE-IN (IntersectionObserver)
===========================================================*/

(function initLazyImages() {
  const lazyImages = document.querySelectorAll("img.lazy-img");
  if (!lazyImages.length) return;

  if (!("IntersectionObserver" in window)) {
    // Fallback: show all immediately
    lazyImages.forEach((img) => img.classList.add("loaded"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px 100px 0px", threshold: 0.01 }
  );

  lazyImages.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add("loaded");
    } else {
      observer.observe(img);
      img.addEventListener("load", () => img.classList.add("loaded"), {
        once: true,
      });
    }
  });
})();
