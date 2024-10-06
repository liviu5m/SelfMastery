import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const tasks = {
  meditate:
    "Meditation is a practice that requires discipline and consistency to yield its full benefits. It involves intentionally setting aside time each day to focus the mind, often in the face of distractions and restlessness. This disciplined approach not only enhances self-awareness and emotional well-being but also strengthens your ability to maintain focus and composure in everyday life. By committing to a regular meditation routine, you develop the mental resilience needed to navigate challenges with greater calm and clarity.",
  praying:
    "Praying is a spiritual practice that involves communicating with a higher power, often to seek guidance, express gratitude, or ask for help. It requires a level of discipline, as setting aside regular time for prayer can help deepen one’s connection to their faith and bring a sense of peace and purpose. The act of praying encourages reflection and mindfulness, fostering a disciplined approach to life where intentions and actions are aligned with spiritual values. Through consistent prayer, individuals can cultivate inner strength, patience, and a greater sense of trust in the journey of life.",
  gym: "Going to the gym is a practice that demands discipline and dedication to achieve fitness goals. Regularly setting aside time for workouts, even on days when motivation is low, builds both physical strength and mental resilience. Discipline in the gym is about more than just showing up; it involves following a structured routine, pushing through challenges, and maintaining consistency over time. This disciplined approach not only transforms the body but also instills habits of perseverance and determination that carry over into other areas of life. By committing to your gym routine, you cultivate a mindset of self-improvement and the ability to overcome obstacles.",
  reading:
    "Reading is a habit that thrives on discipline, requiring the consistent setting aside of time to engage with books and ideas. Whether for learning or leisure, disciplined reading cultivates a deeper understanding of the world and enhances cognitive abilities like focus, comprehension, and critical thinking. By regularly dedicating time to read, you can broaden your perspectives, enrich your knowledge, and improve your vocabulary. This disciplined approach to reading not only nurtures intellectual growth but also fosters a love for lifelong learning, helping you to develop patience and the ability to concentrate deeply on complex subjects. Through the habit of reading, you invest in your personal and intellectual development.",
  water:
    "Drinking a gallon of water daily is a practice that requires discipline and consistency to maintain. It involves consciously tracking your water intake throughout the day, ensuring you meet your hydration goals even when it's challenging. This disciplined approach to hydration has numerous benefits, including improved energy levels, better skin health, and enhanced overall bodily functions. By committing to drinking a gallon of water each day, you develop a habit that not only supports your physical health but also reinforces the importance of self-care and attention to your body's needs. This daily discipline can serve as a foundation for other healthy habits, promoting a holistic approach to well-being.",
  work: "Engaging in 2-4 hours of deep work daily requires a high level of discipline and focus. Deep work involves immersing yourself in cognitively demanding tasks without distractions, allowing you to achieve significant progress and produce high-quality work. This disciplined approach means setting boundaries, eliminating interruptions, and dedicating specific blocks of time to work on your most important tasks. By consistently practicing deep work, you enhance your ability to concentrate, think critically, and solve complex problems. Over time, this discipline not only boosts productivity but also leads to a greater sense of accomplishment and mastery in your field. Committing to deep work is an investment in your personal and professional growth, fostering habits that lead to long-term success.",
  journal:
    "Keeping a journal is a practice that requires discipline and regular commitment. Journaling involves setting aside time each day or week to reflect on your thoughts, experiences, and emotions, allowing you to gain insight into your inner world. This disciplined approach to self-reflection fosters greater self-awareness, helping you process your feelings, set intentions, and track your personal growth. By consistently writing in your journal, you create a safe space for exploring your thoughts without judgment, which can lead to emotional clarity and a deeper understanding of yourself. The discipline of journaling not only enhances mental and emotional well-being but also serves as a powerful tool for personal development, enabling you to document your journey and celebrate your progress over time.",
  diet: "Maintaining a disciplined diet is essential for achieving and sustaining health and wellness goals. A disciplined diet involves planning meals, making conscious food choices, and adhering to a balanced intake of nutrients that align with your health objectives. It requires consistency in portion control, mindful eating, and resisting unhealthy temptations. By committing to a structured dietary plan, you not only support your physical well-being but also cultivate habits of self-control and mindful living. This disciplined approach to eating helps regulate energy levels, supports weight management, and can improve overall health. Over time, a disciplined diet becomes a foundation for long-term wellness, reinforcing the importance of nourishing your body with the right foods.",
};

export default function ModalDashboard({
  task,
  setIsModalOpen,
}: {
  task: string;
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  let content;
  if (task == "books") {
    content = (
      <div>
        <h1 className="text-center mb-2 text-lg">Find A Book</h1>
        <div className="flex items-center gap-5 justify-center mt-2">
          <input
            type="text"
            className="w-3/5 rounded-2xl outline-none text-base border text-black px-5 py-3 z-10"
          />
          <input
            type="text"
            className="w-2/5 rounded-2xl outline-none text-base border text-black px-5 py-3 z-10"
          />
        </div>
      </div>
    );
  } else
    content = (
      <>
        <h1 className="text-center mb-5 ">{task.toUpperCase()}</h1>
        <p>{tasks[task as keyof typeof tasks]}</p>
      </>
    );

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black/50 absolute top-0 left-0 z-30">
      <div className="modal w-1/3  bg-blue rounded-xl p-10 relative">
        <div className="absolute top-10 right-10">
          <FontAwesomeIcon
            icon={faX}
            onClick={(e) => setIsModalOpen(false)}
            className="cursor-pointer"
          />
        </div>
        {content}
      </div>
    </div>
  );
}
