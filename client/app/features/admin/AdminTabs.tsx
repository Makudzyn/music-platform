'use client';

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@ui/tabs';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@ui/select';
import { Button } from '@ui/button';
import axiosClient from '@lib/axiosClient';
import Toaster from '@features/toast/Toaster';
import RequestResponse from '@features/admin/RequestResponse';
import { Endpoint, endpoints } from '@lib/endpoints';
import RequestBody from '@features/admin/RequestBody';
import UrlParamsSection from '@features/admin/UrlParamsSection';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface ToastInfo {
  title: string;
  description: string;
}

interface EndpointGroup {
  [key: string]: Endpoint[];
}

export default function AdminTabs() {
  // State for managing the currently selected endpoint and its parameters
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(
    null,
  );
  const [params, setParams] = useState<Record<string, string>>({});
  const [requestBody, setRequestBody] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  // State for managing toast notifications
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({
    title: '',
    description: '',
  });

  /**
   * Handles the selection of an API endpoint.
   * Parses the endpoint details and extracts URL parameters if any exist.
   *
   * @param endpointStr - JSON string containing endpoint details
   */
  const handleEndpointSelect = (endpointStr: string): void => {
    const endpoint: Endpoint = JSON.parse(endpointStr);
    setSelectedEndpoint(endpoint);
    setRequestBody('');
    setResponse('');

    // Extract URL parameters from the endpoint path
    const pathParams: RegExpMatchArray | null = endpoint.path.match(/:([^/]+)/g);
    if (pathParams) {
      const newParams: Record<string, string> = {};
      pathParams.forEach((param: string) => {
        const paramName: string = param.slice(1);
        newParams[paramName] = '';
      });
      setParams(newParams);
    } else {
      setParams({});
    }
  };

  /**
   * Builds the final URL by replacing parameter placeholders with actual values.
   *
   * @returns Constructed URL string with parameters replaced
   */
  const buildUrl = () => {
    if (!selectedEndpoint) return '';
    let url = selectedEndpoint.path;
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, value);
    });
    return url;
  };

  /**
   * Handles the sending of API requests.
   * Validates request body for POST/PUT/PATCH requests and shows appropriate notifications.
   */
  const handleSendRequest = async () => {
    if (!selectedEndpoint) return;

    try {
      const url = buildUrl();
      let requestConfig: AxiosRequestConfig = {
        url,
        method: selectedEndpoint.method,
      };

      // Handle request body for POST/PUT/PATCH requests
      if (
        ['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method) &&
        requestBody
      ) {
        try {
          requestConfig.data = JSON.parse(requestBody);
        } catch (e) {
          setToastInfo({
            title: 'Error',
            description: 'Invalid JSON in request body',
          });
          setToastOpen(true);
          return;
        }
      }

      // Send request and handle response
      const response: AxiosResponse = await axiosClient(requestConfig);
      setResponse(JSON.stringify(response.data, null, 2));
      setToastInfo({
        title: 'Request sent successfully',
        description: `${selectedEndpoint.method} ${selectedEndpoint.path}`,
      });
      setToastOpen(true);
    } catch (error) {
      console.error('Error sending request:', error);
      const axiosError = error as AxiosError;
      setToastInfo({
        title: 'Error sending request',
        description:
          (axiosError.response?.data as any)?.message ||
          'Please check the console for more details.',
      });
      setToastOpen(true);
    }
  };

  return (
    <>
      <Tabs defaultValue="artists">
        <TabsList className="grid w-full grid-cols-5">
          {Object.keys(endpoints).map((group) => (
            <TabsTrigger key={group} value={group} className="capitalize">
              {group}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(endpoints).map(([group, groupEndpoints]) => (
          <TabsContent key={group} value={group}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{group} API</CardTitle>
                <CardDescription>
                  Manage {group} through these API endpoints.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select onValueChange={handleEndpointSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an endpoint" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupEndpoints.map((endpoint, index) => (
                      <SelectItem key={index} value={JSON.stringify(endpoint)}>
                        {endpoint.method} {endpoint.path} -{' '}
                        {endpoint.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedEndpoint && (
                  <>
                    <UrlParamsSection params={params} setParams={setParams} />

                    <RequestBody
                      requestBody={requestBody}
                      setRequestBody={setRequestBody}
                      selectedEndpoint={selectedEndpoint}
                    />

                    <Button onClick={handleSendRequest}>Send Request</Button>

                    <RequestResponse response={response} />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Toaster
        title={toastInfo.title}
        description={toastInfo.description}
        open={toastOpen}
        onOpenChange={setToastOpen}
        duration={5000}
      />
    </>
  );
}
