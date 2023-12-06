const { readFile } = require("fs").promises;
const { match } = require("assert");
const path = require("path");

const readInput = async () =>
  await readFile(path.dirname(process.argv[1]) + "/../input.txt");



(async ()=>{
    const input = await readInput()
    const lines = input.toString().split("\n")
    

    
    const s1 =lines.map((line)=>{
        const numbers = line.split("").filter(Number)
        const first = numbers[0]
        const last = numbers.pop()

        return Number(first + last)
    }).reduce((a,b)=>a+b,0)

    
    const words = {
      one: "o1e",
      two: "t2o",
      three: "thr3e",
      four: "fou4r",
      five: "fiv5e",
      six: "s6x",
      seven: "sev7n",
      eight: "eig8t",
      nine: "nin9e",
    };

    const s2 = lines.map((line)=>{
      const numbers = Object.keys(words).reduce((acc,key)=>acc.replaceAll(key,words[key]),line).split("").filter(Number)
      const first = numbers[0]
      const last = numbers.pop()
      return Number(first + last)
    }).reduce((a,b)=>a+b,0)
    
    console.log("Star 1: ", s1);
    console.log("Star 2: ", s2);
})()