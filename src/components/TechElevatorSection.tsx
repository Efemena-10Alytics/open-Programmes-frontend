import React, { useEffect, useState } from "react";
import {
  ExternalLink,
  Clock,
  Currency,
  TrendingUp,
  BarChart3,
  Globe,
  Linkedin,
  Bot,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Flame,
  Users,
  Award,
  Target,
  BookOpen,
  Briefcase,
  CheckCircle,
  Calendar,
  MapPin,
  Timer,
  Zap,
} from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";

const TechElevatorSection = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: "overview",
      title: "Program Overview",
      subtitle: "What You'll Master",
      icon: <Target className="w-6 h-6" />,
      content: [
        {
          icon: <BarChart3 className="w-5 h-5" />,
          title: "Excel Skills & Interactive Dashboard",
          description:
            "Master advanced Excel techniques and create stunning interactive dashboards",
          highlight: "Advanced Analytics",
        },
        {
          icon: <Globe className="w-5 h-5" />,
          title: "Google Sites Portfolio Creation",
          description:
            "Build a professional portfolio website using Google Sites",
          highlight: "Professional Portfolio",
        },
        {
          icon: <Linkedin className="w-5 h-5" />,
          title: "LinkedIn Optimization",
          description:
            "Optimize your LinkedIn profile to attract recruiters and employers",
          highlight: "Career Boost",
        },
        {
          icon: <Bot className="w-5 h-5" />,
          title: "AI-Powered CV Job Matching",
          description:
            "Create AI-powered tools to match your CV with job opportunities",
          highlight: "AI Integration",
        },
      ],
    },
    {
      id: "schedule",
      title: "Program Schedule",
      subtitle: "3-Week Intensive Journey",
      icon: <Calendar className="w-6 h-6" />,
      content: [
        {
          icon: <BookOpen className="w-5 h-5" />,
          title: "Week 1: Foundation Building",
          description:
            "Excel mastery, dashboard creation, and data visualization fundamentals",
          highlight: "Technical Skills",
        },
        {
          icon: <Globe className="w-5 h-5" />,
          title: "Week 2: Portfolio Development",
          description:
            "Google Sites portfolio creation and professional online presence",
          highlight: "Digital Presence",
        },
        {
          icon: <Briefcase className="w-5 h-5" />,
          title: "Week 3: Career Acceleration",
          description:
            "LinkedIn optimization, AI CV matching, and job application strategies",
          highlight: "Career Ready",
        },
        {
          icon: <Award className="w-5 h-5" />,
          title: "Certification & Support",
          description:
            "Program completion certificate and ongoing career support",
          highlight: "Certified Professional",
        },
      ],
    },
    {
      id: "benefits",
      title: "Program Benefits",
      subtitle: "Why Tech Elevator",
      icon: <TrendingUp className="w-6 h-6" />,
      content: [
        {
          icon: <Users className="w-5 h-5" />,
          title: "Expert Instructors",
          description:
            "Learn from industry professionals with real-world experience",
          highlight: "Industry Experts",
        },
        {
          icon: <Timer className="w-5 h-5" />,
          title: "Flexible Learning",
          description: "Evening and weekend classes to fit your busy schedule",
          highlight: "Work-Life Balance",
        },
        {
          icon: <CheckCircle className="w-5 h-5" />,
          title: "100% Job Placement Support",
          description:
            "Dedicated career support team to help you land your dream job",
          highlight: "Career Guarantee",
        },
        {
          icon: <Zap className="w-5 h-5" />,
          title: "Lifetime Access",
          description:
            "Lifetime access to course materials and community support",
          highlight: "Continuous Learning",
        },
      ],
    },
    {
      id: "success",
      title: "Success Stories",
      subtitle: "Graduate Outcomes",
      icon: <Award className="w-6 h-6" />,
      content: [
        {
          icon: <TrendingUp className="w-5 h-5" />,
          title: "95% Job Placement Rate",
          description: "95% of our graduates secure employment within 3 months",
          highlight: "Proven Results",
        },
        {
          icon: <Currency className="w-5 h-5" />,
          title: "Average Salary Increase",
          description:
            "Graduates report an average 40% salary increase post-program",
          highlight: "₦150k - ₦300k",
        },
        {
          icon: <Users className="w-5 h-5" />,
          title: "200+ Success Stories",
          description:
            "Join a thriving community of successful Tech Elevator graduates",
          highlight: "Growing Network",
        },
        {
          icon: <MapPin className="w-5 h-5" />,
          title: "Remote & Onsite Opportunities",
          description:
            "Access to both remote and onsite job opportunities nationwide",
          highlight: "Flexible Careers",
        },
      ],
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEnrollNow = () => {
    window.open(
      "https://paystack.com/buy/nebiant-analytics-tech-elevator",
      "_blank"
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white py-16 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-950/20 via-transparent to-purple-950/20"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-800/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-900/10 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-900/30 backdrop-blur-sm border border-purple-800/30 rounded-full px-6 py-2 mb-6">
            <Flame className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold tracking-wide">
              NEW PROGRAM LAUNCH
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
              Tech
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent ml-3">
              Elevator
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
            Elevate your career to the next level with our intensive 3-week
            program
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">
              Rated 5.0 by 200+ students
            </span>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Dynamic Content */}
          <div className="space-y-8">
            {/* Section Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === index
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-purple-900/20 text-purple-300 hover:bg-purple-900/40"
                    }`}
                >
                  {section.icon}
                  <span className="hidden sm:inline">{section.title}</span>
                </button>
              ))}
            </div>

            {/* Active Section Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 rounded-xl">
                  {sections[activeSection].icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {sections[activeSection].title}
                  </h2>
                  <p className="text-purple-300 text-sm">
                    {sections[activeSection].subtitle}
                  </p>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid gap-4">
                {sections[activeSection].content.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-purple-950/40 to-purple-900/20 backdrop-blur-sm rounded-xl p-4 border border-purple-800/20 hover:border-purple-600/40 transition-all duration-300 hover:transform hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-2 rounded-lg shadow-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          {item.description}
                        </p>
                        <span className="inline-block bg-purple-900/40 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                          {item.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Elevator + Key Info */}
          <div className="space-y-6">
            {/* Elevator Visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className=" rounded-2xl p-6 shadow-2xl"
                  style={{ width: "320px", height: "240px" }}
                >
                  <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl h-full flex flex-col justify-between p-6 relative overflow-hidden">
                    <div className="flex justify-center mb-4">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <TrendingUp className="w-4 h-4" />
                        <span>Floor {activeSection + 1}</span>
                      </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                          {sections[activeSection].icon}
                        </div>
                        <p className="text-xs text-gray-700 font-bold tracking-wide">
                          {sections[activeSection].title.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between text-xs text-gray-600 font-semibold">
                        <span>START</span>
                        <span>SUCCESS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaNairaSign className="w-4 h-4" />
                  <span className="text-xs font-semibold opacity-90">
                    INVESTMENT
                  </span>
                </div>
                <div className="text-2xl font-black">₦40,000</div>
                <p className="text-purple-200 text-xs">One-time payment</p>
              </div>

              <div className="bg-black rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-gray-300">
                    DURATION
                  </span>
                </div>
                <div className="text-2xl font-black text-white">3 Weeks</div>
                <p className="text-gray-400 text-xs">Intensive</p>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-semibold opacity-90">
                    PLACEMENT
                  </span>
                </div>
                <div className="text-2xl font-black">95%</div>
                <p className="text-green-200 text-xs">Success rate</p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-semibold opacity-90">
                    GRADUATES
                  </span>
                </div>
                <div className="text-2xl font-black">200+</div>
                <p className="text-blue-200 text-xs">Success stories</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button
                onClick={handleEnrollNow}
                className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 w-full justify-center"
              >
                <span>ENROLL NOW</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="block mt-3 text-sm text-gray-400">or</span>
              <a
                href="https://chat.whatsapp.com/FdwH6gjLJvX6qsZk7vZn1C?mode=r_c"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2 mt-2"
              >
                <Users className="w-4 h-4" />
                speak to experts, Join community!
              </a>
            </div>

            {/* Contact Information */}
            <div className="bg-black rounded-xl p-4 shadow-lg">
              <p className="text-sm font-semibold mb-3 text-center text-gray-300">
                Need more information?
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3 h-3" />
                  <span>07072490551 • 07047817037 • 09059948976</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3 h-3" />
                  <span>eneze@10alytics.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechElevatorSection;
