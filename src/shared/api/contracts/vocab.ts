export type VocabItemDto = {
  term: string;
  translation: string | null;
  synonyms?: string[];
};
