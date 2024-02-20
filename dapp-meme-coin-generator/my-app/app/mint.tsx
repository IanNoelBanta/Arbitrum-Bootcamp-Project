import { useEffect, useState } from "react";

function StartMinting() {
    const [value, setValue] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        // Check if the input value is a valid number
        if (!isNaN(Number(inputValue))) {
            setValue(Number(inputValue));
        } else {
            // If the input is not a valid number, set the value to an empty string
            setValue(0);
        }
    };

    return (
        <input
            type="text"
            className="border rounded-md p-2"
            value={value}
            onChange={(e) => Number(e.target.value)}
            placeholder="Enter a number"
        />
    );
}

export default StartMinting;
