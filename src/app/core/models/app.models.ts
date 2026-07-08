// ─── Status Types ─────────────────────────────────────────────────────────────
export type TaskStatus = 'Created' | 'Assigned' | 'In Progress' | 'Approved' | 'Rejected';
export type RequestStatus = 'Draft' | 'Submitted' | 'In Progress' | 'Approved' | 'Rejected' | 'On Hold' | 'Returned' | 'Closed' | 'Completed' | 'Cancelled';
export type UserRole = 'Requestor' | 'Function Admin' | 'Admin' | 'Process Owner';

// ─── Request Model ────────────────────────────────────────────────────────────
export interface Request {
  id: string;
  title: string;
  customer: string;
  type: string;
  site: string;
  requestor: string;
  date: string;
  stage: string;
  status: RequestStatus;
  amount: string;
  priority: string;
}

// ─── Task Model ───────────────────────────────────────────────────────────────
export interface Task {
  id: string;
  reqId: string;
  taskName: string;
  type: string;
  assignedTo: string;
  dueDate: string;
  status: TaskStatus;
}

// ─── Dashboard Task ───────────────────────────────────────────────────────────
export interface DashboardTask {
  id: string;
  taskTitle: string;
  requestTitle: string;
  type: string;
  dueDate: string;
  priority: string;
}

// ─── Dashboard Request ────────────────────────────────────────────────────────
export interface DashboardRequest {
  id: string;
  title: string;
  type: string;
  subCategory: string;
  location: string;
  requestor: string;
  reqDate: string;
  stage: string;
  status: RequestStatus;
  priority: string;
}

// ─── Workflow Models ──────────────────────────────────────────────────────────
export interface WorkflowTask {
  id: number;
  title: string;
  responsibility: string;
  user: string;
}

export interface WorkflowStage {
  id: number;
  name: string;
  tasks: WorkflowTask[];
}

// ─── Workflow Task Master ────────────────────────────────────────────────────
export interface WorkflowTaskMaster {
  id: string;
  stage: string;
  taskTitle: string;
  userRole: string;
  type: string;
  reasonCode: string;
  business: string;
  location: string;
  updatedOn: string;
}

// ─── Nav Item ─────────────────────────────────────────────────────────────────
export interface NavChild {
  label: string;
  route: string | null;
}

export interface NavItem {
  id?: string;
  icon: string;
  label: string;
  route: string | null;
  roles?: UserRole[] | null;
  children?: NavChild[];
}

// ─── Business & Location ──────────────────────────────────────────────────────
export interface BusinessRow {
  code: string;
  name: string;
  status: string;
}

export interface LocationRow {
  code: string;
  name: string;
  city: string;
  business: string;
}

// ─── Audit Trail ─────────────────────────────────────────────────────────────
export interface AuditEntry {
  ts: string;
  user: string;
  action: string;
  detail: string;
}

// ─── Attachment ───────────────────────────────────────────────────────────────
export interface Attachment {
  name: string;
  ext: string;
  size: string;
  uploader: string;
  date: string;
}
