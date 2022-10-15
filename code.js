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
            shotItem ? shotItem.align : undefined
        );
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
        let alignControl = outside.checked ? 3 : 1;
        set( (alignControl * (inputValue/50 - 1)).toFixed(1));
    }
    
    input.onchange = outside.onchange = () => {
        percentToUnit(input.value);
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
}

function Touch(setTouch, getCoordinate) {
    const container = document.createElement("div");
    container.style.display = "block";
    container.style.position = "relative";
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

function TextKernel(srcText = "", number = 0, _color = "#ffffff", placeholder = "type text...") {
    const input = document.createElement("input");
    input.className = "srcText";
    input.style.display = "block";
    input.style.position = "relative";
    input.type = "text";
    input.value = srcText;
    input.placeholder = placeholder;

    const numItem = document.createElement("input");
    numItem.className = "textNum";
    numItem.style.display = "inline-block";
    numItem.style.position = "relative";
    numItem.type = "number";
    numItem.value = number;
    numItem.style.width = "45px";

    const color = document.createElement("input");
    color.className = "textColor";
    color.style.display = "inline-block";
    color.style.position = "relative";
    color.type = "color";
    color.value = _color;

    this.values = [srcText, +number, _color];

    this.getElements = () => {
        return [input, numItem, color]
    }
}

function TextItem(srcText = "", animN = 0, _color = "#ffffff", set = () => undefined) {
    const container = document.createElement("form");
    container.style.display = "inline-block";
    container.style.position = "relative";
    container.style.marginBottom = "10px";
    container.innerHTML = "Text: ";

    const button = document.createElement("button");
    button.innerHTML = "Add";

    const kernel = new TextKernel(srcText, animN, _color);

    const [input, animation, color] = kernel.getElements();
    container.appendChild(input);
    container.appendChild(animation);
    container.appendChild(color);
    container.appendChild(button);

    container.onsubmit = (e) => {
        e.preventDefault();
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

function InputItem(rmv, getCoordinate, instance) {
    let textItem;
    if(instance instanceof InputItem) {
        this.pos = instance.pos;
        textItem = new TextKernel(...instance.text);

        this.text = textItem.values;
        this.typing = instance.typing;
        this.cursor = instance.cursor;
    } else {
        textItem = new TextKernel("", 22, "#ffffff", "type input...");
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

    const [srcText, fontSize, color] = textItem.getElements();
    fontSize.step = ".1";
    form.appendChild(srcText);
    form.appendChild(fontSize);
    form.appendChild(color);
    form.appendChild(typing);
    form.appendChild(cursor);
    
    container.appendChild(pos);
    container.appendChild(form);
    container.appendChild(remove);
    
    form.childNodes.forEach((element) => {
        element.onchange = () => {
            this.setText(srcText.value, fontSize.value, color.value);
            this.setCursor(cursor.checked);
            this.setTyping(typing.checked);
        }
    });

    this.getTextAttributes = () => {
        return textItem.getElements();
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

function ShotItem(display, timeline, getCoordinate, updateIndexes, instance) {
    let file = FileInput(display.setImg, this);

    const container = document.createElement("div");
    
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
    this.setAlign = (_align) => {
        this.align = +_align;
        display.setPos(this.align, this.type);
    }

    const align = new Align(this.setAlign);

    this.setType = (_type) => {
        this.type = +_type;
        if (this.type === 1) {
            display.setPos(0, this.type);
            align.centerize();
            align.setHorizontal();
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
            display.setImg(file.files[0]);
            display.rendInputs(this);
            display.setPos(this.align, this.type);
            display.setText(this.text[0], this.text[2])
        }
        selected = !selected;
        terminate = false;
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

    this.setIndex = () => {
        index.innerHTML = timeline.shots.indexOf(this) + 1;
    }

    setTimeout(() => {
        this.setIndex();
    }, 0); // to execute after the construction of this object
    
    container.appendChild(x);
    container.appendChild(index);
    container.appendChild(file);
    
    const type = new Type(this.setType);
    container.appendChild(type.getContainer());

    container.appendChild(align.getContainer());

    const touch = new Touch(this.setTouch, getCoordinate);
    container.appendChild(touch.getContainer());
    
    const text = new TextItem("", 0, "#ffffff", this.setText);
    container.appendChild(text.getContainer());
    
    const inputs = Inputs(this.addInput, this.rmvInput, getCoordinate);
    container.appendChild(inputs);
    
    const duration = Duration(this.setDuration, this.duration);
    container.appendChild(duration);
    
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
        item.onchange = item.onclick = () => {
            display.rendInputs(this);
        }
    })

    if(instance instanceof ShotItem) {
        file.files = instance.getFile().files;
        this.setType(type.setValue(instance.type));

        this.setAlign(instance.align);
        align.setValue(...instance.getAlign());

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
    return this;
}

function Shots(display, timeline, addJSONevents, getCoordinate) {
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

    const background = FileInput(display.setBackground);
    background.style.name = "choose background";
    background.style.margin = "0 10px";
    background.style.width = "130px";

    selectMockup.onchange = () => {
        display.setMockup(+selectMockup.value);
    }
    
    header.appendChild(button);
    header.appendChild(selectMockup);
    header.appendChild(background);

    const scrollBar = document.createElement("div");
    scrollBar.className = "shotsScroll";
    scrollBar.style.position = "relative";
    scrollBar.style.overflow = "auto";
    scrollBar.style.whiteSpace = "nowrap";
    
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
                    break;
                }
                copyItem = timeline.shots[timeline.shots.length - 1];
            }
            newItem = new ShotItem(display, timeline, getCoordinate, updateIndexes, copyItem);
            timeline.addShot(newItem);
            let thisIndex = timeline.shots.indexOf(newItem);
            timeline.shots[thisIndex - 1].getDuration().setDuration(
                timeline.shots[thisIndex - 1].setDuration(+document.querySelector("audio").currentTime.toFixed(1))
            )
        } else {
            newItem = new ShotItem(display, timeline, getCoordinate, updateIndexes);
            timeline.addShot(newItem);
        }

        addJSONevents(newItem);
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
            if(currentShot) currentShot.select();
        },200);
        scrollID = setInterval(() => {
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

function Timeline(display, data, getCoordinate) {
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

    let getCurrentShot = (time, getindex = false) => {
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
        setTimeout(() => {
            JSONconatiner.innerHTML = JSON.stringify(data);
        }, 0);
        shotItem.getContainer().onclick = 
        shotItem.getContainer().onchange = 
        shotItem.getContainer().onsubmit = () => {
            JSONconatiner.innerHTML = JSON.stringify(data);
        }
    }

    container.appendChild(VoiceOver(this.shots, getCurrentShot));
    container.appendChild(Shots(display, this, addJSONevents, getCoordinate));
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

    this.setMockup = (index) => {
        switch (index) {
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
    this.setMockup(1);

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
        if(file) img.src = URL.createObjectURL(file);
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

    let coordinate = new Coordinate();

    const display = new Display(coordinate.set);
    const timeline = new Timeline(display, data, coordinate.get);
    
    data.shot = timeline.shots;

    root.appendChild(display.getContainer());
    root.appendChild(timeline.getContainer());
}

App();