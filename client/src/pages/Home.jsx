import { useState } from "react";
import axios from "axios";

const Home = () => {
    const [auditResult, setAuditResult] = useState(null);
    const [formData, setFormData] = useState({
        toolName: "",
        plan: "",
        monthlySpend: "",
        seats: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                !formData.toolName ||
                !formData.plan ||
                !formData.monthlySpend ||
                !formData.seats
            ) {
                alert("Please fill all fields");
                return;
            }
            const response = await axios.post("http://localhost:5000/api/audit",

                {
                    tools: [formData]
                }
            );
            setAuditResult(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting form:", error);
        };
    };
    return (
        <div className="border-2 min-h-screen bg-gray-100 flex justify-center items-start p-10">
            <h1 className="text-3xl font-bold mb-6">AI Spend Audit</h1>
            {auditResult && (
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-8">
                    <h2>Audit Result</h2>
                    <p>
                        Monthly Savings: ${auditResult.totalMonthlySavings}
                    </p>
                    <p>
                        Yearly Savings: ${auditResult.totalYearlySavings}
                    </p>
                    {auditResult.recommendations.map((item, index) => (
                        <div key={index} className="border rounded-xl p-4 mt-4">
                            <p>{item.tool}</p>
                            <p>{item.currentPlan}</p>
                            <p>{item.recommendedPlan}</p>
                            <p>{item.monthlySavings}</p>
                            <p>{item.yearlySavings}</p>
                            <p>{item.reason}</p>
                        </div>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="toolName"
                    placeholder="Tool Name"
                    value={formData.toolName}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-black rounded-xl"
                />

                <input
                    type="text"
                    name="plan"
                    placeholder="Plan"
                    value={formData.plan}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-black rounded-xl"
                />
                <input
                    type="text"
                    name="monthlySpend"
                    placeholder="Monthly Spend"
                    value={formData.monthlySpend}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-black rounded-xl"
                />
                <input
                    type="text"
                    name="seats"
                    placeholder="Seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-black rounded-xl"
                />

                <button type="submit" className="bg-black text-white py-3 rounded-xl mt-4 hover:opacity-90 transition">
                    Run Audit
                </button>
            </form>
        </div>
    );
};
export default Home;