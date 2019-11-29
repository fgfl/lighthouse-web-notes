# W1D2 Lecture - The Dev Workflow

[The code is on GitHub!](https://github.com/NimaBoscarino/dev-workflow-notes)

Note! Take a look at the "Logic, Syntax, Data" section in these notes. It's something that I didn't bring up in lecture, but is worth reading! I might bring it up in the breakout today.

Here's a [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## Goals

Today's lecture in a nutshell: CONSOLE.LOG EVERYTHING 🕺

Goals for today:

- short discussion about Markdown
- Coding iteratively + incrementally
- How to debug
- Manual testing
- Writing clean code

General question: "How do we build towards a solution in an ideal manner?"

## Markdown Intro

#### This is a heading 4

1. This
2. Is
3. A list!

- This is
- another
- list
	- wow
	- such indent

I am writing a big chunk of text. Here is some inline code `hahaha lmao for loop...`.

```js
console.log('haha')
let name = 'Kanye'
```

```python
print('hello!')
```

[I am a link](https://placedog.net/500)

And here is an image 🐶

![](https://i.imgur.com/TU6iVag.jpg)


## TODAY'S PROBLEM:

"Write a node program that takes in an unlimited number of command line arguments, goes through each, and then prints out the sum. Skip any non-whole numbers, but DO support negative numbers."

I like to break this down into the smallest little bits possible to make sure that I fully understand what the question is asking of me. Below is the bullet-point list that I made during the lecture.

```
Write a Node program - ✅

that takes in an unlimited number of command-line arguments that are numbers (remove the first two elements of the process.argv array) - ✅

goes through each - ✅🕺

and then prints out the sum of the numbers - ✅🕺
	- start counting from 0, add each number to the total count

Skip any non-whole numbers. <--- What if I don't lol

Do support negative numbers. <-- How about I just don't care about this right now? - ✅🕺
```

Your list may look similar or different, but do try to make sure that you fully understand what the question is asking of you before you dive into writing any code.

Generally, I also think it's helpful to clearly identify the INPUTS and OUTPUTS expected. That will help you set goals, and evaluate how close/far you are from solving a problem.

In today's case...

INPUT: AN UNLIMITED NUMBER OF COMMAND LINE ARGUMENTS

OUTPUT: THE SUM OF THE NUMBERS GIVEN (NON-WHOLE)

Right off the bat, we didn't know what "command line arguments" were. That's where we *STOP* before we right any code, and do a little bit of research to fully understand that. Since today's lecture is more about approach (not command line arguments) I gave us the answer, but usually it will take you some time to find what you're looking for.

## Nima's Tip on wow to figure out problems

(Doctors HATE him!)

Try it out on your own for 15 minutes.

- Look at Google!
- Look at documentation!
- Look at Stack Overflow!

Flow
====

Early on in bootcamp:

1. Stack Overflow
2. The docs. (The node JS docs, or the MDN --- the best!)
3. Medium posts, general blogs

1 and 2 switch next week.

Then ask for help from a peer.
Then put yourself in the queue.

## Incremental Programming

Generally, it's these three steps!

Rinse and repeat forever:

1) Make hypothesis
2) Test hypothesis
3) Make changes

We started by trying to run a file that didn't even exist, and found that we could incrementally solve issues and set new goals for ourselves.

## Make some test cases:

`node sum.js 1 2 3 4 --> 10`

`node sum.js 2 5 3 6 --> 16`

`node sum.js 1 5 -1 --> 5`

`node sum.js 3 4 0.5 --> 7`

## Debugging

When you're learning something new in Javascript, I recommend playing around with it in the REPL. You can access the REPL by typing `node` in your Vagrant terminal. When you're ready to leave the REPL, you can press `Ctrl + C` twice.

NODE REPL: 
- Read whatever you write
- Evaluate the output
- Print the output
- Loop - rinse and repeat

I didn't really talk about this in lecture, but one way to narrow down the possible things that could be wrong with your code is to pass through with three different lenses:

## LSD - LOGIC SYNTAX DATA

Go through in this order!

LOGIC: Is the high-level structure of my program expressing what I want to express? Do the loops/if-else/etc. contribute to solving the problem?

SYNTAX: Did I get some of the syntax wrong? Do I have extra braces somewhere? Am I using +, -, ===, etc. properly?

DATA: Is the structure of the data that I'm working with correct?

## More Debugging

You may find it useful to use a debugger to go through your code step by step. I showed off the built-in debugger, which can be triggered with `node inspect <FILENAME>`.

There are a couple different commands that you can use while you're in `inspect` mode.

1. `cont` - Continue the program until the next breakpoint (`debugger` line in your code)
2. `repl` - Hop into the REPL at *that* point in your code, where you'll have access to any variables or functions that have been created. Exit out of the `repl` mode with `Ctrl + C`.
3. `step` - step forward a little bit in your program.
4. `.exit` - leave the debugger.

There are other commands, and I suggest looking them up!

## BUGS HAPPEN BECAUSE CODE CAN BE OPAQUE

- MAKING YOUR CODE AS TRANSPARENT AS POSSIBLE can curb those issues.

## Final Note

If you're stuck on an issue for more than 15 minutes (i.e. google, ask others around you, look at docs/stackoverflow...) then you should ask for mentor help!

Here are KV's notes for the same lecture, for reference: https://web.compass.lighthouselabs.ca/activities/56/lectures/2130
