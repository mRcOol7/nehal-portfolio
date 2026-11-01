# Ralph Wiggum - Long-running AI agent loop for Windows PowerShell
# Usage: .\scripts\ralph\ralph.ps1 [-Tool claude|amp] [-MaxIterations 10]

param (
    [string]$Tool = "claude",
    [int]$MaxIterations = 10
)

$ErrorActionPreference = "Stop"

if ($Tool -notin @("claude", "amp")) {
    Write-Error "Invalid tool '$Tool'. Must be 'claude' or 'amp'."
    exit 1
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PrdFile = Join-Path $ScriptDir "prd.json"
$ProgressFile = Join-Path $ScriptDir "progress.txt"
$ArchiveDir = Join-Path $ScriptDir "archive"
$LastBranchFile = Join-Path $ScriptDir ".last-branch"

# Archive previous run if branch changed
if ((Test-Path $PrdFile) -and (Test-Path $LastBranchFile)) {
    try {
        $prdContent = Get-Content $PrdFile -Raw | ConvertFrom-Json
        $currentBranch = $prdContent.branchName
        $lastBranch = (Get-Content $LastBranchFile -Raw).Trim()

        if ($currentBranch -and $lastBranch -and ($currentBranch -ne $lastBranch)) {
            $date = Get-Date -Format "yyyy-MM-dd"
            $folderName = $lastBranch -replace '^ralph/', ''
            $archiveFolder = Join-Path $ArchiveDir "$date-$folderName"
            
            Write-Host "Archiving previous run: $lastBranch" -ForegroundColor Yellow
            New-Item -ItemType Directory -Force -Path $archiveFolder | Out-Null
            if (Test-Path $PrdFile) { Copy-Item $PrdFile $archiveFolder -Force }
            if (Test-Path $ProgressFile) { Copy-Item $ProgressFile $archiveFolder -Force }
            Write-Host "   Archived to: $archiveFolder" -ForegroundColor Green

            # Reset progress file
            "# Ralph Progress Log`nStarted: $(Get-Date)`n---`n" | Set-Content $ProgressFile
        }
    } catch {
        Write-Warning "Could not check branch transition: $_"
    }
}

# Track current branch
if (Test-Path $PrdFile) {
    try {
        $prdContent = Get-Content $PrdFile -Raw | ConvertFrom-Json
        if ($prdContent.branchName) {
            $prdContent.branchName | Set-Content $LastBranchFile
        }
    } catch {}
}

# Initialize progress file if missing
if (-not (Test-Path $ProgressFile)) {
    "# Ralph Progress Log`nStarted: $(Get-Date)`n---`n" | Set-Content $ProgressFile
}

Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "  Starting Ralph Loop" -ForegroundColor Cyan
Write-Host "  Tool: $Tool | Max Iterations: $MaxIterations" -ForegroundColor Cyan
Write-Host "==============================================================="

for ($i = 1; $i -le $MaxIterations; $i++) {
    Write-Host ""
    Write-Host "---------------------------------------------------------------" -ForegroundColor Yellow
    Write-Host "  Ralph Iteration $i of $MaxIterations ($Tool)" -ForegroundColor Yellow
    Write-Host "---------------------------------------------------------------"

    $promptPath = if ($Tool -eq "amp") { Join-Path $ScriptDir "prompt.md" } else { Join-Path $ScriptDir "CLAUDE.md" }
    
    if (-not (Test-Path $promptPath)) {
        Write-Error "Prompt file not found at $promptPath"
        exit 1
    }

    $output = ""
    try {
        if ($Tool -eq "amp") {
            $output = Get-Content $promptPath -Raw | amp --dangerously-allow-all 2>&1 | Out-String
        } else {
            $output = Get-Content $promptPath -Raw | claude --dangerously-skip-permissions --print 2>&1 | Out-String
        }
        Write-Host $output
    } catch {
        Write-Warning "Iteration error: $_"
    }

    # Check for completion signal
    if ($output -match "<promise>COMPLETE</promise>") {
        Write-Host ""
        Write-Host "✓ Ralph completed all tasks!" -ForegroundColor Green
        Write-Host "Completed at iteration $i of $MaxIterations" -ForegroundColor Green
        exit 0
    }

    # Also verify if prd.json has any remaining unpassed stories
    if (Test-Path $PrdFile) {
        try {
            $prd = Get-Content $PrdFile -Raw | ConvertFrom-Json
            $unpassed = @($prd.userStories | Where-Object { $_.passes -eq $false })
            if ($unpassed.Count -eq 0 -and $prd.userStories.Count -gt 0) {
                Write-Host ""
                Write-Host "✓ All stories in prd.json are marked as passes: true!" -ForegroundColor Green
                exit 0
            } else {
                Write-Host "Stories remaining: $($unpassed.Count)" -ForegroundColor Gray
            }
        } catch {}
    }

    Write-Host "Iteration $i complete. Continuing..." -ForegroundColor Cyan
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Ralph reached max iterations ($MaxIterations) without completing all tasks." -ForegroundColor Red
Write-Host "Check $ProgressFile for details." -ForegroundColor Yellow
exit 1
