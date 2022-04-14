import {Related, Options} from "related-documents";

export const related = (options: Options) => {

  return (document: any, documents: any[]): {absolute: number, relative: number, document: any}[] => {
    let related: Related;

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
