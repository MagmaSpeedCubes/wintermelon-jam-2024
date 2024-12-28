/*THIS IS ALL SETUP CODE*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//sets up canvas
const TILE_SIZE = 30
let commandQueued = false
//const colors1 = ["#000000","#00FFFF", "#0000FF", "#FFAA00", "#FFFF00", "#00FF00", "#FF00FF", "#FF0000"];
//const colors2 = ["#000000","#00AA", "#0000AA", "#AA9900", "#AAAA00", "#00AA00", "#AA00AA", "#AA0000"];
const colors1 = ["#FF0000","#CC0000","#990000","#660000","#330000","#000033","#000066","#000099","#0000CC","#0000FF"]
//const colors2 = ["#FF00FF","#CC0000","#990000","#660000","#330000","#000033","#000066","#000099","#0000CC","#0000FF"]
const PIECES = 
    ["I", [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],]
    , "J", [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]], 
    "L", [    
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]], 
    "O", [    
    [0, 0, 0, 0],
    [0, 4, 4, 0],
    [0, 4, 4, 0],
    [0, 0, 0, 0]], 
    "S", [    
    [0, 0, 0],
    [0, 5, 5],
    [5, 5, 0]], 
    "T", [    
    [0, 0, 0],
    [6, 6, 6],
    [0, 6, 0]], 
    "Z", [    
    [0, 0, 0],
    [7, 7, 0],
    [0, 7, 7]]
    ];

let BAG = ["I", "J", "L", "O", "S", "T", "Z"];

const SRS = [
    1, [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2],
    12, [0, 0], [1, 0], [1, -1], [0, 2], [1, 2],
    23, [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
    30, [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2],
    3, [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
    32, [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2],
    21, [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2],
    10, [0, 0], [1, 0], [1, -1], [0, 2], [1, 2]
];
const SRSI = [
    1, [0, 0], [-2, 0], [1, 0], [1, 2], [-2, -1],
    12, [0, 0], [2, 0], [-1, 0], [-1, 2], [2, -1],
    23, [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -1],
    30, [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -1],
    10, [0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2],
    21, [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -1],
    32, [0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1],
    3, [0, 0], [-2, 0], [1, 0], [1, 2], [-2, -1]
];
let board = 
    [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]
    ];
let pieceData = ["piece","","pieceArray", [], "x", 0, "y", 0, "oldx", 0, "oldy", 0, "movements", [], "rotation", 0];
let gameData = ["level", 1, "holdLock", false, "score", 0, "b2b", 0, "combo", 0, "actionText","eee", "tilt", 0 ];
let queue = ["Hold", "","holdArray", [], 1, "", 2, "", 3, "", 4, "", 5, "", 6, "" ];
let currentBag = generateBag(BAG);
const MAIN_THEME = new sound("./SFX/music-standard.wav");
MAIN_THEME.loop = true;
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
function generateBag(bag){
    let rpt = bag.length
    let localBag = bag;
    let randomBag = [];
    for(let i=0; i<rpt; i++){
        let randomPiece = Math.floor(Math.random() * localBag.length);
        randomBag.push(localBag[randomPiece]);
        localBag.splice(randomPiece, 1);
    }
    BAG = ["I", "J", "L", "O", "S", "T", "Z"];
    return randomBag;
}
function drawBoard(cx, cy, dpl){
    drawPiece()
    clearLines()
  
    for(let w=0; w<10; w++){
        for(let h=0; h<4; h++){
            if (board[h][w]!=0){
                let color1 = colors1[w]
                let color2 = "#FFFFFF"
                drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), color1, color2);
            }else{
                let color1 = "#FFFFFF"
                let color2 = "#FFFFFF"
                drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), color1, color2);
            }
        }
        for(let h=4; h<24; h++){
            if (board[h][w]!=0){
                let color1 = colors1[w]
                let color2 = "#FFFFFF"
                drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), color1, color2);
            }else{
                let color1 = "#000000"
                let color2 = "#000000"
                drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), color1, color2);
            }
        }
    }
    drawUI()
}
function drawTile(cx, cy, color1, color2, angle){
    ctx.fillStyle = color1;
    ctx.fillRect(cx, cy, TILE_SIZE, TILE_SIZE);  
    ctx.strokeStyle = color2;
    ctx.strokeRect(cx+TILE_SIZE/4, cy+TILE_SIZE/4, TILE_SIZE/2, TILE_SIZE/2);  
}
function spawnNextPiece(){

    pieceData[pieceData.indexOf("piece") + 1] = queue[queue.indexOf(1)+1];
    pieceData[pieceData.indexOf("pieceArray") + 1] = PIECES[PIECES.indexOf(pieceData[pieceData.indexOf("piece") + 1])+1]
    pieceData[pieceData.indexOf("x") + 1] = 3;
    pieceData[pieceData.indexOf("y") + 1] = 0;
    pieceData[pieceData.indexOf("oldx") + 1] = 3;
    pieceData[pieceData.indexOf("oldy") + 1] = 0;
    pieceData[pieceData.indexOf("movements") + 1] = [];
    pieceData[pieceData.indexOf("rotation") + 1] = 0

    gameData[gameData.indexOf("holdLock") + 1] = false
    //spawns next piece
    queue[queue.indexOf(1)+1] = queue[queue.indexOf(2)+1];
    queue[queue.indexOf(2)+1] = queue[queue.indexOf(3)+1];
    queue[queue.indexOf(3)+1] = queue[queue.indexOf(4)+1];
    queue[queue.indexOf(4)+1] = queue[queue.indexOf(5)+1];
    queue[queue.indexOf(5)+1] = queue[queue.indexOf(6)+1];

    queue[queue.indexOf(6)+1] = currentBag.pop();
    if (currentBag.length==0){
        currentBag = generateBag(BAG);
    }
    //updates next pieces
    
}
function drawPiece(){
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
            }
        }
    }
    //erases old piece
    pieceData[pieceData.indexOf("oldx") + 1] = pieceData[pieceData.indexOf("x") + 1]
    pieceData[pieceData.indexOf("oldy") + 1] = pieceData[pieceData.indexOf("y") + 1]
    //updates piece information
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                board[pieceData[pieceData.indexOf("y") + 1]+y][pieceData[pieceData.indexOf("x") + 1]+x] = 1;
            }
        }
    }
    //draws new piece

}
function gravity(){
    let canMove = true;
    let tempBoard = board.map(row => [...row]);
    let tilt = calculateTilt();
    gameData[gameData.indexOf("tilt") + 1] +=tilt/100
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
            }
        }
    }
    let testy = pieceData[pieceData.indexOf("y") + 1] + 1
    
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                tempBoard[testy+y][pieceData[pieceData.indexOf("x") + 1]+x] += 1;
            }
        }
    }
    for(let w=0; w<10; w++){
        for(let h=0; h<25; h++){
            if (tempBoard[h][w] > 1){
                canMove = false;
            }
        }
    }
    if (canMove){
        pieceData[pieceData.indexOf("y") + 1] +=1
        pieceData[pieceData.indexOf("movements") + 1].push("g");
    }else{
        spawnNextPiece();
    }
}
function softDrop(){
    let canMove = true;
    let tempBoard = board.map(row => [...row]);

    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
            }
        }
    }
    let testy = pieceData[pieceData.indexOf("y") + 1] + 1
    
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                tempBoard[testy+y][pieceData[pieceData.indexOf("x") + 1]+x] += 1;
            }
        }
    }
    for(let w=0; w<10; w++){
        for(let h=0; h<25; h++){
            if (tempBoard[h][w] > 1){
                canMove = false;
            }
        }
    }
    if (canMove){
        pieceData[pieceData.indexOf("y") + 1] +=1
        pieceData[pieceData.indexOf("movements") + 1].push("sd");
    }
}
function firmDrop(){
    for(let i=0; i<25; i++){
        softDrop();
    }
    pieceData[pieceData.indexOf("movements") + 1].push("fd");
}
function hardDrop(){
    for(let i=0; i<25; i++){
        softDrop();
    }
    pieceData[pieceData.indexOf("movements") + 1].push("hd");
    setTimeout(spawnNextPiece, 20)
}
function movePieceLeft(){
    let canMove = true;
    let tempBoard = board.map(row => [...row]);
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;

    let columnSums = [0, 0, 0, 0];
    let emptyColumns = 0
    for (i=0; i<pieceSize; i++){
        columnSums[0]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][0]
        columnSums[1]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][1]
        columnSums[2]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][2]
        if (pieceSize == 4){
            columnSums[3]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][3]
        }
    }
    for(let i=0; i<pieceSize; i++){
        if (columnSums[i]==0){
            emptyColumns+=1
        }else{
            i=3;
        }
    }
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
            }
        }
    }
    let testx = pieceData[pieceData.indexOf("x") + 1] - 1
    if (testx<-1*emptyColumns){
        canMove = false;
    }else{
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][testx+x] += 1;
                }
            }
        }
        for(let w=0; w<10; w++){
            for(let h=0; h<25; h++){
                if (tempBoard[h][w] > 1){
                    canMove = false;
                }
            }
        }
    }
    

    if (canMove){
        pieceData[pieceData.indexOf("x") + 1] -=1
        drawPiece();
        pieceData[pieceData.indexOf("movements") + 1].push("ml");
    }
}
function movePieceRight(){
    let canMove = true;
    let tempBoard = board.map(row => [...row]);
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;

    let columnSums = [0, 0, 0, 0];
    let emptyColumns = 0
    for (i=0; i<pieceSize; i++){
        columnSums[0]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][0]
        columnSums[1]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][1]
        columnSums[2]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][2]
        if (pieceSize == 4){
            columnSums[3]+=pieceData[pieceData.indexOf("pieceArray") + 1][i][3]
        }
    }
    if (pieceSize==3){
        emptyColumns+=1
    }
    for(let i=pieceSize-1; i>=0; i--){
        if (columnSums[i]==0){
            emptyColumns+=1
        }else{
            i=0;
        }
    }

    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
            }
        }
    }
    let testx = pieceData[pieceData.indexOf("x") + 1] + 1
    if (testx>6+emptyColumns){
        canMove = false;
    }else{
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][testx+x] += 1;
                }
            }
        }
        for(let w=0; w<10; w++){
            for(let h=0; h<25; h++){
                if (tempBoard[h][w] > 1){
                    canMove = false;
                }
            }
        }
    }
    

    if (canMove){
        pieceData[pieceData.indexOf("x") + 1] +=1;
        drawPiece();
        pieceData[pieceData.indexOf("movements") + 1].push("mr");
    }
}
function rotatePieceCW(){
    let testx
    let testy
    let canRotate
    let piece = pieceData[pieceData.indexOf("pieceArray") + 1]
    let tempPiece = pieceData[pieceData.indexOf("pieceArray") + 1].map(row => [...row]);
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;

    if (pieceSize==3){
        tempPiece[0][0]= piece[2][0];
        tempPiece[0][1]= piece[1][0];
        tempPiece[0][2]= piece[0][0];
        tempPiece[1][0]= piece[2][1];
        tempPiece[1][1]= piece[1][1];
        tempPiece[1][2]= piece[0][1];
        tempPiece[2][0]= piece[2][2];
        tempPiece[2][1]= piece[1][2];
        tempPiece[2][2]= piece[0][2];
    }else if (pieceSize == 4){
        tempPiece[0][0]= piece[3][0];
        tempPiece[0][1]= piece[2][0];
        tempPiece[0][2]= piece[1][0];
        tempPiece[0][3]= piece[0][0];
        tempPiece[1][0]= piece[3][1];
        tempPiece[1][1]= piece[2][1];
        tempPiece[1][2]= piece[1][1];
        tempPiece[1][3]= piece[0][1];
        tempPiece[2][0]= piece[3][2];
        tempPiece[2][1]= piece[2][2];
        tempPiece[2][2]= piece[1][2];
        tempPiece[2][3]= piece[0][2];
        tempPiece[3][0]= piece[3][3];
        tempPiece[3][1]= piece[2][3];
        tempPiece[3][2]= piece[1][3];
        tempPiece[3][3]= piece[0][3];
    }
    let columnSums = [0, 0, 0, 0];
    let emptyLeftColumns = 0;
    let emptyRightColumns = 0;
    //console.log(piece)
    //console.log(tempPiece)
    for (i=0; i<pieceSize; i++){
        columnSums[0]+=tempPiece[i][0]
        columnSums[1]+=tempPiece[i][1]
        columnSums[2]+=tempPiece[i][2]
        if (pieceSize == 4){
            columnSums[3]+=tempPiece[i][3]
        }
    }
    for(let i=0; i<pieceSize; i++){
        if (columnSums[i]==0){
            emptyLeftColumns+=1
        }else{
            i=4;
        }
    }
    if (pieceSize==3){
        emptyRightColumns+=1
    }
    for(let i=pieceSize-1; i>=0; i--){
        if (columnSums[i]==0){
            emptyRightColumns+=1
        }else{
            i=0;
        }
    }
    
    for(s=0; s<5; s++){
        canRotate = true
        let tempBoard = board.map(row => [...row]);
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
                }
            }
        }
        if (pieceData[pieceData.indexOf("piece") + 1] == "I"){
            let test = SRSI.indexOf(pieceData[pieceData.indexOf("rotation") + 1]*10+ (pieceData[pieceData.indexOf("rotation") + 1]+1)%4)
            testx = pieceData[pieceData.indexOf("x") + 1] + SRSI[test+s+1][0]
            testy = pieceData[pieceData.indexOf("y") + 1] + SRSI[test+s+1][1]
            //console.log(SRSI[test+s+1])
        }else{
            let test = SRS.indexOf(pieceData[pieceData.indexOf("rotation") + 1]*10+ (pieceData[pieceData.indexOf("rotation") + 1]+1)%4)
            testx = pieceData[pieceData.indexOf("x") + 1] + SRS[test+s+1][0]
            testy = pieceData[pieceData.indexOf("y") + 1] + SRS[test+s+1][1]
            //console.log(SRS[test+s+1])
        }

        //SRS table
        
        //console.log(testy + "," + testx)
        if (testx>6+emptyRightColumns){
            canRotate=false
            //console.log("Test "+(s+1)+" Fail Right Wall")
        }else if (testx<-1*emptyLeftColumns){
            canRotate=false
            //console.log("Test "+(s+1)+" Fail Left Wall")
        }else{
            for(let x=0; x<pieceSize; x++){
                for(let y=0; y<pieceSize; y++){
                    if (tempPiece[y][x]!=0){
                        //console.log((testy+y) + "," + (testx+x))
                        //console.log(tempBoard[testy+y][testx+x]);
                        tempBoard[testy+y][testx+x] += 1;
                    }
                }
            }
            //console.log(tempBoard);
            for(let w=0; w<10; w++){
                for(let h=0; h<25; h++){
                    if (tempBoard[h][w] > 1){
                        canRotate=false
                        //console.log("Test "+(s+1)+" Fail Collide")
                    }
                }
            }
            if (canRotate){
                //console.log("Test "+(s+1)+" Success")
                break;
                
            }
        }
    }
    if (canRotate){
        pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
        pieceData[pieceData.indexOf("x") + 1] = testx
        pieceData[pieceData.indexOf("y") + 1] = testy
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
                }
            }
        }
        pieceData[pieceData.indexOf("pieceArray") + 1] = tempPiece.map(row => [...row]);

        pieceData[pieceData.indexOf("oldx") + 1] = pieceData[pieceData.indexOf("x") + 1]
        pieceData[pieceData.indexOf("oldy") + 1] = pieceData[pieceData.indexOf("y") + 1]
        //updates piece information
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    board[pieceData[pieceData.indexOf("y") + 1]+y][pieceData[pieceData.indexOf("x") + 1]+x] = 1;
                }
            }
        }
        //draws new piece
        pieceData[pieceData.indexOf("movements") + 1].push("rcw");
    }
}
function rotatePieceCCW(){
    let testx
    let testy
    let canRotate
    let piece = pieceData[pieceData.indexOf("pieceArray") + 1]
    let tempPiece = pieceData[pieceData.indexOf("pieceArray") + 1].map(row => [...row]);
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;

    if (pieceSize==3){
        tempPiece[0][0]= piece[0][2];
        tempPiece[0][1]= piece[1][2];
        tempPiece[0][2]= piece[2][2];
        tempPiece[1][0]= piece[0][1];
        tempPiece[1][1]= piece[1][1];
        tempPiece[1][2]= piece[2][1];
        tempPiece[2][0]= piece[0][0];
        tempPiece[2][1]= piece[1][0];
        tempPiece[2][2]= piece[2][0];
    }else if (pieceSize == 4){
        tempPiece[0][0]= piece[0][3];
        tempPiece[0][1]= piece[1][3];
        tempPiece[0][2]= piece[2][3];
        tempPiece[0][3]= piece[3][3];
        tempPiece[1][0]= piece[0][2];
        tempPiece[1][1]= piece[1][2];
        tempPiece[1][2]= piece[2][2];
        tempPiece[1][3]= piece[3][2];
        tempPiece[2][0]= piece[0][1];
        tempPiece[2][1]= piece[1][1];
        tempPiece[2][2]= piece[2][1];
        tempPiece[2][3]= piece[3][1];
        tempPiece[3][0]= piece[0][0];
        tempPiece[3][1]= piece[1][0];
        tempPiece[3][2]= piece[2][0];
        tempPiece[3][3]= piece[3][0];
    }
    let columnSums = [0, 0, 0, 0];
    let emptyLeftColumns = 0;
    let emptyRightColumns = 0;
    //console.log(piece)
    //console.log(tempPiece)
    for (i=0; i<pieceSize; i++){
        columnSums[0]+=tempPiece[i][0]
        columnSums[1]+=tempPiece[i][1]
        columnSums[2]+=tempPiece[i][2]
        if (pieceSize == 4){
            columnSums[3]+=tempPiece[i][3]
        }
    }
    for(let i=0; i<pieceSize; i++){
        if (columnSums[i]==0){
            emptyLeftColumns+=1
        }else{
            i=4;
        }
    }
    if (pieceSize==3){
        emptyRightColumns+=1
    }
    for(let i=pieceSize-1; i>=0; i--){
        if (columnSums[i]==0){
            emptyRightColumns+=1
        }else{
            i=0;
        }
    }
    
    for(s=0; s<5; s++){
        canRotate = true
        let tempBoard = board.map(row => [...row]);
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
                }
            }
        }
        if (pieceData[pieceData.indexOf("piece") + 1] == "I"){
            let test = SRSI.indexOf(pieceData[pieceData.indexOf("rotation") + 1]*10+ (pieceData[pieceData.indexOf("rotation") + 1]+3)%4)
            testx = pieceData[pieceData.indexOf("x") + 1] + SRSI[test+s+1][0]
            testy = pieceData[pieceData.indexOf("y") + 1] + SRSI[test+s+1][1]
            //console.log(SRSI[test+s+1])
        }else{
            let test = SRS.indexOf(pieceData[pieceData.indexOf("rotation") + 1]*10+ (pieceData[pieceData.indexOf("rotation") + 1]+3)%4)
            testx = pieceData[pieceData.indexOf("x") + 1] + SRS[test+s+1][0]
            testy = pieceData[pieceData.indexOf("y") + 1] + SRS[test+s+1][1]
            //console.log(SRS[test+s+1])
        }

        //SRS table
        
        //console.log(testy + "," + testx)
        if (testx>6+emptyRightColumns){
            canRotate=false
            //console.log("Test "+(s+1)+" Fail Right Wall")
        }else if (testx<-1*emptyLeftColumns){
            canRotate=false
            //console.log("Test "+(s+1)+" Fail Left Wall")
        }else{
            for(let x=0; x<pieceSize; x++){
                for(let y=0; y<pieceSize; y++){
                    if (tempPiece[y][x]!=0){
                        //console.log((testy+y) + "," + (testx+x))
                        //console.log(tempBoard[testy+y][testx+x]);
                        tempBoard[testy+y][testx+x] += 1;
                    }
                }
            }
            //console.log(tempBoard);
            for(let w=0; w<10; w++){
                for(let h=0; h<25; h++){
                    if (tempBoard[h][w] > 1){
                        canRotate=false
                        //console.log("Test "+(s+1)+" Fail Collide")
                    }
                }
            }
            if (canRotate){
                //console.log("Test "+(s+1)+" Success")
                break;
                
            }
        }
    }
    if (canRotate){
        pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
        pieceData[pieceData.indexOf("x") + 1] = testx
        pieceData[pieceData.indexOf("y") + 1] = testy
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
                }
            }
        }
        pieceData[pieceData.indexOf("pieceArray") + 1] = tempPiece.map(row => [...row]);

        pieceData[pieceData.indexOf("oldx") + 1] = pieceData[pieceData.indexOf("x") + 1]
        pieceData[pieceData.indexOf("oldy") + 1] = pieceData[pieceData.indexOf("y") + 1]
        //updates piece information
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    board[pieceData[pieceData.indexOf("y") + 1]+y][pieceData[pieceData.indexOf("x") + 1]+x] = 1;
                }
            }
        }
        //draws new piece
        pieceData[pieceData.indexOf("movements") + 1].push("rccw");
    }
}
function holdPiece(){
    if (gameData[gameData.indexOf("holdLock") + 1] == false){
        let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
                }
            }
        }
        gameData[gameData.indexOf("holdLock") + 1] = true;
        let tempPieceArray = PIECES[PIECES.indexOf(pieceData[pieceData.indexOf("pieceArray") + 1])].map(row => [...row]);
        let tempPiece = PIECES[PIECES.indexOf(pieceData[pieceData.indexOf("piece") + 1])]
        pieceData[pieceData.indexOf("pieceArray") + 1] = queue[queue.indexOf("holdArray")+1].map(row => [...row]);
        pieceData[pieceData.indexOf("piece") + 1] = queue[queue.indexOf("Hold")+1]
        queue[queue.indexOf("Hold")+1] = tempPiece
        queue[queue.indexOf("holdArray")+1] = tempPieceArray.map(row => [...row]);

        if (pieceData[pieceData.indexOf("pieceArray") + 1].length==0){
            spawnNextPiece()
        }
    }
}
function clearLines(){
    
    let clearedLines = 0
    for (let r=0; r<24; r++){
        let rowSum = 0;
        for(let c=0; c<10; c++){
            rowSum+=board[r] [c];
        }
        if (rowSum==10){
            clearedLines+=1
            for(let i=r; i>0; i--){
                for(let j=0; j<10; j++){
                    board[i][j]=board[i-1][j];
                }
            }
            for(let j=0; j<10; j++){
                board[0] [j]=0;
            }

        }
    }
    if (clearedLines>0){
        let lineClear = ""
        let score = 100
        if (pieceData[pieceData.indexOf("pieceArray") + 1].pop == "rcw"||pieceData[pieceData.indexOf("pieceArray") + 1].pop == "rccw"){
            if(pieceData[pieceData.indexOf("piece") + 1]!="O"){
                lineClear += pieceData[pieceData.indexOf("piece") + 1]+"-Spin "
                score*=2
                score += gameData[gameData.indexOf("b2b") + 1]*100
                gameData[gameData.indexOf("b2b") + 1] +=1
            }
        }
        if(clearedLines==1){
            if(score==100){
                gameData[gameData.indexOf("b2b") + 1] = 0;
            }
            lineClear += "Single"
        }else if(clearedLines==2){
            if(score==100){
                gameData[gameData.indexOf("b2b") + 1] = 0;
            }
            score*=2
            lineClear += "Double"
        }else if(clearedLines==3){
            if(score==100){
                gameData[gameData.indexOf("b2b") + 1] = 0;
            }
            score*=4
            lineClear += "Triple"
        }else if(clearedLines==4){
            gameData[gameData.indexOf("b2b") + 1] +=1
            score*=8
            lineClear += "Tetris"
        }
        if (gameData[gameData.indexOf("combo") + 1] >0){
            score += gameData[gameData.indexOf("combo") + 1]*50
            lineClear += " "+gameData[gameData.indexOf("combo") + 1]+" Combo "
        }

        let Sum = 0;
        for (let r=0; r<24; r++){
            for(let c=0; c<10; c++){
                Sum+=board[r, c];
            }
        }
        if (Sum==0){
            score+=10000;
            lineClear += " Perfect Clear"
        }
        console.log(lineClear);
        gameData[gameData.indexOf("score") + 1] += score
        console.log(score);

        gameData[gameData.indexOf("combo") + 1] +=1;
    }else{
        gameData[gameData.indexOf("b2b") + 1] = 0;
        gameData[gameData.indexOf("combo") + 1] = 0;
    }
    
}
function calculateTilt(){
    let colSums = [0,0,0,0,0,0,0,0,0,0]
    for(let i=0; i<24; i++){
        for(let j=0; j<10; j++){
            colSums[j]+=board[i][j]
        }
    }
    colSums[0]*=-5
    colSums[1]*=-4
    colSums[2]*=-3
    colSums[3]*=-2
    colSums[4]*=-1
    colSums[5]*=1
    colSums[6]*=2
    colSums[7]*=3
    colSums[8]*=4
    colSums[9]*=5
    let totalTilt = 0;
    for(let j=0; j<10; j++){
        totalTilt += colSums[j];
    }
    return totalTilt;
}
function drawUI(){
    ctx.fillStyle = "#2F1254";
    ctx.fillRect(768, 0, 256, 1024);

    ctx.font = "50px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText(gameData[gameData.indexOf("actionText") + 1],768,50);
    for(let i=0; i<6; i++){
        
    }
}

/*THIS IS ALL CODE THAT IS PART OF THE GAME*/
function start(mode){
    if (mode==1){
        MAIN_THEME.play();
        
    }
    for(let i=0; i<7; i++){
        spawnNextPiece()
    }
    setInterval( function() { drawBoard(234,0,gameData[gameData.indexOf("tilt") + 1]); }, 10 );
    setInterval(gravity, 1000);
    window.addEventListener("keydown", function (event) {
  
        switch (event.key) {
    
        case "ArrowDown":
            if (!commandQueued){
                commandQueued = true;
                softDrop();
                commandQueued = false;
            }
    
            break;
        case "Shift":
            if (!commandQueued){
                commandQueued = true;
                firmDrop();
                commandQueued = false;
            }
            
            break;
        case "ArrowUp":
            if (!commandQueued){
                commandQueued = true;
                rotatePieceCW();
                commandQueued = false;
            }
            
            break;
        case "ArrowLeft":
            if (!commandQueued){
                commandQueued = true;
                movePieceLeft();
                commandQueued = false;
            }
            
            break;
        case "ArrowRight":
            if (!commandQueued){
                commandQueued = true;
                movePieceRight();
                commandQueued = false;
            }
            
            break;
        case "c":
            if (!commandQueued){
                commandQueued = true;
                holdPiece();
                commandQueued = false;
            }
            
            break;
        case " ":
            if (!commandQueued){
                commandQueued = true;
                hardDrop();    
                commandQueued = false;
            }
            
            break;
        case "z": 
        if (!commandQueued){
            commandQueued = true;
            rotatePieceCCW();
            commandQueued = false;
        }
            
            break;}
      
        event.preventDefault();
      }, true);
}
start(0)


