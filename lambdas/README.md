## Lambdas Overview
### V1 APIs
This folder contains AWS Lambda functions for a simple Coffee Shop services backed by DynamoDB.  
Each subfolder represents one Lambda, packaged independently.

- **`get/`**: Read all or specific coffee items based on the endpoint triggered from the UI.
- **`post/`**: Create a new coffee item.
- **`put/`**: Update an existing coffee item.
- **`delete/`**: Delete a coffee item.

---

## Deployment Notes

- **Packaging**: Packaging: Each Lambda module must be zipped and uploaded directly in the AWS Console to experience the deployment process from the console.
- **Future improvements**:
  - Use **Lambda layers** to avoid duplicate dependencies across functions.
  - Use the **Serverless Framework** (or similar IaC tools) to automate creation and management of AWS resources instead of manual setup in the console.
