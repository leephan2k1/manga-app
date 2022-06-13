import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import Select, { components, GroupBase, OptionProps } from 'react-select';
import usePushQuery from '~/hooks/usePushQuery';
import { SelectType } from '~/types';

type SelectValues = SelectType | SelectType[];

interface FilterItemProps {
    title: string;
    instanceId: string;
    options: Array<SelectType>;
    defaultValue?: Array<SelectType>;
    placeholder?: string;
    isMulti?: boolean;
}

export default function FilterItem({
    title,
    defaultValue,
    placeholder,
    options,
    isMulti,
    instanceId,
}: FilterItemProps) {
    const router = useRouter();
    const [query] = usePushQuery();
    const [queryValue, setQueryValue] = useState<Array<SelectType>>([]);

    useEffect(() => {
        setQueryValue([]);

        for (const key in router.query) {
            if (key === instanceId) {
                const values = String(router.query[key]).split(',');
                values.forEach((value) => {
                    const existQuery = options.find(
                        (option) => option.value === value,
                    )?.label;

                    if (existQuery) {
                        setQueryValue((prevState) => [
                            ...prevState,
                            {
                                value,
                                label: String(existQuery),
                            },
                        ]);
                    }
                });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    const handleChange = (selectValue: SelectValues) => {
        if (!Array.isArray(selectValue)) {
            query.push(instanceId, selectValue.value.trim(), true);
        } else {
            query.push(
                instanceId,
                [...selectValue.map((value) => value.value.trim())].join(`,`),
                true,
            );
        }
    };

    return (
        <div
            key={queryValue.length}
            className="flex h-full w-full flex-col items-center justify-center "
        >
            <h2 className="my-2 font-secondary text-white lg:text-3xl">
                {title}
            </h2>
            <Select
                defaultValue={queryValue.length ? queryValue : defaultValue}
                isMulti={isMulti}
                placeholder={placeholder}
                isClearable={isMulti}
                options={options}
                classNamePrefix="select"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                onChange={handleChange}
                instanceId={instanceId}
                hideSelectedOptions={false}
                components={{ MultiValue, Option }}
                noOptionsMessage={() => 'Không tồn tại'}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: '#f43f5e',
                        primary25: '#3f3f3f',
                        primary75: '#f87171',
                        primary50: '#fca5a5',
                        primary20: '#fecaca',
                    },
                })}
                styles={{
                    container: (styles) => ({
                        ...styles,
                        width: '100%',
                    }),
                    option: (provided, state) => {
                        return {
                            ...provided,
                            color: state.isSelected ? '#f43f5e' : '#fff',
                        };
                    },
                    control: (provided) => {
                        return {
                            ...provided,
                            backgroundColor: '#1a1a1a',
                            width: '100%',
                            minWidth: '100%',
                            color: '#fff',
                        };
                    },
                    input: (provided) => {
                        return {
                            ...provided,
                            color: '#fff',
                            padding: '4px',
                        };
                    },
                    multiValueLabel: (provided) => {
                        return {
                            ...provided,
                            color: '#fff',
                        };
                    },
                    singleValue: (provided) => {
                        return {
                            ...provided,
                            color: '#fff',
                        };
                    },
                    multiValue: (provided) => {
                        return {
                            ...provided,
                            backgroundColor: '#262626',
                            maxWidth: '70%',
                        };
                    },
                    menu: (provided) => {
                        return {
                            ...provided,
                            backgroundColor: '#1a1a1a',
                        };
                    },
                    menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                    }),
                }}
            />
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MoreSelectedBadge = ({ items }) => {
    const title = items.join(', ');
    const length = items.length;
    const label = `+${length}`;

    return (
        <p
            title={title}
            className="rounded-sm bg-highlight p-1 text-sm text-white"
        >
            {label}
        </p>
    );
};

const Option: React.ComponentType<
    OptionProps<unknown, boolean, GroupBase<unknown>>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = ({ innerRef, getValue, children, innerProps, ...props }) => {
    const { className, ...divProps } = innerProps;

    return (
        <div
            ref={innerRef}
            className={classNames(
                'relative cursor-pointer px-3 py-2 text-white transition duration-300',
                props.isFocused && 'bg-white/20 text-white',
                className,
            )}
            {...divProps}
        >
            {children}

            {props.isSelected && (
                <AiFillCheckCircle className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-primary text-white" />
            )}
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MultiValue = ({ index, getValue, ...props }) => {
    const maxToShow = 1;
    const overflow = getValue()
        .slice(maxToShow)
        .map((x: any) => x.label);

    return index < maxToShow ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <components.MultiValue {...props} />
    ) : index === maxToShow ? (
        <MoreSelectedBadge items={overflow} />
    ) : null;
};
