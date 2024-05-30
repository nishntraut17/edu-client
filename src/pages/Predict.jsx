import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Predict = () => {
    const [formData, setFormData] = useState({
        marks: 0,
        gender: '',
        category: '',
        branch: '',
        home_university: '',
    });
    const [responseData, setResponseData] = useState(null);

    const downloadPDF = () => {
        const input = document.getElementById('pdf-content');

        if (!input) {
            console.error("PDF content not found");
            return;
        }

        html2canvas(input)
            .then((canvas) => {
                // Change the dimensions here (150mm width, 210mm height)
                const pdf = new jsPDF('p', 'mm', [150, 210]);
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 150, 210);
                pdf.save('prediction.pdf');
            })
            .catch((error) => {
                console.error("Error generating PDF:", error);
            });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            console.log(formData);
            const response = await axios.post(`http://127.0.0.1:8000/api/predict/`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setResponseData(response.data);
            toast.success("Application Sent Successfully, Your Request Will be processed By Admin");
        } catch (error) {
            toast.error("Unable to send application");
            console.error('Error:', error);
        }
    };

    return (
        <div className="px-16 py-8">
            {!responseData && (
                <div className='flex flex-row gap-8'>
                    <div className='w-1/2'>
                        <img src='predict.jpg' alt='predict' className='w-full h-full' />
                    </div>
                    <div className='w-1/2'>
                        <h2 className="text-2xl font-bold my-8">Enter your data:</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 font-semibold text-gray-700 flex flex-col gap-6">
                            <div>
                                <label className="block mb-1">MHTCET Percentile Score:</label>
                                <input
                                    type="number"
                                    name="marks"
                                    value={formData.marks}
                                    onChange={handleChange}
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter between 0 to 100"
                                />
                            </div>

                            <div className='flex flex-row gap-4'>
                                <label className="block mb-1">Gender:</label>
                                <div className="flex">
                                    <input type="radio" id="male" name="gender" value="General" checked={formData.gender === "General"} onChange={handleChange} className="mr-2" />
                                    <label htmlFor="male" className="mr-4">Male</label>
                                    <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="mr-2" />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <label className="block mb-1">Caste:</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Select caste</option>
                                    <option value="OPEN">Open</option>
                                    <option value="OBC">OBC</option>
                                    <option value="ST">ST</option>
                                    <option value="SC">SC</option>
                                </select>
                            </div>
                            <div className='flex flex-row gap-4'>
                                <label className="block mb-1">Branch:</label>
                                <select name="branch" value={formData.branch} onChange={handleChange} className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Select branch</option>
                                    <option value="Computer">Computer</option>
                                    <option value="ENTC">Electronics and Telecommunication</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="Mechanical">Mechanical</option>
                                </select>
                            </div>

                            <div className='flex flex-row gap-4'>
                                <label className="block mb-1">Home University:</label>
                                <select
                                    name="home_university"
                                    value={formData.home_university}
                                    onChange={handleChange}
                                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select home university</option>
                                    <option value="RTMNU">Rashtrasant Tukadoji Maharaj Nagpur University</option>
                                    <option value="MU">Mumbai University</option>
                                    <option value="SPPU">Savitribai Phule Pune University</option>
                                </select>
                            </div>

                            <button type="submit" className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {responseData && (
                <div>
                    <div id="pdf-content" className="bg-white shadow-md rounded px-8 py-6 mt-20">
                        <h2 className="text-3xl font-bold mb-4 ">Result</h2>
                        <p>Precentile Score: {responseData.marks}</p>
                        <h3>Cutoff of colleges:</h3>
                        <table className="table-auto border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">College</th>
                                    <th className="border px-4 py-2">Cutoff</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(responseData.predictions).map(([college, prediction]) => (
                                    <tr key={college}>
                                        <td className="border px-4 py-2">{college}</td>
                                        <td className="border px-4 py-2">{prediction}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>Colleges you can get:</h3>
                        <table className="table-auto border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Colleges</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responseData.eligible_colleges.map(college => (
                                    <tr key={college}>
                                        <td className="border px-4 py-2">{college}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={downloadPDF} className="block w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-white font-semibold mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Download PDF</button>
                </div>
            )}
        </div>
    );
};

export default Predict;
