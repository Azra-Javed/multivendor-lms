// import Image from "next/image";
// import React, { useState } from "react";
// import { BiMessage } from "react-icons/bi";
// import { VscVerifiedFilled } from "react-icons/vsc";
// import { format } from "timeago.js";

// type Props = {};

// const CommentReply = ({
//   data,
//   activeVideo,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   questionId,
//   setQuestionId,
//   answerCreationLoading,
// }: any) => {
//   return (
//     <div className="w-full space-y-1">
//       {data[activeVideo].questions.map((item: any, index: any) => (
//         <CommentItem
//           key={index}
//           data={data}
//           activeVideo={activeVideo}
//           item={item}
//           index={index}
//           answer={answer}
//           setAnswer={setAnswer}
//           questionId={questionId}
//           setQuestionId={setQuestionId}
//           handleAnswerSubmit={handleAnswerSubmit}
//           answerCreationLoading={answerCreationLoading}
//         />
//       ))}
//     </div>
//   );
// };

// const CommentItem = ({
//   questionId,
//   setQuestionId,
//   item,
//   answer,
//   setAnswer,
//   handleAnswerSubmit,
//   answerCreationLoading,
// }: any) => {
//   const [replyActive, setreplyActive] = useState(false);

//   return (
//     <div className="py-4 border-b border-gray-100 dark:border-white/10 last:border-0">
//       {/* Question row */}
//       <div className="flex gap-3">
//         <Image
//           src={
//             item.user.avatar
//               ? item.user.avatar.url
//               : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//           }
//           width={40}
//           height={40}
//           alt=""
//           className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
//         />
//         <div className="flex-1 min-w-0">
//           <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
//             {item?.user.name}
//           </span>
//           <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed mt-0.5">
//             {item?.question}
//           </p>
//           <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-1 block">
//             {!item.createdAt ? "" : format(item?.createdAt)}
//           </span>

//           {/* Reply toggle */}
//           <button
//             onClick={() => {
//               setreplyActive(!replyActive);
//               setQuestionId(item._id);
//             }}
//             className="mt-2 flex items-center gap-1.5 text-xs font-medium font-Poppins
//                        text-gray-500 dark:text-gray-400
//                        hover:text-teal-500 dark:hover:text-teal-400
//                        transition-colors duration-200"
//           >
//             <BiMessage className="w-3.5 h-3.5" />
//             {!replyActive
//               ? item.questionReplies.length !== 0
//                 ? `${item.questionReplies.length} Replies`
//                 : "Reply"
//               : "Hide Replies"}
//           </button>
//         </div>
//       </div>

//       {/* Replies */}
//       {replyActive && questionId === item._id && (
//         <div className="mt-4 ml-12 space-y-4">
//           {/* Existing replies */}
//           {item.questionReplies.map((reply: any) => (
//             <div key={reply._id} className="flex gap-3">
//               <Image
//                 src={
//                   reply.user.avatar
//                     ? reply.user.avatar.url
//                     : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
//                 }
//                 width={36}
//                 height={36}
//                 alt=""
//                 className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
//               />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-1.5 mb-0.5">
//                   <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
//                     {reply.user.name}
//                   </span>
//                   {reply.user.role === "course.createdby" && (
//                     <VscVerifiedFilled className="text-teal-500 text-sm" />
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
//                   {reply.answer}
//                 </p>
//                 <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-0.5 block">
//                   {format(reply.createdAt)}
//                 </span>
//               </div>
//             </div>
//           ))}

//           {/* Answer input */}
//           <div className="flex gap-3 items-center pt-2">
//             <input
//               type="text"
//               placeholder="Write a reply..."
//               value={answer}
//               onChange={(e: any) => setAnswer(e.target.value)}
//               className="flex-1 px-3 py-2 text-sm rounded-lg
//                          border border-gray-200 dark:border-white/10
//                          bg-white dark:bg-slate-800
//                          text-gray-900 dark:text-white
//                          placeholder-gray-400 dark:placeholder-gray-500
//                          font-Poppins outline-none
//                          focus:border-teal-500 dark:focus:border-teal-500
//                          transition-colors duration-200"
//             />
//             <button
//               onClick={handleAnswerSubmit}
//               disabled={answer === "" || answerCreationLoading}
//               className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white
//                          text-sm font-medium font-Poppins rounded-lg
//                          transition-colors duration-200
//                          disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {answerCreationLoading ? "Posting..." : "Reply"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentReply;

import Image from "next/image";
import React, { useState } from "react";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
  courseCreatedBy,
}: any) => {
  return (
    <div className="w-full space-y-1">
      {data[activeVideo].questions.map((item: any, index: any) => (
        <CommentItem
          key={index}
          data={data}
          activeVideo={activeVideo}
          item={item}
          index={index}
          answer={answer}
          setAnswer={setAnswer}
          questionId={questionId}
          setQuestionId={setQuestionId}
          handleAnswerSubmit={handleAnswerSubmit}
          answerCreationLoading={answerCreationLoading}
          courseCreatedBy={courseCreatedBy}
        />
      ))}
    </div>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
  courseCreatedBy,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);

  const isInstructor = (userId: any) =>
    String(userId) === String(courseCreatedBy?._id || courseCreatedBy);

  return (
    <div className="py-4 border-b border-gray-100 dark:border-white/10 last:border-0">
      {/* Question row */}
      <div className="flex gap-3">
        <Image
          src={
            item.user.avatar
              ? item.user.avatar.url
              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
          }
          width={40}
          height={40}
          alt=""
          className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
        />
        <div className="flex-1 min-w-0">
          {/* Question author name + verified/staff badge */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
              {item?.user.name}
            </span>

            {isInstructor(item.user._id) ? (
              <VscVerifiedFilled className="text-teal-500 text-sm" />
            ) : null}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed mt-0.5">
            {item?.question}
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-1 block">
            {!item.createdAt ? "" : format(item?.createdAt)}
          </span>

          {/* Reply toggle */}
          <button
            onClick={() => {
              setreplyActive(!replyActive);
              setQuestionId(item._id);
            }}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium font-Poppins
                       text-gray-500 dark:text-gray-400
                       hover:text-teal-500 dark:hover:text-teal-400
                       transition-colors duration-200"
          >
            <BiMessage className="w-3.5 h-3.5" />
            {!replyActive
              ? item.questionReplies.length !== 0
                ? `${item.questionReplies.length} Replies`
                : "Reply"
              : "Hide Replies"}
          </button>
        </div>
      </div>

      {/* Replies */}
      {replyActive && questionId === item._id && (
        <div className="mt-4 ml-12 space-y-4">
          {/* Existing replies */}
          {item.questionReplies.map((reply: any) => (
            <div key={reply._id} className="flex gap-3">
              <Image
                src={
                  reply.user.avatar
                    ? reply.user.avatar.url
                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                }
                width={36}
                height={36}
                alt=""
                className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-white/10 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white font-Poppins">
                    {reply.user.name}
                  </span>

                  {isInstructor(reply.user._id) ? (
                    <VscVerifiedFilled className="text-teal-500 text-sm" />
                  ) : null}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-Poppins leading-relaxed">
                  {reply.answer}
                </p>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-Poppins mt-0.5 block">
                  {format(reply.createdAt)}
                </span>
              </div>
            </div>
          ))}

          {/* Answer input */}
          <div className="flex gap-3 items-center pt-2">
            <input
              type="text"
              placeholder="Write a reply..."
              value={answer}
              onChange={(e: any) => setAnswer(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-lg
                         border border-gray-200 dark:border-white/10
                         bg-white dark:bg-slate-800
                         text-gray-900 dark:text-white
                         placeholder-gray-400 dark:placeholder-gray-500
                         font-Poppins outline-none
                         focus:border-teal-500 dark:focus:border-teal-500
                         transition-colors duration-200"
            />
            <button
              onClick={handleAnswerSubmit}
              disabled={answer === "" || answerCreationLoading}
              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white
                         text-sm font-medium font-Poppins rounded-lg
                         transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {answerCreationLoading ? "Posting..." : "Reply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentReply;
