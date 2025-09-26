"use client";

export interface GitHubSyncConfig {
  repo: string;
  branch: string;
  token: string;
  autoSync: boolean;
}

export class GitHubSyncManager {
  private config: GitHubSyncConfig;
  private baseUrl: string = 'https://api.github.com';

  constructor(config: GitHubSyncConfig) {
    this.config = config;
  }

  async syncContent(content: any, path: string, message: string) {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.config.repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          content: btoa(JSON.stringify(content, null, 2)),
          branch: this.config.branch,
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GitHub sync failed:', error);
      throw error;
    }
  }

  async getContent(path: string) {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.config.repo}/contents/${path}?ref=${this.config.branch}`, {
        headers: {
          'Authorization': `token ${this.config.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return JSON.parse(atob(data.content));
    } catch (error) {
      console.error('GitHub fetch failed:', error);
      throw error;
    }
  }

  async createBranch(branchName: string, fromBranch: string = this.config.branch) {
    try {
      // Get the latest commit SHA
      const refResponse = await fetch(`${this.baseUrl}/repos/${this.config.repo}/git/refs/heads/${fromBranch}`, {
        headers: {
          'Authorization': `token ${this.config.token}`,
        },
      });

      const refData = await refResponse.json();
      const sha = refData.object.sha;

      // Create new branch
      const response = await fetch(`${this.baseUrl}/repos/${this.config.repo}/git/refs`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: sha,
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Branch creation failed:', error);
      throw error;
    }
  }

  async createPullRequest(title: string, body: string, head: string, base: string = this.config.branch) {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${this.config.repo}/pulls`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          body: body,
          head: head,
          base: base,
        }),
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Pull request creation failed:', error);
      throw error;
    }
  }
}

export const createGitHubSyncManager = (config: GitHubSyncConfig) => {
  return new GitHubSyncManager(config);
};

export const validateGitHubToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
};

export const getGitHubRepoInfo = async (repo: string, token: string) => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: {
        'Authorization': `token ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Repo info fetch failed:', error);
    throw error;
  }
};