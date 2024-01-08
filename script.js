const grid = document.getElementById('grid-container')
const modal = document.getElementById('myModal')
window.onclick = (e) => {if (e.target == modal) modal.style.display = 'none'}
for (let i = 0; i < 16; i++) {
    const newBlock = document.createElement('span')
    if (i < 15) newBlock.textContent = i + 1
    newBlock.id = i
    if (i < 15) newBlock.className = 'block'
    grid.appendChild(newBlock)
}