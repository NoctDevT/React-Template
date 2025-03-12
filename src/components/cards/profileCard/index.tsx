// ProfileCard.tsx
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Link } from "@heroui/react";
import { FaTwitter, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';
// import { useTheme } from '../../../providers/themeProvider';


export interface SocialMedia { 
  twitter: string | null,
  github: string  | null,
  instagram: string  | null,
  email : string  | null
}

interface ProfileCardProps {
  name: string;
  bio: string;
  imageSrc: string;
  socialMedia : SocialMedia
}
const ProfileCard: React.FC<ProfileCardProps> = ({ name, bio, imageSrc, socialMedia }) => {
  // const { theme } = useTheme();

  const socialIcons = {
    twitter: <FaTwitter size={20} />,
    github: <FaGithub size={20} />,
    instagram: <FaInstagram size={20} />,
    email: <FaEnvelope size={20} />,
  };

  return (
    <Card className="max-w-[350px] bg-neutral-800">
      <CardHeader className="flex justify-center p-4">
        <Image
          src={imageSrc}
          alt={`${name}'s Profile`}
          className="rounded-lg object-cover w-full h-[300px]"
        />
      </CardHeader>
      <CardBody className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-200">{name}</h3>
        <p className="text-sm text-gray-300">{bio}</p>
      </CardBody>
      <CardFooter className="flex justify-around items-center p-4">
        {Object.entries(socialMedia).map(([platform, link]) => {
          if (link) {
            return (
              <Link
                key={platform}
                className="text-gray-200"
                href={platform === 'email' ? `mailto:${link}` : link}
                isExternal
              >
                {socialIcons[platform as keyof SocialMedia]}
              </Link>
            );
          }
          return null;
        })}
      </CardFooter>
    </Card>
  );
};
export default ProfileCard;
