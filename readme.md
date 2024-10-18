# Rule Engine with AST ⚖️

## Overview

The **Rule Engine with AST** is a versatile application designed to determine user eligibility based on various attributes such as age, department, income, and spending. This system utilizes an Abstract Syntax Tree (AST) to represent conditional rules, allowing for dynamic creation, combination, and modification of these rules.

<img width="1440" alt="Screenshot 2024-10-18 at 1 08 28 AM" src="https://github.com/user-attachments/assets/538cafcf-cc76-4dd3-98de-c249f8ab84e3">
<div align="center">
<img width="931" alt="Screenshot 2024-10-18 at 1 08 13 AM" src="https://github.com/user-attachments/assets/07db29a6-ec67-4674-be1a-4c660acc9397">
</div>

## Features 🚀

### 1. Rule Creation and Management
- **Dynamic Rule Creation**: Users can create rules using a simple UI, which are then represented as AST nodes.
- **Combination of Rules**: The system allows for the combination of multiple rules into a single AST, optimizing performance and efficiency.

### 2. Abstract Syntax Tree (AST) Representation 🌳
- **Flexible Data Structure**: The application utilizes a flexible data structure to represent rules as nodes, allowing for:
  - **Node Types**: Differentiation between operators (AND/OR) and operands (conditions).
  - **Child References**: Each node can reference left and right children for complex rule construction.
  
### 3. Rule Evaluation 🔍
- **Evaluate Rules Against User Data**: The system evaluates the combined AST against user data (e.g., age, department, salary) to determine eligibility.
- **Immediate Feedback**: Users receive immediate feedback based on the evaluation results.

## Application Structure 📂

The Rule Engine with AST application is divided into three main components:

### 1. Backend (Node.js + Express)
- **API for Rule Management**: Provides endpoints for creating, combining, and evaluating rules.
- **Database Interaction**: The backend interacts with a database to store rules and application metadata.

### 2. Frontend (Angular + Bootstrap)
- **User Interface**: Offers an intuitive interface for users to input their rules and view results.
- **Responsive Design**: Ensures accessibility across various devices.

### 3. Data Structure
- **Node Structure**: Each rule is represented as a Node with the following fields:
  - `type`: A string indicating the node type (e.g., "operator" for AND/OR, "operand" for conditions).
  - `left`: A reference to another Node (left child).
  - `right`: A reference to another Node (right child for operators).
  - `value`: An optional value for operand nodes (e.g., number for comparisons).

## API Design 📡

1. **create_rule(rule_string)**: This function takes a string representing a rule and returns a Node object representing the corresponding AST.

2. **combine_rules(rules)**: This function takes a list of rule strings and combines them into a single AST, returning the root node of the combined AST.

3. **evaluate_rule(JSON data)**: This function evaluates the combined rule's AST against provided attributes and returns `True` if the user meets the criteria, or `False` otherwise.

## Key Technologies 🛠️
- **Node.js**: For the backend server.
- **Express.js**: As the web framework for handling API requests.
- **MongoDB**: To store rules and application metadata.
- **Angular**: For building the frontend UI.
- **Bootstrap**: For responsive and modern styling.

## Sample Rules

- **Rule 1**: 
  ```
  ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
  ```
- **Rule 2**: 
  ```
  ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
  ```

## Installation Instructions 📥

For detailed installation instructions and setup, refer to the following repositories:

- [Backend Installation Guide](https://github.com/hitaarthh/Rule-Engine-with-AST/tree/main/rule-engine-ast-backend)
- [Frontend Installation Guide](https://github.com/hitaarthh/Rule-Engine-with-AST/tree/main/rule-engine-ast-frontend)




