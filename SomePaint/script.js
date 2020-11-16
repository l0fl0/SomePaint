const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.globalCompositeOperation = 'xor';



// Brush Definition
let edge = 40;
let pSize = 10;
let drawing = false;
let hue = 0;
let saturation = 100;
let lightness = 70;
let chromatic = false;
let rootBrush = false;
let normalBrush = true;
const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
})



// Generative Root algorithm

class Root { 

    constructor(x, y, color, sat, light, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.hue = color;
        this.satutation = sat;
        this.lightness = light;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw() {
        this.speedX += (Math.random() - 0.5);
        this.speedY += (Math.random() - 0.5);
        this.x += this.speedX;
        this.y += this.speedY;


        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const radius = (-distance / edge + 1) * edge / pSize;


        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this)); // what is bind?
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${this.hue},${this.satutation}% ,${this.lightness}%)`;
            ctx.fill();
            ctx.strokeStyle = `hsl(${this.hue},${this.satutation - 30}% ,${this.lightness - 30}%)`;
            ctx.stroke();
            colorChromatic.style.background = `hsl(${hue},${saturation}%,${lightness - 30}%)`;
        }
    }
};

class Normal { 

    constructor(x, y, color, sat, light, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.hue = color;
        this.satutation = sat;
        this.lightness = light;
        this.centerX = centerX;
        this.centerY = centerY;
    }
    draw() {
        this.x +=1 ;
        this.y +=1 ;
        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const radius = (-distance / edge + 1) * edge ;


        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this)); // what is bind?
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${this.hue},${this.satutation}% ,${this.lightness}%)`;
            ctx.strokeStyle = `hsl(${this.hue},${this.satutation}% ,${this.lightness}%)`;
            ctx.fill();
            ctx.stroke();
            colorChromatic.style.background = `hsl(${hue + 15},${saturation}%,${lightness - 30}%)`;
        }
    }
};

stroke = () => {
    if (drawing && rootBrush) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        for (let i = 0; i < 1; i++) {
            const root = new Root(mouse.x, mouse.y, hue, saturation, lightness, centerX, centerY);
            root.draw();
        }
    }
    if (drawing && normalBrush) {
        const centerX = mouse.x;
        const centerY = mouse.y;
        const root = new Normal(mouse.x, mouse.y, hue, saturation, lightness, centerX, centerY);
        root.draw();

    }
    if (drawing && chromatic) {
        hue += 0.05;
    }
};



// Drawing listeners
canvas.addEventListener('mousemove', () => {
    stroke();
});

canvas.addEventListener('mousedown', () => {
    drawing = true;
});

window.addEventListener('mouseup', () => {
    drawing = false;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



// Tools configurations
const toolContainer = document.getElementById('toolContainer');
const palette = document.getElementById('palette');
const brushRack = document.getElementById('brushRack');



// Brush page 

const rootBrushButton = document.getElementById('rootBrushButton');
const normalBrushButton = document.getElementById('normalBrushButton');
const normalBrushToggle = document.getElementById('normalBrushToggle');
const rootBrushToggle = document.getElementById('rootBrushToggle');


rootToggle = () => {
    normalBrush = false;
    rootBrush = true;
    normalBrushToggle.innerHTML = "OFF";
    rootBrushToggle.innerHTML = "ON";
    normalBrushButton.style.background = 'crimson';
    rootBrushButton.style.background = 'green';
};

normalToggle = () => { 
    normalBrush = true;
    rootBrush = false;
    normalBrushToggle.innerHTML = "ON";
    rootBrushToggle.innerHTML = "OFF";
    normalBrushButton.style.background = 'green';
    rootBrushButton.style.background = 'crimson';
};
 
rootBrushButton.addEventListener('click', rootToggle);
normalBrushButton.addEventListener('click', normalToggle);

// Colors definitions                   


const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');
color1.style.background = "hsl(0,70%,55%)";
color2.style.background = "hsl(30,70%,55%)";
color3.style.background = "hsl(60,70%,55%)";

const color4 = document.getElementById('color4');
const color5 = document.getElementById('color5');
const color6 = document.getElementById('color6');
color4.style.background = "hsl(90,70%,55%)";
color5.style.background = "hsl(120,70%,55%)";
color6.style.background = "hsl(150,70%,55%)";

const color7 = document.getElementById('color7');
const color8 = document.getElementById('color8');
const color9 = document.getElementById('color9');
color7.style.background = "hsl(180,70%,55%)";
color8.style.background = "hsl(210,70%,55%)";
color9.style.background = "hsl(240,70%,55%)";

const color10 = document.getElementById('color10');
const color11 = document.getElementById('color11');
const color12 = document.getElementById('color12');
color10.style.background = "hsl(270,70%,55%)";
color11.style.background = "hsl(300,70%,55%)";
color12.style.background = "hsl(330,70%,55%)";

const color13 = document.getElementById('color13');
const color14 = document.getElementById('color14');
const color15 = document.getElementById('color15');
color13.style.background = "hsl(0,100%,100%)";
color14.style.background = "hsl(0,100%,0%)";
color15.style.background = "hsl(0,0%,50%)";


color1.addEventListener('click', () => { hue = 0; saturation = 100; lightness = 70; });
color2.addEventListener('click', () => { hue = 30; saturation = 100; lightness = 70; });
color3.addEventListener('click', () => { hue = 60; saturation = 100; lightness = 70; });
color4.addEventListener('click', () => { hue = 90; saturation = 100; lightness = 70; });
color5.addEventListener('click', () => { hue = 120; saturation = 100; lightness = 70; });
color6.addEventListener('click', () => { hue = 150; saturation = 100; lightness = 70; });
color7.addEventListener('click', () => { hue = 180; saturation = 100; lightness = 70; });
color8.addEventListener('click', () => { hue = 210; saturation = 100; lightness = 70; });
color9.addEventListener('click', () => { hue = 240; saturation = 100; lightness = 70; });
color10.addEventListener('click', () => { hue = 270; saturation = 100; lightness = 70; });
color11.addEventListener('click', () => { hue = 300; saturation = 100; lightness = 70; });
color12.addEventListener('click', () => { hue = 330;  saturation = 50; lightness = 70;});
color13.addEventListener('click', () => { hue = 0; saturation = 0; lightness = 100 });
color14.addEventListener('click', () => { hue = 0; saturation = 0; lightness = 20 });
color15.addEventListener('click', () => { hue = 0; saturation = 0; lightness = 70 });

chromaticToggle = () => {
    if (chromatic) {
        chromatic = false;
        colorChromatic.style.borderColor = 'black';
    } else {
        chromatic = true;
        colorChromatic.style.borderColor = 'gold';
    }
};

colorChromatic.addEventListener('click', chromaticToggle);


//Options Definitions

const colorOption = document.getElementById('colorOption');
const brushOption = document.getElementById('brushOption');
const clearOption = document.getElementById('clearOption');
const closeOption = document.getElementById('closeOption');


pageSelector = () => {
    if (palette.style.display == "none") {
        palette.style.display = "grid";
        brushRack.style.display = "none";
    } else {
        palette.style.display = "none";
        brushRack.style.display = "grid";
    }
};

colorOption.addEventListener('click', pageSelector);

brushOption.addEventListener('click', pageSelector);

clearOption.addEventListener('click',
    () => ctx.clearRect(0, 0, canvas.width, canvas.height));

closeOption.addEventListener('click', () =>
    toolContainer.style.display = "none");






// Key Bindings

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if (keyName === 'a') {
        if (toolContainer.style.display == "none") {
            toolContainer.style.display = "grid";
        } else {
            toolContainer.style.display = "none";
        }
    }
    if (keyName === 'c') {
        alert("You cleared space!"); // TODO: Are you sure? promt
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (keyName === 's') {
        pageSelector();
    }
//  TODO: key binding for chromatic color, brush type
});

