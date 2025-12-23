# GitHub Pages and Actions Setup

This repository is configured to automatically run Cypress tests and publish Allure reports to GitHub Pages.

## Quick Setup

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **GitHub Actions**
4. Click **Save**

### 2. Verify Workflow Permissions
1. Go to **Settings** → **Actions** → **General**
2. Scroll to "Workflow permissions"
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### 3. Run the Workflow
Option A: Push to main branch
```bash
git add .
git commit -m "Add GitHub Actions and Pages setup"
git push origin main
```

Option B: Manual trigger
1. Go to **Actions** tab
2. Select "Cypress Tests with Allure Report"
3. Click **Run workflow** → **Run workflow**

### 4. Access Your Allure Report
After the workflow completes successfully:
- Your report will be available at: `https://<your-username>.github.io/<repository-name>/`
- The exact URL is shown in the workflow's "Deploy to GitHub Pages" step

## What the Workflow Does

### Job 1: `cypress-run`
1. Checks out the code
2. Downloads previous Allure history from GitHub Pages (if exists)
3. Installs Node.js and dependencies
4. Runs Cypress tests (`npm run cypress:run`)
5. Generates Allure report with preserved history/trends
6. Creates history.zip for next run
7. Uploads artifacts:
   - Allure report with history (kept for 30 days)
   - Test videos (kept for 7 days)
   - Screenshots on failure (kept for 7 days)

### Job 2: `deploy-report`
1. Downloads the Allure report artifact
2. Adds history.zip to the report root (for next run to download)
3. Configures GitHub Pages
4. Deploys the report to GitHub Pages
5. Runs even if tests fail (so you can see the failures in Allure)

### History Preservation
The workflow automatically preserves test execution history across runs:
- **First run**: Generates report without history
- **Subsequent runs**: Downloads history from previous deployment, includes it in new report
- **Result**: Trend graphs show test stability over time

You'll see trend graphs in your Allure report after 2+ runs!

## Workflow Triggers
The workflow runs automatically on:
- **Push** to `main` or `master` branch
- **Pull requests** to `main` or `master`
- **Manual dispatch** from Actions tab

## Viewing Reports

### Latest Report (GitHub Pages)
Visit: `https://<your-username>.github.io/<repository-name>/`

### Historical Reports (Artifacts)
1. Go to **Actions** tab
2. Click on any workflow run
3. Scroll to "Artifacts" section
4. Download:
   - `allure-report` - Full HTML report
   - `cypress-videos` - Test execution videos
   - `cypress-screenshots` - Failure screenshots

### Local Reports
```bash
npm run cypress:run
npm run allure:generate
npm run allure:open
```

## Troubleshooting

### "Deploy to GitHub Pages" fails
- Ensure GitHub Pages is enabled with "GitHub Actions" as source
- Check workflow permissions are set to "Read and write"

### Report not updating
- Clear browser cache
- Wait a few minutes after deployment
- Check the Actions tab for deployment status

### Tests fail in CI but pass locally
- Check the uploaded videos/screenshots in artifacts
- Review the Allure report for detailed error information
- Verify baseUrl and environment variables

## Customization

### Change when workflow runs
Edit `.github/workflows/cypress-tests.yml`:
```yaml
on:
  push:
    branches: [ main, develop ]  # Add more branches
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight
```

### Change artifact retention
Edit `.github/workflows/cypress-tests.yml`:
```yaml
- uses: actions/upload-artifact@v4
  with:
    retention-days: 90  # Keep for 90 days instead of 30
```

### Add Slack/Email notifications
Add notification steps after the test run or deployment.

## Security Notes
- The workflow has minimal permissions (only needs to write to GitHub Pages)
- No secrets are required for basic setup
- Test results are publicly accessible via GitHub Pages (change repo to private if sensitive)
