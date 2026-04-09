import { execFileSync } from 'child_process';

const DEFAULT_REMOTE = 'origin';
const FALLBACK_BRANCHES = ['main', 'master'];

function runGitCommand(args: string[]): string {
  return execFileSync('git', args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

function detectRemoteHead(remote: string): string | null {
  try {
    const ref = runGitCommand(['symbolic-ref', '--quiet', '--short', `refs/remotes/${remote}/HEAD`]);
    return ref.split('/').pop() || null;
  } catch {
    return null;
  }
}

function detectRemoteShowHead(remote: string): string | null {
  try {
    const output = runGitCommand(['remote', 'show', remote]);
    const match = output.match(/HEAD branch:\s+(.+)/);
    return match?.[1]?.trim() || null;
  } catch {
    return null;
  }
}

function detectLocalBranchCandidates(): string[] {
  try {
    const output = runGitCommand(['branch', '--format', '%(refname:short)']);
    return output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function getDeployGitRemote(): string {
  return process.env.DEPLOY_GIT_REMOTE?.trim() || DEFAULT_REMOTE;
}

export function getDeployGitBranch(): string {
  const configuredBranch = process.env.DEPLOY_GIT_BRANCH?.trim();
  if (configuredBranch) {
    return configuredBranch;
  }

  const remote = getDeployGitRemote();
  const detectedBranch = detectRemoteHead(remote) || detectRemoteShowHead(remote);
  if (detectedBranch) {
    return detectedBranch;
  }

  const localBranches = new Set(detectLocalBranchCandidates());
  for (const candidate of FALLBACK_BRANCHES) {
    if (localBranches.has(candidate)) {
      return candidate;
    }
  }

  return 'master';
}
