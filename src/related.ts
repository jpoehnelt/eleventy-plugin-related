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

import {Related, Options} from "related-documents";

export const related = (options: Options) => {
  let related: Related;

  return (document: any, documents: any[]): {absolute: number, relative: number, document: any}[] => {
    if (!related || !shallowIsEqual(documents, related.documents)) {
      related = new Related(documents, options);
    }

    return related.rank(document);
  };
};

const shallowIsEqual = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) { return false; }

  for (let i = 0; i < a.length; i++) {
    if (a !== b) {
      return false
    }
  }

  return true;
}
