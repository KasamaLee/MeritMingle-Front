
export default function RegisterInput({ type = 'text', placeholder, value, onChange, name, hasError }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`bg-white appearance-none border-2 border-gray-200 w-full rounded-md py-2 px-4 text-gray-700 leading-tight focus:ring-0 focus:border-orange-400 
            ${hasError
                    ? 'border-red-500 focus:ring-red-300'
                    : ' focus:ring-blue-300 focus:border-blue-500 border-gray-300'
                }
            `}
            name={name}
            value={value}
            onChange={onChange}
        />
    )
}
