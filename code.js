const root = document.querySelector("body");

function FileInput(set) {
    const container = document.createElement("input");
    container.style.width = "200px";
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.type = "file";

    container.onchange = () => {
        const [file] = container.files;
        set(file);
    }

    return container;
}

function TypeInput(set) {
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
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
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    
    const center = document.createElement("label");
    center.innerHTML = "Align: </br>";
    
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
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Text: ";

    const input = document.createElement("input");
    input.type = "text";

    const button = document.createElement("button");
    button.innerHTML = "Add";

    container.appendChild(input);
    container.appendChild(button);
    
    container.onsubmit = (e) => {
        console.log("TypeInput submit");//debug
        e.preventDefault();
        set(input.value);
    }

    return container;
}

function DurationInput(set) {
    const container = document.createElement("form");
    //container.style.display = "inline-block";
    container.style.width = "150px";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
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

function InputItem(rmv) {
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
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.padding = "10px";

    const input = document.createElement("input");
    input.style.display = "block";
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
        //debugger;
        e.preventDefault();
        if(input.value == "") {
            rmv(this);
            container.style.display = "none";
            return;
        }
        this.setText(input.value, fontSize.value, color.value);
        this.setTyping(typing.checked);
        this.setCursor(cursor.checked);
    }

    this.getContainer = () => {
        return container;
    }

    return this;
}

function InputInput(add, rmv) {
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";

    const header = document.createElement("div");
    container.style.width = "100px";
    header.innerHTML = "Inputs: ";

    const button = document.createElement("button");
    button.innerHTML = "Add";

    header.appendChild(button);

    button.onclick = () => {
        let newItem = new InputItem(rmv);
        add(newItem);
        container.appendChild(newItem.getContainer());
    }

    container.appendChild(header);

    return container;
}

function makeSelectable(container){
    container.style.position = "relative";
    container.style.outlineWidth = "2px";
    container.style.outlineColor = "blue";
    container.style.outlineStyle = "none";
}

function selectArea() {
    container = document.createElement("button");
    container.style.border = "none";

    container.style.position = "absolute";
    container.style.width = "calc(100% - 20px)";
    container.style.height = "calc(100% - 20px)";
    container.style.zIndex = 0;

    return container;
}

function ShotItem(setImg, rmv) {
    this.duration = 0;
    this.type = 1;
    this.align = 0;

    this.setDuration = (_duration) => {
        this.duration = _duration;
    }
    this.setType = (_type) => {
        this.type = +_type;
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
    this.rmvInput = (_input) => {
        let index = this.input.indexOf(_input);
        this.input.splice(index, 1);
        if(this.input.length === 0) delete this.input;
    }
    
    const container = document.createElement("div");
    makeSelectable(container);
    
    let selected = false;
    
    this.select = () => {
        if(selected) container.style.outlineStyle = "none";
        else container.style.outlineStyle = "solid";
        selected = !selected;
    }
    
    const clickArea = selectArea();
    container.appendChild(clickArea);

    clickArea.onclick = () => {
        this.select();
    }

    const x = document.createElement("button");
    x.innerHTML = 'X';
    x.style.position = "absolute";
    x.style.right = "10px";

    x.onclick = () => {
        rmv(this);
        container.style.display = "none";
    }

    container.appendChild(x);

    container.style.position = "relative";
    container.style.margin = "10px";
    container.style.padding = "10px";
    container.style.backgroundColor = "#eee";
    container.className = "shot";
    container.style.width = "280px";

    container.appendChild(FileInput(setImg));
    container.appendChild(TypeInput(this.setType));
    container.appendChild(AlignInput(this.setAlign));
    container.appendChild(TextInput(this.setText));
    container.appendChild(InputInput(this.addInput, this.rmvInput));
    container.appendChild(DurationInput(this.setDuration));

    container.style.display = "inline-block";

    this.getContainer = () => {
        return container;
    }

    return this;
}

function Audio() {
    const container = document.createElement("audio");
    container.controls = true;
    container.style.width = "95%";
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

function Display(imgWidth = 400) {
    const container = document.createElement("div");
    container.style.minHeight = "200px";

    const display = document.createElement("div");

    const zoom = document.createElement("div");
    zoom.style.position = "absolute";
    zoom.style.top = 0;

    const plus = document.createElement("button");
    const minus = document.createElement("button");
    plus.style.padding = minus.style.padding = "0px 18px";
    plus.style.margin = minus.style.margin = "5px";
    plus.innerHTML = "<h3>+</h3>";
    minus.innerHTML = "<h3>-</h3>";
    
    const img = document.createElement("img");
    img.style.width = "100%";
    
    display.style.width = +imgWidth + "px";
    display.style.margin = "auto";
    
    plus.onclick = () => {
        imgWidth += 20;
        display.style.width = imgWidth + "px";
    }

    minus.onclick = () => {
        imgWidth -= 20;
        display.style.width = imgWidth + "px";
    }

    this.setImg = (file) => {
        if(file) img.src = URL.createObjectURL(file);
        else img.src = "";
    }
    this.getContainer = () => {
        return container;
    }

    container.appendChild(display);
    container.appendChild(zoom);
    zoom.appendChild(minus);
    zoom.appendChild(plus);
    display.appendChild(img);

    return this;
}

function Shot(setImg, add, rmv, updateDisplay) {
    const container = document.createElement("div");

    const header = document.createElement("h3");
    container.style.height = "100px";
    header.innerHTML = "Shots: ";

    const button = document.createElement("button");
    button.innerHTML = "<h3>Add</h3>";
    button.style.padding = "0px 20px";
    button.style.margin = "0px 10px";

    const shotCount = document.createElement("label");
    shotCount.style.margin = "0px 10px";

    header.appendChild(button);
    header.appendChild(shotCount);

    button.onclick = () => {
        let newItem = new ShotItem(setImg, rmv);
        updateDisplay(newItem); //adding event
        shotCount.innerHTML = add(newItem);
        container.appendChild(newItem.getContainer());
    }

    container.appendChild(header);

    return container;
}

function Timeline(setImg, data) {
    this.shots = [];
    data.shot = this.shots;

    this.addShot = (_shot) => {
        this.shots.push(_shot);
        return this.shots.length;
    }
    this.rmvShot = (_shot) => {
        let index = this.shots.indexOf(_shot);
        this.shots.splice(index, 1);
        return this.shots.length;
    }

    const container = document.createElement("div");
    container.className = "timeline";

    const JSONconatiner = document.createElement("div");
    JSONconatiner.style.margin = "10px";
    JSONconatiner.style.position = "absolute";
    JSONconatiner.style.left = "200px";
    JSONconatiner.style.maxHeight = "80px";
    JSONconatiner.style.overflowY = "scroll";
    JSONconatiner.style.backgroundColor = "rgb(255,255,255,0.8)";

    function updateDisplay(shotItem) {
        shotItem.getContainer().onclick = 
        shotItem.getContainer().onchange = 
        shotItem.getContainer().onsubmit = () => {
            JSONconatiner.innerHTML = JSON.stringify(data);
        }
    }

    const audio = new Audio();

    container.appendChild(FileInput(audio.set));
    container.appendChild(audio.getContainer());
    container.appendChild(JSONconatiner);
    container.appendChild(Shot(setImg, this.addShot, this.rmvShot, updateDisplay));
    container.style.marginBottom = "20px";

    this.getContainer = () => {
        return container;
    }

    return this;
}

function App() {
    let data = {
        shot:[],
        mockup: 1
    }

    const display = new Display();
    const timeline = new Timeline(display.setImg, data);
    
    data.shot = timeline.shots;

    root.appendChild(display.getContainer());
    root.appendChild(timeline.getContainer());
}

App() 
