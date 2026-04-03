// اطلاعات دورهها (کاملاً آفلاین)
const coursesData = [
    {
        id: 1,
        title: "HTML & CSS مقدماتی تا پیشرفته",
        description: "آموزش کامل طراحی وب با پروژههای عملی و واقعی",
        icon: "🎨",
        level: "مبتدی تا پیشرفته",
        duration: "20 ساعت",
        category: "web"
    },
    {
        id: 2,
        title: "JavaScript مدرن",
        description: "جاوااسکریپت ES6+ و مفاهیم پیشرفته برنامهنویسی",
        icon: "⚡",
        level: "پیشرفته",
        duration: "25 ساعت",
        category: "web"
    },
    {
        id: 3,
        title: "React Native",
        description: "ساخت اپلیکیشن موبایل برای اندروید و iOS",
        icon: "📱",
        level: "متوسط",
        duration: "18 ساعت",
        category: "mobile"
    },
    {
        id: 4,
        title: "Python برای AI",
        description: "مبانی هوش مصنوعی و یادگیری ماشین با پایتون",
        icon: "🐍",
        level: "پیشرفته",
        duration: "30 ساعت",
        category: "ai"
    },
    {
        id: 5,
        title: "Flutter",
        description: "برنامهنویسی کراس پلتفرم با Flutter و Dart",
        icon: "🚀",
        level: "متوسط",
        duration: "22 ساعت",
        category: "mobile"
    },
    {
        id: 6,
        title: "TensorFlow",
        description: "پیادهسازی پروژههای هوش مصنوعی با TensorFlow",
        icon: "🧠",
        level: "پیشرفته",
        duration: "35 ساعت",
        category: "ai"
    },
    {
        id: 7,
        title: "Node.js",
        description: "ساخت backend و API با Node.js و Express",
        icon: "🖥️",
        level: "متوسط",
        duration: "15 ساعت",
        category: "web"
    },
    {
        id: 8,
        title: "UI/UX Design",
        description: "اصول طراحی رابط کاربری و تجربه کاربری",
        icon: "🎯",
        level: "مبتدی",
        duration: "12 ساعت",
        category: "web"
    }
];

// نمایش دورهها
function showCourses(category = 'all') {
    const container = document.getElementById('coursesList');
    
    const filtered = category === 'all' 
        ? coursesData 
        : coursesData.filter(c => c.category === category);
    
    container.innerHTML = filtered.map(course => `
        <div class="course-card">
            <div class="course-icon">${course.icon}</div>
            <div class="course-info">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-desc">${course.description}</p>
                <div class="course-meta">
                    <span class="level">${course.level}</span>
                    <span class="duration">⏱ ${course.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// راهاندازی دکمههای دستهبندی
function setupCategories() {
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-cat');
            showCourses(category);
        });
    });
}

// نصب PWA
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBanner.style.display = 'flex';
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBanner.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

// ثبت Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW ثبت شد:', reg))
            .catch(err => console.log('SW ثبت نشد:', err));
    });
}

// اجرای اولیه
showCourses();
setupCategories();
