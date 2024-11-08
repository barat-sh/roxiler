import React from "react";

// eslint-disable-next-line react/display-name
const MonthDropdown = React.memo(({ currentMonth, handleSetMonth }) => {
    const months = {
        1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June",
        7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December"
    };

    console.log(months[currentMonth]);

    return (
        <div className="">
            <select
                id="monthDropdown"
                value={currentMonth}
                onChange={handleSetMonth}
                className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {Object.keys(months).map(entry => (
                    <option key={entry} value={entry}>{months[entry]}</option>
                ))}
            </select>
        </div>
    );
});

export default MonthDropdown;