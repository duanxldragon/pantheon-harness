param(
  [Parameter(Mandatory = $true)]
  [string]$TargetPath,
  [switch]$IncludeCodexHelpers,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'

function Copy-Path {
  param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,
    [Parameter(Mandatory = $true)]
    [string]$DestinationPath
  )

  if (-not (Test-Path -LiteralPath $SourcePath)) {
    throw "Missing source path: $SourcePath"
  }

  $item = Get-Item -LiteralPath $SourcePath
  if ($item.PSIsContainer) {
    New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null
    Get-ChildItem -LiteralPath $SourcePath -Force | ForEach-Object {
      Copy-Item -LiteralPath $_.FullName -Destination $DestinationPath -Recurse -Force
    }
    return
  }

  $parent = Split-Path -Parent $DestinationPath
  if ($parent) {
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
  }
  Copy-Item -LiteralPath $SourcePath -Destination $DestinationPath -Force
}

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$resolvedTarget = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $TargetPath))

if ((Test-Path -LiteralPath $resolvedTarget) -and -not $Force) {
  $existingItems = Get-ChildItem -LiteralPath $resolvedTarget -Force
  if ($existingItems.Count -gt 0) {
    throw "Target directory is not empty. Re-run with -Force if you want to overlay files: $resolvedTarget"
  }
}

New-Item -ItemType Directory -Force -Path $resolvedTarget | Out-Null

$copyMap = @(
  @{ Source = '.github'; Destination = '.github' },
  @{ Source = '.agents'; Destination = '.agents' },
  @{ Source = '.harness'; Destination = '.harness' },
  @{ Source = 'openspec'; Destination = 'openspec' },
  @{ Source = 'docs/harness'; Destination = 'docs/harness' },
  @{ Source = 'scripts/harness'; Destination = 'scripts/harness' },
  @{ Source = 'agentic-method-kit'; Destination = 'agentic-method-kit' },
  @{ Source = 'agentic-repo-shell'; Destination = 'agentic-repo-shell' },
  @{ Source = 'pantheon-overlay'; Destination = 'pantheon-overlay' },
  @{ Source = 'archive'; Destination = 'archive' },
  @{ Source = '.gitignore'; Destination = '.gitignore' },
  @{ Source = 'scripts/bootstrap-agentic-repo.ps1'; Destination = 'scripts/bootstrap-agentic-repo.ps1' },
  @{ Source = 'scripts/scaffold-standalone-method-repo.ps1'; Destination = 'scripts/scaffold-standalone-method-repo.ps1' },
  @{ Source = 'README.md'; Destination = 'README.md' },
  @{ Source = 'DISTRIBUTION.md'; Destination = 'DISTRIBUTION.md' },
  @{ Source = 'RELEASE.md'; Destination = 'RELEASE.md' },
  @{ Source = 'MIGRATION_TO_STANDALONE_REPO.md'; Destination = 'MIGRATION_TO_STANDALONE_REPO.md' },
  @{ Source = 'PANTHEON_CONSUMER_SYNC_POLICY.md'; Destination = 'PANTHEON_CONSUMER_SYNC_POLICY.md' },
  @{ Source = 'STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md'; Destination = 'STANDALONE_REPO_BOOTSTRAP_CHECKLIST.md' },
  @{ Source = 'WORKSPACE_MANIFEST.json'; Destination = 'WORKSPACE_MANIFEST.json' },
  @{ Source = 'SHELL_VERSION.json'; Destination = 'SHELL_VERSION.json' }
)

foreach ($entry in $copyMap) {
  Copy-Path -SourcePath (Join-Path $workspaceRoot $entry.Source) -DestinationPath (Join-Path $resolvedTarget $entry.Destination)
}

if ($IncludeCodexHelpers) {
  Copy-Path -SourcePath (Join-Path $workspaceRoot '.codex') -DestinationPath (Join-Path $resolvedTarget '.codex')
}

Write-Host "Standalone method repo scaffold complete: $resolvedTarget"
$included = @(
  '.github',
  '.agents',
  '.harness',
  'openspec',
  'docs/harness',
  'scripts/harness',
  'agentic-method-kit',
  'agentic-repo-shell',
  'pantheon-overlay',
  'archive',
  '.gitignore',
  'standalone scaffold script',
  'distribution root docs'
)
if ($IncludeCodexHelpers) {
  $included += '.codex'
}
Write-Host "Included: $($included -join ', ')"
