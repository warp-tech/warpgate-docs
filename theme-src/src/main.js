import '@fontsource/work-sans'
import '@fontsource/work-sans/latin-700.css'
import './imported-theme/theme.dark.scss'
import './style.scss'

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
