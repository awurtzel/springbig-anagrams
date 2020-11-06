const request = require('supertest');
const app = require('../app');

describe('anagrams lowercase tests', () => {
  it('should return empty array if words is empty', async () => {
    const res = await request(app).get('/v1/anagrams?words=');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({ 'anagrams (v1)': [] });
  });
  it('should return correct output when given different caps', async () => {
    const res = await request(app).get('/v1/anagrams?words=nothing,hello,ThingOn');
    const expectedAnagramsHeap = [['nothing', 'thingon'], ['hello']];
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({'anagrams (v1)': expectedAnagramsHeap });
  });
  it('should return correct output (sample data)', async () => {
    const res = await request(app).get('/v1/anagrams?words=ate,bar,loop,Pool,TEA,pet,BAR');
    const expectedAnagramsHeap = [['ate', 'tea'], ['bar', 'bar'], ['loop', 'pool'], ['pet']];
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({'anagrams (v1)': expectedAnagramsHeap });
  });
  it('should return correct output when given a difficult set of words', async () => {
    const res = await request(app)
      .get('/v1/anagrams?words=beEp,fake,Cake,Beep,peeB,BEPE,Kafe,PEbe,woke,peeb,KoWe,pebe,keeb,PeeB');
    const expectedAnagramsHeap = [
      ['beep', 'beep', 'peeb', 'bepe', 'pebe', 'peeb', 'pebe', 'peeb'],
      ['fake', 'kafe'], ['cake'], ['woke', 'kowe'], ['keeb']]; 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({'anagrams (v1)': expectedAnagramsHeap }); 
  });
});

describe('anagrams case-sensitive tests', () => {
  it('should return empty array if words is empty', async () => {
    const res = await request(app).get('/v2/anagrams?words=');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({ 'anagrams (v2)': [] });
  });
  it('should return correct output when given different caps', async ( )=> {
    const res = await request(app).get('/v2/anagrams?words=Boo,fake,kafe,Kafe,ooB,pot');
    const expectedAnagramsHeap = [['Boo', 'ooB'], ['fake', 'kafe'], ['Kafe'], ['pot']];
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({'anagrams (v2)': expectedAnagramsHeap });
  });
  it('should return correct output (sample data)', async () => {
    const res = await request(app).get('/v2/anagrams?words=pot,Top,opt,owl,Low,owL');
    const expectedAnagramsHeap = [['pot', 'opt'], ['Top'], ['owl'], ['Low', 'owL']];
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({'anagrams (v2)': expectedAnagramsHeap });
  });
  it('should return correct output when given a difficult set of words', async () => {
    const res = await request(app)
      .get('/v2/anagrams?words=word,iceman,words,thing,flame,give,lol,OLL,cinema,giv,Ghint,Swords,sword,maleF,fmale,Fmale,night,femalee');
    const expectedAnagramsHeap = [
      ['word'],  ['iceman', 'cinema'], ['words','sword'],['thing','night'], ['flame','fmale'], ['give'], 
      ['lol'], ['OLL'], ['giv'], ['Ghint'], ['Swords'], ['maleF', 'Fmale'], ['femalee']];
    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual({'anagrams (v2)': expectedAnagramsHeap });
  });
});
