const world = document.querySelector("#myGameArea") // Constante qui contient le canvas avec l'ID myGameArea
const ctx = world.getContext("2d"); // Récupération du contexte du canvas, ici en 2D dans la constant ctx
const buttonLeft = document.getElementById('Left')
const buttonRight = document.getElementById('Right')
const buttonLaunch = document.getElementById('Launch')

world.width = 320;  // Définie la taille du canvas 
world.height = 320; // Définie la taille du canvas 

let frame = 0; // Création de la variable servant à déterminer nombre de frame
let balls = null; // Initialise la variable balls
let speed = { // Création de l'objet speed pour déterminer la vitesse de la balle
    x:-2,   // vitesse sur l'axe X
    y:-2    // vitesse sur l'axe Y
};
let widthBlocker = 60; // Variable pour la taille du Blocker

const keys = { //objet contenant la touche droite et gauche pour dire si elle seront appuyé ou non
    ArrowLeft:{pressed:false},
    ArrowRight:{pressed:false}
};

class blocker{
    constructor(){ // constructeur du blocker
        this.width = widthBlocker; // Largeur du blocker
        this.height = 10; // Hauteur du blocker
        this.velocity = {
            x:0,  // Vitesse de déplacement du blocker sur l'axe X
            y:0   // Vitesse déplacement du blocker sur l'axe Y
        };
        this.position = {
            x:(world.width - this.width)/2, //positione le blocker par defaut au milieu de l'axe X
            y:(world.height - this.height)/1.1  //positione le blocker par defaut en bas de l'axe Y
        };
        const image= new Image();   // création du nouvel élément image
        image.src = "./sprites.bmp";    // détermine la source de l'image
        image.onload = () => {  // Quand la source de l'image est chargée
            this.image = image  
            this.source = {     // objet qui détermine ...
                x: 0,           // le point de départ sur l'axe X de la portion d'image à afficher
                y: 0,           // le point de départ sur l'axe X de la portion d'image à afficher
                width: 24,      // la largeur de la portion d'image à afficher
                height: 5       // la hauteur d'image à récupérer
            };
        };
    };    
    
    lunch(){    //méthode pour lancer une nouvelle balle
        if (balls != null) {
            // Do Nothing
        } else {
            balls = new ball()  //Créer une nouvelle balle  
            }
        }
    


    draw(){ // Dessine le Joueur selon l'image source
        ctx.drawImage(
            this.image,
            this.source.x,
            this.source.y,
            this.source.width,
            this.source.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    };

    update(){ //rafraichi l'animation du blocker en redéssinant le blocker à chaque mise à jour
        if (this.image) { //Si l'image est chargé ...           
            if(keys.ArrowLeft.pressed && this.position.x > 0){ //Si j'appuie sur le touche Gauche et que la position du joueur est supérieur à 0 sur l'axe x
                this.velocity.x = -3 // Alors je déplace le joueur de -3 sur l'axe x
            }
            else if (keys.ArrowRight.pressed && this.position.x < (world.width - this.width)) { // Sinon si j'appuie sur la Droite et que la position du joueur est inférieur à la largueur du monde moins sa propre largeur
                this.velocity.x = 3 // Alors je déplace le joueur de +3 sur l'axe x
            }
            else { //Sinon 
                this.velocity.x = 0; // Sinon je ne déplace pas le joueur
            }
            this.position.x += this.velocity.x;
            this.draw(); //Dessine le Joueur
        }
    };
};

class Block{
    constructor({position}, numBlock = 1){ // constructeur d'un block
        this.velocity = {
            x:0,  // Vitesse de déplacement du blocker sur l'axe X
            y:0   // Vitesse déplacement du blocker sur l'axe Y
        };
        const image= new Image();
        image.src = "./sprites.bmp";
        image.onload = () => {
            this.image = image
            this.width = 16; // Largeur du block
            this.height = 8; // Hauteur du block
            this.position = { // Objet determinant la position du block
                x:position.x,
                y:position.y
            };
            this.source = { // Objet determinant la portion d'image à récupérer sur le BMP
                x: numBlock * 8,
                y: 28,
                width: 8,
                height: 4
            };
        };
    };    
 
    draw(){ 
        if (this.image) { // Dessine le block depuis le BMP
            ctx.drawImage(
                this.image,
                this.source.x,
                this.source.y,
                this.source.width,
                this.source.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            )
        }
    };

    update(velocity){ //rafraichi la position du block en fonction de la velocité
        if (this.image) {            
            this.position.y += this.velocity.y;
        };
        this.draw(); //Dessine le block
    };
};

class Grid{
    constructor(){
        this.position={x:3,y:3}
        this.velocity={x:1,y:0}
        this.blocks = []
        let rows = Math.floor((world.height/8)*(1/3));
        let colums = Math.floor((world.width/12)*(2/3));
        this.height= rows * 34;
        this.width = colums * 34;
        for (let x= this.position.x;x<colums;x++){
			for(let y = this.position.y;y<rows;y++){
                this.blocks.push(new Block({
                    position:{
                        x:x * 16,
                        y:y * 8
                    }
                }))
            }
        }
    };
    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};
class ball {
    constructor(velocity){ //constructeur de la balle
        this.width = 6; //Définie la taille de la balle
        this.height = 6; //Définie la hauteur de la balle
        this.position = {
            x: 120 - this.width,
            y: 260 - this.height
        }
        this.velocity = speed

        const image= new Image();
        image.src = "./sprites.bmp";
        image.onload = () => {
            this.image = image
            this.source = {
                x: 28,
                y: 0,
                width: 4,
                height: 4
            };
        };
    };
    draw(){
        ctx.drawImage(
            this.image,
            this.source.x,
            this.source.y,
            this.source.width,
            this.source.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
        if (this.position.x < 0) {
            this.velocity.x = -speed.x;
        }      
        else if (this.position.x > 320 - this.width) {
            this.velocity.x = -speed.x;
        }
        else if (this.position.y < 0) {
            this.velocity.y = -speed.y;
        }
        else if(this.position.y > 320) {
            console.log("You Lose");
            balls = null;
            this.velocity.y = -speed.y
        }
        else if (
            (this.position.y > player.position.y - player.height/2 && this.position.y < player.position.y) 
            && (this.position.x > player.position.x && this.position.x < player.position.x + player.width)){
            this.velocity.y = -speed.y
        }
    }
}

let grids= [new Grid()];
const player = new blocker(); // Création du joueur 

const animationLoop = () => { //Boucle D'animation
    requestAnimationFrame(animationLoop); //Demande au navigateur pour pouvoir dessiner sur le canvas avec CallBack de l'animation
    ctx.clearRect(0,0,world.width,world.height); // Vide le Canvas et remet à 0 zero le plateau de jeu
    player.update(); // Dessine le joueur
    if (balls != null) {
        balls.update();
    }
    grids.forEach(grid => {
        grid.update();
        grid.blocks.forEach(block => {
            block.update();
        });
    });
    frame ++ //Incrémente frame
};

animationLoop();

addEventListener("keydown", ({key})=>{
    switch(key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
        break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
        break;
    }
})
addEventListener("keyup", ({key})=>{
    switch(key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            console.log(player.position.x)
        break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            console.log(player.position.x)
        break;
        case ' ':
            player.lunch();
        break
    }
})

buttonLeft.addEventListener("touchstart", ()=>{
    keys.ArrowLeft.pressed = true;
} )
buttonLeft.addEventListener("touchend", ()=>{
    keys.ArrowLeft.pressed = false;
} )
buttonRight.addEventListener("touchstart", ()=>{
    keys.ArrowRight.pressed = true;
} )
buttonRight.addEventListener("touchend", ()=>{
    keys.ArrowRight.pressed = false;
} )
buttonLaunch.addEventListener("touchstart", ()=>{
    player.lunch();
} )