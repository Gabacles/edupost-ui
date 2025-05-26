# EduPost UI

**EduPost UI** is a frontend application built with **Next.js 15**, designed as a graphical interface for managing and visualizing posts. The application supports **authentication and role-based access**, where:

- **Students** can only **view** posts.
- **Teachers** can **view, create, edit, and delete** posts.

The project is deployed using **Docker** and hosted on **Render**.

---

## Architecture

The application is structured following the App Router convention introduced in Next.js 13+, using server components, route grouping, and enhanced layouts. The frontend communicates with an external API **through server-side functions**, ensuring secure and efficient data handling.

### Folder Structure

```bash
src/
├── app/
│   ├── (public)/          # Public routes (e.g., login, register)
│   ├── (private)/         # Protected routes (authenticated area)
│   ├── api/               # Next.js API routes (used to proxy external API calls through the server)
│   ├── components/        # Shared UI components
│   ├── hooks/             # Custom React hooks (e.g., useLogin)
├── public/                # Static assets
├── styles/                # Global styles and theme settings
```
### Routing
The application uses grouped routes for public and private sections:

- Routes under (public) are accessible without authentication (e.g., /sign-in, /register).

- Routes under (private) require authentication and user role validation.

- The src/app/api directory is used to define Next.js route handlers. These act as a proxy, allowing the frontend to call the backend API server-side, keeping credentials secure and preventing exposure of sensitive data in the client.

### Technologies
- **Next.js 15**: App Router architecture with server/client components.

- **React 19**: For building the UI.

- **TypeScript**: Type-safe codebase.

- **Tailwind CSS**: Utility-first CSS framework for styling.

- **React Hook Form**: For form state and validation.

- **Zod**: Schema-based form validation.

- **Docker**: Containerized development and deployment.

- **Render**: Hosting platform.

---

### Initial Setup
**1. Clone the Repository**
```bash
git clone https://github.com/your-username/edupost-ui.git
cd edupost-ui
```
**2. Install Dependencies**
```bash
npm install
# or
yarn install
```
**3. Environment Variables**<br>
Create a .env file by copying the .env.example provided:
```bash
cp .env.example .env
```
Fill in the environment variables with the necessary values, including:

- The URL of the backend API

- Authentication secrets

- Any required third-party keys

**4. Run the Application**
```bash
# development
npm run dev

# production build
npm run build
npm start
```
The application will start by default on http://localhost:3000

---

### Docker Deployment
You can run the application using Docker:

**1. Build the Docker image**
```bash
docker build -t edupost-ui .
```
**2. Run the Docker container**
```bash
docker run -p 3000:3000 --env-file .env edupost-ui
```
This will start the frontend on port 3000.

---

### Role-Based Access Control (RBAC)
Access to pages and features is restricted based on user roles:

- Students

  - Can only view posts.

- Teachers

  - Can create, edit, delete, and view posts.

Access checks are enforced client-side and via the server, depending on the route. For protected pages, middleware ensures the user is authenticated before rendering the page.

---

### Component Architecture
The application is built using a shared component approach:

- components/: Houses UI components such as buttons, forms, post cards, etc.

- hooks/: Includes reusable hooks like useLogin, useAuth, etc.

- All components follow functional and modular design principles.

---

### API Communication
Instead of calling the external API directly from the browser, the application uses Next.js route handlers in src/app/api to proxy requests server-side. This approach offers:

- Better security (secrets stay on the server)

- Easier handling of tokens/cookies

- Avoids CORS issues

Example flow:

1. Frontend makes a fetch to /api/posts.

2. Next.js handles the request server-side and calls the external API.

3. The response is returned to the frontend.

---

### Version
- Node.js: v20

- Next.js: 15

- TypeScript: 5+

- React: 19

---

### Environment Variables
You must provide a valid .env file. A template is provided as .env.example.

Some of the required variables may include:
```ini
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```
Update the variables as per your development and production environments.

--- 

#### Future Improvements
- Add unit and integration tests using Jest and React Testing Library

- Improve accessibility (a11y)

- Enhance responsive design for mobile/tablet