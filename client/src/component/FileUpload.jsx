import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      alert("File uploaded successfully");
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
