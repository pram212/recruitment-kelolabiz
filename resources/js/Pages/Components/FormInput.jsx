export default function ({
    label,
    name,
    type = "text",
    value,
    onChange,
    error = "",
    required = false,
    placeholder = "",
    accept = "",
}) {
    return (
        <label className="form-control w-full max-w-full">
            <div className="label">
                <span className="label-text capitalize">{label}</span>
                <span className="label-text-alt text-red-500 font-extrabold">
                    {required && <>*</>}
                </span>
            </div>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="input input-bordered input-sm w-full"
                accept={accept}
            />
            <div className="label">
                {/* Error Message */}
                {error && (
                    <p className="label-text-alt text-red-500">{error}</p>
                )}
            </div>
        </label>
    );
}
