class Game {
    numPieces = 15
    gridLen = Math.floor(Math.sqrt(this.numPieces+1))
    // [piece that can move up, piece that can move down, piece that can move left, piece that can move right]
    piecesThatCanMove = [null, null, null, null]
    pieceArray = []
    /*
    [
         0,  1,  2,  3,
         4,  5,  6,  7,
         8,  9, 10,  11,
        12, 13, 14,  15, where 15 is the blank
    ]
    */
    emptyPosition = gridLen**2-1
    constructor(pieceElements) {
        this.pieceArray = pieceElements
    }
    updatePiecesThatCanMove() {
        for (let i = 0; i < this.piecesThatCanMove.length; i++) this.piecesThatCanMove[i] = null
        // only pieces bordering the 0 can move
        emptyPosition = this.pieceArray.findIndex(x => x.id == 15)
        // if the 15 is not at the right edge, the piece to the right of it can move left 
        if ((this.emptyPosition + 1) % this.gridLen != 0) this.piecesThatCanMove[2] = this.pieceArray[position+1].id 
        // if the 15 is not at the left edge, the piece to the left of it can move right
        if ((this.emptyPosition - 1) % this.gridLen != 0) this.piecesThatCanMove[3] = this.pieceArray[position-1].id
        // if the 15 is not at the top edge, the piece above it can move down
        if (this.emptyPosition >= this.gridLen) this.piecesThatCanMove[1] = this.pieceArray[position - this.gridLen].id
        // if the 15 is not at the bottom edge, the piece below it can move up
        if (this.emptyPosition < (this.gridLen*(this.gridLen - 1))) this.piecesThatCanMove[0] = this.pieceArray[position + this.gridLen].id 
    }
    movePiece(id) {
        this.updatePiecesThatCanMove()
        let direction = this.piecesThatCanMove.indexOf(id)
        if (direction > -1) {
            let pieceClickedIdx = this.pieceArray.findIndex(x => x.id == id)
            switch (direction) {
                // swap 15 and the one below; the 15 has a smaller index so it should be removed second
                case 0:
                    // remove the one above
                    let pieceClicked = this.pieceArray.splice(pieceClickedIdx, 1)
                    let placeHolderPiece = this.pieceArray.splice(this.emptyPosition, 1)
                    this.pieceArray.splice(this.emptyPosition, 0, pieceClicked)
                    this.pieceArray.splice(pieceClickedIdx, 0, placeHolderPiece)
                    this.emptyPosition = pieceClickedIdx
                    break
                // swap 15 and the one above; the 15 has a greater index so it should be removed first
                case 1:
                    placeHolderPiece = this.pieceArray.splice(this.emptyPosition, 1)
                    pieceClicked = this.pieceArray.splice(pieceClickedIdx, 1)
                    this.pieceArray.splice(this.emptyPosition, 0, pieceClicked)
                    this.pieceArray.splice(pieceClickedIdx, 0, placeHolderPiece)
                    this.emptyPosition = pieceClickedIdx
                    break
                case 2:
                    break
                case 3:
                    break
                default:
                    console.log('lol how')
                    break
            }
        }
    }
    scramble() {
        let lastPieceMoved = Math.floor(Math.random() * 15)
        for (let i = 0; i < 1000; i++) {
            this.movePiece(/*not the last piece*/)
        }
    }
}