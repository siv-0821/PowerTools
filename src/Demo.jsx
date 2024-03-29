import { useEffect, useState } from "react";
import axios from "axios";

const Demo = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dirs, setDirs] = useState([]);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/image", formData);
      console.log(data);
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  // Simulate getServerSideProps
  useEffect(() => {
    const fetchDirs = async () => {
      try {
        const response = await axios.get("/api/dirs"); // Assuming this endpoint returns directory list
        setDirs(response.data);
      } catch (error) {
        console.error("Error fetching directories:", error);
      }
    };
    fetchDirs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-20 space-y-6">
      <input
        type="file"
        hidden
        onChange={({ target }) => {
          if (target.files) {
            const file = target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
          }
        }}
      />
      <div
        className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer"
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="" />
        ) : (
          <span>Select Image</span>
        )}
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        className="bg-red-600 p-3 w-32 text-center rounded text-white"
      >
        {uploading ? "Uploading.." : "Upload"}
      </button>
      <div className="mt-20 flex flex-col space-y-3">
        {dirs.map((item, index) => (
          <a
            key={index}
            href={"/images/" + item}
            className="text-blue-500 hover:underline"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Demo;
