var express = require('express');
var router = express.Router();

// function compareWords(newWord, existingWord) {
//   //order the letters and compare the new strings OR return an int based on subtracting each char from one word into the other
//   if (newWord === existingWord) {
//     return 0;
//   }
// }

router.get('/v1/anagrams', function(req, res, next) { //take in query params
  const anagramsHeap = [['nothing', 'ThingOn'], ['hello']];
  //run query params one at a time comparing to each existing "bucket" in anagramsHeap
  //first take the word and lower-case it
  //if the next word "fits" the first word in the current "bucket", add it to the bucket
  // else move on to the next "bucket" and check again...
  //if there are no "buckets" that "fit" the current word, add it as it's own bucket to the end of anagramsHeap
  res.send({ 'anagrams (v1)': anagramsHeap });
});

router.get('/v2/anagrams', function(req, res, next) { //take in query params
  const anagramsHeap = [['Boo', 'ooB'], ['fake', 'kafe'], ['Kafe'], ['pot']];
  //run query params one at a time comparing to each existing "bucket" in anagramsHeap
  //if the next word "fits" the first word in the current "bucket", add it to the bucket
  // else move on to the next "bucket" and check again...
  //if there are no "buckets" that "fit" the current word, add it as it's own bucket to the end of anagramsHeap
  res.send({ 'anagrams (v2)': anagramsHeap });
});

module.exports = router;
