import { FC, ReactNode, useEffect, useRef, useState } from "react";

export interface DropdownItem {
  label: string;
  action: () => void;
}

export interface DropdownProps {
  items: DropdownItem[];
  dropdownClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
  trigger: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ items, dropdownClassName, itemClassName, triggerClassName, trigger }) => {
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

  const handleClickActionBtn = (action: () => void) => {
    action?.();
    setIsOpen(false); // 액션 버튼 클릭 시 드롭다운 닫기
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={toggleDropdown} className={`flex items-center justify-center ${triggerClassName}`}>
        {trigger}
      </button>
      {isOpen && (
        <ul
          className={`absolute right-0 z-10 mt-2 rounded-md border border-solid border-primary-gray-300 bg-white shadow-lg ${dropdownClassName}`}
        >
          {items.map((item, index) => (
            <li key={index} className={`p-2 ${itemClassName}`}>
              <button
                onClick={() => handleClickActionBtn(item.action)}
                className="md-medium w-full rounded-md px-4 py-2 text-center text-gray-600 hover:bg-primary-green-100 hover:text-primary-black-100 hover:shadow-inner focus:outline-none md:text-2lg-medium xl:text-2lg-medium"
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
