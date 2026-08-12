# Technical Test - QA Automation (Agoda Hotel Search)

This repository contains the automated test solution for the **Amaris Consulting QA Automation Technical Test**. It automates the hotel price search scenario on [Agoda](https://www.agoda.com/) using **Playwright**, **TypeScript**, **Cucumber BDD**, and the **Page Object Model (POM)** design pattern.

---

## 📋 Exercise Requirements

- **Target Website**: [https://www.agoda.com/](https://www.agoda.com/)
- **Hotel Destination**: `Muong Thanh Saigon Centre Hotel`
- **Check-in Date**: `Current Date + 2`
- **Check-out Date**: `Current Date + 3`
- **Occupancy**: `1 room`, `4 adults`, `2 children`
- **Action**: Search and select the first available hotel option.
- **Assertion**: Verify that the hotel price is visibly displayed.

---

## 🛠️ Tools & Frameworks

- **Automation Framework**: Playwright (`@playwright/test`)
- **BDD Framework**: Cucumber (`@cucumber/cucumber`)
- **Language**: TypeScript (`^5.0.0`)
- **Design Pattern**: Page Object Model (POM) & Custom Cucumber World
- **Code Formatter**: Prettier (`^3.2.5`)
- **CI/CD**: GitHub Actions (`.github/workflows/playwright.yml`)
- **Reporter**: Cucumber HTML Reporter (`reports/cucumber-report.html`)

---

## 📂 Project Structure

```text
technical-test-agoda/
├── .github/
│   └── workflows/
│       └── playwright.yml            # GitHub Actions CI/CD workflow configuration
├── src/
│   ├── core/
│   │   ├── custom-world.ts           # Cucumber Custom World for thread-safe scenario isolation
│   │   └── hook.ts                   # Cucumber lifecycle hooks (Browser launch, context, teardown)
│   ├── features/
│   │   └── search-price.feature      # Gherkin BDD Feature scenario
│   ├── pages/
│   │   ├── AgodaHomePage.ts          # POM for Agoda Home Page & Search controls
│   │   ├── AgodaSearchResultsPage.ts # POM for Search Results Page & verification
│   │   └── AgodaHotelDetailPage.ts   # POM for Hotel Detail Page & room price assertion
│   ├── steps/
│   │   └── search-price.steps.ts     # Cucumber Step Definitions
│   └── utils/
│       └── DateHelper.ts             # Dynamic date calculation utility with DateFormatPattern enum
├── reports/                          # Generated test reports (HTML & JSON)
│   ├── cucumber-report.html
│   └── cucumber-report.json
├── .gitignore                        # Git ignore patterns
├── .prettierrc                       # Prettier code formatting rules
├── .prettierignore                   # Prettier ignore patterns
├── cucumber.json                     # Cucumber runner configuration file
├── tsconfig.json                     # TypeScript compiler configuration
├── package.json                      # Node.js dependencies and npm scripts
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18` or higher
- **npm**: `v9` or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tye2002/technical-test-agoda.git
   cd technical-test-agoda
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Playwright browser binaries:
   ```bash
   npx playwright install chromium
   ```

---

## 🧪 Running Tests & Reports

### Run Tests (Headed Mode)

To execute the test suite with browser UI visible:

```bash
npm test
```

### Run Tests (Headless Mode in Bash)

To execute the test in headless mode:

```bash
HEADLESS=true npm test
```

### View Test Report

To open the generated HTML test report in your browser:

```bash
npm run report
```

---

## 🎨 Code Formatting (Prettier)

To format all source code files according to the project's Prettier rules:

```bash
npm run format
```

To check for formatting issues without writing changes:

```bash
npm run format:check
```

---

## 📑 Test Case Flow

1. **Given**: User navigates to the Agoda homepage (`https://www.agoda.com/`).
2. **When**: User enters `"Muong Thanh Saigon Centre Hotel"` into the destination search field.
3. **And**: User selects the check-in date (`Current Date + 2`) and check-out date (`Current Date + 3`).
4. **And**: User configures occupancy to `1 room`, `4 adults`, and `2 children`.
5. **And**: User clicks the Search button.
6. **And**: User selects the first available hotel option from the search results.
7. **Then**: Asserts that the hotel price is visibly displayed.
