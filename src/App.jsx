import { useRef } from "react";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllow, setNumberAllow] = useState(false);
  const [characterAllow, setCharacterAllow] = useState(false);
  const [password, setPassword] = useState("");

  // useRef - kono kichur jodi reference nite hoi takhn ata use kora hoi
  let passwordRef = useRef();
  const CopyToClipBoard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useCallback - return memorized function,
  // is a React Hook that lets you cache a function definition between re-renders.
  // During subsequent renders, it will either return an already stored fn  function from the last render
  //      (if the dependencies haven’t changed), or return the fn function you have passed during this render.

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += 1234567890;
    if (characterAllow) str += "!@#$%^&*()_+|}{:?><";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, characterAllow, setPassword]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, setPassword, numberAllow, characterAllow]);

  return (
    <>
      <h1 className="text-center text-4xl text-red-500 mt-10 font-bold">
        Random Text Generator
      </h1>
      <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl px-3 py-3 my-8 text-orange-700 font-bold bg-gray-600">
        <div className="flex shadow-lg rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="px-3 py-1 outline-none w-full"
            ref={passwordRef}
          />
          <button
            className="bg-blue-700 px-4 py-2 hover:bg-emerald-600 duration-300"
            onClick={CopyToClipBoard}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="flex gap-x-4 justify-center text-orange-700">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={16}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="mr-6">Length ({length})</label>

          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={numberAllow}
            onChange={() => setNumberAllow((prev) => !prev)}
          />
          <label className="mr-6">Number</label>

          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={characterAllow}
            onChange={() => setCharacterAllow((prev) => !prev)}
          />
          <label>Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
