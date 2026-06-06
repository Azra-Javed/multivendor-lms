import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import { format } from "timeago.js";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import CommentReply from "./CommentReply";
import socketIO from "socket.io-client";
import Link from "next/link";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setactiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  const socketRef = useRef<any>(null);

  const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI;

  useEffect(() => {
    if (!ENDPOINT) return;

    socketRef.current = socketIO(ENDPOINT, {
      transports: ["websocket"],
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [ENDPOINT]);

  const { data: courseData, refetch: courseRefetch } =
    useGetCourseDetailsQuery(id);

  const course = courseData?.course;

  const activeLesson = data?.[activeVideo];

  const isInstructor = (userId: any) =>
    String(userId) === String(course?.createdBy?._id || course?.createdBy);

  // Only the course instructor can reply to reviews
  const canReplyToReview = isInstructor(user?._id);

  // isReviewExists: true if user already reviewed
  const isReviewExists = !!course?.reviews?.find(
    (item: any) => item.user._id === user?._id,
  );

  // Hide the review form if:
  // 1. the user already submitted a review, OR
  // 2. the user is the course instructor (cannot review own course)
  const canSubmitReview = !isReviewExists && !canReplyToReview;

  const [
    addNewQuestion,
    { isLoading: questionCreationLoading, isSuccess, error },
  ] = useAddNewQuestionMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerMutationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewMutationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyMutationLoading,
    },
  ] = useAddReplyInReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question posted");

      socketRef.current?.emit("notification", {
        title: "New Question",
        message: `New question in "${activeLesson?.title}"`,
        userId: user?._id,
      });
    }

    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer submitted");
    }

    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added");
    }

    if (replySuccess) {
      setReply("");
      setOpenReplyId(null);
      courseRefetch();
      toast.success("Reply added");
    }

    if (error && "data" in error) toast.error((error as any).data.message);

    if (answerError && "data" in answerError)
      toast.error((answerError as any).data.message);

    if (reviewError && "data" in reviewError)
      toast.error((reviewError as any).data.message);

    if (replyError && "data" in replyError)
      toast.error((replyError as any).data.message);
  }, [
    isSuccess,
    answerSuccess,
    reviewSuccess,
    replySuccess,
    error,
    answerError,
    reviewError,
    replyError,
    activeVideo,
    refetch,
    courseRefetch,
    user?._id,
    activeLesson?.title,
  ]);

  if (!data?.length) return null;

  const handleQuestion = () => {
    if (!question.trim()) return toast.error("Question can't be empty");

    addNewQuestion({
      question,
      courseId: id,
      contentId: activeLesson?._id,
    });
  };

  const handleAnswerSubmit = () => {
    if (answerMutationLoading) return;

    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: activeLesson?._id,
      questionId,
    });
  };

  const handleReviewSubmit = () => {
    if (!review.trim()) return toast.error("Review can't be empty");
    if (reviewMutationLoading) return;

    addReviewInCourse({
      review,
      rating,
      courseId: id,
    });
  };

  // Only the course instructor can reply to reviews
  const handleReviewReplySubmit = (targetReviewId: string) => {
    if (!canReplyToReview) {
      return toast.error("Only the course instructor can reply to reviews");
    }
    if (!reply.trim()) return toast.error("Reply can't be empty");
    if (replyMutationLoading) return;
    addReplyInReview({
      comment: reply,
      courseId: id,
      reviewId: targetReviewId,
    });
  };

  const tabs = ["Overview", "Resources", "Q&A", "Reviews"];

  return (
    <div className="w-[95%] 800px:w-[88%] mx-auto py-6">
      {/* edit button only for instructor */}
      {canReplyToReview && (
        <div className="flex flex-wrap gap-3 m-4 mt-0 justify-end">
          <Link href={`/profile/my-courses/edit-course/${id}`}>
            <button
              className="
          px-5 py-2 md:py-3
          bg-teal-500 hover:bg-teal-600
          text-white
          text-sm  font-medium font-Poppins
          rounded-lg
          transition-colors duration-200
        "
            >
              Edit Course
            </button>
          </Link>
        </div>
      )}
      {/* Video player */}
      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
      </div>

      {/* Prev / Next nav */}
      <div className="flex items-center justify-between mt-5">
        <button
          disabled={activeVideo === 0}
          onClick={() => setActiveVideo(activeVideo - 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-Poppins
                      transition-all duration-200
                      ${
                        activeVideo === 0
                          ? "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-white/5 text-gray-400"
                          : "bg-teal-500 hover:bg-teal-600 text-white"
                      }`}
        >
          <AiOutlineArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins">
          {activeVideo + 1} / {data.length}
        </span>

        <button
          disabled={data.length - 1 === activeVideo}
          onClick={() => setActiveVideo(activeVideo + 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-Poppins
                      transition-all duration-200
                      ${
                        data.length - 1 === activeVideo
                          ? "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-white/5 text-gray-400"
                          : "bg-teal-500 hover:bg-teal-600 text-white"
                      }`}
        >
          Next
          <AiOutlineArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Video title */}
      <h1 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white font-Poppins leading-snug">
        {data[activeVideo].title}
      </h1>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 border-b border-gray-200 dark:border-white/10">
        {tabs.map((text, index) => (
          <button
            key={index}
            onClick={() => setactiveBar(index)}
            className={`px-4 py-2.5 text-sm font-medium font-Poppins transition-all duration-200
                        ${
                          activeBar === index
                            ? "text-teal-500 border-b-2 border-teal-500"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
          >
            {text}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="m-6 mb-[50]">
        {/* Overview */}
        {activeBar === 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed whitespace-pre-line">
            {data[activeVideo]?.description}
          </p>
        )}

        {/* Resources */}
        {activeBar === 1 && (
          <div className="space-y-4 mb-[50]">
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-1 p-4 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800"
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                  {item.title}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-teal-500 hover:underline font-Poppins break-all"
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Q&A */}
        {activeBar === 2 && (
          <div>
            {/* Ask a question */}
            <div className="flex gap-3 items-start">
              <Image
                src={
                  user.avatar?.url ||
                  "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                }
                width={40}
                height={40}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  placeholder="Ask a question about this lesson..."
                  className="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-white/10
                             bg-white dark:bg-slate-800
                             text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                             font-Poppins outline-none
                             focus:border-teal-500 dark:focus:border-teal-500
                             transition-colors duration-200 resize-none"
                />
                <button
                  onClick={handleQuestion}
                  disabled={questionCreationLoading}
                  className="mt-2 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white
                             text-sm font-medium font-Poppins rounded-lg
                             transition-colors duration-200 disabled:opacity-50"
                >
                  {questionCreationLoading ? "Posting..." : "Post Question"}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 font-Poppins whitespace-nowrap">
                All Questions
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            </div>

            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              setReviewId={setReviewId}
              courseCreatedBy={course?.createdBy}
            />
          </div>
        )}

        {/* Reviews */}
        {activeBar === 3 && (
          <div>
            {canSubmitReview && (
              <div className="mb-8 p-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins mb-4">
                  Write a Review
                </h3>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) =>
                    rating >= i ? (
                      <AiFillStar
                        key={i}
                        onClick={() => setRating(i)}
                        className="w-6 h-6 text-amber-400 cursor-pointer"
                      />
                    ) : (
                      <AiOutlineStar
                        key={i}
                        onClick={() => setRating(i)}
                        className="w-6 h-6 text-gray-300 dark:text-gray-600 cursor-pointer hover:text-amber-400 transition-colors"
                      />
                    ),
                  )}
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-Poppins">
                    {rating} / 5
                  </span>
                </div>

                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={4}
                  placeholder="Share your experience with this course..."
                  className="w-full p-3 text-sm rounded-lg border border-gray-200 dark:border-white/10
                             bg-gray-50 dark:bg-slate-700
                             text-gray-900 dark:text-white
                             placeholder-gray-400 dark:placeholder-gray-500
                             font-Poppins outline-none
                             focus:border-teal-500 dark:focus:border-teal-500
                             transition-colors duration-200 resize-none"
                />

                <button
                  onClick={handleReviewSubmit}
                  disabled={reviewMutationLoading}
                  className="mt-3 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white
                             text-sm font-medium font-Poppins rounded-lg
                             transition-colors duration-200 disabled:opacity-50"
                >
                  {reviewMutationLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              <span className="text-xs font-medium tracking-widest uppercase text-gray-400 dark:text-gray-500 font-Poppins whitespace-nowrap">
                {course?.reviews?.length || 0} reviews
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            </div>

            {/* Review list */}
            <div className="space-y-4">
              {(course?.reviews || []).map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-800"
                >
                  <div className="flex gap-3">
                    <Image
                      src={
                        item.user.avatar?.url ||
                        "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
                      alt=""
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                          {item.user.name}
                        </span>

                        {isInstructor(item.user._id) && (
                          <VscVerifiedFilled className="text-teal-500 w-4 h-4" />
                        )}

                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
                        {item.comment}
                      </p>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-1 block">
                        {format(item.createdAt)}
                      </span>

                      {item.commentReplies?.length > 0 && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100 dark:border-white/10">
                          {item.commentReplies.map((r: any, ri: number) => (
                            <div key={ri} className="flex gap-3 items-start">
                              <Image
                                src={
                                  r.user?.avatar?.url ||
                                  "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                }
                                width={32}
                                height={32}
                                alt=""
                                className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                                    {r.user?.name}
                                  </span>
                                  {/* Verified badge: only the course instructor */}
                                  {isInstructor(r.user?._id) && (
                                    <VscVerifiedFilled className="text-teal-500 w-4 h-4" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
                                  {r.comment}
                                </p>
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-1 block">
                                  {format(r.createdAt)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {canReplyToReview && !item.commentReplies?.length && (
                        <div className="mt-3">
                          {openReplyId === item._id ? (
                            <div className="flex gap-2 items-start mt-2">
                              <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                rows={2}
                                placeholder="Write your reply to this review..."
                                className="flex-1 p-3 text-sm rounded-lg border border-gray-200 dark:border-white/10
                                           bg-white dark:bg-slate-700
                                           text-gray-900 dark:text-white
                                           placeholder-gray-400 dark:placeholder-gray-500
                                           font-Poppins outline-none
                                           focus:border-teal-500 dark:focus:border-teal-500
                                           transition-colors duration-200 resize-none"
                              />
                              <div className="flex flex-col gap-2 shrink-0">
                                <button
                                  onClick={() =>
                                    handleReviewReplySubmit(item._id)
                                  }
                                  disabled={replyMutationLoading}
                                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white
                                             text-sm font-medium font-Poppins rounded-lg
                                             transition-colors duration-200 disabled:opacity-50"
                                >
                                  {replyMutationLoading
                                    ? "Posting..."
                                    : "Submit"}
                                </button>
                                <button
                                  onClick={() => {
                                    setOpenReplyId(null);
                                    setReply("");
                                  }}
                                  className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20
                                             text-gray-600 dark:text-gray-300
                                             text-sm font-medium font-Poppins rounded-lg
                                             transition-colors duration-200"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setOpenReplyId(item._id);
                                setReply("");
                              }}
                              className="mt-1 text-xs text-teal-500 hover:underline font-Poppins"
                            >
                              Reply as Instructor
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContentMedia;
