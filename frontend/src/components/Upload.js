import { useState } from "react";
import { toast } from "react-toastify";

function Upload({ setThumbnail }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));

    toast.info("Image selected");
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select file first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setThumbnail(data.path);

      toast.success("Image uploaded successfully 🎉");

      setLoading(false);

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed ❌");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md border">

      <h2 className="text-lg font-semibold mb-3">Upload Thumbnail</h2>

      {/* File Input */}
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700"
      />

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Preview</p>

          <img
            src={preview}
            alt="preview"
            className="w-40 rounded-lg shadow"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}

export default Upload;