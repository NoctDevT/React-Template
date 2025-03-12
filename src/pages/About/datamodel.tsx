import { FaBookOpen, FaComments, FaLightbulb, FaTools, FaUsers, FaBrain } from "react-icons/fa";

interface StatItem {
    label: string;
    value: string;
  }
  
  interface SkillItem {
    category: string,
    skill: string
  }
  
  interface SoftSkill {
    icon: JSX.Element;
    title: string;
    description: string;
  }
  
  export const statsData: StatItem[] = [
    { label: 'Years of Experience', value: '+4' },
    { label: 'Projects Completed', value: '+15' },
    { label: 'Worldwide Clients', value: '+5' }
  ];
  
  export const skillData: SkillItem[] = [
    { category: "Frontend", skill: "React" },
    { category: "Frontend", skill: "TypeScript" },
    { category: "Backend", skill: "Node.js" },
    { category: "Backend", skill: "Rust" },
    { category: "Cloud", skill: "AWS" },
    { category: "Cloud", skill: "Terraform" },
    { category: "OS", skill: "Linux" },
    { category: "Containerization", skill: "Docker" },
    { category: "Languages", skill: "Java" },
    { category: "Framework", skill: "Spring" },
    { category: "Languages", skill: "C" },
    { category: "Databases", skill: "Databases" },
  ]
  
  export const softSkills : SoftSkill[] = [
    {
      icon: <FaLightbulb className="text-yellow-400 text-2xl" />,
      title: "Adaptible",
      description: "Thriving in dynamic environemtns by adapting quickly to new technologies, tools, and workflows.",
    },
    {
      icon: <FaComments className="text-pink-400 text-2xl" />,
      title: "Communication",
      description: "Bridging gap between technical details and stakeholder business requirements through clear communication.",
    },
    {
      icon: <FaTools className="text-blue-400 text-2xl" />,
      title: "Problem Solving",
      description: "Identifying problems and implementing practical, effective solutions.",
    }, 
    {
      icon: <FaUsers className="text-green-400 text-2xl" />,
      title: "Collaboration",
      description: "Seamless cross-functional team collaboration to deliver successful projects and solutions.",
    },
    {
      icon: <FaBookOpen className="text-purple-400 text-2xl" />,
      title: "Continuous Learning",
      description: "Being curious and committed to self-mastery through an exploration of new frameworks, tools, and methodologies.",
    },
    {
      icon: <FaBrain className="text-red-400 text-2xl" />,
      title: "Critical Thinking",
      description: "Analyzing complex problems and evaluating effective solutions to create informed decisions.",
    }
  ];
  