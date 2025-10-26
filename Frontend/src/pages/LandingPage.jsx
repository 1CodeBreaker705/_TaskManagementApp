import React from 'react';
import { FaTasks, FaRegChartBar,  } from 'react-icons/fa';
import websitePhoto from '../assets/website-photo.png';
import { FaUser } from "react-icons/fa";
const LandingPage = () => {

 



  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Manage Your Tasks Effortlessly</h1>
          <p className="mb-6 text-lg lg:text-xl text-indigo-100">
            Create, organize, and track your tasks by category,priority and status, with powerful search, filtering, and analytics—all in one place.
          </p>
          <p className="mb-6 text-lg lg:text-xl text-indigo-100">
            Taskin makes professional and personal daily task management so easy with rich text support,smooth modern UI,personal dashboard and many features
          </p>
          <div className="flex gap-4">
            <a href="/register" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded shadow hover:bg-gray-100 transition">Get Started</a>
            <a href="/login" className="px-6 py-3 border border-white text-white font-semibold rounded hover:bg-white hover:text-indigo-600 transition">Login</a>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 ml-2 lg:mt-0">
          {/* Replace with screenshot/illustration */}
          <img src={websitePhoto} alt="Task Dashboard" className="rounded shadow-lg"/>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 text-gray-800 py-20 px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded shadow p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
            <FaTasks className="text-indigo-600 text-5xl mb-4"/>
            <h3 className="font-semibold text-xl mb-2">Task Management</h3>
            <p>Feature rich modern web app with multiple task categories to choose from,priority management,task completion status,powerful all-in-one dashboard,rich-text support,task CRUD support,task creation and deadline date tracking support</p>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
            <FaRegChartBar className="text-indigo-600 text-5xl mb-4"/>
            <h3 className="font-semibold text-xl mb-2">Analytics Dashboard</h3>
            <p>Keep track of all your tasks.Never Miss any deadline with dedicated analytics page which tracks total tasks,overdue tasks,provides category-wise and priority-wise task tracking
            </p>
          </div>
          <div className="bg-white rounded shadow p-6 flex flex-col items-center text-center hover:scale-105 transform transition">
            <FaUser className="text-indigo-600 text-5xl mb-4"/>
            <h3 className="font-semibold text-xl mb-2">Sleek UI and Amazing User Experience</h3>
            <p>Smooth and clean modern UI with powerful task searching,filtering based on priority and status,sorting,dedicated ui to view task,edit task,and create task provides best user experience and enhances workflow  
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
