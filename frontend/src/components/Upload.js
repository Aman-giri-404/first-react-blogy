import { useState } from "react";

function Upload({ setThumbnail }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // preview image
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("Upload response:", data);

      setThumbnail(data.path);

    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="mb-4">

      <input type="file" onChange={handleFileChange} />

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-40 mt-3 rounded-lg"
        />
      )}

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition ml-2"
        onClick={handleUpload}
      >
        Upload
      </button>

    </div>
  );
}

export default Upload;