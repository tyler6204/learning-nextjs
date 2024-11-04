
//calc (calculator, im just using slang here)

"use client"
import { useState } from "react"

export default function Home() {

  const [display, setDisplay] = useState("")
  
  const topRow = ["7", "8", "9", "÷"]
  const secondRow = ["4", "5", "6", "×"]
  const thirdRow = ["1", "2", "3", "-"]
  const fourthRow = ["0", ".", "+", "="]

  function handleButtonClick(item:string) {
    const operators = ["÷", "x", "-", "+"]

    if (item === "=") {
      // Calculate the result if "=" is pressed
      calculateResult()
    } else if (operators.includes(item) && operators.includes(display.slice(-1))) {
      // If the last character is already an operator, replace it with the new one
      setDisplay(display.slice(0, -1) + item)
    } else {
      // Add item to the display removing the error if it is there
      setDisplay(display.replace("Error", "") + item)
    }
  }

  // Function to calculate the result
  function calculateResult() {
    try {
      // Replace 'x' and '÷' with '*'' and '/' for evaluation
      const expression = display.replace(/×/g, "*").replace(/÷/g, "/")
      // Evaluate the expression
      const result = eval(expression)
      setDisplay(result.toString())
    } catch {
      setDisplay("Error")
    }
  }
  
  function clearDisplay () {
    setDisplay("")
  }

  return (
    <div className="h-screen flex flex-col space-y-4 justify-center items-center bg-black">

      <div className="flex flex-col space-y-4 justify-center items-center bg-gray-700 px-5 py-10 rounded-2xl">
        {/* Show the Display */}
        <div className="flex flex-row items-center justify-center bg-white w-72 h-16 rounded-xl overflow-hidden ">
          <p className="text-right w-full text-3xl whitespace-nowrap">{display}</p>
        </div>

        <div className="flex flex-row justify-between w-full">
          { topRow.map((item) => {
            return <button className="h-16 w-16 bg-white rounded-md flex items-center hover:opacity-80 justify-center text-2xl" onClick={() => handleButtonClick(item)} key={item}>{item}</button> 
          })}
        </div>
        
        <div className="flex flex-row justify-between w-full">
          { secondRow.map((item) => {
            return <button className="h-16 w-16 bg-white rounded-md flex items-center justify-center hover:opacity-80 text-2xl" onClick={() => handleButtonClick(item)} key={item}>{item}</button>
          })}
        </div>

        <div className="flex flex-row justify-between w-full">
          { thirdRow.map((item) => {
            return <button className="h-16 w-16 bg-white rounded-md flex items-center justify-center hover:opacity-80 text-2xl" onClick={() => handleButtonClick(item)} key={item}>{item}</button>
          })}
        </div>
        
        <div className="flex flex-row justify-between w-full">
          { fourthRow.map((item) => {
            return <button className={`h-16 w-16 rounded-md flex items-center justify-center text-2xl hover:opacity-80 ${(item == "=") ? "bg-orange-400" : "bg-white"}`} onClick={() => handleButtonClick(item)} key={item}>{item}</button>
          })}
        </div>


        {/* Clear Button */}
        <button className="flex justify-end w-full text-red-500 rounded-md center hover:opacity-80 " onClick={() => clearDisplay()}>Clear</button>
      </div>



    </div>
  );
}

