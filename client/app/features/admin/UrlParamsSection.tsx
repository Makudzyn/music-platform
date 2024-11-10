'use client';

import { Input } from '@ui/input';
import React from 'react';

interface UrlParamsSectionProps {
  params: Record<string, string>;
  setParams: (
    value:
      | ((prevState: Record<string, string>) => Record<string, string>)
      | Record<string, string>,
  ) => void;
}

export default function UrlParamsSection({
  params,
  setParams,
}: UrlParamsSectionProps) {
  return (
    <>
      {Object.keys(params).length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">URL Parameters:</h3>
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="min-w-24">{key}:</span>
              <Input
                value={value}
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
