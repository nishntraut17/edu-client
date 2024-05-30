import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Add = () => {
    const [formData, setFormData] = useState({
        Branch: "",
        Gender: "",
        Category: '',
        University: "",
        University_Type: "",
        College: "",
        Year: 0,
        Cutoff: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/save-data/`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success("Application Sent Successfully, Your Request Will be processed By Admin");
        } catch (error) {
            toast.error("Unable to send application");
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-row gap-8 px-16 py-8 font-bold text-gray-600">
            <div className='w-1/2'>
                <img src='/predict.jpg' alt='predict' className='w-full h-full' />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-4 w-1/2">
                <input type="text" name="College" value={formData.College} onChange={handleChange} placeholder="College Name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />

                <div className='flex flex-row gap-4'>
                    <label className="block mb-1">Year:</label>
                    <div className="flex">
                        <input type="radio" id="2021" name="Year" value="2021" checked={formData.Year === "2021"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="2021" className="mr-4">2021</label>
                        <input type="radio" id="2022" name="Year" value="2022" checked={formData.Year === "2022"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="2022" className="mr-4">2022</label>
                        <input type="radio" id="2023" name="Year" value="2023" checked={formData.Year === "2023"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="2023" className="mr-4">2023</label>
                    </div>
                </div>

                <input type="number" name="Cutoff" value={formData.Cutoff} onChange={handleChange} placeholder="Cutoff (Enter between 0 to 100)" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />

                <div className='flex flex-row gap-4'>
                    <label className="block mb-1">Branch:</label>
                    <select name="Branch" value={formData.Branch} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select branch</option>
                        <option value="Computer">Computer</option>
                        <option value="ENTC">Electronics and Telecommunication</option>
                        <option value="IT">Information Technology</option>
                        <option value="Mechanical">Mechanical</option>
                    </select>
                </div>
                <div className='flex flex-row gap-4'>
                    <label className="block mb-1">Gender:</label>
                    <div className="flex">
                        <input type="radio" id="male" name="Gender" value="General" checked={formData.Gender === "General"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="male" className="mr-4">Male</label>
                        <input type="radio" id="female" name="Gender" value="Female" checked={formData.Gender === "Female"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="female">Female</label>
                    </div>
                </div>
                <div className='flex flex-row gap-4'>
                    <label className="block mb-1">Caste:</label>
                    <select name="Category" value={formData.Category} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select caste</option>
                        <option value="OPEN">Open</option>
                        <option value="OBC">OBC</option>
                        <option value="ST">ST</option>
                        <option value="SC">SC</option>
                    </select>
                </div>
                <div className='flex flex-row gap-4'>
                    <label className="block mb-1">University:</label>
                    <select
                        name="University"
                        value={formData.University}
                        onChange={handleChange}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select university</option>
                        <option value="RTMNU">Rashtrasant Tukadoji Maharaj Nagpur University</option>
                        <option value="MU">Mumbai University</option>
                        <option value="SPPU">Savitribai Phule Pune University</option>
                    </select>
                </div>

                <div className='flex flex-row gap-4'>
                    <label className="block mb-1">University Type:</label>
                    <div className="flex">
                        <input type="radio" id="Home" name="University_Type" value="Home" checked={formData.University_Type === "Home"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="Home" className="mr-4">Home</label>
                        <input type="radio" id="Other" name="University_Type" value="Other" checked={formData.University_Type === "Other"} onChange={handleChange} className="mr-2" />
                        <label htmlFor="Other" className="mr-4">Other</label>
                    </div>
                </div>

                <button type="submit" className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
            </form>
        </div>
    )
}

export default Add;
