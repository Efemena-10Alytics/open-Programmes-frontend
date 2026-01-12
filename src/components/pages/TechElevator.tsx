import React, { useState, useEffect } from "react";
import {
  Play,
  Clock,
  Currency,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  BarChart3,
  TrendingUp,
  Globe,
  Bot,
  Linkedin,
  Target,
  BookOpen,
  Briefcase,
  Zap,
  Shield,
  Trophy,
  Lightbulb,
  Code,
  Database,
  PieChart,
  FileText,
  Smartphone,
  Monitor,
  Wifi,
  Download,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Timer,
  Flame,
  ChevronDown,
  ChevronUp,
  PlayCircle,
} from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";
import Link from "next/link";
import {
  ProgramDetails,
  LearningOutcomes,
  Instructors,
  TechElevatorFooter,
} from "../TechElevatorComponents";
import TestimonialSection from "../TestimonialSection";
import RegistrationForm from "../Form";
import Logo from "../10alytics";

const TechElevatorPage = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    window.location.replace(
      "https://docs.google.com/forms/d/18Z0MFh_uf8hBdownOd4yR2Xi-xVfDn0GS-RbHLdaK0U/viewform"
    );
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const weeks = [
    {
      week: 1,
      title: "Building Your First Real-World Excel Dashboard",
      theme: "Mastering Excel for Business Performance Tracking",
      objectives: [
        "Introduction to Excel for data analytics",
        "Cleaning and structuring raw datasets",
        "Creating interactive dashboards",
        "Applying formulas (SUMIF, COUNTIF, VLOOKUP, etc.)",
        "Visual storytelling with charts and slicers",
      ],
      outcome:
        "Build a dashboard to analyse sales performance across multiple regions and products",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "from-blue-600 to-blue-800",
    },
    {
      week: 2,
      title: "Advanced Excel Dashboard Project",
      theme: "Financial or HR Dashboard Creation from Scratch",
      objectives: [
        "Advanced formula combinations and dynamic ranges",
        "Using pivot tables for trend analysis",
        "Conditional formatting for decision making",
        "Creating executive-level reports",
        "Dashboard aesthetics and automation",
      ],
      outcome: "Build a dashboard focused on HR metrics or financial KPIs",
      icon: <PieChart className="w-6 h-6" />,
      color: "from-green-600 to-green-800",
    },
    {
      week: 3,
      title: "AI-Powered CV Job Matching & Portfolio Creation",
      theme: "Leveraging Generative AI to Get Noticed by Recruiters",
      objectives: [
        "Using ChatGPT to analyse job descriptions",
        "Creating tailored CVs and job applications",
        "Building a job-matching machine in Google Sheets or Excel",
        "Portfolio creation using Google Sites",
        "Highlighting data projects and skills effectively",
      ],
      outcome:
        "Finish with a tailored CV, automated job tracker, and personal Google Sites portfolio",
      icon: <Bot className="w-6 h-6" />,
      color: "from-purple-600 to-purple-800",
    },
    {
      week: 4,
      title: "LinkedIn Optimisation & Global Mentorship Sessions",
      theme: "Positioning Yourself for Remote Tech Jobs",
      objectives: [
        "LinkedIn profile optimisation (headline, summary, keywords)",
        "Building a strong personal brand and network",
        "Posting with purpose",
        "Mentorship Q&A with Nigerian working remotely with US company",
        "Mentorship Q&A with Canadian tech professional",
      ],
      outcome:
        "Gain clarity on how to position for global roles and ask direct questions to mentors",
      icon: <Globe className="w-6 h-6" />,
      color: "from-red-600 to-red-800",
    },
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with real-world experience",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Live + Practical Sessions",
      description: "Interactive online sessions with hands-on practice",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "200+ Real-World Projects",
      description: "1-month post-program access to exclusive project library",
    },
  ];

  const faqs = [
    {
      question: "What makes Tech Elevator different from other programs?",
      answer:
        "Tech Elevator combines practical Excel skills with AI-powered career tools, LinkedIn optimization, and direct mentorship from professionals working in global companies. Plus, you get access to 200+ real-world projects post-completion.",
    },
    {
      question: "Do I need any prior experience to join?",
      answer:
        "No prior experience is required. Our curriculum is designed to take you from beginner to job-ready in just 4 weeks, with step-by-step guidance throughout.",
    },
    {
      question: "What kind of jobs can I get after completing the program?",
      answer:
        "Graduates typically land roles as Data Analysts, Business Intelligence Analysts, Excel Specialists, and Business Analysts, with starting salaries ranging from ₦150,000 to ₦400,000 monthly.",
    },
    {
      question: "How does the mentorship component work?",
      answer:
        "In Week 4, you'll have direct Q&A sessions with a Nigerian professional working remotely for a US company and a Canadian tech professional, where you can ask specific questions about breaking into the global market.",
    },
    {
      question: "What happens after the 4-week program?",
      answer:
        "You receive lifetime access to our community, 1-month access to 200+ real-world projects, job placement support, and ongoing career guidance from our team.",
    },
  ];

  const handleEnrollNow = () => {
    window.open(
      "https://paystack.com/buy/nebiant-analytics-tech-elevator",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),transparent_50%)]"></div>
      <nav className="relative z-50 w-full py-4 px-4 sm:px-6 lg:px-8 ">
        <a href="/" className="flex items-center gap-2">
          <Logo />
        </a>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-6 py-2 mb-2">
              <Flame className="w-4 h-4 text-red-400" />
              <span className="text-gray-300 text-sm font-semibold tracking-wide">
                4-WEEK INTENSIVE PROGRAM
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Tech
              </span>

              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Elevator
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Elevate your career from Excel basics to AI-powered job matching
              in just 4 weeks. Join 200+ professionals who transformed their
              careers.
            </p>

            <div className="flex flex-wrap gap-4 justify-around items-center">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-lg px-4 py-2 w-full">
                <Clock className="w-8 h-4 text-blue-400" />
                <span className="font-semibold">4 Weeks</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-lg px-4 py-2 w-full">
                <Calendar className="w-8 h-4 text-purple-400" />
                <span className="font-semibold">Starts Aug 9</span>
              </div>
            </div>

            <div className="flex flex-col ">
              <a
                onClick={handleOpenForm}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-black/40 backdrop-blur-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border border-gray-800/50 hover:border-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 justify-center cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>Join Community</span>
              </a>
            </div>
          </div>

          {/* Right Content - Video/Preview */}
          <div className="relative">
            <div className="relative bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20"></div>
                <button
                  onClick={() => setShowVideo(true)}
                  className="relative group"
                >
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                    <h3 className="font-semibold text-sm">Program Overview</h3>
                    <p className="text-xs text-gray-400">
                      4 weeks • 200+ projects • Expert mentorship
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Tech Elevator?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our unique approach combines practical skills with career
              acceleration tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-gray-700 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">4-Week Curriculum</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive curriculum designed to take you from beginner to
              job-ready
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Week Navigation */}
            <div className="space-y-4">
              {weeks.map((week, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeWeek === index ? "transform scale-105" : ""
                  }`}
                  onClick={() => setActiveWeek(index)}
                >
                  <div
                    className={`relative bg-black/40 backdrop-blur-sm border rounded-xl p-6 ${
                      activeWeek === index
                        ? "border-red-600"
                        : "border-gray-800/50 hover:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`bg-gradient-to-r ${week.color} p-3 rounded-lg`}
                      >
                        {week.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Week {week.week}</h3>
                        <p className="text-gray-400 text-sm">{week.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Week Details */}
            <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`bg-gradient-to-r ${weeks[activeWeek].color} p-3 rounded-lg`}
                  >
                    {weeks[activeWeek].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      Week {weeks[activeWeek].week}
                    </h3>
                    <p className="text-red-400 font-semibold">
                      {weeks[activeWeek].theme}
                    </p>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-4">
                  {weeks[activeWeek].title}
                </h4>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="font-semibold mb-3 text-gray-300">
                    Learning Objectives:
                  </h5>
                  <ul className="space-y-2">
                    {weeks[activeWeek].objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">
                          {objective}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/30 rounded-lg p-4">
                  <h5 className="font-semibold mb-2 text-red-300">
                    Week Outcome:
                  </h5>
                  <p className="text-sm text-gray-300">
                    {weeks[activeWeek].outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProgramDetails />

      {/* Stats Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black text-yellow-500 mb-2">
                150+
              </div>
              <div className="text-xl font-semibold mb-2">
                Cohorts Completed
              </div>
              <div className="text-gray-400">Since inception</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-green-600 mb-2">
                200+
              </div>
              <div className="text-xl font-semibold mb-2">Success Stories</div>
              <div className="text-gray-400">Professionals transformed</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-blue-600 mb-2">40%</div>
              <div className="text-xl font-semibold mb-2">Salary Increase</div>
              <div className="text-gray-400">Average post-program</div>
            </div>
          </div>
        </div>
      </section>

      <LearningOutcomes />

      {/* Testimonials */}
      <TestimonialSection />

      {/* FAQ Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about Tech Elevator
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-900/20 transition-colors"
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                >
                  <span className="font-semibold">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Instructors />

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-800/50 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Elevate Your Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the next cohort starting August 9th and transform your career
              in just 4 weeks
            </p>

            <div className="flex flex-col  justify-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenForm}
                className="group bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <Users className="w-5 h-5" />
                <span>Join Community For Free</span>
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800/50">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>07072490551 • 07047817037 • 09059948976</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@nebiant.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
            <div className="aspect-video bg-black rounded-xl flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/QryCbFGIlXE?si=DSxBkyKKZCwO4Xno"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <RegistrationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        programType="tech-elevator"
      />
      <TechElevatorFooter />
    </div>
  );
};

export default TechElevatorPage;
