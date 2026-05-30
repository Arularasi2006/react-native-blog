import React, { useEffect, useState} from "react";

function UpdatePage() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h1>Welcome to the React Timezone</h1>
            <p>current Time: {currentTime}</p>
        </div>
    );
}export default UpdatePage;