function FileInput(set, shotItem) {
    
    const container = document.createElement("input");
    container.style.outline = "1px solid gray";
    container.style.padding = "2px";
    container.style.marginTop = "2px";
    container.type = "file";
    container.style.width = "200px";
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";

    container.onchange = () => {
        set(
            container.files[0], 
            shotItem ? shotItem.type : undefined, 
            shotItem ? shotItem.align : undefined);
    }

    return container;
}

function Type(set) {
    const container = document.createElement("div");
    container.style.display = "block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Type: ";

    const input = document.createElement("select");
    input.className = "shotType";
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
    input.className = "alignSlider";
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
    outside.className = "outside";
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
    container.style.display = "block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Touch: ";

    const button = document.createElement("button");
    button.innerHTML = "Set";

    const value = document.createElement("span");
    value.className = "touch";

    container.appendChild(button);
    container.appendChild(value);

    button.onclick = () => {
        value.innerHTML = setTouch();
    }
    
    return container;
}

function TextItem(srcText = "", number = 0, _color = "#ffffff", placeholder = "type text...") {
    const input = document.createElement("input");
    input.className = "srcText";
    input.style.display = "block";
    input.style.position = "relative";
    input.type = "text";
    input.value = srcText;
    input.placeholder = placeholder;

    const fontSize = document.createElement("input");
    fontSize.className = "textNum";
    fontSize.style.display = "inline-block";
    fontSize.style.position = "relative";
    fontSize.type = "number";
    fontSize.value = number;
    fontSize.style.width = "35px";

    const color = document.createElement("input");
    color.className = "textColor";
    color.style.display = "inline-block";
    color.style.position = "relative";
    color.type = "color";
    color.value = _color;

    this.values = [srcText, +number, _color];
    this.getSrcText = () => {
        return input;
    }
    this.getNum = () => {
        return fontSize;
    }
    this.getColor = () => {
        return color;
    }

    return this;
}

function TextInput(set) {
    const container = document.createElement("form");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Text: ";

    const textItem = new TextItem();

    const button = document.createElement("button");
    button.innerHTML = "Add";

    container.appendChild(textItem.getSrcText());
    container.appendChild(textItem.getNum());
    container.appendChild(textItem.getColor());
    container.appendChild(button);
    
    container.onsubmit = (e) => {
        e.preventDefault();
        set(textItem.getSrcText().value, textItem.getNum().value, textItem.getColor().value);
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
    input.className = "duration";
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

function InputItem(rmv, getCoordinate, instance) {
    let textItem;
    if(instance instanceof InputItem) {
        this.pos = instance.pos;
        textItem = new TextItem(
            instance.text[0], 
            instance.text[1],
            instance.text[2]
        );

        this.text = textItem.values;
        this.typing = instance.typing;
        this.cursor = instance.cursor;
    } else {
        this.pos = [0,0];
        textItem = new TextItem("", 22, "#ffffff", "type input...");
        this.text = textItem.values;
        this.typing = false;
        this.cursor = false;
    }

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

    const typing = document.createElement("input");
    const cursor = document.createElement("input");
    typing.type = cursor.type = "checkbox";
    typing.checked = this.typing;
    cursor.checked = this.cursor;

    const button = document.createElement("button");
    button.innerHTML = "Set";

    form.appendChild(textItem.getSrcText());
    form.appendChild(textItem.getNum());
    form.appendChild(textItem.getColor());
    form.appendChild(typing);
    form.appendChild(cursor);
    form.appendChild(button);
    
    container.appendChild(setPos);
    container.appendChild(pos);
    container.appendChild(form);
    
    form.onsubmit = (e) => {
        e.preventDefault();
        if(textItem.getSrcText().value == "") {
            rmv(this);
            container.style.display = "none";
            return;
        }
        this.setText(textItem.getSrcText().value, textItem.getNum().value, textItem.getColor().value);
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
    container.style.display = "block";
    container.style.width = "280px";
    container.style.position = "relative";
    container.style.marginBottom = "10px";

    const header = document.createElement("div");
    header.innerHTML = "Inputs: ";

    const button = document.createElement("button");
    button.innerHTML = "Add";

    const scrollBar = document.createElement("div");
    scrollBar.className = "scrollBar";
    scrollBar.style.position = "relative";
    scrollBar.style.overflow = "auto";
    scrollBar.style.whiteSpace = "nowrap";

    header.appendChild(button);

    button.onclick = () => {
        let newItem = new InputItem(rmv, getCoordinate);
        add(newItem);
        scrollBar.appendChild(newItem.getContainer());
    }

    container.appendChild(header);
    container.appendChild(scrollBar);

    return container;
}

function makeSelectable(container){
    container.style.position = "relative";
    container.style.outlineWidth = "3px";
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

function ShotItem(setImg, timeline, getCoordinate, updateIndexes, instance) {
    let file = FileInput(setImg, this);
    
    this.getFile = () => {
        return file;
    }
    
    let selected = false;
    
    this.isSelected = () => {
        return selected;
    }

    this.setDuration = (value) => {
        if(!value) this.duration = +document.querySelector("audio").currentTime.toFixed(1);
        else this.duration = +value;
        return this.duration;
    }
    this.setType = (_type) => {
        this.type = +_type;
        setImg(file.files[0], this.type, this.align);
    }
    this.setAlign = (_align) => {
        this.align = +_align;
        setImg(file.files[0], this.type, this.align);
    }
    this.setTouch = () => {
        this.touch = getCoordinate();
        return this.touch;
    }
    //let textitem;
    this.setText = (_text, _num, _color) => {
        if(_text === "") delete this.text;
        else {
            //textitem = new TextItem(_text, _num, _color);
            this.text = [_text, _num, _color];
        }
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

    let terminate = false;
    this.select = (manual = true) => {
        for(item of timeline.shots) {
            if(item.isSelected() && !terminate && item !== this) {
                terminate = true;
                item.select();
            }
        }
        if(selected) container.style.outlineStyle = "none";
        else {
            container.style.outlineStyle = "solid";
            setImg(file.files[0], this.type, this.align);
        }
        selected = !selected;
        terminate = false;
    }

    this.setIndex = () => {
        container.querySelector(".index").innerHTML = timeline.shots.indexOf(this) + 1;
    }

    setTimeout(() => {
        this.setIndex();
    }, 0); // to execute after the construction of this object
    
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.margin = "10px";
    container.style.padding = "10px";
    container.style.backgroundColor = "#a1a1a1";
    container.className = "shot";
    container.style.width = "280px";

    makeSelectable(container);

    const x = document.createElement("button");
    x.className = "clearShot";
    x.innerHTML = 'X';
    x.style.position = "absolute";
    x.style.right = "10px";
    
    x.onclick = () => {
        timeline.rmvShot(this);
        container.style.display = "none";
        updateIndexes();
    }
    
    const clickArea = selectArea();
    clickArea.className = "clickArea";
    clickArea.style.backgroundColor = "#aaa";
    container.appendChild(clickArea);
    
    clickArea.onclick = () => {
        this.select();
    }
    
    const index = document.createElement("h3");
    index.className = "index";
    index.style.display = "inline";
    index.style.marginRight = "10px";
    index.style.position = "relative";
    
    this.duration = +document.querySelector("audio").currentTime.toFixed(1);
    
    container.appendChild(x);
    container.appendChild(index);
    container.appendChild(file);
    container.appendChild(Type(this.setType));
    container.appendChild(Align(this.setAlign));
    container.appendChild(Touch(this.setTouch));
    container.appendChild(TextInput(this.setText));
    const inputs = Inputs(this.addInput, this.rmvInput, getCoordinate);
    container.appendChild(inputs);
    container.appendChild(Duration(this.setDuration, this.duration));

    this.getContainer = () => {
        return container;
    }

    if(instance instanceof ShotItem) {
        this.type = instance.type;
        this.align = instance.align;
        if(instance.touch) this.touch = [instance.touch[0], instance.touch[1]];
        this.text = instance.text;
        if(instance.input) {
            for(item of instance.input) {
                let newItem = new InputItem(this.rmvInput, getCoordinate, item)
                this.addInput(newItem);
                inputs.querySelector(".scrollBar").appendChild(newItem.getContainer());
            }
        }
        file.files = instance.getFile().files;
    } else {
        this.type = 1;
        this.align = 0;
    }

    return this;
}

function Shots(setImg, timeline, addJSONevents, getCoordinate) {
    const container = document.createElement("div");

    const header = document.createElement("h3");
    header.innerHTML = "Shots: ";
    header.style.color = "#ffffff";

    const scrollBar = document.createElement("div");
    scrollBar.className = "shotsScroll";
    //scrollBar.style.transition = "2s";
    scrollBar.style.position = "relative";
    scrollBar.style.overflow = "auto";
    scrollBar.style.whiteSpace = "nowrap";

    const button = document.createElement("button");
    button.innerHTML = "<h3>Add</h3>";
    button.style.padding = "0px 20px";
    button.style.margin = "0px 10px";
    button.style.backgroundColor = "#555";
    button.style.color = "white";
    button.style.textEmphasisColor = "#000";

    header.appendChild(button);

    function updateIndexes() {
        for(item of timeline.shots) {
            item.setIndex();
        }
    }

    button.onclick = () => {
        let newItem;
        if(timeline.shots.length) {
            let copyItem;
            for(item of timeline.shots) {
                if(item.isSelected()) {
                    copyItem = item;
                }
            }
            if(!copyItem) copyItem = timeline.shots[timeline.shots.length - 1];
            newItem = new ShotItem(setImg, timeline, getCoordinate, updateIndexes, copyItem);
            newItem.getContainer().querySelector(".shotType").value = copyItem.getContainer().querySelector(".shotType").value;
            newItem.getContainer().querySelector(".alignSlider").value = copyItem.getContainer().querySelector(".alignSlider").value;
            newItem.getContainer().querySelector(".outside").checked = copyItem.getContainer().querySelector(".outside").checked;
            newItem.getContainer().querySelector(".touch").innerHTML = copyItem.getContainer().querySelector(".touch").innerHTML;
            newItem.getContainer().querySelector(".srcText").value = copyItem.getContainer().querySelector(".srcText").value;
            newItem.getContainer().querySelector(".textNum").value = copyItem.getContainer().querySelector(".textNum").value;
            newItem.getContainer().querySelector(".textColor").value = copyItem.getContainer().querySelector(".textColor").value;
        } else {
            newItem = new ShotItem(setImg, timeline, getCoordinate, updateIndexes);
        }

        timeline.addShot(newItem);
        addJSONevents(newItem);
        scrollBar.appendChild(newItem.getContainer());
        scrollBar.scrollTo(scrollBar.scrollWidth, 0);
    }

    container.appendChild(header);
    container.appendChild(scrollBar);

    return container;
}

function AudioItem() {
    const container = new Audio();
    container.controls = true;
    container.style.width = "95%";
    container.style.display = "block";
    container.style.colo = "#ccc";
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

function VoiceOver(shots, getCurrentShot, workingAreaDuration) {
    const container = document.createElement("div");
    const item = new AudioItem();
    const file = FileInput(item.set);
    let selectShotID;
    let scrollID;

    let prevIndex;
    function trackPlay() {
        let currentShotIndex = getCurrentShot(item.getContainer().currentTime, true);
        if(currentShotIndex === -1 || currentShotIndex === prevIndex && currentShotIndex != 0) {
            //debugger;
            return
        }
        prevIndex = currentShotIndex;
        let playedPercent = currentShotIndex / (shots.length - 1);
        let timelineWidth = container.parentNode.querySelector(".shotsScroll").scrollWidth;
        let width = container.parentNode.querySelector(".shotsScroll").getBoundingClientRect().width;
        let amount = playedPercent * timelineWidth - width * 2 / 7;
        container.parentNode.querySelector(".shotsScroll").scrollTo(amount, 0);
    }

    item.getContainer().onplay = () => {
        trackPlay();
        selectShotID = setInterval(() => {
            let currentShot = getCurrentShot(item.getContainer().currentTime);
            if(currentShot) currentShot.select();
        },200);
        scrollID = setInterval(() => {
            trackPlay();
        },2000);
    }
    item.getContainer().onpause = () => {
        clearInterval(selectShotID);
        clearInterval(scrollID);
    }

    container.appendChild(file);
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

    let workingAreaDuration = () => {
        return this.shots[this.shots.length - 1] ? this.shots[this.shots.length - 1].duration : 0;
    }

    let getCurrentShot = (time, getindex = false) => {
        //debugger;
        let arr = this.shots;
        for(i in arr) {
            let start = +i ? arr[i - 1].duration : 0;
            let end = arr[i].duration;

            if(time >= start && time < end) {
                return getindex ? i : arr[i];
            }
        }
        if(getindex) return -1;
    }

    const container = document.createElement("div");
    container.className = "timeline";

    const JSONconatiner = document.createElement("div");

    JSONconatiner.style.margin = "10px";
    JSONconatiner.style.overflow = "auto";
    JSONconatiner.style.backgroundColor = "rgb(255,255,255,0.8)";

    function addJSONevents(shotItem) {
        JSONconatiner.innerHTML = JSON.stringify(data);
        shotItem.getContainer().onclick = 
        shotItem.getContainer().onchange = 
        shotItem.getContainer().onsubmit = () => {
            JSONconatiner.innerHTML = JSON.stringify(data);
        }
    }

    container.appendChild(VoiceOver(this.shots, getCurrentShot, workingAreaDuration));
    container.appendChild(Shots(setImg, this, addJSONevents, getCoordinate));
    container.appendChild(JSONconatiner);
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

function Display(set, imgWidth = 300) {
    const container = document.createElement("div");
    container.style.overflow = "auto";
    container.style.height = "400px";
    const wrapper = document.createElement("div");
    wrapper.style.minHeight = "100px";
    wrapper.style.outline = "2px gray solid";
    wrapper.style.overflow = "hidden";

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
    wrapper.appendChild(display);
    zoom.appendChild(minus);
    zoom.appendChild(plus);
    wrapper.appendChild(zoom);
    container.appendChild(wrapper);

    return this;
}

function App() {
    const root = document.querySelector("body");
    root.style.backgroundColor = "#333333";

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
