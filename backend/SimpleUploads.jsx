import { useState } from 'react';
import axios from 'axios';

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData);
      alert('Upload successful: ' + res.data.filename);
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleUpload}>Upload</button>
    </div>
  );
}
