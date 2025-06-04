import '@fontsource/work-sans'
import '@fontsource/work-sans/latin-700.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './imported-theme/theme.dark.scss'
import './style.scss'
import './animations'

const classRemapping = [
    { from: '.admonition.note', to: ['alert', 'alert-info'] },
]

for (const item of classRemapping) {
    for (const el of document.querySelectorAll(item.from)) {
        for (const to of item.to) {
            el.classList.add(to)
        }
    }
}

const navToggle = document.querySelector('.nav-toggle')
if (navToggle) {
    navToggle.addEventListener('click', () => {
        document.querySelector('.nav').classList.toggle('collapsed')
    })
}
