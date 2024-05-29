import { useState,useCallback } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password,setPassword] = useState("")

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

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-10 py-10 my-8 text-orange-500 bg-gray-700'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4' >
          <input 
          type='text'
          value={password} 
          className='outline-none w-full py-5 px-3'
          placeholder='Password'
          readOnly
          ></input>
        </div>
      </div>
    </>
  )
}

export default App
