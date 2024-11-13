This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## AWS infrastructure Design
![AI Chatbot](https://github.com/user-attachments/assets/3cd55ce7-3c29-4ebf-a0c5-877b9a8cb790)
## VPC Setup
![image](https://github.com/user-attachments/assets/aac95f2b-7758-4dbf-9d55-2a36cef23c36)
- VPC CIDR: 10.0.0.0/20
- Subnets: Two public subnets and two private subnets
- Public subnet route table
![image](https://github.com/user-attachments/assets/ede2670b-6157-4af4-ba95-f2c0f19946fb)
- Subnet Associations for public subet
![image](https://github.com/user-attachments/assets/1dc2ac43-fa3e-41cc-a8e8-84a9122b8be0)
- IGW
![image](https://github.com/user-attachments/assets/94fa5805-5751-4a15-99d9-75b7f31ad2bb)
- Private Subnet Route Table
![image](https://github.com/user-attachments/assets/d7b482c8-3922-40a7-a850-6dc8416b8b2b)
- Subent Associations for private subnet
![image](https://github.com/user-attachments/assets/0e532f52-ff3e-4090-8765-f994c44f990e)
## ALB Setup
For the admin dashboard ALB was setup in public subnet. 
- Public Subent 1: eu-north-1a (10.0.8.0/24)
- Public Subent 2: eu-north-1b (10.0.9.0/24)
## Security Group
- Internet-facing ALB Security Group
![image](https://github.com/user-attachments/assets/0ab6927c-4ba8-4f32-b7cc-df066240f22c)
- Inbound rules
![image](https://github.com/user-attachments/assets/c5e81335-246c-41c0-ab0a-35a5b5bf3fc8)
- Internal-facing ALB security Group
![image](https://github.com/user-attachments/assets/cd16af55-95e1-4d69-b3a1-193f96a6f886)
- Inbound Rules
![image](https://github.com/user-attachments/assets/f7bcef6a-a93c-42d4-adab-d94ddba6b107)
- Targate Group
![image](https://github.com/user-attachments/assets/c177bb3c-16db-48a3-8ffc-50d609664d5d)
![image](https://github.com/user-attachments/assets/fa8eecb0-2099-4866-833f-ae13d57deae6)
## ECS Cluster 
![image](https://github.com/user-attachments/assets/cc79ba36-1351-4466-913f-893c935b6c99)
- Note: During creation ECS cluster one namespace is being created by default. It's mainly need for service connect
- ECS Services
![image](https://github.com/user-attachments/assets/3a0ca32f-9d52-478b-ab6c-957862c60907)
- ECS Service Connect
![image](https://github.com/user-attachments/assets/5bc410a3-809e-4e97-8f59-4c77706419cd)
![image](https://github.com/user-attachments/assets/4de304e8-2af7-4f51-b930-e94f77f1ce8a)
- Note: The Service connect is mainly used for communicating between defferent tasks
