/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { related } from "./related";

const documents = [
  { title: "ruby", text: "this lorem ipsum blah foo" },
  { title: "ruby", text: "this document is about python." },
  { title: "ruby and node", text: "this document is about ruby and node." },
  {
    title: "examples",
    text: "this document is about node. it has node examples",
  },
];

const options = {
  serializer: (document: any) => [document.title, document.text],
  weights: [1.0, 1],
};

test("related uses same instance and returns same results", () => {
  const func = related(options);
  const results = func(documents[0], documents);

  expect(results).toMatchInlineSnapshot(`
    Array [
      Object {
        "absolute": 1.7768564486857903,
        "document": Object {
          "text": "this document is about python.",
          "title": "ruby",
        },
        "relative": 0.12865726410284523,
      },
      Object {
        "absolute": 1.7768564486857903,
        "document": Object {
          "text": "this document is about ruby and node.",
          "title": "ruby and node",
        },
        "relative": 0.12865726410284523,
      },
      Object {
        "absolute": 0.7768564486857903,
        "document": Object {
          "text": "this document is about node. it has node examples",
          "title": "examples",
        },
        "relative": 0,
      },
    ]
  `);
  expect(func(documents[0], documents)).toEqual(results);
});

test("related works when changing documents", () => {
  const func = related(options);
  func(documents[0], documents);
  func(documents[0], documents.reverse());

  expect(func(documents[0], documents.slice(0, 3))).toMatchInlineSnapshot(`
    Array [
      Object {
        "absolute": 4.849271710192877,
        "document": Object {
          "text": "this document is about ruby and node.",
          "title": "ruby and node",
        },
        "relative": 0.20786000940717744,
      },
      Object {
        "absolute": 2.8492717101928764,
        "document": Object {
          "text": "this document is about python.",
          "title": "ruby",
        },
        "relative": 0,
      },
    ]
  `);
});
