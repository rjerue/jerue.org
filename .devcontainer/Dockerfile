FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Node.js LTS and environment setup
ARG VARIANT="24"
ENV NODE_VERSION=${VARIANT}

RUN su node -c "asdf install nodejs ${NODE_VERSION} || true" 2>/dev/null || true

# Install Node 24 via apt-get if asdf isn't available
RUN apt-get update && apt-get install -y curl ca-certificates gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y nodejs build-essential git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Git LFS so repo hooks run properly
RUN curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash && \
    apt-get install -y git-lfs && \
    git lfs install --system

# Install corepack for pnpm support
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /workspace

# Use default vscode user for Codespaces/devcontainer
# (as .devcontainer/devcontainer.json remoteUser is vscode)
USER vscode

ENV PATH="/home/vscode/.local/bin:/usr/local/bin:${PATH}"
