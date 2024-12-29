/*
BALANCE STACK
*/
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
let timer1
let timer2
let timer3

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
let gameData = ["level", 1, "holdLock", false, "score", 0, "b2b", 0, "combo", 0, "actionText","", "tilt", 0 , "mode", 0, "tiltSpeed", 0
    ,"mods", []
];
//move -1 = title screen
//mode 0 = board
//mode 1 = game over
//move 2 = mod selection
//mode 3 = achievements page 1
//mode 4 = achievements page 2
let gameStats = ["lines", 0];
let queue = ["Hold", "","holdArray", [], 1, "", 2, "", 3, "", 4, "", 5, "", 6, "" ];
let currentBag = generateBag(BAG);
let spawnQueue = 0;
const MAIN_THEME = new Audio("./SFX/music-standard.wav");
MAIN_THEME.loop = true;
MAIN_THEME.volume = 1; 
const MENU_THEME = new Audio("./SFX/music-menu.wav");
MENU_THEME.loop = true;
MENU_THEME.volume = 1; 
const SELECT = new Audio("./SFX/select.wav");

let mods = ["No Next", "No Ghost Piece", "No Hold", "Gravity", "Total Mayhem"];
let modTriggers = ["q", "w", "e", "r", "t"];

function generateBag(bag){
    if(gameData[gameData.indexOf("mods") + 1].indexOf("Total Mayhem") == -1){
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
    }else{
        let rpt = bag.length
        let localBag = bag;
        let randomBag = [];
        for(let i=0; i<rpt; i++){
            let randomPiece = Math.floor(Math.random() * localBag.length);
            randomBag.push(localBag[randomPiece]);
        }
        BAG = ["I", "J", "L", "O", "S", "T", "Z"];
        return randomBag;
    }
}
function drawBoard(cx, cy, dpl){
    // updatePieceX()
    // updatePieceY()
    drawPiece()
    if (spawnQueue>0){
        spawnQueue-=1
        spawnNextPiece();
    }

    for(let w=0; w<10; w++){
        for(let h=0; h<4; h++){
            if (board[h][w]!=0){
                let color1 = colors1[w]
                let color2 = "#FFFFFF"
                drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), color1, color2);
            }else{
                let color1 = "#2F1254"
                let color2 = "#2F1254"
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
        let color1 = "#2F1254"
        let color2 = "#2F1254"
        for(let h=24; h<26; h++){
            drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), color1, color2);
        }
        
    }
    if(gameData[gameData.indexOf("mods") + 1].indexOf("No Ghost Piece")==-1){
        drawGhostPiece(cx, cy, dpl)
    }
    drawUI()

    
}
function drawTile(cx, cy, color1, color2, angle){
    ctx.fillStyle = color1;
    ctx.fillRect(cx, cy, TILE_SIZE, TILE_SIZE);  
    ctx.strokeStyle = color2;
    ctx.strokeRect(cx+TILE_SIZE/4, cy+TILE_SIZE/4, TILE_SIZE/2, TILE_SIZE/2);  
}
function drawHalfTile(cx, cy, color1, color2, angle){
    ctx.fillStyle = color1;
    ctx.fillRect(cx, cy, TILE_SIZE/2, TILE_SIZE/2);  
    ctx.strokeStyle = color2;
    ctx.strokeRect(cx+TILE_SIZE/8, cy+TILE_SIZE/8, TILE_SIZE/4, TILE_SIZE/4);  
}
function spawnNextPiece(){
    drawPiece()
    clearLines()

    pieceData[pieceData.indexOf("piece") + 1] = queue[queue.indexOf(1)+1];
    if(pieceData[pieceData.indexOf("piece") + 1]!=""){ 
        pieceData[pieceData.indexOf("pieceArray") + 1] = PIECES[PIECES.indexOf(pieceData[pieceData.indexOf("piece") + 1])+1].map(row => [...row])
        if(pieceData[pieceData.indexOf("movements") + 1]==[]){
            endGame("Topped Out");
        }
    }
        
   
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
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
    
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                if(board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] !=0){
                    endGame("Topped Out")
                }
            }
        }
    }

    //updates next pieces
    
}
function drawPiece(){
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
    
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] =0;
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
                board[pieceData[pieceData.indexOf("y") + 1]+y][pieceData[pieceData.indexOf("x") + 1]+x] += 1;
            }
        }
    }
    //draws new piece

}
// function updatePieceX(){
//     let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
    
//     for(let x=0; x<pieceSize; x++){
//         for(let y=0; y<pieceSize; y++){
//             if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
//                 board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] =0;
//             }
//         }
//     }
//     //erases old piece
//     pieceData[pieceData.indexOf("oldx") + 1] = pieceData[pieceData.indexOf("x") + 1]
//     //updates piece information
//     for(let x=0; x<pieceSize; x++){
//         for(let y=0; y<pieceSize; y++){
//             if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
//                 board[pieceData[pieceData.indexOf("y") + 1]+y][pieceData[pieceData.indexOf("x") + 1]+x] += 1;
//             }
//         }
//     }
//     //draws new piece
// }
// function updatePieceY(){
//     let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
    
//     for(let x=0; x<pieceSize; x++){
//         for(let y=0; y<pieceSize; y++){
//             if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
//                 board[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] =0;
//             }
//         }
//     }
//     //erases old piece
//     pieceData[pieceData.indexOf("oldy") + 1] = pieceData[pieceData.indexOf("y") + 1]
//     //updates piece information
//     for(let x=0; x<pieceSize; x++){
//         for(let y=0; y<pieceSize; y++){
//             if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
//                 board[pieceData[pieceData.indexOf("y") + 1]+y][pieceData[pieceData.indexOf("x") + 1]+x] += 1;
//             }
//         }
//     }
//     //draws new piece
// }
function gravity(){
    
    let canMove = true;
    let tempBoard = board.map(row => [...row]);
    let tilt = calculateTilt();
    gameData[gameData.indexOf("tilt") + 1] +=tilt/100
    gameData[gameData.indexOf("tiltSpeed") + 1] =tilt
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
        spawnQueue+=1
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
        gameData[gameData.indexOf("score") + 1]+=1;
        
    }
}
function firmDrop(){
    let canMove = true;
    while(canMove==true){
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
            gameData[gameData.indexOf("score") + 1]+=2;
        }
    }
    
    pieceData[pieceData.indexOf("movements") + 1].push("fd");
    
}
function hardDrop(){
    firmDrop();
    pieceData[pieceData.indexOf("movements") + 1].push("hd");
    spawnQueue+=1
}
function getLowestMovementPoint(){
    let canMove = true;
    let testy = pieceData[pieceData.indexOf("y") + 1] 
    while(canMove==true){
        let tempBoard = board.map(row => [...row]);

        let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length;
        for(let x=0; x<pieceSize; x++){
            for(let y=0; y<pieceSize; y++){
                if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                    tempBoard[pieceData[pieceData.indexOf("oldy") + 1]+y][pieceData[pieceData.indexOf("oldx") + 1]+x] = 0;
                }
            }
        }
        testy+=1
        
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
    }
    return testy
    
    
}
function drawGhostPiece(cx, cy, dpl){
    let pieceSize = pieceData[pieceData.indexOf("pieceArray") + 1].length
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (pieceData[pieceData.indexOf("pieceArray") + 1][y][x]!=0){
                let w = pieceData[pieceData.indexOf("x") + 1] + x
                let h = getLowestMovementPoint() + y - 1
                drawTile(cx+w*TILE_SIZE, cy+h*TILE_SIZE+dpl*(w-4.5), "#999999", "#FFFFFF")
            }
        }
    }
    //updates piece information
    //draws new piece
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
        //console.log(pieceData[pieceData.indexOf("piece") + 1])
        //console.log(pieceData[pieceData.indexOf("pieceArray") + 1])
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
        let tempPieceArray = pieceData[pieceData.indexOf("pieceArray") + 1].map(row => [...row]);
        let tempPiece = pieceData[pieceData.indexOf("piece") + 1]
        pieceData[pieceData.indexOf("pieceArray") + 1] = queue[queue.indexOf("holdArray")+1].map(row => [...row]);
        pieceData[pieceData.indexOf("piece") + 1] = queue[queue.indexOf("Hold")+1]
        queue[queue.indexOf("Hold")+1] = tempPiece
        queue[queue.indexOf("holdArray")+1] = tempPieceArray.map(row => [...row]);
        pieceData[pieceData.indexOf("x") + 1] = 3;
        pieceData[pieceData.indexOf("y") + 1] = 0;
        pieceData[pieceData.indexOf("oldx") + 1] = 3;
        pieceData[pieceData.indexOf("oldy") + 1] = 0;
        pieceData[pieceData.indexOf("movements") + 1] = [];
        pieceData[pieceData.indexOf("rotation") + 1] = 0
        
        if (pieceData[pieceData.indexOf("pieceArray") + 1].length==0){
            spawnQueue+=1
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
        let lastMove = pieceData[pieceData.indexOf("pieceArray") + 1].pop()
        if (lastMove == "rcw"||lastMove == "rccw"){
            if(pieceData[pieceData.indexOf("piece") + 1]!="O"){
                lineClear += pieceData[pieceData.indexOf("piece") + 1]+"-Spin "
                score*=2
                score += gameData[gameData.indexOf("b2b") + 1]*100
                gameData[gameData.indexOf("b2b") + 1] +=1
                const LCS = new Audio("./SFX/lineclear-spin.wav");
                LCS.volume = 1; 
                LCS.play()
            }
        }
        if(clearedLines==1){
            if(score==100){
                gameData[gameData.indexOf("b2b") + 1] = 0;
                gameStats[gameStats.indexOf("lines") + 1] +=1;
            }
            lineClear += "Single"
            const LC = new Audio("./SFX/lineclear.wav");
            LC.volume = 1; 
            LC.play()
        }else if(clearedLines==2){
            if(score==100){
                gameData[gameData.indexOf("b2b") + 1] = 0;
                gameStats[gameStats.indexOf("lines") + 1] +=2;
            }
            score*=2
            lineClear += "Double"
            const LC = new Audio("./SFX/lineclear.wav");
            LC.volume = 1; 
            LC.play()
        }else if(clearedLines==3){
            if(score==100){
                gameData[gameData.indexOf("b2b") + 1] = 0;
                gameStats[gameStats.indexOf("lines") + 1] +=3;
            }
            score*=4
            lineClear += "Triple"
            const LCQ = new Audio("./SFX/lineclear.wav");
            LCQ.volume = 1; 
            LCQ.play()
        }else if(clearedLines==4){
            gameData[gameData.indexOf("b2b") + 1] +=1
            gameStats[gameStats.indexOf("lines") + 1] +=4;
            score*=8
            lineClear += "Tetris"
            const LCQ = new Audio("./SFX/lineclear-tetris.wav");
            LCQ.volume = 1; 
            LCQ.play()
        }else if(clearedLines==5){
            gameData[gameData.indexOf("b2b") + 1] +=1
            gameStats[gameStats.indexOf("lines") + 1] +=5;
            score*=8
            lineClear += "PENTRIS"
            const LCP = new Audio("./SFX/lineclear-tetris.wav");
            LCP.volume = 1; 
            LCP.play()
        }
        if (gameData[gameData.indexOf("combo") + 1] >0){
            score *= Math.pow(1.25, gameData[gameData.indexOf("combo") + 1])
            score = Math.floor(score);
            lineClear += " "+gameData[gameData.indexOf("combo") + 1]+" Combo "
            let comboSound = gameData[gameData.indexOf("combo") + 1]
            if (comboSound>16){comboSound=16}
            let COMBO = new Audio("./SFX/combo-"+comboSound+".wav");
            COMBO.volume = 1; 
            COMBO.play()
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
            const LC = new Audio("./SFX/lineclear-pc.wav");
            LC.volume = 1; 
            LC.play()
        }
        //console.log(lineClear);
        gameData[gameData.indexOf("score") + 1] += score
        //console.log(score);
        gameData[gameData.indexOf("actionText") + 1] = lineClear;
        gameData[gameData.indexOf("combo") + 1] +=1;
        //console.log("combo set to "+gameData[gameData.indexOf("combo") + 1]+"")
    }else{
        gameData[gameData.indexOf("b2b") + 1] = 0;
        gameData[gameData.indexOf("combo") + 1] = 0;
        //console.log("combo set to "+gameData[gameData.indexOf("combo") + 1]+"")
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
    ctx.fillStyle = "#FF9900";
    ctx.font = "30px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText(gameData[gameData.indexOf("actionText") + 1],234,50);
    //general text and info
    let pieceSize = queue[queue.indexOf("holdArray") + 1].length
    let cx = 818
    let cy = 100
    ctx.font = "30px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText("Hold",818,70);
    ctx.fillText("Next",818,190);
    ctx.fillText("Level",900,70);
    ctx.fillText(gameData[gameData.indexOf("level") + 1],900,100);
    ctx.fillText("Score",900,190);
    ctx.fillText(gameData[gameData.indexOf("score") + 1],900,220);
    for(let x=0; x<pieceSize; x++){
        for(let y=0; y<pieceSize; y++){
            if (queue[queue.indexOf("holdArray") + 1][y][x]!=0){
                drawHalfTile(cx+x*TILE_SIZE/2, cy+y*TILE_SIZE/2, "#999999", "#FFFFFF")

            }
        }
    }
    let tiltSpeed = gameData[gameData.indexOf("tiltSpeed") + 1]
    if (tiltSpeed>=0){ctx.fillStyle = "#0000FF"}
    else{ctx.fillStyle = "#FF0000"}
    ctx.font = "25px Arial";
    ctx.fillText("Tilt Speed",900,310);
    ctx.fillText(""+tiltSpeed+"",900,340);
    

    cy+=60
    if(gameData[gameData.indexOf("mods") + 1].indexOf("No Next") == -1){
        for(let i=0; i<6; i++){
            cy+=60
            pieceSize = PIECES[PIECES.indexOf(queue[queue.indexOf(i+1) + 1])+1].length
            for(let x=0; x<pieceSize; x++){
                for(let y=0; y<pieceSize; y++){
                    if (PIECES[PIECES.indexOf(queue[queue.indexOf(i+1) + 1])+1][y][x]!=0){
                        drawHalfTile(cx+x*TILE_SIZE/2, cy+y*TILE_SIZE/2, "#999999", "#FFFFFF")
        
                    }
                }
            }
        }
    }

    
}
function drawTitleScreen(){
    MENU_THEME.play()
    gameData[gameData.indexOf("mode") + 1] = -1
    let ts = new Image();
    ts.src = "./GFX/title.png"
    ts.onload = function(){
        ctx.drawImage(ts, 0, 0);
    }
}
function drawMenuScreen(){
    MENU_THEME.play()
    gameData[gameData.indexOf("mode") + 1] = 2
    let ms = new Image();
    ms.src = "./GFX/menu.png"
    ms.onload = function(){
        ctx.drawImage(ms, 0, 0);
    }
    gameData[gameData.indexOf("mods") + 1] = []
    
}
function endGame(reason){
    const GAMEOVER = new Audio("./SFX/gameover.wav");
    GAMEOVER.play()
    let go = new Image();
    go.src = "./GFX/gameover.png"
    go.onload = function(){ctx.drawImage(go, 0, 0);}
    gameData[gameData.indexOf("mode") + 1] = 1
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3)
    console.log(reason)
    MAIN_THEME.pause()

    setTimeout(drawUI, 250)


}
function playWarnings(){
    let highestOccupied = 0;
    for(let i=24; i>=0; i--){
        let rowSum = 0;
        for(let j=0; j<10; j++){
            if(board[i][j]!=0){
                rowSum+=1
            }
        }
        if(rowSum>4){
            highestOccupied = i;
        }

    }
    const W1 = new Audio("./SFX/warning-1.wav");
    const W2 = new Audio("./SFX/warning-2.wav");
    const W3 = new Audio("./SFX/warning-3.wav");
    const W4 = new Audio("./SFX/warning-4.wav");
    if (Math.abs(gameData[gameData.indexOf("tilt") + 1]) >=1/2*TILE_SIZE){
        endGame("Tipped Over")
    }
    //console.log("Highest occupied:"+highestOccupied+", tilt:"+gameData[gameData.indexOf("tilt") + 1])
    if(highestOccupied<5||Math.abs(gameData[gameData.indexOf("tilt") + 1]) >2/8*TILE_SIZE){
        W4.pause()
        W3.pause()
        W2.pause()
        W1.pause()
        W4.play()
        gameData[gameData.indexOf("actionText") + 1] = "Warning!"
    }else if(highestOccupied<9||Math.abs(gameData[gameData.indexOf("tilt") + 1]) >1/16*TILE_SIZE){
        W4.pause()
        W3.pause()
        W2.pause()
        W1.pause()
        W2.play()
        gameData[gameData.indexOf("actionText") + 1] = "Caution!"
    }
}
function everyFourSeconds(){
    MAIN_THEME.play();
    //console.log(gameData[gameData.indexOf("level") + 1])
    //console.log(Math.floor(gameStats[gameStats.indexOf("lines") + 1]/10)+1)
    gameData[gameData.indexOf("actionText") + 1] = ""
    if ( gameData[gameData.indexOf("level") + 1] != Math.floor(gameStats[gameStats.indexOf("lines") + 1]/10)+1){

        gameData[gameData.indexOf("level") + 1] = Math.floor(gameStats[gameStats.indexOf("lines") + 1]/10)+1
        clearInterval(timer2)
        console.log(gameData[gameData.indexOf("level") + 1])
        
        if(gameData[gameData.indexOf("mods") + 1].indexOf("Gravity") == -1){
            timer2 = setInterval(gravity, 1000/Math.log(gameData[gameData.indexOf("level") + 1]+1))
            console.log(1000/Math.log(gameData[gameData.indexOf("level") + 1]+1))
        }else{
            timer2 = setInterval(gravity, 1000/gameData[gameData.indexOf("level") + 1])
            console.log(1000/gameData[gameData.indexOf("level") + 1])
        }
        
        gameData[gameData.indexOf("actionText") + 1] = "Level Up!"
        const LU = new Audio("./SFX/levelup.wav");
        LU.play()
    }
    
    
    playWarnings();

}
function writeSubtitles(text){
    ctx.fillStyle = "#2F1254";
    ctx.fillRect(0, 718, 1024, 50);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "50px Arial";
    ctx.textBaseline = "middle";
    ctx.fillText(text,0,743);
}
/*THIS IS ALL CODE THAT IS PART OF THE GAME*/
window.addEventListener("keydown", function (event) {
    let gm = gameData[gameData.indexOf("mode") + 1]
    switch (event.key) {
    case "ArrowDown":
        if (!commandQueued&&gm==0){
            commandQueued = true;
            softDrop();
            commandQueued = false;
        }

        break;
    case "Shift":
        if (!commandQueued&&gm==0){
            commandQueued = true;
            firmDrop();
            commandQueued = false;
        }
        
        break;
    case "ArrowUp":
        if (!commandQueued&&gm==0){
            commandQueued = true;
            rotatePieceCW();
            commandQueued = false;
        }
        
        break;
    case "ArrowLeft":
        if (!commandQueued&&gm==0){
            commandQueued = true;
            movePieceLeft();
            commandQueued = false;
        }
        
        break;
    case "ArrowRight":
        if (!commandQueued&&gm==0){
            commandQueued = true;
            movePieceRight();
            commandQueued = false;
        }
        
        break;
    case "c":
        if (!commandQueued&&gm==0){
            if (gameData[gameData.indexOf("mods") + 1].indexOf("No Hold") == -1){
                commandQueued = true;
                holdPiece();
                commandQueued = false;
            }
        }
        
        break;
    case " ":
        if (!commandQueued&&gm==0){
            commandQueued = true;
            hardDrop();    
            commandQueued = false;
        }
        
        break;
    case "z": 
    if (!commandQueued&&gm==0){
        commandQueued = true;
        rotatePieceCCW();
        commandQueued = false;
    }
        
        break;
    case "Enter": 
    if (!commandQueued){
        if(gm==1||gm==2){
            commandQueued = true;
            start(gameData[gameData.indexOf("mods") + 1]);
            SELECT.play()
            commandQueued = false;
        }
    }
        break;

    case "Escape": 
    if (!commandQueued&&gm==1){
        commandQueued = true;
        drawTitleScreen();
        SELECT.play()
        commandQueued = false;
    }
        break;
    case "p": 
    if (!commandQueued&&gm==-1){
        commandQueued = true;
        drawMenuScreen();
        SELECT.play()
        commandQueued = false;
    }
    break;
    case "a": 
    if (!commandQueued&&gm==1){
        commandQueued = true;
        //drawTitleScreen();
        //achievements, add tmrw
        SELECT.play()
        commandQueued = false;
    }
        break;




        case "q": 
        if (!commandQueued&&gm==2){
            commandQueued = true;
            if(gameData[gameData.indexOf("mods") + 1].indexOf("No Next")==-1){
                gameData[gameData.indexOf("mods") + 1].push("No Next")
                ctx.fillStyle = "#D0EDAB";
                ctx.fillRect(0, 156, 77, 40);  
                const NO_NEXT = new Audio("./SFX/mod-nonext.wav");
                NO_NEXT.play()
                writeSubtitles("Next piece queue is disabled");
            }else{
                gameData[gameData.indexOf("mods") + 1].splice(gameData[gameData.indexOf("mods") + 1].indexOf("No Next"), 1)
                ctx.fillStyle = "#2F1254";
                ctx.fillRect(0, 156, 77, 40); 
            }
            SELECT.play()
            commandQueued = false;
        }
        break;


        case "w": 
        if (!commandQueued&&gm==2){
            commandQueued = true;
            if(gameData[gameData.indexOf("mods") + 1].indexOf("No Ghost Piece")==-1){
                gameData[gameData.indexOf("mods") + 1].push("No Ghost Piece")
                ctx.fillStyle = "#D0EDAB";
                ctx.fillRect(0, 201, 77, 40);  
                const NO_GHOST = new Audio("./SFX/mod-noghost.wav");
                NO_GHOST.play()
                writeSubtitles("Ghost piece is disabled");
            }else{
                gameData[gameData.indexOf("mods") + 1].splice(gameData[gameData.indexOf("mods") + 1].indexOf("No Ghost Piece"), 1)
                ctx.fillStyle = "#2F1254";
                ctx.fillRect(0, 201, 77, 40); 
                SELECT.play()
            }
            
            commandQueued = false;
        }
        break;


        case "e": 
        if (!commandQueued&&gm==2){
            commandQueued = true;
            if(gameData[gameData.indexOf("mods") + 1].indexOf("No Hold")==-1){
                gameData[gameData.indexOf("mods") + 1].push("No Hold")
                ctx.fillStyle = "#D0EDAB";
                ctx.fillRect(0, 246, 77, 40);  
                const NO_HOLD = new Audio("./SFX/mod-nohold.wav");
                NO_HOLD.play()
                writeSubtitles("Holding is disabled");
            }else{
                gameData[gameData.indexOf("mods") + 1].splice(gameData[gameData.indexOf("mods") + 1].indexOf("No Hold"), 1)
                ctx.fillStyle = "#2F1254";
                ctx.fillRect(0, 246, 77, 40); 
                SELECT.play()
            }

            commandQueued = false;
        }
        break;


        case "r": 
        if (!commandQueued&&gm==2){
            commandQueued = true;
            if(gameData[gameData.indexOf("mods") + 1].indexOf("Gravity")==-1){
                gameData[gameData.indexOf("mods") + 1].push("Gravity")
                ctx.fillStyle = "#D0EDAB";
                ctx.fillRect(0, 291, 77, 40);  
                const GRAVITY = new Audio("./SFX/mod-gravity.wav");
                GRAVITY.play()
                writeSubtitles("Gravity scales up harshly");
            }else{
                gameData[gameData.indexOf("mods") + 1].splice(gameData[gameData.indexOf("mods") + 1].indexOf("Gravity"), 1)
                ctx.fillStyle = "#2F1254";
                ctx.fillRect(0, 291, 77, 40); 
                SELECT.play()
            }

            commandQueued = false;
        }
        break;


        case "t": 
        if (!commandQueued&&gm==2){
            commandQueued = true;
            if(gameData[gameData.indexOf("mods") + 1].indexOf("Total Mayhem")==-1){
                gameData[gameData.indexOf("mods") + 1].push("Total Mayhem")
                ctx.fillStyle = "#D0EDAB";
                ctx.fillRect(0, 336, 77, 40);  
                const MAYHEM = new Audio("./SFX/mod-mayhem.wav");
                MAYHEM.play()
                writeSubtitles("Piece generation is completely random");
            }else{
                gameData[gameData.indexOf("mods") + 1].splice(gameData[gameData.indexOf("mods") + 1].indexOf("Total Mayhem"), 1)
                ctx.fillStyle = "#2F1254";
                ctx.fillRect(0, 336, 77, 40); 
                SELECT.play()
            }
            commandQueued = false;
        }
        break;


        

        

            

        
    }


  
    event.preventDefault();
  }, true);
drawTitleScreen()
function start(mods){
    MENU_THEME.pause();
    MAIN_THEME.play();
    let bg = new Image();
    bg.src = "./GFX/bg.png"
    bg.onload = function(){
        ctx.drawImage(bg, 0, 0);
    }
    board = 
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
    currentBag = generateBag(BAG);
    queue = ["Hold", "","holdArray", [], 1, "", 2, "", 3, "", 4, "", 5, "", 6, "" ];
    spawnQueue=7
    gameStats = ["lines", 0];
    pieceData = ["piece","","pieceArray", [], "x", 0, "y", 0, "oldx", 0, "oldy", 0, "movements", [], "rotation", 0];
    gameData = ["level", 1, "holdLock", false, "score", 0, "b2b", 0, "combo", 0, "actionText","", "tilt", 0 , "mode", 0, "tiltSpeed", 0
    ,"mods", mods
    ];
    timer1 = setInterval( function() { drawBoard(234,0,gameData[gameData.indexOf("tilt") + 1]); }, 10 );
    timer2 = setInterval(gravity, 1000);
    timer3 = setInterval(everyFourSeconds, 4000);
}





