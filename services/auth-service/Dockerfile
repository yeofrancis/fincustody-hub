# ============================================================
# FinCustody Hub - Auth Service
# ============================================================

# Stage 1: Base image
# We use the official Node.js Alpine image
# Alpine is a minimal Linux distribution - very small and secure
# Think of this like choosing the leanest possible server spec
FROM node:18-alpine

# Add metadata labels to our image
# Think of this like the header on a SWIFT message - identifies the source
LABEL maintainer="Francis Yeo <francis.yeo.wk@gmail.com>"
LABEL service="auth-service"
LABEL version="1.0.0"
LABEL description="FinCustody Hub Authentication Service"

# Set working directory inside the container
# All subsequent commands run from this directory
WORKDIR /app

# Copy package files FIRST - before copying application code
# This is a critical layer caching optimization
# If your code changes but packages don't, Docker reuses this cached layer
COPY package*.json ./

# Install production dependencies only
# --omit=dev means we don't install development tools in production
# Smaller image = smaller attack surface = better security
RUN npm install --omit=dev

# Copy application source code
# This happens AFTER npm install for layer caching reasons
COPY src/ ./src/

# Create a non-root user to run the application
# NEVER run containers as root - this is a critical security practice
# Think of it like a staff member with minimum required access - not admin
RUN addgroup -S fincustody && adduser -S authuser -G fincustody

# Switch to non-root user
USER authuser

# Document which port the service listens on
# EXPOSE is documentation only - actual port mapping happens at runtime
EXPOSE 3001

# Health check instruction
# Kubernetes and Docker use this to monitor container health
# Like your operations system status light - checked every 30 seconds
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start the application
# CMD runs when container starts - not during build
CMD ["node", "src/app.js"]

# ====================================================================== #

# 🧠 Understanding Every Line

# Let me explain the key decisions we made:

# ### Why `node:18-alpine` and not just `node`?

# | Image | Size | Security |
# |---|---|---|
# | `node:latest` | ~1GB | Many unnecessary packages |
# | `node:18` | ~900MB | Still large |
# | `node:18-alpine` | ~180MB | Minimal, lean, secure |

# > **Analogy:** Using `node:latest` is like hiring a staff member who comes with every certification ever — most of which you'll never need. `alpine` is hiring exactly the right person with only the skills the job requires. Less overhead, less risk.

# ---

# ### Why `COPY package*.json ./` BEFORE `COPY src/`?

# This is the **layer caching trick** — one of the most important Dockerfile optimizations:
# ```
# Layer 1: FROM node:18-alpine        ← rarely changes
# Layer 2: COPY package*.json         ← changes only when you add packages
# Layer 3: RUN npm install            ← cached if Layer 2 unchanged
# Layer 4: COPY src/                  ← changes every time you edit code

# =========================================================================================== #

# If you change only your application code (Layer 4), Docker reuses Layers 1-3 from cache. npm install doesn't run again — saving minutes on every build.

# Analogy: Like my settlement batch processing — you don't reprocess already-settled trades just because new ones came in. You only process what's new.

