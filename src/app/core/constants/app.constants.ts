import {
  DashboardTask, DashboardRequest, Request, Task,
  WorkflowStage, WorkflowTask, BusinessRow, LocationRow, BusinessRole, RoleMapping, AuditEntry
} from '../models/app.models';

// ─── Design Tokens ─────────────────────────────────────────────────────────────
export const C = {
  pageBg: '#e7eef8', sidebar: '#16283e', sidebarActive: '#23476c',
  widgetBg: '#fcfdfe', widgetHeader: '#f6f8fb', widgetBorder: '#d2ddea',
  tableAlt: '#f6f8fb', inputBorder: '#e0e5ec', primary: '#16283e',
  body: '#77858c', bodyDark: '#15273f', navInactive: '#5c6c7e',
  teal: '#2795a8', red: '#ed4e33', yellow: '#f5a900', green: '#29b931',
  orange: '#e08c00', purple: '#7c3aed',
  p1: '#f5a900', p2: '#179857', p3: '#0f79c7',
  stagePreApproval: '#314358', stageApprovals: '#23476c', stagePostApproval: '#16283e',
};

// ─── Current User ─────────────────────────────────────────────────────────────
export const CURRENT_USER = { name: 'Pranjal Panday', role: 'Requestor', business: 'SCC', site: 'INPL001' };

// ─── Dashboard Data ───────────────────────────────────────────────────────────
export const DASHBOARD_TASKS: DashboardTask[] = [
  { id: 'BMOC-2024-0045', taskTitle: 'Raw Material validation approval',  requestTitle: 'BMOC-2024-0045 — New Waterproofing Compound WP-250', type: 'Provide Input + Approve', dueDate: '20 Jun 2026', priority: 'P2' },
  { id: 'BMOC-2024-0045', taskTitle: 'Compliance CHECK (REACH/TSCA/DSL)', requestTitle: 'BMOC-2024-0045 — New Waterproofing Compound WP-250', type: 'Review',                  dueDate: '26 Jun 2026', priority: 'P2' },
  { id: 'BMOC-2024-0039', taskTitle: 'PSS Compliance CHECK',              requestTitle: 'BMOC-2024-0039 — Product Ext CureX C-30 Kolkata',  type: 'Review',                  dueDate: '25 Jun 2026', priority: 'P1' },
  { id: 'BMOC-2024-0030', taskTitle: 'Product Spec validation',           requestTitle: 'BMOC-2024-0030 — New Product ConcreteSeal CS-100',  type: 'Review + Approve',        dueDate: '22 Jun 2026', priority: 'P2' },
  { id: 'BMOC-2024-0031', taskTitle: 'Trade compliance Review',           requestTitle: 'BMOC-2024-0031 — Product Ext AdmixtureAD20 Mumbai', type: 'Review',                  dueDate: '10 Jun 2026', priority: 'P3' },
];

export const DASHBOARD_REQUESTS: DashboardRequest[] = [
  { id: '700719', title: '"Finished Product"', type: 'NFP', subCategory: 'Blends/Catalysts', location: 'Bangalore', requestor: 'Pandey, Pranjal', reqDate: '24 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700700', title: 'Test test pointing', type: 'NRM', subCategory: 'CO Promoter', location: 'Chennai', requestor: 'Pandey, Pranjal', reqDate: '24 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700688', title: 'RM', type: 'NFP', subCategory: 'Competitive FCC Additives', location: 'Mumbai', requestor: 'Pandey, Pranjal', reqDate: '24 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700698', title: 'RM creation', type: 'NRM', subCategory: 'Cracking Catalysts', location: 'Delhi', requestor: 'Pandey, Pranjal', reqDate: '22 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700695', title: 'NewFP 22Mar', type: 'NFP', subCategory: 'FlowMotion', location: 'Kolkata', requestor: 'Pandey, Pranjal', reqDate: '22 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700486', title: 'RM', type: 'NRM', subCategory: 'FCC Additives', location: 'Bangalore', requestor: 'Pandey, Pranjal', reqDate: '20 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700485', title: 'RM', type: 'NFP', subCategory: 'Competitive Cracking Catalysts', location: 'Chennai', requestor: 'Pandey, Pranjal', reqDate: '20 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700470', title: 'RM', type: 'NRM', subCategory: 'Cracking Catalysts', location: 'Mumbai', requestor: 'Pandey, Pranjal', reqDate: '18 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700406', title: 'RM', type: 'NFP', subCategory: 'Competitive FCC Additives', location: 'Delhi', requestor: 'Pandey, Pranjal', reqDate: '18 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700337', title: 'RM', type: 'NRM', subCategory: 'CO Promoter', location: 'Kolkata', requestor: 'Pandey, Pranjal', reqDate: '15 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700338', title: 'RM', type: 'NFP', subCategory: 'Cracking Catalysts Worms', location: 'Bangalore', requestor: 'Pandey, Pranjal', reqDate: '15 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700344', title: 'RM', type: 'NRM', subCategory: 'FCC Additives', location: 'Chennai', requestor: 'Pandey, Pranjal', reqDate: '14 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700544', title: 'RM', type: 'NFP', subCategory: 'Blends/Catalysts', location: 'Mumbai', requestor: 'Pandey, Pranjal', reqDate: '14 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700512', title: 'RM', type: 'NRM', subCategory: 'FlowMotion', location: 'Delhi', requestor: 'Pandey, Pranjal', reqDate: '12 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700498', title: 'RM', type: 'NFP', subCategory: 'Competitive Cracking Catalysts', location: 'Kolkata', requestor: 'Pandey, Pranjal', reqDate: '12 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700455', title: 'RM', type: 'NRM', subCategory: 'Cracking Catalysts', location: 'Bangalore', requestor: 'Pandey, Pranjal', reqDate: '10 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
  { id: '700421', title: 'RM', type: 'NFP', subCategory: 'CO Promoter', location: 'Chennai', requestor: 'Pandey, Pranjal', reqDate: '10 Mar 2025', stage: 'FP - Manual Approval', status: 'In Progress', priority: 'P3' },
  { id: '700389', title: 'RM', type: 'NRM', subCategory: 'FCC Additives', location: 'Mumbai', requestor: 'Pandey, Pranjal', reqDate: '08 Mar 2025', stage: 'RM - Purchasing', status: 'In Progress', priority: 'P3' },
];



// ─── Requests (main list) ──────────────────────────────────────────────────────
export const ALL_REQUESTS: Request[] = [
  { id: '700719', title: 'New Waterproofing Compound WP-250',   customer: 'Internal', type: 'Create New Product',   site: 'INPL001', requestor: 'Priya Sharma',  date: '10 Jun 2026', stage: 'Pre Approval',  status: 'In Progress', amount: 'Rs.2,40,000', priority: 'P2' },
  { id: '700700', title: 'RM Update Cellulose Ether CF-5',      customer: 'Internal', type: 'Raw Material Update',  site: 'INPL004', requestor: 'Rahul Verma',   date: '08 Jun 2026', stage: 'Approvals',     status: 'In Progress', amount: 'Rs.85,000',   priority: 'P1' },
  { id: '700688', title: 'Product Ext Admixture AD-20 Mumbai',  customer: 'Internal', type: 'Product Extension',    site: 'INPL003', requestor: 'Anjali Mehta',  date: '05 Jun 2026', stage: 'Post Approval', status: 'Approved',    amount: 'Rs.1,20,000', priority: 'P3' },
  { id: '700698', title: 'Packaging Change SikaBond T55',       customer: 'Internal', type: 'Product Update',       site: 'INPL001', requestor: 'Vikram Singh',  date: '01 Jun 2026', stage: '—',             status: 'Draft',       amount: 'Rs.50,000',   priority: 'P3' },
  { id: '700695', title: 'Deactivation ThermoPlast TP Legacy',  customer: 'Internal', type: 'Product Deactivation', site: 'INPL002', requestor: 'Priya Sharma',  date: '28 May 2026', stage: 'Approvals',     status: 'Rejected',    amount: '—',           priority: 'P2' },
  { id: '700486', title: 'New RM Polypropylene Fiber PF-100',   customer: 'Internal', type: 'New Raw Material',     site: 'INPL005', requestor: 'Rahul Verma',   date: '25 May 2026', stage: 'Post Approval', status: 'Approved',    amount: 'Rs.3,60,000', priority: 'P2' },
  { id: '700485', title: 'Product Ext CureX C-30 Kolkata',      customer: 'Internal', type: 'Product Extension',    site: 'INPL007', requestor: 'Anjali Mehta',  date: '22 May 2026', stage: 'Approvals',     status: 'In Progress', amount: 'Rs.95,000',   priority: 'P1' },
  { id: '700470', title: 'RM Update Silica Fume SF-10',         customer: 'Internal', type: 'Raw Material Update',  site: 'INPL002', requestor: 'Priya Sharma',  date: '18 May 2026', stage: '—',             status: 'Approved',    amount: 'Rs.40,000',   priority: 'P3' },
  { id: '700406', title: 'New Product FlexiSeal FS-500',        customer: 'Internal', type: 'Create New Product',   site: 'INPL001', requestor: 'Vikram Singh',  date: '15 May 2026', stage: 'Pre Approval',  status: 'On Hold',     amount: 'Rs.4,80,000', priority: 'P2' },
  { id: '700337', title: 'New Packaging HDPE Drum 200L',        customer: 'Internal', type: 'New Packaging',        site: 'INPL004', requestor: 'Rahul Verma',   date: '12 May 2026', stage: 'Pre Approval',  status: 'Submitted',   amount: 'Rs.1,50,000', priority: 'P1' },
  { id: '700338', title: 'Product Update GraniCrete GC-10',     customer: 'Internal', type: 'Product Update',       site: 'INPL003', requestor: 'Anjali Mehta',  date: '08 May 2026', stage: 'Pre Approval',  status: 'Returned',    amount: 'Rs.2,00,000', priority: 'P2' },
  { id: '700344', title: 'New RM Titanium Dioxide TiO2-25',     customer: 'Internal', type: 'New Raw Material',     site: 'INPL001', requestor: 'Priya Sharma',  date: '02 May 2026', stage: '—',             status: 'Completed',   amount: 'Rs.5,00,000', priority: 'P3' },
  { id: '700544', title: 'Product Ext HydroProof HP-20 Hyd',    customer: 'Internal', type: 'Product Extension',    site: 'INPL006', requestor: 'Rohit Kumar',   date: '28 Apr 2026', stage: 'Pre Approval',  status: 'In Progress', amount: 'Rs.1,10,000', priority: 'P1' },
  { id: '700512', title: 'Packaging Update PET Bottle 1L',      customer: 'Internal', type: 'Packaging Update',     site: 'INPL001', requestor: 'Priya Sharma',  date: '24 Apr 2026', stage: '—',             status: 'Approved',    amount: 'Rs.30,000',   priority: 'P3' },
  { id: '700498', title: 'Product Ext AdmixtureAD20 SBM Mumbai',customer: 'Internal', type: 'Product Extension',    site: 'INPL003', requestor: 'Priya Sharma',  date: '20 Apr 2026', stage: '—',             status: 'Draft',       amount: 'Rs.70,000',   priority: 'P3' },
  { id: '700455', title: 'New Product ConcreteSeal CS-100',     customer: 'Internal', type: 'Create New Product',   site: 'INPL002', requestor: 'Rahul Verma',   date: '15 Apr 2026', stage: 'Approvals',     status: 'In Progress', amount: 'Rs.3,20,000', priority: 'P2' },
  { id: '700421', title: 'RM Update HRWR Admixture HA-50',      customer: 'Internal', type: 'Raw Material Update',  site: 'INPL005', requestor: 'Vikram Singh',  date: '10 Apr 2026', stage: '—',             status: 'Approved',    amount: 'Rs.65,000',   priority: 'P2' },
  { id: '700389', title: 'Product Update EpoxyCoat EC-200',     customer: 'Internal', type: 'Product Update',       site: 'INPL001', requestor: 'Anjali Mehta',  date: '05 Apr 2026', stage: 'Approvals',     status: 'Rejected',    amount: 'Rs.1,80,000', priority: 'P1' },
];

// ─── Task Listing Rows ────────────────────────────────────────────────────────
export const ALL_TASKS: Task[] = [
  { id: 'BMOC-2024-0045-T02', reqId: 'BMOC-2024-0045', taskName: 'Raw Material validation approval',  type: 'Provide Input + Approve', assignedTo: 'Priya Sharma', dueDate: '20 Jun 2026', status: 'Assigned'    },
  { id: 'BMOC-2024-0045-T05', reqId: 'BMOC-2024-0045', taskName: 'Compliance CHECK (REACH/TSCA/DSL)', type: 'Review',                  assignedTo: 'Priya Sharma', dueDate: '26 Jun 2026', status: 'In Progress' },
  { id: 'BMOC-2024-0039-T03', reqId: 'BMOC-2024-0039', taskName: 'PSS Compliance CHECK',              type: 'Review',                  assignedTo: 'Priya Sharma', dueDate: '25 Jun 2026', status: 'Assigned'    },
  { id: 'BMOC-2024-0030-T04', reqId: 'BMOC-2024-0030', taskName: 'Product Spec validation',           type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '22 Jun 2026', status: 'Assigned'    },
  { id: 'BMOC-2024-0031-T06', reqId: 'BMOC-2024-0031', taskName: 'Trade compliance Review',           type: 'Review',                  assignedTo: 'Priya Sharma', dueDate: '10 Jun 2026', status: 'Created'     },
  { id: 'BMOC-2024-0033-T02', reqId: 'BMOC-2024-0033', taskName: 'Addition documentation',            type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '02 Jul 2026', status: 'Created'     },
  { id: 'BMOC-2024-0026-T04', reqId: 'BMOC-2024-0026', taskName: 'Trade compliance Review',           type: 'Review',                  assignedTo: 'Priya Sharma', dueDate: '05 Jul 2026', status: 'Created'     },
  { id: 'BMOC-2024-0041-T03', reqId: 'BMOC-2024-0041', taskName: 'Assign Material Classification',    type: 'Classify',                assignedTo: 'Priya Sharma', dueDate: '08 Jul 2026', status: 'Created'     },
  { id: 'BMOC-2024-0030-T08', reqId: 'BMOC-2024-0030', taskName: 'PSS Approval',                      type: 'Approve',                 assignedTo: 'Priya Sharma', dueDate: '10 Jul 2026', status: 'Created'     },
  { id: 'BMOC-2024-0037-T05', reqId: 'BMOC-2024-0037', taskName: 'Carbon Impact validation',          type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '12 Jul 2026', status: 'Created'     },
  { id: 'BMOC-2024-0043-T09', reqId: 'BMOC-2024-0043', taskName: 'Product Spec validation',           type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '05 Jun 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0040-T07', reqId: 'BMOC-2024-0040', taskName: 'RM code creation (cprm edition)',   type: 'Data Entry',              assignedTo: 'Priya Sharma', dueDate: '28 May 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0038-T04', reqId: 'BMOC-2024-0038', taskName: 'Raw Material validation approval',  type: 'Provide Input + Approve', assignedTo: 'Priya Sharma', dueDate: '20 May 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0035-T02', reqId: 'BMOC-2024-0035', taskName: 'Addition documentation',            type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '10 May 2026', status: 'Rejected'    },
  { id: 'BMOC-2024-0034-T05', reqId: 'BMOC-2024-0034', taskName: 'Compliance CHECK (REACH/TSCA/DSL)', type: 'Review',                  assignedTo: 'Priya Sharma', dueDate: '04 May 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0032-T03', reqId: 'BMOC-2024-0032', taskName: 'PSS Approval',                      type: 'Approve',                 assignedTo: 'Priya Sharma', dueDate: '26 Apr 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0031-T08', reqId: 'BMOC-2024-0031', taskName: 'Assign Material Classification',    type: 'Classify',                assignedTo: 'Priya Sharma', dueDate: '22 Apr 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0029-T06', reqId: 'BMOC-2024-0029', taskName: 'Supply chain (storage, logistics)', type: 'Provide Input',           assignedTo: 'Priya Sharma', dueDate: '12 Apr 2026', status: 'Approved'    },
  { id: 'BMOC-2024-0028-T04', reqId: 'BMOC-2024-0028', taskName: 'Carbon Impact validation',          type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '07 Apr 2026', status: 'Rejected'    },
  { id: 'BMOC-2024-0027-T02', reqId: 'BMOC-2024-0027', taskName: 'Addition documentation',            type: 'Review + Approve',        assignedTo: 'Priya Sharma', dueDate: '03 Apr 2026', status: 'Approved'    },
];

// ─── Workflow Task Master ─────────────────────────────────────────────────────
export const WORKFLOW_TASKS = [
  { id: 'WF-001', stage: 'R&D Approval', taskTitle: 'R&D', userRole: 'R&D', type: 'NP', reasonCode: 'P01 - Create a new Product', business: 'Additives', location: 'Bangalore', updatedOn: '23Jun2026' },
  { id: 'WF-002', stage: 'TCO Approval Stage', taskTitle: 'test04', userRole: 'Test Regional Manager', type: 'Multi...', reasonCode: 'P02 - Customer Request', business: 'Clean Fuels', location: 'Chennai', updatedOn: '23Jun2026' },
  { id: 'WF-003', stage: 'TCO Approval Stage', taskTitle: 'TCO', userRole: 'TCO', type: 'NP', reasonCode: 'P03 - Product Reformulation', business: 'CO Promoter', location: 'Mumbai', updatedOn: '23Jun2026' },
  { id: 'WF-004', stage: 'Marketing / Product ...', taskTitle: 'Marketing / Product Mgt', userRole: 'Marketing', type: 'NP', reasonCode: 'P04 - Cost Reduction Initiative', business: 'Ecat', location: 'Delhi', updatedOn: '23Jun2026' },
  { id: 'WF-005', stage: 'Manufacturing Appr...', taskTitle: 'Manufacturing', userRole: 'Manufacturing', type: 'NP', reasonCode: 'P05 - Regulatory Compliance', business: 'Environmental', location: 'Pune', updatedOn: '23Jun2026' },
  { id: 'WF-006', stage: 'Purchasing Approval', taskTitle: 'Purchasing', userRole: 'Purchasing', type: 'NP', reasonCode: 'P06 - Market Expansion', business: 'FCC Catalysts', location: 'Hyderabad', updatedOn: '23Jun2026' },
  { id: 'WF-007', stage: 'PSS', taskTitle: 'PSS', userRole: 'PSS (Regional)', type: 'NP', reasonCode: 'P07 - Product Rationalisation', business: 'FCC Other', location: 'Kolkata', updatedOn: '23Jun2026' },
  { id: 'WF-008', stage: 'PSS Trade Compliance', taskTitle: 'PSS Trade Compliance', userRole: 'PSS Review', type: 'NP', reasonCode: 'P08 - Packaging Change', business: 'GSR', location: 'Bangalore', updatedOn: '23Jun2026' },
  { id: 'WF-009', stage: 'PSS Approval', taskTitle: 'PSS Approval', userRole: 'PSS Regional Manager', type: 'NP', reasonCode: 'R01 - Create a new Raw Material', business: 'Additives', location: 'Chennai', updatedOn: '23Jun2026' },
  { id: 'WF-010', stage: 'Operation Approval', taskTitle: 'Safety operational/plant', userRole: 'EHS', type: 'NP', reasonCode: 'R02 - Raw Material Substitution', business: 'Clean Fuels', location: 'Mumbai', updatedOn: '23Jun2026' },
  { id: 'WF-011', stage: 'Operation Approval', taskTitle: 'Quality', userRole: 'Quality Admin', type: 'NP', reasonCode: 'R03 - Supplier Change', business: 'CO Promoter', location: 'Delhi', updatedOn: '23Jun2026' },
  { id: 'WF-012', stage: 'Automatic QAD Inte...', taskTitle: 'API call Auto', userRole: 'Demo, User', type: 'Multi...', reasonCode: 'R04 - Quality Improvement', business: 'Ecat', location: 'Pune', updatedOn: '05Dec2024' },
  { id: 'WF-013', stage: 'Automatic QAD Inte...', taskTitle: 'Automatic QAD Integration', userRole: 'Multiple', type: 'NP', reasonCode: 'R05 - Sourcing Localisation', business: 'Environmental', location: 'Hyderabad', updatedOn: '23Jun2026' },
  { id: 'WF-014', stage: 'Manual QAD integrat...', taskTitle: 'API manual integration', userRole: 'Sharma, Munish', type: 'Multi...', reasonCode: 'R06 - Cost Reduction -RM', business: 'FCC Catalysts', location: 'Kolkata', updatedOn: '09Dec2024' },
  { id: 'WF-015', stage: 'Manual QAD integrat...', taskTitle: 'Overall product validation, including Costing valida...', userRole: 'Multiple', type: 'NP', reasonCode: 'R07 - Regulatory / REACH Compliance', business: 'FCC Other', location: 'Bangalore', updatedOn: '23Jun2026' },
];

// ─── Workflow Stages for New Request ──────────────────────────────────────────
export const INITIAL_WF_STAGES: WorkflowStage[] = [
  { id: 1, name: 'Product Management',       tasks: [{ id: 1, title: 'Marketing / Product Mgt',                               responsibility: 'Marketing or Product Mgt Key Assignee', user: 'Pranjal Pandey' }] },
  { id: 2, name: 'Trade Compliance',         tasks: [{ id: 2, title: 'Trade Compliance : HS Code and Licensing requirements', responsibility: 'Trade compliance',                       user: 'Munish Sharma' }] },
  { id: 3, name: 'Logistics',               tasks: [{ id: 3, title: 'PSS',                                                   responsibility: 'PSS Coordinators',                       user: 'Rahul Sharma' }] },
  { id: 4, name: 'Operation',               tasks: [{ id: 4, title: 'Safety operational/plant', responsibility: 'EHS Key Assignee', user: 'Jayehs Chauhan' }, { id: 5, title: 'Quality', responsibility: 'QC Key Assignee', user: 'Sumant Singh' }] },
  { id: 5, name: 'TCO',                     tasks: [{ id: 6, title: 'Formula Annotation',                                    responsibility: 'TCO',                                    user: 'John Doe' }] },
  { id: 6, name: 'Automatic ERP Integration',tasks: [{ id: 7, title: 'Automatic ERP Integration',                            responsibility: 'Requestor',                              user: 'Pranjal Pandey' }] },
  { id: 7, name: 'Final Approval',           tasks: [{ id: 8, title: 'Overall product validation',                           responsibility: 'Technical Dir or R&D Mgt Key Assignee', user: 'Rahul Sharma' }] },
];

// ─── Master Data ──────────────────────────────────────────────────────────────
export const BUSINESS_ROWS: BusinessRow[] = [
  { code: 'SCC', name: 'Construction Chemicals',        status: 'Active' },
  { code: 'SBM', name: 'Specialty Building Materials',  status: 'Active' },
];

export const LOCATION_ROWS: LocationRow[] = [
  { code: 'INPL001', name: 'Bangalore Admixtures Plant',    city: 'Bangalore', business: 'SCC' },
  { code: 'INPL002', name: 'Chennai Construction Products', city: 'Chennai',   business: 'SCC' },
  { code: 'INPL003', name: 'Mumbai Specialty Plant',        city: 'Mumbai',    business: 'SBM' },
  { code: 'INPL004', name: 'Delhi Chemicals Plant',         city: 'Delhi',     business: 'SCC' },
  { code: 'INPL005', name: 'Pune Manufacturing Centre',     city: 'Pune',      business: 'SCC' },
  { code: 'INPL006', name: 'Hyderabad R&D Centre',          city: 'Hyderabad', business: 'SCC' },
  { code: 'INPL007', name: 'Kolkata Distribution Plant',    city: 'Kolkata',   business: 'SBM' },
];

export const AUDIT_ENTRIES: AuditEntry[] = [
  { ts: '22 Jun 2026 14:32', user: 'Priya Sharma', action: 'Status changed',      detail: 'Draft → In Progress' },
  { ts: '22 Jun 2026 14:31', user: 'Priya Sharma', action: 'Request submitted',   detail: 'Workflow initiated' },
  { ts: '22 Jun 2026 14:28', user: 'Priya Sharma', action: 'Package 1 data saved',detail: 'Formulation data entered' },
  { ts: '22 Jun 2026 14:15', user: 'Priya Sharma', action: 'Request created',     detail: 'Draft saved' },
  { ts: '10 Jun 2026 11:05', user: 'Rahul Verma',  action: 'Attachment uploaded', detail: 'SDS_WP250_v1.pdf' },
  { ts: '10 Jun 2026 10:50', user: 'Priya Sharma', action: 'Attachment uploaded', detail: 'Specification_WP250.docx' },
];

export const QUARTER_CHART_DATA = [
  { quarter: 'Q1 2025', SCC: 12, SBM: 8 },
  { quarter: 'Q2 2025', SCC: 19, SBM: 11 },
  { quarter: 'Q3 2025', SCC: 15, SBM: 9  },
  { quarter: 'Q4 2025', SCC: 22, SBM: 14 },
  { quarter: 'Q1 2026', SCC: 18, SBM: 12 },
  { quarter: 'Q2 2026', SCC: 24, SBM: 16 },
];

// ─── Business Role and DOA ────────────────────────────────────────────────────
export const BUSINESS_ROLES: BusinessRole[] = [
  { id: 'BR001', name: 'Marketing',                  description: '',                                      department: 'Market Manager',               updatedOn: '23Jun2026' },
  { id: 'BR002', name: 'R&D',                        description: '',                                      department: 'Research And Development',    updatedOn: '23Jun2026' },
  { id: 'BR003', name: 'PSS Review',                 description: 'pss review',                            department: 'Product Stewardship',         updatedOn: '17Jan2025' },
  { id: 'BR004', name: 'Purchasing',                 description: 'Purchasing Plant',                      department: 'Plant',                       updatedOn: '10Dec2024' },
  { id: 'BR005', name: 'LCA Centre',                 description: 'LCA Centre',                            department: 'Corporate',                   updatedOn: '10Dec2024' },
  { id: 'BR006', name: 'Technical Direction',        description: '',                                      department: 'Technical Direction',         updatedOn: '10Dec2024' },
  { id: 'BR007', name: 'Market Manager',             description: 'Market Manager',                        department: 'Market Manager',               updatedOn: '10Dec2024' },
  { id: 'BR008', name: 'Sustainability representative', description: 'Sustainability representative',      department: 'Plant',                       updatedOn: '10Dec2024' },
  { id: 'BR009', name: 'EHS',                        description: 'EHS',                                   department: 'Plant',                       updatedOn: '10Dec2024' },
  { id: 'BR010', name: 'Installation team',          description: 'Installation team',                      department: 'Plant',                       updatedOn: '09Dec2024' },
  { id: 'BR011', name: 'Purchasing Manager',         description: 'Purchasing Manager',                    department: 'Purchasing',                  updatedOn: '09Dec2024' },
  { id: 'BR012', name: 'PSS (Regional)',             description: 'PSS (Regional)',                        department: 'Product Stewardship',         updatedOn: '09Dec2024' },
  { id: 'BR013', name: 'Product Manager',            description: 'Product Manager',                       department: 'Product Manager',             updatedOn: '09Dec2024' },
  { id: 'BR014', name: 'Manufacturing',              description: '',                                      department: 'Manufacturing',               updatedOn: '09Dec2024' },
  { id: 'BR015', name: 'Product Manager (Product Line)', description: 'Product Manager (Product Line)',    department: 'Product Manager',             updatedOn: '06Dec2024' },
  { id: 'BR016', name: 'Quality',                    description: 'Quality',                               department: 'Quality',                     updatedOn: '05Dec2024' },
  { id: 'BR017', name: 'Supply Chain',               description: 'Supply Chain',                          department: 'Supply Chain',                updatedOn: '04Dec2024' },
  { id: 'BR018', name: 'Finance',                    description: 'Finance',                               department: 'Finance',                     updatedOn: '03Dec2024' },
  { id: 'BR019', name: 'Compliance Officer',         description: 'Compliance Officer',                    department: 'Compliance',                  updatedOn: '02Dec2024' },
  { id: 'BR020', name: 'CSR Lead',                   description: 'Corporate Social Responsibility',       department: 'Corporate',                   updatedOn: '01Dec2024' },
  { id: 'BR021', name: 'Safety Manager',             description: 'Workplace Safety Manager',              department: 'Plant',                       updatedOn: '30Nov2024' },
  { id: 'BR022', name: 'HR Manager',                 description: 'Human Resources Manager',               department: 'HR',                          updatedOn: '29Nov2024' },
  { id: 'BR023', name: 'Training Lead',              description: 'Employee Training and Development',     department: 'HR',                          updatedOn: '28Nov2024' },
  { id: 'BR024', name: 'Innovation Director',        description: 'Director of Innovation',                department: 'R&D',                         updatedOn: '27Nov2024' },
  { id: 'BR025', name: 'Logistics Coordinator',      description: 'Logistics and Distribution',             department: 'Supply Chain',                updatedOn: '26Nov2024' },
  { id: 'BR026', name: 'Environmental Officer',      description: 'Environmental Compliance',              department: 'Environment',                 updatedOn: '25Nov2024' },
  { id: 'BR027', name: 'Quality Assurance Lead',     description: 'QA Team Lead',                           department: 'Quality',                     updatedOn: '24Nov2024' },
  { id: 'BR028', name: 'Procurement Specialist',     description: 'Strategic Procurement',                 department: 'Purchasing',                  updatedOn: '23Nov2024' },
  { id: 'BR029', name: 'Production Manager',         description: 'Plant Production',                       department: 'Manufacturing',               updatedOn: '22Nov2024' },
  { id: 'BR030', name: 'Regulatory Affairs Officer', description: 'Regulatory Compliance',                 department: 'Compliance',                  updatedOn: '21Nov2024' },
  { id: 'BR031', name: 'Maintenance Manager',        description: 'Equipment Maintenance',                 department: 'Plant',                       updatedOn: '20Nov2024' },
  { id: 'BR032', name: 'Risk Management Officer',    description: 'Enterprise Risk Management',            department: 'Corporate',                   updatedOn: '19Nov2024' },
  { id: 'BR033', name: 'Analytics Lead',             description: 'Data Analytics and Insights',           department: 'IT',                          updatedOn: '18Nov2024' },
  { id: 'BR034', name: 'Customer Service Manager',   description: 'Customer Relations',                    department: 'Sales',                       updatedOn: '17Nov2024' },
  { id: 'BR035', name: 'Sustainability Manager',     description: 'ESG Initiatives',                       department: 'Corporate',                   updatedOn: '16Nov2024' },
  { id: 'BR036', name: 'Project Manager',            description: 'Project Delivery',                      department: 'Operations',                  updatedOn: '15Nov2024' },
  { id: 'BR037', name: 'Budget Controller',          description: 'Financial Planning',                    department: 'Finance',                     updatedOn: '14Nov2024' },
  { id: 'BR038', name: 'Supplier Relations Manager', description: 'Vendor Management',                     department: 'Purchasing',                  updatedOn: '13Nov2024' },
  { id: 'BR039', name: 'IT Systems Manager',         description: 'IT Infrastructure',                     department: 'IT',                          updatedOn: '12Nov2024' },
  { id: 'BR040', name: 'Documentation Specialist',   description: 'Technical Documentation',               department: 'Quality',                     updatedOn: '11Nov2024' },
  { id: 'BR041', name: 'Auditor',                    description: 'Internal Audit',                        department: 'Compliance',                  updatedOn: '10Nov2024' },
  { id: 'BR042', name: 'Change Management Lead',     description: 'Organizational Change',                 department: 'Operations',                  updatedOn: '09Nov2024' },
  { id: 'BR043', name: 'Export Compliance Officer',  description: 'Trade Compliance',                      department: 'Compliance',                  updatedOn: '08Nov2024' },
  { id: 'BR044', name: 'Training Administrator',     description: 'Training Program Management',           department: 'HR',                          updatedOn: '07Nov2024' },
  { id: 'BR045', name: 'Lab Technician Lead',        description: 'Laboratory Operations',                 department: 'R&D',                         updatedOn: '06Nov2024' },
  { id: 'BR046', name: 'Warehouse Manager',          description: 'Inventory Management',                  department: 'Supply Chain',                updatedOn: '05Nov2024' },
  { id: 'BR047', name: 'Process Engineer',           description: 'Process Improvement',                   department: 'Manufacturing',               updatedOn: '04Nov2024' },
  { id: 'BR048', name: 'Sales Lead',                 description: 'Sales Team Management',                 department: 'Sales',                       updatedOn: '03Nov2024' },
  { id: 'BR049', name: 'Strategic Advisor',          description: 'Business Strategy',                      department: 'Corporate',                   updatedOn: '02Nov2024' },
];

// ─── Role Mapping ─────────────────────────────────────────────────────────────
export const ROLE_MAPPINGS: RoleMapping[] = [
  { id: 'RM001', businessRole: 'R&D', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '23Jun2026' },
  { id: 'RM002', businessRole: 'PSS Review', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '17Jan2025' },
  { id: 'RM003', businessRole: 'Purchasing Manager', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM004', businessRole: 'R&D (ITM)', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM005', businessRole: 'LCA Centre', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM006', businessRole: 'Trade Compliance', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM007', businessRole: 'Technical Direction', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM008', businessRole: 'Market Manager', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM009', businessRole: 'Sustainability representative', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM010', businessRole: 'EHS', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM011', businessRole: 'R&D (Country)', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Dec2024' },
  { id: 'RM012', businessRole: 'Product Manager', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '09Dec2024' },
  { id: 'RM013', businessRole: 'PSS (Regional)', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '09Dec2024' },
  { id: 'RM014', businessRole: 'Manufacturing', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '09Dec2024' },
  { id: 'RM015', businessRole: 'TCO', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '09Dec2024' },
  { id: 'RM016', businessRole: 'Marketing', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '08Dec2024' },
  { id: 'RM017', businessRole: 'Quality', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '07Dec2024' },
  { id: 'RM018', businessRole: 'Installation team', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '06Dec2024' },
  { id: 'RM019', businessRole: 'Purchasing', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '05Dec2024' },
  { id: 'RM020', businessRole: 'Supply Chain', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '04Dec2024' },
  { id: 'RM021', businessRole: 'Finance', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '03Dec2024' },
  { id: 'RM022', businessRole: 'Compliance Officer', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '02Dec2024' },
  { id: 'RM023', businessRole: 'HR Manager', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '01Dec2024' },
  { id: 'RM024', businessRole: 'Safety Manager', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '30Nov2024' },
  { id: 'RM025', businessRole: 'Innovation Director', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '29Nov2024' },
  { id: 'RM026', businessRole: 'Logistics Coordinator', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '28Nov2024' },
  { id: 'RM027', businessRole: 'Environmental Officer', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '27Nov2024' },
  { id: 'RM028', businessRole: 'Quality Assurance Lead', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '26Nov2024' },
  { id: 'RM029', businessRole: 'Procurement Specialist', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '25Nov2024' },
  { id: 'RM030', businessRole: 'Production Manager', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '24Nov2024' },
  { id: 'RM031', businessRole: 'Regulatory Affairs Officer', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '23Nov2024' },
  { id: 'RM032', businessRole: 'Maintenance Manager', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '22Nov2024' },
  { id: 'RM033', businessRole: 'Risk Management Officer', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '21Nov2024' },
  { id: 'RM034', businessRole: 'Analytics Lead', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '20Nov2024' },
  { id: 'RM035', businessRole: 'Customer Service Manager', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '19Nov2024' },
  { id: 'RM036', businessRole: 'Sustainability Manager', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '18Nov2024' },
  { id: 'RM037', businessRole: 'Project Manager', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '17Nov2024' },
  { id: 'RM038', businessRole: 'Budget Controller', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '16Nov2024' },
  { id: 'RM039', businessRole: 'Supplier Relations Manager', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '15Nov2024' },
  { id: 'RM040', businessRole: 'IT Systems Manager', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '14Nov2024' },
  { id: 'RM041', businessRole: 'Documentation Specialist', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '13Nov2024' },
  { id: 'RM042', businessRole: 'Auditor', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '12Nov2024' },
  { id: 'RM043', businessRole: 'Change Management Lead', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '11Nov2024' },
  { id: 'RM044', businessRole: 'Export Compliance Officer', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '10Nov2024' },
  { id: 'RM045', businessRole: 'Training Administrator', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '09Nov2024' },
  { id: 'RM046', businessRole: 'Lab Technician Lead', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '08Nov2024' },
  { id: 'RM047', businessRole: 'Warehouse Manager', user: 'Pandey, Pranjal', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '07Nov2024' },
  { id: 'RM048', businessRole: 'Process Engineer', user: 'Yadav, Manju', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '06Nov2024' },
  { id: 'RM049', businessRole: 'Sales Lead', user: 'Sharma, Munish', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '05Nov2024' },
  { id: 'RM050', businessRole: 'Strategic Advisor', user: 'Demo, User', requestType: 'ALL', reasonCode: 'ALL', location: 'ALL', business: 'ALL', updatedOn: '04Nov2024' },
];

// ─── Form Constants ───────────────────────────────────────────────────────────
export const REASON_CODES = [
  'P01 - Create a new Product',
  'P02 - Customer Request',
  'P03 - Product Reformulation',
  'P04 - Cost Reduction Initiative',
  'P05 - Regulatory Compliance',
  'P06 - Market Expansion',
  'P07 - Product Rationalisation',
  'P08 - Packaging Change',
  'R01 - Create a new Raw Material',
  'R02 - Raw Material Substitution',
  'R03 - Supplier Change',
  'R04 - Quality Improvement',
  'R05 - Sourcing Localisation',
  'R06 - Cost Reduction -RM',
  'R07 - Regulatory / REACH Compliance',
];

export const PRIORITIES = [
  'High',
  'Medium',
  'Low',
];

export const PRODUCT_LINES = [
  'Blends/Catalysts',
  'CO Promoter',
  'Competitive Cracking Catalysts',
  'Competitive FCC Additives',
  'Cracking Catalysts',
  'Cracking Catalysts Worms',
  'FCC Additives',
  'FlowMotion',
];

export const PRODUCT_FAMILY_GROUPS = [
  'Blends - Catalyst + Additives',
  'Blends - Catalyst Only',
  'Blends with Ecat',
  'Catalysts other',
  'CO Promoter',
  'Competitive Blend',
  'Competitive Cracking Catalysts',
  'DA',
  'FlowMotion',
  'FUSION',
  'GSR',
  'Iron Tolerance',
  'Light Olefins',
  'MIDAS',
  'Non-Yield',
  'Semi-finished Other',
  'SILICA ALUMINA',
];

export const PRODUCT_FAMILIES = [
  'ACHIEVE 400',
  'ACHIEVE 400 Prime',
  'ACTION',
  'ADA',
  'AFX',
  'ALCYON',
  'ALCYON-DA',
  'ALCYON-M',
  'Catalyst + Additives',
  'Catalyst with GSR',
  'Catalysts other',
  'CLASSIC',
  'CLASSIC-LC',
  'CO Promoter',
  'CP® 3',
  'CP® 5',
  'DA',
];

export const SITES = [
  'INPL001 - Bangalore',
  'INPL002 - Chennai',
  'INPL003 - Mumbai',
  'INPL004 - Delhi',
  'INPL005 - Pune',
  'INPL006 - Hyderabad',
  'INPL007 - Kolkata',
];

export const TOP_FAMILIES = ['Concrete Treatment', 'Surface Protection', 'Structural Repair', 'Tile Fixing', 'Flooring Systems'];

export const FAMILIES: Record<string, string[]> = {
  'Concrete Treatment': ['Waterproofing', 'Admixtures', 'Curing Compounds', 'Surface Hardeners'],
  'Surface Protection':  ['Anti-Carbonation', 'Anti-Corrosion', 'Sealers'],
  'Structural Repair':   ['Mortars', 'Grouts', 'Anchoring Systems'],
  'Tile Fixing':         ['Adhesives', 'Grouts', 'Primers'],
  'Flooring Systems':    ['Epoxy Coatings', 'PU Coatings', 'Self-Levelling'],
};

export const CATEGORIES: Record<string, string[]> = {
  'Waterproofing':     ['Crystalline', 'Membrane', 'Cementitious', 'Bituminous'],
  'Admixtures':        ['Plasticizer', 'Superplasticizer', 'Accelerator', 'Retarder'],
  'Curing Compounds':  ['Wax-Based', 'Resin-Based', 'Water-Based'],
  'Surface Hardeners': ['Metallic', 'Non-Metallic', 'Chemical'],
  'Anti-Carbonation':  ['Acrylic', 'Silicone', 'Elastomeric'],
  'Anti-Corrosion':    ['Epoxy', 'Zinc-Rich', 'Polyurethane'],
  'Mortars':           ['Cementitious', 'Epoxy', 'Polymer-Modified'],
  'Grouts':            ['Non-Shrink', 'Epoxy', 'Micro-Fine'],
  'Adhesives':         ['Cement-Based', 'Epoxy', 'Hybrid'],
  'Epoxy Coatings':    ['Standard', 'Anti-Slip', 'ESD'],
  'Self-Levelling':    ['Screed', 'Topping', 'Underlayment'],
};

export const ITEM_TYPES = ['FGPACK','RAWPACK','PACK','SEMI','BULK','FGBULK','RAWBULK','TRAG','SERV','GENE','SPPT','INST','FORM'];
export const MULTI_PACK_TYPES = new Set(['FGPACK','RAWPACK','PACK','GENE','INST','SERV','SPPT','TRAG']);

export const ADD_NEW_OPTIONS = [
  { label: 'NEW FINISHED PRODUCT (NFP)', active: true },
  { label: 'NEW RAW MATERIAL (NRM)',     active: true },
  { label: 'PRODUCT EXTENSION (PE)',     active: false },
  { label: 'PRODUCT UPDATE (PU)',        active: false },
  { label: 'PACKAGING UPDATE (PKU)',     active: false },
  { label: 'PRODUCT DEACTIVATION (PD)', active: false },
];

// ─── Helper: Status Colour ────────────────────────────────────────────────────
export function statusColor(s: string): string {
  switch (s) {
    case 'Draft':       return '#aaaaaa';
    case 'Submitted':   return '#2795a8';
    case 'In Progress': return '#f5a900';
    case 'Approved':
    case 'Completed':   return '#29b931';
    case 'Rejected':    return '#ed4e33';
    case 'On Hold':     return '#e08c00';
    case 'Returned':    return '#7c3aed';
    case 'Closed':
    case 'Cancelled':
    case 'Created':     return '#aaaaaa';
    case 'Assigned':    return '#2795a8';
    default:            return '#aaaaaa';
  }
}

export function priorityColor(p: string): string {
  return p === 'P1' ? '#f5a900' : p === 'P2' ? '#179857' : '#0f79c7';
}

export function stageColor(s: string): string {
  return s === 'Pre Approval' ? '#314358' : s === 'Approvals' ? '#23476c' : '#16283e';
}
