function FileInput(set) {
    
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
        set(container.files[0]);
    }

    return container;
}

function ScreenInput(set, shotItem) {
    
    const container = document.createElement("input");
    container.style.outline = "1px solid gray";
    container.style.padding = "2px";
    container.style.marginTop = "2px";
    container.type = "file";
    container.style.width = "200px";
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";

    this.sendData = () => {
        fetch("/screen", {
            method: "post",
            headers: {
                "content-type": "image/jpeg",
                "name" : shotItem.getindex()
            },
            body: container.files[0]
        });
    }
    
    container.onchange = () => {
        this.sendData();
        set(
            container.files[0],
            shotItem.type = 1, 
            shotItem.align = 0
        );
    }
    
    this.getContainer = () => container;
}

function Type(set) {
    const container = document.createElement("div");
    container.style.display = "block";
    container.style.width = "40%";
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
    }

    this.setValue = (value) => {
        input.value = value;
        return value;
    }

    this.getContainer = () => {
        return container;
    }
}

function Align(set) {
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Align: ";
    
    const centerizeButton = document.createElement("button");
    centerizeButton.style.margin = "2px 20px";

    centerizeButton.innerHTML = "centerize";
    
    const input = document.createElement("input");
    input.className = "alignSlider";
    input.type = "range";
    input.style.margin = "0px 10px";
    
    this.centerize = () => {
        set(0);
        input.value = 50;
    }

    centerizeButton.onclick = () => {
        this.centerize();
    }
    
    const positive = document.createElement("label");
    positive.id = "positive";
    const negative = document.createElement("label");
    negative.id = "negative";
    positive.style.width = negative.style.width = "50px"; // doesnt't work
    
    this.setHorizontal = () => {
        positive.innerHTML = "Right";
        negative.innerHTML = "Left";
    }
    this.setVertical = () => {
        positive.innerHTML = "Top";
        negative.innerHTML = "Bottop";
    }
    this.setHorizontal();

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

    container.appendChild(centerizeButton);
    container.appendChild(range);

    let percentToUnit = (inputValue) => {
        return inputValue / 50 - 1;
    }
    let unitToPercent = (unit) => {
        return (unit + 1) * 50;
    }
    
    input.onchange = outside.onchange = () => {
        let alignControl = outside.checked ? 3 : 1;
        set( alignControl * percentToUnit(input.value).toFixed(1) );
    }

    this.getContainer = () => {
        return container;
    }

    this.getValue = () => {
        return input.value;
    }

    this.isChecked = () => {
        return outside.checked;
    }

    this.setValue = (value, checked) => {
        input.value = value;
        outside.checked = checked;
        return input.value;
    }

    this.setValueByUnit = (unit) => {
        input.value = unitToPercent(unit);
        outside.checked = Math.abs(unit) > 1;
    }
}

function Touch(setTouch, getCoordinate) {
    const container = document.createElement("div");
    container.style.display = "block";
    container.style.position = "relative";
    container.style.width = "60%";
    container.style.marginBottom = "10px";
    container.innerHTML = "Touch: ";

    const button = document.createElement("button");
    button.innerHTML = "Set";

    const rmv = document.createElement("button");
    rmv.innerHTML = "Remove";

    const value = document.createElement("span");
    value.className = "touch";

    container.appendChild(button);
    container.appendChild(rmv);
    container.appendChild(value);

    button.onclick = () => {
        value.innerHTML = setTouch(...getCoordinate());
    }

    rmv.onclick = () => {
        value.innerHTML = setTouch();
    }

    this.setValue = (x, y) => {
        value.innerHTML = [x, y];
        return [x, y];
    }

    this.getContainer = () => {
        return container;
    }
}

function TextKernel(srcText = "", _color = "#ffffff", placeholder = "type text...") {
    const input = document.createElement("input");
    input.className = "srcText";
    input.style.display = "block";
    input.style.position = "relative";
    input.type = "text";
    input.value = srcText;
    input.placeholder = placeholder;

    const color = document.createElement("input");
    color.className = "textColor";
    color.style.display = "inline-block";
    color.style.position = "relative";
    color.type = "color";
    color.value = _color;

    this.values = [srcText, _color];

    this.getElements = () => {
        return [input, color]
    }
}

function TextItem(srcText = "", animN = 0, _color = "#ffffff", set = () => undefined) {
    TextKernel.call(this, srcText, _color);
    const container = document.createElement("div");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Text: ";

    const animation = document.createElement("select");
    animation.innerHTML = `
        <option value=0>set</option>
        <option value=1>Anim 1</option>
    `;

    const [input, color] = this.getElements();
    container.appendChild(input);
    container.appendChild(animation);
    container.appendChild(color);

    container.onchange = () => {
        set(input.value, animation.value, color.value);
    }
    
    this.getContainer = () => {
        return container;
    }
    
    this.values = [srcText, +animN, _color];

    this.setElements = (srcText, animN, _color) => {
        input.value = srcText;
        animation.value = animN;
        color.value = _color;
        return [srcText, animN, _color];
    }

    return this;
}

function Duration(set, init) {
    const container = document.createElement("form");
    //container.style.display = "inline-block";
    container.style.width = "150px";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Duration: ";

    const input = document.createElement("input");
    input.className = "duration";
    input.type = "number";
    input.value = init;
    input.step = 0.1;
    input.style.width = "40px"

    const button = document.createElement("button");
    button.innerHTML = "Set";

    container.appendChild(input);
    container.appendChild(button);

    container.setDuration = (value) => {
        input.value = value;
    }
    
    container.onsubmit = (e) => {
        e.preventDefault();
        input.value = set(input.value);
    }

    return container;
}

function InputTextItem(srcText = "", fontSize = 22, _color = "#ffffff") {
    TextKernel.call(this, srcText, _color, "Type input...");
    
    const size = document.createElement("input");
    size.className = "textNum";
    size.style.display = "inline-block";
    size.style.position = "relative";
    size.type = "number";
    size.value = fontSize;
    size.style.width = "45px";
    size.step = ".1";

    this.getSize = () => {
        return size;
    }

    const container = document.createElement("span");
    const [input, color] = this.getElements();
    container.appendChild(input);
    container.appendChild(size);
    container.appendChild(color);

    this.values = [srcText, +fontSize, _color];

    this.getContainer = () => {
        return container;
    }
}

function InputItem(rmv, getCoordinate, instance) {
    let textItem;
    if(instance instanceof InputItem) {
        this.pos = [instance.pos[0], instance.pos[1]];
        textItem = new InputTextItem(...instance.text);

        this.text = textItem.values;
        this.typing = instance.typing;
        this.cursor = instance.cursor;
    } else {
        textItem = new InputTextItem();
        this.text = textItem.values;
        this.typing = false;
        this.cursor = false;
        this.pos = [0,0];
    }

    this.setX = (x) => {
        this.pos[0] = +x;
        return x;
    }

    this.setY = (y) => {
        this.pos[1] = +y;
        return y;
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
    
    const pos = document.createElement("span");
    pos.style.display = "block";
    const inputX = document.createElement("input");
    const inputY = document.createElement("input");
    inputX.type = inputY.type = "number";
    inputX.style.width = inputY.style.width = "40px";
    inputX.step = inputY.step = ".1";
    inputX.value = this.pos[0];
    inputY.value = this.pos[1];
    inputX.onchange = () => {
        this.pos[0] = +inputX.value;
    }
    inputY.onchange = () => {
        this.pos[1] = +inputY.value;
    }

    this.setPos = (x, y) => {
        inputX.value = this.setX(x);
        inputY.value = this.setY(y);
        
        return this.pos;
    }

    const setPos = document.createElement("button");
    setPos.innerHTML = "Set Position";
    setPos.onclick = () => {
        this.setPos(...this.setPos(...getCoordinate()));
    }

    pos.appendChild(inputX);
    pos.appendChild(inputY);
    pos.appendChild(setPos);

    const form = document.createElement("form");

    const typing = document.createElement("input");
    const cursor = document.createElement("input");
    typing.type = cursor.type = "checkbox";
    typing.checked = this.typing;
    cursor.checked = this.cursor;

    const remove = document.createElement("button");
    remove.innerHTML = "remove";
    remove.onclick = () => {
        rmv(this);
        container.style.display = "none";
    }

    form.appendChild(textItem.getContainer());
    form.appendChild(typing);
    form.appendChild(cursor);
    
    container.appendChild(pos);
    container.appendChild(form);
    container.appendChild(remove);

    const [srcText, color] = textItem.getElements();
    const fontSize = textItem.getSize();
    
    form.childNodes.forEach((element) => {
        element.onchange = () => {
            this.setText(srcText.value, fontSize.value, color.value);
            this.setCursor(cursor.checked);
            this.setTyping(typing.checked);
        }
    });

    this.getTextAttributes = () => {
        return [srcText, fontSize, color];
    }

    this.getContainer = () => {
        return container;
    }

    return this;
}

function clickArea(x,y, click) {
    area = document.createElement("button");
    area.style.border = "none";

    area.style.position = "absolute";
    area.style.width = `calc(100% - ${x}px)`;
    area.style.height = `calc(100% - ${y}px)`;
    area.style.zIndex = 0;

    area.className = "area";
    area.style.backgroundColor = "#aaa";

    area.onclick = () => {
        click();
    }

    return area;
}

function Inputs(add, rmv, getCoordinate, thisShot) {
    const container = document.createElement("div");
    container.style.display = "block";
    container.style.width = "280px";
    container.style.position = "relative";
    container.style.marginBottom = "10px";

    container.onclick = () => {
        thisShot.select(true, false);
    }

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
        let lastItem = thisShot.input ? thisShot.input[thisShot.input.length - 1] : undefined;
        let newItem = new InputItem(rmv, getCoordinate, lastItem);
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

function ShotItem(display, timeline, getCoordinate, instance) {
    let file = new ScreenInput(display.setImg, this);

    // this.setImg = (link) => {
    //     file.getContainer().files[0] = URL.revokeObjectURL(link);
    // } canceled: can't set the input element a value through js

    const container = document.createElement("div");
    
    this.getFile = () => file;
    
    let selected = false;
    
    this.isSelected = () => {
        return selected;
    }
    
    this.setDuration = (value) => {
        if(!value) this.duration = +document.querySelector("audio").currentTime.toFixed(1);
        else this.duration = +value;
        return this.duration;
    }
    this.setAlign = (_align) => {
        this.align = +_align;
        display.setPos(this.align, this.type);
    }
    
    const align = new Align(this.setAlign);

    this.setType = (_type, manual = true) => {
        this.type = +_type;
        if (this.type === 1) {
            align.setHorizontal();
            if(manual){
                display.setPos(0, this.type);
                align.centerize();
            }
        } else {
            align.setVertical();
            display.setPos(this.align, this.type);
        }
        
    }
    this.setTouch = (x,y) => {
        if(x) {
            this.touch = [x, y];
            return this.touch;
        }
        delete this.touch;
        return "";
    }
    this.setText = (text, animN, _color) => {
        if(text === "") delete this.text;
        else {
            this.text = (new TextItem(text, animN, _color)).values;
        }
        display.setText(text, _color);
    }
    this.addInput = (_input) => {
        if(this.input === undefined) this.input = [];
        this.input.push(_input);
        //display.addInput(..._input.pos, _input.text[0]);
    }
    this.rmvInput = (_input) => {
        let index = this.input.indexOf(_input);
        this.input.splice(index, 1);
        if(this.input.length === 0) delete this.input;
        _input.getContainer().style.display = "none";
        display.rendInputs(this);
    }

    this.getindex = () => +timeline.shots.indexOf(this);

    this.select = (manual = true, unselectable = true) => {
        for(item of timeline.shots) {
            if(item.isSelected() && item !== this) {             
                item.select(false);
                break;
            }
        }
        if(selected && unselectable) container.style.outlineStyle = "none";
        else {
            container.style.outlineStyle = "solid";
            if(file.getContainer().files.length) display.setImg(file.getContainer().files[0]);
            else {
                try {
                    display.setImg(`tutorial_template/(Footage)/shots/${this.getindex()}.jpeg`);
                    
                } catch {
                    
                    display.setImg();
                }
            } 

            display.rendInputs(this);
            display.setPos(this.align, this.type);
            if (this.text) display.setText(this.text[0], this.text[2]);
        }
        selected = unselectable ? !selected : true;

        //if(!selected) display.setImg(); //clear

        if(this.duration && manual) document.querySelector("audio").currentTime = this.duration;
    }
    
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

    function updateIndexes() {
        for(item of timeline.shots) {
            item.setIndex();
        }
    }

    function updateImgs() {
        for(item of timeline.shots) {
            if(item.getFile().getContainer().files.length) item.getFile().sendData();
        }
    }
    
    x.onclick = () => {
        timeline.rmvShot(this);
        container.style.display = "none";
        updateIndexes();
        updateImgs();
    }
    
    const selectArea = clickArea(20,20);
    
    selectArea.onclick = () => {
        this.select();
    }
    container.appendChild(selectArea);
    
    const index = document.createElement("h3");
    index.className = "index";
    index.style.display = "inline";
    index.style.marginRight = "10px";
    index.style.position = "relative";
    
    this.setIndex = () => {
        index.innerHTML = this.getindex() + 1;
    }

    setTimeout(() => {
        this.setIndex();
    }, 0); // to execute after the construction of this object
    
    container.appendChild(x);
    container.appendChild(index);
    container.appendChild(file.getContainer());
    
    const type = new Type(this.setType);
    container.appendChild(type.getContainer());

    container.appendChild(align.getContainer());

    const touch = new Touch(this.setTouch, getCoordinate);
    container.appendChild(touch.getContainer());
    
    const text = new TextItem("", 0, "#ffffff", this.setText);
    container.appendChild(text.getContainer());
    
    const inputs = Inputs(this.addInput, this.rmvInput, getCoordinate, this);
    container.appendChild(inputs);
    
    this.getDuration = () => {
        return duration;
    }

    this.getAlign = () => {
        return [
            align.getValue(),
            align.isChecked()
        ]
    }

    this.getContainer = () => {
        return container;
    }
    
    inputs.childNodes.forEach( item => {
        item.onchange = () => {
            display.rendInputs(this);
        }
    })
    
    if( instance ) {
        if( instance instanceof ShotItem ) {
            file.getContainer().files = instance.getFile().getContainer().files;
            if(file.getContainer().files.length) setTimeout(file.sendData, 0);
            align.setValue(...instance.getAlign());
        } else {
            align.setValueByUnit(instance.align);
            this.duration = instance.duration;
        }
        this.setAlign(instance.align);
        this.setType(type.setValue(instance.type), false);
        if(instance.touch) this.setTouch(...touch.setValue(...instance.touch));
        
        if(instance.text) this.setText(...text.setElements(...instance.text));
        
        if(instance.input) {
            for(item of instance.input) {
                let newItem = new InputItem(this.rmvInput, getCoordinate, item)
                this.addInput(newItem);
                inputs.querySelector(".scrollBar").appendChild(newItem.getContainer());
            }
        }
    } else {
        this.type = 1;
        this.align = 0;
    }
    
    const duration = Duration(this.setDuration, this.duration);
    container.appendChild(duration);
    
    return this;
}

function Shots(display, timeline, getCoordinate, getData) {
    const container = document.createElement("div");

    const header = document.createElement("h3");
    header.innerHTML = "Shots: ";
    header.style.margin = "10px 0 0";
    header.style.color = "#ffffff";
    
    const button = document.createElement("button");
    button.innerHTML = "<h3>Add</h3>";
    button.style.padding = "0px 20px";
    button.style.margin = "0px 10px";
    button.style.backgroundColor = "#555";
    button.style.color = "white";
    button.style.textEmphasisColor = "#000";

    const selectMockup = document.createElement("select");
    selectMockup.innerHTML = `
        <option value=1>Iphone</option>
        <option value=2>Samsung</option>
    `
    timeline.rendMockup(selectMockup);

    selectMockup.onchange = () => {
        timeline.setMockup(selectMockup.value);
    }

    const background = FileInput(display.setBackground);
    background.style.name = "choose background";
    background.style.margin = "0 10px";
    background.style.width = "130px";
    
    header.appendChild(button);
    header.appendChild(selectMockup);
    header.appendChild(background);

    const scrollBar = document.createElement("div");
    scrollBar.className = "shotsScroll";
    scrollBar.style.position = "relative";
    scrollBar.style.overflow = "auto";
    scrollBar.style.whiteSpace = "nowrap";

    getData(timeline.render, scrollBar);

    button.onclick = () => {
        let newItem;
        if(timeline.shots.length) {
            let copyItem;
            for(item of timeline.shots) {
                if(item.isSelected()) {
                    copyItem = item;
                    break;
                }
                copyItem = timeline.shots[timeline.shots.length - 1];
            }
            newItem = new ShotItem(display, timeline, getCoordinate, copyItem);
            timeline.addShot(newItem);
            let thisIndex = timeline.shots.indexOf(newItem);
            timeline.shots[thisIndex - 1].getDuration().setDuration(
                timeline.shots[thisIndex - 1].setDuration(+document.querySelector("audio").currentTime.toFixed(1))
            )
        } else {
            newItem = new ShotItem(display, timeline, getCoordinate);
            timeline.addShot(newItem);
        }

        scrollBar.appendChild(newItem.getContainer());
        scrollBar.scrollTo({
            left: scrollBar.scrollWidth,
            top: 0, 
            behavior: 'smooth'
        });
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

function VoiceOver(shots, getCurrentShot) {
    const container = document.createElement("div");
    const item = new AudioItem();
    const file = FileInput(item.set);
    let selectShotID;
    let scrollID;

    let prevIndex;
    function trackPlay() {
        let currentShotIndex = getCurrentShot(item.getContainer().currentTime, true);
        if(currentShotIndex === -1 || currentShotIndex === prevIndex ) {//&& currentShotIndex != 0
            return
        }
        prevIndex = currentShotIndex;
        let playedPercent = currentShotIndex / shots.length;
        let timelineWidth = container.parentNode.querySelector(".shotsScroll").scrollWidth;
        let shotWidth = timelineWidth / shots.length;
        let amount = playedPercent * timelineWidth - (window.innerWidth-16 - shotWidth)/2;
        container.parentNode.querySelector(".shotsScroll").scrollTo({
            left: amount,
            top: 0, 
            behavior: 'smooth'
        });
    }
    
    item.getContainer().onplay = () => {
        trackPlay();
        selectShotID = setInterval(() => {
            let currentShot = getCurrentShot(item.getContainer().currentTime);
            if(currentShot) currentShot.select(false);
            if(!currentShot.duration) {
                clearInterval(selectShotID);
                clearInterval(scrollID);
                currentShot.select(false, false);
            }
        },200);
        scrollID = setInterval(() => 
        {   
            trackPlay();
        },200);
    }

    item.getContainer().onpause = () => {
        clearInterval(selectShotID);
        clearInterval(scrollID);
    }

    container.appendChild(file);
    container.appendChild(item.getContainer());
    
    return container;
}

function Timeline(display, sendData, getData, getCoordinate, data) {
    this.shots = [];

    this.setMockup = (index) => {
        data.mockup = +index;
        display.rendMockup(index);
        sendData();
        return data.mockup;
    }

    this.rendMockup = (select) => {
        fetch("/data").then((resp) => resp.json()).then((resp) => {
            select.value = data.mockup = resp.mockup;
            display.rendMockup(resp.mockup);
        });
    }

    this.addShot = (shotItem) => {
        this.shots.push(shotItem);
        return this.shots.length;
    }
    this.rmvShot = (shotItem) => {
        let index = this.shots.indexOf(shotItem);
        this.shots.splice(index, 1);
        return this.shots.length;
    }
    this.render = (shots, container) => {
        shots.forEach((shot) => {
            let newItem = new ShotItem(display, this, getCoordinate, shot);
            this.addShot(newItem);
            container.appendChild(newItem.getContainer());
        });
        return this.shots;
    }

    let getCurrentShot = (time, getindex = false) => {
        let arr = this.shots;
        for(i in arr) {
            let start = +i ? arr[i - 1].duration : 0;
            let end = arr[i].duration ? arr[i].duration : Infinity;

            if(time >= start && time < end) {
                return getindex ? i : arr[i];
            }
        }
        
        if(getindex) return -1;
    }

    const container = document.createElement("div");
    container.className = "timeline";


    container.onclick = container.onchange = () => {
        sendData();
    }

    container.appendChild(VoiceOver(this.shots, getCurrentShot));
    container.appendChild(
        Shots(display, this, getCoordinate, getData)
    );
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

function Display(set, scale = 1) {
    const container = document.createElement("div");
    container.className = "display";
    container.position = "relative";
    container.style.overflow = "auto";
    container.style.minHeight = "400px";
    container.style.maxHeight = "700px";
    const composition = document.createElement("div");
    composition.style.display = "flex";
    composition.style.margin = "20px auto";
    composition.style.width = "640px";
    composition.style.height = "360px";
    composition.style.outline = "2px gray solid";
    composition.style.overflow = "hidden";
    
    const zoomIcons = document.createElement("div");
    zoomIcons.style.position = "absolute";
    zoomIcons.style.top = 0;
    
    const plus = document.createElement("button");
    const minus = document.createElement("button");
    plus.style.padding = minus.style.padding = "0px 18px";
    plus.style.margin = minus.style.margin = "5px";
    plus.innerHTML = "<h3>+</h3>";
    minus.innerHTML = "<h3>-</h3>";
    
    const img = document.createElement("img");
    img.style.width = "100%";
    img.style.borderRadius = "3%";

    const mockupImg = document.createElement("img");
    mockupImg.style.position = "absolute";

    this.rendMockup = (index) => {
        switch (+index) {
            case 1: mockupImg.src = "tutorial_template/(Footage)/mockups/mockup1.png";
                mockupImg.style.left = "-5%";
                mockupImg.style.top = "-1.9%";
                mockupImg.style.width = "110%";
                break;
            case 2: mockupImg.src = "tutorial_template/(Footage)/mockups/galaxyS20.png";
                mockupImg.style.left = "-1.85%";
                mockupImg.style.top = "-1.8%";
                mockupImg.style.width = "104%";
                break;
        }
    }

    this.setBackground = (file) => {
        if(file) {
            composition.style.backgroundImage = `url(${ URL.createObjectURL(file)})`;
            composition.style.backgroundSize = "cover";
            composition.style.backgroundPosition = "center";
        } else {
            composition.style.backgroundImage = "url('alpha.png')";
            composition.style.backgroundSize = "25px 25px";
        }
    }
    this.setBackground();
    
    const mockup = document.createElement("div");
    mockup.className = "mockup";

    function mouse_position(offset = [0,0]) {
        const width = mockup.getBoundingClientRect().width;
        const height = mockup.getBoundingClientRect().height;
        const [x,y] = [
            event.clientX - offset[0], 
            event.clientY - offset[1]
        ];
        return [
            Math.round(x * 100 / width),
            Math.round(y * 100 / height)
        ]
    }
    
    mockup.onclick = (e) => {
        let rect = e.target.getBoundingClientRect();
        set(...mouse_position([rect.left, rect.top]));
    }
    
    mockup.style.margin = "6% auto";
    mockup.style.width = "20.5%";
    mockup.style.height = "79%";
    mockup.style.transform = "scale(1)";
    mockup.style.position = "relative";
    
    this.setImg = (file) => {
        if(typeof file === "string") img.src = file;
        else if(file) img.src = URL.createObjectURL(file);
        else img.src = "";
    }
    
    const inputs = document.createElement("div");
    inputs.style.position = "absolute";
    inputs.style.transformOrigin = "0 0";
    inputs.style.top = 0;
    inputs.style.left = 0;
    inputs.style.width = "132px";
    inputs.style.height = "284px";

    this.rendInputs = (shotItem) => {
        inputs.innerHTML = "";
        if(shotItem.input) {
            const rect = inputs.getBoundingClientRect();
            shotItem.input.forEach(item => {
                const inputItem = document.createElement("div");
                inputItem.style.position = "absolute";
                inputItem.style.left = (item.pos[0] / 100)*132 + "px";
                inputItem.style.top = (item.pos[1] / 100)*284 + "px";

                inputItem.innerHTML = item.getTextAttributes()[0].value;
                inputItem.style.fontSize = item.getTextAttributes()[1].value + "px";
                inputItem.style.color = item.getTextAttributes()[2].value;
                inputs.appendChild(inputItem);
            });
        }
    }
    
    let zoom = (amount = 0) => {
        scale += amount;
        composition.style.width = 640 * scale + "px";
        composition.style.height = 360 * scale + "px";
        const rectComp = composition.getBoundingClientRect();
        const rectCont = container.getBoundingClientRect();
        
        container.scrollTo(
            (rectComp.width - rectCont.width)/2, 
            (rectComp.height - rectCont.height)/2
        );

        inputs.style.transform = `scale(${scale})`;
    }

    plus.onclick = () => {
        zoom(.2);
    }
    
    minus.onclick = () => {
        zoom(-0.2);
    }
    
    this.getContainer = () => {
        return container;
    } 
    
    const text = document.createElement("div");
    const srcText = document.createElement("h1");
    text.appendChild(srcText);
    text.style.display = "flex";
    text.style.textAlign = "center";
    text.style.alignItems = "center";

    this.setText = (src, color) => {
        srcText.innerHTML = src;
        srcText.style.width = "100%";
        srcText.style.color = color;
    }

    function alignMockup(a) {
        a = Math.abs(a);
        let differernce = (100 - 20.5)/2 - 15;
        mockup.style.margin = `6% ${(1 - a) * differernce + 15}%`;
        text.style.display = (a < 1) ? "none" : "flex";
        text.style.width = `${100 - 3*15 - 20.5}%`;
        text.style.margin = `6% 0%`;
    }

    alignMockup(0);

    this.setPos = (align = 0, shotType = 1) => {
        
        if(shotType === 1) {
            mockup.style.transform = `scale(1)`; //reset
            alignMockup(align);
            composition.style.flexDirection = (align < 0) ? "row" : "row-reverse";
        } else {
            text.style.display = "none";
            mockup.style.margin = "auto";
            mockup.style.transform = `scale(${1 + (shotType - 1) / 2})`;
            mockup.style.transformOrigin = `50% ${(1 - align) * 50}%`;
        }  
    }

    mockup.appendChild(img);
    mockup.appendChild(mockupImg);
    mockup.appendChild(inputs);
    composition.appendChild(mockup);
    composition.appendChild(text);
    zoomIcons.appendChild(minus);
    zoomIcons.appendChild(plus);
    container.appendChild(composition);
    container.appendChild(zoomIcons);

    return this;
}

function App() {
    const root = document.querySelector("body");
    root.style.backgroundColor = "#333333";

    let data = {
        shot:[],
        mockup: 1
    }
    
    let sendData = () => {
        fetch("/data", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data, undefined, 4)
        });
    }

    let getData = (render, scrollBar) => {
        fetch("/data").then((resp) => resp.json()).then((resp) => {
            data.shot = render(resp.shot, scrollBar);
        });
    }

    let coordinate = new Coordinate();

    const display = new Display(coordinate.set);
    const timeline = new Timeline(display, sendData, getData, coordinate.get, data);
    
    data.shot = timeline.shots;

    
    root.appendChild(display.getContainer());
    root.appendChild(timeline.getContainer());
}

App();