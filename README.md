# BeyondChats Assignment

## About this submission
This repository contains my submission for the BeyondChats take-home assignment.

I approached this task with the goal of building a clear, understandable end-to-end system within the given 6–8 hour time limit, rather than trying to over-engineer or perfectly polish every part.

The project is structured as a single monolithic repository and includes:
- A Laravel backend
- A NodeJS worker for LLM-based content updates
- A React frontend for displaying articles

---

## How the system works (high level)

React Frontend  
↓  
Laravel APIs (store & serve articles)  
↑  
NodeJS Worker (scraping + LLM rewriting)

Each part is kept intentionally simple so the overall data flow and responsibilities are easy to follow.

---

## Phase 1 – Laravel Backend
- Scrapes the 5 oldest articles from the BeyondChats blog
- Stores them in a database
- Exposes basic CRUD APIs to manage articles

The focus here was correctness, clean structure, and clear API boundaries rather than adding extra features.

---

## Phase 2 – NodeJS Worker
- Fetches the latest article from the Laravel API
- Finds similar reference articles (simplified for reliability)
- Scrapes their main content
- Uses an LLM to rewrite and enrich the original article
- Publishes the updated version back to the backend with references

### Why the Google search step is simplified
Scraping Google search results directly is fragile and often blocked by CAPTCHAs.
Given the time constraints, I chose to simplify this part and focus on demonstrating the full enrichment pipeline instead.

---

## Phase 3 – React Frontend
- Fetches articles from the backend APIs
- Displays both original and AI-updated articles
- Clearly indicates which content is generated

The UI is intentionally minimal to keep the focus on data flow and integration.

---

## Local setup
Due to system and time constraints, the project was not fully executed locally.
However, each part of the system is structured to be runnable independently in a suitable environment.

---

## Trade-offs and assumptions
- Google search scraping is simplified for stability
- No authentication or admin dashboard
- Minimal UI styling
- Priority given to architecture and clarity over deployment polish

---

## What I would improve with more time
- Background jobs for scraping and LLM processing
- Better content extraction logic
- Authentication and admin controls
- Fully automated deployments

---

## Final note
This submission reflects how I normally approach problems when time is limited:
focus on the core flow, make reasonable trade-offs, and leave clear room for improvement.
