import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface DropdownProps {
  items: { label: string; action: () => void }[];
  dropdownClassName?: string;
  itemClassName?: string;
  trigger: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ items, dropdownClassName, itemClassName, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={toggleDropdown} className="flex items-center justify-center">
        {trigger}
      </button>
      {isOpen && (
        <ul
          className={`absolute right-0 z-10 mt-2 rounded border border-gray-300 bg-white shadow-lg ${dropdownClassName}`}
        >
          {items.map((item, index) => (
            <li key={index} className={`p-[8px] ${itemClassName}`}>
              <button
                onClick={item.action}
                className="md-medium w-full rounded px-4 py-2 text-left text-center text-gray-600 hover:bg-primary-green-100 hover:text-primary-black-100 focus:outline-none md:text-2lg-medium xl:text-2lg-medium"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
