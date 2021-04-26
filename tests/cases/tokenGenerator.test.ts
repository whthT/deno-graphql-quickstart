import {assertEquals,} from "https://deno.land/std@0.92.0/testing/asserts.ts";
import tokenGenerator, {numbers, words} from "../../src/lib/tokenGenerator.ts";

Deno.test("tokenGenerator test 1", () => {
  var token = tokenGenerator(5)
  assertEquals(token.length, 5);
});

Deno.test("tokenGenerator test 2", () => {
  var token = tokenGenerator(256)  
  for(const numb of numbers) {
    assertEquals(token.indexOf(String(numb)) >= 0, true);
  }
  for(const word of words) {    
    assertEquals(token.indexOf(word) >= 0, true);
  }
});

Deno.test("tokenGenerator test 3", () => {
  var token = tokenGenerator(5)  
  assertEquals(Number.isInteger(parseInt(token[0])), true)
  assertEquals(Number.isNaN(parseInt(token[1])), true)
  assertEquals(Number.isInteger(parseInt(token[2])), true)
  assertEquals(Number.isNaN(parseInt(token[3])), true)
  assertEquals(Number.isInteger(parseInt(token[4])), true)
});