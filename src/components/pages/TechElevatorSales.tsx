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
  Gift,
  AlertTriangle,
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

const TechElevatorSalesPage = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [spotsLeft, setSpotsLeft] = useState(12);

  // Set countdown to next Friday at 11:59 PM
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextFriday = new Date();

      // Set to next Friday
      nextFriday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
      nextFriday.setHours(23, 59, 59, 0);

      // If it's already past Friday this week, set to next week
      if (now > nextFriday) {
        nextFriday.setDate(nextFriday.getDate() + 7);
      }

      const difference = nextFriday.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const bonuses = [
    {
      title: "Exclusive Dashboard Templates",
      description: "Get 5 professional Excel dashboard templates worth ₦15,000",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "LinkedIn Optimization Guide",
      description: "Step-by-step guide to getting noticed by recruiters",
      icon: <Linkedin className="w-6 h-6" />,
    },
    {
      title: "AI Resume Builder Tool",
      description: "Access to our proprietary AI-powered resume builder",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      title: "Private Community Access",
      description: "Network with alumni and industry professionals",
      icon: <Users className="w-6 h-6" />,
    },
  ];
  const handleOpenForm = () => {
    window.location.replace(
      "https://docs.google.com/forms/d/e/1FAIpQLSeC7vWnAhczRi84yusKSlEKHdDYYtjQRqSGR3aLEJ1Ihn9RAA/viewform"
    );
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation with Logo */}
      <nav className="relative flex justify-between items-center z-50 w-full py-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <Logo />
        </a>
      </nav>
      {/* Urgency Bar */}
      <div className="bg-red-600 text-white text-center  flex items-center justify-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        <span className="font-bold">LIMITED TIME OFFER:</span> Enroll now and
        get 3 exclusive bonuses worth ₦25,000!
        <span className="ml-2 hidden sm:inline">|</span>
        <span className="hidden sm:inline">
          Only {spotsLeft} spots left at this price!
        </span>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),transparent_50%)]"></div>

      {/* Hero Section */}
      <section className="relative  flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-6 py-2">
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
              Want a Tech Job Fast? Our New 4-Week Program Can Get You There!
            </p>

            {/* Countdown Timer */}
            <div className=" backdrop-blur-sm  rounded-xl   max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="w-5 h-5 text-red-400" />
                <span className="font-semibold">OFFER ENDS IN:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-gray-400">DAYS</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-400">HOURS</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-400">MINUTES</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-400">SECONDS</div>
                </div>
              </div>
              <div className="mt-4 text-sm  text-gray-400">
                Only {spotsLeft} spots left at this price!
              </div>
            </div>

            <div className="flex flex-wrap gap-4 hidden items-center">
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
                <FaNairaSign className="w-4 h-4 text-green-400" />
                <span className="text-2xl font-bold">40,000</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-semibold">4 Weeks</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-full px-4 py-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="font-semibold">Starts Aug 9</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenForm}
                className=" w-full group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
              >
                <span>Register</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Content - Video/Preview */}
          <div className="relative">
            {/* Dashboard Preview Images */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-black/40 border border-gray-800/50 rounded-lg overflow-hidden"
                >
                  <img
                    src={`/img/dashboard/${num}.jpg`}
                    alt={`Dashboard Example ${num}`}
                    className="w-full h-80 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              What You'll Get in Just 4 Weeks
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to land your dream tech job
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Core Program</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      Become an Excel Whiz & Build Cool Dashboards
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Go from knowing nothing to making awesome, clear data
                      pictures that will impress bosses.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <Monitor className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      Create Your Own Online Portfolio
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Make a website with your best work. This shows employers
                      you can really do the job!
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-green-600/20 p-2 rounded-lg">
                    <Linkedin className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      Make Your LinkedIn Shine & Connect Globally
                    </h4>
                    <p className="text-gray-400 text-sm">
                      We'll show you exactly how to make your LinkedIn profile
                      look great so recruiters find you.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-red-600/20 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      Get an AI-Smart Resume for the Perfect Job
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Build a modern resume that gets noticed by computer
                      systems and helps you land the right job, fast.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-yellow-600/20 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-bold">Get Advice from Top Experts</h4>
                    <p className="text-gray-400 text-sm">
                      You'll get direct help and guidance from experienced
                      professionals every step of the way.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-800/50 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Gift className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-bold">Limited-Time Bonuses</h3>
              </div>
              <ul className="space-y-6">
                {bonuses.map((bonus, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="bg-red-600/20 p-2 rounded-lg">
                      {bonus.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{bonus.title}</h4>
                      <p className="text-gray-400 text-sm">
                        {bonus.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-black/40 border border-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-semibold">WARNING:</span>
                </div>
                <p className="text-sm text-gray-300">
                  These bonuses are only available until the timer runs out or
                  all spots are filled. Don't miss your chance to get these
                  exclusive resources!
                </p>
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
              Why Choose Nebiant's Tech Elevator?
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

                <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-800/50 rounded-2xl p-4">
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

      {/* Dashboard Showcase */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Real Dashboard Projects You'll Build
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional dashboards that will impress employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="bg-black/40 border border-gray-800/50 rounded-xl overflow-hidden group"
              >
                <div className="aspect-video bg-gray-900 overflow-hidden">
                  <img
                    src={`/img/dashboard/${num}.jpg`}
                    alt={`Dashboard Example ${num}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Dashboard Project #{num}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Real-world business application
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramDetails />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Investment Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">
                Your Career Transformation Starts Here
              </h2>
              <p className="text-xl text-gray-400">
                For less than the cost of a new smartphone, you can gain skills
                that will increase your earning potential for years to come
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6">
                <h3 className="font-bold text-2xl mb-4">What You're Getting</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>4-week intensive training program</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Live instructor-led sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>4 professional dashboard projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>AI-powered resume builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>LinkedIn optimization guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Global mentorship sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Job placement support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-800/50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-2xl">Total Value</h3>
                  <div className="flex items-center gap-1">
                    <FaNairaSign className="w-4 h-4" />
                    <span className="text-xl font-bold">125,000</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span>Program Fee</span>
                    <span className="font-semibold">₦80,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dashboard Templates</span>
                    <span className="font-semibold">₦15,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>AI Resume Builder</span>
                    <span className="font-semibold">₦10,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>LinkedIn Guide</span>
                    <span className="font-semibold">₦10,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Community Access</span>
                    <span className="font-semibold">₦10,000</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Today's Price</span>
                    <div className="flex items-center gap-1">
                      <FaNairaSign className="w-5 h-5" />
                      <span className="text-2xl font-bold">40,000</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    You save ₦85,000 (68% off)
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="w-5 h-5 text-red-400" />
                <span className="font-semibold">OFFER ENDS IN:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-gray-400">DAYS</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-400">HOURS</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-400">MINUTES</div>
                </div>
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-3">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-400">SECONDS</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-center text-gray-400">
                Only {spotsLeft} spots left at this price!
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleOpenForm}
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
              >
                <span>ENROLL NOW FOR ₦40,000</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

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

      {/* Final CTA */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900/30 to-gray-800/20 border border-gray-800/50 rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-6">
              Don't Miss This Opportunity!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The timer is ticking and spots are filling fast. Enroll now before
              the price increases!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleOpenForm}
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
              >
                <span>ENROLL NOW - ₦40,000</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
        programType="tech-elevator-sales"
      />

      <TechElevatorFooter />
    </div>
  );
};

export default TechElevatorSalesPage;
