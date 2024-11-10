'use client';

import { Textarea } from '@ui/textarea';
import React from 'react';
import { Endpoint } from '@lib/endpoints';

interface RequestBodyProps {
  requestBody: string;
  setRequestBody: (value: ((prevState: string) => string) | string) => void;
  selectedEndpoint: Endpoint;
}

export default function RequestBody({
  requestBody,
  setRequestBody,
  selectedEndpoint,
}: RequestBodyProps) {
  return (
    <>
      {['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method) && (
        <div>
          <h3 className="font-semibold mb-2">Request Body (JSON):</h3>
          <Textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder="Enter request body in JSON format"
            rows={5}
          />
        </div>
      )}
    </>
  );
}
