W1D4 - Khurram Virani (KV) - Nov 28, 2019
=====

## 1. Joke [1m]

Got some laughs. Okay maybe just a few chuckles ;)

## 2. About Me [3m]

- Background: ~ 15y of software development experience.
- Style & Philosophy
- Weaknesses: I talk fast. Working on it! Not much experience with React (which we cover!) or other front end frameworks (and that's okay!)

## 3. Dev Approach: Reading Code [5m]

We talked about the importance of learning to read code (it will happen naturally too) and some tips around that. My big suggestion was to read code in the order that you expect it to execute, while still using your human intuition to skip steps, make assumptions, etc.

## 4. Review: Functions As Values [10m]

- *Discussion: Languages aside, what is Software made of?*
  - Software is made up of Data (State) and Logic (Behaviour)
  - Behavior is usually made up of functions (and other things)

- Functions as values means we can pass functions around instead of just calling them. 
  - This means we can pass around behavior!

## 5. Objects Review (Challenge) [30m]

- Dev Approach: EDD... KV's Favourite!
  - Error Driven Development
  - Work incrementally, intentionally causing errors and fixing them at each step
  - We talked about the benefits of this
- Did a objects-based challenge (see file 5)

## 6. Back to Functions: "Callbacks" [40m]

See files 6, 7, 8 and 9

## Things we learned

- EDD is good (Error driven development)
- Objects are used for mapping K => V
  - Which means we can use them to map letter h to 4 to implement leetSpeak
  - We used the square bracket notation
- Functions are values
  - You can even assign them to other variables and pass them into other functions
  - Bonus: Functions are actually OBJECT values
- We learned functions can take in functions
  - aka Higher Order Functions
  - HOF can also NOT take in functions but return functions
- Callbacks 
  - When you pass a function into another function, its meant meant to be called by the HoF, and therefore it can be referred to as a "callback" function. 
  - Other terms for callback include "delegate", "predicate"
