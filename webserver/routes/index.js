const express = require('express');
const router = express.Router();

function orderLetters(word) {
  return word.split('').sort().join('');
}

function confirmAnagram(newWord, existingWord) {
  return orderLetters(newWord) === orderLetters(existingWord);
}

function addNewWordToCorrectBucket(newWord, anagramsHeap) {
  let addedFlag = false;
  for(const currBucket of anagramsHeap) {
    if(confirmAnagram(newWord, currBucket[0])) {
      addedFlag = true;
      currBucket.push(newWord);
    }
  }
  if(!addedFlag) {
    anagramsHeap.push([newWord]);
  }
}

router.get('/v1/anagrams', function(req, res) {
  const anagramsHeap = [];
  const words = req.query.words.split(',');
  if(words.length > 0 && words[0].length > 0) {
    words.forEach(newWord => {
      newWord = newWord.toLowerCase();
      addNewWordToCorrectBucket(newWord, anagramsHeap);
    });
  }
  res.send({ 'anagrams (v1)': anagramsHeap });
});

router.get('/v2/anagrams', function(req, res) {
  const anagramsHeap = [];
  const words = req.query.words.split(',');
  if(words.length > 0 && words[0].length > 0) {
    words.forEach(newWord => {
      addNewWordToCorrectBucket(newWord, anagramsHeap);
    });
  }
  res.send({ 'anagrams (v2)': anagramsHeap });
});

module.exports = router;
