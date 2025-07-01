
/*-------------------------------- Constants --------------------------------*/
 const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner 
let tie 


/*------------------------ Cached Element References ------------------------*/
 const squareEls = document.querySelectorAll('.sqr')
 const messageEl = document.querySelector('#message')
 const resetBtnEl = document.querySelector('#reset')
 

/*-------------------------------- Functions --------------------------------*/
 function init(){
    board =[
    '' , '' , '' ,
    '' , '' , '' ,
    '' , '' , ''
]
 turn = 'X'
 winner = false
 tie = false 
 
  render()

   
 }
  init()
  

   function updateBoard(){
     board.forEach((value , index) => {
        squareEls[index].textContent = value
     });
   }


    function updateMessage() {
       if(!winner && !tie){ 
        messageEl.textContent = ` ${turn}'s turn`
      } else if(!winner && tie){
          messageEl.textContent = "It's a tie!"
      } else if(winner){
             messageEl.textContent = ` ${turn} wins!`
      }
    }

     function render(){
        updateBoard()
        updateMessage()
    }

    function handleClick(event) {
  console.log("Square clicked!", event.target.id)
  const squareIndex = event.target.id
  if(board[squareIndex] !== '' || winner || tie)return
  placePiece(squareIndex)
   checkForWinner()
   checkForTie()
   if(!winner){
    switchPlayerTurn()
   }
    render()
    }

    function placePiece(index){
     board[index] = turn
     console.log("Board after placePiece:", board)
    }

    function checkForWinner() {
        for (let combo of winningCombos) {
    const [a, b, c] = combo
     if(board[a] !== '' && board[a] === board[b] && board[a] === board[c]){
        winner = true
      return 
     }
      
      }
       winner = false
   }

   function checkForTie(){
    if(winner) return
    if(board.includes('')) {
        tie = false
    } else {
        tie = true
    }

   }

   function switchPlayerTurn() {
    if(winner) return
    if(turn === 'X'){
        turn = 'O'
    } else{
        turn = 'X'
    }
   }
/*----------------------------- Event Listeners -----------------------------*/
 squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
 })
 resetBtnEl.addEventListener('click', init)
