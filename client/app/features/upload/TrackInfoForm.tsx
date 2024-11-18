import { ChangeEvent } from 'react';
import { MicVocal, Music4, Star } from 'lucide-react';
import { Textarea } from '@ui/textarea';
import { TrackInfoInputs } from "@app/(pages)/admin/upload/page";

interface TrackInfoFormProps {
  trackInfo: TrackInfoInputs;
  setTrackInfo: (value: (((prevState: TrackInfoInputs) => TrackInfoInputs) | TrackInfoInputs)) => void
}

export default function TrackInfoForm({
  trackInfo,
  setTrackInfo,
}: TrackInfoFormProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setTrackInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='size-full flex justify-center items-center'>
      <div className='h-full w-2/5 relative flex flex-col justify-evenly items-center'>
        <div className='flex items-center justify-center w-full'>
          <Star />
          <Textarea
            className={'w-full'}
            required
            name="artist"
            id="artist-input"
            onChange={handleChange}
            defaultValue={trackInfo.artist}
            placeholder="Enter track's artist..."
          />
        </div>
        <div className='flex items-center justify-center w-full'>
          <Music4 />
          <Textarea
            className={'w-full'}
            required
            name="title"
            id="title-input"
            onChange={handleChange}
            defaultValue={trackInfo.title}
            placeholder="Enter track's title..."
          />
        </div>
        <div className='flex items-center justify-center w-full'>
          <MicVocal />
          <Textarea
            className={'w-full'}
            name="lyrics"
            id="lyrics-input"
            onChange={handleChange}
            defaultValue={trackInfo.lyrics}
            placeholder="Enter track's lyrics..."
            color="success"
          />
        </div>
      </div>
    </div>
  );
}
