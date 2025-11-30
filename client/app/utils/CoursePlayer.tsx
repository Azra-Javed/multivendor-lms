// import React, { FC, useEffect, useState } from "react";
// import axios from "axios";

// type Props = {
//   videoUrl: string;
//   title: string;
// };

// const CoursePlayer: FC<Props> = ({ videoUrl }) => {
//   const [videoData, setVideoData] = useState<{
//     otp: string;
//     playbackInfo: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setVideoData(null);
//     setLoading(true);
//     setError("");

//     const controller = new AbortController();

//     axios
//       .post(
//         `${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`,
//         {
//           videoId: videoUrl,
//         },
//         {
//           signal: controller.signal,
//         }
//       )
//       .then((res) => {
//         if (res.data.otp && res.data.playbackInfo) {
//           setVideoData({
//             otp: res.data.otp,
//             playbackInfo: res.data.playbackInfo,
//           });
//         } else {
//           setError("Invalid response from server");
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         if (err.name !== "CanceledError") {
//           console.error("API Call Failed:", err);
//           setError(err.message || "Failed to load video");
//           setLoading(false);
//         }
//       });

//     return () => {
//       controller.abort();
//     };
//   }, [videoUrl]);

//   if (loading) {
//     return (
//       <div
//         style={{
//           position: "relative",
//           paddingTop: "56.25%",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "#000",
//         }}
//       >
//         <div style={{ position: "absolute", color: "#fff" }}>
//           Loading video...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         style={{
//           position: "relative",
//           paddingTop: "56.25%",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "#000",
//         }}
//       >
//         <div style={{ position: "absolute", color: "#f00" }}>
//           Error: {error}
//         </div>
//       </div>
//     );
//   }

//   if (!videoData) {
//     return (
//       <div
//         style={{
//           position: "relative",
//           paddingTop: "56.25%",
//           overflow: "hidden",
//           backgroundColor: "#000",
//         }}
//       >
//         <div style={{ position: "absolute", color: "#fff" }}>
//           No video data available
//         </div>
//       </div>
//     );
//   }

//   // Try without the player parameter first
//   const iframeUrl = `https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`;

//   console.log("Rendering iframe with URL:", iframeUrl);

//   return (
//     <div
//       style={{
//         position: "relative",
//         paddingTop: "56.25%",
//         overflow: "hidden",
//         backgroundColor: "#000", // Add background to see if iframe is rendering
//       }}
//     >
//       <iframe
//         src={iframeUrl}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           border: 0,
//         }}
//         allowFullScreen={true}
//         allow="encrypted-media"
//         title="Video Player"
//         // Add onLoad to check if iframe loads
//         onLoad={() => console.log("Iframe loaded successfully")}
//         onError={(e) => console.error("Iframe error:", e)}
//       />
//     </div>
//   );
// };

// export default CoursePlayer;

import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  console.log(videoUrl);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=7HiUlVgBnU1kG4nm`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
