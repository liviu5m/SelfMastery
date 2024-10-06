"use client";

import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { useAppContext } from "@/libs/AppContext";
import { sendEmail } from "@/libs/mail";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const { user, loading } = useAppContext();

  return loading ? (
    <Loader />
  ) : user && (
    <div className="relative top-20">
      <section
        className="bg-banner z-10 py-5 px-40 relative height-custom"
        id="home"
      >
        <div className="z-20 relative h-full">
          <div className="flex items-center justify-center gap-10 h-full">
            <div
              className="w-1/2 h-full flex flex-col justify-center
            "
            >
              <h1 className="text-4xl mb-5 text-blue font-bold">
                Unlock Your Potential with Self Mastery
              </h1>
              <p className="mb-10 text-justify">
                Welcome to Self Mastery, where your journey towards personal
                growth and empowerment begins. Here, we believe that true
                mastery starts from within, and we are dedicated to providing
                you with the tools, insights, and guidance you need to unlock
                your full potential. Whether you&apos;re looking to enhance your
                mental, physical, or spiritual well-being, our resources are
                designed to help you take control of your life and achieve the
                highest version of yourself. Let&apos;s embark on this transformative
                journey together, where every step brings you closer to the self
                you aspire to be.
              </p>
              <Link
                href={`${!user.error ? "/dashboard" : "/sign-in"}`}
                className="mt-16 rounded-lg px-5 py-2 w-fit text-white bg-purple hover:shadow-lg hover:shadow-purple-500 shadow-md shadow-purple-500"
              >
                Get Started
              </Link>
            </div>
            <div className="w-1/2 flex items-center justify-center h-full">
              <img src="/imgs/home-banner.png" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="px-40 py-20" id="about-us">
        <div className="flex items-center justify-center flex-col gap-5 h-fit mb-20">
          <h1 className="text-center text-4xl text-white">About Us</h1>
          <div className="w-20 h-3 bg-blue"></div>
        </div>
        <div className="flex gap-10 items-center  border-b border-t border-purple-500 h-80">
          <div className="w-1/2">
            <p className="text-lg text-justify">
              Welcome to Self Mastery—your dedicated platform for personal
              growth, goal setting, and disciplined living. At Self Mastery, we
              believe that true success begins with mastering oneself. Whether
              you&apos;re striving to achieve personal, professional, or academic
              goals, our mission is to provide you with the tools, resources,
              and inspiration needed to stay focused, disciplined, and
              committed.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center h-full">
            <img
              src="/imgs/about-1.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="flex mt-10 gap-10 items-center  border-b border-t border-purple-500 h-80">
          <div className="w-1/2 flex items-center justify-center h-full">
            <img
              src="/imgs/about-2.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="w-1/2">
            <p className="text-lg text-justify">
              <h1 className="text-2xl mb-6 font-bold">Our Mission</h1>
              Our mission is simple: to empower individuals to take control of
              their lives through the power of self-discipline and intentional
              goal setting. We aim to be your trusted companion on the journey
              to self-improvement, helping you break through barriers, overcome
              procrastination, and unlock your full potential.
            </p>
          </div>
        </div>
        <div className="flex gap-10 items-center  border-b border-t border-purple-500 h-80 mt-10">
          <div className="w-1/2">
            <p className="text-lg text-justify">
              <h1 className="text-2xl mb-6 font-bold">Why Self Mastery?</h1>
              In a world full of distractions, staying disciplined and focused
              on what truly matters can be challenging. Self Mastery is here to
              guide you every step of the way, ensuring that you remain
              committed to your goals and consistently work towards becoming the
              best version of yourself. At Self Mastery, we believe that with
              the right mindset, tools, and support, anything is possible.
              Whether you&apos;re just starting out on your journey or looking to
              take your achievements to the next level, we&apos;re here to help you
              succeed.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center h-full">
            <img
              src="/imgs/about-1.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="px-40 py-20" id="features">
        <div className="flex items-center justify-center flex-col gap-5 h-fit mb-10">
          <h1 className="text-center text-4xl text-white">Features</h1>
          <div className="w-20 h-3 bg-blue"></div>
        </div>

        <div className="flex items-center justify-center mb-20">
          <p className="text-justify w-1/2">
            At <span className="font-bold">Self Mastery</span>, we offer a
            comprehensive set of features designed to help you take control of
            your personal growth journey. Whether you&apos;re looking to enhance your
            fitness, sharpen your mind, or track your progress, our platform
            provides the tools you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-10">
          <div className="border p-5 rounded-lg">
            <h1 className="text-xl mb-5">📚 Book Searcher</h1>
            <p className="text-justify mb-5">
              Fuel your mind with knowledge by exploring our Book Searcher
              feature. Easily search for books across a wide range of genres and
              topics, whether you&apos;re looking for self-help, motivation, or
              skill-building resources. Find, read, and get inspired by the
              wisdom of great authors as you work towards mastering yourself.
            </p>
          </div>

          <div className="border p-5 rounded-lg">
            <h1 className="text-xl mb-5">🏋️ Gym Management</h1>
            <p className="text-justify mb-5">
              Achieve your fitness goals with our Gym Management tools. From
              exercises to customized workout splits, we&apos;ve got you covered:
            </p>
            <ul>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Exercise Library: </span>{" "}
                Access a comprehensive database of exercises, complete with
                descriptions, instructions, and tips. Whether you&apos;re a beginner
                or a seasoned athlete, find the perfect exercises to match your
                goals.
              </li>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Workout Splits:</span> Create
                and manage workout splits tailored to your fitness level and
                objectives. Whether you&apos;re focusing on strength, endurance, or
                flexibility, our tools help you build a routine that works for
                you.
              </li>
            </ul>
          </div>

          <div className="border p-5 rounded-lg">
            <h1 className="text-xl mb-5">🍽️ Clean Diet Management</h1>
            <p className="text-justify mb-5">
              Nourish your body with our Clean Diet Management feature. Stay on
              track with your dietary goals by planning and tracking meals that
              support your health and fitness:
            </p>
            <ul>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Meal Planning: </span> Design
                meal plans that align with your dietary preferences and
                nutritional needs. Keep your diet clean and balanced as you work
                towards your fitness goals.
              </li>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Nutritional Tracking: </span>{" "}
                Monitor your intake of calories, macros, and essential
                nutrients. Stay informed about what you&apos;re eating and how it
                impacts your body.
              </li>
            </ul>
          </div>

          <div className="border p-5 rounded-lg">
            <h1 className="text-xl mb-5">📝 Journaling</h1>
            <p className="text-justify mb-5">
              Reflect on your daily experiences and track your mental and
              emotional growth with our Journaling tool. Write down your
              thoughts, wins, challenges, and reflections to better understand
              your journey and maintain a clear focus on your goals.
            </p>
          </div>

          <div className="border p-5 rounded-lg">
            <h1 className="text-xl mb-5">📈 Process Tracking</h1>
            <p className="text-justify mb-5">
              Stay on top of your progress with our Process Tracking feature.
              Visualize your journey and see how far you&apos;ve come with detailed
              tracking and analytics:
            </p>
            <ul>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Goal Progress: </span> Set
                milestones and track your progress over time. Celebrate small
                wins and stay motivated as you work towards your larger goals.
              </li>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Daily Check-ins: </span> Keep
                yourself accountable with daily check-ins. Record your
                activities, thoughts, and feelings to ensure you&apos;re staying on
                the right path.
              </li>
            </ul>
          </div>

          <div className="border p-5 rounded-lg">
            <h1 className="text-xl mb-5">🧩 Successful Habits</h1>
            <p className="text-justify mb-5">
              Master your daily routine with our Successful Habits feature. This
              tool helps you break down your habits into manageable habits,
              making it easier to build and sustain successful routines:
            </p>
            <ul>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Habit Tracking: </span>{" "}
                Identify and track key habits that contribute to your overall
                success. Break them down into habits, ensuring each habit is
                consistently practiced and integrated into your daily life.
              </li>
              <li className="mb-5 text-justify">
                <span className="font-bold mr-3">Routine Building: </span>{" "}
                Create effective routines by organizing your habits into
                specific habits, making it easier to manage and maintain a
                disciplined lifestyle.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-40 py-20" id="contact">
        <div className="flex items-center justify-center flex-col gap-5 h-fit mb-20">
          <h1 className="text-center text-4xl text-white">Contact Us</h1>
          <div className="w-20 h-3 bg-blue"></div>
        </div>
        <div className="flex">
          <form
            className="w-1/2"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              sendEmail(
                formData.get("firstName")?.toString() ?? "",
                formData.get("lastName")?.toString() ?? "",
                formData.get("email")?.toString() ?? "",
                formData.get("subject")?.toString() ?? "",
                formData.get("message")?.toString() ?? ""
              ).then(res => {
                if(res) toast("Email send successfully");
                else toast("Email send failed");
              })

              e.currentTarget.reset();
            }}
          >
            <div className="flex items-center  gap-10">
              <div className="group-input flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  className="rounded-lg px-5 py-3 outline-none text-black w-input"
                />
              </div>
              <div className="group-input flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className="rounded-lg px-5 py-3 outline-none text-black w-input"
                />
              </div>
            </div>
            <div className="group-input flex flex-col gap-2 mt-5">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="rounded-lg px-5 py-3 outline-none text-black w-textarea"
              />
            </div>
            <div className="group-input flex flex-col gap-2 mt-5">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                className="rounded-lg px-5 py-3 outline-none text-black w-textarea"
              />
            </div>
            <div className="group-input flex flex-col gap-2 mt-5">
              <label htmlFor="message">Email</label>
              <textarea
                placeholder="Message"
                name="message"
                className="rounded-lg px-5 py-3 h-60 outline-none text-black w-textarea"
              ></textarea>
            </div>
            <button className="mt-10 rounded-lg px-5 py-2 w-fit text-white bg-purple hover:shadow-lg hover:shadow-purple-500 shadow-md shadow-purple-500">
              Send
            </button>
          </form>
          <div className="w-1/2 h-fit">
            <img
              src="/imgs/contact.jpg"
              className="w-full object-cover rounded-xl"
              alt=""
              style={{ height: `600px` }}
            />
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer />
    </div>
  );
}
