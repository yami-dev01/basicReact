// password generator

import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState<number>(8)
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false)
  const [charAllowed, setCharAllowed] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")

  // useRef hook
  const passwordRef = useRef<HTMLInputElement>(null)

  const passwordGenerator = useCallback(() => {
    let currentPassword = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length)
      currentPassword += str.charAt(char)
    }

    setPassword(currentPassword)

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

      <h1 className="text-white text-center my-3">
        Password generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">

        <div className="flex items-center gap-x-1">
          <input
            type="range"
            value={length}
            min={6}
            max={100}
            className="cursor-pointer"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLength(Number(e.target.value))
            }
          />

          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
          />

          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />

          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
    </div>
  )
}

export default App
