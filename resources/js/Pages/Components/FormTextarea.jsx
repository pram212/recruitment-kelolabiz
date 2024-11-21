export default function ({
    label,
    name,
    value,
    onChange,
    error = "",
    required = false,
}) {
    return (
        <label className="form-control w-full max-w-full">
            <div className="label">
                <span className="label-text capitalize">{label}</span>
                <span className="label-text-alt text-red-500 font-extrabold">
                    {required && <>*</>}
                </span>
            </div>
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="textarea textarea-bordered w-full"
            ></textarea>
            <div className="label">
                {/* Error Message */}
                {error && (
                    <p className="label-text-alt text-red-500">{error}</p>
                )}
            </div>
        </label>
    );
}
