import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      {/* Logo Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="ScholarStream Logo"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Logo Text */}
      <span className="text-2xl font-bold tracking-tight transition-all duration-300">
        <span className="text-neutral group-hover:text-primary">Scholar</span>
        <span className="text-primary group-hover:text-secondary">Stream</span>
      </span>
    </Link>
  );
};

export default Logo;
