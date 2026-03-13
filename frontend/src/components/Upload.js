import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

      console.log(data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}

export default Upload;
