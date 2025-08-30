import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import ReactPlayer from "react-player";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);


  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  (async () => {
    if (!courseSectionData.length) return;
    if (!courseId && !sectionId && !subSectionId) {
      navigate(`/dashboard/enrolled-courses`);
      return;
    }

    const filteredData = courseSectionData.filter(
      (course) => course._id === sectionId
    );
    if (!filteredData.length) return; 

    const filteredVideoData = filteredData[0]?.subSection.filter(
      (data) => data._id === subSectionId
    );
    if (!filteredVideoData.length) return; 

    setVideoData(filteredVideoData[0]);
    setPreviewSource(courseEntireData?.thumbNail || "");
    console.log(courseEntireData);
    
    setVideoEnded(false);
  })();
}, [courseSectionData, courseEntireData, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );
    return currentSectionIndx === 0 && currentSubSectionIndx === 0;
  };

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSection.length;

    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndx]?.subSection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData?.[currentSectionIndx + 1]?._id;
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndx + 1]?.subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSection.length;

    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );

    return (
      currentSectionIndx === courseSectionData?.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    );
  };

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndx =
      courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndx]?.subSection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData?.[currentSectionIndx - 1]?._id;
      const prevSubSectionLength =
        courseSectionData?.[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  const handleSeek = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0; 
      playerRef.current.play()
      setVideoEnded(false)
    }
  };

// console.log(videoData);
  return (
    <div className="vd-container">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="vd-preview"
        />
      ) : (
        <div className="vd-player-wrap">
         
          
          <video
            ref={playerRef}
            src={videoData.videoUrl}
            controls
            className="vdo"
            onEnded={() => setVideoEnded(true)} 
          />
          {videoEnded && (
            <div
              className="vd-ended-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1))",
              }}
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="vd-iconbtn"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={handleSeek}
                text="Rewatch"
                customClasses="vd-iconbtn vd-iconbtn--secondary"
              />
              <div className="vd-nav">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="vd-nav-btn"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="vd-nav-btn"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="vd-title">{videoData?.title}</h1>
      <p className="vd-desc">{videoData?.description}</p>
      
    </div>
  );
};

export default VideoDetails;
