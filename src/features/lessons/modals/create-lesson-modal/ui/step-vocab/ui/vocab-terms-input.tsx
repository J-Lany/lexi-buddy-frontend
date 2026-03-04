'use client';

import { Loader } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  value: string;
  maxTerms: number;
  onChange: (value: string) => void;
  onBlurNormalize?: () => void;

  onTranslate: () => void;
  translateDisabled: boolean;

  isPending: boolean;
  errorMessage?: string | null;
};

export function VocabTermsInput({
  value,
  maxTerms,
  onChange,
  onBlurNormalize,
  onTranslate,
  translateDisabled,
  isPending,
  errorMessage,
}: Props) {
  return (
    <div className="grid gap-3">
      <Textarea
        name="vocab"
        className="rounded-3xl"
        minRows={5}
        placeholder={`Enter up to ${maxTerms} words separated by dots.`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlurNormalize}
      />

      <Button type="button" onClick={onTranslate} disabled={translateDisabled}>
        {isPending ? 'Translating...' : 'Provide translations and definitions'}
      </Button>

      {errorMessage ? <div className="text-red-500 mt-1">{errorMessage}</div> : null}

      {isPending ? (
        <div className="flex justify-center mt-2">
          <Loader className="animate-spin text-xl" />
        </div>
      ) : null}
    </div>
  );
}
