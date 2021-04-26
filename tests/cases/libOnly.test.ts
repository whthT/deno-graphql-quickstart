import {assertEquals,} from "https://deno.land/std@0.92.0/testing/asserts.ts";
import only from "../../src/lib/only.ts";

Deno.test("libOnly string keys", () => {
  const obj = { key: 1, value: 2 };
  assertEquals(only(obj, "key"), { key: 1 });
});

Deno.test("libOnly string keys multiple", () => {
  const obj = { key: 1, value: 2 };
  assertEquals(only(obj, "key value"), { key: 1, value: 2 });
});

Deno.test("libOnly array keys", () => {
  const obj = { key: 1, value: 2 };
  assertEquals(only(obj, ["key"]), { key: 1 });
});

Deno.test("libOnly array keys multiple", () => {
  const obj = { key: 1, value: 2 };
  assertEquals(only(obj, ["key", "value"]), { key: 1, value: 2 });
});

Deno.test("libOnly array keys deep equals", () => {
  const obj = { key: { value: 1 }, key2: { value: 2 } };
  assertEquals(only(obj, ["key"]), { key: { value: 1 } });
});

Deno.test("libOnly array keys multiple", () => {
  const obj = { key: { value: 1 }, key2: { value: 2 }, key3: { value: 3 } };
  assertEquals(only(obj, ["key", "key3"]), {
    key: { value: 1 },
    key3: { value: 3 },
  });
});