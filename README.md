# Rule Engine with AST

## Objective
Develop a simple 3-tier rule engine application consisting of a simple UI, API, and Data Storage. This rule engine allows users to define rules and evaluate them against data based on an Abstract Syntax Tree (AST).

## Application Design

### Components
1. **Simple UI**: A user interface where users can define and view rules.
2. **API**: REST API for managing rules, evaluating rules, and fetching results.
3. **Data Storage**: A database for storing rules and application metadata.

## Database Choice
For storing rules and application metadata, we recommend using **MongoDB** due to its flexible document structure, which is suitable for storing rule data and AST nodes as JSON objects. Alternatively, you can use **PostgreSQL** if you prefer a relational approach.

## Schema Design

### MongoDB (Document-based)
```json
{
  "ruleId": "rule1",
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
  "ast": {
    "type": "operator",
    "value": "AND",
    "left": {
      "type": "operator",
      "value": "OR",
      "left": {
        "type": "operand",
        "value": {
          "attribute": "age",
          "operator": ">",
          "value": 30
        }
      },
      "right": {
        "type": "operand",
        "value": {
          "attribute": "department",
          "operator": "=",
          "value": "Sales"
        }
      }
    },
    "right": {
      "type": "operator",
      "value": "OR",
      "left": {
        "type": "operand",
        "value": {
          "attribute": "salary",
          "operator": ">",
          "value": 50000
        }
      },
      "right": {
        "type": "operand",
        "value": {
          "attribute": "experience",
          "operator": ">",
          "value": 5
        }
      }
    }
  }
}

Features
Dynamic Rule Creation: Users can define rules using simple logical expressions, which are converted into AST structures.
Rule Evaluation: The engine evaluates user data against the defined rules to determine eligibility.
Combine Rules: Multiple rules can be combined into a single AST for efficiency.
Data Validation: Ensure that the rule evaluation process handles valid data types and conditions.
Error Handling: Handles invalid rule strings or data formats.
Architecture
This is a 3-tier application comprising:

Frontend (UI): A simple web interface to allow users to input and manage rules.
API Layer: Handles communication between the frontend and backend for rule creation, combination, and evaluation.
Backend (Data): Stores rule definitions, user attributes, and AST data in a database for persistence.
Application Workflow
1. Rule Creation:
A rule is entered as a string (e.g., "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)").
The create_rule API processes the string and generates an AST representing the logic.
2. Rule Combination:
Multiple rules can be combined into one AST using the combine_rules function.
Optimizations are applied to minimize redundant checks during rule combination.
3. Rule Evaluation:
User attributes (e.g., age, department, salary) are evaluated against the rules.
The evaluate_rule function processes the combined AST and checks if the provided user data satisfies the rule conditions.
Data Structure
The rules are represented as Abstract Syntax Trees (AST) with the following data structure:

class Node:
    def __init__(self, node_type, left=None, right=None, value=None):
        self.type = node_type  # "operator" for AND/OR, "operand" for conditions
        self.left = left  # Left child node
        self.right = right  # Right child node for operators
        self.value = value  # Value for operand nodes (e.g., comparison)
Operator Node: Contains logical operators (AND, OR) to combine conditions.
Operand Node: Represents conditions to be checked (e.g., age > 30, salary > 50000).
API Endpoints
1. Create Rule
Endpoint: /create_rule

Method: POST

Description: Accepts a rule string and converts it into an AST representation.

Payload Example:

{
  "rule": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
}
Response: AST representation of the rule.
2. Combine Rules
Endpoint: /combine_rules

Method: POST

Description: Combines multiple rules into a single AST.

Payload Example:

{
  "rules": [
    "((age > 30 AND department = 'Sales'))",
    "((salary > 50000 OR experience > 5))"
  ]
}
Response: AST of the combined rule.
3. Evaluate Rule
Endpoint: /evaluate_rule

Method: POST

Description: Evaluates the combined rule AST against a user’s data.

Payload Example:

{
  "data": {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  },
  "rule_ast": <AST structure from create_rule or combine_rules>
}
Response: True or False based on the evaluation.
Database Schema
The rules and metadata are stored in a relational database (e.g., SQLite, PostgreSQL). The following is the schema for storing the AST and related data:

Tables:
Rules Table: Stores rule strings and corresponding AST.

Columns: - id (Primary Key) - rule_string (Text) - ast_data (Serialized JSON of the AST)
User Data Table: Stores user attributes for evaluation.

Columns: - id (Primary Key) - user_attributes (JSON data of user attributes like age, department, salary, etc.)
Usage Instructions
Prerequisites
Python 3.x
Required Python Libraries (Flask, SQLAlchemy, etc.)
Database (SQLite/PostgreSQL)
Installation
Clone the repository:

git clone https://github.com/yourusername/rule-engine-ast.git

Install required dependencies:

pip install -r requirements.txt

Run the application:

python app.py

Access the application via localhost:5000.

Directory Structure
/rule-engine-ast
│
├── /frontend              # Contains UI code (HTML/CSS/JS)
├── /api                   # API layer for rule creation, combination, and evaluation
├── /backend               # Backend logic and database models
├── app.py                 # Main application entry point
├── README.md              # Project documentation
└── requirements.txt       # List of required dependencies
Test Cases
Test Rule Creation:

Input: "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
Output: Correct AST structure representing the rule.
Test Rule Combination:

Input: Two rules:
"age > 30 AND department = 'Sales'"
"salary > 50000 OR experience > 5"
Output: Combined AST with optimized checks.
Test Rule Evaluation:

Input: JSON user data {"age": 35, "department": "Sales", "salary": 60000, "experience": 3}
Output: True
Bonus Features
Error Handling: Ensures proper handling of invalid rule strings or missing data formats.
Rule Modification: Allows changing operators, operand values, or sub-expressions dynamically within the AST.
Future Enhancements
Support for user-defined functions within rules for advanced conditions.
Integration with external services to trigger actions based on rule evaluations.
Extend rules to support more complex data types (e.g., date comparisons, regex).
License
This project is licensed under the MIT License. See LICENSE for more details.

This README provides all the essential information needed to understand, install, and run the application while also giving an overview of the codebase structure and how to contribute or extend the system further.

About
No description, website, or topics provided.
Resources
 Readme
 Activity
Stars
 0 stars
Watchers
 1 watching
Forks
 0 forks
Report repository
Releases
No releases published
Packages
No packages published
Languages
Python
100.0%
Footer
