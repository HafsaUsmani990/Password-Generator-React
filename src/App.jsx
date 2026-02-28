import { useCallback, useEffect, useRef, useState } from "react";

function App() {

  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordref = useRef(null)
   const passwordGenerator = useCallback(()=>{
   let pass = ""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(numAllowed) str += "1234567890"
   if(charAllowed) str += "!@#$%^&*()-_+={}[]|:,."

   for (let i = 0; i <length; i++) {
     let char = Math.floor(Math.random() * str.length)
     pass += str.charAt(char)
  }
  setpassword(pass)
},
[length, numAllowed, charAllowed, setpassword])

const copyPasswordToClipBoard = useCallback(()=>{
  passwordref.current?.select();
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordGenerator()
},[length, numAllowed, charAllowed, passwordGenerator])
  

return(
    <div className="flex justify-center items-center h-screen bg-blue-950">

      <div className="w-full max-w-md mx-auto bg-slate-950 rounded-xl p-8">
        <div className="text-center mb-4 text-xl font-medium text-white">Password Generator</div>

        <div className="flex justify-center items-center bg-white w-full gap-1 rounded overflow-hidden">
          <input type="text"
          value={password}
          placeholder="Password" 
          className="flex-1 p-1 outline-none"
          readOnly
          ref={passwordref}
          />

          <button className="bg-yellow-300 px-4 py-2 font-semibold"
          onClick={copyPasswordToClipBoard}
          >Copy</button>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
  {/* Range input */}
  <div className="flex items-center gap-2 text-white accent-amber-300">
    <input
      type="range"
      min={6}
      max={100}
      value={length}
      className="cursor-pointer flex-1"
      onChange={(e) => setlength(Number(e.target.value))}
    />
    <label className="font-medium">Length:{length}</label>
  </div>

  {/* Checkbox */}
  <div className="flex items-center gap-1 text-white accent-amber-300">
    <input
      type="checkbox"
      checked={numAllowed}
      id="numberInput"
      onChange={() => setnumAllowed((prev) => !prev)}
    />
    <label htmlFor="numberInput" className="font-medium">Numbers</label>
  </div>

  <div className="flex items-center gap-1 text-white accent-amber-300">
    <input
      type="checkbox"
      checked={charAllowed}
      id="charInput"
      onChange={() => setcharAllowed((prev) => !prev)}
    />
    <label htmlFor="charInput" className="font-medium">Characters</label>
  </div>

</div>

      </div>
    </div>
)
}
export default App