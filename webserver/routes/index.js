const express = require('express');
const router = express.Router();

function orderLetters(word) {
  return word.split('').sort().join('');
}
function compareWords(newWord, existingWord) {
  //order the letters and compare the new strings OR return an int based on subtracting each char from one word into the other
  return orderLetters(newWord) === orderLetters(existingWord);
}
function addNewWordToCorrectBucket(newWord, anagramsHeap) {
  let addedFlag = false;
  for(const currBucket of anagramsHeap) {
    if(compareWords(newWord, currBucket[0])) {
      addedFlag = true;
      currBucket.push(newWord);
    }
  }
  if(!addedFlag) {
    anagramsHeap.push([newWord]);
  }
}

router.get('/v1/anagrams', function(req, res, next) {
  const words = req.query.words.split(',');
  if(words.length > 0 && words[0].length > 0) {
    const anagramsHeap = [];
    words.forEach(newWord => {
      newWord = newWord.toLowerCase();
      addNewWordToCorrectBucket(newWord, anagramsHeap);
    });
    res.send({ 'anagrams (v1)': anagramsHeap });
  }
  res.send();
});

router.get('/v2/anagrams', function(req, res, next) {
  const words = req.query.words.split(',');
  if(words.length > 0 && words[0].length > 0) {
    const anagramsHeap = [];
    words.forEach(newWord => {
      addNewWordToCorrectBucket(newWord, anagramsHeap);
    });
    res.send({ 'anagrams (v2)': anagramsHeap });
  }
  res.send();
});

module.exports = router;
