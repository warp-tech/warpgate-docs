
import { gsap } from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import svgString from '../animations/home.svg?raw'

const container = document.getElementById('animation-container-home')
if (container) {
    container.innerHTML = svgString
}

gsap.registerPlugin(MotionPathPlugin)

const totalDuration = 2

function animatePath(boxSelector, pathSelector, options, duration = 2) {
    const path = `${pathSelector}  > g > :nth-child(3)`
    document.querySelector(path).style.display = 'none'
    let tl = gsap.timeline({ repeat: -1 })
    tl.fromTo(boxSelector, {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.5,
    })
        .to(boxSelector, {
            yoyo: false,
            duration,
            ease: "power1.inOut",
            motionPath: {
                path: path,
                align: path,
                autoRotate: true,
                start: 1,
                end: 0,
                ...options,
            },
        }, "<")
        .to(boxSelector, {
            opacity: 0,
            duration: 0.5,
        }, "-=0.5")
        .set({}, {}, totalDuration)

}

animatePath("#box", "#path", { start: 0, end: 1 }, 1.45)
animatePath("#box2", "#path2")
animatePath("#box3", "#path3", { start: 0, end: 1 }, 1)

const tl = gsap.timeline({ repeat: -1 })
tl.fromTo('#flyingparticles', { x: -250 }, { x: 200, duration: 0.5, delay: 0.9 }).set({}, {}, totalDuration)
