function FileInput(set) {
    
    const container = document.createElement("input");
    container.type = "file";
    container.style.width = "200px";
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";

    container.onchange = () => {
        this.srcFile = container.files[0];
        set(this.srcFile);
    }
    this.getContainer = () => {
        return container;
    }

    return this;
}

function Type(set) {
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

function Align(set) {
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Align: ";
    
    const centerize = document.createElement("button");
    centerize.style.margin = "2px 20px";

    centerize.innerHTML = "centerize";
    
    const input = document.createElement("input");
    input.type = "range";
    input.style.margin = "0px 10px";

    centerize.onclick = () => {
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

    positive.onclick = () => {
        let alignControl = outside.checked ? 3 : 1;
        set( alignControl.toFixed(1));
        input.value = 100;
    }

    negative.onclick = () => {
        let alignControl = outside.checked ? 3 : 1;
        set( -alignControl.toFixed(1));
        input.value = 0;
    }
    
    const outside = document.createElement("input");
    outside.type = "checkbox";
    outside.style.margin = "0px 10px";
    
    const range = document.createElement("div");
    range.appendChild(negative);
    range.appendChild(input);
    range.appendChild(positive);
    range.appendChild(outside);

    container.appendChild(centerize);
    container.appendChild(range);

    
    input.onchange = outside.onchange = () => {
        let alignControl = outside.checked ? 3 : 1;
        set( (alignControl * (input.value/50 - 1)).toFixed(1));
    }

    return container;
}

function Touch(setTouch) {
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Touch: ";

    const button = document.createElement("button");
    button.innerHTML = "Set";

    const value = document.createElement("span");

    container.appendChild(button);
    container.appendChild(value);

    button.onclick = () => {
        value.innerHTML = setTouch();
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
        console.log("Type submit");//debug
        e.preventDefault();
        set(input.value);
    }

    return container;
}

function Duration(set, Default = 0) {
    const container = document.createElement("form");
    //container.style.display = "inline-block";
    container.style.width = "150px";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Duration: ";

    const input = document.createElement("input");
    input.type = "number";
    input.step = 0.1;
    input.value = Default;
    input.style.width = "40px"

    const button = document.createElement("button");
    button.innerHTML = "Set";

    container.appendChild(input);
    container.appendChild(button);
    
    container.onsubmit = (e) => {
        e.preventDefault();
        input.value = set(input.value);
    }

    return container;
}

function InputItem(rmv, getCoordinate) {
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

    const container = document.createElement("div");
    container.innerHTML = "Input Item: ";
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.padding = "10px";

    const setPos = document.createElement("button");
    setPos.innerHTML = "Set position";

    setPos.onclick = () => {
        let [x,y] = getCoordinate();
        pos.innerHTML = [x,y];
        this.setPos(x,y);
    }

    const pos = document.createElement("span");

    const form = document.createElement("form");

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

    form.appendChild(input);
    form.appendChild(fontSize);
    form.appendChild(color);
    form.appendChild(typing);
    form.appendChild(cursor);
    form.appendChild(button);
    
    container.appendChild(setPos);
    container.appendChild(pos);
    container.appendChild(form);
    
    form.onsubmit = (e) => {
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

function Inputs(add, rmv, getCoordinate) {
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
        let newItem = new InputItem(rmv, getCoordinate);
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

function ShotItem(setImg, timeline, getCoordinate) {
    this.duration = +document.querySelector("audio").currentTime.toFixed(1);
    this.type = 1;
    this.align = 0;

    this.setDuration = (value) => {
        if(!value) this.duration = +document.querySelector("audio").currentTime.toFixed(1);
        else this.duration = +value;
        return this.duration;
    }
    this.setType = (_type) => {
        this.type = +_type;
        setImg(file.srcFile, this.type, this.align);
    }
    this.setAlign = (_align) => {
        this.align = +_align;
        setImg(file.srcFile, this.type, this.align);
    }
    this.setTouch = () => {
        this.touch = getCoordinate();
        return this.touch;
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

    let file = new FileInput(setImg);
    
    const container = document.createElement("div");
    makeSelectable(container);
    
    let selected = false;
    
    this.select = () => {
        if(selected) container.style.outlineStyle = "none";
        else {
            container.style.outlineStyle = "solid";
            setImg(file.srcFile, this.type, this.align);
        }
        selected = !selected;
    }
    
    const clickArea = selectArea();
    container.appendChild(clickArea);
    
    clickArea.onclick = () => {
        this.select();
    }

    const x = document.createElement("button");
    x.className = "clearShot";
    x.innerHTML = 'X';
    x.style.position = "absolute";
    x.style.right = "10px";

    const index = document.createElement("h3");
    index.style.display = "inline";
    index.style.marginRight = "10px";
    index.style.position = "relative";

    setTimeout(() => {
        index.innerHTML = timeline.thisIndex(this) + 1;
    }, 0); // to execute after the construction of the shotitem
    
    setInterval( () => {
        index.innerHTML = timeline.thisIndex(this) + 1;
    }, 100)

    x.onclick = () => {
        timeline.rmvShot(this);
        container.style.display = "none";
    }

    container.appendChild(x);

    container.style.position = "relative";
    container.style.margin = "10px";
    container.style.padding = "10px";
    container.style.backgroundColor = "#eee";
    container.className = "shot";
    container.style.width = "280px";

    container.appendChild(index);
    container.appendChild(file.getContainer());
    container.appendChild(Type(this.setType));
    container.appendChild(Align(this.setAlign));
    container.appendChild(Touch(this.setTouch));
    container.appendChild(TextInput(this.setText));
    container.appendChild(Inputs(this.addInput, this.rmvInput, getCoordinate));
    container.appendChild(Duration(this.setDuration, this.duration));

    container.style.display = "inline-block";

    this.getContainer = () => {
        return container;
    }

    return this;
}

function Shots(setImg, timeline, addJSONevents, getCoordinate) {
    const container = document.createElement("div");

    const header = document.createElement("h3");
    container.style.height = "100px";
    header.innerHTML = "Shots: ";

    const button = document.createElement("button");
    button.innerHTML = "<h3>Add</h3>";
    button.style.padding = "0px 20px";
    button.style.margin = "0px 10px";

    header.appendChild(button);

    button.onclick = () => {
        let newItem = new ShotItem(setImg, timeline, getCoordinate);
        addJSONevents(newItem);
        timeline.addShot(newItem);
        container.appendChild(newItem.getContainer());
    }

    container.appendChild(header);

    return container;
}

function AudioItem() {
    const container = new Audio();
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

function VoiceOver() {
    const container = document.createElement("div");
    const item = new AudioItem();
    const file = new FileInput(item.set);

    container.appendChild(file.getContainer());
    container.appendChild(item.getContainer());
    
    return container;
}

function Timeline(setImg, data, getCoordinate) {
    this.shots = [];

    this.addShot = (shotItem) => {
        this.shots.push(shotItem);
        return this.shots.length;
    }
    this.rmvShot = (shotItem) => {
        let index = this.shots.indexOf(shotItem);
        this.shots.splice(index, 1);
        return this.shots.length;
    }
    this.thisIndex = (thisItem) => {
        return this.shots.indexOf(thisItem);
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

    function addJSONevents(shotItem) {
        shotItem.getContainer().onclick = 
        shotItem.getContainer().onchange = 
        shotItem.getContainer().onsubmit = () => {
            JSONconatiner.innerHTML = JSON.stringify(data);
        }
    }

    container.appendChild(VoiceOver());
    container.appendChild(JSONconatiner);
    container.appendChild(Shots(setImg, this, addJSONevents, getCoordinate));
    container.style.marginBottom = "20px";

    this.getContainer = () => {
        return container;
    }

    return this;
}

function Coordinate(x = 0, y = 0) {
    let value = [x, y];
    this.set = (x, y) => {
        value[0] = +x.toFixed(0);
        value[1] = +y.toFixed(0);
    }
    this.get = () => {
        return [value[0], value[1]];
    }
    return this;
}

function Display(set, imgWidth = 400) {
    const container = document.createElement("div");
    container.style.minHeight = "200px";
    container.style.outline = "1px black solid";
    container.style.overflow = "hidden"; 

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

    function mouse_position(offset = [0,0]) {
        const width = img.clientWidth;
        const height = img.clientHeight;
        const [x,y] = [
            event.clientX - offset[0], 
            event.clientY - offset[1]
        ];
        return [
            Math.round(x * 100 / width),
            Math.round(y * 100 / height)
        ]
    }
    
    img.onclick = (e) => {
        debugger;
        let rect = e.target.getBoundingClientRect();
        const scale = rect.width / imgWidth;
        let [x,y] = mouse_position([rect.left, rect.top]);
        set(x / scale, y / scale);
    }
    
    display.style.width = +imgWidth + "px";
    display.style.margin = "auto";
    display.style.transform = "scale(1.5)";
    
    plus.onclick = () => {
        imgWidth += 20;
        display.style.width = imgWidth + "px";
    }

    minus.onclick = () => {
        imgWidth -= 20;
        display.style.width = imgWidth + "px";
    }

    this.setImg = (file, shotType = 1, align = 0) => {
        if(file) img.src = URL.createObjectURL(file);
        else img.src = "";
        display.style.transform = `scale(${1 + (shotType - 1) / 2})`;
        display.style.transformOrigin = `50% ${(1 - align) * 50}%`;
    }
    this.getContainer = () => {
        return container;
    }

    display.appendChild(img);
    container.appendChild(display);
    zoom.appendChild(minus);
    zoom.appendChild(plus);
    container.appendChild(zoom);

    return this;
}

function App() {
    const root = document.querySelector("body");

    let data = {
        shot:[],
        mockup: 1
    }

    let coordinate = new Coordinate();

    const display = new Display(coordinate.set);
    const timeline = new Timeline(display.setImg, data, coordinate.get);
    
    data.shot = timeline.shots;

    root.appendChild(display.getContainer());
    root.appendChild(timeline.getContainer());
}

App();
