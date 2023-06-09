const $themeText = document.querySelector('#themeBtn b');
const $themeBtn = document.querySelector('#themeBtn');
const theme = localStorage.getItem('theme');

const initTheme = () => {
    if (theme) {
        $themeText.innerHTML = theme === 'dark' ? 'ON' : 'OFF';
        document.documentElement.setAttribute('data-theme', theme);
    }
};

const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    $themeText.innerHTML = newTheme === 'dark' ? 'ON' : 'OFF';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

$themeBtn.addEventListener('click', toggleTheme);
initTheme();
