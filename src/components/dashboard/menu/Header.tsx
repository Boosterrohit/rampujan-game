
import { Mail, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback} from "../../ui/avatar";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const { user} = useAuth();
  return (
    <div className="bg-[#242834] px-4 py-3 shadow flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden bg-gray-600 p-2 rounded-md transition-colors checeing"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        <div className="flex items-center gap-4">
           <Link to="/" className="border border-white p-1 rounded-md hover:bg-slate-300 hover:text-black">
           Go Back
          </Link>
        <div className="flex flex-col">
         
          <span className="font-bold text-sx sm:text-2xl text-white">RowGaming</span>
          <span className="text-gray-300 text-xs hidden sm:block">
            Manage your casino operations
          </span>
        </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative cursor-pointer hover:bg-gray-500  rounded-md p-2">
          <Mail className="w-5 h-5 text-white" />
          <div className="h-3 w-3 bg-red-600 rounded-full absolute top-1 border-white border-2 right-1"></div>
        </div>
        <div className="h-10 bg-gray-600 w-0.5 mx-2 "></div>
        <Avatar className="">
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className="uppercase">{user?.username?.substring(0,2)}</AvatarFallback>
        </Avatar>
        <div className="flex-col hidden md:flex">
          <span className="text-sm text-white">{user?.username}</span>
          <span className="text-xs text-gray-300">{user?.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
