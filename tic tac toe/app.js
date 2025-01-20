// accessing elements using query selectors
let boxes = document.querySelectorAll(".box");
let restartBtn = document.querySelector(".rst-game");
let newGamebtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

//Deciding alternate turns players
let turnX = true;

//assigning winning patterns
const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
   
    
const resetGame = () =>{
    let turnX = true;
    enableBtns();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){
            box.innerText="X";
            turnX=false;
        }else{
            box.innerText="O";
            turnX=true;
        }
        box.disabled = true;//for each box can be clicked once only

        checkWinner ();
        
        
    });
});
   const disableBtns = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
   }

   const enableBtns = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
   }

    const showWinner = (winner) =>{
       msg.innerText = `Congratulations, winner is ${winner} `;
       msgContainer.classList.remove("hide");
       disableBtns();
        };

    const checkWinner = () => {
        for( let pattern of winpatterns){
          
            let pos1val = boxes[pattern[0]].innerText;
            let pos2val = boxes[pattern[1]].innerText;
            let pos3val = boxes[pattern[2]].innerText;

            if(pos1val != "" && pos2val != "" && pos3val != ""){
                if(pos1val === pos2val && pos2val === pos3val){
                    showWinner (pos1val);
                }
            }
    };
};
newGamebtn.addEventListener("click",resetGame);
restartBtn.addEventListener("click",resetGame);
 