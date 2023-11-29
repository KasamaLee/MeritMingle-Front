
export default function LoginInput({ type = 'text', placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className="bg-white appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:ring-0 focus:border-orange-400"
            value={value}
            onChange={onChange}
        />
    )
}
