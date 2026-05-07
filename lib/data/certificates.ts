export type CertificateStatus = "Valid" | "Expired" | "In Progress";

export type CertificateCategory =
  | "Cloud & DevOps"
  | "AI & Data"
  | "Web Development"
  | "Databases"
  | "Professional"
  | "Competitive Coding"
  | "University";

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  issuerLogo: string;
  category: CertificateCategory;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verifyUrl: string;
  status: CertificateStatus;
  featured: boolean;
};

export const certificateCategories: CertificateCategory[] = [
  "Cloud & DevOps",
  "AI & Data",
  "Web Development",
  "Databases",
  "Professional",
  "Competitive Coding",
  "University",
];

export const certificates: Certificate[] = [
  {
    id: "google-technical-support-fundamentals",
    name: "Technical Support Fundamentals",
    issuer: "Google",
    issuerLogo: "G",
    category: "Professional",
    issueDate: "2025-10-01",
    credentialId: "VN8HJVREFDUW",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/VN8HJVREFDUW",
    status: "Valid",
    featured: true,
  },
  {
    id: "postman-api-fundamentals-student-expert",
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    issuerLogo: "PM",
    category: "Web Development",
    issueDate: "2025-09-01",
    credentialId: "LINKEDIN-1205313070",
    verifyUrl:
      "https://www.linkedin.com/in/suthankan/overlay/Certifications/1205313070/treasury?profileId=ACoAAEJ6oasBsP_W97SfWqGEP40ehgcBkACXjEE",
    status: "Valid",
    featured: true,
  },
  {
    id: "ibm-react-front-end-apps",
    name: "Developing Front-End Apps with React",
    issuer: "IBM",
    issuerLogo: "IBM",
    category: "Web Development",
    issueDate: "2025-09-01",
    credentialId: "K9CVTJYH8OC4",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/K9CVTJYH8OC4",
    status: "Valid",
    featured: true,
  },
  {
    id: "hackerrank-java-basic",
    name: "Java (Basic)",
    issuer: "HackerRank",
    issuerLogo: "HR",
    category: "Competitive Coding",
    issueDate: "2025-08-01",
    credentialId: "A33921A2EBDE",
    verifyUrl: "https://www.hackerrank.com/certificates/a33921a2ebde",
    status: "Valid",
    featured: true,
  },
  {
    id: "ibm-git-github",
    name: "Getting Started with Git and GitHub",
    issuer: "IBM",
    issuerLogo: "IBM",
    category: "Professional",
    issueDate: "2025-07-01",
    credentialId: "BRSAUQDLDP55",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/BRSAUQDLDP55?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    status: "Valid",
    featured: false,
  },
  {
    id: "hackerrank-javascript-basic",
    name: "JavaScript (Basic)",
    issuer: "HackerRank",
    issuerLogo: "HR",
    category: "Competitive Coding",
    issueDate: "2025-06-01",
    credentialId: "AC1CEE935818",
    verifyUrl: "https://www.hackerrank.com/certificates/ac1cee935818",
    status: "Valid",
    featured: false,
  },
  {
    id: "ibm-introduction-cloud-computing",
    name: "Introduction to Cloud Computing",
    issuer: "IBM",
    issuerLogo: "IBM",
    category: "Cloud & DevOps",
    issueDate: "2025-04-01",
    credentialId: "IXXO5EXTOGOS",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/IXXO5EXTOGOS",
    status: "Valid",
    featured: true,
  },
  {
    id: "ibm-introduction-software-engineering",
    name: "Introduction to Software Engineering (with Honors)",
    issuer: "IBM",
    issuerLogo: "IBM",
    category: "Professional",
    issueDate: "2025-03-01",
    credentialId: "FYM6PJCZHK8H",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/FYM6PJCZHK8H",
    status: "Valid",
    featured: true,
  },
  {
    id: "hackerrank-sql-basic",
    name: "SQL (Basic)",
    issuer: "HackerRank",
    issuerLogo: "HR",
    category: "Databases",
    issueDate: "2025-02-01",
    credentialId: "BFE3363C261F",
    verifyUrl: "https://www.hackerrank.com/certificates/iframe/bfe3363c261f",
    status: "Valid",
    featured: false,
  },
  {
    id: "datacamp-python-intermediate",
    name: "Python Intermediate",
    issuer: "DataCamp",
    issuerLogo: "DC",
    category: "AI & Data",
    issueDate: "2025-02-01",
    credentialId: "6E3EB7FC075FE8E9507A77A488BC30657B0F4F49",
    verifyUrl:
      "https://www.datacamp.com/completed/statement-of-accomplishment/course/6e3eb7fc075fe8e9507a77a488bc30657b0f4f49",
    status: "Valid",
    featured: false,
  },
  {
    id: "hackerrank-problem-solving-basic",
    name: "Problem Solving (Basic)",
    issuer: "HackerRank",
    issuerLogo: "HR",
    category: "Competitive Coding",
    issueDate: "2024-11-01",
    credentialId: "6A11FED518B0",
    verifyUrl: "https://www.hackerrank.com/certificates/iframe/6a11fed518b0",
    status: "Valid",
    featured: false,
  },
  {
    id: "google-introduction-large-language-models",
    name: "Introduction to Large Language Models",
    issuer: "Google",
    issuerLogo: "G",
    category: "AI & Data",
    issueDate: "2024-07-01",
    credentialId: "9920434",
    verifyUrl:
      "https://www.skills.google/public_profiles/feeed0f9-23c4-448d-a7fa-d7df748ea66d/badges/9920434?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    status: "Valid",
    featured: false,
  },
  {
    id: "google-introduction-generative-ai",
    name: "Introduction to Generative AI",
    issuer: "Google",
    issuerLogo: "G",
    category: "AI & Data",
    issueDate: "2024-07-01",
    credentialId: "9915167",
    verifyUrl:
      "https://www.skills.google/public_profiles/feeed0f9-23c4-448d-a7fa-d7df748ea66d/badges/9915167?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
    status: "Valid",
    featured: false,
  },
  {
    id: "uom-python-programming",
    name: "Python Programming",
    issuer: "University of Moratuwa",
    issuerLogo: "UoM",
    category: "University",
    issueDate: "2024-05-01",
    credentialId: "QVJ37DEWEP",
    verifyUrl: "",
    status: "Valid",
    featured: false,
  },
];

export function formatCertificateDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
