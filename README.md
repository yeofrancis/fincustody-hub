# 🏦 FinCustody Hub

> A microservices-based Financial Custody Operations Platform built with 
> Docker & Kubernetes — showcasing production-grade container networking 
> and security.

![Docker](https://img.shields.io/badge/Docker-28.x-2496ED?logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-1.35-326CE5?logo=kubernetes)
![Azure](https://img.shields.io/badge/Azure-AKS-0078D4?logo=microsoftazure)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Services](#services)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Container Networking](#container-networking)
- [Security](#security)
- [Deployment](#deployment)
- [Learning Journey](#learning-journey)

---

## 🎯 Overview

FinCustody Hub simulates a real-world **Financial Custody Operations Platform** 
inspired by T24/Global Custody systems used in banking. It demonstrates 
enterprise-grade containerization patterns including:

- ✅ Multi-service Docker architecture
- ✅ Container networking with service discovery
- ✅ Kubernetes orchestration on Azure AKS
- ✅ Network Policies and RBAC security
- ✅ Secrets management and Pod Security Standards
- ✅ Observability with Prometheus and Grafana

> This project is part of a structured learning journey toward 
> Docker Certified Associate (DCA), CKA, CKAD, and CKS certifications.

---

## 🏗️ Architecture

> Architecture diagram coming soon — Phase 2

---

## 🔧 Services

| Service | Description | Port | Technology |
|---|---|---|---|
| **API Gateway** | Single entry point for all services | 8080 | Node.js |
| **Auth Service** | JWT authentication and RBAC | 3001 | Node.js |
| **Securities Service** | Trade instructions and settlement | 3002 | Python |
| **FX Service** | FX deal booking and rate feeds | 3003 | Python |
| **Funding Service** | Cash positions and funding instructions | 3004 | Python |
| **Notification Service** | Alerts and webhook triggers | 3005 | Node.js |

---

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Containerization | Docker 28.x |
| Orchestration | Kubernetes 1.29 / Azure AKS |
| Networking | Docker Bridge Networks, K8s CNI, Network Policies |
| Security | RBAC, Pod Security Standards, Falco, Trivy |
| Monitoring | Prometheus, Grafana |
| Infrastructure | Terraform, Azure |
| CI/CD | GitHub Actions |

---

## 🚀 Getting Started

### Prerequisites
- Docker 20.x or higher
- Docker Compose v2
- kubectl
- Azure CLI (for AKS deployment)

### Run Locally with Docker Compose
```bash
# Clone the repository
git clone https://github.com/yeofrancis/fincustody-hub.git
cd fincustody-hub

# Start all services
docker compose up -d

# Verify all services are running
docker compose ps
```

---

## 🌐 Container Networking

> Detailed networking documentation coming soon — Phase 2

---

## 🔒 Security

> Security architecture documentation coming soon — Phase 5

---

## ☁️ Deployment

> Azure AKS deployment guide coming soon — Phase 3

---

## 📚 Learning Journey

This project was built as part of a structured containerization learning path:

| Phase | Focus | Status |
|---|---|---|
| Phase 1 | Docker Basics — Images, Containers, Dockerfile | 🔄 In Progress |
| Phase 2 | Docker Networking & Docker Compose | ⏳ Upcoming |
| Phase 3 | Kubernetes Core on Azure AKS | ⏳ Upcoming |
| Phase 4 | Container Networking Deep Dive | ⏳ Upcoming |
| Phase 5 | Container Security (CKS) | ⏳ Upcoming |

### Resources Used
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [Learn Docker in a Month of Lunches — Elton Stoneman](https://www.manning.com/books/learn-docker-in-a-month-of-lunches)
- [Kubernetes Up and Running — Burns, Beda, Hightower](https://www.oreilly.com/library/view/kubernetes-up-and/9781098110192/)

---

## 📄 License
MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">Built with ❤️ by <a href="https://github.com/yeofrancis">Francis Yeo</a> | 
Singapore 🇸🇬</p>
