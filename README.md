# ROLEMET - AI Resume Strength Analyzer

A responsive React.js frontend for a Shopify-based e-commerce platform featuring dynamic product grids, category filtering, and seamless user experience for sneakers, bags, and accessories.

---

## Features

### 1. **Responsive Product Grids**
- Displays sneakers, bags, and accessories in a clean, mobile-friendly layout.

### 2. **Category Filtering**
- Allows users to filter products by category for easier navigation.

### 3. **Dynamic UI Components**
- Interactive buttons, modals, and carousels for an engaging shopping experience.

### 4. **Seamless Shopify Integration**
- Works smoothly with backend Shopify APIs for product data and inventory.

### 5. **User-Friendly Interface**
- Intuitive design ensuring easy browsing and shopping for all users.

### 6. **Performance Optimization**
- Efficient React.js rendering for fast load times and smooth interactions.
---

## Technology Stack

### **Frontend**
- **React**: Used to create a responsive and dynamic user interface.
- **Tailwind CSS**: For styling components with a modern and consistent look.
- **React Router**: Enables seamless navigation between different pages.
- **Axios / Fetch API**: For communicating with Shopify backend APIs.
  
### **Backend**
- **Shopify API**: To fetch product, category, and inventory data.

---

## Installation and Setup

### Prerequisites
- **Node.js** (v16+)
- **npm** or **yarn**
- **AstraDB Account**

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prem-d-25/tea-insights.git
   cd tea-insights
   ```

2. **Install Dependencies**
   - For the frontend:
     ```bash
     cd client
     npm install
     ```
   - For the backend:
     ```bash
     cd server
     npm install
     ```

3. **Set Up AstraDB**
   - Create an account on [AstraDB](https://www.datastax.com/astra).
   - Set up a vector database and update the configuration in the backend.

4. **Configure LangFlow**
   - Install and set up LangFlow for natural language understanding.
   - Update the API endpoint in the backend configuration.

5. **Run the Application**
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm run dev
     ```

---

## Usage

1. **Upload Resume**:
   - Navigate to the homepage and upload your Resume.
   - Wait for the file to be processed.

2. **View Score and Suggestions**:
   - Access the score and suggestions generated based on your resume and job description.

3. **Interact with the AI Chatbot**:
   - Ask questions about your data through the chatbot interface to get deeper insights.

---

## Folder Structure
```
project-root
├── client
│   ├── src
│   │   ├── component
|   |   ├── pages
|   |   ├── router
|   |   ├── store
│   │   └── App.js
├── server
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── router
│   ├── utils
│   ├── validator
│   └── server.js
├── README.md
└── package.json
```
---


