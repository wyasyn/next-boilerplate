"use client";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[];
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <ul>
          {
            <Image
              width={100}
              height={100}
              src={URL.createObjectURL(files[0])}
              alt="Uploaded file"
              className=" object-cover "
            />
          }
        </ul>
      ) : (
        <div className=" text-xs flex flex-col gap-1 items-center justify-center text-muted-foreground border border-dashed py-6 rounded-xl cursor-pointer ">
          <span className=" text-emerald-500 ">
            <CloudUpload size={32} />
          </span>
          <p>
            {" "}
            <span className=" text-emerald-500 ">Click to Upload</span> or drag
            n drop
          </p>
          <p>SVG, PNG, JPG or GIF (MAX 800 x 400)</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
