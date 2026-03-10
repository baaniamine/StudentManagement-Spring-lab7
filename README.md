# Student Management API

A simple REST API built with Spring Boot for managing student records.

## Demo


https://github.com/user-attachments/assets/4904e3b6-eceb-4a8e-8792-558c11417753


https://github.com/user-attachments/assets/87dace05-0d6b-4172-94a2-b04c7db7ab75





## Tech Stack

- Java + Spring Boot
- Spring Data JPA + Hibernate
- MySQL
- Swagger UI

## Getting Started

### Prerequisites
- Java 17+
- MySQL running on `localhost:3306`
- A database named `studentdb` must exist

### Run the app
```bash
mvn spring-boot:run
```

The app starts on `http://localhost:8080`

### Swagger UI
```
http://localhost:8080/swagger-ui/index.html
```

## API Endpoints

| Method | URL | Description | Response |
|--------|-----|-------------|----------|
| `POST` | `/students/Create` | Create a new student | 201 Created |
| `GET` | `/students/All` | Get all students | 200 OK |
| `GET` | `/students/{id}` | Get student by ID | 200 / 404 |
| `PUT` | `/students/update/{id}` | Update a student | 200 / 404 |
| `DELETE` | `/students/delete/{id}` | Delete a student | 204 / 404 |
| `GET` | `/students/count` | Count all students | 200 OK |

## Example Request

**POST** `/students/Create`

```json
{ "nom": "Dupont", "prenom": "Jean", "dateNaissance": "2000-05-15" }
```

## Student Model

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Auto-generated |
| `nom` | String | Last name |
| `prenom` | String | First name |
| `dateNaissance` | LocalDate | Date of birth (YYYY-MM-DD) |
