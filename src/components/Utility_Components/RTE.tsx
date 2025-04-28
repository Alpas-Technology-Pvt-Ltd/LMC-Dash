'use client';
import { Editor } from '@tinymce/tinymce-react';
import React, { Suspense, useRef } from 'react';

function RTE({ label, name, defaultValue = '', onChange }, ref) {
  const editorRef = useRef(null);

  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      // Here you would typically send the image to your server
      // This example creates a base64 data URL instead
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blobInfo.blob());
    });
  };

  return (
    <div className="w-full h-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Suspense
        fallback={
          <div className="min-h-[800px] w-full bg-red-400 flex items-center justify-center">
            Loading....
          </div>
        }
      >
        <Editor
          apiKey="lj51pkv7k5tp7cwvyjj93bdgxynn98lcduyyv4r9bd2ldnpy"
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          onEditorChange={(content) => {
            onChange(content);
          }}
          initialValue={defaultValue}
          init={{
            initialValue: defaultValue,
            height: 800,
            images_upload_handler: handleImageUpload,
            // Enable automatic uploads
            automatic_uploads: true,
            menubar: true,
            plugins: [
              'image',
              'advlist',
              'autolink',
              'lists',
              'link',
              'image',
              'charmap',
              'preview',
              'anchor',
              'searchreplace',
              'visualblocks',
              'code',
              'fullscreen',
              'insertdatetime',
              'media',
              'table',
              'code',
              'help',
              'wordcount',
              'anchor',
              'imagetools',
            ],
            toolbar:
              'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      </Suspense>
    </div>
  );
}

export default React.forwardRef(RTE);
