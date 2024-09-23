# Salariscope: Salary Apportionment Calculator

Salariscope is a TypeScript project that calculates apportioned salaries for employees based on their start date and pay cycle. It supports various pay cycle types including weekly, fortnightly, and monthly, as well as custom date ranges.

## Project Structure

```
salariscope/
├── src/
│   ├── index.ts
│   ├── types.ts
│   └── utils.ts
├── tests/
│   └── index.test.ts
├── examples.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- Calculate apportioned salaries for different pay cycles (weekly, fortnightly, monthly)
- Support for custom pay cycle date ranges
- Handling of non-standard working days
- Flexible employment contract definitions

## Prerequisites

- Node.js
- npm

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/iamramtin/salariscope.git
   cd salariscope
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running Tests

To run the test suite:

```
npm test
```

This will execute all the tests defined in the `tests/` directory.

## Running Examples

To demonstrate how to use the salary apportionment calculator, run these examples:

1. Compile the examples:
   ```
   npm run build
   ```

2. Run the compiled JavaScript:
   ```
   node dist/examples.js
   ```

This will output the results of various salary apportionment scenarios, including:
- Monthly salary starting mid-month
- Weekly salary starting mid-week
- Fortnightly salary starting at the beginning of a pay period
- Custom pay cycle range
- Part-time worker with non-standard working days

## Usage

To use the salary apportionment calculator in your own code:

```typescript
import { calculateApportionedSalary } from './src/index.js';
import { EmploymentContract, PayCycleEnum } from './src/types.js';

const contract: EmploymentContract = {
    salary: 5000,
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    startDate: new Date('2023-06-15'), // Starting mid-month
};

const apportionedSalary = calculateApportionedSalary(contract, PayCycleEnum.MONTHLY);
console.log(`Apportioned salary: $${apportionedSalary.toFixed(2)}`);
```

## Docker Support

This project can be run in a Docker container. Here's how to build and run the Docker image:

### Building the Docker Image

To build the Docker image, run the following command in the project root directory:

```bash
docker build -t salariscope .
```

This command builds a Docker image named `salariscope` based on the instructions in the Dockerfile.

### Running the Docker Container

To run the examples in a Docker container, use the following command:

```bash
docker run --rm salariscope
```

This command runs the container and executes the examples, then removes the container after execution.

### Running Tests in Docker

The tests are automatically run during the Docker build process. If you want to run the tests manually in a running container, you can use:

```bash
docker run --rm salariscope npm test
```

### Development with Docker

For development purposes, you can mount your local project directory to the container and run it in interactive mode. This allows you to make changes to your local files and see the results immediately in the container:

```bash
docker run --rm -it -v $(pwd):/usr/src/app salariscope sh
```

Once inside the container, you can run commands like `npm run build`, `npm test`, or `npm start`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.