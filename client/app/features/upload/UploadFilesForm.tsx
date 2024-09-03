import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Card, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface UploadFilesFormProps {
  formTitle: string;
  accept: string;
  setFile: (file: File) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  border: `2px dashed ${theme.palette.grey[400]}`,
  transition: "border-color 0.3s ease, background-color 0.3s ease",
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  }
}));

const DragActiveBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const DragInactiveBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[500],
}));

const FileInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
}));

export default function UploadFilesForm({ formTitle, accept, setFile }: UploadFilesFormProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setUploadedFile(file);
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept
  });

  return (
    <StyledCard {...getRootProps()}>
      <input {...getInputProps()} />
      {uploadedFile ? (
        <FileInfoBox>
          <CheckCircleIcon fontSize="large" />
          <Typography variant="h6">File added successfully!</Typography>
          <Typography>{uploadedFile.name}</Typography>
          <Typography>{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</Typography>
        </FileInfoBox>
      ) : isDragActive ? (
        <DragActiveBox>
          <Typography variant="h6">{formTitle}</Typography>
          <Typography>Drop the file here...</Typography>
        </DragActiveBox>
      ) : (
        <DragInactiveBox>
          <Typography variant="h6">{formTitle}</Typography>
          <Typography>Drag 'n' drop a file here, or click to select one</Typography>
        </DragInactiveBox>
      )}
    </StyledCard>
  );
}
