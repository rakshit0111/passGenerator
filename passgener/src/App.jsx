import { useState,useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const passRef = useRef(null)
  const passGenerator = useCallback(() => {
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)str += "0123456789"
    if(characterAllowed)str += "!@#$^%&*"

    for(let i = 1 ; i<= length ; i++)
      {
        let char = Math.floor((Math.random() * str.length) + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  },[length,numberAllowed,characterAllowed,setPassword])

  const copyPass = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } ,[password])
  useEffect(() => {passGenerator()},[length,numberAllowed,characterAllowed,passGenerator])

  return (
    <>
      
      <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-10 py-10  text-orange-500 opacity-100'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4' >
          <input 
          type='text'
          value={password} 
          className='outline-none w-full py-5 px-3 cursor-not-allowed'
          placeholder='Password'
          readOnly
          ref={passRef}
          ></input>
          <button onClick = {copyPass} className='px-7 py-5 font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 ease-in-out border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'>Copy</button>
        </div>
        <div className='flex  text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
            <input
              
              type="range"
              min={6}
              max={26}
              value={length}
              className='cursor-pointer duration-200'
              onChange={(e)=>{setLength(e.target.value)}}
              />
              <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
            <input
              
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              className='cursor-pointer duration-200'
              onChange={() => {
                setnumberAllowed((prev) => !prev);
            }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
            <input
              
              type="checkbox"
              defaultChecked={characterAllowed}
              id='characterInput'
              className='cursor-pointer duration-200'
             onChange={
              () => {
                setcharacterAllowed((prev) => !prev);
              }
             }
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
