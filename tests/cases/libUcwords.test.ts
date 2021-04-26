import ucwords from "../../src/lib/ucwords.ts";

import {assertEquals} from "https://deno.land/std@0.92.0/testing/asserts.ts";

Deno.test("libUcwords works", () => {
  const str = "musa kurt";
  assertEquals(ucwords(str), "Musa Kurt");
});

Deno.test("libUcwords works with no string", () => {
  const str = "";
  assertEquals(ucwords(str), "");
});