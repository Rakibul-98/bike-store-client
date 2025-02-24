import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook, FiInstagram, FiLinkedin,  FiYoutube } from "react-icons/fi";
import { RiMotorbikeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    {
      title: "Services",
      links: ["Maintenance Services", "Bike Sales & Accessories", "Rental Services", "Professional Services"],
    },
    {
      title: "Company",
      links: ["About us", "Contact", "Jobs", "Press kit"],
    },
    {
      title: "Legal",
      links: ["Terms of use", "Privacy policy", "Cookie policy"],
    },
  ];

  const socialLinks = [
    {
      icon: <FiFacebook />, // Facebook Blue
      url: "https://facebook.com/bikesolution",
      className:"hover:bg-blue-600 hover:border-blue-600",
    },
    {
      icon: <FaXTwitter />, // Twitter Blue
      url: "https://twitter.com/bikesolution",
      className:"hover:bg-black hover:border-black",

    },
    {
      icon: <FiInstagram />, // Instagram Pink
      url: "https://instagram.com/bikesolution",
      className:"hover:bg-pink-500 hover:border-pink-500",

    },
    {
      icon: <FiLinkedin />, // LinkedIn Blue
      url: "https://linkedin.com/company/bikesolution",
      className:"hover:bg-[#0077B5] hover:border-[#0077B5]",

    },
    {
      icon: <FiYoutube />, // YouTube Red
      url: "https://youtube.com/bikesolution",
      className:"hover:bg-red-600 hover:border-red-600",

    },
  ];

  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="w-[95%] mx-auto md:flex justify-between">
        <div className="w-full lg:w-2/5 mb-6 lg:mb-0">
          <div className="flex flex-col items-center md:items-start">
            <div>
              <Link className="flex items-baseline text-purple-500" to="/">
                        <RiMotorbikeLine className="text-5xl -rotate-[25deg]"/>
                        <span className=" text-2xl font-medium">Bike Solution</span>
                      </Link>
            </div>
            <p className="text-center md:text-left mt-2">
              <strong>Bike Solution Ltd.</strong>
              <br />
              Your ultimate destination for high-performance <br /> bikes and accessories.
            </p>
          </div>
          <div className="flex gap-3 text-lg justify-center md:justify-start mt-3">
            {socialLinks.map((link,i) => (
              <Link key={i} className={`border border-black p-[6px] rounded-full hover:rotate-[360deg] transition-all duration-300 hover:text-white ${link.className}`} to={link.url} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </Link>
            ))}
          </div>

        </div>

        <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {footerLinks.map((section,i) => (
            <nav key={i}>
              <h6 className="footer-title">{section.title}</h6>
              <div className="flex flex-col">
                {section.links.map((link,i) => (
                  <div key={i}>
                    <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="link link-hover">
                    {link}
                  </Link>
                  </div>
                ))}
              </div>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
