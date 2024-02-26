import React from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from "react-confetti";

export default function App(){

const [diceArr,setDiceArr] = React.useState(allNewDice());
const [tenzies,setTenzies] = React.useState(false);

React.useEffect(
  ()=>{
    const allHeld=diceArr.every((dice)=>dice.isHeld)
    const firstValue=diceArr[0].value;
    const allSameValue=diceArr.every((dice)=>dice.value===firstValue)
    if(allHeld && allSameValue){
    setTenzies(true)
    console.log('you won!')
    }
  },[diceArr]
)

function newValue(){
  const obj={}
  const num = ( Math.ceil(Math.random() * 6));
  obj['value']=num;
  obj['isHeld']=false;
  obj['id']=nanoid();
  return(obj)
}


function allNewDice(){
  const arr=[]
  for(let i=0;i<10;i++){
  arr.push(newValue())
  }
  return(arr)

}


function holdDice(id){
  setDiceArr((diceArr)=>{
    return diceArr.map((dice)=>{
      return dice.id===id? {...dice, isHeld:!dice.isHeld} :dice
   })
   })
}


function rollDice(){
  setDiceArr((oldDice)=>{
    return oldDice.map((dice)=>{
    return dice.isHeld? dice : newValue()
  })
  })
}



  


const diceElements = diceArr.map(dice=><Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={holdDice} id={dice.id}/>)

  return(
  <main className="container">
    <h1>Tenzies</h1>
    <p>Roll untill all dice are the same.Click<br></br>
    each die to freeze it at its current value<br></br>
    between rolls.</p>
    <div className="dice-values">
      {diceElements}
      </div>
    <button className="roll-dice" onClick={rollDice}>{tenzies? 'New Game' : 'Roll'}</button>
    <div>
      {tenzies && <Confetti />}
    </div>
  </main>)


}