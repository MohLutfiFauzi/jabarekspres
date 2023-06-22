"use client"
import React, { useEffect, useState } from 'react';

const DateNow = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dayOfWeek = days[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Konversi ke format 12 jam
    hours %= 12;
    hours = hours || 12;

    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} - ${hours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    return (
        <p className='text-gray-500'>{formattedDate}</p>
    )
}

export default DateNow