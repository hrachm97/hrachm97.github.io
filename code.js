const root = document.querySelector("body");

function FileInput(set) {
    const container = document.createElement("input");
    container.type = "file";

    container.onchange = () => {
        const [file] = container.files;
        set(file);
    }

    return container;
}

function TypeInput(set) {
    const container = document.createElement("div");
    container.innerHTML = "Type: ";

    const input = document.createElement("select");
    input.innerHTML = `
        <option value=1>Full</option>
        <option value=2>Medium</option>
        <option value=3>Close</option>
    `;

    container.appendChild(input);
    
    input.onchange = () => {
        set(input.value);
        let parent = container.parentNode;
        parent.querySelector("#positive").innerHTML = input.value == 1 ? "Right" : "Top";
        parent.querySelector("#negative").innerHTML = input.value == 1 ? "Left" : "Bottom";
    }

    return container;
}

function AlignInput(set) {
    const container = document.createElement("div");
    
    const center = document.createElement("label");
    center.innerHTML = "Align: ";
    
    const input = document.createElement("input");
    input.type = "range";
    input.style.margin = "0px 10px";

    center.onclick = () => {
        set(0);
        input.value = 50;
    }
    
    const positive = document.createElement("label");
    positive.id = "positive";
    const negative = document.createElement("label");
    negative.id = "negative";
    positive.style.width = negative.style.width = "50px"; // doesnt't work

    positive.innerHTML = "Right";
    negative.innerHTML = "Left";

    const outside = document.createElement("input");
    outside.type = "checkbox";
    outside.style.margin = "0px 10px";

    container.appendChild(center);
    container.appendChild(negative);
    container.appendChild(input);
    container.appendChild(positive);
    container.appendChild(outside);

    
    input.onchange = outside.onchange = () => {
        let alignControl = outside.checked ? 3 : 1;
        set( (alignControl * (input.value/50 - 1)).toFixed(1));
    }

    return container;
}

function TextInput(set) {
    const container = document.createElement("form");
    container.innerHTML = "Text: ";

    const input = document.createElement("input");
    input.type = "text";

    const button = document.createElement("button");
    button.innerHTML = "Add";

    container.appendChild(input);
    container.appendChild(button);
    
    container.onsubmit = (e) => {
        e.preventDefault();
        set(input.value);
    }

    return container;
}

function DurationInput(set) {
    const container = document.createElement("form");
    container.innerHTML = "Duration: ";

    const input = document.createElement("input");
    input.type = "number";
    input.value = 0;
    input.style.width = "40px"

    const button = document.createElement("button");
    button.innerHTML = "Set";

    container.appendChild(input);
    container.appendChild(button);
    
    container.onsubmit = (e) => {
        e.preventDefault();
        set(+input.value);
    }

    return container;
}

function InputItem() {
    this.pos = [0,0];
    this.text = ["Type something", 22, "#ffffff"];
    this.typing = false;
    this.cursor = false;

    this.setPos = (x, y) => {
        this.pos = [+x, +y];
    }

    this.setText = (str, fontSize, color) => {
        this.text = [str, +fontSize, color];
    }

    this.setTyping = (bool) => {
        this.typing = Boolean(bool);
    }

    this.setCursor = (bool) => {
        this.cursor = Boolean(bool);
    }

    const container = document.createElement("form");
    container.innerHTML = "Input Item: ";

    const input = document.createElement("input");
    input.type = "text";
    input.value = this.text[0];

    const fontSize = document.createElement("input");
    fontSize.type = "number";
    fontSize.value = this.text[1];
    fontSize.style.width = "35px";

    const color = document.createElement("input");
    color.type = "color";
    color.value = this.text[2];

    const typing = document.createElement("input");
    const cursor = document.createElement("input");
    typing.type = cursor.type = "checkbox";
    typing.checked = this.typing;
    cursor.checked = this.cursor;

    const button = document.createElement("button");
    button.innerHTML = "Set";

    container.appendChild(input);
    container.appendChild(fontSize);
    container.appendChild(color);
    container.appendChild(typing);
    container.appendChild(cursor);
    container.appendChild(button);
    
    container.onsubmit = (e) => {
        e.preventDefault();
        
        this.setText(input.value, fontSize.value, color.value);
        this.setTyping(typing.checked);
        this.setCursor(cursor.checked);
    }

    this.getContainer = () => {
        return container;
    }

    return this;
}

function InputInput(add) {
    const container = document.createElement("div");
    container.innerHTML = "Inputs: ";

    const button = document.createElement("button");
    button.innerHTML = "Add";

    button.onclick = () => {
        let newItem = new InputItem();
        add(newItem);
        container.appendChild(newItem.getContainer());
    }

    container.appendChild(button);

    return container;
}

function ShotItem(setImg) {
    this.duration = 0;
    this.type = 1;
    this.align = 0;

    this.setDuration = (_duration) => {
        this.duration = _duration;
    }
    this.setType = (_type) => {
        this.type = _type;
    }
    this.setAlign = (_align) => {
        this.align = +_align;
    }
    this.setTouch = (_touch) => {
        this.touch = _touch;
    }
    this.setText = (_text) => {
        if(_text === "") delete this.text;
        else this.text = _text;
    }
    this.addInput = (_input) => {
        if(this.input === undefined) this.input = [];
        this.input.push(_input);
    }

    const container = document.createElement("div");
    container.style.outlineWidth = "0px";
    container.style.outlineColor = "blue";
    container.style.outlineStyle = "solid";
    container.className = "shot";
    container.style.width = "450px";

    container.innerHTML = "IMG: ";
    container.appendChild(FileInput(setImg));
    container.appendChild(TypeInput(this.setType));
    container.appendChild(AlignInput(this.setAlign));
    container.appendChild(TextInput(this.setText));
    container.appendChild(InputInput(this.addInput));
    container.appendChild(DurationInput(this.setDuration));

    this.getContainer = () => {
        return container;
    }

    return this;
}

function Audio() {
    const container = document.createElement("audio");
    container.controls = true;
    container.style.width = "80%";
    container.style.display = "block";
    const source = document.createElement("source");

    container.appendChild(source);

    this.set = (path) => {
        if(path) source.src = URL.createObjectURL(path);
        else source.src = "";
        container.load();
    }
    this.getContainer = () => {
        return container;
    }

    return this;
}

function Img() {
    const container = document.createElement("img");
    container.style.maxWidth = "400px";
    container.style.position = "fixed";
    container.style.right = "0";
    container.style.top = "0";

    this.set = (file) => {
        if(file) container.src = URL.createObjectURL(file);
        else container.src = "";
    }
    this.getContainer = () => {
        return container;
    }

    return this;
}

function Timeline(shotitem) {
    const container = document.createElement("div");
    container.className = "timeline";

    const button = document.createElement("button");
    button.innerHTML = "Get JSON";
    button.onclick = () => {
        alert(JSON.stringify(shotitem));
    }

    const audio = new Audio();

    container.appendChild(FileInput(audio.set));
    container.appendChild(audio.getContainer());
    container.appendChild(button);
    container.style.marginBottom = "20px";

    return container;
}

function App() {
    const img = new Img();

    let shotitem = new ShotItem(img.set);

    root.appendChild(Timeline(shotitem));
    root.appendChild(shotitem.getContainer());
    root.appendChild(img.getContainer());
    // setInterval(() => {
    //     alert(JSON.stringify(shotitem))
    // }, 5000);
}

App() 
