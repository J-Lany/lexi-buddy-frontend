export const instructionLanguage = {
  native: 'native',
  target: 'target',
} as const;

export type InstructionLanguage = (typeof instructionLanguage)[keyof typeof instructionLanguage];

export const ALL_INSTRUCTION_LANGUAGES = Object.values(
  instructionLanguage,
) as InstructionLanguage[];
