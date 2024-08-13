import React, {
  forwardRef,
  type ReactNode,
  type MouseEventHandler,
  type ComponentPropsWithoutRef,
} from "react";

export type InputType = {
  id: string;
  label: string;
  elementType: "input" | "select" | "textarea" | "search";
  children?: ReactNode;
  onSelect?: (value: string) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & ComponentPropsWithoutRef<"input" | "select" | "textarea" | "button">;

const Input = forwardRef<
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLButtonElement,
  InputType
>(function Input(
  {
    id,
    elementType,
    label,
    className,
    onClick,
    children,
    onSelect,
    ...otherProps
  },
  ref
) {
  const asteriskIndex = label.indexOf("*");
  const hasAsterisk = asteriskIndex !== -1;

  const labelElement = (
    <label
      className="block text-[0.95rem] text-[#fff] font-sans mb-2 mt-1"
      htmlFor={id}
    >
      {hasAsterisk ? (
        <>
          {label.slice(0, asteriskIndex)}
          <span style={{ color: "red" }}>*</span>
          {label.slice(asteriskIndex + 1)}
        </>
      ) : (
        label
      )}
    </label>
  );

  if (elementType === "input" || elementType === "search") {
    return (
      <div className="w-full relative">
        {labelElement}
        <input
          id={id}
          name={id}
          ref={ref as React.Ref<HTMLInputElement>}
          {...(otherProps as ComponentPropsWithoutRef<"input">)}
          className={`w-full px-3 py-2 font-sans border-[1px] border-[#28353A] rounded-md bg-[#0E1526] focus:bg-[#0E1526] cursor-pointer focus:outline-none text-[#fff] focus:border-[#ffffff60] ${className}`}
        />
        {elementType.includes("search") && (
          <button
            className={`absolute ${
              label ? "top-[56%]" : "top-[25%]"
            } right-[15px] cursor-pointer bg-[transparent]`}
            onClick={onClick}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                stroke="#BEBEBE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.583 17.5a7.917 7.917 0 100-15.834 7.917 7.917 0 000 15.834zM18.333 18.333l-1.666-1.666"
              ></path>
            </svg>
          </button>
        )}
      </div>
    );
  }

  if (elementType === "select") {
    return (
      <div className="w-full">
        {labelElement}
        <div className="relative">
          <select
            id={id}
            name={id}
            ref={ref as React.Ref<HTMLSelectElement>}
            onChange={(e) => onSelect?.(e.target.value)}
            className={`text-[#BEBEBE] w-full px-3 py-2 font-sans border-[1px] border-[#28353A] rounded-md bg-[#0E1526] focus:bg-[#0E1526] focus:outline-none focus:border-[#ffffff60] appearance-none ${className}`}
            {...(otherProps as ComponentPropsWithoutRef<"select">)}
          >
            {otherProps?.placeholder && (
              <option value="" disabled selected>
                {otherProps.placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                stroke="#BEBEBE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.5 18.333h5c4.166 0 5.833-1.666 5.833-5.833v-5c0-4.167-1.666-5.833-5.833-5.833h-5c-4.167 0-5.833 1.666-5.833 5.833v5c0 4.167 1.666 5.833 5.833 5.833z"
              />
              <path
                stroke="#BEBEBE"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M7.058 8.867L10 11.8l2.941-2.933"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (elementType === "textarea") {
    return (
      <div className="w-full relative">
        {labelElement}
        <textarea
          id={id}
          name={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`w-full px-3 py-2 font-sans border-[1px] border-[#28353A] rounded-md bg-[#0E1526] focus:outline-none text-[#fff] focus:border-[#ffffff60] ${className}`}
          {...(otherProps as ComponentPropsWithoutRef<"textarea">)}
        />
      </div>
    );
  }
});

export default Input;
