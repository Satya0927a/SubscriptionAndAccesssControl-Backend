# Subscription-Based Access Control Backend
A backend system that implements subscription plans, access control, and usage limits, which is the heart of all the SaaS products.
This project tries to impliment all that, Designed to work independently of frontend and payment providers.

## Overview
This project models how real SaaS products control feature access based on:
- user subscriptions
- plan permissions
- usage limits
- time-based validity

## Core Concepts
- User → identity only
- Plan → permissions & limits // set by buisness logics
- Subscription → connects user and plan over time, tracks usage

## Key Features
- JWT authentication
- Role-based admin routes
- Plan-based access control
- Usage tracking with atomic updates
- Subscription upgrade logic
- Simulated AI endpoint enforcing limits
- Subscription Rules
- Free plan has no expiry
- Paid plans expire after 1 month
- Upgrades apply immediately (no proration)
- Payment integration is simulated

## Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- JWT
- bcrypt

## To run this locally
```
git clone https://github.com/Satya0927a/SubscriptionAndAccesssControl-Backend.git

//open the folder
npm install

//before running add an .env to the main directory with the following fields
MONGO_URI = your mongodb uri
SECRET = your secret string, will be used by the jwt to <any>

//after setting up the .env run the project
npm run dev
```

## Routes
- User routes
  - POST /api/user/create => to create new user 
  - POST /api/user/login => login user
  - GET /api/subscription => to get the subscription details of the user
  - PATCH /api/subscription => to update the subscription plan, coz not real payment is invloved assumes the payment is success
- Admin routes
  - POST /api/plan => to create a new plan
- Public routes
  - GET /api/plan => to get all the plan details available
- App routes
  - POST /api/app/gpt => to talk to chatbot
  - POST /api/app/imagegen => to generate image
  - POST /api/app/videogen => to genrate video
