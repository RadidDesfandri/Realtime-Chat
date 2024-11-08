"use client";

import ReactSelect from "react-select";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  disabled?: boolean;
  value?: Option |  Option[];
  label: string;
  onChange: (value: Option | Option[]) => void;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  disabled,
  value,
  label,
  onChange,
  options,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={(selectedOption) => onChange(selectedOption as Option |Option[])}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm ",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
