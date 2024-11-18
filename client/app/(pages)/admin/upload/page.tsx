'use client';

import { useState } from 'react';
import TrackInfoForm from '@features/upload/TrackInfoForm';
import UploadFilesForm from '@features/upload/UploadFilesForm';
import { uploadTrack } from '@services/tracksService';
import { Button } from '@ui/button';
import Breadcrumbs from '@features/breadcrumbs/Breadcrumbs';
import { ACCEPTED_AUDIO_TYPES, ACCEPTED_IMAGE_TYPES } from "@lib/defenitions";

export interface TrackInfoInputs {
  artist: string;
  title: string;
  lyrics: string;
}

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [trackInfo, setTrackInfo] = useState<TrackInfoInputs>({
    artist: '',
    title: '',
    lyrics: '',
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('artist', trackInfo.artist);
    formData.append('title', trackInfo.title);
    formData.append('lyrics', trackInfo.lyrics);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    if (audio) formData.append('audio', audio);

    await uploadTrack(formData);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <TrackInfoForm trackInfo={trackInfo} setTrackInfo={setTrackInfo} />
        );
      case 1:
        return (
          <UploadFilesForm
            formTitle="Upload thumbnail"
            accept={ACCEPTED_IMAGE_TYPES}
            setFile={setThumbnail}
          />
        );
      case 2:
        return (
          <UploadFilesForm
            formTitle="Upload audio"
            accept={ACCEPTED_AUDIO_TYPES}
            setFile={setAudio}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className='mx-auto my-0 h-[600px] max-w-[960px]'>
      <Breadcrumbs items={[{ title: 'Home', href: '/' }]} />
      <div className='container h-full flex-col justify-between'>
        {renderStepContent(activeStep)}
      </div>
      <div className={'flex justify-between mt-4'}>
        <Button disabled={activeStep === 0} onClick={prevStep}>
          Prev step
        </Button>
        {activeStep === 2 ? (
          <Button onClick={handleSubmit}>Submit</Button>
        ) : (
          <Button onClick={nextStep}>Next step</Button>
        )}
      </div>
    </div>
  );
}
