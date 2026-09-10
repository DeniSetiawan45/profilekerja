const burger = document.getElementById('burger');
const navMenu = document.getElementById('menu');
const tabs = document.querySelector('.tabs');
const gallery = document.querySelector('.gallery');

if (burger && navMenu) {
    burger.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.addEventListener('click', event => {
        if (event.target.closest('a')) navMenu.classList.remove('open');
    });
}

if (tabs && gallery) {
    tabs.addEventListener('click', event => {
        const selectedTab = event.target.closest('.tab');
        if (!selectedTab) return;

        tabs.querySelector('.active')?.classList.remove('active');
        selectedTab.classList.add('active');
        const filter = selectedTab.dataset.f;

        gallery.querySelectorAll('figure').forEach(item => {
            item.classList.toggle('hide', filter !== 'all' && item.dataset.c !== filter);
        });
    });

    gallery.addEventListener('click', event => {
        const image = event.target.closest('img');
        if (image) window.open(image.currentSrc || image.src, '_blank', 'noopener');
    });
}

const skillSection = document.getElementById('skill');
const skillBars = document.querySelectorAll('.bar i');

if (skillSection && skillBars.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        skillBars.forEach(bar => { bar.style.width = `${bar.dataset.w}%`; });
        observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(skillSection);
} else {
    skillBars.forEach(bar => { bar.style.width = `${bar.dataset.w}%`; });
}