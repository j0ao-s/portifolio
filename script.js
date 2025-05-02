
const toggle = document.getElementById('toggleDark');
const html = document.documentElement;

// Carrega preferência salva
if (localStorage.theme === 'dark') {
    html.classList.add('dark');
}

toggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      html.classList.add('dark');
      localStorage.theme = 'dark';
    }
});
