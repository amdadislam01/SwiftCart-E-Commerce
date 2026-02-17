## 1) What is the difference between null and undefined?
JavaScript এ `undefined` মানে হলো কোনো ভ্যারিয়েবল declare করা হয়েছে কিন্তু তাকে এখনো কোনো মান দেওয়া হয়নি।

``` js
let name;
console.log(name); 
```
null মানে হলো ইচ্ছাকৃতভাবে কোনো মান নেই সেটি বোঝানো।
``` js
let user = null;
```
## 2) What is the use of the map() function in JavaScript? How is it different from forEach()?
map() একটি array এর প্রতিটি element এর উপর কাজ করে এবং একটি নতুন array return করে
``` js
let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2);
console.log(doubled);
```
forEach() প্রতিটি element এর উপর কাজ করে কিন্তু কোনো নতুন array return করে না
``` js
numbers.forEach(num => {
  console.log(num * 2);
});
```
## 3) What is the difference between == and ===?
== হলো loose equality operator। এটি value তুলনা করে, কিন্তু প্রয়োজনে type convert করে নেয়
``` js
console.log(5 == "5"); 
```
=== হলো strict equality operator। এটি value এবং type দুটোই চেক করে
```js 
console.log(5 === "5");
```
## 4) What is the significance of async/await in fetching API data?
async/await ব্যবহার করলে asynchronous code অনেক সহজ ও পরিষ্কার হয়।
API call করতে সময় লাগে, তাই JavaScript promise ব্যবহার করে। async/await promise handle করা সহজ করে দেয়
``` js
async function getData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
```
## 5) Explain the concept of Scope in JavaScript (Global, Function, Block).
Scope মানে হলো কোনো ভ্যারিয়েবল কোথা থেকে access করা যাবে।

Global Scope যে ভ্যারিয়েবল পুরো প্রোগ্রাম জুড়ে ব্যবহার করা যায়
``` js 
let name = "Amdad";
function show() {
  console.log(name);
}
```
Function Scope যে ভ্যারিয়েবল একটি function এর ভিতরে declare করা হয়, তা শুধু সেই function এর ভিতরেই ব্যবহার করা যায়
``` js
function test() {
  let age = 20;
  console.log(age);
}
```
Block Scope let এবং const দিয়ে declare করা ভ্যারিয়েবল {} block এর ভিতরেই সীমাবদ্ধ থাকে
``` js 
if (true) {
  let city = "Dhaka";
}
console.log(city); 
```
