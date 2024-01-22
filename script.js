const grid = document.getElementById('grid-container')
const modal = document.getElementById('myModal')
window.onclick = e => {if (e.target == modal) modal.style.display = 'none'}
let numPieces = 15
let gridLen = Math.floor(Math.sqrt(numPieces+1))
// [piece that can move up, piece that can move down, piece that can move left, piece that can move right]
const piecesThatCanMove = [null, null, null, null]
for (let i = 0; i <= numPieces; i++) {
    const newBlock = document.createElement('span')
    newBlock.id = i
    if (i < numPieces) {
        newBlock.textContent = i + 1
        newBlock.className = 'block'
    }
    newBlock.onclick = ({target: {id}}) => movePiece(id)
    grid.appendChild(newBlock)
}
const pieceArray = []
for (const node of grid.childNodes) pieceArray.push(node.id)
/*
[
     0,  1,  2,  3,
     4,  5,  6,  7,
     8,  9, 10,  11,
    12, 13, 14,  15, where 15 is the blank
]
*/
let emptyPosition = numPieces
function updatePiecesThatCanMove() {
    // only pieces bordering the 0 can move
    emptyPosition = pieceArray.indexOf(`${numPieces}`)
    // if the 15 is not at the right edge, the piece to the right of it can move left 
    piecesThatCanMove[2] = ((emptyPosition + 1) % gridLen != 0) ? pieceArray[emptyPosition+1] : null
    // if the 15 is not at the left edge, the piece to the left of it can move right
    piecesThatCanMove[3] = ((emptyPosition - 1) % gridLen != 0) ? pieceArray[emptyPosition-1] : null
    // if the 15 is not at the top edge, the piece above it can move down
    piecesThatCanMove[1] = (emptyPosition >= gridLen) ? pieceArray[emptyPosition - gridLen] : null
    // if the 15 is not at the bottom edge, the piece below it can move up
    piecesThatCanMove[0] = (emptyPosition < (gridLen*(gridLen - 1))) ? pieceArray[emptyPosition + gridLen] : null
    console.log(piecesThatCanMove)
}
function movePiece(id) {
    updatePiecesThatCanMove()
    let direction = piecesThatCanMove.indexOf(id)
    if (direction < 0) return
    let pieceClickedIdx = pieceArray.indexOf(id)
    let pieceClicked, placeHolderPiece
    switch (direction) {
        // swap 15 and the one below
        case 0:
            // remove the one above
            pieceClicked = pieceArray.splice(pieceClickedIdx, 1)[0]
            placeHolderPiece = pieceArray.splice(emptyPosition, 1)[0]
            pieceArray.splice(emptyPosition, 0, pieceClicked)
            pieceArray.splice(pieceClickedIdx, 0, placeHolderPiece)
            emptyPosition = pieceClickedIdx
            break
        // swap 15 and the one above
        case 1:
            placeHolderPiece = pieceArray.splice(emptyPosition, 1)[0]
            pieceClicked = pieceArray.splice(pieceClickedIdx, 1)[0]
            pieceArray.splice(pieceClickedIdx, 0, placeHolderPiece)
            pieceArray.splice(emptyPosition, 0, pieceClicked)
            emptyPosition = pieceClickedIdx
            break
        // swap 15 and the one to its right
        case 2:
            pieceClicked = pieceArray.splice(pieceClickedIdx, 1)[0]
            placeHolderPiece = pieceArray.splice(emptyPosition, 1)[0]
            pieceArray.splice(emptyPosition, 0, pieceClicked)
            pieceArray.splice(pieceClickedIdx, 0, placeHolderPiece)
            emptyPosition = pieceClickedIdx
            break
        // swap 15 and the one to its left
        case 3:
            placeHolderPiece = pieceArray.splice(emptyPosition, 1)[0]
            pieceClicked = pieceArray.splice(pieceClickedIdx, 1)[0]
            pieceArray.splice(pieceClickedIdx, 0, placeHolderPiece)
            pieceArray.splice(emptyPosition, 0, pieceClicked)
            emptyPosition = pieceClickedIdx
            break
    }
    for (const id of pieceArray) grid.appendChild(document.getElementById(id))
}
function scramble() {
    let piecesThatCanActuallyMove = piecesThatCanMove.filter(x => x != null)
    let lastPieceMoved = piecesThatCanActuallyMove[Math.floor(Math.random() * piecesThatCanActuallyMove.length)]
    for (let i = 0; i < 1000; i++) {
        movePiece(lastPieceMoved)
        piecesThatCanActuallyMove = piecesThatCanMove.filter(x => x != null)
        let newPiece = piecesThatCanActuallyMove[Math.floor(Math.random() * piecesThatCanActuallyMove.length)]
        while (newPiece == lastPieceMoved) newPiece = Math.floor(Math.random() * 15)
        lastPieceMoved = newPiece
        movePiece(lastPieceMoved)
    }
}