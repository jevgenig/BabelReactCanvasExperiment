let React = null;
let Easel = window.createjs;
let bindValue = (value) => typeof value === "function" ? value : ()=>value;
class DisplayObject {
    constructor(props = {}) {
        this.children = [];
        this.left = bindValue(props.left);
        this.top = bindValue(props.top);
        console.debug(props)
    }

    addChildren(children) {
        children.forEach((child)=>this.addChild(child))
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child.build());
    }

    build() {
        return this;
    }

    repaint() {
        this.children.forEach((child)=>child.repaint());
        this.el.x = this.left() || 0;
        this.el.y = this.top() || 0;
    }

    attach() {
        this.el = this.createBody();
        if (!(this instanceof  Stage)) {
            this.parent.el.addChild(this.el);
        }
        this.children.forEach((child)=>child.attach());
    }

    createBody() {
        return new Easel.Container();
    }
}

class Text extends DisplayObject {
    constructor(props) {
        super(props);
        this.Text = bindValue(props.Text);
    }

    createBody() {
        return new Easel.Text("", "20px Arial", "#ff7700");
    }

    repaint() {
        this.el.text = this.Text()
    }
}

class JustACircle extends DisplayObject {
    createBody() {
        return new Easel.Shape(new Easel.Graphics().beginFill("#999999").drawCircle(-40, 30, 30));
    }
}

class Stage extends DisplayObject {

    constructor(props) {
        super(props);
        this.fps = props.fps || 60;
    }

    createElement(elementClass, props, ...children) {
        let instance = elementClass instanceof DisplayObject ? elementClass : new elementClass(props || {});
        instance.addChildren(children);
        return instance
    }

    createBody() {
        return new Easel.Stage(this.parent.el);
    }

    attachTo(canvas) {
        this.parent = {
            el: canvas
        };
        super.attach();
    }

    repaint() {
        super.repaint();
        this.el.update();
    }

    run() {
        setInterval(()=>this.repaint(), 1000 / this.fps);
    }
}

class BetSpotAbstract extends DisplayObject {
    constructor(props) {
        super(props);
        this.Title = props.Title || ""
    }

    build(options) {
        return <this><Text Text={()=>this.Title+Math.random()}/><JustACircle/></this>
    }
}

class LeftBetSpot extends BetSpotAbstract {
}

class RightBetSpot extends BetSpotAbstract {
}

class BetSpots extends Stage {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width
        };
    }

    build() {
        let angle = 0;

        return <this>
            <LeftBetSpot
                Title="Left betspot"
                left={()=>125 + 100 * Math.cos(angle+=.05)}
                top={()=>125 + 100 * Math.sin(angle)}/>
            <RightBetSpot
                Title="Right betspot"
                left={()=>this.state.width/2}/>
        </this>
    }
}
setTimeout(function () {
    let canvas = document.createElement("canvas");
    canvas.width = canvas.style.width = window.innerWidth;
    canvas.height = canvas.style.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.left = 0;
    canvas.style.right = 0;
    document.body.appendChild(canvas);

    React = new BetSpots({
        fps: 60,
        width: canvas.width
    });
    React.build();
    React.attachTo(canvas);
    React.run();
});