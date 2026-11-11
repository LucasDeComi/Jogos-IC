import { Children, Fragment, isValidElement, useEffect, useId, useRef, useState } from "react";
import Label from "./Label";
import Icon from "./Icon";
import arrowIcon from "../../assets/icons/arrow.svg";

function getOptions(children) {
    return Children.toArray(children).flatMap((child) => {
        if (!isValidElement(child)) return [];
        if (child.type === Fragment) return getOptions(child.props.children);

        const label = child.props.children;
        const optionValue = child.props.value ?? getText(label);
        return [{
            value: String(optionValue),
            label,
            text: getText(label),
            disabled: child.props.disabled ?? false,
        }];
    });
}

function getText(node) {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(getText).join("");
    if (isValidElement(node)) return getText(node.props.children);
    return "";
}

function getNextEnabledIndex(options, start, direction) {
    if (options.length === 0) return -1;

    for (let offset = 0; offset < options.length; offset += 1) {
        const index = ((start + offset * direction) % options.length + options.length) % options.length;
        if (!options[index].disabled) return index;
    }
    return -1;
}

export default function Select({
    children,
    className = "",
    containerClassName = "",
    fieldClassName = "",
    labelClassName = "",
    label = null,
    value = "",
    onChange = () => {},
    disabled = false,
    compact = false,
    required = false,
    icon = null,
    iconColor = "var(--link)",
    id,
    name,
    form,
    ...selectProps
}) {
    const generatedId = useId();
    const triggerId = id ?? `select-${generatedId}`;
    const listboxId = `${triggerId}-listbox`;
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const typeaheadRef = useRef("");
    const typeaheadTimeoutRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const options = getOptions(children);
    const selectedIndex = options.findIndex((option) => option.value === String(value));
    const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex);
    const selectedOption = options[selectedIndex];

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (!rootRef.current?.contains(event.target)) setIsOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
    }, []);

    useEffect(() => () => clearTimeout(typeaheadTimeoutRef.current), []);

    const openMenu = (index = selectedIndex, direction = 1) => {
        setHighlightedIndex(getNextEnabledIndex(options, index < 0 ? 0 : index, direction));
        setIsOpen(true);
    };

    const chooseOption = (option) => {
        if (option.disabled) return;
        onChange({
            target: { value: option.value },
            currentTarget: { value: option.value },
        });
        setIsOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            if (!isOpen) {
                const start = selectedIndex >= 0
                    ? selectedIndex + direction
                    : direction > 0 ? 0 : options.length - 1;
                openMenu(start, direction);
                return;
            }

            const start = highlightedIndex + direction;
            const nextIndex = getNextEnabledIndex(options, start, direction);
            setHighlightedIndex(nextIndex);
            return;
        }

        if (event.key === "Home" || event.key === "End") {
            if (!isOpen) return;
            event.preventDefault();
            const start = event.key === "Home" ? 0 : options.length - 1;
            const direction = event.key === "Home" ? 1 : -1;
            setHighlightedIndex(getNextEnabledIndex(options, start, direction));
            return;
        }

        if (event.key === "Escape" && isOpen) {
            event.preventDefault();
            setIsOpen(false);
            return;
        }

        if (event.key === "Tab") {
            setIsOpen(false);
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            if (!isOpen) return;
            event.preventDefault();
            if (options[highlightedIndex]) chooseOption(options[highlightedIndex]);
            return;
        }

        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            typeaheadRef.current += event.key.toLocaleLowerCase();
            clearTimeout(typeaheadTimeoutRef.current);
            typeaheadTimeoutRef.current = setTimeout(() => {
                typeaheadRef.current = "";
            }, 500);

            const start = isOpen ? highlightedIndex + 1 : 0;
            const orderedOptions = [
                ...options.slice(start),
                ...options.slice(0, start),
            ];
            const match = orderedOptions.findIndex(
                (option) =>
                    !option.disabled &&
                    option.text.toLocaleLowerCase().startsWith(typeaheadRef.current),
            );
            if (match >= 0) {
                const index = (start + match) % options.length;
                setHighlightedIndex(index);
                if (!isOpen) openMenu(index);
            }
        }
    };

    return (
        <div ref={rootRef} className={`relative flex flex-col gap-1 ${containerClassName}`}>
            {label && (
                <Label id={`${triggerId}-label`} htmlFor={triggerId} className={labelClassName}>
                    {label}
                </Label>
            )}
            <div className={`flex items-center rounded-lg border border-(--border) bg-(--input) ${icon ? "px-3" : ""} ${fieldClassName}`}>
                {icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                        <Icon src={icon} size="100%" color={iconColor} />
                    </span>
                )}
                <button
                    ref={triggerRef}
                    id={triggerId}
                    type="button"
                    role="combobox"
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-autocomplete="none"
                    aria-controls={listboxId}
                    aria-required={required || undefined}
                    aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined}
                    onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
                    onKeyDown={handleKeyDown}
                    {...selectProps}
                    className={`${className} ${compact
                        ? `py-1.5 ${icon ? "pl-2 pr-3" : "px-3"} rounded-lg text-[13px]`
                        : `${icon ? "py-3 pl-2 pr-3" : "p-3"} rounded-lg text-sm`
                    } flex min-w-0 flex-1 items-center justify-between gap-2 border-0 bg-transparent text-left text-(--text) outline-0 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                    <span className="min-w-0 flex-1 truncate text-inherit">
                        {selectedOption?.label ?? ""}
                    </span>
                    <Icon
                        src={arrowIcon}
                        size={8}
                        color="var(--secondary)"
                        className={`shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>
            </div>
            {isOpen && (
                <div
                    id={listboxId}
                    role="listbox"
                    aria-labelledby={label ? `${triggerId}-label` : triggerId}
                    className="absolute left-0 top-full z-50 mt-1 max-h-60 min-w-full w-max max-w-[min(20rem,calc(100vw-2rem))] overflow-auto rounded-xl border border-(--border) bg-(--panel) p-1 shadow-xl"
                >
                    {options.map((option, index) => (
                        <div
                            key={`${option.value}-${index}`}
                            id={`${listboxId}-option-${index}`}
                            role="option"
                            aria-selected={index === selectedIndex}
                            aria-disabled={option.disabled || undefined}
                            onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                            onClick={() => chooseOption(option)}
                            className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${
                                index === highlightedIndex
                                    ? "bg-(--transparent) text-(--text)"
                                    : "text-(--text) hover:bg-(--background)"
                            } ${option.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
            <select
                name={name}
                form={form}
                value={value}
                required={required}
                disabled={disabled}
                tabIndex={-1}
                aria-hidden="true"
                onChange={() => {}}
                onInvalid={(event) => {
                    event.preventDefault();
                    openMenu();
                    triggerRef.current?.focus();
                }}
                className="pointer-events-none absolute h-px w-px opacity-0"
            >
                {children}
            </select>
        </div>
    );
}
