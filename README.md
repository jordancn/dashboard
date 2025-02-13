# Financial Dashboard

A modern financial dashboard application built with React, TypeScript, Next.js, GraphQL, Apollo, and Storybook. The application follows atomic design principles for component organization and provides insights into financial transactions and budgeting.

<!-- A [Live Demo](https://dashboard.jordancn.dev) is available. -->

## 🚀 Features

- Transaction tracking and categorization
- Budget management and monitoring
- Financial insights and analytics
- Entity-based organization (personal, business, etc.)
- Responsive design for mobile and desktop
- Interactive component documentation via Storybook

## Work in Progress

- [ ] Chat with financial data (AI/LLM)

## Planned Features

- [ ] API for external integrations (Plaid)
- [ ] Authentication
- [ ] User management
- [ ] Entity management
- [ ] Transaction management
- [ ] Budget management
- [ ] Analytics
- [ ] Reporting

## 🛠️ Technology Stack

- **Frontend**:

  - Next.js
  - React
  - Apollo Client for GraphQL
  - TypeScript
  - CSS Modules
  - Storybook

- **Backend**:
  - Node.js
  - GraphQL
  - Prisma ORM
  - PostgreSQL

## 📦 Project Structure

The project is in a monorepo structure with the following packages:

- `client`: The React frontend application
- `server`: The GraphQL server

### Client

The project follows atomic design methodology as referenced in Brad Frost's [Atomic Design](https://atomicdesign.bradfrost.com):

- `Atoms/`: Basic building blocks (buttons, text, icons)
- `Molecules/`: Simple combinations of atoms
- `Organisms/`: Complex combinations of molecules
- `Templates/`: Page-level layouts
- `Providers/`: React context providers
- `Utils/`: Helper functions and utilities

### Server

The server is a GraphQL API built with Apollo Server. It uses Prisma ORM to interact with the PostgreSQL database. Resolvers are scoped, queries are batched and cached via DataLoader to ensure efficient data retrieval.

## 🏃‍♂️ Getting Started

### Install dependencies

#### Client

```bash
client$ npm install --legacy-peer-deps
```

Note: Legacy peer dependencies are required for the project to build as one of the packages required for lazily-loaded scrolling (react-swipeable-views) is not compatible with the latest version of React.

#### Server

```bash
server$ npm install
```

#### Set up environment variables

- Copy `env.docker` to `.env.local`
- Configure necessary environment variables

#### Start development servers

```bash
client$ npm run dev
```

This will start:

- Next.js development server
- GraphQL codegen in watch mode
- CSS Modules compilation
- Storybook development server

```bash
server$ npm run dev
```

This will start:

- GraphQL server

## 🏗️ Building for Production

```bash
client$ npm run build
```

This command will:

- Generate GraphQL types
- Compile CSS modules
- Build Next.js application
- Build Storybook static files

```bash
server$ npm run build
```

This command will:

- Build GraphQL server

## 📊 Database Schema

The application uses PostgreSQL with Prisma ORM. The schema is defined in [server/prisma/schema.prisma](server/prisma/schema.prisma).

## GraphQL Schema

The GraphQL schema is defined in [server/schema/schema.gql](server/schema/schema.gql).

## 🧪 Testing and Quality

- Storybook for component documentation and testing
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting

## 📝 Development Guidelines

1. Follow atomic design principles
2. Write stories for all components
3. Maintain type safety with TypeScript
4. Use CSS modules for styling
5. Document component props and usage

## 🚀 Deployment

The project includes Docker support with multi-stage builds and is deployed via GitHub Actions (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)). Currently deployment is via Docker containers running on a Linode VPS but can be easily modified to run on any other VPS or cloud provider.

## 📄 License

The project is licensed under the [MIT License](LICENSE).
