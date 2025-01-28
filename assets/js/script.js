"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
// Pilih aside dengan selector yang tepat
const aside = document.querySelector("[data-sidebar]");

window.addEventListener("load", () => {
  // Find About page and nav link
  const aboutPage = document.querySelector('[data-page="about"]');
  const aboutNav = document.querySelector('[data-nav-link="about"]');

  // Set active classes
  if (aboutPage) aboutPage.classList.add("active");
  if (aboutNav) aboutNav.classList.add("active");

  // Show sidebar
  const sidebar = document.querySelector("[data-sidebar]");
  if (sidebar) sidebar.classList.add("show");
});

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Tampilkan aside hanya ketika bagian selain "Home" diklik
    if (this.innerHTML.toLowerCase() !== "home") {
      aside.classList.add("show");
    } else {
      aside.classList.remove("show");
    }

    // Fungsi navigasi halaman
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

const portfolioData = {
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
        text: "GitHub Repository (Frontend)",
      },
      {
        url: "https://drive.google.com/drive/folders/1xwvQsY101G2TX7bRhh2Ghq2JJGfUuGRC?usp=sharing",
        text: "Drive Repository (Full)",
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
        text: "GitHub Repository (Frontend)",
      },
      {
        url: "https://drive.google.com/file/d/15xpx8KT0x9iHlIH7ZBKDm6dzG9JhiUqq/view?usp=sharing",
        text: "Drive Repository (full)",
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
    links: [
      {
        url: "https://drive.google.com/file/d/1N5XCJwV1UJIFsRvi9uAKaX_SvzafQAFv/view?usp=sharing",
        text: "Drive Repository",
      },
    ],
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
      "Akurasi klasifikasi 99% untuk semua jenis sampah",
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
      {
        url: "https://drive.google.com/drive/folders/16zeic1fjCliB8y4e913TTxKBvourFnw6",
        text: "Drive Repository",
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
        url: "https://drive.google.com/file/d/1EBoz9kudNLdr0Uq1Et1d-NQLD9JceTav/view?usp=sharing",
        text: "Drive Repository",
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
    links: [
      {
        url: "https://drive.google.com/file/d/1-WgNjbM8FrSrSAZewGt_u1KeRtNUPwbr/view?usp=sharing",
        text: "Drive Repository",
      },
    ],
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
};

// Update click handlers for portfolio items
document.querySelectorAll(".project-item a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const projectTitle = this.querySelector(".project-title")
      .textContent.toLowerCase()
      .replace(/\s+/g, "");
    const projectData = portfolioData[projectTitle];

    if (projectData) {
      // Update modal content
      document.getElementById("modal-title").textContent = projectData.title;
      document.getElementById("modal-image").src = projectData.image;
      document.getElementById("modal-description").textContent =
        projectData.description;
      document.getElementById("modal-role").textContent = projectData.myRole;

      // Clear existing links before adding new ones
      const linksContainer = document.getElementById("modal-links");
      linksContainer.innerHTML = ""; // Clear existing links

      // Add new links
      if (projectData.links && projectData.links.length > 0) {
        projectData.links.forEach((link) => {
          const linkElement = document.createElement("a");
          linkElement.href = link.url;
          linkElement.target = "_blank";
          linkElement.rel = "noopener noreferrer";
          linkElement.innerHTML = `
            <ion-icon name="${
              link.url.includes("github") ? "logo-github" : "link-outline"
            }"></ion-icon>
            ${link.text}
          `;
          linksContainer.appendChild(linkElement);
        });
      }

      // Clear and update screenshots
      const screenshotsContainer = document.getElementById("modal-screenshots");
      screenshotsContainer.innerHTML = ""; // Clear existing screenshots

      if (projectData.documentation && projectData.documentation.length > 0) {
        projectData.documentation.forEach((imgSrc) => {
          const img = document.createElement("img");
          img.src = imgSrc;
          img.alt = "Project documentation";
          img.loading = "lazy";
          screenshotsContainer.appendChild(img);
        });
      }

      // Update lists
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

      // Show modal
      const modal = document.getElementById("portfolioModal");
      modal.style.display = "block";
    }
  });
});

// Modal close handlers
const modal = document.getElementById("portfolioModal");
const closeBtn = document.getElementsByClassName("close-modal")[0];

// Close on X click
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close on outside click
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
