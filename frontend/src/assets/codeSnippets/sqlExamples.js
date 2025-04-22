export const innerJoinSnippet = `SELECT student.name, course.course_name
FROM student
INNER JOIN course
ON student.course_id = course.course_id;`;


export const leftJoinSnippet = `SELECT student.name, course.course_name
FROM student
LEFT JOIN course
ON student.course_id = course.course_id;
`;

export const rightJoinSnippet = `SELECT student.name, course.course_name
FROM student
RIGHT JOIN course
ON student.course_id = course.course_id;
`;

export const fullJoinSnippet = `SELECT student.name, course.course_name
FROM student
FULL OUTER JOIN course
ON student.course_id = course.course_id;
`;

export const crossJoinSnippet = `SELECT s.student_id, s.name, s.course_id, c.course_id AS joined_course_id, c.course_name
FROM Student s
CROSS JOIN Course c;
`;

export const viewSnippet = `CREATE VIEW StudentView AS
SELECT Name, Course_ID FROM Students;`