interface FileUploaderProps {
    handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export default function FileUploader({ handleFileUpload }: FileUploaderProps) {
    return (
      <div className="flex justify-center mb-12">
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-lg bg-indigo-600 text-white px-6 py-3 font-semibold shadow-lg hover:bg-indigo-700 transition"
        >
          Upload Spending Data
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    );
  }
  