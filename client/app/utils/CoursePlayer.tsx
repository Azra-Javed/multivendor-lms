import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl, title }: Props) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      })
      .catch((err) => console.log("OTP ERROR: ", err));
  }, [videoUrl]);
  return (
    <div>
      <div style={{ paddingTop: "41%", position: "relative" }}>
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=7HiUlVgBnU1kG4nm`}
          style={{
            border: 0,
            maxWidth: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "90%",
          }}
          allowFullScreen
          allow="encrypted-media"
        />
      </div>
    </div>
  );
};

export default CoursePlayer;
