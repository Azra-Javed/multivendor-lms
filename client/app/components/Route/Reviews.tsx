// import Image from "next/image";
// import ReviewCard from "../Review/ReviewCard";
// import { styles } from "@/app/styles/styles";

// type Props = {};

// export const reviews = [
//   {
//     name: "Gene Bates",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//     profession: "Student | Cambridge university",
//     comment:
//       "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-learning!",
//   },
//   {
//     name: "Verna Santos",
//     avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     profession: "Full stack developer | Quarter ltd.",
//     comment:
//       "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
//   },
//   {
//     name: "Jay Gibbs",
//     avatar: "https://randomuser.me/api/portraits/men/2.jpg",
//     profession: "computer systems engineering student | Zimbabwe",
//     comment:
//       "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
//   },
//   {
//     name: "Mina Davidson",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//     profession: "Junior Web Developer | Indonesia",
//     comment:
//       "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience",
//   },
//   {
//     name: "Rosemary Smith",
//     avatar: "https://randomuser.me/api/portraits/women/3.jpg",
//     profession: "Full stack web developer | Algeria",
//     comment:
//       "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work",
//   },
//   {
//     name: "Laura Mckenzie",
//     avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//     profession: "Full stack web developer | Canada",
//     comment:
//       "Join E-learning! E-learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-learning to anyone looking to improve their programming skills and build practical projects. E-learning is a great resource that will help you take your skills to the next level.",
//   },
// ];

// const Reviews = (props: Props) => {
//   return (
//     <div className="w-[90%] 800px:w-[85%] m-auto">
//       <div className="w-full 800px:flex items-center">
//         <div className="800px:w-[50%] w-full">
//           <Image
//             src={require("../../../public/assets/review.png")}
//             alt="business"
//             width={700}
//             height={700}
//           />
//         </div>
//         <div className="800px:w-[50%] w-full">
//           <h3 className={`${styles.title} 800px:!text-[40px]`}>
//             Our Students Are <span className="text-gradient">Our Strength</span>{" "}
//             <br /> See What They Say About Us
//           </h3>
//           <br />
//           <p className={styles.label}>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
//             voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
//             possimus magni deleniti natus accusamus officiis quasi nihil
//             commodi, praesentium quidem, quis doloribus?
//           </p>
//         </div>
//         <br />
//         <br />
//       </div>
//       <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
//         {reviews &&
//           reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
//       </div>
//     </div>
//   );
// };

// export default Reviews;

import Image from "next/image";
import ReviewCard from "../Review/ReviewCard";
import { styles } from "@/app/styles/styles";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "I had the pleasure of exploring E-learning, a website that provides an extensive range of courses on various tech-related topics. The courses cater to different skill levels and interests. Highly recommend!",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack Developer | Quarter Ltd.",
    comment:
      "Thanks for the amazing tutorials! The teaching style is outstanding, and the practical applications are extremely valuable. Highly recommend for anyone looking to enhance their programming skills.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer Systems Engineering Student | Zimbabwe",
    comment:
      "Your tutorials are top-notch! Complex topics are explained clearly with real-world examples. It creates a supportive learning environment. Great work!",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "I was thoroughly impressed with E-learning's course range. Highly practical and engaging content!",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full Stack Web Developer | Algeria",
    comment:
      "Videos are detailed and cover everything. Beginners can complete integrated projects. Excited for more content!",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full Stack Web Developer | Canada",
    comment:
      "E-learning focuses on practical applications. Lessons are clear, and projects are comprehensive. Highly recommended!",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[80%] m-auto py-12">
      <div className="w-full 800px:flex items-center gap-8">
        <div className="800px:w-[50%] w-full flex justify-center">
          <Image
            src={require("../../../public/assets/review.png")}
            alt="students"
            width={700}
            height={700}
            className="max-w-full h-auto"
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className="text-3xl sm:text-4xl 1000px:text-5xl font-semibold text-gray-900 dark:text-white leading-tight">
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br />
            See What They Say About Us
          </h3>
          <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto 1000px:mx-0">
            Explore the experiences and feedback of our students who have
            benefited from our courses. Their growth and success are our top
            priority.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-12 mb-12">
        {reviews.map((i, index) => (
          <ReviewCard item={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
