import React, { useState } from 'react';
import ProfileCard, { SocialMedia } from '../../components/cards/profileCard';
import { motion } from 'framer-motion';
import { Card, CardBody, Chip } from "@heroui/react";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Divider } from "@heroui/react";
import { statsData, skillData, softSkills } from './datamodel'
import image from "/images/profile.png"

import Tooltip from "../../components/tooltip";


const Dashboard: React.FC = () => {
  const socialMedia: SocialMedia = {
    twitter: 'https://twitter.com/yourprofile',
    github: 'https://github.com/yourprofile',
    instagram: null,
    email: 'yourname@example.com',
  };

  return (
<div className="relative h-screen overflow-y-auto pb-20">
    <div className="container mx-auto px-4 py-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="flex justify-center">
            <ProfileCard
              name="Autumn🍂"
              bio="Innovative software solutions for your business."
              imageSrc={image}
              socialMedia={socialMedia}
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl dark:text-slate-600 text-slate-600 font-bold">
              SOFTWARE <span className="text-slate-600 dark:text-gray-600">DEVELOPER</span>,
              <span className="text-slate-400 dark:text-gray-500"> PHOTOGRAPHER</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 mt-4 text-justify">
            Experienced, results-driven software developer with a passion for creating tailored business solutions that drive success. 
            With expertise in {" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="React" description="Modern frontend framework for building user interfaces" />, {" "}
             <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="Next.js" description="React framework for building server-side rendered (SSR) web applications" />, {" "} 
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="TypeScript" description="Dynamic type system for building scalable applications" />, {" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="Rust" description="Systems programming language for building fast and efficient applications" />, {" "}
            and cloud platforms like {" "}
             <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="AWS" description="Fast and low-overhead Node.js web framework" />.{" "}
            I specialise in developing high-performance, scalable microservices and backend systems using frameworks such as {" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="Spring" description="Java-based framework for building scalable apps" />,{" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]" }keyword="Actix Web" description="Powerful Rust web framework for blazing fast APIs" />,{" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="Express" description="Minimalist Node.js framework for web apps" />,{" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="Ruby on Rails" description="MVC framework for Ruby developers" />, 
            and {" "}
            <Tooltip linkColor='text-sky-500' colour={"bg-[#77CBDA]"} keyword="Fastify" description="Fast and low-overhead Node.js web framework" />. 
            Delivering efficient and resilient solutions.
            In addition I craft visually stunning, interactive frontends designed to captivate users and enhance engagement. 
            Thriving in high-growth environments, I bring a commitment to excellence and a deep focus on user needs to deliver 
            impactful solutions.Let's transform ideas into beautifully executed solutions together. 
            </p>
          </div>
        </div>

        {/* Stats section */}

        <StatsSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <SoftSkillsSection />
          {/* Skills section*/}
          <SkillTable />
        </div>
      </div>
    </div>
  );
};



const SkillTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const pages = Math.ceil(skillData.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return skillData.slice(start, end);
  }, [page]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Frameworks & Libraries</h2>

      <Table
        aria-label="Skill table"
        bottomContent={
          <div className="flex w-full justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[050px] w-full",
        }}
      >
        <TableHeader className="bg-gray-800/70 text-gray-300 text-sm">
          <TableColumn className="w-1/2 text-left">Category</TableColumn>
          <TableColumn className="w-1/2 text-left">Skill</TableColumn>
        </TableHeader>
        <TableBody className="h-[300px] overflow-y-auto"> 
          {items.map((skill, index) => (
            <TableRow key={index}>
              <TableCell className="p-4 text-sm">{skill.category}</TableCell>
              <TableCell className="p-4 text-sm">{`➤ ` + skill.skill}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


const StatsSection: React.FC = () => {

  let emojiArr: Array<string> = [
    "⭐", "🙌", "🌎"
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center mb-12">
      {statsData.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative p-6 rounded-lg shadow-md bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] text-white overflow-hidden"
        >
          <motion.div
            className="absolute top-2 left-0 text-yellow-400 text-xl"
            animate={{
              x: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {emojiArr[index]}
          </motion.div>

          <h3 className="text-3xl font-bold">{item.value}</h3>
          <p>{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

const SoftSkillsSection = () => {
  return (
    <div className="pb-12 text-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Soft Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {softSkills.map((skill, index) => (
          <Card key={index} className="bg-gray-800 text-white border border-gray-700">
            <CardBody className="flex items-center gap-4 p-4">
              {skill.icon}
              <Divider />
              <div>
                <h3 className="text-lg font-bold">{skill.title}</h3>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};














export default Dashboard;







