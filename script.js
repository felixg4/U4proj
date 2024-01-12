const grid = document.getElementById('grid-container')
const modal = document.getElementById('myModal')
const gameHandler = new Game(grid.childNodes.entries())
window.onclick = (e) => {if (e.target == modal) modal.style.display = 'none'}
let numPieces = 15
let gridLen = Math.floor(Math.sqrt(numPieces+1))
// [piece that can move up, piece that can move down, piece that can move left, piece that can move right]
const piecesThatCanMove = [null, null, null, null]
/*
[
     0,  1,  2,  3,
     4,  5,  6,  7,
     8,  9, 10,  11,
    12, 13, 14,  15, where 15 is the blank
]
*/
let emptyPosition = gridLen**2-1
function updatePiecesThatCanMove() {
    for (let i = 0; i < piecesThatCanMove.length; i++) piecesThatCanMove[i] = null
    // only pieces bordering the 0 can move
    console.log(pieceArray())
    emptyPosition = pieceArray().findIndex(x => x.id == 15)
    // if the 15 is not at the right edge, the piece to the right of it can move left 
    if ((emptyPosition + 1) % gridLen != 0) piecesThatCanMove[2] = pieceArray()[emptyPosition+1].id 
    // if the 15 is not at the left edge, the piece to the left of it can move right
    if ((emptyPosition - 1) % gridLen != 0) {
        console.log(emptyPosition)
        console.log(pieceArray()[emptyPosition - 1].id)
        piecesThatCanMove[3] = pieceArray()[emptyPosition-1].id
    }
    // if the 15 is not at the top edge, the piece above it can move down
    if (emptyPosition >= gridLen) piecesThatCanMove[1] = pieceArray()[emptyPosition - gridLen].id
    // if the 15 is not at the bottom edge, the piece below it can move up
    if (emptyPosition < (gridLen*(gridLen - 1))) piecesThatCanMove[0] = pieceArray()[emptyPosition + gridLen].id 
}
function movePiece(id) {
    updatePiecesThatCanMove()
    let direction = piecesThatCanMove.indexOf(id)
    if (direction < 0) return
    let pieceClickedIdx = pieceArray().findIndex(x => x.id == id)
    
    let pieceClicked, placeHolderPiece
    switch (direction) {
        // swap 15 and the one below; the 15 has a smaller index so it should be removed second
        case 0:
            // remove the one above
            pieceClicked = pieceArray().splice(pieceClickedIdx, 1)
            placeHolderPiece = pieceArray().splice(emptyPosition, 1)
            pieceArray().splice(emptyPosition, 0, pieceClicked)
            pieceArray().splice(pieceClickedIdx, 0, placeHolderPiece)
            emptyPosition = pieceClickedIdx
            break
        // swap 15 and the one above; the 15 has a greater index so it should be removed first
        case 1:
            console.log('ok')
            placeHolderPiece = pieceArray().splice(emptyPosition, 1)
            pieceClicked = pieceArray().splice(pieceClickedIdx, 1)
            pieceArray().splice(emptyPosition, 0, pieceClicked)
            pieceArray().splice(pieceClickedIdx, 0, placeHolderPiece)
            emptyPosition = pieceClickedIdx
            break
        // swap 15 and the one to its right; the 16 has a smaller index so it should be removed second
        case 2:
            pieceClicked = pieceArray().splice(pieceClickedIdx, 1)
            placeHolderPiece = pieceArray().splice(emptyPosition, 1)
            pieceArray().splice(emptyPosition, 0, pieceClicked)
            pieceArray().splice(pieceClickedIdx, 0, placeHolderPiece)
            emptyPosition = pieceClickedIdx
            break
        // swap 15 and the one to its left; the 15 has a greater index so it should be removed first
        case 3:
            placeHolderPiece = pieceArray().splice(emptyPosition, 1)
            pieceClicked = pieceArray().splice(pieceClickedIdx, 1)
            pieceArray().splice(emptyPosition, 0, pieceClicked)
            pieceArray().splice(pieceClickedIdx, 0, placeHolderPiece)
            emptyPosition = pieceClickedIdx
            break
        default:
            console.log('lol how')
            break
    }
}
function scramble() {
    let lastPieceMoved = Math.floor(Math.random() * 15)
    for (let i = 0; i < 1000; i++) {
        movePiece(lastPieceMoved)
        let newPiece =  Math.floor(Math.random() * 15)
        while (newPiece == lastPieceMoved) newPiece = Math.floor(Math.random() * 15)
        lastPieceMoved = newPiece
        movePiece(lastPieceMoved)
    }
}

for (let i = 0; i < 16; i++) {
    const newBlock = document.createElement('span')
    newBlock.id = i
    if (i < 15) {
        newBlock.textContent = i + 1
        newBlock.className = 'block'
    }
    newBlock.onclick = ({target: {id}}) => movePiece(id)

    grid.appendChild(newBlock)
}
const pieceArray = () => Array.from(grid.children)