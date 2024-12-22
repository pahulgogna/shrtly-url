import { Dot } from "lucide-react";
import { GitHub, LinkedIn } from "./basics/Icons";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t text-black py-4">
      <div className="container mx-auto px-5 flex items-center justify-between">
        <div className="flex">
            <h1 className="text-lg font-bold flex justify-end flex-col">Shrtly</h1>
            <div className="flex flex-col justify-end m-0 gap-0 p-0">
                    <Dot strokeWidth={"4px"} size={"20px"} className=" justify-start flex w-4 h-5 p-0 m-0"/>
                    </div>
            <div className="flex justify-end flex-col pb-1 pl-1">
                <div className="text-xs ">
                    by pahulgogna
                </div>
            </div>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/pahulgogna"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-700"
          >
            <GitHub/>
          </a>
          <a
            href="https://linkedin.com/in/pahul-gogna-2a5a3928a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <LinkedIn/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;