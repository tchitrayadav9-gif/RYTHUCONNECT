import React, { useState } from 'react';
import api from '../services/api';
import {
  GraduationCap,
  Database,
  Terminal,
  FileCode,
  ShieldCheck,
  FileDown,
  Layers,
  Sparkles,
  Play,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

const AcademicShowcasePage = () => {
  const [activeTab, setActiveTab] = useState('module2');
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const modules = [
    { id: 'module1', name: 'Module 1: Node.js & Express Fundamentals', topic: 'HTTP Server, Modular Routing & Error Handling' },
    { id: 'module2', name: 'Module 2: SQLite & Relational Operations', topic: 'DDL Constraints, Parameterized Queries & Relational JOINs' },
    { id: 'module3', name: 'Module 3: RESTful APIs & Validation', topic: 'CRUD, Parameterized Routes & JSON Standard Envelopes' },
    { id: 'module4', name: 'Module 4: Authentication & User Accounts', topic: 'bcrypt Password Hashing & JWT Generation' },
    { id: 'module5', name: 'Module 5: Middleware & Role Authorization', topic: 'Custom Middleware Chains & 5-Role RBAC' },
    { id: 'module6', name: 'Module 6: File Handling & Async Operations', topic: 'Node.js fs, fs.promises, async/await & Buffer Management' },
    { id: 'module7', name: 'Module 7: Streams & Data Processing', topic: 'Readable, Transform, Writable Streams & Stream Piping' },
    { id: 'module8', name: 'Module 8: MongoDB & Mongoose Integration', topic: '13 Collections, Schemas, Validation & Atlas Connection' },
    { id: 'module9', name: 'Module 9: MongoDB CRUD & Query Operations', topic: 'Text Regex Search, Price Filtering, Sorting & Pagination' },
    { id: 'module10', name: 'Module 10: Secure MongoDB Marketplace APIs', topic: 'Atomic Inventory Decrements, State Machine & Delivery OTP' }
  ];

  const runTest = async (testType) => {
    setLoading(true);
    setTestResult(null);

    try {
      let res;
      switch (testType) {
        case 'm1_health':
          res = await api.get('/health');
          break;
        case 'm2_schema':
          res = await api.get('/academic/sqlite/schema');
          break;
        case 'm2_join_farmers_products':
          res = await api.get('/academic/sqlite/join-farmers-products');
          break;
        case 'm2_join_orders':
          res = await api.get('/academic/sqlite/join-order-details');
          break;
        case 'm6_files':
          res = await api.get('/upload/academic-demo');
          break;
        case 'm8_products':
          res = await api.get('/products?limit=3');
          break;
        default:
          res = await api.get('/health');
      }
      setTestResult(res);
      setLoading(false);
    } catch (err) {
      setTestResult({ error: err.message });
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          1st-Year Computer Science Curriculum Live Evaluation Suite
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Academic Syllabus Practical Demonstration (10 Modules)
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Every concept from your syllabus is practically implemented in RythuConnect. Evaluators can trigger real backend operations, inspect SQL joins, verify Node.js streams, and observe async file handling live below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Selector Sidebar */}
        <div className="lg:col-span-4 bg-white p-3 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-2">
            Select Syllabus Module:
          </span>
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveTab(m.id);
                setTestResult(null);
              }}
              className={`w-full text-left p-3 rounded-2xl transition-all text-xs font-semibold ${
                activeTab === m.id
                  ? 'bg-agro-700 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="font-bold">{m.name}</div>
              <div className={`text-[10px] truncate ${activeTab === m.id ? 'text-agro-200' : 'text-slate-400'}`}>
                {m.topic}
              </div>
            </button>
          ))}
        </div>

        {/* Live Lab Interactive Panel */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {/* Module 1 */}
          {activeTab === 'module1' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Module 1: Node.js & Express Fundamentals</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates HTTP server initialization, environment variables (`server/config/env.js`), modular Express routers (`server/routes/index.js`), request/response lifecycle, and centralized error middleware.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => runTest('m1_health')}
                  className="px-4 py-2 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" /> Execute Server Health Check API
                </button>
              </div>
            </div>
          )}

          {/* Module 2 */}
          {activeTab === 'module2' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Module 2: SQLite & Relational Database Operations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates the separate academic relational database (`rythu_academic.db`). Implements 5 tables (`farmers`, `customers`, `products`, `orders`, `order_items`), constraints (`PRIMARY KEY`, `FOREIGN KEY ON DELETE CASCADE`, `CHECK`, `UNIQUE`, `NOT NULL`), and complex multi-table SQL `JOIN` queries.
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => runTest('m2_schema')}
                  className="px-4 py-2 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Database className="w-3.5 h-3.5" /> Inspect SQLite DDL Schema Statements
                </button>
                <button
                  onClick={() => runTest('m2_join_farmers_products')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" /> Execute Relational INNER JOIN Query
                </button>
                <button
                  onClick={() => runTest('m2_join_orders')}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" /> Execute 4-Table Itemized Orders JOIN
                </button>
              </div>
            </div>
          )}

          {/* Module 3 */}
          {activeTab === 'module3' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Module 3: RESTful API Development & Validation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates REST constraints, query parameters (`?search=tomato&minPrice=10`), route parameters (`/api/v1/products/:id`), standardized JSON response envelopes (`{ success, statusCode, message, data }`), and HTTP status codes.
              </p>
              <button
                onClick={() => runTest('m8_products')}
                className="px-4 py-2 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" /> Query Filtered Produce REST Endpoint
              </button>
            </div>
          )}

          {/* Module 4 & 5 */}
          {(activeTab === 'module4' || activeTab === 'module5') && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">{activeTab === 'module4' ? 'Module 4: Authentication' : 'Module 5: Middleware & RBAC'}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates secure password hashing via `bcrypt` (10 salt rounds), JWT token generation (`server/utils/jwt.js`), token extraction from Authorization header (`Bearer token`), and role authorization guards restricting farmers from tampering with others' products.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-800 block">5 Configured Role Permissions:</span>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>FARMER:</strong> Can only create and modify their own crops; cannot alter admin KYC.</li>
                  <li><strong>CUSTOMER:</strong> Can place orders, manage carts; restricted from farmer stock controls.</li>
                  <li><strong>BULK_BUYER:</strong> Commercial procurement inquiries (&gt;20kg contracts).</li>
                  <li><strong>DELIVERY_PARTNER:</strong> Physical handover OTP validation.</li>
                  <li><strong>ADMIN:</strong> Unrestricted oversight, farmer verification, dispute moderation.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Module 6 */}
          {activeTab === 'module6' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Module 6: File Handling & Asynchronous Operations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates Node.js `fs` and `fs.promises`, compares synchronous vs asynchronous non-blocking file I/O with async/await, manages Buffers, and integrates Multer for crop photos and farmer KYC documents.
              </p>
              <button
                onClick={() => runTest('m6_files')}
                className="px-4 py-2 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" /> Run Async vs Sync File Handling Lab
              </button>
            </div>
          )}

          {/* Module 7 */}
          {activeTab === 'module7' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Module 7: Streams & Data Processing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates Node.js `Readable`, `Transform`, and `Writable` streams. Sales logs are streamed directly through a custom `ObjectToCsvTransform` pipeline (`server/streams/csvExportStream.js`) into the HTTP response stream without memory spikes.
              </p>
              <a
                href="http://localhost:5000/api/v1/streams/sales-csv"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <FileDown className="w-4 h-4" /> Download Live Streamed Sales CSV
              </a>
            </div>
          )}

          {/* Module 8, 9, 10 */}
          {['module8', 'module9', 'module10'].includes(activeTab) && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Modules 8, 9 & 10: MongoDB Atlas Integration & Secure Transactions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstrates 13 Mongoose schemas, text search indexes, compound queries (`$gte`, `$lte`), atomic inventory decrements upon order confirmation, and physical delivery verification via a 6-digit OTP state machine.
              </p>
              <button
                onClick={() => runTest('m8_products')}
                className="px-4 py-2 bg-agro-700 hover:bg-agro-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5" /> Fetch Live Produce via MongoDB Query
              </button>
            </div>
          )}

          {/* Live Terminal Output Window */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-700" />
                Live API Response Output Console:
              </span>
              {loading && <span className="text-agro-600 animate-pulse">Executing HTTP Request...</span>}
            </div>

            <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-2xl overflow-x-auto max-h-80 shadow-inner">
              {loading ? '// Waiting for server response...' : testResult ? JSON.stringify(testResult, null, 2) : '// Click any test button above to run practical syllabus code.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicShowcasePage;
