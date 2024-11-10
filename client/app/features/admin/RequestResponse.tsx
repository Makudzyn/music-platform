import React from 'react';

interface RequestResponseProps {
  response: string;
}

export default function RequestResponse({ response }: RequestResponseProps) {
  return (
    <>
      {response && (
        <div>
          <h3 className="font-semibold mb-2">Response:</h3>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            {response}
          </pre>
        </div>
      )}
    </>
  );
}
