(() => {
    const $ = id => document.getElementById(id);
    const phase2 = document.querySelector(".phase2");
    const dialog = $("info");
    const N = 12;
    let i = 0;

    // color breakpoint
    const updateTheme = () => document.body.classList.toggle(
        "dark",
        !$("text-version").hidden && phase2.getBoundingClientRect().top < innerHeight / 2
    );
    ["scroll", "resize"].forEach(e => addEventListener(e, updateTheme, { passive: true }));
    updateTheme();

    // version toggle
    $("version-toggle").addEventListener("click", e => {
        const toImages = $("image-version").hidden;
        $("text-version").hidden = toImages;
        $("image-version").hidden = !toImages;
        e.target.textContent = toImages ? "view text version ↗" : "view illustrated version ↗";
        scrollTo({ top: 0, behavior: "smooth" });
        updateTheme();
    });

    // carousel
    const show = step => {
        i = (i + step + N) % N;
        $("poem-image").src = `images/pg${i + 1}.jpg`;
        $("image-counter").textContent = `${String(i + 1).padStart(2, "0")} / ${N}`;
    };
    $("prev-image").onclick = () => show(-1);
    $("next-image").onclick = () => show(1);

    // about; outside click or esc to close
    $("info-toggle").onclick = () => dialog.showModal();
    dialog.onclick = e => e.target === dialog && dialog.close();
})();