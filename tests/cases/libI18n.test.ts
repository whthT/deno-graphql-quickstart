import * as asserts from "https://deno.land/std@0.92.0/testing/asserts.ts";
import i18n, { __ } from "../../src/lib/i18n.ts";
import Language from "../../src/consts/Language.ts";

const { assertEquals } = asserts;

Deno.test("libI18n tr works test", () => {
  i18n.reset();
  var key = "title";
  assertEquals(__(key), "DenoJS GraphQL Hızlı Başlangıç");
});

Deno.test("libI18n tr works test", () => {
  i18n.reset();
  var key = "title";
  i18n.setLocale(Language.EN);
  assertEquals(__(key), "Deno GraphQL Quick Start");
});

Deno.test("libI18n tr/en combine works test", () => {
  i18n.reset();
  var key = "title";
  assertEquals(__(key), "DenoJS GraphQL Hızlı Başlangıç");
  i18n.setLocale(Language.EN);
  assertEquals(__(key), "Deno GraphQL Quick Start");
});

Deno.test("libI18n replace dynamic attribute", () => {
  i18n.reset();
  var key = "title-attr";
  assertEquals(__(key, { lang: "DenoJS" }), "DenoJS GraphQL Hızlı Başlangıç");
  assertEquals(__(key, { lang: "DenoJS" }, Language.EN), "DenoJS GraphQL Quick Start");
});

Deno.test("libI18n non-exists key", () => {
  i18n.reset();
  var key = "not_exists_key";
  assertEquals(__(key), key);
});

Deno.test("libI18n non-exists locale", () => {
  i18n.reset();
  var key = "title";
  assertEquals(__(key), "DenoJS GraphQL Hızlı Başlangıç");

  // @ts-ignore
  assertEquals(__(key, {}, "pv"), key);
});
