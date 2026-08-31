# Relational Database Schema Design

Primary Relational Store: **PostgreSQL 16**

## Core Tables
- `users_user`: Centralized identity model with role discriminators.
- `students_studentprofile`: Academic metadata, CGPA, department, graduation year.
- `industries_companyprofile`: Company details, domain, verified status, contact persons.
- `institutions_institution`: College/University accreditation, authorized domains.
- `academicians_facultyprofile`: Department, specialization, research interests, FDP history.
- `skills_skill`: Normalized taxonomy (Technical, Soft, Domain, Aptitude).
- `opportunities_opportunity`: Polymorphic opportunities (Job, Internship, Project, FDP, Consultancy).
- `applications_application`: Application lifecycle state machine and audit timeline.
- `skill_passports_passport`: Cryptographically verifiable student skill transcript.
- `audit_auditlog`: Immutable operational and security logs.
