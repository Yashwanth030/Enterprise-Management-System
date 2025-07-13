# Enterprise Management System 
---

<img width="1920" height="1128" alt="Home" src="https://github.com/user-attachments/assets/008c23b7-3806-4973-9a2a-bf152f1af764" />

---

## Project Overview

Enterprise Work Manager is a role-based project and task management system designed to streamline workflows across Admins, Managers, and Employees within an organization.  
It offers intuitive dashboards, drag-and-drop task management, real-time notifications, and insightful reporting to ensure project progress and team productivity.

---

## Workflow & Role Summary

- **Admin** (Single user): Creates and manages projects, managers, and employees. Oversees the entire system with access to reports, notifications, and visual analytics.  
- **Manager**: Manages assigned projects, creates and assigns tasks to employees, tracks task progress with drag-and-drop interfaces, and communicates with employees through task comments and status updates.  
- **Employee**: Views and updates assigned tasks, comments on progress, marks tasks as done, and receives task-related notifications.

---

## Features by Role

### Admin Features
- Create/manage projects, managers, and employees.  
- Assign projects to managers and employees under managers.  
- View all users and monitor project progress.  
- Access notifications and system messages.  
- Visualize data via pie charts and graphs:  
  - Task statuses (Done, In Progress, To Do)  
  - Tasks per project and per manager  
- Track project completion with progress bars.

### Manager Features
- View assigned projects.  
- Add/edit tasks with title, description, and due date.  
- Drag-and-drop tasks across statuses (`To Do`, `In Progress`, `Done`).  
- Assign tasks to employees via drag-and-drop.  
- View and manage employees under their supervision.  
- Track employee task updates and communicate through comments.

### Employee Features
- View assigned tasks and statuses.  
- Add comments and update progress.  
- Mark tasks as completed (visual indicator with green highlight).  
- Receive notifications for task changes and deadlines.

---

##  Technology Stack

| Category           | Libraries / Tools                         |
|--------------------|-------------------------------------------|
| **Frontend**        | React (Vite), React Router DOM            |
| **State Management**| Redux Toolkit, redux-persist, redux-thunk |
| **Styling**         | Tailwind CSS, Headless UI                 |
| **Drag & Drop**     | @hello-pangea/dnd                         |
| **Charts & Graphs** | Recharts                                  |
| **Form Handling**   | react-hook-form                           |
| **Notifications**   | react-hot-toast                           |
| **Testing**         | Jest, React Testing Library               |

---
## Screenshots

| **Login Page**  | **Settings** |
|-------------|--------------|
|<img width="1920" height="1128" alt="Login" src="https://github.com/user-attachments/assets/76f968c6-69fb-486c-a95c-fb5040a9fbab" /> | <img width="1920" height="1128" alt="Settings" src="https://github.com/user-attachments/assets/98cc7616-760d-4c8a-ba13-8f4d5a4fd9ad" />|
 
 ---
| **Admin Dashboard** | **Admin: Create Project** |
|---------------------|---------------------------|
|<img width="1920" height="1128" alt="Admin -dashboard" src="https://github.com/user-attachments/assets/94497297-0490-4d3e-bd5c-4dd874de271b" />|<img width="1920" height="1128" alt="Create- Project" src="https://github.com/user-attachments/assets/e500d6ad-8059-4e1f-805d-7699681ae492" />|

---

| **Reports (Graphs & Pie Charts)**| |
|----------------------------------|-|
|<img width="1920" height="1128" alt="Piechart Report" src="https://github.com/user-attachments/assets/111b0295-4b64-41ff-8d96-464ae1147863" />|<img width="1920" height="1128" alt="Graphs" src="https://github.com/user-attachments/assets/23b1b1cd-8c4b-4132-be5c-418e835c662e" />|

---
|**Users Overview**|**Notifications**|
|------------------|-----------------|
|<img width="1920" height="1128" alt="Users" src="https://github.com/user-attachments/assets/c6ff21eb-3dfc-4938-8274-09b0f0678a7e" />|<img width="1920" height="1128" alt="Theam - Notifications" src="https://github.com/user-attachments/assets/1dfa4517-9656-4497-b1ef-21224420b9c5" />|

---
|**Manager Dashboard**| **Manager: My-Employees View**|
|---------------------|-------------------------------|
|<img width="1920" height="1128" alt="Manager" src="https://github.com/user-attachments/assets/99341b67-892c-41f1-af92-3bf6cb4febac" />|<img width="1920" height="1128" alt="My - Employees" src="https://github.com/user-attachments/assets/a3bdac5e-3e78-4c60-a652-9ad43b326645" />|

---
|**Employee Dashboard**|
|----------------------|
|<img width="1920" height="1128" alt="Employee" src="https://github.com/user-attachments/assets/79755884-c38f-4ccd-b2c7-38af9fba69dc" />|


---
## Architecture Overview

- Single-page React app with role-based routes and dashboards.  
- State persisted locally using redux-persist and browser localStorage.  
- Role-based authentication and routing handled on frontend.  
- Drag-and-drop UI for intuitive task management.  
- Real-time UI feedback via notifications and updated charts.  

---
## Tutorial Video

[![Watch the demo](https://drive.google.com/file/d/1KbyQH4UJb2RXtNncakmTV-uR2EDmSgf2/view?usp=drive_link)

---

## Demo & Credentials
My App
Try the live demo here: [Enterprise Management System](https://enterprise-management-system1.netlify.app/)
Deployed in netlify.

Use the default admin account to explore all features:  
- **Email:** -> admin@example.com  
- **Password:** -> admin123

---
## Future Enhancements
- Backend

---

## Contact
For any queries or support, please contact:  
Yashwanth GR - yashwanthgr003@gmail.com

---

