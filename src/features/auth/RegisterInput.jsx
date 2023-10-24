
export default function RegisterInput({ type = 'text', placeholder, value, onChange, name, hasError }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`block w-72 border rounded-md outline-none px-4 py-3 text-sm focus:ring 
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
