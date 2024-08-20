'use client';

import { Button, Card } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";
import { ChangeEvent } from "react";

interface UploadFilesFormProps {
  formTitle: string;
  setFile: Function;
  accept: string;
}

export default function UploadFilesForm({formTitle, setFile, accept}: UploadFilesFormProps) {
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0]);
    }
  }
  return (
    <Card sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      height: "100%"
    }}>
      <Button
        component="label"
        role={"upload-file"}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadOutlined/>}
      >
        {formTitle}
        <input
          onChange={inputChangeHandler}
          accept={accept}
          className="h-0.5 w-0.5 hidden absolute bottom-0 left-0 whitespace-nowrap" type="file"
        />
      </Button>
    </Card>
  );
};