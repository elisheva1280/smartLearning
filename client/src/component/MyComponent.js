import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/your-endpoint'); // שנה את ה-URL לכתובת ה-API שלך
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data.map(item => (
                <div key={item._id}>{item.name}</div> // שנה את השדות בהתאם למבנה הנתונים שלך
            ))}
        </div>
    );
};

export default MyComponent;
