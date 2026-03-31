const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "Student Feedback System - Project Report",
                    heading: HeadingLevel.TITLE,
                    alignment: "center",
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "1. Objective",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("The objective of this project is to develop a comprehensive Student Feedback System using the MERN (MongoDB, Express, React, Node.js) stack. It provides a secure, role-based platform allowing students to submit feedback for courses and faculty, while enabling administrators to view aggregated feedback metrics to improve institutional quality.")
                    ],
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "2. Index",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({ text: "1. Objective" }),
                new Paragraph({ text: "2. Index" }),
                new Paragraph({ text: "3. Motivation" }),
                new Paragraph({ text: "4. Working Process" }),
                new Paragraph({ text: "5. Code Structure" }),
                new Paragraph({ text: "6. Conclusion" }),
                new Paragraph({ text: "7. Future Improvements" }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "3. Motivation",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("The traditional paper-based feedback system is inefficient, prone to errors, and difficult to analyze. This project was motivated by the need to digitize and streamline the feedback process, ensuring student anonymity, ease of use, and effective evaluation of the curriculum. Building it as a Single Page Application (SPA) with React ensures a seamless user experience.")
                    ],
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "4. Working Process",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({ text: "The system operates on a role-based architecture. The key workflows are:" }),
                new Paragraph({ text: "- Authentication: Secure JWT-based login separating 'student' and 'admin' roles.", bullet: { level: 0 } }),
                new Paragraph({ text: "- Student Dashboard: Students log in to view their enrolled courses and submit qualitative and quantitative feedback for faculty members. Validations ensure feedback is submitted only once per course.", bullet: { level: 0 } }),
                new Paragraph({ text: "- Admin Dashboard: Administrators can view aggregated feedback scores and read detailed comments for every faculty member and course.", bullet: { level: 0 } }),
                new Paragraph({ text: "- Database: MongoDB stores structured documents for Users, Courses, Faculty, and Feedback records.", bullet: { level: 0 } }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "5. Code Structure",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Frontend (React + Vite):", bold: true }),
                        new TextRun(" Consists of pages like Login.jsx, StudentDashboard.jsx, and AdminDashboard.jsx governed by React Router DOM. It leverages modern React Hooks (useState, useEffect) for state management and API communication.")
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Backend (Node + Express):", bold: true }),
                        new TextRun(" Implements an MVC-like architecture. Routes map to specific controllers (authController, studentController, adminController). Middleware is used for JWT verification and role authorization.")
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Database (MongoDB + Mongoose):", bold: true }),
                        new TextRun(" Schemas enforce data consistency for entities like User, Course, Faculty, and Feedback.")
                    ],
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "6. Conclusion",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    children: [
                        new TextRun("The Student Feedback System successfully demonstrates a robust full-stack web application. It effectively handles state, persistent data storage, secure user authentication, and responsive UI design, meeting all the primary objectives for a functional feedback collection platform.")
                    ],
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),
                
                new Paragraph({
                    text: "7. Future Improvements",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({ text: "- Implementation of automated email notifications confirming feedback submission.", bullet: { level: 0 } }),
                new Paragraph({ text: "- Adding advanced data visualization (charts and graphs) to the Admin Dashboard for easier trend analysis.", bullet: { level: 0 } }),
                new Paragraph({ text: "- Excel/PDF export capabilities for administrators to download formal reports for accreditation bodies.", bullet: { level: 0 } }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("Student_Feedback_System_Report.docx", buffer);
    console.log("Document created successfully");
});
