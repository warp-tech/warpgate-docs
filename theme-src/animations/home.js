
import { gsap } from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'
import svgString from '../animations/home.svg?raw'

const container = document.getElementById('animation-container-home')
if (container) {
    container.innerHTML = svgString
}

gsap.registerPlugin(MotionPathPlugin)

const totalDuration = 8

function trackBorderSelector(id) {
    return `#${id} > g > path:not(:nth-child(3))`
}

function animatePath(tl, boxSelector, pathSelector, options = {}) {
    const path = `${pathSelector} > g > :nth-child(3)`
    document.querySelector(path).style.display = 'none'

    tl.addLabel('label')
    tl.fromTo(boxSelector, {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.5,
        delay: options.delay ?? null,
    })
    tl.to(boxSelector, {
        yoyo: false,
        duration: options.duration ?? 2,
        ease: "power1.inOut",
        motionPath: {
            path: path,
            align: path,
            autoRotate: true,
            start: options.start ?? 0,
            end: options.end ?? 1,
        },
    }, "label")
    tl.to(boxSelector, {
        opacity: 0,
        duration: 0.5,
    }, "-=0.5")
}

let tl = gsap.timeline({ repeat: -1 })

// auth path
tl.addLabel('startAuth')
animatePath(tl, "#box", "#path", { duration: 1 })
animatePath(tl, "#box3", "#path3", { duration: 1 })
animatePath(tl, "#box3", "#path3", { start: 1, end: 0, duration: 1 })
animatePath(tl, "#box", "#path", { start: 1, end: 0, duration: 1 })
tl.addLabel('endAuth')

// data path
tl.addLabel('startData')
tl.addLabel('data1')
animatePath(tl, "#box2", "#path2", { start: 1, end: 0 })
tl.addLabel('data2')
animatePath(tl, "#box2", "#path2", { start: 1, end: 0 })
tl.addLabel('endData')

tl
    .fromTo('#flyingparticles', { x: -250 }, { x: 200, duration: 0.5 }, 'data1+=1')
    .fromTo('#flyingparticles', { x: -250 }, { x: 200, duration: 0.5 }, 'data2+=1')

const trackOnColor = '#777'
const trackOffColor = '#444'
tl.to(trackBorderSelector('path'), { stroke: trackOnColor, duration: 0.5 }, 'startAuth')
tl.to(trackBorderSelector('path3'), { stroke: trackOnColor, duration: 0.5 }, 'startAuth')
tl.to(trackBorderSelector('path'), { stroke: trackOffColor, duration: 0.5 }, 'endAuth')
tl.to(trackBorderSelector('path3'), { stroke: trackOffColor, duration: 0.5 }, 'endAuth')

tl.to(trackBorderSelector('path2'), { stroke: trackOnColor, duration: 0.5 }, 'startData')
tl.to(trackBorderSelector('path2'), { stroke: trackOffColor, duration: 0.5 }, 'endData')

// tl.set({}, {}, totalDuration)
