// star spin effect
document.querySelectorAll(".linkout:not(.wip)").forEach(linkout => {
    const star = linkout.querySelector(".star");
    let angle = 0, speed = 0, target = 0, raf;

    const spin = () => {
        speed += (target - speed) * 0.1;
        star.style.rotate = (angle += speed) + "deg";
        raf = speed > 0.01 || target ? requestAnimationFrame(spin) : null;
    };

    const go = t => { target = t; raf ??= requestAnimationFrame(spin); };

    linkout.addEventListener("pointerenter", () => go(1));
    linkout.addEventListener("pointerleave", () => go(0));
});

