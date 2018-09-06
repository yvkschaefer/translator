const addButton = document.getElementById('addModal')

const modal = document.getElementById('myModal')

const closeButton = document.getElementsByClassName('close')[0]

addButton.onclick = function(){
  modal.style.display = 'block'
}

closeButton.onclick = function(){
  modal.style.display = 'none'
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}