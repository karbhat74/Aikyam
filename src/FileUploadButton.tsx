// import { QrCode } from "lucide-react"; // Ensure you have lucide-react installed
// import { useRef } from "react";

// const FileUploadButton = () => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click(); // Programmatically open file picker
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       console.log("Selected file:", file);
//       // Handle file upload logic here
//     }
//   };

//   return (
//     <div>
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         style={{ display: "none" }} // Hide input
//       />

//       {/* QR Code Button - Click triggers file input */}
//       <button
//         className="p-2 bg-gray-100 rounded-lg"
//         onClick={handleButtonClick}
//       >
//         <QrCode className="w-5 h-5 text-gray-600" />
//       </button>
//     </div>
//   );
// };

// export default FileUploadButton;
import { QrCode } from "lucide-react"; // Ensure you have lucide-react installed
import { useRef } from "react";

const FileUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically open file picker
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      // Handle file upload logic here
    }
  };

  return (
    <div className="relative w-full">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide input
      />

      {/* Text Input Field */}
      <input
        type="text"
        placeholder="Enter ticket code"
        className="w-full pl-3 pr-10 py-2 border rounded-md focus:outline-none"
      />

      {/* QR Code Icon Button */}
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        onClick={handleButtonClick}
      >
        <QrCode className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FileUploadButton;
