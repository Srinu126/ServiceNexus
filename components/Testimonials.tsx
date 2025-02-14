
import FeedbackCard from "./FeedbackCard";

export const feedback = [
    {
      id: "feedback-1",
      content:
        "I’ve struggled to find trustworthy professionals for home repairs, but Service Nexus made it incredibly easy! I booked an electrician within minutes, and the service was top-notch. Highly recommended!",
      name: "Sophia L.",
      title: "Toronto, Canada",
      img: "/people01.png",
    },
    {
      id: "feedback-2",
      content:
        "I needed urgent plumbing repairs, and Service Nexus connected me with an expert in no time. The provider was professional, on time, and the pricing was transparent. This platform is a lifesaver!",
      name: "James R.",
      title: "Waterloo, Canada",
      img: "/people02.png",
    },
    {
      id: "feedback-3",
      content:
        "I run a small cleaning business, and joining Service Nexus has helped me reach more customers than ever. The seamless booking system and fair payment process make it an excellent platform for both providers and customers!",
      name: "John M.",
      title: "Ottawa, Canada",
      img: "/people03.png",
    },
  ];

const Testimonials = () => (
  <section
    id="clients"
    className="sm:py-16 py-6 flex justify-center items-center flex-col relative"
  >
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 className="font-poppins text-center font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
        Testimonials
      </h2>
    </div>

    <div className="flex flex-wrap justify-center w-full feedback-container relative z-[1]">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default Testimonials;
