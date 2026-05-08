import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SharedAudit = () => {
  const { shareId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/audit/${shareId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [shareId]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Shared Audit Report</h1>
      <div className="bg-white rounded-2xl border border-[#E8E6DF] p-8 w-full max-w-md">
        <p>Monthly Savings: ${data.totalMonthlySavings}</p>
        <p>Yearly Savings: ${data.totalYearlySavings}</p>
        {data.recommendations.map((item, i) => (
          <div key={i} className="border rounded-xl p-4 mt-3">
            <p className="font-semibold">{item.tool}</p>
            <p className="text-sm text-[#666]">{item.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedAudit;