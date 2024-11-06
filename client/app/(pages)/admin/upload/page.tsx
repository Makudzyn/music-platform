'use client';

import { useState } from 'react';
import TrackInfoForm from '@/app/features/upload/TrackInfoForm';
import UploadFilesForm from '@/app/features/upload/UploadFilesForm';
import { uploadTrack } from '@/app/services/tracksService';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/app/features/breadcrumbs/Breadcrumbs';

export default function Page() {
  const [activeStep, setActiveStep] = useState(0);
  const [trackInfo, setTrackInfo] = useState({
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
            accept="image/*"
            setFile={setThumbnail}
          />
        );
      case 2:
        return (
          <UploadFilesForm
            formTitle="Upload audio"
            accept="audio/*"
            setFile={setAudio}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className={'h-[600px] max-w-[960px] my-0 mx-auto'}>
      <Breadcrumbs items={[{ title: 'Home', href: '/' }]} />
      <div className={'container flex-col justify-between h-full'}>
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
