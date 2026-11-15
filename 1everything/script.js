const library = document.getElementById("library");
const reader = document.getElementById("reader");
const el = (tag, cls, text = "") => Object.assign(document.createElement(tag), { className: cls, textContent: text });

// parse poems into: title, group, text
const parse = raw => raw
    .split(/^={3,}[ \t]*$/m)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => {
        const divider = /^---[ \t]*$/m.exec(block);
        const head = block.slice(0, divider.index);
        const p = { text: block.slice(divider.index + divider[0].length).trim() };

        head.split("\n").forEach(line => {
            const i = line.indexOf(":");
            if (i > 0) p[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        });
        return p;
    });

fetch("poems.txt")
    .then(res => res.text())
    .then(raw => parse(raw).forEach(p => {
        const li = el("li");
        const title = el("button", "title", p.title);

        if (p.set) title.append(" ", el("span", "set", p.set));

        title.onclick = () => {
            reader.querySelector("h2").textContent = p.title;
            reader.querySelector(".body").textContent = p.text;
            reader.showModal();
            reader.scrollTop = 0;
        };

        li.append(title);
        library.append(li);
    }))
    .catch(() => library.append(el("li", "", "couldn't load archive")));

reader.querySelector(".close").onclick = () => reader.close();
reader.onclick = e => e.target === reader && reader.close();