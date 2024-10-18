import React, { useState, useEffect } from 'react';
import { createRule, combineRules, evaluateRule } from './utils/ruleEngine';
import { Node, UserData } from './types/ruleEngine';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

function App() {
  const [rules, setRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState('');
  const [userData, setUserData] = useState<UserData>({
    age: 0,
    department: '',
    salary: 0,
    experience: 0,
  });
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/rules');
      const data = await response.json();
      setRules(data.map((rule: any) => rule.ruleString));
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  const handleAddRule = async () => {
    if (newRule) {
      try {
        const response = await fetch('http://localhost:3001/api/rules', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ruleString: newRule }),
        });
        if (response.ok) {
          setRules([...rules, newRule]);
          setNewRule('');
        }
      } catch (error) {
        console.error('Error adding rule:', error);
      }
    }
  };

  const handleEvaluate = () => {
    if (rules.length === 0) {
      alert('Please add at least one rule');
      return;
    }
    const combinedRule = combineRules(rules);
    const evaluationResult = evaluateRule(combinedRule, userData);
    setResult(evaluationResult);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Rule Engine</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add Rule</h2>
          <div className="flex">
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              className="flex-grow border rounded-l px-3 py-2"
              placeholder="Enter rule (e.g., age > 30 AND department = 'Sales')"
            />
            <button
              onClick={handleAddRule}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            >
              Add Rule
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Rules</h2>
          <ul className="list-disc pl-5">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">User Data</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700">{key}</label>
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
                  className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleEvaluate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Evaluate Rules
        </button>

        {result !== null && (
          <div className={`mt-4 p-4 rounded ${result ? 'bg-green-100' : 'bg-red-100'}`}>
            {result ? (
              <div className="flex items-center">
                <CheckCircle2 className="text-green-500 mr-2" />
                <span>User is eligible based on the rules.</span>
              </div>
            ) : (
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-2" />
                <span>User is not eligible based on the rules.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;