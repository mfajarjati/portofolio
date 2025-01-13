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
      "Pengembangan komponen reusable untuk meningkatkan efisiensi development",
      "Integrasi chart.js untuk visualisasi data dashboard monitoring",
      "Implementasi responsive design untuk berbagai ukuran device",
      "Penggunaan localStorage untuk manajemen state client-side",
    ],
    myRole: "Frontend Developer",
    duration: "3 bulan (Februari 2024 - April 2024)",
    challenges: [
      "Optimisasi performa loading page dengan lazy loading dan code splitting",
      "Implementasi state management untuk data realtime dari backend",
      "Membuat UI yang konsisten untuk multiple user roles (siswa, guru, admin)",
      "Mengelola form validation yang kompleks untuk input jadwal dan penilaian",
      "Cross-browser compatibility issues terutama untuk fitur drag-and-drop",
    ],
    outcome: [
      "Meningkatkan user satisfaction score sebesar 85% setelah UI redesign",
      "Mengurangi loading time halaman sebesar 40% melalui optimisasi frontend",
      "Menurunkan bounce rate sebesar 30% dengan improved UI/UX",
      "Zero major UI bugs dalam 2 bulan pertama deployment",
      "Mencapai 98% responsive design compatibility across devices",
    ],
    // links: [
    //   {
    //     url: "https://github.com/mfajarjati/cleanclass",
    //     text: "GitHub Repository",
    //   },
    // ],
    // documentation: [
    //   "./assets/images/cleanclass/dashboard.png",
    //   "./assets/images/cleanclass/schedule.png",
    //   "./assets/images/cleanclass/assessment.png",
    //   "./assets/images/cleanclass/reports.png",
    //   "./assets/images/cleanclass/notifications.png",
    // ],
  },
  kidstrackr: {
    title: "Kids Trackr - Child Development Monitoring",
    image: "./assets/images/project-2.png",
    description:
      "Aplikasi mobile untuk memantau perkembangan anak di sekolah menggunakan Flutter yang berhasil menjadi Finalis LIDM (Lomba Inovasi Digital Mahasiswa) 2024. Frontend bertugas mengambil data dari REST API PHP, menampilkan informasi real-time tentang aktivitas, nilai, dan laporan perkembangan anak. Aplikasi ini telah diuji dan diimplementasikan di SD Lab School UPI Cibiru.",
    technologies: ["Flutter", "Dart", "GetX", "REST API", "PHP"],
    highlights: [
      "Finalis LIDM (Lomba Inovasi Digital Mahasiswa) 2024 kategori Aplikasi Mobile",
      "Implementasi arsitektur GetX untuk state management yang efisien",
      "Pengembangan fitur monitoring real-time untuk guru dan orang tua",
      "Implementasi sistem pelaporan perkembangan anak berbasis grafik",
      "Berhasil diimplementasikan di SD Lab School UPI Cibiru",
    ],
    myRole: "Flutter Frontend Developer & UI/UX Designer",
    duration: "4 bulan (Januari 2024 - April 2024)",
    challenges: [
      "Menyesuaikan UI/UX dengan kebutuhan guru SD Lab School UPI Cibiru",
      "Optimisasi performa aplikasi untuk perangkat dengan spesifikasi rendah",
      "Implementasi sistem offline-first untuk area dengan koneksi terbatas",
      "Integrasi dengan sistem akademik yang sudah ada di sekolah",
      "Pengembangan fitur yang user-friendly untuk guru dan orang tua",
    ],
    outcome: [
      "Finalis Top 20 LIDM 2024 dari 250+ tim peserta",
      "Implementasi sementara sukses di SD Lab School UPI Cibiru dengan 50+ pengguna aktif",
      "95% tingkat kepuasan dari guru dan orang tua dalam survey pengguna",
      "Pengurangan waktu pelaporan perkembangan siswa sebesar 70%",
      "Pengurangan loading time sebesar 60% dengan caching",
    ],
    // links: [
    //   {
    //     url: "https://github.com/yourusername/kidstrackr",
    //     text: "GitHub Repository",
    //   },
    //   // { url: "#", text: "Play Store" },
    // ],
    // documentation: [
    //   "./assets/images/kidstrackr/dashboard.png",
    //   "./assets/images/kidstrackr/activities.png",
    //   "./assets/images/kidstrackr/reports.png",
    //   "./assets/images/kidstrackr/notifications.png",
    // ],
  },
  skinsenseai: {
    title: "SkinSenseAI - Skin Disease Detection",
    image: "./assets/images/project-3.png",
    description:
      "Aplikasi mobile untuk deteksi penyakit kulit menggunakan AI yang berhasil meraih Juara 3 di Kompetisi AI NOVAC 2024. Menggunakan TensorFlow untuk implementasi model AI di Flutter, dengan akurasi deteksi mencapai 89% untuk 10 jenis penyakit kulit umum.",
    technologies: [
      "Flutter",
      "TensorFlow Lite",
      "Python",
      "Firebase",
      "REST API",
    ],
    highlights: [
      "Juara 3 Kompetisi AI NOVAC 2024 kategori Healthcare Innovation",
      "Implementasi TensorFlow untuk on-device AI processing",
      "Pengembangan UI/UX untuk kemudahan pengambilan foto kulit",
      "Integrasi Firebase untuk autentikasi dan penyimpanan data",
      "Implementasi custom camera interface untuk hasil foto optimal",
    ],
    myRole: "Flutter Frontend Developer",
    duration: "2 bulan (September - Oktober 2024)",
    challenges: [
      "Optimisasi model AI untuk performa real-time di mobile device",
      "Implementasi preprocessing gambar untuk akurasi deteksi",
      "Pengembangan UI yang intuitif untuk pengguna non-teknis",
      "Manajemen state kompleks untuk proses scanning dan hasil",
      "Handling berbagai kondisi pencahayaan dalam pengambilan foto",
    ],
    outcome: [
      "Juara 3 dari 100+ tim di Kompetisi AI NOVAC 2024",
      "Akurasi deteksi 89% untuk 10 jenis penyakit kulit",
      "Implementasi on-device AI untuk privacy dan kecepatan",
      "Proses deteksi < 5 detik per scan",
      "Dapat Pengurangan biaya konsultasi dokter sebesar 50% di area terpencil",
    ],
    // links: [
    //   {
    //     url: "https://github.com/yourusername/skinsenseai",
    //     text: "GitHub Repository",
    //   },
    //   {
    //     url: "#",
    //     text: "Play Store",
    //   },
    // ],
    // documentation: [
    //   "./assets/images/skinsenseai/dashboard.png",
    //   "./assets/images/skinsenseai/scanning.png",
    //   "./assets/images/skinsenseai/results.png",
    //   "./assets/images/skinsenseai/history.png",
    // ],
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
      "Pembuatan model prediksi Pokemon Legendary",
    ],
    myRole: "Data Analyst",
    duration: "1 bulan (Maret 2024)",
    challenges: [
      "Handling missing values dalam dataset",
      "Optimisasi visualisasi untuk dataset kompleks",
      "Feature engineering untuk meningkatkan akurasi prediksi",
      "Interpretasi hasil analisis untuk non-technical audience",
      "Implementasi berbagai teknik statistical testing",
    ],
    outcome: [
      "Accuracy score 92% dalam prediksi Pokemon Legendary",
      "Identifikasi 5 feature penting pembeda Pokemon",
      "Visualisasi data yang digunakan dalam documentation Dibimbing.id",
      "Best Project Award dalam kelas Data Science",
      "Publikasi analisis di Medium dengan 1000+ views",
    ],
    links: [
      {
        url: "https://github.com/yourusername/pokemon-analysis",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "View Analysis",
      },
      {
        url: "#",
        text: "Certification",
      },
    ],
    documentation: [
      "./assets/images/pokemon/eda.png",
      "./assets/images/pokemon/visualization.png",
      "./assets/images/pokemon/statistical.png",
      "./assets/images/pokemon/prediction.png",
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
      " Pengembangan UI/UX yang user-friendly untuk guru dan tenaga pendidik",
    ],
    myRole: "Laravel Frontend Developer",
    duration: "4 bulan (Agustus 2024 - Oktober 2024)",
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
        url: "https://github.com/yourusername/sirem",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "Live Demo",
      },
    ],
    documentation: [
      "./assets/images/sirem/dashboard.png",
      "./assets/images/sirem/assessment.png",
      "./assets/images/sirem/analytics.png",
      "./assets/images/sirem/report.png",
    ],
  },
  amazonprimeanalysis: {
    title: "Amazon Prime Analysis - RevoU Final Project",
    image: "./assets/images/project-6.png",
    description:
      "Proyek ini bertujuan untuk menganalisis konten film dan televisi yang tersedia di Amazon Prime Video berdasarkan metadata yang mencakup informasi seperti judul, sutradara, pemeran, negara asal, tahun rilis, durasi, rating, genre, dan tanggal penambahan ke platform. Dengan memanfaatkan dataset yang ada informasi ini, analisis dilakukan untuk mengungkap pola dan tren utama dalam perkembangan konten.",
    technologies: [
      "Python",
      "Pandas",
      "Tableau",
      "SQL",
      "PostgreSQL",
      "Matplotlib",
    ],
    highlights: [
      "Best Final Project Award di RevoU Data Analytics Program",
      "Implementasi ETL pipeline untuk data processing",
      "Pengembangan dashboard interaktif di Tableau",
      "Analisis RFM untuk customer segmentation",
      "Forecasting penjualan menggunakan time series analysis",
    ],
    myRole: "Data Analyst",
    duration: "2 bulan (Januari 2024 - Februari 2024)",
    challenges: [
      "Data cleaning untuk 1M+ records penjualan",
      "Optimisasi query SQL untuk large dataset",
      "Implementasi automated reporting system",
      "Integrasi multiple data sources",
      "Visualisasi complex metrics di Tableau",
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
        url: "https://github.com/yourusername/amazon-analysis",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "View Dashboard",
      },
      {
        url: "#",
        text: "Certificate",
      },
    ],
    documentation: [
      "./assets/images/amazon/dashboard.png",
      "./assets/images/amazon/analysis.png",
      "./assets/images/amazon/presentation.png",
      "./assets/images/amazon/certification.png",
    ],
  },
  socialnetworkanalysis: {
    title: "Social Network Analysis using Graph Theory",
    image: "./assets/images/project-7.png",
    description:
      "Project analisis jejaring sosial menggunakan teori graf untuk menganalisis pola interaksi dan penyebaran informasi di media sosial. Menggunakan R dan library igraph untuk menganalisis struktur jaringan, mengidentifikasi influencers, dan memetakan komunitas dalam jaringan sosial.",
    technologies: [
      "R",
      "igraph",
      "ggplot2",
      "tidyverse",
      "NetworkD3",
      "RStudio",
      "Python NetworkX",
    ],
    highlights: [
      "Implementasi algoritma centrality measures (Degree, Betweenness, Eigenvector)",
      "Visualisasi interaktif jaringan menggunakan NetworkD3",
      "Analisis komunitas dengan algoritma Louvain dan Girvan-Newman",
      "Development dashboard Shiny untuk visualisasi real-time",
      "Integrasi dengan Twitter API untuk pengumpulan data",
    ],
    myRole: "Data Analyst & Network Researcher",
    duration: "2 bulan (Mei 2023 - Juni 2023)",
    challenges: [
      "Optimisasi performa untuk analisis large-scale networks (>100k nodes)",
      "Implementasi efficient graph algorithms untuk big data",
      "Handling data streaming dari social media APIs",
      "Visualisasi complex network patterns secara efektif",
      "Interpretasi metrics centrality untuk business insights",
    ],
    outcome: [
      "Identifikasi 100+ key influencers dalam jaringan sosial",
      "Deteksi 25 komunitas terpisah dengan accuracy 85%",
      "Peningkatan engagement rate 40% melalui targeted marketing",
      "Reduksi 50% waktu analisis dengan automated pipeline",
      "Presentasi findings di konferensi Data Science 2024",
    ],
    links: [
      {
        url: "https://github.com/yourusername/sna-analysis",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "Interactive Dashboard",
      },
      {
        url: "#",
        text: "Research Paper",
      },
    ],
    documentation: [
      "./assets/images/sna/network_viz.png",
      "./assets/images/sna/community_detection.png",
      "./assets/images/sna/influencer_analysis.png",
      "./assets/images/sna/dashboard.png",
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
    ],
    highlights: [
      "Sertifikasi Machine Learning dari Dicoding Indonesia",
      "Implementasi CNN dengan arsitektur custom untuk klasifikasi gambar",
      "Data augmentation untuk meningkatkan performa model",
      "Optimisasi hyperparameter menggunakan Grid Search",
      "Deployment model menggunakan TensorFlow.js",
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
      "Accuracy 95% pada test dataset",
      "Real-time inference < 100ms per frame",
      "Deployment sukses di web platform",
      "Best Project Award di kelas Machine Learning",
      "Model size optimization hingga < 10MB",
    ],
    links: [
      {
        url: "https://github.com/yourusername/rps-classification",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "Live Demo",
      },
      {
        url: "#",
        text: "Certificate",
      },
    ],
  },
  wasteclassification: {
    title: "Waste Classification System using YOLOv11",
    image: "./assets/images/project-9.png",
    description:
      "Sistem klasifikasi sampah otomatis menggunakan YOLOv11 untuk mendeteksi dan mengkategorikan jenis sampah (Organik, Anorganik, B3) secara real-time. Implementasi deep learning untuk mendukung pengelolaan sampah yang efektif dan membantu edukasi masyarakat tentang pemilahan sampah yang benar.",
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
      "Pengembangan dataset custom dengan 3 kategori sampah",
      "Real-time detection dengan processing < 50ms per frame",
      "Integrasi dengan web interface menggunakan React js",
      "Sistem logging untuk tracking performa model",
    ],
    myRole: "Machine Learning Engineer & Data Scientist",
    duration: "3 bulan (November 2024 - Januari 2025)",
    challenges: [
      "Pengumpulan dan labeling dataset sampah yang beragam",
      "Optimisasi model untuk deteksi real-time pada edge devices",
      "Handling variasi pencahayaan dan sudut pengambilan gambar",
      "Peningkatan akurasi untuk objek sampah yang mirip",
      "Implementasi augmentasi data untuk improve model robustness",
    ],
    outcome: [
      "Akurasi deteksi 95% untuk sampah organik",
      "Akurasi deteksi 92% untuk sampah anorganik",
      "Akurasi deteksi 98% untuk sampah B3",
      "Processing time < 50ms pada GPU NVIDIA RTX 3060",
      "Dataset kontribusi 1000+ gambar sampah terklasifikasi",
    ],
    links: [
      {
        url: "https://github.com/yourusername/waste-classification",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "Live Demo",
      },
      {
        url: "#",
        text: "Research Paper",
      },
    ],
    documentation: [
      "./assets/images/waste/detection.png",
      "./assets/images/waste/dashboard.png",
      "./assets/images/waste/training.png",
      "./assets/images/waste/evaluation.png",
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
        url: "https://github.com/yourusername/vehicle-classification",
        text: "GitHub Repository",
      },
      {
        url: "#",
        text: "Live Demo",
      },
      {
        url: "#",
        text: "Certificate",
      },
    ],
    documentation: [
      "./assets/images/vehicle/detection.png",
      "./assets/images/vehicle/dashboard.png",
      "./assets/images/vehicle/training.png",
      "./assets/images/vehicle/evaluation.png",
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
    console.log("Clicked project:", projectTitle); // Debug

    if (projectData) {
      // Update modal content
      document.getElementById("modal-title").textContent = projectData.title;
      document.getElementById("modal-image").src = projectData.image;
      document.getElementById("modal-description").textContent =
        projectData.description;
      document.getElementById("modal-role").textContent = projectData.myRole;

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
