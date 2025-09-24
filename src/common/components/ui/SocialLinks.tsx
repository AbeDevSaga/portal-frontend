import React from "react";
import {
  FaFacebookF,
  FaTelegram,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
  FaPinterest,
  FaSnapchat,
  FaDiscord,
} from "react-icons/fa";

interface SocialLinksProps {
  platforms: string[];
  size?: number;
  className?: string;
  iconClassName?: string;
}

function SocialLinks({
  platforms,
  size = 24,
  className = "",
  iconClassName = "",
}: SocialLinksProps) {
  // Map social media names to their respective URLs and icons
  const socialMediaData = {
    facebook: {
      url: "https://facebook.com",
      icon: FaFacebookF,
      name: "Facebook",
      color: "#1877F2",
    },
    telegram: {
      url: "https://telegram.org",
      icon: FaTelegram,
      name: "Telegram",
      color: "#26A5E4",
    },
    instagram: {
      url: "https://instagram.com",
      icon: FaInstagram,
      name: "Instagram",
      color: "#E4405F",
    },
    youtube: {
      url: "https://youtube.com",
      icon: FaYoutube,
      name: "YouTube",
      color: "#FF0000",
    },
    twitter: {
      url: "https://twitter.com",
      icon: FaTwitter,
      name: "Twitter",
      color: "#1DA1F2",
    },
    linkedin: {
      url: "https://linkedin.com",
      icon: FaLinkedinIn,
      name: "LinkedIn",
      color: "#0A66C2",
    },
    tiktok: {
      url: "https://tiktok.com",
      icon: FaTiktok,
      name: "TikTok",
      color: "#000000",
    },
    pinterest: {
      url: "https://pinterest.com",
      icon: FaPinterest,
      name: "Pinterest",
      color: "#BD081C",
    },
    snapchat: {
      url: "https://snapchat.com",
      icon: FaSnapchat,
      name: "Snapchat",
      color: "#FFFC00",
    },
    discord: {
      url: "https://discord.com",
      icon: FaDiscord,
      name: "Discord",
      color: "#5865F2",
    },
  };

  return (
    <div className={`flex gap-10 ${className}`}>
      {platforms.map((platform) => {
        const social =
          socialMediaData[platform as keyof typeof socialMediaData];

        if (!social) return null;

        const IconComponent = social.icon;

        return (
          <a
            key={platform}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-sm transition-all duration-300 hover:scale-110 ${iconClassName}`}
            style={{ backgroundColor: social.color, color: "white" }}
            aria-label={`Visit our ${social.name} page`}
            title={social.name}
          >
            <IconComponent size={size} />
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
