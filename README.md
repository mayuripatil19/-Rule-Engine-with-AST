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

Sample Rules
Rule 1: ((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
Rule 2: ((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)
Data Structure for AST
The AST is represented as a tree structure where each node contains information about the rule components:

Node Structure
type: String indicating the node type ("operator" for AND/OR, "operand" for conditions).
left: Reference to another Node (left child).
right: Reference to another Node (right child for operators).
value: Optional value for operand nodes (e.g., number for comparisons).
Example:
python
Copy code
class Node:
    def __init__(self, type, left=None, right=None, value=None):
        self.type = type  # "operator" or "operand"
        self.left = left
        self.right = right
        self.value = value  # Only used for operands
API Design
1. create_rule(rule_string)
Description: This function takes a string representing a rule and returns a Node object representing the corresponding AST.
Input: A rule string (e.g., "age > 30 AND department = 'Sales'").
Output: A Node representing the AST.
