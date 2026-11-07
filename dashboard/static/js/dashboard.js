/**
 * مدیریت تم لایت/دارک سراسری و ابزارهای داشبورد CRM بی‌نظیر
 */

// سیستم مدیریت و ذخیره تم سراسری (Dark/Light Mode)
function applyTheme(theme) {
    const body = document.body;
    const icon = document.getElementById('theme-toggle-icon');
    const text = document.getElementById('theme-toggle-text');

    if (theme === 'light') {
        body.classList.remove('dark-purple-theme');
        body.classList.add('light-purple-theme');
        if (icon) icon.innerText = '🌙';
        if (text) text.innerText = 'تم تاریک';
    } else {
        body.classList.remove('light-purple-theme');
        body.classList.add('dark-purple-theme');
        if (icon) icon.innerText = '☀️';
        if (text) text.innerText = 'تم روشن';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('crm_theme') || 'dark';
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const currentTheme = document.body.classList.contains('light-purple-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('crm_theme', newTheme);
            applyTheme(newTheme);
        });
    }
}

// اجرای فوری پیش از لود کامل صفحه جهت جلوگیری از پرش رنگ
(function () {
    const savedTheme = localStorage.getItem('crm_theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
    }
})();

// راه‌اندازی تم به محض آماده شدن سند در همه صفحات
document.addEventListener('DOMContentLoaded', function () {
    initTheme();

    // بستن مدال با کلیک روی پس‌زمینه تاریک (اگر وجود داشته باشد)
    const modal = document.getElementById('followup-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // منوی کشویی موبایل (اگر وجود داشته باشد)
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
});

// ریلود کردن صفحه هنگام زدن دکمه Back مرورگر جهت به‌روزرسانی اطلاعات
window.onpageshow = function (event) {
    if (event.persisted || (performance && performance.navigation.type === 2)) {
        window.location.reload();
    }
};