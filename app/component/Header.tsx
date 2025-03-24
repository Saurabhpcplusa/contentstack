"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

const Header: React.FC = () => {
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { name: "City", href: "/city" },
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="flex items-center justify-between bg-blue-500 p-4">
      {/* Left side: Title */}
      <div className="text-white text-xl font-bold">Content Stack</div>
      
      {/* Right side: Navigation Links */}
      <nav className="flex space-x-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-bold underline text-white"
                : "text-white hover:underline"
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
