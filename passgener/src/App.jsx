import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPass = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numberAllowed, characterAllowed, passGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-6 sm:p-10 my-8 text-black font-bold opacity-100">
    
        <div className="flex flex-col sm:flex-row shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 sm:py-5 px-3 cursor-not-allowed text-base sm:text-lg"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPass}
            className="mt-2 sm:mt-0 sm:ml-2 px-4 sm:px-7 py-2 sm:py-5 font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 ease-in-out border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col sm:flex-row text-sm gap-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={26}
              value={length}
              className="cursor-pointer duration-200"
              onChange={(e) => { setLength(e.target.value); }}
            />
            <label className="ml-2 text-yellow-500">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              className="cursor-pointer duration-200"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="ml-2 text-yellow-500">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              className="cursor-pointer duration-200"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="ml-2 text-yellow-500">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
