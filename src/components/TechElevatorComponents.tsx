import React, { useState } from "react";
import {
  Users,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  TrendingUp,
  Award,
  Globe,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  PlayCircle,
  Lightbulb,
  Target,
  BarChart3,
  Bot,
  Linkedin,
  PieChart,
  Currency,
  Timer,
  Shield,
  Trophy,
  Zap,
  Code,
  Database,
  FileText,
  Smartphone,
  Monitor,
  Briefcase,
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  ChevronRight,
  Download,
  Eye,
  Flame,
} from "lucide-react";
import { FaNairaSign } from "react-icons/fa6";
import Logo from "./10alytics"

// Additional Program Details Component
export const ProgramDetails = () => {
  const [activeDetail, setActiveDetail] = useState(0);

  const details = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Excel Mastery & Dashboard Creation",
      description: "Master advanced Excel techniques for business analytics",
      features: [
        "Interactive dashboard design",
        "Advanced formulas (VLOOKUP, SUMIF, COUNTIF)",
        "Data visualization with charts and slicers",
        "Executive-level reporting",
        "Real-world sales and HR analytics",
      ],
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-Powered Career Tools",
      description: "Leverage AI to accelerate your job search",
      features: [
        "ChatGPT for job description analysis",
        "Automated CV tailoring",
        "Job matching algorithms",
        "Application optimization",
        "Interview preparation with AI",
      ],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Professional Portfolio & Branding",
      description: "Build your online presence and personal brand",
      features: [
        "Google Sites portfolio creation",
        "LinkedIn profile optimization",
        "Personal brand development",
        "Professional networking strategies",
        "Content creation for visibility",
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Global Mentorship Sessions",
      description: "Direct access to industry professionals",
      features: [
        "Nigerian remote worker mentorship",
        "Canadian tech professional guidance",
        "Global job market insights",
        "Remote work best practices",
        "Direct Q&A sessions",
      ],
    },
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Program Deep Dive</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive training designed for career transformation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Navigation */}
          <div className="space-y-4">
            {details.map((detail, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-300 ${
                  activeDetail === index ? "transform scale-105" : ""
                }`}
                onClick={() => setActiveDetail(index)}
              >
                <div
                  className={`relative bg-black/40 backdrop-blur-sm border rounded-xl p-6 ${
                    activeDetail === index
                      ? "border-red-600 bg-red-600/10"
                      : "border-gray-800/50 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-lg">
                      {detail.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{detail.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Details Display */}
          <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-lg">
                {details[activeDetail].icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {details[activeDetail].title}
                </h3>
                <p className="text-red-400 font-semibold">
                  {details[activeDetail].description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-300 mb-4">
                What You'll Learn:
              </h4>
              <ul className="space-y-3">
                {details[activeDetail].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Learning Outcomes Component
export const LearningOutcomes = () => {
  const outcomes = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Excel Dashboard",
      description: "Create interactive dashboards for sales and HR analytics",
      result: "Professional-grade reporting skills",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Professional Portfolio",
      description:
        "Build a stunning Google Sites portfolio showcasing your work",
      result: "Stand out to employers",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Job Matching Tool",
      description: "Automated CV optimization and job application system",
      result: "Higher interview success rate",
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      title: "Optimized LinkedIn Profile",
      description: "Professional brand that attracts recruiters",
      result: "Increased visibility and opportunities",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Network Access",
      description: "Connect with mentors and professionals worldwide",
      result: "Expanded career opportunities",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Career Acceleration",
      description: "Fast-track your path to tech roles",
      result: "Higher salary and better positions",
    },
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">What You'll Achieve</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Measurable outcomes that transform your career trajectory
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-red-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                {outcome.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{outcome.title}</h3>
              <p className="text-gray-400 mb-4">{outcome.description}</p>
              <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/30 rounded-lg p-3">
                <span className="text-red-300 font-semibold text-sm">
                  {outcome.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Instructors Component
export const Instructors = () => {
  const instructors = [
    {
      name: "Aigberua Iyanuoluwa Dorcas",
      role: "Lead Data Analytics Instructor",
      image: "/facilitators/Dorcas.jpg",
      experience: "10+ years in Fortune 500 companies",
      expertise: [
        "Excel Advanced",
        "Business Intelligence",
        "Data Visualization",
      ],
      bio: "Former Microsoft Excel MVP with extensive experience in corporate training",
    },
    {
      name: "Samuel Odafe",
      role: "Team Lead, Data Science Department",
      image: "/facilitators/SamuelOdafe.jpg",
      experience: "8+ years in tech recruitment",
      expertise: ["AI Tools", "CV Optimization", "LinkedIn Strategy"],
      bio: "Helped 500+ professionals transition to tech roles using AI-powered tools",
    },
    {
      name: "Oluwadamilola Aderemi",
      role: "Excel, Tableau, SQL and Python Instructor",
      image: "/facilitators/Oluwadamilola.jpg",
      experience: "5+ years remote work experience",
      expertise: ["Remote Work", "Global Opportunities", "Portfolio Building"],
      bio: "Currently working remotely for a US-based tech company, passionate about helping others achieve the same",
    },
  ];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Meet Your Instructors</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn from industry experts with real-world experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-red-600/50 transition-all duration-300"
            >
              <div className="text-center mb-4">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-red-600 object-cover"
                />
                <h3 className="font-bold text-lg">{instructor.name}</h3>
                <p className="text-red-400 font-semibold text-sm">
                  {instructor.role}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {instructor.experience}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-red-600/20 text-red-300 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-sm">{instructor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tech Elevator Footer Component
export const TechElevatorFooter = () => {
  const handleEnrollNow = () => {
    window.open(
      "https://paystack.com/buy/nebiant-analytics-tech-elevator",
      "_blank"
    );
  };

  return (
    <footer className="relative bg-black/60 backdrop-blur-sm border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Program Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Tech Elevator</span>
            </div>
            <p className="text-gray-400 text-sm">
              Elevate your career with our intensive 4-week program combining
              Excel mastery, AI tools, and career acceleration.
            </p>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
              <FaNairaSign className="w-4 h-4 text-green-400" />
              <span className="font-bold">₦40,000</span>
              <span className="text-gray-400 text-sm">• 4 Weeks</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#curriculum"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Program Details */}
          <div>
            <h3 className="font-bold mb-4">What You'll Learn</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                Excel Dashboard Creation
              </li>
              <li className="text-gray-400 text-sm">AI-Powered Job Matching</li>
              <li className="text-gray-400 text-sm">LinkedIn Optimization</li>
              <li className="text-gray-400 text-sm">Portfolio Development</li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h3 className="font-bold mb-4">Get Started</h3>
            <div className="space-y-4">
              <button
                onClick={handleEnrollNow}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <span>Enroll Now</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Phone className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400">07072490551</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Mail className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400">eneze@10alytics.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
          <Logo />
              <span className="text-gray-400 text-sm">
                © 2025 10Alytics Business. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://chat.whatsapp.com/DlpuPg45zcJA708jB2Qhex"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Join Community</span>
              </a>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-400" />
                <span className="text-sm font-semibold">Starts August 9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Simplified Home Section for Tech Elevator
export const TechElevatorHomeSection = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleEnrollNow = () => {
    window.open(
      "https://paystack.com/buy/nebiant-analytics-tech-elevator",
      "_blank"
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-red-950 text-white py-16 px-14 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-red-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-800/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-red-800/30 rounded-full px-4 py-2">
              <Flame className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-semibold">
                NEW PROGRAM
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Tech
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Elevator
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Transform your career in 4 weeks with Excel mastery, AI tools, and
              professional branding.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
                <FaNairaSign className="w-4 h-4 text-green-400" />
                <span className="text-xl font-bold">40,000</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">4 Weeks</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEnrollNow}
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <span>ENROLL NOW</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className="group bg-black/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700 px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Key Features */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">What You'll Master</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-red-400" />
                  <span className="text-sm">
                    Excel Dashboards & Advanced Analytics
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">
                    AI-Powered Job Matching & CV Optimization
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-green-400" />
                  <span className="text-sm">
                    Professional Portfolio & LinkedIn Branding
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">
                    Global Mentorship & Career Guidance
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-black">95%</div>
                <p className="text-green-200 text-sm">Job Placement</p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-black">200+</div>
                <p className="text-blue-200 text-sm">Success Stories</p>
              </div>
            </div>

            {showDetails && (
              <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 space-y-4">
                <h4 className="font-bold">Program Highlights:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-gray-300">
                      4-week intensive program with live sessions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-gray-300">
                      200+ real-world projects post-completion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-gray-300">
                      Direct mentorship from global professionals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span className="text-sm text-gray-300">
                      100% job placement support
                    </span>
                  </li>
                </ul>
                <a
                  href="/tech-elevator"
                  className="text-red-400 hover:text-red-300 text-sm font-semibold flex items-center gap-2"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
